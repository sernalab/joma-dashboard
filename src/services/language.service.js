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
    };

    const langCode = langMap[lang] || lang || "en";
    i18n.global.locale = langCode;
  },

  getCurrentLanguage() {
    return i18n.global.locale;
  },
};
