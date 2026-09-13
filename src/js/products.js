/* =============================================================================
   DESSERTÉ — Product Catalog, Modal & Cake Builder
   ============================================================================= */

/* ---------------------------------------------------------------------------
   PRODUCT CATALOG
   --------------------------------------------------------------------------- */
class ProductCatalog {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.activeCategory = options.defaultCategory || 'all';
    this.searchQuery = '';
    this.products = [];
    this.init();
  }

  init() {
    if (!window.DESSERTE_DATA) return;
    this.products = DESSERTE_DATA.products;
    this.bindFilterTabs();
    this.bindSearch();
    this.checkHashCategory();
    this.render();
  }

  checkHashCategory() {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== '') {
      const tab = document.querySelector(`[data-filter="${hash}"]`);
      if (tab) {
        document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeCategory = hash;
      }
    }
  }

  bindFilterTabs() {
    document.querySelectorAll('[data-filter]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeCategory = tab.dataset.filter;
        this.render();
      });
    });
  }

  bindSearch() {
    const catalogSearch = document.getElementById('catalog-search');
    if (catalogSearch) {
      catalogSearch.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.render();
      });
    }
  }

  getFilteredProducts() {
    return this.products.filter(p => {
      const catMatch   = this.activeCategory === 'all' || p.category.includes(this.activeCategory);
      const searchMatch = !this.searchQuery ||
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery);
      return catMatch && searchMatch;
    });
  }

  renderCard(p) {
    const badge = p.badge
      ? `<span class="product-badge badge ${p.badge === 'New' ? 'badge-new' : 'badge-gold'}">${p.badge}</span>`
      : '';
    const stars = '&#9733;'.repeat(Math.floor(p.rating));
    return `
      <article class="product-card card" data-product-id="${p.id}">
        <div class="product-img-wrap" style="height:220px">
          <img src="${p.image}" alt="${p.name} — premium dessert" loading="lazy"
            onerror="this.parentElement.style.background='${p.fallbackColor}20';this.parentElement.innerHTML='${badge}<div class=img-placeholder style=height:220px>&#127856;</div>'">
          ${badge}
        </div>
        <div class="product-card-body">
          <div class="product-meta">
            <span class="stars" aria-label="Rating ${p.rating}">${stars}</span>
            <span class="review-count">(${p.reviewCount})</span>
          </div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description.substring(0, 75)}${p.description.length > 75 ? '&hellip;' : ''}</p>
          <div class="product-footer">
            <div class="price text-lg">${formatPrice(p.price)}</div>
            <button class="btn btn-primary btn-sm" onclick="window.productModal.open('${p.id}')" aria-label="Add ${p.name} to cart">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add
            </button>
          </div>
        </div>
      </article>`;
  }

  render() {
    if (!this.container) return;
    const filtered = this.getFilteredProducts();
    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-icon">&#128269;</div>
          <div class="empty-state-title">No products found</div>
          <p class="empty-state-text">Try a different category or search term.</p>
        </div>`;
      return;
    }
    this.container.innerHTML = filtered.map(p => this.renderCard(p)).join('');
    this.container.querySelectorAll('.product-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(18px)';
      setTimeout(() => {
        card.style.transition = 'opacity .35s ease, transform .35s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 55);
    });
  }
}

/* ---------------------------------------------------------------------------
   PRODUCT MODAL
   --------------------------------------------------------------------------- */
class ProductModal {
  constructor() {
    this.overlay  = document.getElementById('product-overlay');
    this.modal    = document.getElementById('product-modal');
    this.current  = null;
    this.selSize  = null;
    this.qty      = 1;
    this.init();
  }

  init() {
    if (!this.overlay) return;
    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
  }

  open(productId) {
    if (!window.DESSERTE_DATA) return;
    const p = DESSERTE_DATA.products.find(x => x.id === productId);
    if (!p || !this.overlay) return;
    this.current = p;
    this.selSize = p.sizes ? p.sizes[0] : null;
    this.qty = 1;
    this.render();
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  getUnitPrice() {
    return this.selSize ? this.selSize.price : (this.current ? this.current.price : 0);
  }

  render() {
    if (!this.modal || !this.current) return;
    const p = this.current;
    const stars = '&#9733;'.repeat(Math.floor(p.rating));
    const sizesHtml = p.sizes ? p.sizes.map((s, i) => `
      <label class="option-card ${i === 0 ? 'selected' : ''}" data-size-idx="${i}" style="cursor:pointer">
        <div class="option-radio"></div>
        <div>
          <div style="font-weight:600;font-size:.9375rem">${s.name}</div>
          <div style="color:var(--color-text-muted);font-size:.8125rem">${formatPrice(s.price)}</div>
        </div>
      </label>`).join('') : '';

    const related = DESSERTE_DATA.products
      .filter(r => r.id !== p.id && r.category.some(c => p.category.includes(c)))
      .slice(0, 3);
    const relatedHtml = related.map(r => `
      <div class="related-card" onclick="window.productModal.open('${r.id}')" role="button" tabindex="0" aria-label="View ${r.name}">
        <div class="related-img" style="background:${r.fallbackColor}20">
          <img src="${r.image}" alt="${r.name}" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="related-name">${r.name}</div>
        <div class="related-price">${formatPrice(r.price)}</div>
      </div>`).join('');

    this.modal.innerHTML = `
      <div class="product-modal-inner">
        <button class="modal-close-btn" onclick="window.productModal.close()" aria-label="Close dialog">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div class="product-modal-grid">
          <div class="product-modal-img" style="background:${p.fallbackColor}15">
            <img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div style=font-size:5rem;display:flex;align-items:center;justify-content:center;height:100%>&#127856;</div>'">
            ${p.badge ? `<span class="product-badge badge ${p.badge === 'New' ? 'badge-new' : 'badge-gold'}" style="position:absolute;top:1rem;left:1rem">${p.badge}</span>` : ''}
          </div>
          <div class="product-modal-details">
            <div class="product-modal-meta">
              <span class="stars">${stars}</span>
              <span style="color:var(--color-text-muted);font-size:.875rem">${p.rating} &middot; ${p.reviewCount} reviews</span>
            </div>
            <h2 class="product-modal-name text-display">${p.name}</h2>
            <p class="product-modal-desc">${p.description}</p>
            <div class="product-modal-ingredients">
              <span style="font-weight:600;font-size:.875rem">Ingredients: </span>
              <span style="color:var(--color-text-muted);font-size:.875rem">${p.ingredients}</span>
            </div>
            ${p.sizes ? `
              <div class="product-modal-sizes">
                <div style="font-weight:600;margin-bottom:.75rem">Choose Size</div>
                <div id="sizes-grid">${sizesHtml}</div>
              </div>` : ''}
            <div class="product-modal-qty">
              <div style="font-weight:600">Quantity</div>
              <div class="qty-selector">
                <button class="qty-btn" id="modal-qty-minus">&#8722;</button>
                <span class="qty-value" id="modal-qty-value">1</span>
                <button class="qty-btn" id="modal-qty-plus">+</button>
              </div>
            </div>
            <div class="product-modal-notes">
              <div style="font-weight:600;margin-bottom:.5rem">Special Notes (optional)</div>
              <textarea class="input-field" id="modal-notes" placeholder="Any special requests?" rows="2" style="border-radius:12px;resize:none"></textarea>
            </div>
            <div class="product-modal-footer">
              <div>
                <div style="font-size:.8125rem;color:var(--color-text-muted)">Total Price</div>
                <div class="price text-2xl" id="modal-total-price">${formatPrice(this.getUnitPrice())}</div>
              </div>
              <button class="btn btn-primary btn-lg" id="modal-add-to-cart" style="flex:1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        ${related.length ? `
          <div class="product-modal-related">
            <div style="font-weight:700;font-size:1.125rem;margin-bottom:1rem">You Might Also Like</div>
            <div class="related-grid">${relatedHtml}</div>
          </div>` : ''}
      </div>`;

    // Bind size selection
    this.modal.querySelectorAll('[data-size-idx]').forEach(card => {
      card.addEventListener('click', () => {
        this.modal.querySelectorAll('[data-size-idx]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selSize = p.sizes[parseInt(card.dataset.sizeIdx)];
        this.updatePrice();
      });
    });

    const minus = this.modal.querySelector('#modal-qty-minus');
    const plus  = this.modal.querySelector('#modal-qty-plus');
    if (minus) minus.addEventListener('click', () => { if (this.qty > 1) { this.qty--; this.updateQty(); } });
    if (plus)  plus.addEventListener('click',  () => { this.qty++; this.updateQty(); });

    const addBtn = this.modal.querySelector('#modal-add-to-cart');
    if (addBtn) addBtn.addEventListener('click', () => {
      const notes = (this.modal.querySelector('#modal-notes') || {}).value || '';
      window.desserteCart.addItem(p, this.selSize, this.qty, notes);
      this.close();
    });
  }

  updateQty() {
    const el = this.modal && this.modal.querySelector('#modal-qty-value');
    if (el) el.textContent = this.qty;
    this.updatePrice();
  }

  updatePrice() {
    const el = this.modal && this.modal.querySelector('#modal-total-price');
    if (el) el.textContent = formatPrice(this.getUnitPrice() * this.qty);
  }
}

/* ---------------------------------------------------------------------------
   BEST SELLERS CAROUSEL (Homepage)
   --------------------------------------------------------------------------- */
function renderBestSellers() {
  const track = document.getElementById('best-sellers-track');
  if (!track || !window.DESSERTE_DATA) return;
  const items = DESSERTE_DATA.products.filter(p => p.category.includes('best-seller'));
  track.innerHTML = items.map(p => {
    const stars = '&#9733;'.repeat(Math.floor(p.rating));
    return `
      <div class="bs-card" style="flex-shrink:0;width:250px">
        <div class="product-img-wrap" style="height:190px;border-radius:16px;overflow:hidden;margin-bottom:1rem">
          <img src="${p.image}" alt="${p.name}" loading="lazy"
            onerror="this.parentElement.style.background='${p.fallbackColor}20';this.parentElement.innerHTML='<div style=height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem>&#127856;</div>'">
        </div>
        <div class="stars" style="font-size:.8rem">${stars}</div>
        <div style="font-weight:700;font-size:1rem;margin:.3rem 0 .75rem">${p.name}</div>
        <div class="flex-between">
          <span class="price">${formatPrice(p.price)}</span>
          <button class="btn btn-primary btn-sm" onclick="window.productModal.open('${p.id}')" aria-label="Add ${p.name} to cart">Add</button>
        </div>
      </div>`;
  }).join('');
}

/* ---------------------------------------------------------------------------
   PROMO CARDS (Homepage)
   --------------------------------------------------------------------------- */
function renderPromos() {
  const grid = document.getElementById('promos-grid');
  if (!grid || !window.DESSERTE_DATA) return;
  grid.innerHTML = DESSERTE_DATA.promos.map(promo => `
    <div class="promo-card">
      <div class="promo-card-bg"></div>
      <div class="promo-card-pattern"></div>
      <div class="promo-card-deco"></div>
      <div class="promo-card-content">
        <div class="promo-badge">${promo.badge}</div>
        <div class="promo-card-subtitle">${promo.subtitle}</div>
        <h3 class="promo-card-title">${promo.title}</h3>
        <p class="promo-card-desc">${promo.description}</p>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn btn-gold btn-sm" onclick="copyPromoCode('${promo.code}')">
            Use Code: ${promo.code}
          </button>
          <a href="promo.html" class="btn btn-outline btn-sm" style="border-color:rgba(255,255,255,.4);color:#fff">View Promo</a>
        </div>
      </div>
    </div>`).join('');
}

function copyPromoCode(code) {
  navigator.clipboard && navigator.clipboard.writeText(code).then(() => {
    window.desserteToast && window.desserteToast.show(`Code "${code}" copied to clipboard!`, 'success');
  }).catch(() => {
    window.desserteToast && window.desserteToast.show(`Use code: ${code}`, 'info');
  });
}

/* ---------------------------------------------------------------------------
   REVIEWS CAROUSEL (Homepage)
   --------------------------------------------------------------------------- */
function renderReviews() {
  const track = document.getElementById('reviews-track');
  if (!track || !window.DESSERTE_DATA) return;
  track.innerHTML = DESSERTE_DATA.reviews.map(r => {
    const stars = '&#9733;'.repeat(r.rating);
    return `
      <div class="review-card" style="flex-shrink:0;width:360px">
        <div class="review-header">
          <div class="review-avatar" aria-hidden="true">${r.avatar}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-product">${r.product} &middot; ${r.date}</div>
          </div>
          <div class="stars" style="margin-left:auto">${stars}</div>
        </div>
        <p class="review-text">${r.review}</p>
      </div>`;
  }).join('');
}

/* ---------------------------------------------------------------------------
   GENERIC CAROUSEL LOGIC
   --------------------------------------------------------------------------- */
function initCarousel(trackId, prevBtnId, nextBtnId, itemWidth) {
  const track = document.getElementById(trackId);
  const prev  = document.getElementById(prevBtnId);
  const next  = document.getElementById(nextBtnId);
  if (!track) return;

  let position = 0;
  const getMax = () => {
    const items   = track.children.length;
    const visible = Math.floor(track.parentElement.offsetWidth / (itemWidth + 24));
    return Math.max(0, items - visible);
  };

  const move = delta => {
    position = Math.max(0, Math.min(position + delta, getMax()));
    track.style.transform = `translateX(-${position * (itemWidth + 24)}px)`;
    if (prev) prev.disabled = position === 0;
    if (next) next.disabled = position >= getMax();
  };

  if (prev) prev.addEventListener('click', () => move(-1));
  if (next) next.addEventListener('click', () => move(1));

  // Touch / swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) move(diff > 0 ? 1 : -1);
  }, { passive: true });
}

/* ---------------------------------------------------------------------------
   CAKE BUILDER
   --------------------------------------------------------------------------- */
class CakeBuilder {
  constructor() {
    this.selections = {
      size: '8 inch', flavor: 'Chocolate',
      cream: 'Vanilla', decoration: 'Minimal',
      text: '', quantity: 1,
    };
    this.basePrices = {
      '6 inch': 280000, '8 inch': 380000, '10 inch': 480000,
    };
    this.flavorExtra = { Chocolate: 0, Vanilla: 0, 'Red Velvet': 25000, Matcha: 30000, Strawberry: 20000 };
    this.decorExtra  = { Minimal: 0, Birthday: 50000, Anniversary: 50000, Elegant: 75000, Custom: 100000 };
    this.init();
  }

  init() {
    document.querySelectorAll('[data-cake-option]').forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.dataset.cakeOption;
        document.querySelectorAll(`[data-cake-option="${group}"]`).forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        this.selections[group] = chip.dataset.value;
        this.updatePreview();
      });
    });

    const textInput = document.getElementById('cake-text-input');
    if (textInput) {
      textInput.addEventListener('input', e => {
        this.selections.text = e.target.value;
        this.updatePreview();
      });
    }

    const qtyMinus = document.getElementById('cake-qty-minus');
    const qtyPlus  = document.getElementById('cake-qty-plus');
    if (qtyMinus) qtyMinus.addEventListener('click', () => { if (this.selections.quantity > 1) { this.selections.quantity--; this.updatePreview(); } });
    if (qtyPlus)  qtyPlus.addEventListener('click', () => { this.selections.quantity++; this.updatePreview(); });

    const continueBtn = document.getElementById('cake-continue-btn');
    if (continueBtn) continueBtn.addEventListener('click', () => this.addToCart());

    this.updatePreview();
  }

  getUnitPrice() {
    return (this.basePrices[this.selections.size] || 380000)
      + (this.flavorExtra[this.selections.flavor] || 0)
      + (this.decorExtra[this.selections.decoration] || 0);
  }

  getTotal() { return this.getUnitPrice() * this.selections.quantity; }

  updatePreview() {
    const priceEl = document.getElementById('cake-preview-price');
    const qtyEl   = document.getElementById('cake-qty-display');
    const summaryEl = document.getElementById('cake-summary');
    const textPreviewEl = document.getElementById('cake-preview-text');

    if (priceEl) priceEl.textContent = formatPrice(this.getTotal());
    if (qtyEl)   qtyEl.textContent = this.selections.quantity;
    if (textPreviewEl) textPreviewEl.textContent = this.selections.text || '';
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:.5rem;text-align:left;font-size:.9rem">
          <div class="flex-between"><span style="color:var(--color-text-muted)">Size</span><strong>${this.selections.size}</strong></div>
          <div class="flex-between"><span style="color:var(--color-text-muted)">Flavor</span><strong>${this.selections.flavor}</strong></div>
          <div class="flex-between"><span style="color:var(--color-text-muted)">Cream</span><strong>${this.selections.cream}</strong></div>
          <div class="flex-between"><span style="color:var(--color-text-muted)">Decoration</span><strong>${this.selections.decoration}</strong></div>
          ${this.selections.text ? `<div class="flex-between"><span style="color:var(--color-text-muted)">Text</span><strong>"${this.selections.text}"</strong></div>` : ''}
        </div>`;
    }
    this.updateCakeVisual();
  }

  updateCakeVisual() {
    const visual = document.getElementById('cake-visual');
    if (!visual) return;
    const flavorColors = {
      Chocolate: '#4A2500', Vanilla: '#F5E6C8',
      'Red Velvet': '#8B0000', Matcha: '#2E7D32', Strawberry: '#C62828',
    };
    const creamColors = {
      Vanilla: '#FFF8E1', Chocolate: '#4A2500', Matcha: '#A5D6A7', Strawberry: '#FFCDD2',
    };
    const fc = flavorColors[this.selections.flavor] || '#4A2500';
    const cc = creamColors[this.selections.cream]   || '#FFF8E1';
    const sizeMap = { '6 inch': 130, '8 inch': 160, '10 inch': 190 };
    const sz = sizeMap[this.selections.size] || 160;

    visual.innerHTML = `
      <svg width="${sz}" height="${Math.round(sz * 0.85)}" viewBox="0 0 160 136" xmlns="http://www.w3.org/2000/svg" aria-label="Custom cake preview: ${this.selections.flavor} with ${this.selections.cream} cream">
        <!-- Base layers -->
        <ellipse cx="80" cy="118" rx="68" ry="14" fill="${fc}" opacity=".3"/>
        <rect x="12" y="70" width="136" height="48" rx="8" fill="${fc}"/>
        <rect x="12" y="50" width="136" height="26" rx="0" fill="${cc}" opacity=".9"/>
        <rect x="12" y="30" width="136" height="26" rx="0" fill="${fc}" opacity=".85"/>
        <rect x="12" y="10" width="136" height="26" rx="8 8 0 0" fill="${cc}" opacity=".95"/>
        <!-- Top frosting drip -->
        <path d="M12 18 Q30 28 48 18 Q66 28 84 18 Q102 28 120 18 Q138 28 148 18" stroke="${cc}" stroke-width="4" fill="none" opacity=".8"/>
        <!-- Decorative dots if Birthday/Anniversary -->
        ${this.selections.decoration === 'Birthday' || this.selections.decoration === 'Anniversary'
          ? '<circle cx="40" cy="8" r="4" fill="#C9A84C"/><circle cx="80" cy="5" r="4" fill="#C9A84C"/><circle cx="120" cy="8" r="4" fill="#C9A84C"/>'
          : ''}
        ${this.selections.decoration === 'Elegant'
          ? '<path d="M30 10 L50 10 M110 10 L130 10" stroke="#C9A84C" stroke-width="2"/>'
          : ''}
        <!-- Candles for Birthday -->
        ${this.selections.decoration === 'Birthday'
          ? '<rect x="38" y="-8" width="4" height="16" rx="2" fill="#C9A84C"/><ellipse cx="40" cy="-9" rx="3" ry="4" fill="#FFD700" opacity=".8"/>'
          : ''}
        <!-- Text on cake -->
        ${this.selections.text
          ? `<text x="80" y="92" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="${cc}" font-style="italic" opacity=".9">${this.selections.text.substring(0,18)}</text>`
          : ''}
      </svg>`;
  }

  addToCart() {
    if (!window.desserteCart) return;
    const product = {
      id: 'custom-cake-' + Date.now(),
      name: `Custom Cake (${this.selections.size})`,
      image: '',
      fallbackColor: '#2D5A3E',
      price: this.getUnitPrice(),
      sizes: null,
    };
    window.desserteCart.addItem(product, null, this.selections.quantity,
      `${this.selections.flavor} | ${this.selections.cream} cream | ${this.selections.decoration}${this.selections.text ? ` | "${this.selections.text}"` : ''}`
    );
  }
}

/* ---------------------------------------------------------------------------
   CHECKOUT FLOW
   --------------------------------------------------------------------------- */
class CheckoutFlow {
  constructor() {
    this.currentStep = 1;
    this.totalSteps  = 3;
    this.orderType   = 'delivery';
    this.payment     = 'e-wallet';
    this.init();
  }

  init() {
    this.loadCheckoutData();
    this.renderStep(1);
    this.bindStepNav();
  }

  loadCheckoutData() {
    try {
      const data = localStorage.getItem('desserte_checkout');
      this.checkoutData = data ? JSON.parse(data) : null;
    } catch { this.checkoutData = null; }
    this.renderSummary();
  }

  renderSummary() {
    const summaryEl = document.getElementById('checkout-order-summary');
    if (!summaryEl || !this.checkoutData) return;
    const d = this.checkoutData;
    const itemsHtml = (d.items || []).map(item => `
      <div class="checkout-item">
        <div class="checkout-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
        </div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:.9rem">${item.name}</div>
          ${item.size ? `<div style="font-size:.8rem;color:var(--color-text-muted)">${item.size}</div>` : ''}
          <div style="font-size:.8rem;color:var(--color-text-muted)">Qty: ${item.quantity}</div>
        </div>
        <div style="font-weight:700;color:var(--color-primary);font-size:.9rem">${formatPrice(item.price * item.quantity)}</div>
      </div>`).join('');

    summaryEl.innerHTML = `
      ${itemsHtml}
      <div style="border-top:1px solid var(--cream-200);padding-top:1rem;margin-top:.5rem">
        <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(d.subtotal)}</span></div>
        ${d.discount > 0 ? `<div class="cart-summary-row" style="color:#059669"><span>Discount</span><span>- ${formatPrice(d.discount)}</span></div>` : ''}
        <div class="cart-summary-row"><span>Delivery</span><span>${d.deliveryFee === 0 ? 'Free' : formatPrice(d.deliveryFee)}</span></div>
        <div class="cart-summary-row cart-summary-total">
          <span>Total</span><span>${formatPrice(d.total)}</span>
        </div>
      </div>`;
  }

  bindStepNav() {
    document.getElementById('next-step-btn') && document.getElementById('next-step-btn').addEventListener('click', () => this.nextStep());
    document.getElementById('prev-step-btn') && document.getElementById('prev-step-btn').addEventListener('click', () => this.prevStep());
    document.getElementById('place-order-btn') && document.getElementById('place-order-btn').addEventListener('click', () => this.placeOrder());
  }

  renderStep(step) {
    // Update step indicators
    document.querySelectorAll('.step-item').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i + 1 === step) el.classList.add('active');
      if (i + 1 < step)  el.classList.add('done');
    });

    // Show/hide step panels
    document.querySelectorAll('.checkout-step-panel').forEach((panel, i) => {
      panel.style.display = (i + 1 === step) ? 'block' : 'none';
    });

    const prevBtn = document.getElementById('prev-step-btn');
    const nextBtn = document.getElementById('next-step-btn');
    const placeBtn = document.getElementById('place-order-btn');
    if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = step < this.totalSteps ? 'inline-flex' : 'none';
    if (placeBtn) placeBtn.style.display = step === this.totalSteps ? 'inline-flex' : 'none';
  }

  nextStep() {
    if (!this.validateCurrentStep()) return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.renderStep(this.currentStep);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderStep(this.currentStep);
    }
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      const name  = document.getElementById('customer-name');
      const phone = document.getElementById('customer-phone');
      const email = document.getElementById('customer-email');
      let valid = true;
      [name, phone, email].forEach(field => {
        if (field && !field.value.trim()) {
          field.classList.add('error');
          valid = false;
        } else if (field) {
          field.classList.remove('error');
        }
      });
      if (!valid) {
        window.desserteToast && window.desserteToast.show('Please fill in all required fields.', 'error');
        return false;
      }
    }
    return true;
  }

  placeOrder() {
    const toast = window.desserteToast;
    if (toast) toast.show('Order placed successfully! Thank you &#10084;', 'success', 4000);
    localStorage.removeItem('desserte_cart');
    setTimeout(() => window.location.href = 'index.html', 2500);
  }
}

/* ---------------------------------------------------------------------------
   OUTLET LOCATOR
   --------------------------------------------------------------------------- */
function renderOutlets() {
  const list = document.getElementById('outlet-list-items');
  if (!list || !window.DESSERTE_DATA) return;
  list.innerHTML = DESSERTE_DATA.outlets.map((outlet, i) => `
    <div class="outlet-card ${i === 0 ? 'active' : ''}" data-outlet-id="${outlet.id}" onclick="selectOutlet('${outlet.id}')">
      <div class="outlet-name">${outlet.name}</div>
      <div class="outlet-detail">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${outlet.address}
      </div>
      <div class="outlet-detail">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${outlet.hours}
      </div>
      <div class="outlet-detail">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 2.84h3a2 2 0 012 1.72c.13.96.36 1.9.69 2.81a2 2 0 01-.45 2.11L6.91 10a16 16 0 006.09 6.09l1.52-1.52a2 2 0 012.11-.45c.91.33 1.85.56 2.81.69a2 2 0 011.72 2.02z"/></svg>
        ${outlet.phone}
      </div>
      <div style="display:flex;gap:.5rem;margin-top:1rem">
        <a href="${outlet.maps}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Get Directions</a>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();window.location.href='menu.html'">Order Here</button>
      </div>
    </div>`).join('');
}

function selectOutlet(id) {
  document.querySelectorAll('.outlet-card').forEach(c => c.classList.remove('active'));
  const card = document.querySelector(`[data-outlet-id="${id}"]`);
  if (card) card.classList.add('active');
}

/* ---------------------------------------------------------------------------
   ADMIN DASHBOARD
   --------------------------------------------------------------------------- */
function initAdmin() {
  renderAdminStats();
  renderAdminOrders();
  renderAdminProducts();
  bindAdminNav();
}

function renderAdminStats() {
  const stats = [
    { label: "Today's Orders", value: '42', change: '+12%', trend: 'up', class: '' },
    { label: "Today's Revenue", value: 'Rp 3.2M', change: '+8%', trend: 'up', class: 'gold' },
    { label: 'Total Products', value: '16', change: '+2 new', trend: 'up', class: 'teal' },
    { label: 'Active Promotions', value: '4', change: '2 ending soon', trend: 'down', class: 'rose' },
  ];
  const grid = document.getElementById('admin-stats-grid');
  if (!grid) return;
  grid.innerHTML = stats.map(s => `
    <div class="stat-card ${s.class}">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value">${s.value}</div>
      <div class="stat-change ${s.trend}">${s.trend === 'up' ? '&#8593;' : '&#8595;'} ${s.change}</div>
    </div>`).join('');
}

function renderAdminOrders() {
  const tbody = document.getElementById('admin-orders-body');
  if (!tbody) return;
  const orders = [
    { id: '#DS-4021', customer: 'Siti Rahayu', items: 'Chocolate Royale x2', total: 'Rp 90.000', status: 'processing', time: '10 min ago' },
    { id: '#DS-4020', customer: 'Budi Santoso', items: 'Tiramisu Classic', total: 'Rp 42.000', status: 'preparing', time: '25 min ago' },
    { id: '#DS-4019', customer: 'Anindita P.', items: 'Custom Birthday Cake', total: 'Rp 430.000', status: 'delivered', time: '1 hr ago' },
    { id: '#DS-4018', customer: 'Kevin Wijaya', items: 'Strawberry Cheesecake', total: 'Rp 48.000', status: 'delivered', time: '2 hrs ago' },
    { id: '#DS-4017', customer: 'Dewi Kusuma', items: 'Matcha Latte x2', total: 'Rp 70.000', status: 'cancelled', time: '3 hrs ago' },
  ];
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td style="color:var(--color-text-muted)">${o.items}</td>
      <td><strong>${o.total}</strong></td>
      <td><span class="order-status status-${o.status}">${o.status}</span></td>
      <td style="color:var(--color-text-muted)">${o.time}</td>
      <td>
        <select class="input-field" style="padding:.375rem .625rem;font-size:.8rem;width:auto" onchange="updateOrderStatus('${o.id}', this.value)">
          <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
          <option value="preparing"  ${o.status === 'preparing'  ? 'selected' : ''}>Preparing</option>
          <option value="delivered"  ${o.status === 'delivered'  ? 'selected' : ''}>Delivered</option>
          <option value="cancelled"  ${o.status === 'cancelled'  ? 'selected' : ''}>Cancelled</option>
        </select>
      </td>
    </tr>`).join('');
}

function updateOrderStatus(orderId, status) {
  window.desserteToast && window.desserteToast.show(`Order ${orderId} updated to "${status}"`, 'success');
}

function renderAdminProducts() {
  const tbody = document.getElementById('admin-products-body');
  if (!tbody || !window.DESSERTE_DATA) return;
  tbody.innerHTML = DESSERTE_DATA.products.map(p => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:.75rem">
          <div style="width:44px;height:44px;border-radius:8px;background:${p.fallbackColor}20;overflow:hidden;flex-shrink:0">
            <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">
          </div>
          <strong>${p.name}</strong>
        </div>
      </td>
      <td style="color:var(--color-text-muted)">${p.category.join(', ')}</td>
      <td><strong>${formatPrice(p.price)}</strong></td>
      <td><span class="stars" style="font-size:.8rem">${'&#9733;'.repeat(Math.floor(p.rating))}</span> ${p.rating}</td>
      <td>${p.badge ? `<span class="badge ${p.badge === 'New' ? 'badge-new' : 'badge-gold'}">${p.badge}</span>` : '<span style="color:var(--color-text-muted)">—</span>'}</td>
      <td>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-ghost btn-sm" onclick="editProduct('${p.id}')">Edit</button>
          <button class="btn btn-sm" style="color:#E11D48;background:#FEE2E2;border-radius:var(--radius-full)" onclick="deleteProduct('${p.id}')">Delete</button>
        </div>
      </td>
    </tr>`).join('');
}

function editProduct(id) {
  window.desserteToast && window.desserteToast.show(`Editing product ${id}...`, 'info');
}

function deleteProduct(id) {
  if (confirm('Delete this product?')) {
    window.desserteToast && window.desserteToast.show('Product deleted.', 'success');
  }
}

function bindAdminNav() {
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const panel = item.dataset.panel;
      document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
      const target = document.getElementById(`panel-${panel}`);
      if (target) target.style.display = 'block';
    });
  });
}

/* ---------------------------------------------------------------------------
   INIT ON PAGE LOAD
   --------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Product catalog page
  if (document.getElementById('products-grid')) {
    window.productCatalog = new ProductCatalog('products-grid');
  }

  // Product modal (available on all pages)
  window.productModal = new ProductModal();

  // Homepage sections
  if (document.getElementById('best-sellers-track')) renderBestSellers();
  if (document.getElementById('promos-grid'))        renderPromos();
  if (document.getElementById('reviews-track'))      renderReviews();

  // Carousels
  setTimeout(() => {
    if (document.getElementById('best-sellers-track')) initCarousel('best-sellers-track', 'bs-prev', 'bs-next', 250);
    if (document.getElementById('reviews-track'))       initCarousel('reviews-track', 'rev-prev', 'rev-next', 360);
  }, 200);

  // Checkout
  if (document.getElementById('checkout-form')) {
    window.checkoutFlow = new CheckoutFlow();
  }

  // Cake builder
  if (document.getElementById('cake-builder')) {
    window.cakeBuilder = new CakeBuilder();
  }

  // Outlet locator
  if (document.getElementById('outlet-list-items')) renderOutlets();

  // Admin
  if (document.getElementById('admin-stats-grid')) initAdmin();
});
