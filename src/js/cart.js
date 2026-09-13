/* =============================================================================
   DESSERTÉ — Cart, Toast & Utilities
   ============================================================================= */

function formatPrice(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/* ---------------------------------------------------------------------------
   TOAST MANAGER
   --------------------------------------------------------------------------- */
class ToastManager {
  constructor() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    }
  }

  show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    toast.innerHTML = `<span style="font-size:1.1em;font-weight:700">${icons[type] || '✓'}</span> ${message}`;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('leaving');
      setTimeout(() => toast.remove(), 350);
    }, duration);
    return toast;
  }
}

/* ---------------------------------------------------------------------------
   CART MANAGER
   --------------------------------------------------------------------------- */
class CartManager {
  constructor() {
    this.storageKey = 'desserte_cart';
    this.items = this.loadFromStorage();
    this.appliedPromo = null;
    this.toast = new ToastManager();
    this.validPromoCodes = {
      'WEEKEND20': { discount: 0.20, label: 'Sweet Weekend 20% Off' },
      'BIRTHDAY':  { discount: 0.10, label: 'Birthday Treat 10% Off' },
      'BUNDLE3':   { discount: 0.15, label: 'Bundle Deal 15% Off' },
      'FREEWED':   { discount: 0, freeDelivery: true, label: 'Free Delivery Wednesday' },
    };
    this.deliveryFee = 15000;
    this.freeDeliveryThreshold = 150000;
    this.init();
  }

  init() {
    this.renderCart();
    this.updateCartBadge();
    this.bindCartEvents();
  }

  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addItem(product, selectedSize = null, quantity = 1, notes = '') {
    const size = selectedSize || (product.sizes && product.sizes[0]);
    const price = size ? size.price : product.price;
    const itemKey = `${product.id}-${size ? size.id : 'default'}`;
    const existingIndex = this.items.findIndex(i => i.key === itemKey);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: generateId(), key: itemKey,
        productId: product.id, name: product.name,
        image: product.image, fallbackColor: product.fallbackColor,
        size: size ? size.name : null, price, quantity, notes,
      });
    }
    this.saveToStorage();
    this.renderCart();
    this.updateCartBadge();
    this.toast.show(`${product.name} added to cart!`, 'success');
    this.openDrawer();
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.saveToStorage(); this.renderCart(); this.updateCartBadge();
  }

  updateQuantity(itemId, delta) {
    const idx = this.items.findIndex(i => i.id === itemId);
    if (idx === -1) return;
    this.items[idx].quantity += delta;
    if (this.items[idx].quantity <= 0) this.items.splice(idx, 1);
    this.saveToStorage(); this.renderCart(); this.updateCartBadge();
  }

  getSubtotal()    { return this.items.reduce((s, i) => s + i.price * i.quantity, 0); }
  getDiscount()    { return this.appliedPromo ? Math.round(this.getSubtotal() * (this.appliedPromo.discount || 0)) : 0; }
  getDeliveryFee() {
    if (this.appliedPromo && this.appliedPromo.freeDelivery) return 0;
    return this.getSubtotal() >= this.freeDeliveryThreshold ? 0 : this.deliveryFee;
  }
  getTotal()       { return this.getSubtotal() - this.getDiscount() + this.getDeliveryFee(); }
  getTotalItems()  { return this.items.reduce((s, i) => s + i.quantity, 0); }

  applyPromo(code) {
    const promo = this.validPromoCodes[code.toUpperCase()];
    if (promo) {
      this.appliedPromo = promo;
      this.renderCart();
      this.toast.show(`Promo applied: ${promo.label}`, 'success');
      return true;
    }
    this.toast.show('Invalid promo code. Try: WEEKEND20', 'error');
    return false;
  }

  removePromo() { this.appliedPromo = null; this.renderCart(); this.toast.show('Promo removed', 'info'); }

  updateCartBadge() {
    const count = this.getTotalItems();
    document.querySelectorAll('.cart-badge').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  openDrawer() {
    document.getElementById('cart-overlay') && document.getElementById('cart-overlay').classList.add('active');
    document.getElementById('cart-drawer') && document.getElementById('cart-drawer').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    document.getElementById('cart-overlay') && document.getElementById('cart-overlay').classList.remove('active');
    document.getElementById('cart-drawer') && document.getElementById('cart-drawer').classList.remove('active');
    document.body.style.overflow = '';
  }

  bindCartEvents() {
    document.getElementById('cart-overlay') && document.getElementById('cart-overlay').addEventListener('click', () => this.closeDrawer());
    document.getElementById('cart-close') && document.getElementById('cart-close').addEventListener('click', () => this.closeDrawer());

    const promoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('promo-input');
    if (promoBtn && promoInput) {
      promoBtn.addEventListener('click', () => { if (promoInput.value.trim()) this.applyPromo(promoInput.value.trim()); });
      promoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter' && promoInput.value.trim()) this.applyPromo(promoInput.value.trim()); });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) { this.toast.show('Your cart is empty!', 'error'); return; }
        localStorage.setItem('desserte_checkout', JSON.stringify({
          items: this.items, subtotal: this.getSubtotal(),
          discount: this.getDiscount(), deliveryFee: this.getDeliveryFee(),
          total: this.getTotal(), promo: this.appliedPromo,
        }));
        this.closeDrawer();
        window.location.href = 'checkout.html';
      });
    }
  }

  renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const emptyState    = document.getElementById('cart-empty');
    const summaryWrap   = document.getElementById('cart-summary-wrap');
    if (!itemsContainer) return;

    if (this.items.length === 0) {
      itemsContainer.innerHTML = '';
      if (emptyState)  emptyState.style.display  = 'flex';
      if (summaryWrap) summaryWrap.style.display  = 'none';
    } else {
      if (emptyState)  emptyState.style.display   = 'none';
      if (summaryWrap) summaryWrap.style.display   = 'block';
      itemsContainer.innerHTML = this.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-img" style="background:${item.fallbackColor}20">
            <img src="${item.image}" alt="${item.name}" onerror="this.parentElement.innerHTML='<span style=font-size:1.5rem>&#127856;</span>'">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            ${item.size ? `<div class="cart-item-variant">${item.size}</div>` : ''}
            <div class="cart-item-price">${formatPrice(item.price)}</div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-selector" style="border-radius:8px">
              <button class="qty-btn" onclick="window.desserteCart.updateQuantity('${item.id}',-1)">&#8722;</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="window.desserteCart.updateQuantity('${item.id}',1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="window.desserteCart.removeItem('${item.id}')" aria-label="Remove item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14H6L5 6"></path>
                <path d="M10 11v6M14 11v6M9 6V4h6v2"></path>
              </svg>
            </button>
          </div>
        </div>`).join('');
    }

    const sub = this.getSubtotal(), disc = this.getDiscount(), del = this.getDeliveryFee();
    const el = id => document.getElementById(id);
    if (el('cart-subtotal'))  el('cart-subtotal').textContent = formatPrice(sub);
    if (el('cart-delivery'))  el('cart-delivery').textContent = del === 0 ? 'Free' : formatPrice(del);
    if (el('cart-total'))     el('cart-total').textContent = formatPrice(this.getTotal());
    if (el('cart-discount-row')) el('cart-discount-row').style.display = disc > 0 ? 'flex' : 'none';
    if (el('cart-discount'))  el('cart-discount').textContent = `- ${formatPrice(disc)}`;
    const promoTag = el('cart-promo-tag');
    if (promoTag) {
      promoTag.style.display = this.appliedPromo ? 'flex' : 'none';
      if (this.appliedPromo) {
        promoTag.innerHTML = `<span>&#127999; ${this.appliedPromo.label}</span>
          <button onclick="window.desserteCart.removePromo()" style="background:none;border:none;color:inherit;cursor:pointer;margin-left:.5rem">&#10005;</button>`;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.desserteCart  = new CartManager();
  window.desserteToast = new ToastManager();
});
