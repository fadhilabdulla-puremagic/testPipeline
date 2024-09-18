import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsEN from "./en/en.json";
import translationsUR from "./ur/ur.json";



const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (callback) => {
    var l = localStorage.getItem("lang");
    if(l === "ur"){
      return callback("ur");
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
const resources = {
  en: {
    translation: translationsEN,
  },
  ur: {
    translation: translationsUR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .init({
    resources,
    fallbackLng: 'en', // default language
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
