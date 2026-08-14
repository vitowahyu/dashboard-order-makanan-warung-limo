/**
 * ============================================================
 *  LAPISAN.KOMPONEN.JS — BACKDROP GELAP DI BELAKANG PANEL
 * ============================================================
 *  Overlay dipakai bareng oleh drawer keranjang & modal checkout,
 *  jadi logikanya disatukan di sini alih-alih diduplikasi di
 *  kedua komponen tersebut.
 *
 *  Cara kerja: komponen ini TIDAK TAHU apa itu "drawer" atau
 *  "modal" — dia cuma menghitung berapa panel yang sedang
 *  terbuka lewat event ui:open-... dan ui:close-..., lalu
 *  menampilkan/menyembunyikan dirinya sendiri. Saat overlay diklik, dia
 *  mengumumkan "ui:close-all" — drawer & modal masing-masing
 *  yang memutuskan apakah perlu menutup diri.
 * ============================================================
 */

const OverlayComponent = (() => {
  let openCount = 0;

  function show() {
    document.getElementById("overlay").classList.add("overlay--visible");
  }

  function hide() {
    document.getElementById("overlay").classList.remove("overlay--visible");
  }

  function handleOpen() {
    openCount += 1;
    show();
  }

  function handleClose() {
    openCount = Math.max(0, openCount - 1);
    if (openCount === 0) hide();
  }

  function bindEvents() {
    EventBus.on("ui:open-cart", handleOpen);
    EventBus.on("ui:close-cart", handleClose);
    EventBus.on("ui:open-checkout", handleOpen);
    EventBus.on("ui:close-checkout", handleClose);
    EventBus.on("ui:open-variant", handleOpen);
    EventBus.on("ui:close-variant", handleClose);

    document.getElementById("overlay").addEventListener("click", () => {
      EventBus.emit("ui:close-all");
    });
  }

  function init() {
    bindEvents();
  }

  return { init };
})();

window.OverlayComponent = OverlayComponent;
