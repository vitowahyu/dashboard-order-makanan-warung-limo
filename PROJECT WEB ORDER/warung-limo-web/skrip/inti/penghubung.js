/**
 * ============================================================
 *  PENGHUBUNG.JS — PENGHUBUNG ANTAR FITUR (EVENT BUS)
 * ============================================================
 *  Ini "jantung" dari struktur modular web ini.
 *
 *  Alih-alih fitur A memanggil fungsi fitur B secara langsung
 *  (yang bikin fitur-fitur saling terikat erat dan susah
 *  diganti satu-satu), setiap fitur cukup:
 *    - EventBus.emit("nama:event", data)   -> mengumumkan sesuatu terjadi
 *    - EventBus.on("nama:event", handler)  -> bereaksi kalau itu terjadi
 *
 *  Contoh: saat keranjang berubah, keranjang.layanan.js cukup
 *  emit("cart:changed"). Komponen mana pun yang perlu tahu
 *  (menu, drawer, floating bar) tinggal berlangganan sendiri.
 *  Kalau salah satu komponen mau diganti/dihapus, file lain
 *  tidak perlu ikut diubah.
 *
 *  Kamu TIDAK PERLU edit file ini untuk kustomisasi toko.
 * ============================================================
 */

const EventBus = (() => {
  const listeners = {};

  function on(eventName, handler) {
    if (!listeners[eventName]) listeners[eventName] = [];
    listeners[eventName].push(handler);
    // Kembalikan fungsi untuk unsubscribe kalau diperlukan nanti
    return () => off(eventName, handler);
  }

  function off(eventName, handler) {
    if (!listeners[eventName]) return;
    listeners[eventName] = listeners[eventName].filter((h) => h !== handler);
  }

  function emit(eventName, payload) {
    if (!listeners[eventName]) return;
    listeners[eventName].forEach((handler) => handler(payload));
  }

  return { on, off, emit };
})();

window.EventBus = EventBus;
