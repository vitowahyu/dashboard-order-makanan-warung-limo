/**
 * ============================================================
 *  KATEGORI.KOMPONEN.JS — FILTER KATEGORI MENU
 * ============================================================
 *  Tugas komponen ini HANYA menampilkan chip kategori dan
 *  mengumumkan lewat EventBus saat kategori dipilih.
 *  Komponen ini TIDAK TAHU cara filter menu — itu tanggung
 *  jawab menu.komponen.js yang berlangganan event "category:changed".
 *
 *  Kalau nanti kamu mau ganti filter kategori jadi bentuk lain
 *  (misal dropdown), cukup ganti render() di file ini — tidak
 *  ada file lain yang perlu disentuh selama event yang di-emit
 *  tetap "category:changed".
 * ============================================================
 */

const CategoryComponent = (() => {
  let activeCategory = "semua";

  function render() {
    const wrap = document.getElementById("categoryList");
    wrap.innerHTML = MENU_CATEGORIES.map(
      (cat) => `
      <button class="chip ${cat.id === activeCategory ? "chip--active" : ""}"
              data-category="${cat.id}">
        ${cat.label}
      </button>`
    ).join("");

    wrap.querySelectorAll(".chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        render();
        EventBus.emit("category:changed", activeCategory);
      });
    });
  }

  function init() {
    render();
  }

  return { init };
})();

window.CategoryComponent = CategoryComponent;
