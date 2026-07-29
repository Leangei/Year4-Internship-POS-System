import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enAuth from "./english/auth.json";
import kmAuth from "./khmer/auth.json";
import enSidebar from "./english/sidebar.json";
import kmSidebar from "./khmer/sidebar.json";
import enHomepage from "./english/homepage.json";
import kmHomepage from "./khmer/homepage.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        auth: enAuth,
        sidebar: enSidebar,
        homepage: enHomepage,
      },
      km: {
        auth: kmAuth,
        sidebar: kmSidebar,
        homepage: kmHomepage,
      },
    },
    fallbackLng: "km",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;