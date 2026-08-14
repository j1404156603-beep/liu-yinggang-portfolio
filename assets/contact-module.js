document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-wechat]");
  if (!button) return;

  const wechatId = button.dataset.copyWechat;
  const originalLabel = button.textContent;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(wechatId);
    } else {
      const input = document.createElement("textarea");
      input.value = wechatId;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    button.textContent = "已复制";
  } catch {
    button.textContent = `微信 ${wechatId}`;
  }

  window.setTimeout(() => {
    button.textContent = originalLabel;
  }, 1800);
});
