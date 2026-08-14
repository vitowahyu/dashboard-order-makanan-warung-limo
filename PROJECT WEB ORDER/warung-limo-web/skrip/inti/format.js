/**
 * ============================================================
 *  FORMAT.JS — FORMAT ANGKA/MATA UANG
 * ============================================================
 *  Dipisah dari whatsapp.layanan.js supaya semua komponen yang
 *  perlu menampilkan harga (kartu menu, keranjang, checkout)
 *  memakai satu fungsi yang sama, tidak duplikat logika.
 *
 *  Kamu TIDAK PERLU edit file ini. Mau ganti simbol mata uang?
 *  Edit "currencyPrefix" di pengaturan/toko.pengaturan.js.
 * ============================================================
 */

const Format = (() => {
  function currency(amount) {
    const prefix = (window.STORE_CONFIG && STORE_CONFIG.currencyPrefix) || "Rp";
    return `${prefix} ${Number(amount || 0).toLocaleString("id-ID")}`;
  }

  return { currency };
})();

window.Format = Format;
