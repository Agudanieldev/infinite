/*
 * Google Translate engine for Infinite Shares.
 *
 * The visible language picker is built by /js/site.js. This file only creates
 * the hidden Google element and keeps it in sync with the shared googtrans
 * cookie. It is loaded lazily when the current language is not English.
 */
(function () {
  "use strict";

  var SCRIPT_ID = "infinite-google-translate-element";
  var CONTAINER_ID = "google_translate_element";

  function ensureContainer() {
    var container = document.getElementById(CONTAINER_ID);
    if (container) return container;

    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.setAttribute("aria-hidden", "true");
    document.body.appendChild(container);
    return container;
  }

  function applyComboLanguage(container, language) {
    if (!language || language === "en") return;

    var attempts = 0;
    var timer = window.setInterval(function () {
      var combo = container.querySelector("select.goog-te-combo");

      if (combo) {
        window.clearInterval(timer);
        if (combo.value !== language) {
          combo.value = language;
          combo.dispatchEvent(new Event("change", { bubbles: true }));
        }
        return;
      }

      attempts += 1;
      if (attempts > 20) window.clearInterval(timer);
    }, 250);
  }

  window.googleTranslateElementInit = function () {
    var container = ensureContainer();
    if (container.getAttribute("data-initialized") === "true") return;

    if (
      !window.google ||
      !window.google.translate ||
      !window.google.translate.TranslateElement
    ) {
      return;
    }

    container.setAttribute("data-initialized", "true");

    var api = window.InfiniteTranslate;
    var includedLanguages =
      api && api.languages && api.languages.length
        ? api.languages
            .map(function (language) {
              return language.code;
            })
            .join(",")
        : "en";

    try {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: includedLanguages,
          autoDisplay: false,
          layout: 1
        },
        CONTAINER_ID
      );
    } catch (error) {
      container.removeAttribute("data-initialized");
      return;
    }

    if (api && api.current) {
      applyComboLanguage(container, api.current());
    }
  };

  function loadElementScript() {
    if (document.getElementById(SCRIPT_ID)) return;

    var script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.addEventListener("error", function () {
      console.warn("Google Translate could not be loaded.");
    });
    document.head.appendChild(script);
  }

  function start() {
    ensureContainer();

    if (
      window.google &&
      window.google.translate &&
      window.google.translate.TranslateElement
    ) {
      window.googleTranslateElementInit();
      return;
    }

    loadElementScript();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
