(function () {
  const current = location.pathname.split("/").pop() || "index.html";
  let host = document.getElementById("navbar");
  if (!host) {
    host = document.createElement("nav");
    host.id = "navbar";
    document.body.insertBefore(host, document.body.firstChild);
  }

  const FALLBACK_MARKUP = `\n<div class="navbar">\n  <a class="nav-logo" href="index.html" aria-label="SovietCraft home">\n    <img src="images/SovietCraFT.PNG" alt="SovietCraft Logo" />\n  </a>\n  <input type="checkbox" id="nav-toggle" />\n  <label class="nav-burger" for="nav-toggle" aria-label="Toggle navigation">\n    <span></span><span></span><span></span>\n  </label>\n  <div class="nav-links">\n    <a href="index.html">Home</a>\n    <a href="store.html">Store</a>\n    <a href="discord.html">Discord</a>\n    <a href="bluemap.html">Map</a>\n  </div>\n  <div class="nav-actions">\n    <a class="btn login" href="login_page.html">Login</a>\n  </div>\n</div>`;

  function setActive() {
    const links = host.querySelectorAll(".nav-links a");
    links.forEach((a) => {
      if (a.getAttribute("href") === current) a.classList.add("active");
    });
  }

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

// Sidebar toggle behavior (shows the Why Play Here sidebar)
function initSidebarToggle() {
  const btn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  if (!btn || !sidebar) return;

  function openSidebar(open) {
    if (open) {
      sidebar.classList.add('open');
      sidebar.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      sidebar.classList.remove('open');
      sidebar.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  btn.addEventListener('click', () => openSidebar(!sidebar.classList.contains('open')));

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') openSidebar(false);
  });

  // Close when clicking outside sidebar on small screens
  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('open')) return;
    if (window.innerWidth <= 760) {
      if (!sidebar.contains(e.target) && e.target !== btn) openSidebar(false);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarToggle);
} else {
  // If script executed after DOMContentLoaded, initialize immediately
  initSidebarToggle();
}
