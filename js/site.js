/* Fills links/text from config.js, builds the theme picker, FAQ niceties and share button.
   You normally never need to edit this file. */
(function () {
  var C = window.SITE || {};
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hasGroup = !!(C.groupUrl && C.groupUrl.trim());
  var isLive = C.status === "live";

  /* ---- text:  <span data-text="appName"></span> ---- */
  $("[data-text]").forEach(function (el) {
    var v = C[el.getAttribute("data-text")];
    if (v !== undefined && v !== null) el.textContent = v;
  });

  /* ---- links:  <a data-href="playUrl"> ---- */
  $("[data-href]").forEach(function (el) {
    var v = C[el.getAttribute("data-href")];
    if (v) el.setAttribute("href", v);
  });

  /* ---- email links ---- */
  $("[data-mailto]").forEach(function (el) {
    var subj = el.getAttribute("data-mailto");
    var body = el.getAttribute("data-body") || "";
    var href = "mailto:" + C.contactEmail + "?subject=" + encodeURIComponent(subj || (C.appName + " feedback"));
    if (body) href += "&body=" + encodeURIComponent(body);
    el.setAttribute("href", href);
  });
  $("[data-email]").forEach(function (el) {
    el.textContent = C.contactEmail;
    if (el.tagName === "A") el.setAttribute("href", "mailto:" + C.contactEmail);
  });

  /* ---- conditional blocks ---- */
  $("[data-if]").forEach(function (el) {
    var k = el.getAttribute("data-if");
    var ok = k === "group" ? hasGroup : k === "nogroup" ? !hasGroup :
             k === "live" ? isLive : k === "testing" ? !isLive :
             k === "video" ? !!C.videoUrl : false;
    if (!ok) el.hidden = true;
  });

  /* ---- when the app is live, point "Become a tester" buttons to Play ---- */
  if (isLive) {
    $("[data-cta]").forEach(function (el) {
      el.setAttribute("href", C.playUrl);
      el.textContent = "Get it on Google Play";
    });
  }

  /* ---- screenshots override the drawn phones ---- */
  $("[data-shot]").forEach(function (el) {
    var src = C.screenshots && C.screenshots[el.getAttribute("data-shot")];
    if (!src) return;
    var img = document.createElement("img");
    img.src = src; img.alt = el.getAttribute("aria-label") || "";
    img.className = "phone-img"; img.loading = "lazy";
    el.innerHTML = ""; el.appendChild(img); el.classList.add("has-shot");
  });

  /* ---- video (YouTube) ---- */
  var vb = document.getElementById("video-box");
  if (vb && C.videoUrl) {
    var m = C.videoUrl.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    if (m) {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + m[1];
      f.title = "NOTEPANS video"; f.loading = "lazy"; f.allowFullscreen = true;
      f.allow = "accelerometer; encrypted-media; picture-in-picture";
      vb.appendChild(f);
    } else { vb.hidden = true; }
  }

  /* ---- theme picker ---- */
  var tp = document.getElementById("theme-picker");
  if (tp && window.NP_THEMES) {
    var cur = document.documentElement.getAttribute("data-theme");
    Object.keys(window.NP_THEMES).forEach(function (id) {
      var t = window.NP_THEMES[id];
      var b = document.createElement("button");
      b.type = "button"; b.className = "swatch"; b.setAttribute("data-id", id);
      b.setAttribute("aria-pressed", String(id === cur));
      b.innerHTML = '<span class="chip" style="background:' + t.bg + ';border-color:' + t.accent +
        '"><i style="background:' + t.accent + '"></i></span><span>' + t.name + "</span>";
      b.addEventListener("click", function () {
        window.npSetTheme(id, true);
        $(".swatch", tp).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      });
      tp.appendChild(b);
    });
  }

  /* ---- share button ---- */
  $("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var data = { title: C.appName + " — closed testing", text: "Help test " + C.appName + " on Google Play?", url: location.origin + location.pathname.replace(/[^/]*$/, "test.html") };
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data.url).then(function () {
          var old = btn.textContent; btn.textContent = "Link copied ✓";
          setTimeout(function () { btn.textContent = old; }, 2000);
        });
      }
    });
  });

  /* ---- setup warning bar (disappears once every REPLACE-... is filled) ---- */
  var todo = [];
  if (/REPLACE/.test(C.contactEmail || "")) todo.push("contactEmail");
  if (hasGroup && /REPLACE/.test(C.groupUrl)) todo.push("groupUrl");
  if (todo.length) {
    var bar = document.createElement("div");
    bar.className = "setup-bar"; bar.setAttribute("role", "status");
    bar.innerHTML = "<strong>Setup needed:</strong> open <code>config.js</code> and set " +
      todo.map(function (t) { return "<code>" + t + "</code>"; }).join(", ") + ". This bar disappears when done.";
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ---- year ---- */
  $("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- header shadow on scroll ---- */
  var hd = document.querySelector(".site-header");
  if (hd) {
    var on = function () { hd.classList.toggle("scrolled", window.scrollY > 8); };
    on(); window.addEventListener("scroll", on, { passive: true });
  }
})();
