import { Type, success, number, string, failure, identity, type, Function, partial, union, nullType, undefined as undefined$1, intersection, keyof, getFunctionName, IntersectionType, UnionType, PartialType } from 'io-ts';
import { map } from 'fp-ts/lib/Record';
import BigNumber from 'bignumber.js';

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

function instanceofCodec(con) {
    return new Type(`instanceof(${con.name})`, (u) => u instanceof con, (u, c) => (u instanceof con ? success(u) : failure(u, c)), identity);
}
function partialRecord(k, type, name) {
    return partial(map(k.keys, () => type), name);
}
function autoImplement() {
    return class {
        constructor(values) {
            if (values) {
                Object.assign(this, typeof values === 'object' ? values : values());
            }
        }
    };
}
const nullable = (codec) => union([codec, nullType]);
const optional = (codec) => union([codec, undefined$1]);
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

class BigNumberType extends Type {
    constructor() {
        super('BigNumberT', BigNumber.isBigNumber, (u, c) => {
            if (u instanceof BigNumber) {
                return success(u);
            }
            else if (BigNumber.isBigNumber(u)) {
                return success(new BigNumber(u));
            }
            else if (number.is(u)) {
                return success(new BigNumber(u));
            }
            else if (string.is(u)) {
                const v = new BigNumber(u);
                if (v.isNaN()) {
                    return failure(u, c);
                }
                else {
                    return success(v);
                }
            }
            else {
                return failure(u, c);
            }
        }, u => u.toString());
        this._tag = 'BigNumberType';
    }
}
const BigNumberT = new BigNumberType();

const Numeric = union([string, number, BigNumberT], 'Numeric');

class EnumType extends Type {
    constructor(name, is, validate, encode) {
        super(name, is, validate, encode);
        this._tag = 'EnumType';
    }
}
function enumCodec(e, name, defaultValue) {
    const keyed = {};
    Object.values(e).forEach(v => {
        keyed[v] = null;
    });
    const valueUnion = keyof(keyed);
    return new EnumType(name, (u) => valueUnion.is(u), (u, c) => {
        const validation = valueUnion.validate(u, c);
        if (validation.isRight()) {
            return validation;
        }
        else if (typeof defaultValue !== 'undefined' && typeof u === 'string') {
            return success(defaultValue);
        }
        else {
            return failure(u, c);
        }
    }, identity);
}

class FunctionType extends Type {
    constructor(name = 'Function') {
        super(name, (u) => typeof u === 'function', (u, c) => (this.is(u) ? success(u) : failure(u, c)), identity);
        this._tag = 'FunctionType';
    }
}
function functionT(name) {
    return new FunctionType(name);
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

function isCodec(actual, expected) {
    return actual instanceof expected || actual._tag === expected.name;
}
function getContextPath(context) {
    return context
        .filter(({ type }, i) => {
        if (i === 0)
            return true;
        const previousType = context[i - 1].type;
        return !(isCodec(previousType, UnionType) || isCodec(previousType, IntersectionType));
    })
        .map(({ key, type }) => (key ? key : type.name))
        .join('.');
}
function getFlattenedCodecName(codec) {
    if (isCodec(codec, UnionType)) {
        return codec.types.map(t => getFlattenedCodecName(t)).join(' | ');
    }
    return codec.name;
}
function getContextTypeName(context) {
    if (context.length <= 0) {
        return '';
    }
    let codec = context[context.length - 1].type;
    for (let i = context.length - 1; i > 0; i--) {
        const parent = context[i - 1].type;
        if (isCodec(parent, UnionType)) {
            codec = parent;
        }
        else if (isCodec(parent, PartialType)) {
            return `${getFlattenedCodecName(codec)} | undefined`;
        }
    }
    return `${getFlattenedCodecName(codec)}`;
}
function getMessage(e) {
    const expectedType = getContextTypeName(e.context);
    const contextPath = getContextPath(e.context);
    const expectedMessage = expectedType !== contextPath ? `${expectedType} for ${contextPath}` : expectedType;
    return e.message !== undefined ? e.message : `Expected type ${expectedMessage}, but got: ${stringify(e.value)}`;
}
const SimpleReporter = {
    report: validation => validation.fold(es => es.map(getMessage), () => ['No errors!']),
};
function assertType(typeCodec, value, description = 'type', ErrorType = TypeError) {
    const validation = typeCodec.decode(value);
    if (validation.isLeft()) {
        throw new ErrorType(`Invalid ${description} - ${SimpleReporter.report(validation)[0]}`);
    }
    return validation.value;
}

function isMatchingError(e, partialMessages) {
    const messageLower = e.toString().toLowerCase();
    return partialMessages.some(pm => messageLower.includes(pm.toLowerCase()));
}
function toBigNumber(value) {
    if (isNil(value)) {
        return value;
    }
    if (value instanceof BigNumber) {
        return value;
    }
    return new BigNumber(value);
}

class DelegateLogger {
    constructor(logger, prefix) {
        this.prefix = prefix;
        this.error = this.delegate('error');
        this.warn = this.delegate('warn');
        this.info = this.delegate('info');
        this.log = this.delegate('log');
        this.debug = this.delegate('debug');
        this.trace = this.delegate('trace');
        this.logger = typeof logger === 'undefined' ? console : logger;
        if (prefix) {
            this.prefix = `[${prefix}]`;
        }
    }
    delegate(method) {
        return (...args) => {
            if (this.logger !== null) {
                if (this.prefix) {
                    this.logger[method](this.prefix, ...args);
                }
                else {
                    this.logger[method](...args);
                }
            }
        };
    }
}

export { BigNumberT, DateT, DateType, DelegateLogger, EnumType, Logger, Numeric, SimpleReporter, assertType, autoImplement, capitalizeFirst, enumCodec, extendCodec, functionT, getMessage, instanceofCodec, isArray, isEmptyObject, isMatchingError, isNil, isNull, isNumber, isObject, isString, isType, isUndefined, nullable, optional, partialRecord, requiredOptionalCodec, stringify, toBigNumber };
//# sourceMappingURL=index.es.js.map
