import * as Localization from "expo-localization";
import AppStrings from "i18n/keys";
import { hasArgs } from "i18n/keys/utils";
import translations from "i18n/translations";
import { Languages, ReplaceStringTypeWithAppString, Translations } from "i18n/types";
import { AppString } from "i18n/utils";
import { I18n } from "i18n-js";

const parseTranslation = (language: Languages, obj_from: Translations) => {
  const obj_to: { [index: string]: string | undefined } = {};
  Object.keys(obj_from).forEach(child => {
    obj_to[child] = obj_from[child][language];
  });
  return obj_to;
};

const i18n = new I18n({
  en: parseTranslation("en", translations),
  es: parseTranslation("es", translations),
});

const deviceLocale = Localization.getLocales()[0].languageTag;
i18n.locale = deviceLocale;
i18n.defaultLocale = "es";
i18n.enableFallback = true;

const translate = (obj_from: object, obj_to: object) => {
  Object.keys(obj_from).forEach(child => {
    if (
      typeof obj_from[child as keyof typeof obj_from] === "string" ||
      hasArgs(obj_from[child as keyof typeof obj_from])
    ) {
      Object.defineProperty(obj_to, child, {
        get: () => new AppString(i18n.t(obj_from[child as keyof typeof obj_from])),
      });
    } else {
      obj_to[child as keyof typeof obj_to] = {} as never;
      translate(
        obj_from[child as keyof typeof obj_from],
        obj_to[child as keyof typeof obj_to],
      );
    }
  }, obj_to);
};

const S = {} as ReplaceStringTypeWithAppString<typeof AppStrings>;
translate(AppStrings, S);

export default S;
