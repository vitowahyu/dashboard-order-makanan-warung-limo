/**
 * ============================================================
 *  APLIKASI.JS — TITIK MASUK UTAMA APLIKASI
 * ============================================================
 *  File ini SENGAJA dibuat tipis. Tugasnya cuma menyalakan
 *  (init) setiap komponen fitur saat halaman siap.
 *
 *  Tidak ada logika bisnis atau manipulasi DOM detail di sini —
 *  semua itu ada di file masing-masing fitur (skrip/komponen/,
 *  skrip/layanan/). Kalau kamu menambah fitur baru, cukup:
 *    1. Buat file komponennya di skrip/komponen/
 *    2. Tambahkan <script> tag-nya di index.html
 *    3. Panggil <NamaKomponen>.init() di bawah ini
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  StoreInfoComponent.init();
  CategoryComponent.init();
  MenuComponent.init();
  VariantModalComponent.init();
  CartDrawerComponent.init();
  FloatCartComponent.init();
  PaymentMethodComponent.init();
  CheckoutModalComponent.init();
  OverlayComponent.init();
  ToastComponent.init();
});
