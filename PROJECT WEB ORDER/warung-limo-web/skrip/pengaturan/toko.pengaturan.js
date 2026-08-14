/**
 * ============================================================
 *  TOKO.PENGATURAN.JS — IDENTITAS TOKO
 * ============================================================
 *  Mau ganti nama toko, tagline, logo, alamat, jam buka,
 *  atau nomor WhatsApp? HANYA edit file ini.
 *
 *  Format whatsappNumber: kode negara + nomor TANPA angka 0
 *  di depan, TANPA spasi/strip/plus.
 *  Contoh: 0812-3456-7890 -> "6281234567890"
 * ============================================================
 */

const STORE_CONFIG = {
  name: "WARUNG LIMO SUMBER JEMBANGAN",
  tagline: "PESAN TANPA RIBET",
  logoText: "WLS", // Inisial untuk logo bulat (maks 3 huruf)

  address: "SUMBER JEMBANGAN - WATES ",
  openHours: "Buka setiap hari, 07.00 – 17.00",
  phoneDisplay: "081-335-117-509", // Nomor yang DITAMPILKAN di web

  whatsappNumber: "6281335117509", // Nomor WA WAJIB format 62xxx

  currencyPrefix: "Rp",
};

window.STORE_CONFIG = STORE_CONFIG;
