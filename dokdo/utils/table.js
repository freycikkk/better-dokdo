/** @format */

export function table(obj) {
  clean(obj);
  const max =
    Object.keys(obj)
      .map((e) => e.toString().length)
      .sort((a, b) => b - a)[0] + 4;
  return Object.keys(obj)
    .map((key) => `${key}${' '.repeat(max - key.length)}:: ${obj[key]}`)
    .join('\n');
}
function clean(obj) {
  for (const propName in obj) {
    if (!obj[propName]) {
      delete obj[propName];
    }
  }
}
