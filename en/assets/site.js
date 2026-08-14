const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#site-menu");

const initLanguageMenu = () => {
  document.querySelectorAll(".language-link").forEach((link, index) => {
    if (link.closest(".language-switcher")) return;

    const switcher = document.createElement("div");
    const trigger = document.createElement("button");
    const options = document.createElement("div");
    const chinese = document.createElement("a");
    const english = document.createElement("span");

    switcher.className = "language-switcher";
    trigger.className = "language-switcher__trigger";
    trigger.type = "button";
    trigger.textContent = "语言";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", `language-menu-${index + 1}`);

    options.className = "language-switcher__menu";
    options.id = `language-menu-${index + 1}`;
    options.hidden = true;
    options.setAttribute("role", "group");
    options.setAttribute("aria-label", "语言选择");

    chinese.className = "language-switcher__option";
    chinese.href = link.href;
    chinese.textContent = "中文";

    english.className = "language-switcher__option is-current";
    english.textContent = "English";
    english.setAttribute("aria-current", "true");

    options.append(chinese, english);
    switcher.append(trigger, options);
    link.replaceWith(switcher);

    const close = () => {
      trigger.setAttribute("aria-expanded", "false");
      options.hidden = true;
    };

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = trigger.getAttribute("aria-expanded") !== "true";
      document.querySelectorAll(".language-switcher__trigger").forEach((other) => {
        if (other !== trigger) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.hidden = true;
        }
      });
      trigger.setAttribute("aria-expanded", String(open));
      options.hidden = !open;
    });

  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".language-switcher").forEach((switcher) => {
      if (!switcher.contains(event.target)) {
        switcher.querySelector(".language-switcher__trigger")?.setAttribute("aria-expanded", "false");
        const options = switcher.querySelector(".language-switcher__menu");
        if (options) options.hidden = true;
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".language-switcher").forEach((switcher) => {
      const trigger = switcher.querySelector(".language-switcher__trigger");
      if (trigger?.getAttribute("aria-expanded") === "true") {
        closeLanguageSwitcher(switcher);
        trigger.focus();
      }
    });
  });
};

const closeLanguageSwitcher = (switcher) => {
  const trigger = switcher.querySelector(".language-switcher__trigger");
  const options = switcher.querySelector(".language-switcher__menu");
  if (!trigger || !options) return;
  trigger.setAttribute("aria-expanded", "false");
  options.hidden = true;
};

initLanguageMenu();

if (toggle && menu) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-wechat]");
  if (!button) return;
  const wechatId = button.dataset.copyWechat;
  const originalLabel = button.textContent;
  try {
    await navigator.clipboard.writeText(wechatId);
    button.textContent = "Copied";
  } catch {
    button.textContent = `WeChat ${wechatId}`;
  }
  window.setTimeout(() => {
    button.textContent = originalLabel;
  }, 1800);
});
