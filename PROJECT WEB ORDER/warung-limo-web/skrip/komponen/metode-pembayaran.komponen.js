/**
 * ============================================================
 *  METODE-PEMBAYARAN.KOMPONEN.JS — PILIHAN METODE BAYAR & QRIS
 * ============================================================
 *  Dipisah dari modal-checkout.komponen.js supaya kalau nanti
 *  kamu mau menambah cara pembayaran baru (transfer bank, dsb)
 *  atau mengubah tampilan pilihan bayar, cukup edit file ini.
 *
 *  Daftar metode bayar & gambar QRIS diambil dari
 *  skrip/pengaturan/pembayaran.pengaturan.js.
 * ============================================================
 */

const PaymentMethodComponent = (() => {
  function render() {
    const wrap = document.getElementById("paymentMethods");
    wrap.innerHTML = PAYMENT_CONFIG.methods
      .map(
        (pm, idx) => `
      <label class="payment-option">
        <input type="radio" name="paymentMethod" value="${pm.id}" ${
          idx === 0 ? "checked" : ""
        } />
        <span class="payment-option__body">
          <span class="payment-option__label">${pm.label}</span>
          <span class="payment-option__desc">${pm.desc}</span>
        </span>
      </label>`
      )
      .join("");

    wrap.querySelectorAll('input[name="paymentMethod"]').forEach((input) => {
      input.addEventListener("change", toggleQrisPreview);
    });

    toggleQrisPreview();
  }

  function toggleQrisPreview() {
    const selected = document.querySelector(
      'input[name="paymentMethod"]:checked'
    )?.value;
    const qrisBox = document.getElementById("qrisPreview");
    qrisBox.style.display = selected === "qris" ? "block" : "none";
  }

  function getSelectedMethod() {
    return document.querySelector('input[name="paymentMethod"]:checked')?.value;
  }

  function init() {
    render();
  }

  return { init, getSelectedMethod };
})();

window.PaymentMethodComponent = PaymentMethodComponent;
