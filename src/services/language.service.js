import { i18n } from "@/i18n/i18n-instance";

export const languageService = {
  setLanguage(lang) {
    const langMap = {
      Español: "es",
      English: "en",
      Italiano: "it",
      Français: "fr",
      Polski: "pl",
      Nederlands: "nl",
      Portugués: "pt",
      Deutsch: "de",
      Magyar: "hu",

      Spanish: "es",
      French: "fr",
      Italian: "it",
      Polish: "pl",
      Dutch: "nl",
      Portuguese: "pt",
      German: "de",
      Hungarian: "hu",
    };

    const langCode = langMap[lang] || lang || "en";
    localStorage.setItem("appLanguage", langCode);

    i18n.global.locale.value = langCode;
    console.log(
      `Idioma establecido a: ${lang} (código: ${this.getCurrentLanguage()})`
    );
  },

  getCurrentLanguage() {
    return i18n.global.locale.value;
  },

  initializeLanguage() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        if (userData.language) {
          this.setLanguage(userData.language);
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) {
      i18n.global.locale.value = savedLanguage;
      console.log(`Language initialized from storage: ${savedLanguage}`);
    } else {
      // If no saved language, use the default from main.js
      console.log(`Language initialized to default: ${i18n.global.locale.value}`);
    }
  },
};
