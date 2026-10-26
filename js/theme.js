/* Loaded in <head> (blocking) so the saved theme is applied before first paint — no flash.
   Theme palettes mirror the app's own themes (src/appearance/themes/definitions). */
(function () {
  var themes = {
    dark:       { name: "Graphite",   scheme: "dark",  bg: "#14171c", accent: "#c9a24b" },
    light:      { name: "Paper",      scheme: "light", bg: "#f5f2ea", accent: "#8a650f" },
    amber:      { name: "Amber",      scheme: "dark",  bg: "#1c1410", accent: "#f0a63a" },
    forest:     { name: "Forest",     scheme: "dark",  bg: "#121a15", accent: "#c4a35a" },
    midnight:   { name: "Midnight",   scheme: "dark",  bg: "#0b0b14", accent: "#8b7cf6" },
    ocean:      { name: "Ocean",      scheme: "dark",  bg: "#0f1a24", accent: "#38bdd8" },
    slate:      { name: "Slate",      scheme: "dark",  bg: "#1e2630", accent: "#b8c4d4" },
    rose:       { name: "Rose",       scheme: "light", bg: "#f8eeee", accent: "#a8485e" },
    sage:       { name: "Sage",       scheme: "light", bg: "#f0f2e8", accent: "#4f7355" },
    terracotta: { name: "Terracotta", scheme: "light", bg: "#f6ede2", accent: "#a34a2a" }
  };
  window.NP_THEMES = themes;

  window.npSetTheme = function (id, save) {
    if (!themes[id]) id = "dark";
    document.documentElement.setAttribute("data-theme", id);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", themes[id].bg);
    if (save) { try { localStorage.setItem("np-theme", id); } catch (e) {} }
  };

  var id = null;
  try { id = localStorage.getItem("np-theme"); } catch (e) {}
  if (!id || !themes[id]) {
    id = (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
  }
  window.npSetTheme(id, false);
})();
