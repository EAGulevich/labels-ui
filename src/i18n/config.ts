import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";

import aboutEn from "./locales/en/about.json";
import howToPlayEn from "./locales/en/howToPlay.json";
import translationEn from "./locales/en/translation.json";
import aboutRu from "./locales/ru/about.json";
import howToPlayRu from "./locales/ru/howToPlay.json";
import translationRu from "./locales/ru/translation.json";

type Language = "ru" | "en";

const localStorageLng = (localStorage.getItem("lng") as Language) || "ru";
const i18n = i18next.use(initReactI18next).use(intervalPlural);

i18n.init({
  debug: true,
  defaultNS: "translation",
  lng: localStorageLng,
  fallbackLng: "ru",
  ns: ["translation", "about", "howToPlay"],
  resources: {
    en: { translation: translationEn, about: aboutEn, howToPlay: howToPlayEn },
    ru: { translation: translationRu, about: aboutRu, howToPlay: howToPlayRu },
  },
});

export default i18n;
