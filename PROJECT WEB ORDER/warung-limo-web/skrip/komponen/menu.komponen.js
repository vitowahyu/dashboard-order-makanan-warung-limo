/**
 * ============================================================
 *  MENU.KOMPONEN.JS — GRID KARTU MENU
 * ============================================================
 *  Menampilkan daftar menu (dari MENU_ITEMS) sesuai kategori
 *  aktif, dan tombol tambah/kurang qty per item.
 *
 *  Komponen ini tidak menyimpan status keranjang sendiri — dia
 *  selalu bertanya ke CartService.getItemQty() saat render, dan
 *  otomatis render ulang saat CartService mengumumkan
 *  "cart:changed". Begitu juga saat kategori berubah lewat
 *  event "category:changed" dari kategori.komponen.js.
 * ============================================================
 */

const MenuComponent = (() => {
  let activeCategory = "semua";

  const chiliIcon = (filled) =>
    `<span class="chili ${filled ? "chili--filled" : ""}">🌶</span>`;

  function badgeText(badgeKey) {
    if (!badgeKey) return "";
    const label = BADGE_CONFIG[badgeKey] || badgeKey;
    return `<span class="badge badge--${badgeKey}">${label}</span>`;
  }

  function cardTemplate(item) {
    const hasOptions = Array.isArray(item.options) && item.options.length > 0;
    // Menu ber-varian selalu tampil tombol "+ Tambah" (klik = buka jendela
    // pilihan varian), karena satu menu bisa punya banyak baris keranjang
    // sekaligus (contoh: 1x Mie Sedap Pedas + 1x Indomie Tidak Pedas).
    const qty = hasOptions ? 0 : CartService.getItemQty(item.id);
    const spiceIcons =
      item.spiceLevel > 0
        ? `<div class="spice-level" title="Tingkat pedas ${item.spiceLevel}/3">
            ${[1, 2, 3].map((n) => chiliIcon(n <= item.spiceLevel)).join("")}
          </div>`
        : "";

    // Kalau "image" diisi, tampilkan foto asli. Kalau kosong ATAU link/filenya
    // gagal dimuat (404, salah nama file, dll), otomatis kembali ke emoji
    // lewat onerror di bawah — supaya kartu menu tidak pernah tampil kosong/rusak.
    const media = item.image
      ? `<img src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.onerror=null; this.replaceWith(Object.assign(document.createElement('span'), { textContent: '${item.emoji}' }));" />`
      : `<span>${item.emoji}</span>`;

    return `
    <article class="menu-card ${!item.available ? "menu-card--soldout" : ""}">
      <div class="menu-card__image ${item.image ? "menu-card__image--photo" : ""}">
        ${media}
        ${badgeText(item.badge)}
      </div>
      <div class="menu-card__body">
        <h3 class="menu-card__name">${item.name}</h3>
        <p class="menu-card__desc">${item.description}</p>
        ${spiceIcons}
        <div class="menu-card__footer">
          <span class="menu-card__price">${Format.currency(item.price)}</span>
          ${
            !item.available
              ? `<span class="soldout-label">Habis</span>`
              : hasOptions
              ? `<button class="btn btn--add" data-add-options="${item.id}">+ Tambah</button>`
              : qty === 0
              ? `<button class="btn btn--add" data-add="${item.id}">+ Tambah</button>`
              : `<div class="qty-control">
                   <button class="qty-btn" data-decrement="${item.id}">−</button>
                   <span class="qty-value">${qty}</span>
                   <button class="qty-btn" data-increment="${item.id}">+</button>
                 </div>`
          }
        </div>
      </div>
    </article>`;
  }

  function render() {
    const grid = document.getElementById("menuGrid");
    const filtered = MENU_ITEMS.filter(
      (item) => activeCategory === "semua" || item.category === activeCategory
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="empty-state">Belum ada menu di kategori ini.</p>`;
      return;
    }

    grid.innerHTML = filtered.map(cardTemplate).join("");
    bindCardEvents(grid);
  }

  function bindCardEvents(grid) {
    grid.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = MENU_ITEMS.find((i) => i.id === btn.dataset.add);
        CartService.addItem(item);
        EventBus.emit("toast:show", `${item.name} ditambahkan ke keranjang`);
      });
    });
    grid.querySelectorAll("[data-add-options]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = MENU_ITEMS.find((i) => i.id === btn.dataset.addOptions);
        VariantModalComponent.open(item);
      });
    });
    grid.querySelectorAll("[data-increment]").forEach((btn) => {
      btn.addEventListener("click", () => {
        CartService.increment(btn.dataset.increment);
      });
    });
    grid.querySelectorAll("[data-decrement]").forEach((btn) => {
      btn.addEventListener("click", () => {
        CartService.decrement(btn.dataset.decrement);
      });
    });
  }

  function bindEvents() {
    EventBus.on("category:changed", (category) => {
      activeCategory = category;
      render();
    });
    EventBus.on("cart:changed", render);
  }

  function init() {
    bindEvents();
    render();
  }

  return { init };
})();

window.MenuComponent = MenuComponent;
