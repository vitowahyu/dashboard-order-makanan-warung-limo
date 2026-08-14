/**
 * ============================================================
 *  LACI-KERANJANG.KOMPONEN.JS — PANEL KERANJANG (SIDEBAR)
 * ============================================================
 *  Menampilkan isi keranjang dalam panel geser dari kanan,
 *  termasuf ringkasan subtotal/ongkir/total dan tombol lanjut
 *  ke checkout.
 *
 *  Buka/tutup panel ini dikendalikan lewat event:
 *    EventBus.emit("ui:open-cart")  -> buka
 *    EventBus.emit("ui:close-cart") -> tutup
 *  Komponen lain (header, floating bar) tidak perlu tahu cara
 *  kerja drawer ini — cukup emit event di atas.
 * ============================================================
 */

const CartDrawerComponent = (() => {
  function render() {
    const cartItems = CartService.getItems();
    const totalItems = CartService.getTotalItems();
    const subtotal = CartService.getSubtotal();
    const ongkir = DeliveryService.getFee(subtotal);
    const total = subtotal + ongkir;

    renderBadge(totalItems);
    renderList(cartItems);
    renderSummary(subtotal, ongkir, total);

    document.getElementById("checkoutBtn").disabled = cartItems.length === 0;
  }

  function renderBadge(totalItems) {
    const badge = document.getElementById("cartBadge");
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
  }

  function renderList(cartItems) {
    const list = document.getElementById("cartItemsList");

    if (cartItems.length === 0) {
      list.innerHTML = `<p class="empty-state">Keranjang masih kosong.<br>Yuk pilih menu favoritmu!</p>`;
      return;
    }

    list.innerHTML = cartItems
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item__emoji">${item.emoji}</div>
        <div class="cart-item__info">
          <p class="cart-item__name">${item.name}</p>
          ${
            item.optionsSummary
              ? `<p class="cart-item__variant">${item.optionsSummary}</p>`
              : ""
          }
          <p class="cart-item__price">${Format.currency(item.price)}</p>
        </div>
        <div class="qty-control qty-control--sm">
          <button class="qty-btn" data-cart-decrement="${item.cartId}">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-cart-increment="${item.cartId}">+</button>
        </div>
      </div>`
      )
      .join("");

    list.querySelectorAll("[data-cart-increment]").forEach((btn) => {
      btn.addEventListener("click", () => {
        CartService.increment(btn.dataset.cartIncrement);
      });
    });
    list.querySelectorAll("[data-cart-decrement]").forEach((btn) => {
      btn.addEventListener("click", () => {
        CartService.decrement(btn.dataset.cartDecrement);
      });
    });
  }

  function renderSummary(subtotal, ongkir, total) {
    document.getElementById("cartSubtotal").textContent = Format.currency(subtotal);
    document.getElementById("cartOngkir").textContent =
      ongkir === 0 ? "Gratis" : Format.currency(ongkir);
    document.getElementById("cartTotal").textContent = Format.currency(total);
  }

  function open() {
    document.getElementById("cartDrawer").classList.add("drawer--open");
    EventBus.emit("ui:open-cart");
  }

  function close() {
    const drawer = document.getElementById("cartDrawer");
    if (!drawer.classList.contains("drawer--open")) return;
    drawer.classList.remove("drawer--open");
    EventBus.emit("ui:close-cart");
  }

  function bindEvents() {
    document.getElementById("cartBtn").addEventListener("click", open);
    document.getElementById("closeCartBtn").addEventListener("click", close);

    document.getElementById("checkoutBtn").addEventListener("click", () => {
      close();
      EventBus.emit("ui:open-checkout");
    });

    EventBus.on("cart:changed", render);
    EventBus.on("ui:close-all", close);
  }

  function init() {
    bindEvents();
    render();
  }

  return { init, open, close };
})();

window.CartDrawerComponent = CartDrawerComponent;
