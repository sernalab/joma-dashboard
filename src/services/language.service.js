import { i18n } from "@/main";

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
      const userData = JSON.parse(currentUser);
      if (userData.language) {
        this.setLanguage(userData.language);
        return;
      }
    }

    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) {
      i18n.global.locale.value = savedLanguage;
    }
  },
};
