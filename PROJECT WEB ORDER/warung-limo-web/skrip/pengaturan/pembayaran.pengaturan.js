/**
 * ============================================================
 *  PEMBAYARAN.PENGATURAN.JS — METODE PEMBAYARAN
 * ============================================================
 *  Mau tambah/hapus/ubah metode pembayaran, atau ganti gambar
 *  QRIS? HANYA edit file ini.
 *
 *  Tiap metode bayar adalah satu objek { id, label, desc }.
 *  Boleh tambah metode baru dengan copy-paste blok yang ada
 *  (misal transfer bank) — tidak perlu ubah file JS lain.
 * ============================================================
 */

const PAYMENT_CONFIG = {
  methods: [
    {
      id: "qris",
      label: "QRIS",
      desc: "Scan QR & bayar dari e-wallet/m-banking apa saja",
    },
    {
      id: "cod",
      label: "Tunai",
      desc: "Bayar tunai saat pesanan sampai",
    },
  ],

  // Ganti file ini dengan gambar QRIS asli toko kamu (folder /aset)
  qrisImage: "aset/qris.png", 
};

window.PAYMENT_CONFIG = PAYMENT_CONFIG;
