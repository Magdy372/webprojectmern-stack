function initializeLanguageSelector() {
  const translations = {
    en: {
      greeting: "Hello!",
      message: "Welcome to my website.",
    },
    ar: {
      greeting: "مرحبا!",
      message: "أهلا بك في موقعي.",
    },
  };

  const languageSelector = document.querySelector("select");
  languageSelector.addEventListener("change", (event) => {
    setLanguage(event.target.value);
    console.log(event.target.value);
    localStorage.setItem("lang", event.target.value);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const language = localStorage.getItem("lang") || "en";
    setLanguage(language);
  });

  const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const translationKey = element.getAttribute("data-i18n");
      element.textContent = translations[language][translationKey];
    });
    document.dir = language === "ar" ? "rtl" : "ltr";
  };
}

module.exports = initializeLanguageSelector;