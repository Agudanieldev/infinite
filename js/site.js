/* Shared header component: one consistent navigation on every page. */
(function () {
  "use strict";

  var mount = document.getElementById("site-header");
  if (!mount) return;

  var phone = "+1 (848) 633-9708";
  var email = "infiniteshares18@gmail.com";

  /* ----------------------------------------------------------------------
     Language selector
     Google Translate is shared with the marketing site and client portal
     through the .tradezanga.com cookie, but the picker keeps Infinite
     Shares' own black/gold styling.
     ---------------------------------------------------------------------- */
  var LANGUAGES = [
    { code: "en", label: "English" },
    { code: "zh", label: "中文" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "ar", label: "العربية" },
    { code: "hi", label: "हिन्दी" },
    { code: "pt", label: "Português" },
    { code: "ru", label: "Русский" },
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" },
    { code: "it", label: "Italiano" },
    { code: "tr", label: "Türkçe" },
    { code: "nl", label: "Nederlands" },
    { code: "pl", label: "Polski" },
    { code: "uk", label: "Українська" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "fa", label: "فارسی" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ro", label: "Română" },
    { code: "th", label: "ไทย" },
    { code: "cs", label: "Čeština" },
    { code: "sv", label: "Svenska" },
    { code: "fi", label: "Suomi" },
    { code: "el", label: "Ελληνικά" },
    { code: "he", label: "עברית" },
    { code: "ms", label: "Bahasa Melayu" },
    { code: "hu", label: "Magyar" },
    { code: "bg", label: "Български" },
    { code: "da", label: "Dansk" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "ml", label: "മലയാളം" },
    { code: "bn", label: "বাংলা" },
    { code: "ur", label: "اردو" }
  ];

  var LANGUAGE_STORAGE_KEY = "tz-language";
  var GOOGTRANS_COOKIE = "googtrans";
  var SHARED_COOKIE_DOMAIN = "tradezanga.com";

  function supportedLanguage(value) {
    if (!value) return null;

    var base = String(value).trim().toLowerCase().split(/[-_]/)[0];
    for (var i = 0; i < LANGUAGES.length; i++) {
      if (LANGUAGES[i].code === base) return base;
    }
    return null;
  }

  function readCookie(name) {
    var prefix = name + "=";
    var parts = document.cookie ? document.cookie.split(";") : [];

    for (var i = 0; i < parts.length; i++) {
      var part = parts[i].replace(/^\s+/, "");
      if (part.indexOf(prefix) !== 0) continue;

      var raw = part.slice(prefix.length);
      try {
        return decodeURIComponent(raw);
      } catch (error) {
        return raw;
      }
    }
    return null;
  }

  function sharedCookieDomain() {
    var host = window.location.hostname.toLowerCase();
    if (
      host === SHARED_COOKIE_DOMAIN ||
      host.slice(-(SHARED_COOKIE_DOMAIN.length + 1)) === "." + SHARED_COOKIE_DOMAIN
    ) {
      return ";domain=." + SHARED_COOKIE_DOMAIN;
    }
    return "";
  }

  function writeGoogtransCookie(language) {
    var value = "/en/" + language;
    var maxAge = 60 * 60 * 24 * 365;
    var cookie =
      GOOGTRANS_COOKIE +
      "=" +
      value +
      ";path=/;max-age=" +
      maxAge +
      ";SameSite=Lax";
    var domain = sharedCookieDomain();

    if (domain) {
      // Drop a host-only cookie from the old helper so the shared value wins.
      document.cookie = GOOGTRANS_COOKIE + "=;path=/;max-age=0;SameSite=Lax";
      document.cookie = cookie + domain;
      return;
    }

    document.cookie = cookie;
  }

  function clearGoogtransCookie() {
    document.cookie = GOOGTRANS_COOKIE + "=;path=/;max-age=0;SameSite=Lax";
    var domain = sharedCookieDomain();
    if (domain) {
      document.cookie =
        GOOGTRANS_COOKIE + "=;path=/;max-age=0;SameSite=Lax" + domain;
    }
  }

  function currentLanguage() {
    var queryLanguage = "";
    try {
      queryLanguage =
        new URLSearchParams(window.location.search).get("lang") || "";
    } catch (error) {
      queryLanguage = "";
    }

    var fromQuery = supportedLanguage(queryLanguage);
    if (fromQuery) return fromQuery;

    var cookie = readCookie(GOOGTRANS_COOKIE);
    if (cookie) {
      var parts = cookie.split("/").filter(Boolean);
      var target = parts.length ? parts[parts.length - 1] : "";
      var fromCookie = supportedLanguage(target);
      if (fromCookie) return fromCookie;
    }

    var stored = null;
    try {
      stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      stored = null;
    }

    var fromStorage = supportedLanguage(stored);
    if (fromStorage) return fromStorage;

    var candidates =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    for (var i = 0; i < candidates.length; i++) {
      var fromBrowser = supportedLanguage(candidates[i]);
      if (fromBrowser) return fromBrowser;
    }

    return "en";
  }

  function setLanguage(language) {
    var code = supportedLanguage(language) || "en";

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch (error) {
      /* localStorage can be unavailable in private mode. */
    }

    if (code === "en") {
      clearGoogtransCookie();
    } else {
      writeGoogtransCookie(code);
    }

    window.location.reload();
  }

  function languageMarkup(extraClass) {
    var options = LANGUAGES.map(function (language) {
      return (
        '<li role="none"><button type="button" role="option" aria-selected="false" ' +
        'data-sh-lang-option data-lang="' +
        language.code +
        '">' +
        language.label +
        "</button></li>"
      );
    }).join("");

    return (
      '<div class="sh-lang ' +
      (extraClass || "") +
      '" data-sh-lang translate="no">' +
        '<button class="sh-lang__button" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Language">' +
          '<i class="ai-font-language" aria-hidden="true"></i>' +
          '<span class="sh-lang__label" data-sh-lang-label>EN</span>' +
          '<span class="sh-lang__chevron" aria-hidden="true">&#9662;</span>' +
        "</button>" +
        '<ul class="sh-lang__menu" role="listbox" aria-label="Language">' +
          options +
        "</ul>" +
      "</div>"
    );
  }

  function updateLanguageLabels() {
    var current = currentLanguage();
    var code = current.toUpperCase();

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-sh-lang-label]"),
      function (label) {
        label.textContent = code;
      }
    );

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-sh-lang-option]"),
      function (option) {
        var selected = option.getAttribute("data-lang") === current;
        option.setAttribute("aria-selected", selected ? "true" : "false");
        option.classList.toggle("is-selected", selected);
      }
    );
  }

  function setupLanguage(root) {
    var button = root.querySelector(".sh-lang__button");
    var menu = root.querySelector(".sh-lang__menu");
    if (!button || !menu) return;

    function close() {
      root.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }

    function open() {
      Array.prototype.forEach.call(
        document.querySelectorAll(".sh-lang.is-open"),
        function (other) {
          if (other === root) return;
          other.classList.remove("is-open");
          var otherButton = other.querySelector(".sh-lang__button");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        }
      );

      root.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");

      var selected =
        menu.querySelector('[aria-selected="true"]') ||
        menu.querySelector("button");
      if (selected) selected.focus();
    }

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      if (root.classList.contains("is-open")) {
        close();
      } else {
        open();
      }
    });

    menu.addEventListener("click", function (event) {
      var option = event.target;
      while (
        option &&
        option !== menu &&
        !(option.tagName === "BUTTON" && option.getAttribute("data-lang"))
      ) {
        option = option.parentNode;
      }

      if (!option || option === menu) return;
      event.stopPropagation();
      setLanguage(option.getAttribute("data-lang"));
    });

    document.addEventListener("click", function (event) {
      if (!root.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("is-open")) {
        close();
        button.focus();
      }
    });
  }

  function loadTranslateEngine() {
    if (document.getElementById("infinite-google-translate-engine")) return;

    var script = document.createElement("script");
    script.id = "infinite-google-translate-engine";
    script.async = true;
    script.src = "/js/googletranscookie.js";
    script.addEventListener("error", function () {
      console.warn("Google Translate could not be loaded.");
    });
    document.head.appendChild(script);
  }

  window.InfiniteTranslate = {
    languages: LANGUAGES,
    current: currentLanguage,
    set: setLanguage
  };

  mount.innerHTML =
    '<header class="sh-header" id="sh-header">' +
      '<div class="sh-topbar">' +
        '<a class="sh-logo" href="/" aria-label="Infinite Shares home">' +
          '<img src="/images/logo-menu.svg" alt="Infinite Shares">' +
        "</a>" +
        '<button class="sh-burger" type="button" aria-label="Open navigation" aria-controls="sh-nav" aria-expanded="false">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
        '<div class="sh-contact">' +
          languageMarkup("") +
          '<a href="tel:+18486339708"><i class="ai-font-phone" aria-hidden="true"></i><span>' + phone + "</span></a>" +
          '<a href="mailto:' + email + '"><i class="ai-font-envelope-f" aria-hidden="true"></i><span>' + email + "</span></a>" +
          '<a class="sh-contact__auth" href="/signup/">Sign Up</a>' +
          '<a class="sh-contact__auth" href="/login/">Login</a>' +
        "</div>" +
      "</div>" +
      '<div class="sh-backdrop" data-sh-close aria-hidden="true"></div>' +
      '<nav id="sh-nav" class="sh-nav" aria-label="Main navigation">' +
        '<div class="sh-nav__panel" role="dialog" aria-modal="true" aria-label="Site navigation">' +
          '<button class="sh-close" type="button" data-sh-close aria-label="Close navigation">&#215;</button>' +
          '<a class="sh-nav__brand" href="/" aria-label="Infinite Shares home">' +
            '<img src="/images/logo-menu.svg" alt="Infinite Shares">' +
          "</a>" +
          languageMarkup("sh-lang--mobile") +
          '<ul class="sh-nav__list">' +
            '<li><a href="/" data-nav="home">Home</a></li>' +
            '<li><a href="/properties/" data-nav="properties">Properties</a></li>' +
            '<li><a href="/homes-for-sale-featured/" data-nav="featured">Exclusive Listings</a></li>' +
            '<li><a href="/sold-featured-listing/" data-nav="sold">Sold Homes</a></li>' +
            '<li class="sh-has-sub">' +
              '<button class="sh-sub-toggle" type="button" aria-expanded="false" aria-controls="sh-sub-buyers" data-nav="buyers-sellers">' +
                '<span class="sh-sub-label">Buyers &amp; Sellers</span><span class="sh-sub-plus" aria-hidden="true">+</span>' +
              "</button>" +
              '<ul class="sh-sub" id="sh-sub-buyers">' +
                '<li><a href="/for-buyers/" data-nav="buyers">Buyers</a></li>' +
                '<li><a href="/for-sellers/" data-nav="sellers">Sellers</a></li>' +
              "</ul>" +
            "</li>" +
            '<li><a href="/about/" data-nav="about">About Infinite Shares</a></li>' +
            '<li><a href="/contact-us/" data-nav="contact">Contact Us</a></li>' +
            '<li><a href="/signup/" data-nav="signup">Sign Up</a></li>' +
            '<li><a href="/login/" data-nav="login">Login</a></li>' +
          "</ul>" +
          '<div class="sh-nav__meta">' +
            '<a href="tel:+18486339708"><i class="ai-font-phone" aria-hidden="true"></i>' + phone + "</a>" +
            '<a href="mailto:' + email + '"><i class="ai-font-envelope-f" aria-hidden="true"></i>' + email + "</a>" +
          "</div>" +
        "</div>" +
      "</nav>" +
    "</header>";

  var header = document.getElementById("sh-header");

  var current = currentLanguage();
  if (current === "en") {
    clearGoogtransCookie();
  } else {
    writeGoogtransCookie(current);
  }

  updateLanguageLabels();
  Array.prototype.forEach.call(
    header.querySelectorAll("[data-sh-lang]"),
    setupLanguage
  );

  try {
    var pageUrl = new URL(window.location.href);
    if (pageUrl.searchParams.has("lang")) {
      pageUrl.searchParams.delete("lang");
      window.history.replaceState(
        window.history.state,
        "",
        pageUrl.toString()
      );
    }
  } catch (error) {
    /* Older browsers without URL support simply keep the query string. */
  }

  if (current !== "en") loadTranslateEngine();

  var burger = header.querySelector(".sh-burger");
  var panel = header.querySelector(".sh-nav__panel");
  var closeBtn = header.querySelector(".sh-close");
  var subToggle = header.querySelector(".sh-sub-toggle");
  var sub = header.querySelector(".sh-sub");
  var lastFocus = null;

  function setOpen(open) {
    header.classList.toggle("is-open", open);
    document.body.classList.toggle("sh-nav-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    if (open) {
      lastFocus = document.activeElement;
      window.setTimeout(function () { closeBtn.focus(); }, 60);
    } else if (lastFocus) {
      lastFocus.focus();
    }
  }

  burger.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-open"));
  });

  Array.prototype.forEach.call(header.querySelectorAll("[data-sh-close]"), function (el) {
    el.addEventListener("click", function () { setOpen(false); });
  });

  Array.prototype.forEach.call(header.querySelectorAll(".sh-nav a"), function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });

  subToggle.addEventListener("click", function () {
    var open = sub.classList.toggle("is-open");
    subToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.addEventListener("keydown", function (e) {
    if (!header.classList.contains("is-open")) return;
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    var focusable = panel.querySelectorAll('a[href], button:not([disabled])');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* Highlight the current page and auto-open its parent section. */
  var path = window.location.pathname;
  var key = "";

  if (path === "/" || path === "/index.html" || /^\/page\/\d+\/?$/.test(path)) key = "home";
  else if (/^\/properties\//.test(path)) key = "properties";
  else if (/^\/homes-for-sale-featured\//.test(path)) key = "featured";
  else if (/^\/sold-featured-listing\//.test(path)) key = "sold";
  else if (/^\/for-buyers\//.test(path)) key = "buyers";
  else if (/^\/for-sellers\//.test(path)) key = "sellers";
  else if (/^\/about\//.test(path)) key = "about";
  else if (/^\/contact-us\//.test(path)) key = "contact";

  if (key) {
    var current = header.querySelector('[data-nav="' + key + '"]');
    if (current) {
      current.classList.add("is-active");
      if (current.tagName === "A") current.setAttribute("aria-current", "page");
    }
  }

  if (key === "buyers" || key === "sellers") {
    sub.classList.add("is-open");
    subToggle.setAttribute("aria-expanded", "true");
    subToggle.classList.add("is-active");
  }
})();
