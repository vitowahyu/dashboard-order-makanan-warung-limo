/**
 * ============================================================
 *  VARIAN.KOMPONEN.JS — JENDELA PILIH VARIAN & TINGKAT PEDAS
 * ============================================================
 */

const VariantModalComponent = (() => {
  let currentItem = null;
  let qty = 1;
  let choiceQuantities = {};

  function el(id) {
    return document.getElementById(id);
  }

  function open(item) {
    currentItem = item;
    qty = 1;
    choiceQuantities = {};
    render();
    el("variantModal").classList.add("modal--open");
    EventBus.emit("ui:open-variant");
  }

  function close() {
    const modal = el("variantModal");
    if (!modal) return;
    if (!modal.classList.contains("modal--open")) return;
    modal.classList.remove("modal--open");
    currentItem = null;
    choiceQuantities = {};
    EventBus.emit("ui:close-variant");
  }

  function render() {
    if (!currentItem) return;

    el("variantModalTitle").textContent = currentItem.name;
    if (currentItem.image) {
      el("variantModalEmoji").innerHTML = `<img src="${currentItem.image}" alt="${currentItem.name}"
        class="variant-modal-thumb"
        onerror="this.onerror=null; this.replaceWith(document.createTextNode('${currentItem.emoji}'));" />`;
    } else {
      el("variantModalEmoji").textContent = currentItem.emoji || "";
    }
    el("variantModalDesc").textContent = currentItem.description || "";

    const hasQuantityGroup = currentItem.options.some((g) => g.type === "quantity");

    el("variantModalGroups").innerHTML = currentItem.options
      .map((group) => {
        if (group.type === "quantity") {
          return `
            <div class="field variant-group" data-group="${group.id}">
              <label>${group.label}</label>
              <div class="variant-choices variant-choices--qty">
                ${group.choices
                  .map((choice) => {
                    // Render Judul Sub-Kategori jika isHeader bernilai true
                    if (choice.isHeader) {
                      return `<div class="variant-category-title">${choice.label}</div>`;
                    }

                    const currentChoiceQty = choiceQuantities[`${group.id}:${choice.id}`] || 0;
                    return `
                      <div class="variant-choice-item">
                        <span class="variant-choice-item__label">${choice.label}</span>
                        <div class="qty-control">
                          <button type="button" class="qty-btn" data-choice-minus="${group.id}:${choice.id}">−</button>
                          <span class="qty-value" id="qty-val-${group.id}-${choice.id}">${currentChoiceQty}</span>
                          <button type="button" class="qty-btn" data-choice-plus="${group.id}:${choice.id}">+</button>
                        </div>
                      </div>`;
                  })
                  .join("")}
              </div>
            </div>`;
        } else {
          let firstRadioChecked = false;
          return `
            <div class="field variant-group" data-group="${group.id}">
              <label>${group.label}</label>
              <div class="variant-choices">
                ${group.choices
                  .map((choice) => {
                    if (choice.isHeader) {
                      return `<div class="variant-category-title">${choice.label}</div>`;
                    }

                    const isChecked = !firstRadioChecked;
                    if (isChecked) firstRadioChecked = true;

                    return `
                  <label class="payment-option variant-choice">
                    <input
                      type="radio"
                      name="variant-group-${group.id}"
                      value="${choice.id}"
                      data-price-add="${choice.priceAdd || 0}"
                      data-label="${choice.label}"
                      ${isChecked ? "checked" : ""}
                    />
                    <span class="payment-option__body">
                      <span class="payment-option__label">${choice.label}</span>
                      ${
                        choice.priceAdd
                          ? `<span class="payment-option__desc">+${Format.currency(choice.priceAdd)}</span>`
                          : ""
                      }
                    </span>
                  </label>`;
                  })
                  .join("")}
              </div>
            </div>`;
        }
      })
      .join("");

    // Sembunyikan kontrol jumlah utama jika varian bertipe kuantitas (+/-)
    const mainQtyField = el("variantQtyMinus") ? el("variantQtyMinus").closest(".field") : null;
    if (mainQtyField) {
      mainQtyField.style.display = hasQuantityGroup ? "none" : "block";
    }

    // Event listener untuk pilihan radio biasa
    el("variantModalGroups").querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener("change", updateTotal);
    });

    // Event listener untuk tombol + dan - varian kuantitas
    el("variantModalGroups").querySelectorAll("[data-choice-plus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.choicePlus;
        choiceQuantities[key] = (choiceQuantities[key] || 0) + 1;
        const [groupId, choiceId] = key.split(":");
        const valEl = el(`qty-val-${groupId}-${choiceId}`);
        if (valEl) valEl.textContent = choiceQuantities[key];
        updateTotal();
      });
    });

    el("variantModalGroups").querySelectorAll("[data-choice-minus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.choiceMinus;
        if (choiceQuantities[key] && choiceQuantities[key] > 0) {
          choiceQuantities[key] -= 1;
          const [groupId, choiceId] = key.split(":");
          const valEl = el(`qty-val-${groupId}-${choiceId}`);
          if (valEl) valEl.textContent = choiceQuantities[key];
          updateTotal();
        }
      });
    });

    el("variantQtyValue").textContent = qty;
    updateTotal();
  }

  function getSelections() {
    return currentItem.options.map((group) => {
      if (group.type === "quantity") {
        const selectedChoices = [];
        let totalQtyInGroup = 0;
        let totalPriceAdd = 0;

        group.choices.forEach((choice) => {
          if (choice.isHeader) return; // Lewati baris judul header
          const q = choiceQuantities[`${group.id}:${choice.id}`] || 0;
          if (q > 0) {
            selectedChoices.push(`${choice.label} (${q}x)`);
            totalQtyInGroup += q;
            totalPriceAdd += (choice.priceAdd || 0) * q;
          }
        });

        return {
          groupId: group.id,
          groupLabel: group.label,
          isQuantityGroup: true,
          totalQtyInGroup,
          choiceId: group.choices
            .filter((c) => !c.isHeader)
            .map((c) => `${c.id}:${choiceQuantities[`${group.id}:${c.id}`] || 0}`)
            .filter((str) => !str.endsWith(":0"))
            .join("|"),
          choiceLabel: selectedChoices.join(", "),
          priceAdd: totalPriceAdd,
        };
      } else {
        const checked = el("variantModalGroups").querySelector(
          `input[name="variant-group-${group.id}"]:checked`
        );
        return {
          groupId: group.id,
          groupLabel: group.label,
          choiceId: checked ? checked.value : null,
          choiceLabel: checked ? checked.dataset.label : null,
          priceAdd: checked ? Number(checked.dataset.priceAdd) || 0 : 0,
        };
      }
    });
  }

  function validateSelections(selections) {
    return currentItem.options.every((group, idx) => {
      if (!group.required) return true;
      const sel = selections[idx];
      if (group.type === "quantity") {
        return sel.totalQtyInGroup > 0;
      }
      return !!sel.choiceId;
    });
  }

  function updateTotal() {
    const selections = getSelections();
    const quantityGroup = selections.find((s) => s.isQuantityGroup);

    if (quantityGroup) {
      const totalQty = quantityGroup.totalQtyInGroup;
      const addOn = selections.reduce((sum, s) => sum + s.priceAdd, 0);
      const total = (currentItem.price * totalQty) + addOn;
      el("variantModalTotal").textContent = Format.currency(total);
    } else {
      const addOn = selections.reduce((sum, s) => sum + s.priceAdd, 0);
      const unitPrice = currentItem.price + addOn;
      el("variantModalTotal").textContent = Format.currency(unitPrice * qty);
    }
  }

  function changeQty(delta) {
    qty = Math.max(1, qty + delta);
    el("variantQtyValue").textContent = qty;
    updateTotal();
  }

  function handleAddToCart() {
    const selections = getSelections();
    if (!validateSelections(selections)) {
      EventBus.emit("toast:show", "Mohon pilih minimal 1 varian terlebih dahulu");
      return;
    }
    const quantityGroup = selections.find((s) => s.isQuantityGroup);
    const finalQty = quantityGroup ? quantityGroup.totalQtyInGroup : qty;

    CartService.addItem(currentItem, selections, finalQty);
    EventBus.emit("toast:show", `${currentItem.name} ditambahkan ke keranjang`);
    close();
  }

  function handleBuyNow() {
    const selections = getSelections();
    if (!validateSelections(selections)) {
      EventBus.emit("toast:show", "Mohon pilih minimal 1 varian terlebih dahulu");
      return;
    }
    const quantityGroup = selections.find((s) => s.isQuantityGroup);
    const finalQty = quantityGroup ? quantityGroup.totalQtyInGroup : qty;

    CartService.addItem(currentItem, selections, finalQty);
    close();
    EventBus.emit("ui:open-checkout");
  }

  function bindEvents() {
    el("closeVariantModalBtn")?.addEventListener("click", close);
    el("variantQtyMinus")?.addEventListener("click", () => changeQty(-1));
    el("variantQtyPlus")?.addEventListener("click", () => changeQty(1));
    el("variantAddToCartBtn")?.addEventListener("click", handleAddToCart);
    el("variantBuyNowBtn")?.addEventListener("click", handleBuyNow);

    EventBus.on("ui:close-all", close);
  }

  function init() {
    bindEvents();
  }

  return { init, open, close };
})();

window.VariantModalComponent = VariantModalComponent;