/**
 * ============================================================
 *  KERANJANG.LAYANAN.JS — LOGIKA KERANJANG BELANJA
 * ============================================================
 *  Menyimpan & mengubah isi keranjang. File ini SENGAJA tidak
 *  tahu apa-apa soal tampilan (tidak ada document.getElementById
 *  di sini) — supaya kalau nanti tampilan keranjang mau diubah
 *  total (misal dari drawer jadi halaman terpisah), file ini
 *  tidak perlu disentuh sama sekali.
 *
 *  Setiap kali data berubah, service ini mengumumkan lewat
 *  EventBus.emit("cart:changed") — komponen yang perlu tahu
 *  (menu, drawer, floating bar) tinggal berlangganan sendiri
 *  di file masing-masing.
 *
 *  CATATAN "cartId" vs "id":
 *  "id" = kode menu asli (misal "m01").
 *  "cartId" = kode unik per BARIS keranjang. Untuk menu biasa
 *  (tanpa varian) cartId sama persis dengan id. Untuk menu yang
 *  punya "options" (varian/tingkat pedas dst), cartId adalah
 *  gabungan id + pilihan yang diambil customer, supaya "Mie
 *  Goreng - Indomie - Pedas" dan "Mie Goreng - Sedap - Tidak
 *  Pedas" tersimpan sebagai baris terpisah di keranjang,
 *  masing-masing dengan qty sendiri.
 * ============================================================
 */

const CartService = (() => {
  const STORAGE_KEY = "fnb_cart_items";
  let items = StorageService.get(STORAGE_KEY, []);

  function persistAndNotify() {
    StorageService.set(STORAGE_KEY, items);
    EventBus.emit("cart:changed", getItems());
  }

  // Membuat kode unik per baris keranjang dari id menu + pilihan varian.
  function buildCartId(menuItemId, selections) {
    if (!selections || selections.length === 0) return menuItemId;
    const key = selections
      .map((s) => `${s.groupId}:${s.choiceId}`)
      .sort()
      .join("|");
    return `${menuItemId}__${key}`;
  }

  /**
   * @param {object} menuItem - item dari MENU_ITEMS
   * @param {Array}  selections - opsional, hasil pilihan varian:
   *   [{ groupId, groupLabel, choiceId, choiceLabel, priceAdd }, ...]
   * @param {number} qty - jumlah yang ditambahkan (default 1)
   */
  function addItem(menuItem, selections = [], qty = 1) {
    const cartId = buildCartId(menuItem.id, selections);
    const priceAdd = selections.reduce((sum, s) => sum + (s.priceAdd || 0), 0);
    const finalPrice = menuItem.price + priceAdd;
    const optionsSummary = selections.map((s) => s.choiceLabel).join(", ");

    const existing = items.find((i) => i.cartId === cartId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        cartId,
        id: menuItem.id,
        name: menuItem.name,
        price: finalPrice,
        emoji: menuItem.emoji,
        qty,
        optionsSummary,
      });
    }
    persistAndNotify();
  }

  function removeItem(cartId) {
    items = items.filter((i) => i.cartId !== cartId);
    persistAndNotify();
  }

  function updateQty(cartId, qty) {
    const item = items.find((i) => i.cartId === cartId);
    if (!item) return;
    if (qty <= 0) {
      removeItem(cartId);
      return;
    }
    item.qty = qty;
    persistAndNotify();
  }

  function increment(cartId) {
    const item = items.find((i) => i.cartId === cartId);
    if (item) updateQty(cartId, item.qty + 1);
  }

  function decrement(cartId) {
    const item = items.find((i) => i.cartId === cartId);
    if (item) updateQty(cartId, item.qty - 1);
  }

  function getItems() {
    return [...items];
  }

  // Total qty menu yang TIDAK punya varian (cartId === id menu).
  // Untuk menu ber-varian, kartu menu selalu menampilkan tombol
  // "+ Tambah" (lihat menu.komponen.js), jadi fungsi ini cukup
  // dicocokkan lewat cartId seperti biasa.
  function getItemQty(cartId) {
    const item = items.find((i) => i.cartId === cartId);
    return item ? item.qty : 0;
  }

  function getTotalItems() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return items.reduce((sum, i) => sum + i.qty * i.price, 0);
  }

  function clear() {
    items = [];
    persistAndNotify();
  }

  return {
    addItem,
    removeItem,
    updateQty,
    increment,
    decrement,
    getItems,
    getItemQty,
    getTotalItems,
    getSubtotal,
    clear,
    buildCartId,
  };
})();

window.CartService = CartService;
