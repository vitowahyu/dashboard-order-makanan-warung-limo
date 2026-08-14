/**
 * ============================================================
 *  STORAGE.SERVICE.JS — WRAPPER localStorage
 * ============================================================
 *  Layanan generik untuk simpan/ambil/hapus data di browser.
 *  Dibuat terpisah dari keranjang.layanan.js supaya bisa dipakai
 *  ulang kalau nanti ada fitur baru yang butuh persistensi,
 *  misalnya "menu favorit" atau "riwayat pesanan".
 *
 *  Kamu TIDAK PERLU edit file ini untuk kustomisasi toko.
 * ============================================================
 */

const StorageService = (() => {
  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error(`[StorageService] Gagal membaca "${key}":`, err);
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[StorageService] Gagal menyimpan "${key}":`, err);
      return false;
    }
  }

  function remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`[StorageService] Gagal menghapus "${key}":`, err);
    }
  }

  return { get, set, remove };
})();

window.StorageService = StorageService;
