(() => {
  const initBrandExperience = () => {
    if (document.documentElement.dataset.brsBrandReady === "true") return;
    document.documentElement.dataset.brsBrandReady = "true";

    const offset = document.querySelector('meta[name="quarto:offset"]')?.content || "./";
    const logoUrl = new URL(`${offset}assets/base-running-science-logo.png`, window.location.href).href;

    document.title = document.title.replace(
      /José Antonio Martínez-Rodríguez/g,
      "Base Running Science™"
    );

    const navbarBrand = document.querySelector(".navbar-brand");
    if (navbarBrand && !navbarBrand.querySelector("img")) {
      const logo = document.createElement("img");
      logo.className = "brand-nav-logo";
      logo.src = logoUrl;
      logo.alt = "";
      logo.width = 44;
      logo.height = 44;
      navbarBrand.prepend(logo);
    }

    const navbarTitle = document.querySelector(".navbar-title");
    if (navbarTitle) navbarTitle.textContent = "Base Running Science™";

    const hero = document.querySelector(".hero-section");
    if (hero && !hero.querySelector(".brand-hero-logo")) {
      const portrait = hero.querySelector("img");
      const portraitBlock = portrait?.closest("p") || portrait;
      const visuals = document.createElement("div");
      visuals.className = "hero-visuals";

      const logo = document.createElement("img");
      logo.className = "brand-hero-logo";
      logo.src = logoUrl;
      logo.alt = "Base Running Science™ logo";
      visuals.appendChild(logo);

      if (portraitBlock) {
        portrait?.classList.add("hero-portrait");
        visuals.appendChild(portraitBlock);
      }

      hero.prepend(visuals);

      const kicker = document.createElement("div");
      kicker.className = "hero-kicker";
      kicker.textContent = "RUN THE CURVE · READ THE DATA";
      visuals.insertAdjacentElement("afterend", kicker);
    }

    const merchCatalog = document.querySelector("#base-running-merch-concept");
    if (merchCatalog && !document.querySelector("[data-brs-shopify-loader]")) {
      const loadScript = (src, marker) => new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.dataset.brsShopifyLoader = marker;
        script.addEventListener("load", resolve, { once: true });
        script.addEventListener("error", reject, { once: true });
        document.head.appendChild(script);
      });

      loadScript(new URL(`${offset}assets/shopify-config.js`, window.location.href).href, "config")
        .then(() => loadScript(new URL(`${offset}assets/shopify-merch.js`, window.location.href).href, "integration"))
        .catch(() => merchCatalog.classList.add("shopify-integration-unavailable"));
    }


  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBrandExperience, { once: true });
  } else {
    initBrandExperience();
  }
})();
