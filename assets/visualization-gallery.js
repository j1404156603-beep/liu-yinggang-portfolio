(() => {
  const dialog = document.querySelector("#image-lightbox");
  const stage = document.querySelector("#lightbox-stage");
  const preview = document.querySelector("#lightbox-image");
  const caption = document.querySelector("#lightbox-caption");
  const zoomOutput = document.querySelector("#lightbox-zoom");

  if (!dialog || !stage || !preview || !caption || !zoomOutput) return;

  const sourceImages = Array.from(document.querySelectorAll(".image-frame img"))
    .filter((image) => image.alt && !image.alt.includes("现场照片"));

  let activeSource = null;
  let scale = 1;
  let fitScale = 1;
  let previousFocus = null;

  const clampScale = (value) => Math.min(2.5, Math.max(0.1, value));

  const centerPreview = () => {
    stage.scrollLeft = Math.max(0, (stage.scrollWidth - stage.clientWidth) / 2);
    stage.scrollTop = Math.max(0, (stage.scrollHeight - stage.clientHeight) / 2);
  };

  const applyScale = (nextScale, preserveCenter = true) => {
    const oldWidth = stage.scrollWidth;
    const oldHeight = stage.scrollHeight;
    const centerX = stage.scrollLeft + stage.clientWidth / 2;
    const centerY = stage.scrollTop + stage.clientHeight / 2;
    const ratioX = oldWidth > 0 ? centerX / oldWidth : 0.5;
    const ratioY = oldHeight > 0 ? centerY / oldHeight : 0.5;

    scale = clampScale(nextScale);
    preview.style.width = `${Math.round(preview.naturalWidth * scale)}px`;
    zoomOutput.value = `${Math.round(scale * 100)}%`;
    zoomOutput.textContent = zoomOutput.value;
    preview.style.cursor = scale > fitScale + 0.01 ? "zoom-out" : "zoom-in";

    requestAnimationFrame(() => {
      if (!preserveCenter) {
        centerPreview();
        return;
      }

      stage.scrollLeft = Math.max(0, ratioX * stage.scrollWidth - stage.clientWidth / 2);
      stage.scrollTop = Math.max(0, ratioY * stage.scrollHeight - stage.clientHeight / 2);
    });
  };

  const calculateFitScale = () => {
    const horizontalSpace = Math.max(120, stage.clientWidth - 68);
    const verticalSpace = Math.max(120, stage.clientHeight - 68);
    fitScale = Math.min(
      horizontalSpace / preview.naturalWidth,
      verticalSpace / preview.naturalHeight,
      1
    );
  };

  const fitPreview = () => {
    calculateFitScale();
    applyScale(fitScale, false);
  };

  const showPreview = (source) => {
    activeSource = source;
    previousFocus = document.activeElement;
    caption.textContent = source.alt;
    preview.alt = source.alt;
    preview.src = source.dataset.lightboxFull || source.currentSrc || source.src;

    if (!dialog.open) dialog.showModal();

    const prepareImage = () => {
      fitPreview();
      dialog.querySelector("[data-lightbox-action='close']")?.focus();
    };

    if (preview.complete && preview.naturalWidth > 0) {
      prepareImage();
    } else {
      preview.addEventListener("load", prepareImage, { once: true });
    }
  };

  const closePreview = () => {
    if (dialog.open) dialog.close();
  };

  sourceImages.forEach((image) => {
    image.dataset.lightboxSource = "";
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `查看大图：${image.alt}`);

    image.addEventListener("click", () => showPreview(image));
    image.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      showPreview(image);
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target === stage) closePreview();
  });

  dialog.addEventListener("close", () => {
    preview.removeAttribute("src");
    preview.style.removeProperty("width");
    caption.textContent = "";
    activeSource = null;
    previousFocus?.focus();
    previousFocus = null;
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePreview();
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      applyScale(scale + 0.2);
    }

    if (event.key === "-") {
      event.preventDefault();
      applyScale(scale - 0.2);
    }

    if (event.key === "0") {
      event.preventDefault();
      fitPreview();
    }
  });

  dialog.querySelectorAll("[data-lightbox-action]").forEach((control) => {
    control.addEventListener("click", () => {
      const action = control.dataset.lightboxAction;

      if (action === "close") closePreview();
      if (action === "zoom-in") applyScale(scale + 0.2);
      if (action === "zoom-out") applyScale(scale - 0.2);
      if (action === "actual") applyScale(1, false);
      if (action === "fit") fitPreview();
    });
  });

  preview.addEventListener("dblclick", () => {
    if (Math.abs(scale - fitScale) < 0.02) {
      applyScale(1, false);
    } else {
      fitPreview();
    }
  });

  window.addEventListener("resize", () => {
    if (!dialog.open || !activeSource) return;
    const wasFitted = Math.abs(scale - fitScale) < 0.02;
    calculateFitScale();
    if (wasFitted) applyScale(fitScale, false);
  });
})();
