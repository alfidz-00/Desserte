# Desserté — Luxury Upgrade Notes

## File baru
- `src/css/luxury.css` — seluruh lapisan desain (hanya aktif pada halaman ber-`<body class="lux">`).
- `src/js/luxury.js` — hero, scroll story (GSAP ScrollTrigger), Lenis, kartu produk editorial, transisi halaman.
- `images/story/01–06.jpg` — frame animasi scroll (strawberry cheesecake). **Visual konsep hasil generate, bukan foto produk final — ganti dengan foto asli bila tersedia (nama & urutan file sama).**
- `images/products/opt/*.webp` — versi WebP (maks. 1000 px) semua foto produk: 39 MB → 2,8 MB. File asli TIDAK dihapus.

## File yang diubah
- `index.html` — hero baru + section `#story`; `<body class="lux">`; tag CSS/JS. Bagian lain (promo, best seller, katalog, custom cake, about, review, footer, cart drawer, modal) tidak diubah.
- `menu.html` — hanya `<body class="lux">`, tag CSS/JS, curtain.
- `src/data/data.js` — hanya path `image` produk → `images/products/opt/*.webp`.
- Backup: `_backup_original/` (index.html, menu.html, data.js).

## Tidak diubah
cart.js, auth.js, navbar.js, products.js, checkout, admin, promo, cake, about, contact, login, customer-orders.

## Rollback
Salin isi `_backup_original/` kembali ke lokasi semula; atau hapus tag `luxury.css` / `luxury.js` untuk mematikan lapisan desain.

## Dependensi (CDN, versi dipin)
GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.13 (jsDelivr). Bila gagal dimuat, halaman tampil statis (dessert final + CTA).
