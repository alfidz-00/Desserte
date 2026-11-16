/* =============================================================================
   DESSERTÉ — Luxury Layer (interactions)
   Depends on (optional, loaded from CDN): GSAP, ScrollTrigger, Lenis.
   If any library fails to load, the page degrades to a clean static layout.
   Existing logic (cart, checkout, auth, data) is NOT modified — only extended.
   ============================================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 860px)');
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function findProduct(id) {
    var list = (window.DESSERTE_DATA && DESSERTE_DATA.products) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function unitPrice(p) {
    return p.sizes && p.sizes[0] ? p.sizes[0].price : p.price; // same default CartManager.addItem uses
  }

  /* -------------------------------------------------------------------------
     1. EDITORIAL PRODUCT CARD (overrides rendering only; ProductCatalog's
        filtering, search and category logic are reused as-is)
     ------------------------------------------------------------------------- */
  if (typeof ProductCatalog !== 'undefined' && ProductCatalog.prototype) {
    ProductCatalog.prototype.renderCard = function (p) {
      var badge = p.badge
        ? '<span class="product-badge badge ' + (p.badge === 'New' ? 'badge-new' : 'badge-gold') + '">' + esc(p.badge) + '</span>'
        : '';
      var notes = String(p.ingredients || '').split(',').slice(0, 3)
        .map(function (s) { return s.trim(); }).filter(Boolean).join(' · ');
      var from = p.sizes && p.sizes.length > 1 ? '<small style="font:600 .6rem var(--font-body);letter-spacing:.16em;text-transform:uppercase;color:var(--brown-300);margin-right:.35rem">from</small>' : '';
      var desc = String(p.description || '');
      return '' +
        '<article class="product-card lux-card" data-product-id="' + esc(p.id) + '">' +
          '<button type="button" class="lux-card-media" data-lux-detail="' + esc(p.id) + '" aria-label="View details: ' + esc(p.name) + '">' +
            '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" onerror="this.style.opacity=0">' +
            badge +
          '</button>' +
          '<div class="lux-card-info">' +
            (notes ? '<div class="lux-card-notes">' + esc(notes) + '</div>' : '') +
            '<h3 class="product-name">' + esc(p.name) + '</h3>' +
            '<p class="product-desc">' + esc(desc.length > 95 ? desc.slice(0, 95) + '…' : desc) + '</p>' +
            '<div class="lux-card-foot">' +
              '<div class="price">' + from + formatPrice(unitPrice(p)) + '</div>' +
              '<div class="lux-card-actions">' +
                '<button type="button" class="lux-link-btn" data-lux-detail="' + esc(p.id) + '">Detail</button>' +
                '<button type="button" class="lux-add-btn" data-lux-add="' + esc(p.id) + '" aria-label="Add ' + esc(p.name) + ' to cart">Add +</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>';
    };
    // If the catalog was already rendered before this script ran, redraw it.
    if (window.productCatalog && typeof window.productCatalog.render === 'function') window.productCatalog.render();
  }

  /* Delegated actions (work for cards that are re-rendered by filters/search) */
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-lux-detail],[data-lux-add],[data-lux-open]');
    if (!t) return;
    var id = t.getAttribute('data-lux-detail') || t.getAttribute('data-lux-add') || t.getAttribute('data-lux-open');
    if (t.hasAttribute('data-lux-add')) {
      var p = findProduct(id);
      if (p && window.desserteCart) window.desserteCart.addItem(p, null, 1, '');
    } else if (window.productModal) {
      window.productModal.open(id);
    }
  });

  /* -------------------------------------------------------------------------
     2. STORY SECTION — price from real data (never hard-coded)
     ------------------------------------------------------------------------- */
  var storyProduct = findProduct('strawberry-cheesecake');
  var priceEl = document.getElementById('story-price');
  if (priceEl) {
    if (storyProduct) priceEl.textContent = formatPrice(unitPrice(storyProduct));
    else priceEl.parentNode.removeChild(priceEl);
  }

  /* -------------------------------------------------------------------------
     3. PAGE TRANSITIONS (curtain). Pure fade; never blocks a navigation.
     ------------------------------------------------------------------------- */
  var curtain = document.querySelector('.lux-curtain');
  if (curtain && !reduced) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / hash
      e.preventDefault();
      curtain.classList.add('is-leaving');
      setTimeout(function () { location.href = url.href; }, 360);
    });
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) { curtain.classList.remove('is-leaving'); curtain.style.display = 'none'; }
    });
  }

  /* -------------------------------------------------------------------------
     4. SMOOTH SCROLL (Lenis) — desktop pointer devices only
     ------------------------------------------------------------------------- */
  var lenis = null;
  if (window.Lenis && finePointer && !reduced) {
    try {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      if (hasGSAP) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
      }
      // Let overlays scroll natively and pause Lenis while any modal/drawer locks the body
      ['#cart-drawer', '#product-overlay', '#product-modal', '#outlet-overlay', '#search-overlay', '#mobile-menu-drawer']
        .forEach(function (sel) { var el = document.querySelector(sel); if (el) el.setAttribute('data-lenis-prevent', ''); });
      new MutationObserver(function () {
        if (document.body.style.overflow === 'hidden') lenis.stop(); else lenis.start();
      }).observe(document.body, { attributes: true, attributeFilter: ['style'] });
      // Smooth in-page anchors
      document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a) return;
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      });
      document.documentElement.classList.add('lenis', 'lenis-smooth');
    } catch (err) { lenis = null; }
  }

  /* -------------------------------------------------------------------------
     5. SCROLL-DRIVEN STORY + PARALLAX + REVEAL (GSAP / ScrollTrigger)
     ------------------------------------------------------------------------- */
  // Native scroll-story fallback: the signature animation must still work
  // when a CDN is blocked, slow, or unavailable (common on GitHub Pages visitors).
  if (!hasGSAP && !reduced) {
    var nativeStory = document.getElementById('story');
    if (nativeStory) {
      var nativeCam = nativeStory.querySelector('.lux-story-cam');
      var nativeFrames = [].slice.call(nativeStory.querySelectorAll('.lux-story-cam img'));
      var nativeSteps = [].slice.call(nativeStory.querySelectorAll('.lux-step'));
      var nativeBar = nativeStory.querySelector('.lux-story-progress i');
      var nativeCounter = nativeStory.querySelector('.lux-story-count');
      if (nativeFrames.length > 1 && nativeSteps.length === nativeFrames.length) {
        nativeStory.classList.add('is-native-anim');
        var nativeQueued = false;
        function updateNativeStory() {
          nativeQueued = false;
          var rect = nativeStory.getBoundingClientRect();
          var distance = Math.max(1, nativeStory.offsetHeight - window.innerHeight);
          var progress = Math.max(0, Math.min(1, -rect.top / distance));
          var position = progress * (nativeFrames.length - 1);
          var active = Math.min(nativeFrames.length - 1, Math.floor(position + 0.001));
          var blend = Math.max(0, Math.min(1, position - active));
          nativeFrames.forEach(function (frame, index) {
            var opacity = index === active ? 1 - blend : (index === active + 1 ? blend : 0);
            frame.style.display = 'block';
            frame.style.opacity = String(opacity);
          });
          nativeSteps.forEach(function (step, index) {
            var opacity = index === active ? 1 : 0;
            step.style.display = 'block';
            step.style.visibility = opacity ? 'visible' : 'hidden';
            step.style.opacity = String(opacity);
            step.style.transform = opacity ? 'translateY(0)' : 'translateY(18px)';
          });
          if (nativeBar) nativeBar.style.transform = 'scaleX(' + progress + ')';
          if (nativeCounter) nativeCounter.textContent =
            ('0' + (active + 1)).slice(-2) + ' / ' + ('0' + nativeFrames.length).slice(-2);
          if (nativeCam) nativeCam.style.transform = 'scale(' + (1 + progress * 0.07) + ')';
        }
        function queueNativeStory() {
          if (!nativeQueued) {
            nativeQueued = true;
            window.requestAnimationFrame(updateNativeStory);
          }
        }
        window.addEventListener('scroll', queueNativeStory, { passive: true });
        window.addEventListener('resize', queueNativeStory);
        updateNativeStory();
      }
    }
  }
  if (!hasGSAP || reduced) return; // native/static fallback has already handled the story

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('lux-anim');

  // Hero parallax (desktop/tablet)
  var heroImg = document.querySelector('.lux-hero-frame img');
  if (heroImg && !isMobile.matches) {
    gsap.to(heroImg, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: '.lux-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // Signature scroll story
  var story = document.getElementById('story');
  if (story) {
    var cam = story.querySelector('.lux-story-cam');
    var frames = [].slice.call(story.querySelectorAll('.lux-story-cam img'));
    var steps = [].slice.call(story.querySelectorAll('.lux-step'));
    var bar = story.querySelector('.lux-story-progress i');
    var counter = story.querySelector('.lux-story-count');
    var N = frames.length;

    if (N > 1 && steps.length === N) {
      gsap.set(frames.slice(1), { opacity: 0 });
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 30 });

      var tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: story,
          start: 'top top',
          end: function () { return '+=' + Math.round(window.innerHeight * (isMobile.matches ? 2.4 : 4.6)); },
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            if (!counter) return;
            var i = Math.min(N, Math.max(1, Math.round(self.progress * (N - 1)) + 1));
            counter.textContent = ('0' + i).slice(-2) + ' / ' + ('0' + N).slice(-2);
          }
        }
      });

      // "Camera": slow push-in across the whole story (lighter on mobile)
      tl.fromTo(cam, { scale: 1, yPercent: 0 }, { scale: isMobile.matches ? 1.05 : 1.12, yPercent: isMobile.matches ? 0 : -1.5, duration: N }, 0);
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: N }, 0);

      // Each stage: next frame develops over the previous one, copy swaps in sync
      for (var i = 1; i < N; i++) {
        var t0 = i - 0.45;
        tl.to(frames[i], { opacity: 1, duration: 0.5, ease: 'power1.inOut' }, t0)
          .to(steps[i - 1], { autoAlpha: 0, y: -30, duration: 0.35, ease: 'power1.in' }, t0 - 0.05)
          .fromTo(steps[i], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, t0 + 0.2);
      }
      tl.to({}, { duration: 0.8 }); // hold the finished dessert + CTA before releasing the pin
    } else {
      document.documentElement.classList.remove('lux-anim'); // markup mismatch → safe static fallback
    }
  }

  // Scroll reveal
  var revealSel = '.section-tag, .section-title, .section-subtitle, .quick-order-grid, .promos-grid, .custom-cake-banner, .about-values';
  var els = [].slice.call(document.querySelectorAll(revealSel));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { el.classList.add('lux-reveal'); io.observe(el); });
  }

  // Preload story frames after load so scrubbing never pops
  window.addEventListener('load', function () {
    document.querySelectorAll('.lux-story-cam img').forEach(function (img) {
      var pre = new Image(); pre.src = img.currentSrc || img.src;
    });
    ScrollTrigger.refresh();
  });
})();
