import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enAuth from "./english/auth.json";
import kmAuth from "./khmer/auth.json";
import enSidebar from "./english/sidebar.json";
import kmSidebar from "./khmer/sidebar.json";
import enHomepage from "./english/homepage.json";
import kmHomepage from "./khmer/homepage.json";
import enSuperHomepage from "./english/SuperHomepage.json";
import kmSuperHomepage from "./khmer/SuperHomepage.json";
import enSuperApproval from "./english/SuperApproval.json";
import kmSuperApproval from "./khmer/SuperApproval.json";
import enCustomer from "./english/customer.json";
import kmCustomer from "./khmer/customer.json";
import enProduct from "./english/product.json";
import kmProduct from "./khmer/product.json";

type ProductTranslationResource = {
  list?: Record<string, string>;
  detail?: Record<string, string>;
  create?: Record<string, string>;
  edit?: Record<string, string>;
  variant?: Record<string, string>;
};

const flattenProductTranslations = (resource: ProductTranslationResource) => ({
  ...resource.list,
  ...resource.detail,
  ...resource.create,
  ...resource.edit,
  ...resource.variant,
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        auth: enAuth,
        sidebar: enSidebar,
        homepage: enHomepage,
        superHomepage: enSuperHomepage,
        superApproval: enSuperApproval,
        customer: enCustomer,
        product: enProduct,
        productDetail: flattenProductTranslations(enProduct),
      },
      km: {
        auth: kmAuth,
        sidebar: kmSidebar,
        homepage: kmHomepage,
        superHomepage: kmSuperHomepage,
        superApproval: kmSuperApproval,
        customer: kmCustomer,
        product: kmProduct,
        productDetail: flattenProductTranslations(kmProduct),
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