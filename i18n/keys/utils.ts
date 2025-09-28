// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HasArgs<T = never> extends String {
  constructor(s: string) {
    super(s);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasArgs(obj: any): obj is HasArgs {
  return obj instanceof HasArgs;
}
