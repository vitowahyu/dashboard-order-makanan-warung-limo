# 🍽️ Web Order Menu — F&B

Web pemesanan menu untuk bisnis F&B. Customer bisa lihat menu, pesan, isi lokasi
pengantaran, pilih metode bayar (QRIS/Tunai), lalu pesanan otomatis terkirim
rapi ke **WhatsApp** toko. Tidak butuh server, database, atau biaya hosting —
cukup file statis (HTML/CSS/JS).

---

## 🛠️ Riwayat Perbaikan Terbaru

### ✅ Bug "Beli Langsung tidak bisa dibeli" — SUDAH DIPERBAIKI
**Penyebab:** di `skrip/pengaturan/pengiriman.pengaturan.js` ada baris
`fee: GRATIS` — kata `GRATIS` ini tertulis seperti variabel padahal
tidak pernah didefinisikan di file mana pun. Akibatnya browser gagal
membentuk `DELIVERY_CONFIG` (error `GRATIS is not defined`), dan setiap
kali aplikasi butuh menghitung ongkir (klik "Beli Langsung", "Tambah ke
Keranjang" lalu buka keranjang, atau buka form checkout), prosesnya
gagal diam-diam — makanya klik tombol terasa "tidak merespons",
termasuk pada menu bervarian seperti Mie Goreng Piring / Mie Kuah Piring.

**Perbaikan:** `fee: GRATIS` diganti jadi `fee: 0` (angka biasa, bukan kata).
Sudah diuji ulang: tambah ke keranjang, beli langsung (menu biasa maupun
bervarian), sampai submit form checkout ke WhatsApp — semua berjalan normal.

⚠️ **Catatan buat kamu:** kalau warung ini sebenarnya mengenakan ongkos
kirim (bukan gratis ongkir), ganti angka `0` itu dengan tarif aslinya,
lihat bagian [Ongkos Kirim](#4-ongkos-kirim) di bawah.

### ✅ Fitur baru: Ganti Foto Makanan (emoji → foto asli)
Sekarang setiap menu bisa punya foto asli, menggantikan emoji. Detail
lengkap ada di bagian [📸 Ganti Foto Makanan](#-ganti-foto-makanan)
di bawah.

---

## 🚀 Cara Menjalankan

Karena CSS di project ini memakai `@import` antar file, **wajib dijalankan
lewat server lokal** (tidak disarankan buka langsung dengan klik dua kali
`index.html`, karena sebagian browser membatasi `@import`/fetch file lewat
`file://`).

Gunakan ekstensi **Live Server** di VS Code, atau jalankan salah satu perintah
di bawah ini dari folder project lewat terminal, lalu buka `http://localhost:8000`:

```bash
# Jika ada Python
python3 -m http.server 8000

# Jika ada Node.js
npx serve .
```

---

## 📸 Ganti Foto Makanan

Secara default, tiap menu tampil pakai **emoji** (field `emoji`). Kamu bisa
menggantinya dengan **foto asli** lewat field baru **`image`** di
`skrip/data/item-menu.data.js`.

### Cara 1 — Pakai foto dari HP/komputer kamu (disarankan)
1. Siapkan foto menu (disarankan persegi/mendekati 1:1 atau 4:3, minimal
   400×400px, format JPG/PNG/WEBP, ukuran file jangan terlalu besar
   supaya web tetap cepat — idealnya di bawah 300KB).
2. Taruh file foto itu ke folder **`aset/menu/`**, contoh:
   `aset/menu/gado-gado.jpg`.
3. Buka `skrip/data/item-menu.data.js`, cari menu yang mau diganti fotonya,
   tambahkan baris `image`:
   ```js
   {
     id: "m01",
     category: "nasi",
     name: "GADO GADO",
     description: "GADO GADO dengan bumbu kacang khas warung limo",
     price: 14000,
     badge: "banyakdibeli",
     available: true,
     emoji: "🍜",
     image: "aset/menu/gado-gado.jpg",   // ⭐ tambahkan baris ini
   },
   ```

### Cara 2 — Pakai link foto online
Kalau foto sudah ter-upload di internet (misalnya di Google Drive/Imgur/
website sendiri), langsung isi URL-nya:
```js
image: "https://contoh.com/foto/gado-gado.jpg",
```

### Kalau nggak semua menu mau difoto, gimana?
Tidak masalah — **field `image` sifatnya opsional per menu**. Menu yang
tidak diisi `image` (atau linknya rusak/gagal dimuat) akan **otomatis
tetap tampil pakai emoji**, jadi tidak akan ada kartu menu yang tampil
kosong/rusak walau kamu baru foto sebagian menu dulu.

### Di mana saja foto ini muncul?
- Kartu menu di grid utama (mengisi penuh area foto, otomatis di-crop rapi).
- Judul jendela pilih varian (untuk menu yang punya `options`, foto muncul
  sebagai ikon kecil di sebelah nama menu).

### Mau ganti tampilan/ukuran foto di kartu menu?
Edit `tampilan/komponen/kartu-menu.css`, cari bagian `.menu-card__image`
dan `.menu-card__image--photo`.

---

## ⚙️ Yang WAJIB Diedit Sebelum Dipakai

### 1. Identitas Toko & Nomor WhatsApp
Buka file **`skrip/pengaturan/toko.pengaturan.js`**:

```js
const STORE_CONFIG = {
  name: "Dapur Bu Sari",
  whatsappNumber: "6281234567890",   // Nomor WA toko (format 62xxx, tanpa +/spasi)
  address: "...",
  phoneDisplay: "0812-3456-7890",
  // ...
};
```

⚠️ **Penting:** `whatsappNumber` harus format Indonesia yang benar.
Contoh nomor `0812-3456-7890` → ditulis `"6281234567890"` (0 di depan diganti 62).

### 2. Menu Makanan/Minuman
Buka file **`skrip/data/item-menu.data.js`**. Setiap menu adalah satu blok:

```js
{
  id: "m01",
  category: "mie",           // harus cocok dengan id di kategori-menu.data.js
  name: "Mie Ayam Spesial",
  description: "...",
  price: 18000,
  spiceLevel: 0,
  badge: "bestseller",       // key dari skrip/pengaturan/label.pengaturan.js, atau null
  available: true,
  emoji: "🍜",
  image: "aset/menu/mie-ayam.jpg",   // opsional, lihat bagian "Ganti Foto Makanan"
}
```

Tinggal **copy-paste blok ini**, ganti isinya, tambahkan/hapus sesuai menu asli.
Mau ganti/tambah kategori? Edit `skrip/data/kategori-menu.data.js`.

Mau menu ini punya **pilihan varian** (rasa/merk/tingkat pedas, dst) yang
wajib dipilih customer sebelum bisa ditambah ke keranjang? Tambahkan field
`options`, contohnya sudah ada di menu "MIE GORENG PIRING" dan
"MIE KUAH PIRING" di file yang sama — tinggal contek polanya. Penjelasan
lengkap tiap kolomnya juga ada di komentar paling atas file tersebut.

### 3. Gambar QRIS
Buka **`skrip/pengaturan/pembayaran.pengaturan.js`**, ada 2 cara:

**Cara termudah:** ganti isi file `aset/qris-contoh.svg` dengan foto QRIS kamu,
simpan dengan nama & format file yang sama persis.

**Cara paling gampang (disarankan):**
1. Taruh foto QRIS asli kamu (PNG/JPG) ke folder `aset/`, contoh: `aset/qris-toko.png`
2. Buka `skrip/pengaturan/pembayaran.pengaturan.js`, ubah:
   ```js
   qrisImage: "aset/qris-toko.png",
   ```

Mau tambah/hapus metode pembayaran (misal Transfer Bank)? Tambahkan objek baru
di array `methods` pada file yang sama.

### 4. Ongkos Kirim
Buka **`skrip/pengaturan/pengiriman.pengaturan.js`**:

```js
const DELIVERY_CONFIG = {
  fee: 5000,            // ongkir flat — HARUS ANGKA, jangan tulis kata seperti "GRATIS"
  freeMinOrder: 100000, // gratis ongkir jika belanja >= angka ini (0 = nonaktif)
};
```

💡 Kalau mau gratis ongkir selalu, cukup set `fee: 0` (angka nol, bukan kata).

---

## 📁 Struktur Folder (Arsitektur Modular per Fitur)

Struktur ini didesain supaya **setiap fitur berdiri sendiri** — file config,
logika, dan tampilannya terpisah rapi. Kalau kamu mau ganti/tambah/hapus satu
fitur, biasanya cukup sentuh 1-2 file saja, tanpa merembet ke fitur lain.

```
warung-limo-web/
├── index.html
│
├── tampilan/                    (dulu: css/)
│   ├── utama.css               → HANYA berisi @import, tidak ada style langsung
│   ├── dasar/
│   │   ├── variabel.css        ⭐ EDIT untuk ganti warna/font global
│   │   └── reset.css
│   ├── tata-letak/
│   │   ├── kontainer.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   └── footer.css
│   ├── komponen/                → SATU FILE = SATU KOMPONEN VISUAL
│   │   ├── chip-kategori.css
│   │   ├── label.css
│   │   ├── kartu-menu.css
│   │   ├── tombol.css
│   │   ├── kontrol-jumlah.css
│   │   ├── keranjang-mengambang.css
│   │   ├── lapisan.css
│   │   ├── laci.css
│   │   ├── modal.css
│   │   ├── kolom-formulir.css
│   │   ├── metode-pembayaran.css
│   │   └── notifikasi.css
│   └── responsif.css            → Override tampilan mobile (import paling akhir)
│
├── skrip/                        (dulu: js/)
│   ├── pengaturan/                ⭐ EDIT DI SINI untuk kustomisasi toko
│   │   ├── toko.pengaturan.js      → nama toko, alamat, nomor WA
│   │   ├── pengiriman.pengaturan.js → tarif & aturan ongkir
│   │   ├── pembayaran.pengaturan.js → metode bayar & gambar QRIS
│   │   ├── label.pengaturan.js     → label badge menu
│   │   └── penggabung.js           → penggabung semua pengaturan (jangan diedit)
│   │
│   ├── data/                      ⭐ EDIT DI SINI untuk daftar menu
│   │   ├── kategori-menu.data.js
│   │   └── item-menu.data.js
│   │
│   ├── inti/                     → Infrastruktur bersama (jangan diedit)
│   │   ├── penghubung.js          → penghubung antar fitur / event bus (lihat penjelasan di bawah)
│   │   ├── penyimpanan.layanan.js → wrapper localStorage
│   │   └── format.js              → format mata uang
│   │
│   ├── layanan/                   → Logika bisnis murni (tanpa tampilan)
│   │   ├── keranjang.layanan.js   → simpan/ubah isi keranjang
│   │   ├── pengiriman.layanan.js  → hitung ongkir
│   │   └── whatsapp.layanan.js    → format pesan & kirim ke WA
│   │
│   ├── komponen/                  → Tampilan, satu file = satu fitur UI
│   │   ├── info-toko.komponen.js
│   │   ├── kategori.komponen.js
│   │   ├── menu.komponen.js
│   │   ├── laci-keranjang.komponen.js
│   │   ├── keranjang-mengambang.komponen.js
│   │   ├── metode-pembayaran.komponen.js
│   │   ├── modal-checkout.komponen.js
│   │   ├── lapisan.komponen.js
│   │   └── notifikasi.komponen.js
│   │
│   └── aplikasi.js                → Bootstrap tipis, cuma menyalakan tiap komponen
│
└── aset/                          (dulu: assets/)
    ├── qris-contoh.svg            → Ganti dengan QRIS asli toko
    └── menu/                      → ⭐ Taruh foto asli menu di sini
        └── (foto-foto menu kamu)
```

### Kenapa strukturnya sekompleks ini?

Tujuannya **bukan** bikin ribet, tapi supaya perubahan di satu fitur tidak
"merembet" ke file lain:

| Mau ganti apa? | Cukup buka file ini |
|---|---|
| Nama toko, alamat, no. WA | `skrip/pengaturan/toko.pengaturan.js` |
| Daftar menu / harga | `skrip/data/item-menu.data.js` |
| Foto asli menu (ganti emoji) | field `image` di `skrip/data/item-menu.data.js` + file foto di `aset/menu/` |
| Kategori menu | `skrip/data/kategori-menu.data.js` |
| Ongkos kirim | `skrip/pengaturan/pengiriman.pengaturan.js` |
| Metode pembayaran / QRIS | `skrip/pengaturan/pembayaran.pengaturan.js` |
| Label badge (Best Seller, dll) | `skrip/pengaturan/label.pengaturan.js` |
| Warna & font | `tampilan/dasar/variabel.css` |
| Tampilan kartu menu | `tampilan/komponen/kartu-menu.css` |
| Tampilan keranjang | `tampilan/komponen/laci.css` |
| Tampilan checkout | `tampilan/komponen/modal.css` + `metode-pembayaran.css` |
| Perilaku keranjang (logika) | `skrip/layanan/keranjang.layanan.js` |
| Format pesan ke WhatsApp | `skrip/layanan/whatsapp.layanan.js` |
| Tampilan/perilaku satu komponen UI | file terkait di `skrip/komponen/` |

### Bagaimana antar-fitur "ngobrol" tanpa saling kenal?

File-file di atas **tidak saling memanggil fungsi satu sama lain secara
langsung**. Mereka berkomunikasi lewat satu jembatan bernama **Event Bus**
(`skrip/inti/penghubung.js`):

```js
// Fitur A mengumumkan sesuatu terjadi:
EventBus.emit("cart:changed", data);

// Fitur B (atau C, D, ...) yang perlu tahu, cukup berlangganan:
EventBus.on("cart:changed", (data) => { /* render ulang */ });
```

Manfaatnya: kalau kamu mau **ganti total** satu komponen (misal drawer
keranjang diubah jadi halaman terpisah, atau checkout modal diganti jadi
wizard multi-step), kamu cukup tulis ulang file komponen itu saja — selama
event yang di-emit/didengarkan namanya tetap sama, fitur lain tidak perlu
disentuh sama sekali.

Daftar event utama yang dipakai:
- `cart:changed` — isi keranjang berubah
- `category:changed` — kategori filter berubah
- `ui:open-cart` / `ui:close-cart` — buka/tutup drawer keranjang
- `ui:open-checkout` / `ui:close-checkout` — buka/tutup modal checkout
- `ui:close-all` — tutup semua panel (dipicu klik overlay)
- `toast:show` — tampilkan notifikasi kecil

---

## 🎨 Mengubah Warna Tampilan

Buka `tampilan/dasar/variabel.css`, semua warna diatur lewat variabel di situ:

```css
--color-accent: #e2231a;   /* warna aksen utama (merah) */
--color-bg: #ffffff;        /* warna latar (putih) */
```

Ganti kode warnanya (hex code), otomatis berubah di seluruh halaman.

---

## 🧠 Bagaimana Cara Kerja Order ke WhatsApp?

1. Customer pilih menu → masuk ke keranjang (tersimpan otomatis di browser,
   lewat `CartService` + `StorageService`).
2. Customer klik "Lanjut ke Checkout" → `laci-keranjang.komponen.js` menutup
   diri & mengumumkan event `ui:open-checkout`.
3. `modal-checkout.komponen.js` mendengar event itu, membuka form isi nama,
   no. HP, alamat singkat, pilih metode bayar.
4. Klik "Kirim Pesanan via WhatsApp" → `whatsapp.layanan.js` membentuk pesan
   rapi lalu membuka WhatsApp otomatis.
5. Toko terima chat tersebut, lalu **tanyakan detail lokasi/patokan
   pengantaran langsung lewat chat** untuk konfirmasi apakah pesanan masih
   terjangkau.

Tidak ada data yang tersimpan di server mana pun — semuanya berjalan langsung
di browser customer, lalu diteruskan ke WhatsApp toko.

---

## 🌐 Cara Publish Online (Gratis)

Supaya customer bisa akses lewat link, kamu bisa upload folder ini ke:

- **Netlify** (netlify.com) — drag & drop folder, langsung online.
- **Vercel** (vercel.com) — hubungkan lewat GitHub atau upload langsung.
- **GitHub Pages** — gratis, cocok jika project di-push ke GitHub.

Tidak perlu proses build apa pun — upload apa adanya karena ini web statis
(HTML/CSS/JS murni, tanpa framework/bundler).

---

## ✅ Fitur yang Sudah Ada

- Tampilan menu per kategori dengan filter
- Foto asli menu (opsional per menu, otomatis fallback ke emoji)
- Keranjang belanja (tersimpan otomatis walau halaman di-refresh)
- Indikator tingkat pedas & badge (Best Seller/Baru/Pedas)
- Menu dengan pilihan varian (rasa/merk/tingkat pedas) sebelum masuk keranjang
- Form checkout dengan validasi
- Pilihan metode bayar QRIS (pakai QRIS asli tokomu) / Tunai
- Ongkos kirim otomatis (dengan opsi gratis ongkir minimum belanja)
- Order langsung terkirim rapi ke WhatsApp toko
- Notifikasi toast & tampilan responsif (mobile-friendly)
- Arsitektur modular berbasis event — tiap fitur bisa diganti/dikembangkan
  independen

## 💡 Ide Pengembangan Selanjutnya

Berkat struktur modular, ide-ide ini bisa ditambahkan sebagai file/komponen
baru tanpa mengubah banyak file lama:

- Tambah admin panel untuk rekap penjualan otomatis
- Integrasi payment gateway (Midtrans/Xendit) — tinggal buat
  `payment-gateway.layanan.js` baru, dipanggil dari `modal-checkout.komponen.js`
- Sistem tracking status pesanan real-time
- Fitur "menu favorit" — tinggal buat `favorit.layanan.js` baru yang
  memakai `StorageService` yang sudah ada

---

Selamat berjualan! 🎉
