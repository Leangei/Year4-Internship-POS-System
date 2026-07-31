import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enAuth from "./english/auth.json";
import kmAuth from "./khmer/auth.json";
import enSidebar from "./english/sidebar.json";
import kmSidebar from "./khmer/sidebar.json";
import enHomepage from "./english/homepage.json";
import kmHomepage from "./khmer/homepage.json";
import enProduct from "./english/product.json";
import kmProduct from "./khmer/product.json";
import enProductDetail from "./english/productDetail.json";
import kmProductDetail from "./khmer/productDetail.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        auth: enAuth,
        sidebar: enSidebar,
        homepage: enHomepage,
        product: enProduct,
        productDetail: enProductDetail,
      },
      km: {
        auth: kmAuth,
        sidebar: kmSidebar,
        homepage: kmHomepage,
        product: kmProduct,
        productDetail: kmProductDetail,
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