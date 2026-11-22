(() => {
  const status = document.getElementById("loader-status");
  const fill = document.getElementById("loader-fill");
  const pct = document.getElementById("loader-pct");
  const bar = document.getElementById("loader-bar");
  const steps = [...document.querySelectorAll("#loader-steps li")];

  const destination = readDestination();
  const DURATION = 5000;

  const msgKeys = [
    "loader.msg0",
    "loader.msg1",
    "loader.msg2",
    "loader.msg3",
    "loader.msg4",
    "loader.msg5",
  ];

  function readDestination() {
    const params = new URLSearchParams(window.location.search);
    let raw = params.get("to") || params.get("next") || "";

    if (!raw && window.location.hash) {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash.startsWith("to=")) {
        raw = hash.slice(3);
      } else {
        raw = hash;
      }
    }

    return sanitizeDestination(raw || "home.html");
  }

  function sanitizeDestination(value) {
    let decoded = String(value || "home.html").trim();
    try {
      decoded = decodeURIComponent(decoded);
    } catch {
      /* keep raw */
    }
    decoded = decoded.replace(/^\.\//, "");
    if (
      decoded.startsWith("http://") ||
      decoded.startsWith("https://") ||
      decoded.startsWith("//") ||
      decoded.includes("..")
    ) {
      return "home.html";
    }
    if (!/\.html([?#].*)?$/i.test(decoded)) return "home.html";
    if (/^index\.html/i.test(decoded) || /^loading\.html/i.test(decoded)) {
      return "home.html";
    }
    return decoded;
  }

  const tx = (key) => window.ShouhaoI18n?.t?.(key) || key;

  const setStep = (index) => {
    steps.forEach((li, i) => {
      li.classList.toggle("is-on", i === index);
      li.classList.toggle("is-done", i < index);
    });
  };

  const run = () => {
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
          window.location.replace(destination);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  };

  if (window.ShouhaoI18n?.ready) {
    window.ShouhaoI18n.ready.then(run);
  } else {
    run();
  }
})();
