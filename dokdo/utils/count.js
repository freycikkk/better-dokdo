/** @format */

import { Collection } from 'discord.js';
import { typeFind } from './type';
export function count(argument) {
  if (argument instanceof Map || argument instanceof Set || argument instanceof Collection) {
    argument = Array.from(argument.values());
  }
  if (Array.isArray(argument)) {
    const typed = argument.map((el) => (el?.constructor ? el.constructor.name : typeFind(el)));
    const obj = {};
    for (const t of typed) {
      if (!obj[t]) obj[t] = 0;
      obj[t]++;
    }
    const items = Object.keys(obj).map((el) => {
      return { name: el, count: obj[el] };
    });
    const total = items.reduce((previous, current) => previous + current.count, 0);
    return items
      .map((el) => {
        return {
          name: el.name,
          count: el.count,
          ratio: ((el.count / total) * 100).toFixed(1)
        };
      })
      .sort((a, b) => Number(b.ratio) - Number(a.ratio));
  }
  return null;
}
