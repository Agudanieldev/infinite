
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,es,fr,de',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }

  function setLanguage(lang) {
    document.cookie = `googtrans=/en/${lang};path=/`;
    location.reload();
  }

  function customizeGoogleTranslateLabel() {
    const interval = setInterval(() => {
      const selectEl = document.querySelector('#google_translate_element select');
      if (selectEl) {
        const firstOption = selectEl.querySelector('option');
        if (firstOption && firstOption.innerHTML.includes('Select Language')) {
          firstOption.innerHTML = 'English';
          clearInterval(interval);
        }
      }
    }, 100);
  }

  window.addEventListener('load', customizeGoogleTranslateLabel);

