/* =============================================================================
   DESSERTÉ — Navbar Component
   ============================================================================= */

class DesserteNavbar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.scrollThreshold = 60;
    this.lastScroll = 0;
    this.isMenuOpen = false;
    this.init();
  }

  init() {
    this.bindScrollBehavior();
    this.bindMobileMenu();
    this.bindNavLinks();
    this.bindCartIcon();
    this.bindSearch();
    this.setActiveLink();
  }

  bindScrollBehavior() {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > this.scrollThreshold) {
        this.navbar.classList.add('scrolled');
        this.navbar.classList.remove('transparent');
      } else {
        this.navbar.classList.remove('scrolled');
        if (this.navbar.dataset.transparent === 'true') {
          this.navbar.classList.add('transparent');
        }
      }
      this.lastScroll = currentScroll;
    }, { passive: true });
  }

  bindMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');
    if (hamburger) hamburger.addEventListener('click', () => this.toggleMobileMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleMobileMenu(false));
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) this.toggleMobileMenu(false);
      });
    }
  }

  toggleMobileMenu(open) {
    const overlay = document.getElementById('mobile-menu-overlay');
    const drawer = document.getElementById('mobile-menu-drawer');
    this.isMenuOpen = open;
    if (overlay) overlay.classList.toggle('active', open);
    if (drawer) drawer.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  bindNavLinks() {
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => this.toggleMobileMenu(false));
    });
  }

  bindCartIcon() {
    document.querySelectorAll('[data-action="open-cart"]').forEach(icon => {
      icon.addEventListener('click', () => {
        if (window.desserteCart) window.desserteCart.openDrawer();
      });
    });
  }

  bindSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput && searchInput.focus(), 100);
      });
    }
    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        if (searchInput) searchInput.value = '';
        const results = document.getElementById('search-results');
        if (results) results.innerHTML = '<p class="search-empty">Type to search products...</p>';
      });
    }
    if (searchOverlay) {
      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) searchOverlay.classList.remove('active');
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
      }
    });
  }

  handleSearch(query) {
    const results = document.getElementById('search-results');
    if (!results || !window.DESSERTE_DATA) return;
    if (!query.trim()) {
      results.innerHTML = '<p class="search-empty">Type to search products...</p>';
      return;
    }
    const q = query.toLowerCase();
    const matched = DESSERTE_DATA.products.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    ).slice(0, 6);
    if (matched.length === 0) {
      results.innerHTML = '<p class="search-empty">No products found.</p>';
      return;
    }
    results.innerHTML = matched.map(p => `
      <div class="search-result-item" onclick="window.location.href='menu.html#${p.id}'" role="button" tabindex="0">
        <div class="search-result-img" style="background:${p.fallbackColor}20">
          <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">
        </div>
        <div>
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </div>
      </div>
    `).join('');
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.desserteNavbar = new DesserteNavbar();
});
