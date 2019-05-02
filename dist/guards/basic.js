"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
}
exports.isObject = isObject;
function isEmptyObject(x) {
    return isObject(x) && Object.entries(x).length === 0 && x.constructor === Object;
}
exports.isEmptyObject = isEmptyObject;
function isUndefined(x) {
    return typeof x === 'undefined';
}
exports.isUndefined = isUndefined;
function isNull(x) {
    return x === null;
}
exports.isNull = isNull;
function isNil(x) {
    return isUndefined(x) || isNull(x);
}
exports.isNil = isNil;
function isString(x) {
    return typeof x === 'string';
}
exports.isString = isString;
function isNumber(x) {
    return typeof x === 'number';
}
exports.isNumber = isNumber;
function isArray(x) {
    return Array.isArray(x);
}
exports.isArray = isArray;
//# sourceMappingURL=basic.js.map