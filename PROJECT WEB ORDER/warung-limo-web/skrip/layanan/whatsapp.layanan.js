/**
 * ============================================================
 *  WHATSAPP.LAYANAN.JS — FORMAT PESAN & KIRIM KE WHATSAPP
 * ============================================================
 *  Mengubah data pesanan (keranjang + data customer) menjadi
 *  pesan WhatsApp yang rapi, lalu membuka chat WA otomatis.
 *
 *  Mau ubah SUSUNAN/FORMAT teks pesan yang dikirim ke toko?
 *  Edit fungsi buildMessage() di bawah ini.
 *
 *  Mau ganti nomor WA tujuan? Edit skrip/pengaturan/toko.pengaturan.js,
 *  BUKAN file ini.
 * ============================================================
 */

const WhatsAppService = (() => {
  function buildMessage(customer) {
    const cartItems = CartService.getItems();
    const subtotal = CartService.getSubtotal();
    const ongkir = DeliveryService.getFee(subtotal);
    const total = subtotal + ongkir;

    const paymentLabel =
      PAYMENT_CONFIG.methods.find((p) => p.id === customer.paymentMethod)
        ?.label || customer.paymentMethod;

    let msg = "";
    msg += `hallo *${STORE_CONFIG.name}*, saya ingin memesan:\n\n`;

    cartItems.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} x${item.qty} — ${Format.currency(
        item.price * item.qty
      )}\n`;
      if (item.optionsSummary) {
        msg += `    (${item.optionsSummary})\n`;
      }
    });

    msg += `\n————————————————\n`;
    msg += `Subtotal: ${Format.currency(subtotal)}\n`;
    msg += `Ongkos Kirim: ${ongkir === 0 ? "GRATIS" : Format.currency(ongkir)}\n`;
    msg += `*Total: ${Format.currency(total)}*\n`;
    msg += `————————————————\n\n`;

    msg += `*Data Pemesan*\n`;
    msg += `Nama: ${customer.name}\n`;
    msg += `No. HP: ${customer.phone}\n`;
    msg += `Alamat: ${customer.address}\n`;
    msg += `Metode Bayar: ${paymentLabel}\n`;

    if (customer.notes && customer.notes.trim() !== "") {
      msg += `Catatan: ${customer.notes}\n`;
    }

    msg += `\nMohon dikonfirmasi ya, Terima kasih!`;

    return msg;
  }

  function sendOrder(customer) {
    const message = buildMessage(customer);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(url, "_blank");
  }

  return { buildMessage, sendOrder };
})();

window.WhatsAppService = WhatsAppService;
