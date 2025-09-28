import { HasArgs } from "i18n/keys/utils";

// Dynamic recursive type to replace HasArgs types with HasArgs & string intersection types.
export type IntersectWithArgsTypeWithStringPrimitive<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends HasArgs<any>
    ? T[K] & string
    : T[K] extends object
      ? IntersectWithArgsTypeWithStringPrimitive<T[K]>
      : T[K];
};
