// Shared navbar loader & active link highlighter
(function () {
  const current = location.pathname.split("/").pop() || "index.html";
  let host = document.getElementById("navbar");
  if (!host) {
    host = document.createElement("nav");
    host.id = "navbar";
    document.body.insertBefore(host, document.body.firstChild);
  }

  const FALLBACK_MARKUP = `\n<div class="navbar">\n  <a class="nav-logo" href="index.html" aria-label="SovietCraft home">\n    <img src="images/SovietCraFT.PNG" alt="SovietCraft Logo" />\n  </a>\n  <input type="checkbox" id="nav-toggle" />\n  <label class="nav-burger" for="nav-toggle" aria-label="Toggle navigation">\n    <span></span><span></span><span></span>\n  </label>\n  <div class="nav-links">\n    <a href="index.html">Home</a>\n    <a href="store.html">Store</a>\n    <a href="discord.html">Discord</a>\n    <a href="bluemap.html">Map</a>\n  </div>\n</div>`;

  function setActive() {
    const links = host.querySelectorAll(".nav-links a");
    links.forEach((a) => {
      if (a.getAttribute("href") === current) a.classList.add("active");
    });
  }

  // If opened directly from filesystem (file://) fetch will fail – inject fallback immediately.
  if (location.protocol === "file:") {
    host.innerHTML = FALLBACK_MARKUP;
    setActive();
    return;
  }

  host.classList.add("loading");
  fetch("nav.html", { cache: "no-cache" })
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    })
    .then((html) => {
      host.innerHTML = html || FALLBACK_MARKUP;
      host.classList.remove("loading");
      setActive();
    })
    .catch((err) => {
      console.warn("Nav load failed, using fallback", err);
      host.classList.remove("loading");
      host.innerHTML = FALLBACK_MARKUP;
      setActive();
    });
})();
