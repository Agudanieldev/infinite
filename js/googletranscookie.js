
  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement({
  //     pageLanguage: 'en',
  //     includedLanguages: 'en,es,fr,de',
  //     layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  //   }, 'google_translate_element');
  // }

  // function setLanguage(lang) {
  //   document.cookie = `googtrans=/en/${lang};path=/`;
  //   location.reload();
  // }

  // function customizeGoogleTranslateLabel() {
  //   const interval = setInterval(() => {
  //     const selectEl = document.querySelector('#google_translate_element select');
  //     if (selectEl) {
  //       const firstOption = selectEl.querySelector('option');
  //       if (firstOption && firstOption.innerHTML.includes('Select Language')) {
  //         firstOption.innerHTML = 'English';
  //         clearInterval(interval);
  //       }
  //     }
  //   }, 100);
  // }

  // window.addEventListener('load', customizeGoogleTranslateLabel);


    // Initialize Google Translate
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,es,fr,de',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }

  // Set language cookie
  function setLanguage(lang) {
    document.cookie = `googtrans=/en/${lang};path=/`;
  }

  // Auto-translate to French on page load (change 'fr' to your target language code)
  window.addEventListener('load', function () {
    setLanguage('en'); // Change to 'es', 'de', etc. as needed
  });

