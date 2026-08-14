/**
 * ============================================================
 *  PENGATURAN/PENGGABUNG.JS — PENGGABUNG SEMUA PENGATURAN
 * ============================================================
 *  JANGAN edit file ini untuk mengganti pengaturan toko!
 *  File ini cuma menggabungkan pengaturan/*.pengaturan.js menjadi
 *  satu objek CONFIG, supaya layanan/komponen lain gampang akses.
 *
 *  Mau ganti sesuatu? Cari file pengaturannya masing-masing:
 *    - Identitas toko & WA -> pengaturan/toko.pengaturan.js
 *    - Ongkos kirim        -> pengaturan/pengiriman.pengaturan.js
 *    - Metode pembayaran   -> pengaturan/pembayaran.pengaturan.js
 *    - Label badge menu    -> pengaturan/label.pengaturan.js
 * ============================================================
 */

const CONFIG = {
  // Identitas toko
  storeName: STORE_CONFIG.name,
  storeTagline: STORE_CONFIG.tagline,
  storeLogoText: STORE_CONFIG.logoText,
  storeAddress: STORE_CONFIG.address,
  storeOpenHours: STORE_CONFIG.openHours,
  storePhoneDisplay: STORE_CONFIG.phoneDisplay,
  whatsappNumber: STORE_CONFIG.whatsappNumber,
  currencyPrefix: STORE_CONFIG.currencyPrefix,

  // Ongkos kirim
  deliveryFee: DELIVERY_CONFIG.fee,
  freeDeliveryMinOrder: DELIVERY_CONFIG.freeMinOrder,

  // Pembayaran
  paymentMethods: PAYMENT_CONFIG.methods,
  qrisImage: PAYMENT_CONFIG.qrisImage,

  // Badge
  badgeLabels: BADGE_CONFIG,
};

window.CONFIG = CONFIG;
