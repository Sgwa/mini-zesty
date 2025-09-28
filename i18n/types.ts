import { HasArgs } from "i18n/keys/utils";
import { AppString } from "i18n/utils";

export type Languages = "en" | "es" | "es-CL" | "es-CO" | "es-MX";

export type Translations = {
  [key: string]: {
    [key in Languages]?: string;
  };
};

type ExtractKeyType<T> = T extends HasArgs<infer U> & string ? U : never;

export type ReplaceStringTypeWithAppString<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends HasArgs<any> & string
    ? AppString<ExtractKeyType<T[K]>> & string
    : T[K] extends object
      ? ReplaceStringTypeWithAppString<T[K]>
      : T[K];
};
