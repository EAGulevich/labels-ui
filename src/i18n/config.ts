import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";

import translationEn from "./locales/en/translation.json";
import translationRu from "./locales/ru/translation.json";

type Language = "ru" | "en";

const localStorageLng = (localStorage.getItem("lng") as Language) || "ru";
const i18n = i18next.use(initReactI18next).use(intervalPlural);

i18n.init({
  debug: true,
  defaultNS: "translation",
  lng: localStorageLng,
  fallbackLng: "ru",
  resources: {
    en: { translation: translationEn },
    ru: { translation: translationRu },
  },
});

export default i18n;
