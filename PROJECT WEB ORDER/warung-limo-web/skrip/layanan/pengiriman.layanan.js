/**
 * ============================================================
 *  PENGIRIMAN.LAYANAN.JS — LOGIKA ONGKOS KIRIM
 * ============================================================
 *  Dipisah dari whatsapp.layanan.js supaya aturan ongkir bisa
 *  dipakai di mana saja (drawer keranjang, checkout, pesan WA)
 *  tanpa duplikasi logika.
 *
 *  Mau ubah ATURAN ongkir (angka tarif / syarat gratis ongkir)?
 *  Edit skrip/pengaturan/pengiriman.pengaturan.js, BUKAN file ini.
 * ============================================================
 */

const DeliveryService = (() => {
  function getFee(subtotal) {
    const { fee, freeMinOrder } = DELIVERY_CONFIG;
    if (freeMinOrder > 0 && subtotal >= freeMinOrder) {
      return 0;
    }
    return fee;
  }

  return { getFee };
})();

window.DeliveryService = DeliveryService;
