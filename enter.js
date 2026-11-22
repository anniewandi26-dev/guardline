(() => {
  const btn = document.getElementById("enter-btn");
  const stage = document.getElementById("enter-stage");
  const loader = document.getElementById("loader");
  const status = document.getElementById("loader-status");
  const fill = document.getElementById("loader-fill");
  const pct = document.getElementById("loader-pct");
  const bar = document.getElementById("loader-bar");
  const steps = [...document.querySelectorAll("#loader-steps li")];

  if (!btn || !loader) return;

  const DURATION = 5000;
  const destination = "home.html";
  let running = false;

  const msgKeys = [
    "loader.msg0",
    "loader.msg1",
    "loader.msg2",
    "loader.msg3",
    "loader.msg4",
    "loader.msg5",
  ];

  const tx = (key) =>
    window.ShouhaoI18n?.t?.(key) ||
    status?.getAttribute("data-fallback") ||
    key;

  const setStep = (index) => {
    steps.forEach((li, i) => {
      li.classList.toggle("is-on", i === index);
      li.classList.toggle("is-done", i < index);
    });
  };

  const startLoading = () => {
    if (running) return;
    running = true;
    btn.disabled = true;
    if (stage) stage.classList.add("is-dimmed");
    loader.hidden = false;
    loader.classList.add("is-active");
    loader.setAttribute("aria-busy", "true");

    const started = performance.now();
    let lastMsg = -1;

    const tick = (now) => {
      const progress = Math.min((now - started) / DURATION, 1);
      const percent = Math.round(progress * 100);
      if (fill) fill.style.width = `${percent}%`;
      if (pct) pct.textContent = String(percent);
      if (bar) bar.setAttribute("aria-valuenow", String(percent));

      const msgIndex = Math.min(msgKeys.length - 1, Math.floor(progress * msgKeys.length));
      if (msgIndex !== lastMsg) {
        lastMsg = msgIndex;
        if (status) status.textContent = tx(msgKeys[msgIndex]);
        setStep(Math.min(steps.length - 1, msgIndex));
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setStep(steps.length - 1);
        if (status) status.textContent = tx("loader.done");
        window.setTimeout(() => {
          window.location.href = destination;
        }, 250);
      }
    };

    requestAnimationFrame(tick);
  };

  const arm = () => {
    btn.addEventListener("click", startLoading);
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" || event.repeat || running) return;
      event.preventDefault();
      startLoading();
    });
  };

  if (window.ShouhaoI18n?.ready) {
    window.ShouhaoI18n.ready.then(arm);
  } else {
    arm();
  }
})();
