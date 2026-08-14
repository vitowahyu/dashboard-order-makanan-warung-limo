/**
 * ============================================================
 *  NOTIFIKASI.KOMPONEN.JS — NOTIFIKASI KECIL DI BAWAH LAYAR
 * ============================================================
 *  Komponen paling sederhana: cuma mendengarkan event
 *  "toast:show" dari fitur mana pun (menu, checkout, dll) dan
 *  menampilkan pesannya sebentar.
 *
 *  Fitur lain TIDAK perlu tahu cara kerja toast — cukup panggil:
 *    EventBus.emit("toast:show", "Pesan kamu di sini");
 * ============================================================
 */

const ToastComponent = (() => {
  let hideTimer = null;

  function show(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("toast--visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      el.classList.remove("toast--visible");
    }, 2200);
  }

  function init() {
    EventBus.on("toast:show", show);
  }

  return { init };
})();

window.ToastComponent = ToastComponent;
