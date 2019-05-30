import { UnionType, IntersectionType, getFunctionName, Type, success, number, string, failure, identity, union, nullType, undefined as undefined$1, keyof, intersection, type, partial, Function } from 'io-ts';

class DateType extends Type {
    constructor() {
        super('Date', (u) => u instanceof Date, (u, c) => {
            if (this.is(u)) {
                return success(u);
            }
            else if (number.is(u) || string.is(u)) {
                const date = new Date(u);
                if (Number.isNaN(date.getTime())) {
                    return failure(u, c);
                }
                else {
                    return success(date);
                }
            }
            else {
                return failure(u, c);
            }
        }, identity);
        this._tag = 'DateType';
    }
}
const DateT = new DateType();

const LoggerCodec = type({
    error: Function,
    warn: Function,
    info: Function,
    log: Function,
    debug: Function,
    trace: Function,
}, 'Logger');
class LoggerType extends Type {
    constructor() {
        super('Logger', (u) => LoggerCodec.is(u), (u, c) => (this.is(u) ? success(u) : failure(u, c)), identity);
        this._tag = 'LoggerType';
    }
}
const Logger = new LoggerType();

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

const nullable = (codec) => union([codec, nullType], `${codec.name}Nullable`);
const optional = (codec) => union([codec, undefined$1], `${codec.name}Optional`);
function enumCodec(e, name) {
    const keyed = {};
    Object.values(e).forEach(v => {
        keyed[v] = null;
    });
    return keyof(keyed, name);
}
function requiredOptionalCodec(required, optional, name) {
    return intersection([type(required, `${name}Req`), partial(optional, `${name}Opt`)], name);
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
        return intersection([parent, partial(optional, nameOpt)], name);
    }
    if (noOptional) {
        return intersection([parent, type(required, nameReq)], name);
    }
    return intersection([parent, type(required, nameReq), partial(optional, nameOpt)], name);
}

function stringify(v) {
    if (typeof v === 'undefined') {
        return 'undefined';
    }
    if (typeof v === 'function') {
        return getFunctionName(v);
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
        .filter(({ type: type$$1 }, i) => {
        if (i === 0)
            return true;
        const previousType = context[i - 1].type;
        return !(previousType instanceof UnionType || previousType instanceof IntersectionType);
    })
        .map(({ key, type: type$$1 }) => (key ? key : type$$1.name))
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

export { DateType, DateT, Logger, nullable, optional, enumCodec, requiredOptionalCodec, extendCodec, getMessage, SimpleReporter, assertType, stringify, capitalizeFirst, isObject, isEmptyObject, isUndefined, isNull, isNil, isString, isNumber, isArray, isType };
//# sourceMappingURL=index.es.js.map
