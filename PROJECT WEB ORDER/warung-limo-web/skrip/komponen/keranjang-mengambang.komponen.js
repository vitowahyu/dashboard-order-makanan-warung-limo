/**
 * ============================================================
 *  KERANJANG-MENGAMBANG.KOMPONEN.JS — BAR KERANJANG MENGAMBANG (MOBILE)
 * ============================================================
 *  Sengaja dipisah dari laci-keranjang.komponen.js walau
 *  fungsinya cuma "tombol buka keranjang", supaya kalau nanti
 *  kamu mau hapus fitur ini (atau ganti jadi bentuk lain di
 *  mobile) cukup hapus/ubah file ini + <script> tag-nya di
 *  index.html — tidak menyentuh logika drawer sama sekali.
 * ============================================================
 */

const FloatCartComponent = (() => {
  function render() {
    const totalItems = CartService.getTotalItems();
    const subtotal = CartService.getSubtotal();
    const ongkir = DeliveryService.getFee(subtotal);
    const total = subtotal + ongkir;

    const bar = document.getElementById("floatCartBar");

    if (totalItems > 0) {
      bar.classList.add("float-cart--visible");
      document.getElementById("floatCartCount").textContent = `${totalItems} item`;
      document.getElementById("floatCartTotal").textContent = Format.currency(total);
    } else {
      bar.classList.remove("float-cart--visible");
    }
  }

  function bindEvents() {
    document
      .getElementById("floatCartBar")
      .addEventListener("click", () => CartDrawerComponent.open());

    EventBus.on("cart:changed", render);
  }

  function init() {
    bindEvents();
    render();
  }

  return { init };
})();

window.FloatCartComponent = FloatCartComponent;
