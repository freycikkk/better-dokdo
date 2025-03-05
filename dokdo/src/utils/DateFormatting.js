/** @format */

export class DateFormatting {
  static _format(date, style) {
    return `<t:${Math.floor(Number(date) / 1000)}` + (style ? `:${style}` : '') + '>';
  }
  static relative(date) {
    return this._format(date, 'R');
  }
}
//# sourceMappingURL=DateFormatting.js.map
