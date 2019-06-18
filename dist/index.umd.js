(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('io-ts')) :
  typeof define === 'function' && define.amd ? define(['exports', 'io-ts'], factory) :
  (factory((global.faastTsCommon = {}),global.t));
}(this, (function (exports,t) { 'use strict';

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _function = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @since 1.0.0
   */
  exports.identity = function (a) {
      return a;
  };
  /**
   * @since 1.0.0
   */
  exports.unsafeCoerce = exports.identity;
  /**
   * @since 1.0.0
   */
  exports.not = function (predicate) {
      return function (a) { return !predicate(a); };
  };
  function or(p1, p2) {
      return function (a) { return p1(a) || p2(a); };
  }
  exports.or = or;
  /**
   * @since 1.0.0
   */
  exports.and = function (p1, p2) {
      return function (a) { return p1(a) && p2(a); };
  };
  /**
   * @since 1.0.0
   */
  exports.constant = function (a) {
      return function () { return a; };
  };
  /**
   * A thunk that returns always `true`
   *
   * @since 1.0.0
   */
  exports.constTrue = function () {
      return true;
  };
  /**
   * A thunk that returns always `false`
   *
   * @since 1.0.0
   */
  exports.constFalse = function () {
      return false;
  };
  /**
   * A thunk that returns always `null`
   *
   * @since 1.0.0
   */
  exports.constNull = function () {
      return null;
  };
  /**
   * A thunk that returns always `undefined`
   *
   * @since 1.0.0
   */
  exports.constUndefined = function () {
      return;
  };
  /**
   * A thunk that returns always `void`
   *
   * @since 1.14.0
   */
  exports.constVoid = function () {
      return;
  };
  /**
   * Flips the order of the arguments to a function of two arguments.
   *
   * @since 1.0.0
   */
  exports.flip = function (f) {
      return function (b) { return function (a) { return f(a)(b); }; };
  };
  /**
   * The `on` function is used to change the domain of a binary operator.
   *
   * @since 1.0.0
   */
  exports.on = function (op) { return function (f) {
      return function (x, y) { return op(f(x), f(y)); };
  }; };
  function compose() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i] = arguments[_i];
      }
      var len = fns.length - 1;
      return function (x) {
          var y = x;
          for (var i = len; i > -1; i--) {
              y = fns[i].call(this, y);
          }
          return y;
      };
  }
  exports.compose = compose;
  function pipe() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i] = arguments[_i];
      }
      var len = fns.length - 1;
      return function (x) {
          var y = x;
          for (var i = 0; i <= len; i++) {
              y = fns[i].call(this, y);
          }
          return y;
      };
  }
  exports.pipe = pipe;
  /**
   * @since 1.0.0
   */
  exports.concat = function (x, y) {
      var lenx = x.length;
      var leny = y.length;
      var r = Array(lenx + leny);
      for (var i = 0; i < lenx; i++) {
          r[i] = x[i];
      }
      for (var i = 0; i < leny; i++) {
          r[i + lenx] = y[i];
      }
      return r;
  };
  /**
   * @since 1.0.0
   */
  function curried(f, n, acc) {
      return function (x) {
          var combined = exports.concat(acc, [x]);
          return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined);
      };
  }
  exports.curried = curried;
  function curry(f) {
      return curried(f, f.length - 1, []);
  }
  exports.curry = curry;
  /* tslint:disable-next-line */
  var getFunctionName = function (f) { return f.displayName || f.name || "<function" + f.length + ">"; };
  /**
   * @since 1.0.0
   */
  exports.toString = function (x) {
      if (typeof x === 'string') {
          return JSON.stringify(x);
      }
      if (x instanceof Date) {
          return "new Date('" + x.toISOString() + "')";
      }
      if (Array.isArray(x)) {
          return "[" + x.map(exports.toString).join(', ') + "]";
      }
      if (typeof x === 'function') {
          return getFunctionName(x);
      }
      if (x == null) {
          return String(x);
      }
      if (typeof x.toString === 'function' && x.toString !== Object.prototype.toString) {
          return x.toString();
      }
      try {
          return JSON.stringify(x, null, 2);
      }
      catch (e) {
          return String(x);
      }
  };
  /**
   * @since 1.0.0
   */
  exports.tuple = function () {
      var t$$1 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          t$$1[_i] = arguments[_i];
      }
      return t$$1;
  };
  /**
   * @since 1.0.0
   * @deprecated
   */
  exports.tupleCurried = function (a) { return function (b) {
      return [a, b];
  }; };
  /**
   * Applies a function to an argument ($)
   *
   * @since 1.0.0
   */
  exports.apply = function (f) { return function (a) {
      return f(a);
  }; };
  /**
   * Applies an argument to a function (#)
   *
   * @since 1.0.0
   */
  exports.applyFlipped = function (a) { return function (f) {
      return f(a);
  }; };
  /**
   * For use with phantom fields
   *
   * @since 1.0.0
   */
  exports.phantom = undefined;
  /**
   * A thunk that returns always the `identity` function.
   * For use with `applySecond` methods.
   *
   * @since 1.5.0
   */
  exports.constIdentity = function () {
      return exports.identity;
  };
  /**
   * @since 1.9.0
   */
  exports.increment = function (n) {
      return n + 1;
  };
  /**
   * @since 1.9.0
   */
  exports.decrement = function (n) {
      return n - 1;
  };
  });

  unwrapExports(_function);
  var _function_1 = _function.identity;
  var _function_2 = _function.unsafeCoerce;
  var _function_3 = _function.not;
  var _function_4 = _function.or;
  var _function_5 = _function.and;
  var _function_6 = _function.constant;
  var _function_7 = _function.constTrue;
  var _function_8 = _function.constFalse;
  var _function_9 = _function.constNull;
  var _function_10 = _function.constUndefined;
  var _function_11 = _function.constVoid;
  var _function_12 = _function.flip;
  var _function_13 = _function.on;
  var _function_14 = _function.compose;
  var _function_15 = _function.pipe;
  var _function_16 = _function.concat;
  var _function_17 = _function.curried;
  var _function_18 = _function.curry;
  var _function_19 = _function.tuple;
  var _function_20 = _function.tupleCurried;
  var _function_21 = _function.apply;
  var _function_22 = _function.applyFlipped;
  var _function_23 = _function.phantom;
  var _function_24 = _function.constIdentity;
  var _function_25 = _function.increment;
  var _function_26 = _function.decrement;

  var Ordering = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @since 1.0.0
   */
  exports.sign = function (n) {
      return n <= -1 ? -1 : n >= 1 ? 1 : 0;
  };
  /**
   * @since 1.0.0
   */
  exports.setoidOrdering = {
      equals: function (x, y) { return x === y; }
  };
  /**
   * @since 1.0.0
   */
  exports.semigroupOrdering = {
      concat: function (x, y) { return (x !== 0 ? x : y); }
  };
  /**
   * @since 1.0.0
   */
  exports.invert = function (O) {
      switch (O) {
          case -1:
              return 1;
          case 1:
              return -1;
          default:
              return 0;
      }
  };
  });

  unwrapExports(Ordering);
  var Ordering_1 = Ordering.sign;
  var Ordering_2 = Ordering.setoidOrdering;
  var Ordering_3 = Ordering.semigroupOrdering;
  var Ordering_4 = Ordering.invert;

  var Setoid = createCommonjsModule(function (module, exports) {
  /**
   * @file The `Setoid` type class represents types which support decidable equality.
   *
   * Instances must satisfy the following laws:
   *
   * 1. Reflexivity: `S.equals(a, a) === true`
   * 2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
   * 3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`
   *
   * See [Getting started with fp-ts: Setoid](https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3)
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @since 1.14.0
   */
  exports.fromEquals = function (equals) {
      return {
          equals: function (x, y) { return x === y || equals(x, y); }
      };
  };
  /**
   * @since 1.0.0
   */
  exports.strictEqual = function (a, b) {
      return a === b;
  };
  var setoidStrict = { equals: exports.strictEqual };
  /**
   * @since 1.0.0
   */
  exports.setoidString = setoidStrict;
  /**
   * @since 1.0.0
   */
  exports.setoidNumber = setoidStrict;
  /**
   * @since 1.0.0
   */
  exports.setoidBoolean = setoidStrict;
  /**
   * @since 1.0.0
   */
  exports.getArraySetoid = function (S) {
      return exports.fromEquals(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return S.equals(x, ys[i]); }); });
  };
  /**
   * @since 1.14.2
   */
  exports.getStructSetoid = function (setoids) {
      return exports.fromEquals(function (x, y) {
          for (var k in setoids) {
              if (!setoids[k].equals(x[k], y[k])) {
                  return false;
              }
          }
          return true;
      });
  };
  /**
   * Use `getStructSetoid` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getRecordSetoid = function (setoids) {
      return exports.getStructSetoid(setoids);
  };
  /**
   * Given a tuple of `Setoid`s returns a `Setoid` for the tuple
   *
   * @example
   * import { getTupleSetoid, setoidString, setoidNumber, setoidBoolean } from 'fp-ts/lib/Setoid'
   *
   * const S = getTupleSetoid(setoidString, setoidNumber, setoidBoolean)
   * assert.strictEqual(S.equals(['a', 1, true], ['a', 1, true]), true)
   * assert.strictEqual(S.equals(['a', 1, true], ['b', 1, true]), false)
   * assert.strictEqual(S.equals(['a', 1, true], ['a', 2, true]), false)
   * assert.strictEqual(S.equals(['a', 1, true], ['a', 1, false]), false)
   *
   * @since 1.14.2
   */
  exports.getTupleSetoid = function () {
      var setoids = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          setoids[_i] = arguments[_i];
      }
      return exports.fromEquals(function (x, y) { return setoids.every(function (S, i) { return S.equals(x[i], y[i]); }); });
  };
  /**
   * Use `getTupleSetoid` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getProductSetoid = function (SA, SB) {
      return exports.getTupleSetoid(SA, SB);
  };
  /**
   * Returns the `Setoid` corresponding to the partitions of `B` induced by `f`
   *
   * @since 1.2.0
   */
  exports.contramap = function (f, fa) {
      return exports.fromEquals(function (x, y) { return fa.equals(f(x), f(y)); });
  };
  /**
   * @since 1.4.0
   */
  exports.setoidDate = exports.contramap(function (date) { return date.valueOf(); }, exports.setoidNumber);
  });

  unwrapExports(Setoid);
  var Setoid_1 = Setoid.fromEquals;
  var Setoid_2 = Setoid.strictEqual;
  var Setoid_3 = Setoid.setoidString;
  var Setoid_4 = Setoid.setoidNumber;
  var Setoid_5 = Setoid.setoidBoolean;
  var Setoid_6 = Setoid.getArraySetoid;
  var Setoid_7 = Setoid.getStructSetoid;
  var Setoid_8 = Setoid.getRecordSetoid;
  var Setoid_9 = Setoid.getTupleSetoid;
  var Setoid_10 = Setoid.getProductSetoid;
  var Setoid_11 = Setoid.contramap;
  var Setoid_12 = Setoid.setoidDate;

  var Ord = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t$$1) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t$$1[p] = s[p];
          }
          return t$$1;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @file The `Ord` type class represents types which support comparisons with a _total order_.
   *
   * Instances should satisfy the laws of total orderings:
   *
   * 1. Reflexivity: `S.compare(a, a) <= 0`
   * 2. Antisymmetry: if `S.compare(a, b) <= 0` and `S.compare(b, a) <= 0` then `a <-> b`
   * 3. Transitivity: if `S.compare(a, b) <= 0` and `S.compare(b, c) <= 0` then `S.compare(a, c) <= 0`
   *
   * See [Getting started with fp-ts: Ord](https://dev.to/gcanti/getting-started-with-fp-ts-ord-5f1e)
   */



  /**
   * @since 1.0.0
   */
  exports.unsafeCompare = function (x, y) {
      return x < y ? -1 : x > y ? 1 : 0;
  };
  /**
   * @since 1.0.0
   */
  exports.ordString = __assign({}, Setoid.setoidString, { compare: exports.unsafeCompare });
  /**
   * @since 1.0.0
   */
  exports.ordNumber = __assign({}, Setoid.setoidNumber, { compare: exports.unsafeCompare });
  /**
   * @since 1.0.0
   */
  exports.ordBoolean = __assign({}, Setoid.setoidBoolean, { compare: exports.unsafeCompare });
  /**
   * Test whether one value is _strictly less than_ another
   *
   * @since 1.0.0
   */
  exports.lessThan = function (O) { return function (x, y) {
      return O.compare(x, y) === -1;
  }; };
  /**
   * Test whether one value is _strictly greater than_ another
   *
   * @since 1.0.0
   */
  exports.greaterThan = function (O) { return function (x, y) {
      return O.compare(x, y) === 1;
  }; };
  /**
   * Test whether one value is _non-strictly less than_ another
   *
   * @since 1.0.0
   */
  exports.lessThanOrEq = function (O) { return function (x, y) {
      return O.compare(x, y) !== 1;
  }; };
  /**
   * Test whether one value is _non-strictly greater than_ another
   *
   * @since 1.0.0
   */
  exports.greaterThanOrEq = function (O) { return function (x, y) {
      return O.compare(x, y) !== -1;
  }; };
  /**
   * Take the minimum of two values. If they are considered equal, the first argument is chosen
   *
   * @since 1.0.0
   */
  exports.min = function (O) { return function (x, y) {
      return O.compare(x, y) === 1 ? y : x;
  }; };
  /**
   * Take the maximum of two values. If they are considered equal, the first argument is chosen
   *
   * @since 1.0.0
   */
  exports.max = function (O) { return function (x, y) {
      return O.compare(x, y) === -1 ? y : x;
  }; };
  /**
   * Clamp a value between a minimum and a maximum
   *
   * @since 1.0.0
   */
  exports.clamp = function (O) {
      var minO = exports.min(O);
      var maxO = exports.max(O);
      return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
  };
  /**
   * Test whether a value is between a minimum and a maximum (inclusive)
   *
   * @since 1.0.0
   */
  exports.between = function (O) {
      var lessThanO = exports.lessThan(O);
      var greaterThanO = exports.greaterThan(O);
      return function (low, hi) { return function (x) { return (lessThanO(x, low) || greaterThanO(x, hi) ? false : true); }; };
  };
  /**
   * @since 1.0.0
   */
  exports.fromCompare = function (compare) {
      var optimizedCompare = function (x, y) { return (x === y ? 0 : compare(x, y)); };
      return {
          equals: function (x, y) { return optimizedCompare(x, y) === 0; },
          compare: optimizedCompare
      };
  };
  /**
   * @since 1.0.0
   */
  exports.contramap = function (f, fa) {
      return exports.fromCompare(_function.on(fa.compare)(f));
  };
  /**
   * @since 1.0.0
   */
  exports.getSemigroup = function () {
      return {
          concat: function (x, y) { return exports.fromCompare(function (a, b) { return Ordering.semigroupOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
      };
  };
  /**
   * Given a tuple of `Ord`s returns an `Ord` for the tuple
   *
   * @example
   * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/lib/Ord'
   *
   * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
   * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
   * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
   * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
   *
   * @since 1.14.3
   */
  exports.getTupleOrd = function () {
      var ords = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          ords[_i] = arguments[_i];
      }
      var len = ords.length;
      return exports.fromCompare(function (x, y) {
          var i = 0;
          for (; i < len - 1; i++) {
              var r = ords[i].compare(x[i], y[i]);
              if (r !== 0) {
                  return r;
              }
          }
          return ords[i].compare(x[i], y[i]);
      });
  };
  /**
   * Use `getTupleOrd` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getProductOrd = function (OA, OB) {
      return exports.getTupleOrd(OA, OB);
  };
  /**
   * @since 1.3.0
   */
  exports.getDualOrd = function (O) {
      return exports.fromCompare(function (x, y) { return O.compare(y, x); });
  };
  /**
   * @since 1.4.0
   */
  exports.ordDate = exports.contramap(function (date) { return date.valueOf(); }, exports.ordNumber);
  });

  unwrapExports(Ord);
  var Ord_1 = Ord.unsafeCompare;
  var Ord_2 = Ord.ordString;
  var Ord_3 = Ord.ordNumber;
  var Ord_4 = Ord.ordBoolean;
  var Ord_5 = Ord.lessThan;
  var Ord_6 = Ord.greaterThan;
  var Ord_7 = Ord.lessThanOrEq;
  var Ord_8 = Ord.greaterThanOrEq;
  var Ord_9 = Ord.min;
  var Ord_10 = Ord.max;
  var Ord_11 = Ord.clamp;
  var Ord_12 = Ord.between;
  var Ord_13 = Ord.fromCompare;
  var Ord_14 = Ord.contramap;
  var Ord_15 = Ord.getSemigroup;
  var Ord_16 = Ord.getTupleOrd;
  var Ord_17 = Ord.getProductOrd;
  var Ord_18 = Ord.getDualOrd;
  var Ord_19 = Ord.ordDate;

  var Semigroup = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t$$1) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t$$1[p] = s[p];
          }
          return t$$1;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @file See [Getting started with fp-ts: Semigroup](https://dev.to/gcanti/getting-started-with-fp-ts-semigroup-2mf7)
   */


  /**
   * @since 1.0.0
   */
  exports.fold = function (S) { return function (a) { return function (as) {
      return as.reduce(S.concat, a);
  }; }; };
  /**
   * @since 1.0.0
   */
  exports.getFirstSemigroup = function () {
      return { concat: _function.identity };
  };
  /**
   * @since 1.0.0
   */
  exports.getLastSemigroup = function () {
      return { concat: function (_, y) { return y; } };
  };
  /**
   * Given a tuple of semigroups returns a semigroup for the tuple
   *
   * @example
   * import { getTupleSemigroup, semigroupString, semigroupSum, semigroupAll } from 'fp-ts/lib/Semigroup'
   *
   * const S1 = getTupleSemigroup(semigroupString, semigroupSum)
   * assert.deepStrictEqual(S1.concat(['a', 1], ['b', 2]), ['ab', 3])
   *
   * const S2 = getTupleSemigroup(semigroupString, semigroupSum, semigroupAll)
   * assert.deepStrictEqual(S2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
   *
   * @since 1.14.0
   */
  exports.getTupleSemigroup = function () {
      var semigroups = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          semigroups[_i] = arguments[_i];
      }
      return {
          concat: function (x, y) { return semigroups.map(function (s, i) { return s.concat(x[i], y[i]); }); }
      };
  };
  /**
   * Use `getTupleSemigroup` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getProductSemigroup = function (SA, SB) {
      return exports.getTupleSemigroup(SA, SB);
  };
  /**
   * @since 1.0.0
   */
  exports.getDualSemigroup = function (S) {
      return {
          concat: function (x, y) { return S.concat(y, x); }
      };
  };
  /**
   * @since 1.0.0
   */
  exports.getFunctionSemigroup = function (S) { return function () {
      return {
          concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
      };
  }; };
  /**
   * @since 1.14.0
   */
  exports.getStructSemigroup = function (semigroups) {
      return {
          concat: function (x, y) {
              var r = {};
              for (var _i = 0, _a = Object.keys(semigroups); _i < _a.length; _i++) {
                  var key = _a[_i];
                  r[key] = semigroups[key].concat(x[key], y[key]);
              }
              return r;
          }
      };
  };
  /**
   * Use `getStructSemigroup` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getRecordSemigroup = function (semigroups) {
      return exports.getStructSemigroup(semigroups);
  };
  /**
   * @since 1.0.0
   */
  exports.getMeetSemigroup = function (O) {
      return {
          concat: Ord.min(O)
      };
  };
  /**
   * @since 1.0.0
   */
  exports.getJoinSemigroup = function (O) {
      return {
          concat: Ord.max(O)
      };
  };
  /**
   * Boolean semigroup under conjunction
   * @since 1.0.0
   */
  exports.semigroupAll = {
      concat: function (x, y) { return x && y; }
  };
  /**
   * Boolean semigroup under disjunction
   * @since 1.0.0
   */
  exports.semigroupAny = {
      concat: function (x, y) { return x || y; }
  };
  /**
   * Use `Monoid`'s `getArrayMonoid` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getArraySemigroup = function () {
      return { concat: _function.concat };
  };
  function getDictionarySemigroup(S) {
      return {
          concat: function (x, y) {
              var r = __assign({}, x);
              var keys = Object.keys(y);
              var len = keys.length;
              for (var i = 0; i < len; i++) {
                  var k = keys[i];
                  r[k] = x.hasOwnProperty(k) ? S.concat(x[k], y[k]) : y[k];
              }
              return r;
          }
      };
  }
  exports.getDictionarySemigroup = getDictionarySemigroup;
  // tslint:disable-next-line: deprecation
  var semigroupAnyDictionary = getDictionarySemigroup(exports.getLastSemigroup());
  /**
   * Returns a `Semigroup` instance for objects preserving their type
   *
   * @example
   * import { getObjectSemigroup } from 'fp-ts/lib/Semigroup'
   *
   * interface Person {
   *   name: string
   *   age: number
   * }
   *
   * const S = getObjectSemigroup<Person>()
   * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
   *
   * @since 1.4.0
   */
  exports.getObjectSemigroup = function () {
      return semigroupAnyDictionary;
  };
  /**
   * Number `Semigroup` under addition
   * @since 1.0.0
   */
  exports.semigroupSum = {
      concat: function (x, y) { return x + y; }
  };
  /**
   * Number `Semigroup` under multiplication
   * @since 1.0.0
   */
  exports.semigroupProduct = {
      concat: function (x, y) { return x * y; }
  };
  /**
   * @since 1.0.0
   */
  exports.semigroupString = {
      concat: function (x, y) { return x + y; }
  };
  /**
   * @since 1.0.0
   */
  exports.semigroupVoid = {
      concat: function () { return undefined; }
  };
  });

  unwrapExports(Semigroup);
  var Semigroup_1 = Semigroup.fold;
  var Semigroup_2 = Semigroup.getFirstSemigroup;
  var Semigroup_3 = Semigroup.getLastSemigroup;
  var Semigroup_4 = Semigroup.getTupleSemigroup;
  var Semigroup_5 = Semigroup.getProductSemigroup;
  var Semigroup_6 = Semigroup.getDualSemigroup;
  var Semigroup_7 = Semigroup.getFunctionSemigroup;
  var Semigroup_8 = Semigroup.getStructSemigroup;
  var Semigroup_9 = Semigroup.getRecordSemigroup;
  var Semigroup_10 = Semigroup.getMeetSemigroup;
  var Semigroup_11 = Semigroup.getJoinSemigroup;
  var Semigroup_12 = Semigroup.semigroupAll;
  var Semigroup_13 = Semigroup.semigroupAny;
  var Semigroup_14 = Semigroup.getArraySemigroup;
  var Semigroup_15 = Semigroup.getDictionarySemigroup;
  var Semigroup_16 = Semigroup.getObjectSemigroup;
  var Semigroup_17 = Semigroup.semigroupSum;
  var Semigroup_18 = Semigroup.semigroupProduct;
  var Semigroup_19 = Semigroup.semigroupString;
  var Semigroup_20 = Semigroup.semigroupVoid;

  var Monoid = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t$$1) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t$$1[p] = s[p];
          }
          return t$$1;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });


  /**
   * @since 1.0.0
   */
  exports.fold = function (M) {
      return Semigroup.fold(M)(M.empty);
  };
  /**
   * Given a tuple of monoids returns a monoid for the tuple
   *
   * @example
   * import { getTupleMonoid, monoidString, monoidSum, monoidAll } from 'fp-ts/lib/Monoid'
   *
   * const M1 = getTupleMonoid(monoidString, monoidSum)
   * assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])
   *
   * const M2 = getTupleMonoid(monoidString, monoidSum, monoidAll)
   * assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
   *
   * @since 1.0.0
   */
  exports.getTupleMonoid = function () {
      var monoids = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          monoids[_i] = arguments[_i];
      }
      return __assign({}, Semigroup.getTupleSemigroup.apply(void 0, monoids), { empty: monoids.map(function (m) { return m.empty; }) });
  };
  /**
   * Use `getTupleMonoid` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getProductMonoid = function (MA, MB) {
      return exports.getTupleMonoid(MA, MB);
  };
  /**
   * @since 1.0.0
   */
  exports.getDualMonoid = function (M) {
      return __assign({}, Semigroup.getDualSemigroup(M), { empty: M.empty });
  };
  /**
   * Boolean monoid under conjunction
   * @since 1.0.0
   */
  exports.monoidAll = __assign({}, Semigroup.semigroupAll, { empty: true });
  /**
   * Boolean monoid under disjunction
   * @since 1.0.0
   */
  exports.monoidAny = __assign({}, Semigroup.semigroupAny, { empty: false });
  var emptyArray = [];
  /**
   * @since 1.0.0
   */
  exports.unsafeMonoidArray = {
      concat: _function.concat,
      empty: emptyArray
  };
  /**
   * `Monoid` under array concatenation
   *
   * @since 1.0.0
   */
  exports.getArrayMonoid = function () {
      return exports.unsafeMonoidArray;
  };
  var emptyObject = {};
  function getDictionaryMonoid(S) {
      return __assign({}, Semigroup.getDictionarySemigroup(S), { empty: emptyObject });
  }
  exports.getDictionaryMonoid = getDictionaryMonoid;
  /**
   * Number monoid under addition
   * @since 1.0.0
   */
  exports.monoidSum = __assign({}, Semigroup.semigroupSum, { empty: 0 });
  /**
   * Number monoid under multiplication
   * @since 1.0.0
   */
  exports.monoidProduct = __assign({}, Semigroup.semigroupProduct, { empty: 1 });
  /**
   * @since 1.0.0
   */
  exports.monoidString = __assign({}, Semigroup.semigroupString, { empty: '' });
  /**
   * @since 1.0.0
   */
  exports.monoidVoid = __assign({}, Semigroup.semigroupVoid, { empty: undefined });
  /**
   * @since 1.0.0
   */
  exports.getFunctionMonoid = function (M) { return function () {
      return __assign({}, Semigroup.getFunctionSemigroup(M)(), { empty: function () { return M.empty; } });
  }; };
  /**
   * @since 1.0.0
   */
  exports.getEndomorphismMonoid = function () {
      return {
          concat: _function.compose,
          empty: _function.identity
      };
  };
  /**
   * @since 1.14.0
   */
  exports.getStructMonoid = function (monoids) {
      var empty = {};
      for (var _i = 0, _a = Object.keys(monoids); _i < _a.length; _i++) {
          var key = _a[_i];
          empty[key] = monoids[key].empty;
      }
      return __assign({}, Semigroup.getStructSemigroup(monoids), { empty: empty });
  };
  /**
   * Use `getStructMonoid` instead
   * @since 1.0.0
   * @deprecated
   */
  exports.getRecordMonoid = function (monoids) {
      return exports.getStructMonoid(monoids);
  };
  /**
   * @since 1.9.0
   */
  exports.getMeetMonoid = function (B) {
      return __assign({}, Semigroup.getMeetSemigroup(B), { empty: B.top });
  };
  /**
   * @since 1.9.0
   */
  exports.getJoinMonoid = function (B) {
      return __assign({}, Semigroup.getJoinSemigroup(B), { empty: B.bottom });
  };
  });

  unwrapExports(Monoid);
  var Monoid_1 = Monoid.fold;
  var Monoid_2 = Monoid.getTupleMonoid;
  var Monoid_3 = Monoid.getProductMonoid;
  var Monoid_4 = Monoid.getDualMonoid;
  var Monoid_5 = Monoid.monoidAll;
  var Monoid_6 = Monoid.monoidAny;
  var Monoid_7 = Monoid.unsafeMonoidArray;
  var Monoid_8 = Monoid.getArrayMonoid;
  var Monoid_9 = Monoid.getDictionaryMonoid;
  var Monoid_10 = Monoid.monoidSum;
  var Monoid_11 = Monoid.monoidProduct;
  var Monoid_12 = Monoid.monoidString;
  var Monoid_13 = Monoid.monoidVoid;
  var Monoid_14 = Monoid.getFunctionMonoid;
  var Monoid_15 = Monoid.getEndomorphismMonoid;
  var Monoid_16 = Monoid.getStructMonoid;
  var Monoid_17 = Monoid.getRecordMonoid;
  var Monoid_18 = Monoid.getMeetMonoid;
  var Monoid_19 = Monoid.getJoinMonoid;

  var Option = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t$$1) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t$$1[p] = s[p];
          }
          return t$$1;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });




  exports.URI = 'Option';
  var None = /** @class */ (function () {
      function None() {
          this._tag = 'None';
      }
      /**
       * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
       * maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.
       *
       * @example
       * import { some } from 'fp-ts/lib/Option'
       *
       * assert.deepStrictEqual(some(1).map(n => n * 2), some(2))
       */
      None.prototype.map = function (f) {
          return exports.none;
      };
      /**
       * Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`
       *
       * @example
       * import { none, some } from 'fp-ts/lib/Option'
       *
       * interface Foo {
       *   bar?: {
       *     baz?: string
       *   }
       * }
       *
       * assert.deepStrictEqual(
       *   some<Foo>({ bar: { baz: 'quux' } })
       *     .mapNullable(foo => foo.bar)
       *     .mapNullable(bar => bar.baz),
       *   some('quux')
       * )
       * assert.deepStrictEqual(
       *   some<Foo>({ bar: {} })
       *     .mapNullable(foo => foo.bar)
       *     .mapNullable(bar => bar.baz),
       *   none
       * )
       * assert.deepStrictEqual(
       *   some<Foo>({})
       *     .mapNullable(foo => foo.bar)
       *     .mapNullable(bar => bar.baz),
       *   none
       * )
       */
      None.prototype.mapNullable = function (f) {
          return exports.none;
      };
      /**
       * `ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
       * function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.
       *
       * @example
       * import { some, none } from 'fp-ts/lib/Option'
       *
       * assert.deepStrictEqual(some(2).ap(some((x: number) => x + 1)), some(3))
       * assert.deepStrictEqual(none.ap(some((x: number) => x + 1)), none)
       */
      None.prototype.ap = function (fab) {
          return exports.none;
      };
      /**
       * Flipped version of `ap`
       *
       * @example
       * import { some, none } from 'fp-ts/lib/Option'
       *
       * assert.deepStrictEqual(some((x: number) => x + 1).ap_(some(2)), some(3))
       * assert.deepStrictEqual(none.ap_(some(2)), none)
       */
      None.prototype.ap_ = function (fb) {
          return fb.ap(this);
      };
      /**
       * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
       * `Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
       * `None`)
       */
      None.prototype.chain = function (f) {
          return exports.none;
      };
      None.prototype.reduce = function (b, f) {
          return b;
      };
      /**
       * `alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
       * it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.
       *
       * @example
       * import { Option, some, none } from 'fp-ts/lib/Option'
       *
       * assert.deepStrictEqual(some(2).alt(some(4)), some(2))
       * const fa: Option<number> = none
       * assert.deepStrictEqual(fa.alt(some(4)), some(4))
       */
      None.prototype.alt = function (fa) {
          return fa;
      };
      /**
       * Lazy version of `alt`
       *
       * @example
       * import { some } from 'fp-ts/lib/Option'
       *
       * assert.deepStrictEqual(some(1).orElse(() => some(2)), some(1))
       *
       * @since 1.6.0
       */
      None.prototype.orElse = function (fa) {
          return fa();
      };
      None.prototype.extend = function (f) {
          return exports.none;
      };
      /**
       * Applies a function to each case in the data structure
       *
       * @example
       * import { none, some } from 'fp-ts/lib/Option'
       *
       * assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
       * assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
       */
      None.prototype.fold = function (b, onSome) {
          return b;
      };
      /** Lazy version of `fold` */
      None.prototype.foldL = function (onNone, onSome) {
          return onNone();
      };
      /**
       * Returns the value from this `Some` or the given argument if this is a `None`
       *
       * @example
       * import { Option, none, some } from 'fp-ts/lib/Option'
       *
       * assert.strictEqual(some(1).getOrElse(0), 1)
       * const fa: Option<number> = none
       * assert.strictEqual(fa.getOrElse(0), 0)
       */
      None.prototype.getOrElse = function (a) {
          return a;
      };
      /** Lazy version of `getOrElse` */
      None.prototype.getOrElseL = function (f) {
          return f();
      };
      /** Returns the value from this `Some` or `null` if this is a `None` */
      None.prototype.toNullable = function () {
          return null;
      };
      /** Returns the value from this `Some` or `undefined` if this is a `None` */
      None.prototype.toUndefined = function () {
          return undefined;
      };
      None.prototype.inspect = function () {
          return this.toString();
      };
      None.prototype.toString = function () {
          return 'none';
      };
      /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
      None.prototype.contains = function (S, a) {
          return false;
      };
      /** Returns `true` if the option is `None`, `false` otherwise */
      None.prototype.isNone = function () {
          return true;
      };
      /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
      None.prototype.isSome = function () {
          return false;
      };
      /**
       * Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value
       */
      None.prototype.exists = function (p) {
          return false;
      };
      None.prototype.filter = function (p) {
          return exports.none;
      };
      /**
       * Use `filter` instead.
       * Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
       * this Option's value. Otherwise returns `None`
       * @since 1.3.0
       * @deprecated
       */
      None.prototype.refine = function (refinement) {
          return exports.none;
      };
      None.value = new None();
      return None;
  }());
  exports.None = None;
  /**
   * @since 1.0.0
   */
  exports.none = None.value;
  var Some = /** @class */ (function () {
      function Some(value) {
          this.value = value;
          this._tag = 'Some';
      }
      Some.prototype.map = function (f) {
          return new Some(f(this.value));
      };
      Some.prototype.mapNullable = function (f) {
          return exports.fromNullable(f(this.value));
      };
      Some.prototype.ap = function (fab) {
          return fab.isNone() ? exports.none : new Some(fab.value(this.value));
      };
      Some.prototype.ap_ = function (fb) {
          return fb.ap(this);
      };
      Some.prototype.chain = function (f) {
          return f(this.value);
      };
      Some.prototype.reduce = function (b, f) {
          return f(b, this.value);
      };
      Some.prototype.alt = function (fa) {
          return this;
      };
      Some.prototype.orElse = function (fa) {
          return this;
      };
      Some.prototype.extend = function (f) {
          return new Some(f(this));
      };
      Some.prototype.fold = function (b, onSome) {
          return onSome(this.value);
      };
      Some.prototype.foldL = function (onNone, onSome) {
          return onSome(this.value);
      };
      Some.prototype.getOrElse = function (a) {
          return this.value;
      };
      Some.prototype.getOrElseL = function (f) {
          return this.value;
      };
      Some.prototype.toNullable = function () {
          return this.value;
      };
      Some.prototype.toUndefined = function () {
          return this.value;
      };
      Some.prototype.inspect = function () {
          return this.toString();
      };
      Some.prototype.toString = function () {
          return "some(" + _function.toString(this.value) + ")";
      };
      Some.prototype.contains = function (S, a) {
          return S.equals(this.value, a);
      };
      Some.prototype.isNone = function () {
          return false;
      };
      Some.prototype.isSome = function () {
          return true;
      };
      Some.prototype.exists = function (p) {
          return p(this.value);
      };
      Some.prototype.filter = function (p) {
          return this.exists(p) ? this : exports.none;
      };
      Some.prototype.refine = function (refinement) {
          return this.filter(refinement);
      };
      return Some;
  }());
  exports.Some = Some;
  /**
   * @since 1.17.0
   */
  exports.getShow = function (S) {
      return {
          show: function (oa) { return oa.fold('none', function (a) { return "some(" + S.show(a) + ")"; }); }
      };
  };
  /**
   * @example
   * import { none, some, getSetoid } from 'fp-ts/lib/Option'
   * import { setoidNumber } from 'fp-ts/lib/Setoid'
   *
   * const S = getSetoid(setoidNumber)
   * assert.strictEqual(S.equals(none, none), true)
   * assert.strictEqual(S.equals(none, some(1)), false)
   * assert.strictEqual(S.equals(some(1), none), false)
   * assert.strictEqual(S.equals(some(1), some(2)), false)
   * assert.strictEqual(S.equals(some(1), some(1)), true)
   *
   * @since 1.0.0
   */
  exports.getSetoid = function (S) {
      return Setoid.fromEquals(function (x, y) { return (x.isNone() ? y.isNone() : y.isNone() ? false : S.equals(x.value, y.value)); });
  };
  /**
   * The `Ord` instance allows `Option` values to be compared with
   * `compare`, whenever there is an `Ord` instance for
   * the type the `Option` contains.
   *
   * `None` is considered to be less than any `Some` value.
   *
   *
   * @example
   * import { none, some, getOrd } from 'fp-ts/lib/Option'
   * import { ordNumber } from 'fp-ts/lib/Ord'
   *
   * const O = getOrd(ordNumber)
   * assert.strictEqual(O.compare(none, none), 0)
   * assert.strictEqual(O.compare(none, some(1)), -1)
   * assert.strictEqual(O.compare(some(1), none), 1)
   * assert.strictEqual(O.compare(some(1), some(2)), -1)
   * assert.strictEqual(O.compare(some(1), some(1)), 0)
   *
   * @since 1.2.0
   */
  exports.getOrd = function (O) {
      return Ord.fromCompare(function (x, y) { return (x.isSome() ? (y.isSome() ? O.compare(x.value, y.value) : 1) : -1); });
  };
  var map = function (fa, f) {
      return fa.map(f);
  };
  /**
   * @since 1.0.0
   */
  exports.some = function (a) {
      return new Some(a);
  };
  var of = exports.some;
  var ap = function (fab, fa) {
      return fa.ap(fab);
  };
  var chain = function (fa, f) {
      return fa.chain(f);
  };
  var reduce = function (fa, b, f) {
      return fa.reduce(b, f);
  };
  var foldMap = function (M) { return function (fa, f) {
      return fa.isNone() ? M.empty : f(fa.value);
  }; };
  var foldr = function (fa, b, f) {
      return fa.isNone() ? b : f(fa.value, b);
  };
  var traverse = function (F) { return function (ta, f) {
      return ta.isNone() ? F.of(exports.none) : F.map(f(ta.value), exports.some);
  }; };
  var sequence = function (F) { return function (ta) {
      return ta.isNone() ? F.of(exports.none) : F.map(ta.value, exports.some);
  }; };
  var alt = function (fx, fy) {
      return fx.alt(fy);
  };
  var extend = function (ea, f) {
      return ea.extend(f);
  };
  var zero = function () {
      return exports.none;
  };
  /**
   * `Apply` semigroup
   *
   * | x       | y       | concat(x, y)       |
   * | ------- | ------- | ------------------ |
   * | none    | none    | none               |
   * | some(a) | none    | none               |
   * | none    | some(a) | none               |
   * | some(a) | some(b) | some(concat(a, b)) |
   *
   * @example
   * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
   * import { semigroupSum } from 'fp-ts/lib/Semigroup'
   *
   * const S = getApplySemigroup(semigroupSum)
   * assert.deepStrictEqual(S.concat(none, none), none)
   * assert.deepStrictEqual(S.concat(some(1), none), none)
   * assert.deepStrictEqual(S.concat(none, some(1)), none)
   * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
   *
   * @since 1.7.0
   */
  exports.getApplySemigroup = function (S) {
      return {
          concat: function (x, y) { return (x.isSome() && y.isSome() ? exports.some(S.concat(x.value, y.value)) : exports.none); }
      };
  };
  /**
   * @since 1.7.0
   */
  exports.getApplyMonoid = function (M) {
      return __assign({}, exports.getApplySemigroup(M), { empty: exports.some(M.empty) });
  };
  /**
   * Monoid returning the left-most non-`None` value
   *
   * | x       | y       | concat(x, y) |
   * | ------- | ------- | ------------ |
   * | none    | none    | none         |
   * | some(a) | none    | some(a)      |
   * | none    | some(a) | some(a)      |
   * | some(a) | some(b) | some(a)      |
   *
   * @example
   * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
   *
   * const M = getFirstMonoid<number>()
   * assert.deepStrictEqual(M.concat(none, none), none)
   * assert.deepStrictEqual(M.concat(some(1), none), some(1))
   * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
   * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
   *
   * @since 1.0.0
   */
  exports.getFirstMonoid = function () {
      return {
          concat: alt,
          empty: exports.none
      };
  };
  /**
   * Monoid returning the right-most non-`None` value
   *
   * | x       | y       | concat(x, y) |
   * | ------- | ------- | ------------ |
   * | none    | none    | none         |
   * | some(a) | none    | some(a)      |
   * | none    | some(a) | some(a)      |
   * | some(a) | some(b) | some(b)      |
   *
   * @example
   * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
   *
   * const M = getLastMonoid<number>()
   * assert.deepStrictEqual(M.concat(none, none), none)
   * assert.deepStrictEqual(M.concat(some(1), none), some(1))
   * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
   * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
   *
   * @since 1.0.0
   */
  exports.getLastMonoid = function () {
      return Monoid.getDualMonoid(exports.getFirstMonoid());
  };
  /**
   * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
   * appended using the provided `Semigroup`
   *
   * | x       | y       | concat(x, y)       |
   * | ------- | ------- | ------------------ |
   * | none    | none    | none               |
   * | some(a) | none    | some(a)            |
   * | none    | some(a) | some(a)            |
   * | some(a) | some(b) | some(concat(a, b)) |
   *
   * @example
   * import { getMonoid, some, none } from 'fp-ts/lib/Option'
   * import { semigroupSum } from 'fp-ts/lib/Semigroup'
   *
   * const M = getMonoid(semigroupSum)
   * assert.deepStrictEqual(M.concat(none, none), none)
   * assert.deepStrictEqual(M.concat(some(1), none), some(1))
   * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
   * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
   *
   * @since 1.0.0
   */
  exports.getMonoid = function (S) {
      return {
          concat: function (x, y) { return (x.isNone() ? y : y.isNone() ? x : exports.some(S.concat(x.value, y.value))); },
          empty: exports.none
      };
  };
  /**
   * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
   * returns the value wrapped in a `Some`
   *
   * @example
   * import { none, some, fromNullable } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(fromNullable(undefined), none)
   * assert.deepStrictEqual(fromNullable(null), none)
   * assert.deepStrictEqual(fromNullable(1), some(1))
   *
   * @since 1.0.0
   */
  exports.fromNullable = function (a) {
      return a == null ? exports.none : new Some(a);
  };
  function fromPredicate(predicate) {
      return function (a) { return (predicate(a) ? exports.some(a) : exports.none); };
  }
  exports.fromPredicate = fromPredicate;
  /**
   * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
   * `Some`
   *
   * @example
   * import { none, some, tryCatch } from 'fp-ts/lib/Option'
   *
   * assert.deepStrictEqual(
   *   tryCatch(() => {
   *     throw new Error()
   *   }),
   *   none
   * )
   * assert.deepStrictEqual(tryCatch(() => 1), some(1))
   *
   * @since 1.0.0
   */
  exports.tryCatch = function (f) {
      try {
          return exports.some(f());
      }
      catch (e) {
          return exports.none;
      }
  };
  /**
   * Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
   * value wrapped in a `Some`
   *
   * @example
   * import { none, some, fromEither } from 'fp-ts/lib/Option'
   * import { left, right } from 'fp-ts/lib/Either'
   *
   * assert.deepStrictEqual(fromEither(left(1)), none)
   * assert.deepStrictEqual(fromEither(right(1)), some(1))
   *
   * @since 1.0.0
   */
  exports.fromEither = function (fa) {
      return fa.isLeft() ? exports.none : exports.some(fa.value);
  };
  /**
   * Returns `true` if the option is an instance of `Some`, `false` otherwise
   *
   * @since 1.0.0
   */
  exports.isSome = function (fa) {
      return fa.isSome();
  };
  /**
   * Returns `true` if the option is `None`, `false` otherwise
   *
   * @since 1.0.0
   */
  exports.isNone = function (fa) {
      return fa.isNone();
  };
  /**
   * Use `fromPredicate` instead.
   * Refinement version of `fromPredicate`
   *
   * @since 1.3.0
   * @deprecated
   */
  exports.fromRefinement = function (refinement) { return function (a) {
      return refinement(a) ? exports.some(a) : exports.none;
  }; };
  /**
   * Returns a refinement from a prism.
   * This function ensures that a custom type guard definition is type-safe.
   *
   * ```ts
   * import { some, none, getRefinement } from 'fp-ts/lib/Option'
   *
   * type A = { type: 'A' }
   * type B = { type: 'B' }
   * type C = A | B
   *
   * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
   * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
   * ```
   *
   * @since 1.7.0
   */
  exports.getRefinement = function (getOption) {
      return function (a) { return getOption(a).isSome(); };
  };
  var compact = function (fa) { return fa.chain(_function.identity); };
  var separate = function (fa) {
      if (fa.isNone()) {
          return {
              left: exports.none,
              right: exports.none
          };
      }
      var e = fa.value;
      if (e.isLeft()) {
          return {
              left: exports.some(e.value),
              right: exports.none
          };
      }
      return {
          left: exports.none,
          right: exports.some(e.value)
      };
  };
  var filter = function (fa, p) { return fa.filter(p); };
  var filterMap = chain;
  var partitionMap = function (fa, f) {
      return separate(fa.map(f));
  };
  var partition = function (fa, p) { return ({
      left: fa.filter(_function.not(p)),
      right: fa.filter(p)
  }); };
  var wither = function (F) { return function (fa, f) {
      return fa.isNone() ? F.of(fa) : f(fa.value);
  }; };
  var wilt = function (F) { return function (fa, f) {
      if (fa.isNone()) {
          return F.of({
              left: exports.none,
              right: exports.none
          });
      }
      return F.map(f(fa.value), function (e) {
          if (e.isLeft()) {
              return {
                  left: exports.some(e.value),
                  right: exports.none
              };
          }
          return {
              left: exports.none,
              right: exports.some(e.value)
          };
      });
  }; };
  /**
   * @since 1.0.0
   */
  exports.option = {
      URI: exports.URI,
      map: map,
      of: of,
      ap: ap,
      chain: chain,
      reduce: reduce,
      foldMap: foldMap,
      foldr: foldr,
      traverse: traverse,
      sequence: sequence,
      zero: zero,
      alt: alt,
      extend: extend,
      compact: compact,
      separate: separate,
      filter: filter,
      filterMap: filterMap,
      partition: partition,
      partitionMap: partitionMap,
      wither: wither,
      wilt: wilt
  };
  });

  unwrapExports(Option);
  var Option_1 = Option.URI;
  var Option_2 = Option.None;
  var Option_3 = Option.none;
  var Option_4 = Option.Some;
  var Option_5 = Option.getShow;
  var Option_6 = Option.getSetoid;
  var Option_7 = Option.getOrd;
  var Option_8 = Option.some;
  var Option_9 = Option.getApplySemigroup;
  var Option_10 = Option.getApplyMonoid;
  var Option_11 = Option.getFirstMonoid;
  var Option_12 = Option.getLastMonoid;
  var Option_13 = Option.getMonoid;
  var Option_14 = Option.fromNullable;
  var Option_15 = Option.fromPredicate;
  var Option_16 = Option.tryCatch;
  var Option_17 = Option.fromEither;
  var Option_18 = Option.isSome;
  var Option_19 = Option.isNone;
  var Option_20 = Option.fromRefinement;
  var Option_21 = Option.getRefinement;
  var Option_22 = Option.option;

  var Show = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @since 1.17.0
   */
  exports.showString = {
      show: function (a) { return JSON.stringify(a); }
  };
  /**
   * @since 1.17.0
   */
  exports.showNumber = {
      show: function (a) { return JSON.stringify(a); }
  };
  /**
   * @since 1.17.0
   */
  exports.showBoolean = {
      show: function (a) { return JSON.stringify(a); }
  };
  /**
   * @since 1.17.0
   */
  exports.getStructShow = function (shows) {
      return {
          show: function (s) {
              return "{ " + Object.keys(shows)
                  .map(function (k) { return k + ": " + shows[k].show(s[k]); })
                  .join(', ') + " }";
          }
      };
  };
  /**
   * @since 1.17.0
   */
  exports.getTupleShow = function () {
      var shows = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          shows[_i] = arguments[_i];
      }
      return {
          show: function (t$$1) { return "[" + t$$1.map(function (a, i) { return shows[i].show(a); }).join(', ') + "]"; }
      };
  };
  });

  unwrapExports(Show);
  var Show_1 = Show.showString;
  var Show_2 = Show.showNumber;
  var Show_3 = Show.showBoolean;
  var Show_4 = Show.getStructShow;
  var Show_5 = Show.getTupleShow;

  var Record = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });




  /**
   * @since 1.17.0
   */
  exports.getShow = function (S) {
      return {
          show: function (r) {
              var elements = collect(r, function (k, a) { return Show.showString.show(k) + ": " + S.show(a); }).join(', ');
              return elements === '' ? '{}' : "{ " + elements + " }";
          }
      };
  };
  /**
   * Calculate the number of key/value pairs in a record
   *
   * @since 1.10.0
   */
  exports.size = function (d) {
      return Object.keys(d).length;
  };
  /**
   * Test whether a record is empty
   *
   * @since 1.10.0
   */
  exports.isEmpty = function (d) {
      return Object.keys(d).length === 0;
  };
  function collect(d, f) {
      var out = [];
      var keys = Object.keys(d).sort();
      for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          out.push(f(key, d[key]));
      }
      return out;
  }
  exports.collect = collect;
  function toArray(d) {
      return collect(d, function (k, a) { return [k, a]; });
  }
  exports.toArray = toArray;
  function toUnfoldable(unfoldable) {
      return function (d) {
          var arr = toArray(d);
          var len = arr.length;
          return unfoldable.unfoldr(0, function (b) { return (b < len ? Option.some([arr[b], b + 1]) : Option.none); });
      };
  }
  exports.toUnfoldable = toUnfoldable;
  function insert(k, a, d) {
      if (d[k] === a) {
          return d;
      }
      var r = Object.assign({}, d);
      r[k] = a;
      return r;
  }
  exports.insert = insert;
  function remove(k, d) {
      if (!d.hasOwnProperty(k)) {
          return d;
      }
      var r = Object.assign({}, d);
      delete r[k];
      return r;
  }
  exports.remove = remove;
  /**
   * Delete a key and value from a map, returning the value as well as the subsequent map
   *
   * @since 1.10.0
   */
  exports.pop = function (k, d) {
      var a = exports.lookup(k, d);
      return a.isNone() ? Option.none : Option.some([a.value, remove(k, d)]);
  };
  /**
   * Test whether one record contains all of the keys and values contained in another record
   *
   * @since 1.14.0
   */
  exports.isSubrecord = function (S) { return function (d1, d2) {
      for (var k in d1) {
          if (!d2.hasOwnProperty(k) || !S.equals(d1[k], d2[k])) {
              return false;
          }
      }
      return true;
  }; };
  /**
   * Use `isSubrecord` instead
   * @since 1.10.0
   * @deprecated
   */
  exports.isSubdictionary = exports.isSubrecord;
  function getSetoid(S) {
      var isSubrecordS = exports.isSubrecord(S);
      return Setoid.fromEquals(function (x, y) { return isSubrecordS(x, y) && isSubrecordS(y, x); });
  }
  exports.getSetoid = getSetoid;
  function getMonoid(S) {
      // tslint:disable-next-line: deprecation
      return Monoid.getDictionaryMonoid(S);
  }
  exports.getMonoid = getMonoid;
  /**
   * Lookup the value for a key in a record
   * @since 1.10.0
   */
  exports.lookup = function (key, fa) {
      return fa.hasOwnProperty(key) ? Option.some(fa[key]) : Option.none;
  };
  function filter(fa, p) {
      return filterWithKey(fa, function (_, a) { return p(a); });
  }
  exports.filter = filter;
  /**
   * @since 1.10.0
   */
  exports.empty = {};
  function mapWithKey(fa, f) {
      var r = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
          var key = keys_2[_i];
          r[key] = f(key, fa[key]);
      }
      return r;
  }
  exports.mapWithKey = mapWithKey;
  function map(fa, f) {
      return mapWithKey(fa, function (_, a) { return f(a); });
  }
  exports.map = map;
  /**
   * @since 1.10.0
   */
  exports.reduce = function (fa, b, f) {
      return reduceWithKey(fa, b, function (_, b, a) { return f(b, a); });
  };
  /**
   * @since 1.10.0
   */
  exports.foldMap = function (M) {
      var foldMapWithKeyM = exports.foldMapWithKey(M);
      return function (fa, f) { return foldMapWithKeyM(fa, function (_, a) { return f(a); }); };
  };
  /**
   * @since 1.10.0
   */
  exports.foldr = function (fa, b, f) {
      return foldrWithKey(fa, b, function (_, a, b) { return f(a, b); });
  };
  function reduceWithKey(fa, b, f) {
      var out = b;
      var keys = Object.keys(fa).sort();
      var len = keys.length;
      for (var i = 0; i < len; i++) {
          var k = keys[i];
          out = f(k, out, fa[k]);
      }
      return out;
  }
  exports.reduceWithKey = reduceWithKey;
  /**
   * @since 1.12.0
   */
  exports.foldMapWithKey = function (M) { return function (fa, f) {
      var out = M.empty;
      var keys = Object.keys(fa).sort();
      var len = keys.length;
      for (var i = 0; i < len; i++) {
          var k = keys[i];
          out = M.concat(out, f(k, fa[k]));
      }
      return out;
  }; };
  function foldrWithKey(fa, b, f) {
      var out = b;
      var keys = Object.keys(fa).sort();
      var len = keys.length;
      for (var i = len - 1; i >= 0; i--) {
          var k = keys[i];
          out = f(k, fa[k], out);
      }
      return out;
  }
  exports.foldrWithKey = foldrWithKey;
  /**
   * Create a record with one key/value pair
   *
   * @since 1.10.0
   */
  exports.singleton = function (k, a) {
      var _a;
      return _a = {}, _a[k] = a, _a;
  };
  function traverseWithKey(F) {
      return function (ta, f) {
          var keys = Object.keys(ta);
          if (keys.length === 0) {
              return F.of(exports.empty);
          }
          var fr = F.of({});
          var _loop_1 = function (key) {
              fr = F.ap(F.map(fr, function (r) { return function (b) {
                  r[key] = b;
                  return r;
              }; }), f(key, ta[key]));
          };
          for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
              var key = keys_3[_i];
              _loop_1(key);
          }
          return fr;
      };
  }
  exports.traverseWithKey = traverseWithKey;
  function traverse(F) {
      var traverseWithKeyF = traverseWithKey(F);
      return function (ta, f) { return traverseWithKeyF(ta, function (_, a) { return f(a); }); };
  }
  exports.traverse = traverse;
  function sequence(F) {
      var traverseWithKeyF = traverseWithKey(F);
      return function (ta) { return traverseWithKeyF(ta, function (_, a) { return a; }); };
  }
  exports.sequence = sequence;
  /**
   * @since 1.10.0
   */
  exports.compact = function (fa) {
      var r = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
          var key = keys_4[_i];
          var optionA = fa[key];
          if (optionA.isSome()) {
              r[key] = optionA.value;
          }
      }
      return r;
  };
  /**
   * @since 1.10.0
   */
  exports.partitionMap = function (fa, f) {
      return partitionMapWithKey(fa, function (_, a) { return f(a); });
  };
  /**
   * @since 1.10.0
   */
  exports.partition = function (fa, p) {
      return partitionWithKey(fa, function (_, a) { return p(a); });
  };
  /**
   * @since 1.10.0
   */
  exports.separate = function (fa) {
      var left = {};
      var right = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
          var key = keys_5[_i];
          var e = fa[key];
          if (e.isLeft()) {
              left[key] = e.value;
          }
          else {
              right[key] = e.value;
          }
      }
      return {
          left: left,
          right: right
      };
  };
  function wither(F) {
      var traverseF = traverse(F);
      return function (wa, f) { return F.map(traverseF(wa, f), exports.compact); };
  }
  exports.wither = wither;
  function wilt(F) {
      var traverseF = traverse(F);
      return function (wa, f) { return F.map(traverseF(wa, f), exports.separate); };
  }
  exports.wilt = wilt;
  /**
   * @since 1.10.0
   */
  exports.filterMap = function (fa, f) {
      return filterMapWithKey(fa, function (_, a) { return f(a); });
  };
  function partitionMapWithKey(fa, f) {
      var left = {};
      var right = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
          var key = keys_6[_i];
          var e = f(key, fa[key]);
          if (e.isLeft()) {
              left[key] = e.value;
          }
          else {
              right[key] = e.value;
          }
      }
      return {
          left: left,
          right: right
      };
  }
  exports.partitionMapWithKey = partitionMapWithKey;
  function partitionWithKey(fa, p) {
      var left = {};
      var right = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
          var key = keys_7[_i];
          var a = fa[key];
          if (p(key, a)) {
              right[key] = a;
          }
          else {
              left[key] = a;
          }
      }
      return {
          left: left,
          right: right
      };
  }
  exports.partitionWithKey = partitionWithKey;
  function filterMapWithKey(fa, f) {
      var r = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_8 = keys; _i < keys_8.length; _i++) {
          var key = keys_8[_i];
          var optionB = f(key, fa[key]);
          if (optionB.isSome()) {
              r[key] = optionB.value;
          }
      }
      return r;
  }
  exports.filterMapWithKey = filterMapWithKey;
  function filterWithKey(fa, p) {
      var r = {};
      var changed = false;
      for (var key in fa) {
          if (fa.hasOwnProperty(key)) {
              var a = fa[key];
              if (p(key, a)) {
                  r[key] = a;
              }
              else {
                  changed = true;
              }
          }
      }
      return changed ? r : fa;
  }
  exports.filterWithKey = filterWithKey;
  function fromFoldable(
  // tslint:disable-next-line: deprecation
  F) {
      return function (ta, f) {
          return F.reduce(ta, {}, function (b, _a) {
              var k = _a[0], a = _a[1];
              b[k] = b.hasOwnProperty(k) ? f(b[k], a) : a;
              return b;
          });
      };
  }
  exports.fromFoldable = fromFoldable;
  function fromFoldableMap(M, 
  // tslint:disable-next-line: deprecation
  F) {
      return function (ta, f) {
          return F.reduce(ta, {}, function (r, a) {
              var _a = f(a), k = _a[0], b = _a[1];
              r[k] = r.hasOwnProperty(k) ? M.concat(r[k], b) : b;
              return r;
          });
      };
  }
  exports.fromFoldableMap = fromFoldableMap;
  /**
   * @since 1.14.0
   */
  function every(fa, predicate) {
      for (var k in fa) {
          if (!predicate(fa[k])) {
              return false;
          }
      }
      return true;
  }
  exports.every = every;
  /**
   * @since 1.14.0
   */
  function some(fa, predicate) {
      for (var k in fa) {
          if (predicate(fa[k])) {
              return true;
          }
      }
      return false;
  }
  exports.some = some;
  /**
   * @since 1.14.0
   */
  function elem(S) {
      return function (a, fa) { return some(fa, function (x) { return S.equals(x, a); }); };
  }
  exports.elem = elem;
  function partitionMapWithIndex(fa, f) {
      return partitionMapWithKey(fa, f);
  }
  exports.partitionMapWithIndex = partitionMapWithIndex;
  function partitionWithIndex(fa, p) {
      return partitionWithKey(fa, p);
  }
  exports.partitionWithIndex = partitionWithIndex;
  function filterMapWithIndex(fa, f) {
      return filterMapWithKey(fa, f);
  }
  exports.filterMapWithIndex = filterMapWithIndex;
  function filterWithIndex(fa, p) {
      return filterWithKey(fa, p);
  }
  exports.filterWithIndex = filterWithIndex;
  });

  unwrapExports(Record);
  var Record_1 = Record.getShow;
  var Record_2 = Record.size;
  var Record_3 = Record.isEmpty;
  var Record_4 = Record.collect;
  var Record_5 = Record.toArray;
  var Record_6 = Record.toUnfoldable;
  var Record_7 = Record.insert;
  var Record_8 = Record.remove;
  var Record_9 = Record.pop;
  var Record_10 = Record.isSubrecord;
  var Record_11 = Record.isSubdictionary;
  var Record_12 = Record.getSetoid;
  var Record_13 = Record.getMonoid;
  var Record_14 = Record.lookup;
  var Record_15 = Record.filter;
  var Record_16 = Record.empty;
  var Record_17 = Record.mapWithKey;
  var Record_18 = Record.map;
  var Record_19 = Record.reduce;
  var Record_20 = Record.foldMap;
  var Record_21 = Record.foldr;
  var Record_22 = Record.reduceWithKey;
  var Record_23 = Record.foldMapWithKey;
  var Record_24 = Record.foldrWithKey;
  var Record_25 = Record.singleton;
  var Record_26 = Record.traverseWithKey;
  var Record_27 = Record.traverse;
  var Record_28 = Record.sequence;
  var Record_29 = Record.compact;
  var Record_30 = Record.partitionMap;
  var Record_31 = Record.partition;
  var Record_32 = Record.separate;
  var Record_33 = Record.wither;
  var Record_34 = Record.wilt;
  var Record_35 = Record.filterMap;
  var Record_36 = Record.partitionMapWithKey;
  var Record_37 = Record.partitionWithKey;
  var Record_38 = Record.filterMapWithKey;
  var Record_39 = Record.filterWithKey;
  var Record_40 = Record.fromFoldable;
  var Record_41 = Record.fromFoldableMap;
  var Record_42 = Record.every;
  var Record_43 = Record.some;
  var Record_44 = Record.elem;
  var Record_45 = Record.partitionMapWithIndex;
  var Record_46 = Record.partitionWithIndex;
  var Record_47 = Record.filterMapWithIndex;
  var Record_48 = Record.filterWithIndex;

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

  function partialRecord(k, type, name) {
      return t.partial(Record_18(k.keys, () => type), name);
  }
  function autoImplement(getValues) {
      return class {
          constructor() {
              Object.assign(this, getValues());
          }
      };
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
  exports.Logger = Logger;
  exports.partialRecord = partialRecord;
  exports.autoImplement = autoImplement;
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
