// i18n instance singleton
import { createI18n } from "vue-i18n";
import { messages } from "./index";

// i18n Configuration
const browserLang = navigator.language.split("-")[0];
const supportedLanguages = [
  "en",
  "es",
  "it",
  "fr",
  "pl",
  "nl",
  "pt",
  "de",
  "hu",
];
const defaultLocale = supportedLanguages.includes(browserLang)
  ? browserLang
  : "en";

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
});