/** @format */

export const isGenerator = (target) => target && typeof target.next === 'function' && typeof target.throw === 'function';
