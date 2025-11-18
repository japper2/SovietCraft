(function () {
  function mountNav() {
    var mount = document.getElementById("navbar");
    if (!mount) return;
    var partial = "nav.html";
    var fallback =
      '\n<div class="navbar">\n  <input type="checkbox" id="nav-toggle" />\n  <label class="nav-burger" for="nav-toggle">\n    <span></span><span></span><span></span>\n  </label>\n  <div class="nav-links">\n    <a href="index.html">Home</a>\n    <a href="store.html">Store</a>\n    <a href="discord.html">Discord</a>\n  </div>\n</div>\n';

    function inject(html) {
      mount.innerHTML = html;
    }

    fetch(partial, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("nav fetch failed");
        return res.text();
      })
      .then(inject)
      .catch(function () {
        inject(fallback);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountNav);
  } else {
    mountNav();
  }
})();
