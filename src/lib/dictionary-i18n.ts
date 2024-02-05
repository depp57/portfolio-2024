import enDic from "../dictionaries/en.json";

export type EnDic = typeof enDic;

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

type Dictionary = {
  [key in Locale]: Function;
};

const dictionary: Dictionary = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<EnDic> {
  return dictionary[locale]();
}
