(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('io-ts'), require('fp-ts/lib/Record'), require('bignumber.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'io-ts', 'fp-ts/lib/Record', 'bignumber.js'], factory) :
  (global = global || self, factory(global.faastTsCommon = {}, global.t, global.Record, global.BigNumber));
}(this, (function (exports, t, Record, BigNumber) { 'use strict';

  BigNumber = BigNumber && BigNumber.hasOwnProperty('default') ? BigNumber['default'] : BigNumber;

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

  const LoggerCodec = t.type({
      error: t.Function,
      warn: t.Function,
      info: t.Function,
      log: t.Function,
      debug: t.Function,
      trace: t.Function,
  }, 'Logger');
  class LoggerType extends t.Type {
      constructor() {
          super('Logger', (u) => LoggerCodec.is(u), (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity);
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
      return new t.Type(`instanceof(${con.name})`, (u) => u instanceof con, (u, c) => (u instanceof con ? t.success(u) : t.failure(u, c)), t.identity);
  }
  function partialRecord(k, type, name) {
      return t.partial(Record.map(k.keys, () => type), name);
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
  const nullable = (codec) => t.union([codec, t.nullType]);
  const optional = (codec) => t.union([codec, t.undefined]);
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

  class BigNumberType extends t.Type {
      constructor() {
          super('BigNumberT', (u) => u instanceof BigNumber, (u, c) => {
              if (u instanceof BigNumber || (u && u._isBigNumber)) {
                  return t.success(u);
              }
              else if (t.number.is(u)) {
                  return t.success(new BigNumber(u));
              }
              else if (t.string.is(u)) {
                  const v = new BigNumber(u);
                  if (v.isNaN()) {
                      return t.failure(u, c);
                  }
                  else {
                      return t.success(v);
                  }
              }
              else {
                  return t.failure(u, c);
              }
          }, u => u.toString());
          this._tag = 'BigNumberType';
      }
  }
  const BigNumberT = new BigNumberType();

  const Numeric = t.union([t.string, t.number, BigNumberT], 'Numeric');

  class EnumType extends t.Type {
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
      const valueUnion = t.keyof(keyed);
      return new EnumType(name, (u) => valueUnion.is(u), (u, c) => {
          const validation = valueUnion.validate(u, c);
          if (validation.isRight()) {
              return validation;
          }
          else if (typeof defaultValue !== 'undefined' && typeof u === 'string') {
              return t.success(defaultValue);
          }
          else {
              return t.failure(u, c);
          }
      }, t.identity);
  }

  class FunctionType extends t.Type {
      constructor(name = 'Function') {
          super(name, (u) => typeof u === 'function', (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity);
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

  function isCodec(actual, expected) {
      return actual instanceof expected || actual._tag === expected.name;
  }
  function getContextPath(context) {
      return context
          .filter(({ type }, i) => {
          if (i === 0)
              return true;
          const previousType = context[i - 1].type;
          return !(isCodec(previousType, t.UnionType) || isCodec(previousType, t.IntersectionType));
      })
          .map(({ key, type }) => (key ? key : type.name))
          .join('.');
  }
  function getFlattenedCodecName(codec) {
      if (isCodec(codec, t.UnionType)) {
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
          if (isCodec(parent, t.UnionType)) {
              codec = parent;
          }
          else if (isCodec(parent, t.PartialType)) {
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

  exports.BigNumberT = BigNumberT;
  exports.DateT = DateT;
  exports.DateType = DateType;
  exports.DelegateLogger = DelegateLogger;
  exports.EnumType = EnumType;
  exports.Logger = Logger;
  exports.Numeric = Numeric;
  exports.SimpleReporter = SimpleReporter;
  exports.assertType = assertType;
  exports.autoImplement = autoImplement;
  exports.capitalizeFirst = capitalizeFirst;
  exports.enumCodec = enumCodec;
  exports.extendCodec = extendCodec;
  exports.functionT = functionT;
  exports.getMessage = getMessage;
  exports.instanceofCodec = instanceofCodec;
  exports.isArray = isArray;
  exports.isEmptyObject = isEmptyObject;
  exports.isMatchingError = isMatchingError;
  exports.isNil = isNil;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isType = isType;
  exports.isUndefined = isUndefined;
  exports.nullable = nullable;
  exports.optional = optional;
  exports.partialRecord = partialRecord;
  exports.requiredOptionalCodec = requiredOptionalCodec;
  exports.stringify = stringify;
  exports.toBigNumber = toBigNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
