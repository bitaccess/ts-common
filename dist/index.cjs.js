'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var t = require('io-ts');

class DateType extends t.Type {
    constructor() {
        super('Date', (u) => u instanceof Date, (u, c) => {
            if (this.is(u)) {
                return t.success(u);
            }
            else if (t.number.is(u) || t.string.is(u)) {
                const date = new Date(u);
                if (Number.isNaN(date.getTime())) {
                    return t.failure(u, c);
                }
                else {
                    return t.success(date);
                }
            }
            else {
                return t.failure(u, c);
            }
        }, t.identity);
        this._tag = 'DateType';
    }
}
const DateT = new DateType();

function isObject(x) {
    return typeof x === 'object' && x !== null && !Array.isArray(x);
}
function isEmptyObject(x) {
    return isObject(x) && Object.entries(x).length === 0 && x.constructor === Object;
}
function isUndefined(x) {
    return typeof x === 'undefined';
}
function isNull(x) {
    return x === null;
}
function isNil(x) {
    return isUndefined(x) || isNull(x);
}
function isString(x) {
    return typeof x === 'string';
}
function isNumber(x) {
    return typeof x === 'number';
}
function isArray(x) {
    return Array.isArray(x);
}

function isType(codec, x) {
    return codec.is(x);
}

const nullable = (codec) => t.union([codec, t.nullType], `${codec.name}Nullable`);
const optional = (codec) => t.union([codec, t.undefined], `${codec.name}Optional`);
function enumCodec(e, name) {
    const keyed = {};
    Object.values(e).forEach(v => {
        keyed[v] = null;
    });
    return t.keyof(keyed, name);
}
function requiredOptionalCodec(required, optional, name) {
    return t.intersection([t.type(required, `${name}Req`), t.partial(optional, `${name}Opt`)], name);
}
function extendCodec(parent, required, optional, name) {
    if (typeof optional === 'string') {
        name = optional;
        optional = {};
    }
    const noRequired = isEmptyObject(required);
    const noOptional = isEmptyObject(optional);
    const nameOpt = `${name}Opt`;
    const nameReq = `${name}Req`;
    if (noRequired && noOptional) {
        return parent;
    }
    if (noRequired) {
        return t.intersection([parent, t.partial(optional, nameOpt)], name);
    }
    if (noOptional) {
        return t.intersection([parent, t.type(required, nameReq)], name);
    }
    return t.intersection([parent, t.type(required, nameReq), t.partial(optional, nameOpt)], name);
}

function stringify(v) {
    if (typeof v === 'undefined') {
        return 'undefined';
    }
    if (typeof v === 'function') {
        return t.getFunctionName(v);
    }
    if (typeof v === 'number' && !isFinite(v)) {
        if (isNaN(v)) {
            return 'NaN';
        }
        return v > 0 ? 'Infinity' : '-Infinity';
    }
    return JSON.stringify(v);
}
function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function getContextPath(context) {
    return context
        .filter(({ type }, i) => {
        if (i === 0)
            return true;
        const previousType = context[i - 1].type;
        return !(previousType instanceof t.UnionType || previousType instanceof t.IntersectionType);
    })
        .map(({ key, type }) => (key ? key : type.name))
        .join('.');
}
function getMessage(e) {
    const expectedType = e.context.length > 0 ? e.context[e.context.length - 1].type.name : '';
    const contextPath = getContextPath(e.context);
    const expectedMessage = expectedType !== contextPath ? `${expectedType} for ${contextPath}` : expectedType;
    return e.message !== undefined ? e.message : `Expected type ${expectedMessage}, but got: ${stringify(e.value)}`;
}
const SimpleReporter = {
    report: validation => validation.fold(es => es.map(getMessage), () => ['No errors!']),
};
function assertType(typeCodec, value, description = 'type') {
    const validation = typeCodec.decode(value);
    if (validation.isLeft()) {
        throw new TypeError(`Invalid ${description} - ${SimpleReporter.report(validation)[0]}`);
    }
    return validation.value;
}

exports.DateType = DateType;
exports.DateT = DateT;
exports.nullable = nullable;
exports.optional = optional;
exports.enumCodec = enumCodec;
exports.requiredOptionalCodec = requiredOptionalCodec;
exports.extendCodec = extendCodec;
exports.getMessage = getMessage;
exports.SimpleReporter = SimpleReporter;
exports.assertType = assertType;
exports.stringify = stringify;
exports.capitalizeFirst = capitalizeFirst;
exports.isObject = isObject;
exports.isEmptyObject = isEmptyObject;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isNil = isNil;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isType = isType;
//# sourceMappingURL=index.cjs.js.map
