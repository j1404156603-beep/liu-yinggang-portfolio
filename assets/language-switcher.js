(() => {
  "use strict";

  const closeSwitcher = (switcher) => {
    const trigger = switcher.querySelector(".portfolio-language__trigger");
    const menu = switcher.querySelector(".portfolio-language__menu");

    if (!trigger || !menu) return;

    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  const closeOtherSwitchers = (currentSwitcher) => {
    document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
      if (switcher !== currentSwitcher) closeSwitcher(switcher);
    });
  };

  const createLanguageOption = ({ label, selected, disabled, href }) => {
    const option = href && !selected ? document.createElement("a") : document.createElement("span");
    option.className = "portfolio-language__option";
    option.textContent = label;
    if (href && !selected) option.href = href;

    if (selected) {
      option.classList.add("is-current");
      option.setAttribute("aria-current", "true");
    }
    if (disabled) {
      option.classList.add("is-disabled");
      option.setAttribute("aria-disabled", "true");
    }

    return option;
  };

  const initLanguageSwitchers = () => {
    const isChineseInterface = document.documentElement.lang
      .toLowerCase()
      .startsWith("zh");

    document
      .querySelectorAll(".portfolio-global-links, .nav-links")
      .forEach((navLinks, index) => {
        if (navLinks.querySelector("[data-language-switcher]")) return;

        const switcher = document.createElement("div");
        const trigger = document.createElement("button");
        const menu = document.createElement("div");
        const menuId = `portfolio-language-menu-${index + 1}`;

        switcher.className = "portfolio-language";
        switcher.dataset.languageSwitcher = "";

        trigger.className = "portfolio-language__trigger";
        trigger.type = "button";
        trigger.textContent = isChineseInterface ? "Language" : "语言";
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-controls", menuId);

        menu.className = "portfolio-language__menu";
        menu.id = menuId;
        menu.hidden = true;
        menu.setAttribute("role", "group");
        menu.setAttribute(
          "aria-label",
          isChineseInterface ? "语言选择" : "Language selection"
        );

        menu.append(
      createLanguageOption({
            label: "中文",
            selected: isChineseInterface,
            disabled: false,
            href: isChineseInterface ? null : null,
          }),
          createLanguageOption({
            label: "English",
            selected: !isChineseInterface,
            disabled: false,
            href: isChineseInterface
              ? ({
                  "liu-yinggang-portfolio-home-warm-paper.html": "/en/index.html",
                  "liu-yinggang-portfolio-about.html": "/en/about.html",
                  "liu-yinggang-portfolio-case-medical.html": "/en/case-provincial-healthcare.html",
                  "liu-yinggang-portfolio-case-mining.html": "/en/case-autonomous-mining.html",
                  "liu-yinggang-portfolio-case-cloud.html": "/en/case-vehicle-roadside-cloud-control.html",
                  "liu-yinggang-portfolio-visualization-gallery.html": "/en/operational-dashboards.html",
                  "liu-yinggang-portfolio-complex-systems.html": "/en/enterprise-systems.html",
                  "liu-yinggang-portfolio-3d-visual-assets.html": "/en/3d-visual-assets.html",
                }[location.pathname.split("/").pop()] || "/en/index.html")
              : null,
          })
        );

        trigger.addEventListener("click", () => {
          const willOpen = trigger.getAttribute("aria-expanded") !== "true";
          closeOtherSwitchers(switcher);
          trigger.setAttribute("aria-expanded", String(willOpen));
          menu.hidden = !willOpen;
        });

        switcher.append(trigger, menu);
        navLinks.append(switcher);
      });

    document.addEventListener("click", (event) => {
      document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
        if (!switcher.contains(event.target)) closeSwitcher(switcher);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
        const trigger = switcher.querySelector(".portfolio-language__trigger");
        const isOpen = trigger?.getAttribute("aria-expanded") === "true";

        closeSwitcher(switcher);
        if (isOpen) trigger.focus();
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageSwitchers, {
      once: true,
    });
  } else {
    initLanguageSwitchers();
  }
})();
