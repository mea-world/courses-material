import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en/translations.json";
import translationIt from "./locales/it/translations.json";

const resources = {
  it: { translation: translationIt },
  en: { translation: translationEn },
};

const initI18n = async () => {
  const savedLanguage = Localization.getLocales()[0].languageCode;

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage ?? undefined,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
