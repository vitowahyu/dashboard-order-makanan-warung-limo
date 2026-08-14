/**
 * ============================================================
 *  LABEL.PENGATURAN.JS — LABEL BADGE MENU
 * ============================================================
 *  Mau ganti teks badge ("Best Seller", "Baru", "Pedas")?
 *  HANYA edit file ini. Kunci (key) di kiri harus sama persis
 *  dengan nilai "badge" di skrip/data/item-menu.data.js.
 *
 *  Mau tambah jenis badge baru? Tambah key baru di sini, lalu
 *  tambahkan juga class warnanya di tampilan/komponen/label.css
 *  (contoh: .badge--promo { background: ...; }).
 * ============================================================
 */

const BADGE_CONFIG = {
  bestseller: "Best Seller",
  baru: "Baru",
  pedas: "Pedas",
  banyakdibeli: "Banyak dibeli" ,
};

window.BADGE_CONFIG = BADGE_CONFIG;
