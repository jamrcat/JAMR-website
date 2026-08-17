(() => {
  const initBrandExperience = () => {
    if (document.documentElement.dataset.brsBrandReady === "true") return;
    document.documentElement.dataset.brsBrandReady = "true";

    const offset = document.querySelector('meta[name="quarto:offset"]')?.content || "./";
    const logoUrl = new URL(`${offset}assets/base-running-science-logo.png`, window.location.href).href;

    document.title = document.title.replace(
      /José Antonio Martínez-Rodríguez/g,
      "Base Running Science"
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
    if (navbarTitle) navbarTitle.textContent = "Base Running Science";

    const hero = document.querySelector(".hero-section");
    if (hero && !hero.querySelector(".brand-hero-logo")) {
      const portrait = hero.querySelector("img");
      const portraitBlock = portrait?.closest("p") || portrait;
      const visuals = document.createElement("div");
      visuals.className = "hero-visuals";

      const logo = document.createElement("img");
      logo.className = "brand-hero-logo";
      logo.src = logoUrl;
      logo.alt = "Base Running Science logo";
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

    const progress = document.createElement("button");
    progress.className = "runner-progress";
    progress.type = "button";
    progress.setAttribute("role", "slider");
    progress.setAttribute("aria-label", "Page position; use arrow keys to move along the base path");
    progress.setAttribute("aria-valuemin", "0");
    progress.setAttribute("aria-valuemax", "100");
    progress.innerHTML = `
      <span class="runner-track" aria-hidden="true">
        <span class="runner-fill"></span>
        <span class="base-marker base-start"></span>
        <span class="base-marker base-one"></span>
        <span class="base-marker base-two"></span>
        <span class="base-marker base-three"></span>
        <span class="base-marker base-home"></span>
        <span class="runner-marker"><span class="runner-speedline"></span></span>
      </span>`;
    document.body.appendChild(progress);

    const track = progress.querySelector(".runner-track");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stages = ["Leaving home", "Rounding first", "Rounding second", "Rounding third", "Home stretch"];
    let currentProgress = 0;
    let ticking = false;

    const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const update = () => {
      const distance = maxScroll();
      currentProgress = distance ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      const percent = Math.round(currentProgress * 100);
      const stage = stages[Math.min(stages.length - 1, Math.floor(currentProgress * stages.length))];
      progress.style.setProperty("--run-progress", `${currentProgress * 100}%`);
      progress.setAttribute("aria-valuenow", String(percent));
      progress.setAttribute("aria-valuetext", `${percent}% · ${stage}`);
      progress.dataset.label = `${stage} · ${percent}%`;
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    const goTo = (ratio) => {
      const next = Math.min(1, Math.max(0, ratio));
      window.scrollTo({
        top: maxScroll() * next,
        behavior: prefersReducedMotion.matches ? "auto" : "smooth"
      });
    };

    progress.addEventListener("click", (event) => {
      const bounds = track.getBoundingClientRect();
      goTo((event.clientX - bounds.left) / bounds.width);
    });

    progress.addEventListener("keydown", (event) => {
      let next = currentProgress;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next += 0.05;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next -= 0.05;
      else if (event.key === "PageDown") next += 0.25;
      else if (event.key === "PageUp") next -= 0.25;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = 1;
      else return;
      event.preventDefault();
      goTo(next);
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    update();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBrandExperience, { once: true });
  } else {
    initBrandExperience();
  }
})();
