export class AppString<T extends string = never> extends String {
  constructor(a: string) {
    super(a);
  }
  format(args: Record<T, string>): string {
    if (!args) return this.toString();
    const data = Object.entries(args).filter(a => a[1] !== undefined);
    let newStr = this.toString();
    data.forEach(d => {
      newStr = newStr.replace(`{${d[0]}}`, `${d[1]}`);
    });
    return newStr;
  }
}
