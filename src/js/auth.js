/* =============================================================================
   DESSERTÉ — Authentication & User Management (Pelanggan & Admin)
   ============================================================================= */

class AuthManager {
  constructor() {
    this.storageKeyUsers = 'desserte_users';
    this.storageKeySession = 'desserte_current_user';
    this.initDefaultUsers();
    this.currentUser = this.getCurrentUser();
    this.init();
  }

  init() {
    this.renderNavAuth();
    this.bindDropdownEvents();
  }

  initDefaultUsers() {
    try {
      const existing = localStorage.getItem(this.storageKeyUsers);
      if (!existing) {
        const defaultUsers = [
          {
            id: 'usr-admin-1',
            name: 'Admin Desserté',
            email: 'admin@desserte.id',
            password: 'admin123',
            phone: '+62 858 7780 2506',
            role: 'admin',
            createdAt: '2026-01-01'
          },
          {
            id: 'usr-cust-1',
            name: 'Sarah Jessica',
            email: 'pelanggan@desserte.id',
            password: 'user123',
            phone: '085877802506',
            role: 'customer',
            createdAt: '2026-02-14'
          }
        ];
        localStorage.setItem(this.storageKeyUsers, JSON.stringify(defaultUsers));
      }
    } catch (e) {
      console.error('Error initializing default users:', e);
    }
  }

  getUsers() {
    try {
      const data = localStorage.getItem(this.storageKeyUsers);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(this.storageKeyUsers, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users:', e);
    }
  }

  getCurrentUser() {
    try {
      const data = localStorage.getItem(this.storageKeySession);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user !== null && user.role === 'admin';
  }

  login(email, password, expectedRole = null) {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      return { success: false, message: 'Email atau password salah. Silakan coba lagi.' };
    }

    if (expectedRole && user.role !== expectedRole) {
      if (expectedRole === 'admin') {
        return { success: false, message: 'Akun ini bukan akun Administrator. Silakan login di tab Pelanggan.' };
      } else if (expectedRole === 'customer') {
        return { success: false, message: 'Akun ini adalah akun Admin. Silakan login di tab Portal Admin.' };
      }
    }

    // Save session
    localStorage.setItem(this.storageKeySession, JSON.stringify(user));
    this.currentUser = user;
    this.renderNavAuth();

    return { success: true, user: user };
  }

  register(name, email, password, phone = '') {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, message: 'Semua kolom wajib diisi.' };
    }

    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung masuk.' };
    }

    const newUser = {
      id: 'usr-cust-' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: password,
      phone: (phone || '').trim(),
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Auto login after register
    localStorage.setItem(this.storageKeySession, JSON.stringify(newUser));
    this.currentUser = newUser;
    this.renderNavAuth();

    return { success: true, user: newUser };
  }

  logout() {
    localStorage.removeItem(this.storageKeySession);
    this.currentUser = null;
    if (window.desserteToast) {
      window.desserteToast.show('Anda telah berhasil keluar (Logout).', 'info');
    }
    this.renderNavAuth();

    // If currently on admin page or customer orders page, redirect to login
    const currentPath = window.location.pathname.split('/').pop() || '';
    if (currentPath === 'admin.html' || currentPath === 'customer-orders.html') {
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 600);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  renderNavAuth() {
    const user = this.getCurrentUser();
    const container = document.getElementById('nav-auth-container');
    const mobileContainer = document.getElementById('mobile-auth-container');

    // Desktop Navbar
    if (container) {
      if (!user) {
        container.innerHTML = `
          <a href="login.html" class="nav-auth-btn" aria-label="Masuk atau Daftar Akun">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span class="nav-auth-text">Masuk</span>
          </a>
        `;
      } else if (user.role === 'admin') {
        container.innerHTML = `
          <div class="user-menu-dropdown">
            <button class="user-avatar-btn admin-badge-btn" onclick="window.desserteAuth.toggleDropdown(event)" aria-label="Menu Admin">
              <span class="user-avatar-circle" style="background:var(--color-accent);color:#fff">👑</span>
              <span class="user-auth-name hide-mobile">Admin</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="user-dropdown-menu" id="auth-dropdown-menu">
              <div class="user-dropdown-header">
                <div class="user-dropdown-name">${user.name}</div>
                <div class="user-dropdown-email">${user.email}</div>
                <span class="badge badge-gold" style="margin-top:4px;font-size:0.65rem">Administrator</span>
              </div>
              <a href="admin.html" class="user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Dashboard Admin</span>
              </a>
              <a href="index.html" class="user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                <span>Lihat Website Toko</span>
              </a>
              <button onclick="window.desserteAuth.logout()" class="user-dropdown-item logout-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </div>
        `;
      } else {
        // Customer
        const initials = this.getInitials(user.name);
        const firstName = user.name.split(' ')[0];
        container.innerHTML = `
          <div class="user-menu-dropdown">
            <button class="user-avatar-btn" onclick="window.desserteAuth.toggleDropdown(event)" aria-label="Menu Akun Saya">
              <span class="user-avatar-circle">${initials}</span>
              <span class="user-auth-name hide-mobile">Hai, ${firstName}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="user-dropdown-menu" id="auth-dropdown-menu">
              <div class="user-dropdown-header">
                <div class="user-dropdown-name">${user.name}</div>
                <div class="user-dropdown-email">${user.email}</div>
                <span class="badge badge-green" style="margin-top:4px;font-size:0.65rem">Pelanggan Member</span>
              </div>
              <a href="customer-orders.html" class="user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                <span>Riwayat Pesanan Saya</span>
              </a>
              <a href="menu.html" class="user-dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                <span>Pesan Dessert Favorit</span>
              </a>
              <button onclick="window.desserteAuth.logout()" class="user-dropdown-item logout-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Keluar (Logout)</span>
              </button>
            </div>
          </div>
        `;
      }
    }

    // Mobile Drawer Auth Section
    if (mobileContainer) {
      if (!user) {
        mobileContainer.innerHTML = `
          <div style="font-size:0.75rem; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.4rem;">Akun Desserté</div>
          <a href="login.html" class="btn btn-primary btn-sm" style="width:100%;text-align:center;display:flex;justify-content:center;gap:0.5rem">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Masuk / Daftar Akun
          </a>
        `;
      } else if (user.role === 'admin') {
        mobileContainer.innerHTML = `
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
            <span style="width:36px;height:36px;border-radius:50%;background:var(--color-accent);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.1rem">👑</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--color-primary)">${user.name}</div>
              <div style="font-size:0.75rem;color:var(--color-text-muted)">${user.email} (Admin)</div>
            </div>
          </div>
          <div style="display:flex;gap:0.5rem">
            <a href="admin.html" class="btn btn-gold btn-sm" style="flex:1;text-align:center">Portal Admin</a>
            <button onclick="window.desserteAuth.logout()" class="btn btn-outline btn-sm" style="color:#E11D48;border-color:#FEE2E2">Logout</button>
          </div>
        `;
      } else {
        const initials = this.getInitials(user.name);
        mobileContainer.innerHTML = `
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
            <span style="width:36px;height:36px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem">${initials}</span>
            <div>
              <div style="font-weight:700;font-size:0.9rem;color:var(--color-primary)">${user.name}</div>
              <div style="font-size:0.75rem;color:var(--color-text-muted)">${user.email}</div>
            </div>
          </div>
          <div style="display:flex;gap:0.5rem">
            <a href="customer-orders.html" class="btn btn-outline btn-sm" style="flex:1;text-align:center">Pesanan Saya</a>
            <button onclick="window.desserteAuth.logout()" class="btn btn-outline btn-sm" style="color:#E11D48;border-color:#FEE2E2">Logout</button>
          </div>
        `;
      }
    }
  }

  toggleDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('auth-dropdown-menu');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  bindDropdownEvents() {
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('auth-dropdown-menu');
      if (dropdown && dropdown.classList.contains('active')) {
        const wrap = document.querySelector('.user-menu-dropdown');
        if (wrap && !wrap.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      }
    });
  }
}

// Global instance
window.desserteAuth = new AuthManager();

document.addEventListener('DOMContentLoaded', () => {
  if (window.desserteAuth) {
    window.desserteAuth.renderNavAuth();
  }
});
