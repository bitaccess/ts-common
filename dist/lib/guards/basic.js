export function isObject(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
}
export function isEmptyObject(x) {
    return isObject(x) && Object.entries(x).length === 0 && x.constructor === Object;
}
export function isUndefined(x) {
    return typeof x === 'undefined';
}
export function isNull(x) {
    return x === null;
}
export function isNil(x) {
    return isUndefined(x) || isNull(x);
}
export function isString(x) {
    return typeof x === 'string';
}
export function isNumber(x) {
    return typeof x === 'number';
}
export function isArray(x) {
    return Array.isArray(x);
}
//# sourceMappingURL=basic.js.map