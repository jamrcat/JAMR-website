(() => {
  const initShopifyMerch = () => {
    const catalog = document.querySelector("#base-running-merch-concept");
    if (!catalog || catalog.dataset.shopifyReady === "true") return;
    catalog.dataset.shopifyReady = "true";

    const config = window.BRS_SHOPIFY || {};
    const productIds = [
      "short-sleeve",
      "long-sleeve",
      "sleeveless-hoodie",
      "training-shorts"
    ];
    const bundleIds = [
      "curvilinear-ability-set",
      "linear-curvilinear-set",
      "inside-outside-mechanics-set",
      "need-for-speed-set",
      "gps-diagnostics-set",
      "imu-foot-pod-set",
      "segment-specific-analysis-set",
      "functional-asymmetry-set",
      "velocity-time-profile-set",
      "new-perspectives-set",
      "training-the-curve-complete-set"
    ];

    const cleanStoreUrl = (() => {
      const value = String(config.storeUrl || "").trim().replace(/\/+$/, "");
      if (!value) return "";
      try {
        const url = new URL(value);
        return url.protocol === "https:" ? url.href.replace(/\/$/, "") : "";
      } catch {
        return "";
      }
    })();

    const safeHttpsUrl = (value) => {
      if (!value) return "";
      try {
        const url = new URL(String(value).trim());
        return url.protocol === "https:" ? url.href : "";
      } catch {
        return "";
      }
    };

    const resolveProductUrl = (id) => {
      const entry = config.products?.[id];
      if (!entry) return "";
      if (typeof entry === "string") return safeHttpsUrl(entry);
      const directUrl = safeHttpsUrl(entry.url);
      if (directUrl) return directUrl;
      const handle = String(entry.handle || "").trim().replace(/^\/+|\/+$/g, "");
      return cleanStoreUrl && handle ? `${cleanStoreUrl}/products/${encodeURIComponent(handle)}` : "";
    };

    let activeLinks = 0;

    const addPurchaseButton = (card, id, label) => {
      if (!card || card.querySelector(".shopify-buy-link")) return;
      card.dataset.shopifyId = card.dataset.shopifyId || id;
      const url = resolveProductUrl(id);
      const button = document.createElement(url ? "a" : "span");
      button.className = `shopify-buy-link${url ? "" : " is-disabled"}`;

      if (url) {
        button.href = url;
        button.textContent = `${label} →`;
        button.setAttribute("aria-label", `${label} on Shopify`);
        activeLinks += 1;
      } else {
        button.textContent = "Shopify checkout coming soon";
        button.setAttribute("aria-disabled", "true");
      }

      const target = card.querySelector(".merch-product-copy, .merch-pricing") || card;
      if (target.classList.contains("merch-pricing")) {
        target.insertAdjacentElement("afterend", button);
      } else {
        target.appendChild(button);
      }
    };

    catalog.querySelectorAll(".merch-product-card").forEach((card, index) => {
      const id = card.dataset.shopifyId || productIds[index];
      addPurchaseButton(card, id, "Select size & checkout");
    });

    catalog.querySelectorAll(".merch-bundle-card").forEach((card, index) => {
      const id = card.dataset.shopifyId || bundleIds[index];
      addPurchaseButton(card, id, "View set & checkout");
    });

    const note = document.createElement("div");
    note.className = `shopify-flow-note${activeLinks ? " is-connected" : " is-pending"}`;
    note.innerHTML = activeLinks
      ? `<strong>Secure Shopify checkout</strong><span>Select size, quantity, shipping, and pay securely on Shopify.</span>`
      : `<strong>Online shop coming soon</strong><span>When the store launches, size selection, shipping, and secure payment will be completed through Shopify.</span>`;

    const hero = catalog.querySelector(".merch-hero");
    hero?.insertAdjacentElement("afterend", note);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShopifyMerch, { once: true });
  } else {
    initShopifyMerch();
  }
})();
