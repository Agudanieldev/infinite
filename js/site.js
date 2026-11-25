/* Shared header component: one consistent navigation on every page. */
(function () {
  "use strict";

  var mount = document.getElementById("site-header");
  if (!mount) return;

  var phone = "+1 (848) 633-9708";
  var email = "infiniteshares18@gmail.com";

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
