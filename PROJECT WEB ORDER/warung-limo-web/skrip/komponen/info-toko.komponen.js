/**
 * ============================================================
 *  INFO-TOKO.KOMPONEN.JS — INFO TOKO (HEADER, FOOTER, QRIS)
 * ============================================================
 *  Menampilkan data dari STORE_CONFIG & PAYMENT_CONFIG ke DOM.
 *  Komponen ini statis (tidak berubah selama sesi berjalan),
 *  jadi cukup di-render sekali saat init().
 *
 *  Mau ganti ISI teksnya? Edit skrip/pengaturan/toko.pengaturan.js.
 *  Mau ganti STRUKTUR/HTML-nya? Edit index.html (elemen dengan
 *  id yang dipakai di bawah) + file ini.
 * ============================================================
 */

const StoreInfoComponent = (() => {
  function render() {
    document.getElementById("storeName").textContent = STORE_CONFIG.name;
    document.getElementById("storeTagline").textContent = STORE_CONFIG.tagline;
    document.getElementById("storeLogoText").textContent = STORE_CONFIG.logoText;

    document.getElementById("footerStoreName").textContent = STORE_CONFIG.name;
    document.getElementById("footerAddress").textContent = STORE_CONFIG.address;
    document.getElementById("footerHours").textContent = STORE_CONFIG.openHours;
    document.getElementById("footerPhone").textContent = STORE_CONFIG.phoneDisplay;

    document.getElementById("qrisImage").src = PAYMENT_CONFIG.qrisImage;
  }

  function init() {
    render();
    setCurrentYear();
  }

  function setCurrentYear() {
    const el = document.getElementById("currentYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  return { init };
})();

window.StoreInfoComponent = StoreInfoComponent;
