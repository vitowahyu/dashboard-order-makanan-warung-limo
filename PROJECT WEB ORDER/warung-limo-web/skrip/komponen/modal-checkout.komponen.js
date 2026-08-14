/**
 * ============================================================
 *  MODAL-CHECKOUT.KOMPONEN.JS — FORM & PROSES CHECKOUT
 * ============================================================
 *  Menampilkan form data pemesan, ringkasan belanja, lalu saat
 *  disubmit: validasi -> kirim pesan ke WhatsApp lewat
 *  WhatsAppService -> kosongkan keranjang -> tutup modal.
 *
 *  Buka/tutup modal ini dikendalikan lewat event:
 *    EventBus.emit("ui:open-checkout")  -> buka
 *    EventBus.emit("ui:close-checkout") -> tutup
 *
 *  Mau ubah field form (tambah/hapus input)? Edit bagian
 *  <form id="checkoutForm"> di index.html, lalu sesuaikan
 *  handleSubmit() di bawah ini.
 * ============================================================
 */

const CheckoutModalComponent = (() => {
  function renderSummary() {
    const subtotal = CartService.getSubtotal();
    const ongkir = DeliveryService.getFee(subtotal);
    const total = subtotal + ongkir;

    document.getElementById("checkoutSubtotal").textContent = Format.currency(subtotal);
    document.getElementById("checkoutOngkir").textContent =
      ongkir === 0 ? "Gratis" : Format.currency(ongkir);
    document.getElementById("checkoutTotal").textContent = Format.currency(total);
  }

  function open() {
    document.getElementById("checkoutModal").classList.add("modal--open");
    renderSummary();
    // Tidak emit "ui:open-checkout" di sini karena fungsi ini justru
    // DIPANGGIL sebagai reaksi atas event tersebut (lihat bindEvents()).
    // OverlayComponent sudah tahu modal terbuka dari event aslinya.
  }

  function close() {
    const modal = document.getElementById("checkoutModal");
    if (!modal.classList.contains("modal--open")) return;
    modal.classList.remove("modal--open");
    EventBus.emit("ui:close-checkout");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const customer = {
      name: form.elements.customerName.value.trim(),
      phone: form.elements.customerPhone.value.trim(),
      address: form.elements.customerAddress.value.trim(),
      notes: form.elements.customerNotes.value.trim(),
      paymentMethod: PaymentMethodComponent.getSelectedMethod(),
    };

    if (!customer.name || !customer.phone || !customer.address) {
      EventBus.emit("toast:show", "Mohon lengkapi nama, no. HP, dan alamat");
      return;
    }

    if (CartService.getItems().length === 0) {
      EventBus.emit("toast:show", "Keranjang masih kosong");
      return;
    }

    WhatsAppService.sendOrder(customer);

    CartService.clear();
    close();
    form.reset();
    EventBus.emit("toast:show", "Pesanan dikirim! Cek WhatsApp untuk konfirmasi.");
  }

  function bindEvents() {
    document.getElementById("closeCheckoutBtn").addEventListener("click", close);
    document.getElementById("checkoutForm").addEventListener("submit", handleSubmit);

    // "ui:open-checkout" di-emit oleh laci-keranjang.komponen.js saat tombol
    // "Lanjut ke Checkout" diklik. OverlayComponent juga mendengarkan event
    // yang sama untuk menampilkan backdrop — dua komponen berbeda, satu event.
    EventBus.on("ui:open-checkout", open);
    EventBus.on("ui:close-all", close);
  }

  function init() {
    bindEvents();
  }

  return { init, open, close };
})();

window.CheckoutModalComponent = CheckoutModalComponent;
