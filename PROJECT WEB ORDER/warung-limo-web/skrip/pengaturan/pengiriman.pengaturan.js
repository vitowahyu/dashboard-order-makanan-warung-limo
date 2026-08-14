/**
 * ============================================================
 *  PENGIRIMAN.PENGATURAN.JS — ATURAN ONGKOS KIRIM
 * ============================================================
 *  Mau ganti tarif ongkir atau syarat gratis ongkir?
 *  HANYA edit file ini. Logika hitungnya ada di
 *  skrip/layanan/pengiriman.layanan.js — tidak perlu disentuh.
 * ============================================================
 */

const DELIVERY_CONFIG = {
  fee: 0, // Ongkir flat (Rupiah). Set 0 jika gratis ongkir selalu (angka biasa, BUKAN kata "GRATIS").
  freeMinOrder: 0, // Gratis ongkir jika belanja >= angka ini. Set 0 untuk nonaktifkan.
};

window.DELIVERY_CONFIG = DELIVERY_CONFIG;
