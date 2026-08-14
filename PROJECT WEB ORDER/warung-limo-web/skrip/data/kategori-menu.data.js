/**
 * ============================================================
 *  KATEGORI-MENU.DATA.JS — DAFTAR KATEGORI MENU
 * ============================================================
 *  Mau tambah/hapus/ubah nama kategori (tab filter di atas
 *  menu)? Edit array di bawah ini.
 *
 *  - id    : kode unik kategori, dipakai di item-menu.data.js
 *            (field "category" harus sama persis dengan ini)
 *  - label : teks yang tampil di tombol filter
 *
 *  "semua" adalah kategori bawaan (jangan dihapus) yang
 *  menampilkan seluruh menu tanpa filter.
 * ============================================================
 */

const MENU_CATEGORIES = [
  { id: "semua", label: "SEMUA MENU" },
  { id: "mie", label: "MIE" },
  { id: "makanan", label: "MAKANAN" },
  { id: "cemilan", label: "CEMILAN" },
  { id: "minuman", label: "MINUMAN" },
];

window.MENU_CATEGORIES = MENU_CATEGORIES;
