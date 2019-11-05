(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('io-ts'), require('bignumber.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'io-ts', 'bignumber.js'], factory) :
  (global = global || self, factory(global.faastTsCommon = {}, global.t, global.BigNumber));
}(this, (function (exports, t, BigNumber) { 'use strict';

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
   * @deprecated
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
  // tslint:disable-next-line: deprecation
  exports.flip = function (f) {
      return function (b) { return function (a) { return f(a)(b); }; };
  };
  /**
   * The `on` function is used to change the domain of a binary operator.
   *
   * @since 1.0.0
   * @deprecated
   */
  // tslint:disable-next-line: deprecation
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
   * @deprecated
   */
  exports.concat = function (x, y) {
      var lenx = x.length;
      if (lenx === 0) {
          return y;
      }
      var leny = y.length;
      if (leny === 0) {
          return x;
      }
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
   * @deprecated
   */
  function curried(f, n, acc) {
      return function (x) {
          // tslint:disable-next-line: deprecation
          var combined = exports.concat(acc, [x]);
          // tslint:disable-next-line: deprecation
          return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined);
      };
  }
  exports.curried = curried;
  function curry(f) {
      // tslint:disable-next-line: deprecation
      return curried(f, f.length - 1, []);
  }
  exports.curry = curry;
  /* tslint:disable-next-line */
  var getFunctionName = function (f) { return f.displayName || f.name || "<function" + f.length + ">"; };
  /**
   * @since 1.0.0
   * @deprecated
   */
  exports.toString = function (x) {
      if (typeof x === 'string') {
          return JSON.stringify(x);
      }
      if (x instanceof Date) {
          return "new Date('" + x.toISOString() + "')";
      }
      if (Array.isArray(x)) {
          // tslint:disable-next-line: deprecation
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
      var t = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          t[_i] = arguments[_i];
      }
      return t;
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
   * @deprecated
   */
  exports.apply = function (f) { return function (a) {
      return f(a);
  }; };
  /**
   * Applies an argument to a function (#)
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.applyFlipped = function (a) { return function (f) {
      return f(a);
  }; };
  /**
   * For use with phantom fields
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.phantom = undefined;
  /**
   * A thunk that returns always the `identity` function.
   * For use with `applySecond` methods.
   *
   * @since 1.5.0
   * @deprecated
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
  /**
   * @since 1.18.0
   */
  function absurd(_) {
      throw new Error('Called `absurd` function which should be uncallable');
  }
  exports.absurd = absurd;
  function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
          case 1:
              return ab;
          case 2:
              return function () {
                  return bc(ab.apply(this, arguments));
              };
          case 3:
              return function () {
                  return cd(bc(ab.apply(this, arguments)));
              };
          case 4:
              return function () {
                  return de(cd(bc(ab.apply(this, arguments))));
              };
          case 5:
              return function () {
                  return ef(de(cd(bc(ab.apply(this, arguments)))));
              };
          case 6:
              return function () {
                  return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
              };
          case 7:
              return function () {
                  return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
              };
          case 8:
              return function () {
                  return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
              };
          case 9:
              return function () {
                  return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
              };
      }
  }
  exports.flow = flow;
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
  var _function_27 = _function.absurd;
  var _function_28 = _function.flow;

  var pipeable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });

  function pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij) {
      switch (arguments.length) {
          case 1:
              return a;
          case 2:
              return ab(a);
          case 3:
              return bc(ab(a));
          case 4:
              return cd(bc(ab(a)));
          case 5:
              return de(cd(bc(ab(a))));
          case 6:
              return ef(de(cd(bc(ab(a)))));
          case 7:
              return fg(ef(de(cd(bc(ab(a))))));
          case 8:
              return gh(fg(ef(de(cd(bc(ab(a)))))));
          case 9:
              return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
          case 10:
              return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
      }
  }
  exports.pipe = pipe;
  var isFunctor = function (I) { return typeof I.map === 'function'; };
  var isContravariant = function (I) { return typeof I.contramap === 'function'; };
  var isFunctorWithIndex = function (I) { return typeof I.mapWithIndex === 'function'; };
  var isApply = function (I) { return typeof I.ap === 'function'; };
  var isChain = function (I) { return typeof I.chain === 'function'; };
  var isBifunctor = function (I) { return typeof I.bimap === 'function'; };
  var isExtend = function (I) { return typeof I.extend === 'function'; };
  var isFoldable = function (I) { return typeof I.reduce === 'function'; };
  var isFoldableWithIndex = function (I) { return typeof I.reduceWithIndex === 'function'; };
  var isAlt = function (I) { return typeof I.alt === 'function'; };
  var isCompactable = function (I) { return typeof I.compact === 'function'; };
  var isFilterable = function (I) { return typeof I.filter === 'function'; };
  var isFilterableWithIndex = function (I) {
      return typeof I.filterWithIndex === 'function';
  };
  var isProfunctor = function (I) { return typeof I.promap === 'function'; };
  var isSemigroupoid = function (I) { return typeof I.compose === 'function'; };
  var isMonadThrow = function (I) { return typeof I.throwError === 'function'; };
  function pipeable(I) {
      var r = {};
      if (isFunctor(I)) {
          var map = function (f) { return function (fa) { return I.map(fa, f); }; };
          r.map = map;
      }
      if (isContravariant(I)) {
          var contramap = function (f) { return function (fa) { return I.contramap(fa, f); }; };
          r.contramap = contramap;
      }
      if (isFunctorWithIndex(I)) {
          var mapWithIndex = function (f) { return function (fa) { return I.mapWithIndex(fa, f); }; };
          r.mapWithIndex = mapWithIndex;
      }
      if (isApply(I)) {
          var ap = function (fa) { return function (fab) { return I.ap(fab, fa); }; };
          var apFirst = function (fb) { return function (fa) { return I.ap(I.map(fa, function (a) { return function () { return a; }; }), fb); }; };
          r.ap = ap;
          r.apFirst = apFirst;
          r.apSecond = function (fb) { return function (fa) { return I.ap(I.map(fa, function () { return function (b) { return b; }; }), fb); }; };
      }
      if (isChain(I)) {
          var chain = function (f) { return function (ma) { return I.chain(ma, f); }; };
          var chainFirst = function (f) { return function (ma) { return I.chain(ma, function (a) { return I.map(f(a), function () { return a; }); }); }; };
          var flatten = function (mma) { return I.chain(mma, _function.identity); };
          r.chain = chain;
          r.chainFirst = chainFirst;
          r.flatten = flatten;
      }
      if (isBifunctor(I)) {
          var bimap = function (f, g) { return function (fa) { return I.bimap(fa, f, g); }; };
          var mapLeft = function (f) { return function (fa) { return I.bimap(fa, f, _function.identity); }; };
          r.bimap = bimap;
          r.mapLeft = mapLeft;
      }
      if (isExtend(I)) {
          var extend = function (f) { return function (wa) { return I.extend(wa, f); }; };
          var duplicate = function (wa) { return I.extend(wa, _function.identity); };
          r.extend = extend;
          r.duplicate = duplicate;
      }
      if (isFoldable(I)) {
          var reduce = function (b, f) { return function (fa) { return I.reduce(fa, b, f); }; };
          var foldMap = function (M) {
              var foldMapM = I.foldMap(M);
              return function (f) { return function (fa) { return foldMapM(fa, f); }; };
          };
          var reduceRight = function (b, f) { return function (fa) { return I.foldr(fa, b, f); }; };
          r.reduce = reduce;
          r.foldMap = foldMap;
          r.reduceRight = reduceRight;
      }
      if (isFoldableWithIndex(I)) {
          var reduceWithIndex = function (b, f) { return function (fa) {
              return I.reduceWithIndex(fa, b, f);
          }; };
          var foldMapWithIndex = function (M) {
              var foldMapM = I.foldMapWithIndex(M);
              return function (f) { return function (fa) { return foldMapM(fa, f); }; };
          };
          var reduceRightWithIndex = function (b, f) { return function (fa) {
              return I.foldrWithIndex(fa, b, f);
          }; };
          r.reduceWithIndex = reduceWithIndex;
          r.foldMapWithIndex = foldMapWithIndex;
          r.reduceRightWithIndex = reduceRightWithIndex;
      }
      if (isAlt(I)) {
          var alt = function (that) { return function (fa) { return I.alt(fa, that()); }; };
          r.alt = alt;
      }
      if (isCompactable(I)) {
          r.compact = I.compact;
          r.separate = I.separate;
      }
      if (isFilterable(I)) {
          var filter = function (predicate) { return function (fa) {
              return I.filter(fa, predicate);
          }; };
          var filterMap = function (f) { return function (fa) { return I.filterMap(fa, f); }; };
          var partition = function (predicate) { return function (fa) {
              return I.partition(fa, predicate);
          }; };
          var partitionMap = function (f) { return function (fa) { return I.partitionMap(fa, f); }; };
          r.filter = filter;
          r.filterMap = filterMap;
          r.partition = partition;
          r.partitionMap = partitionMap;
      }
      if (isFilterableWithIndex(I)) {
          var filterWithIndex = function (predicateWithIndex) { return function (fa) { return I.filterWithIndex(fa, predicateWithIndex); }; };
          var filterMapWithIndex = function (f) { return function (fa) {
              return I.filterMapWithIndex(fa, f);
          }; };
          var partitionWithIndex = function (predicateWithIndex) { return function (fa) { return I.partitionWithIndex(fa, predicateWithIndex); }; };
          var partitionMapWithIndex = function (f) { return function (fa) {
              return I.partitionMapWithIndex(fa, f);
          }; };
          r.filterWithIndex = filterWithIndex;
          r.filterMapWithIndex = filterMapWithIndex;
          r.partitionWithIndex = partitionWithIndex;
          r.partitionMapWithIndex = partitionMapWithIndex;
      }
      if (isProfunctor(I)) {
          var promap = function (f, g) { return function (fa) { return I.promap(fa, f, g); }; };
          r.promap = promap;
      }
      if (isSemigroupoid(I)) {
          var compose = function (that) { return function (fa) {
              return I.compose(fa, that);
          }; };
          r.compose = compose;
      }
      if (isMonadThrow(I)) {
          var fromOption = function (onNone) { return function (ma) {
              return ma._tag === 'None' ? I.throwError(onNone()) : I.of(ma.value);
          }; };
          var fromEither = function (ma) {
              return ma._tag === 'Left' ? I.throwError(ma.value) : I.of(ma.value);
          };
          var fromPredicate = function (predicate, onFalse) { return function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }; };
          var filterOrElse = function (predicate, onFalse) { return function (ma) { return I.chain(ma, function (a) { return (predicate(a) ? I.of(a) : I.throwError(onFalse(a))); }); }; };
          r.fromOption = fromOption;
          r.fromEither = fromEither;
          r.fromPredicate = fromPredicate;
          r.filterOrElse = filterOrElse;
      }
      return r;
  }
  exports.pipeable = pipeable;
  });

  unwrapExports(pipeable_1);
  var pipeable_2 = pipeable_1.pipe;
  var pipeable_3 = pipeable_1.pipeable;

  var Eq = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });

  /**
   * @since 1.19.0
   */
  exports.URI = 'Eq';
  /**
   * @since 1.19.0
   */
  function fromEquals(equals) {
      return {
          equals: function (x, y) { return x === y || equals(x, y); }
      };
  }
  exports.fromEquals = fromEquals;
  /**
   * @since 1.19.0
   */
  function strictEqual(a, b) {
      return a === b;
  }
  exports.strictEqual = strictEqual;
  var eqStrict = { equals: strictEqual };
  /**
   * @since 1.19.0
   */
  exports.eqString = eqStrict;
  /**
   * @since 1.19.0
   */
  exports.eqNumber = eqStrict;
  /**
   * @since 1.19.0
   */
  exports.eqBoolean = eqStrict;
  /**
   * @since 1.19.0
   */
  function getStructEq(eqs) {
      return fromEquals(function (x, y) {
          for (var k in eqs) {
              if (!eqs[k].equals(x[k], y[k])) {
                  return false;
              }
          }
          return true;
      });
  }
  exports.getStructEq = getStructEq;
  /**
   * Given a tuple of `Eq`s returns a `Eq` for the tuple
   *
   * @example
   * import { getTupleEq, eqString, eqNumber, eqBoolean } from 'fp-ts/lib/Eq'
   *
   * const E = getTupleEq(eqString, eqNumber, eqBoolean)
   * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, true]), true)
   * assert.strictEqual(E.equals(['a', 1, true], ['b', 1, true]), false)
   * assert.strictEqual(E.equals(['a', 1, true], ['a', 2, true]), false)
   * assert.strictEqual(E.equals(['a', 1, true], ['a', 1, false]), false)
   *
   * @since 1.19.0
   */
  function getTupleEq() {
      var eqs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          eqs[_i] = arguments[_i];
      }
      return fromEquals(function (x, y) { return eqs.every(function (E, i) { return E.equals(x[i], y[i]); }); });
  }
  exports.getTupleEq = getTupleEq;
  /**
   * @since 1.19.0
   */
  exports.eq = {
      URI: exports.URI,
      contramap: function (fa, f) { return fromEquals(function (x, y) { return fa.equals(f(x), f(y)); }); }
  };
  var contramap = pipeable_1.pipeable(exports.eq).contramap;
  exports.contramap = contramap;
  /**
   * @since 1.19.0
   */
  exports.eqDate = exports.eq.contramap(exports.eqNumber, function (date) { return date.valueOf(); });
  });

  unwrapExports(Eq);
  var Eq_1 = Eq.URI;
  var Eq_2 = Eq.fromEquals;
  var Eq_3 = Eq.strictEqual;
  var Eq_4 = Eq.eqString;
  var Eq_5 = Eq.eqNumber;
  var Eq_6 = Eq.eqBoolean;
  var Eq_7 = Eq.getStructEq;
  var Eq_8 = Eq.getTupleEq;
  var Eq_9 = Eq.eq;
  var Eq_10 = Eq.contramap;
  var Eq_11 = Eq.eqDate;

  var Ordering = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * @since 1.0.0
   */
  exports.sign = function (n) {
      return n <= -1 ? -1 : n >= 1 ? 1 : 0;
  };
  /**
   * @since 1.19.0
   */
  exports.eqOrdering = {
      equals: function (x, y) { return x === y; }
  };
  /**
   * Use `eqOrdering`
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.setoidOrdering = exports.eqOrdering;
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
  var Ordering_2 = Ordering.eqOrdering;
  var Ordering_3 = Ordering.setoidOrdering;
  var Ordering_4 = Ordering.semigroupOrdering;
  var Ordering_5 = Ordering.invert;

  var Ord = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", { value: true });



  /**
   * @since 1.19.0
   */
  exports.URI = 'Ord';
  /**
   * @since 1.0.0
   * @deprecated
   */
  exports.unsafeCompare = function (x, y) {
      return x < y ? -1 : x > y ? 1 : 0;
  };
  /**
   * @since 1.0.0
   */
  exports.ordString = __assign({}, Eq.eqString, { 
      // tslint:disable-next-line: deprecation
      compare: exports.unsafeCompare });
  /**
   * @since 1.0.0
   */
  exports.ordNumber = __assign({}, Eq.eqNumber, { 
      // tslint:disable-next-line: deprecation
      compare: exports.unsafeCompare });
  /**
   * @since 1.0.0
   */
  exports.ordBoolean = __assign({}, Eq.eqBoolean, { 
      // tslint:disable-next-line: deprecation
      compare: exports.unsafeCompare });
  /**
   * Test whether one value is _strictly less than_ another
   *
   * @since 1.19.0
   */
  exports.lt = function (O) { return function (x, y) {
      return O.compare(x, y) === -1;
  }; };
  /**
   * Use `lt`
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.lessThan = exports.lt;
  /**
   * Test whether one value is _strictly greater than_ another
   *
   * @since 1.19.0
   */
  exports.gt = function (O) { return function (x, y) {
      return O.compare(x, y) === 1;
  }; };
  /**
   * Use `gt`
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.greaterThan = exports.gt;
  /**
   * Test whether one value is _non-strictly less than_ another
   *
   * @since 1.19.0
   */
  exports.leq = function (O) { return function (x, y) {
      return O.compare(x, y) !== 1;
  }; };
  /**
   * Use `leq`
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.lessThanOrEq = exports.leq;
  /**
   * Test whether one value is _non-strictly greater than_ another
   *
   * @since 1.19.0
   */
  exports.geq = function (O) { return function (x, y) {
      return O.compare(x, y) !== -1;
  }; };
  /**
   * Use `geq`
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.greaterThanOrEq = exports.geq;
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
      var lessThanO = exports.lt(O);
      var greaterThanO = exports.gt(O);
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
  function _contramap(f, O) {
      // tslint:disable-next-line: deprecation
      return exports.fromCompare(_function.on(O.compare)(f));
  }
  function contramap() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1 ? function (O) { return _contramap(args[0], O); } : _contramap(args[0], args[1]);
  }
  exports.contramap = contramap;
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
   * @since 1.19.0
   */
  exports.ord = {
      URI: exports.URI,
      // tslint:disable-next-line: deprecation
      contramap: function (fa, f) { return contramap(f, fa); }
  };
  /**
   * @since 1.4.0
   */
  exports.ordDate = exports.ord.contramap(exports.ordNumber, function (date) { return date.valueOf(); });
  });

  unwrapExports(Ord);
  var Ord_1 = Ord.URI;
  var Ord_2 = Ord.unsafeCompare;
  var Ord_3 = Ord.ordString;
  var Ord_4 = Ord.ordNumber;
  var Ord_5 = Ord.ordBoolean;
  var Ord_6 = Ord.lt;
  var Ord_7 = Ord.lessThan;
  var Ord_8 = Ord.gt;
  var Ord_9 = Ord.greaterThan;
  var Ord_10 = Ord.leq;
  var Ord_11 = Ord.lessThanOrEq;
  var Ord_12 = Ord.geq;
  var Ord_13 = Ord.greaterThanOrEq;
  var Ord_14 = Ord.min;
  var Ord_15 = Ord.max;
  var Ord_16 = Ord.clamp;
  var Ord_17 = Ord.between;
  var Ord_18 = Ord.fromCompare;
  var Ord_19 = Ord.contramap;
  var Ord_20 = Ord.getSemigroup;
  var Ord_21 = Ord.getTupleOrd;
  var Ord_22 = Ord.getProductOrd;
  var Ord_23 = Ord.getDualOrd;
  var Ord_24 = Ord.ord;
  var Ord_25 = Ord.ordDate;

  var Semigroup = createCommonjsModule(function (module, exports) {
  var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
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
   * Use `Array`'s `getMonoid`
   *
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
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
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
   * Use `Array`'s `getMonoid`
   *
   * @since 1.0.0
   * @deprecated
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
          concat: function (x, y) { return function (a) { return x(y(a)); }; },
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
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
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
       * @obsolete
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
       * @obsolete
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
       * @obsolete
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
       * @obsolete
       */
      None.prototype.ap_ = function (fb) {
          return fb.ap(this);
      };
      /**
       * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
       * `Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
       * `None`)
       * @obsolete
       */
      None.prototype.chain = function (f) {
          return exports.none;
      };
      /** @obsolete */
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
       * @obsolete
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
       * @obsolete
       */
      None.prototype.orElse = function (fa) {
          return fa();
      };
      /** @obsolete */
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
       * @obsolete
       */
      None.prototype.fold = function (b, onSome) {
          return b;
      };
      /**
       * Lazy version of `fold`
       * @obsolete
       */
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
       * @obsolete
       */
      None.prototype.getOrElse = function (a) {
          return a;
      };
      /**
       * Lazy version of `getOrElse`
       * @obsolete
       */
      None.prototype.getOrElseL = function (f) {
          return f();
      };
      /**
       * Returns the value from this `Some` or `null` if this is a `None`
       * @obsolete
       */
      None.prototype.toNullable = function () {
          return null;
      };
      /**
       * Returns the value from this `Some` or `undefined` if this is a `None`
       * @obsolete
       */
      None.prototype.toUndefined = function () {
          return undefined;
      };
      None.prototype.inspect = function () {
          return this.toString();
      };
      None.prototype.toString = function () {
          return 'none';
      };
      /**
       * Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise
       * @obsolete
       */
      None.prototype.contains = function (E, a) {
          return false;
      };
      /**
       * Returns `true` if the option is `None`, `false` otherwise
       * @obsolete
       */
      None.prototype.isNone = function () {
          return true;
      };
      /**
       * Returns `true` if the option is an instance of `Some`, `false` otherwise
       * @obsolete
       */
      None.prototype.isSome = function () {
          return false;
      };
      /**
       * Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value
       * @obsolete
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
          // tslint:disable-next-line: deprecation
          return "some(" + _function.toString(this.value) + ")";
      };
      Some.prototype.contains = function (E, a) {
          return E.equals(this.value, a);
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
   * Use `getEq`
   *
   * @since 1.0.0
   * @deprecated
   */
  exports.getSetoid = getEq;
  /**
   * @example
   * import { none, some, getEq } from 'fp-ts/lib/Option'
   * import { eqNumber } from 'fp-ts/lib/Eq'
   *
   * const S = getEq(eqNumber)
   * assert.strictEqual(S.equals(none, none), true)
   * assert.strictEqual(S.equals(none, some(1)), false)
   * assert.strictEqual(S.equals(some(1), none), false)
   * assert.strictEqual(S.equals(some(1), some(2)), false)
   * assert.strictEqual(S.equals(some(1), some(1)), true)
   *
   * @since 1.19.0
   */
  function getEq(E) {
      return Eq.fromEquals(function (x, y) { return (x.isNone() ? y.isNone() : y.isNone() ? false : E.equals(x.value, y.value)); });
  }
  exports.getEq = getEq;
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
  /**
   * @since 1.0.0
   */
  exports.some = function (a) {
      return new Some(a);
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
          concat: exports.option.alt,
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
  var defaultSeparate = { left: exports.none, right: exports.none };
  /**
   * @since 1.0.0
   */
  exports.option = {
      URI: exports.URI,
      map: function (ma, f) { return (exports.isNone(ma) ? exports.none : exports.some(f(ma.value))); },
      of: exports.some,
      ap: function (mab, ma) { return (exports.isNone(mab) ? exports.none : exports.isNone(ma) ? exports.none : exports.some(mab.value(ma.value))); },
      chain: function (ma, f) { return (exports.isNone(ma) ? exports.none : f(ma.value)); },
      reduce: function (fa, b, f) { return (exports.isNone(fa) ? b : f(b, fa.value)); },
      foldMap: function (M) { return function (fa, f) { return (exports.isNone(fa) ? M.empty : f(fa.value)); }; },
      foldr: function (fa, b, f) { return (exports.isNone(fa) ? b : f(fa.value, b)); },
      traverse: function (F) { return function (ta, f) {
          return exports.isNone(ta) ? F.of(exports.none) : F.map(f(ta.value), exports.some);
      }; },
      sequence: function (F) { return function (ta) {
          return exports.isNone(ta) ? F.of(exports.none) : F.map(ta.value, exports.some);
      }; },
      zero: function () { return exports.none; },
      alt: function (mx, my) { return (exports.isNone(mx) ? my : mx); },
      extend: function (wa, f) { return (exports.isNone(wa) ? exports.none : exports.some(f(wa))); },
      compact: function (ma) { return exports.option.chain(ma, _function.identity); },
      separate: function (ma) {
          var o = exports.option.map(ma, function (e) { return ({
              left: getLeft(e),
              right: getRight(e)
          }); });
          return exports.isNone(o) ? defaultSeparate : o.value;
      },
      filter: function (fa, predicate) {
          return exports.isNone(fa) ? exports.none : predicate(fa.value) ? fa : exports.none;
      },
      filterMap: function (ma, f) { return (exports.isNone(ma) ? exports.none : f(ma.value)); },
      partition: function (fa, predicate) {
          return {
              left: exports.option.filter(fa, function (a) { return !predicate(a); }),
              right: exports.option.filter(fa, predicate)
          };
      },
      partitionMap: function (fa, f) { return exports.option.separate(exports.option.map(fa, f)); },
      wither: function (F) { return function (fa, f) {
          return exports.isNone(fa) ? F.of(exports.none) : f(fa.value);
      }; },
      wilt: function (F) { return function (fa, f) {
          var o = exports.option.map(fa, function (a) {
              return F.map(f(a), function (e) { return ({
                  left: getLeft(e),
                  right: getRight(e)
              }); });
          });
          return exports.isNone(o)
              ? F.of({
                  left: exports.none,
                  right: exports.none
              })
              : o.value;
      }; },
      throwError: function () { return exports.none; },
      fromEither: exports.fromEither,
      fromOption: _function.identity
  };
  //
  // backporting
  //
  /**
   * Returns an `L` value if possible
   *
   * @since 1.19.0
   */
  function getLeft(ma) {
      return ma._tag === 'Right' ? exports.none : exports.some(ma.value);
  }
  exports.getLeft = getLeft;
  /**
   * Returns an `A` value if possible
   *
   * @since 1.19.0
   */
  function getRight(ma) {
      return ma._tag === 'Left' ? exports.none : exports.some(ma.value);
  }
  exports.getRight = getRight;
  /**
   * @since 1.19.0
   */
  function fold(onNone, onSome) {
      return function (ma) { return ma.foldL(onNone, onSome); };
  }
  exports.fold = fold;
  /**
   * @since 1.19.0
   */
  function toNullable(ma) {
      return ma.toNullable();
  }
  exports.toNullable = toNullable;
  /**
   * @since 1.19.0
   */
  function toUndefined(ma) {
      return ma.toUndefined();
  }
  exports.toUndefined = toUndefined;
  /**
   * @since 1.19.0
   */
  function getOrElse(f) {
      return function (ma) { return ma.getOrElseL(f); };
  }
  exports.getOrElse = getOrElse;
  /**
   * @since 1.19.0
   */
  function elem(E) {
      return function (a) { return function (ma) { return ma.contains(E, a); }; };
  }
  exports.elem = elem;
  /**
   * @since 1.19.0
   */
  function exists(predicate) {
      return function (ma) { return ma.exists(predicate); };
  }
  exports.exists = exists;
  /**
   * @since 1.19.0
   */
  function mapNullable(f) {
      return function (ma) { return ma.mapNullable(f); };
  }
  exports.mapNullable = mapNullable;
  var _a = pipeable_1.pipeable(exports.option), alt = _a.alt, ap = _a.ap, apFirst = _a.apFirst, apSecond = _a.apSecond, chain = _a.chain, chainFirst = _a.chainFirst, duplicate = _a.duplicate, extend = _a.extend, filter = _a.filter, filterMap = _a.filterMap, flatten = _a.flatten, foldMap = _a.foldMap, map = _a.map, partition = _a.partition, partitionMap = _a.partitionMap, reduce = _a.reduce, reduceRight = _a.reduceRight, compact = _a.compact, separate = _a.separate;
  exports.alt = alt;
  exports.ap = ap;
  exports.apFirst = apFirst;
  exports.apSecond = apSecond;
  exports.chain = chain;
  exports.chainFirst = chainFirst;
  exports.duplicate = duplicate;
  exports.extend = extend;
  exports.filter = filter;
  exports.filterMap = filterMap;
  exports.flatten = flatten;
  exports.foldMap = foldMap;
  exports.map = map;
  exports.partition = partition;
  exports.partitionMap = partitionMap;
  exports.reduce = reduce;
  exports.reduceRight = reduceRight;
  exports.compact = compact;
  exports.separate = separate;
  });

  unwrapExports(Option);
  var Option_1 = Option.URI;
  var Option_2 = Option.None;
  var Option_3 = Option.none;
  var Option_4 = Option.Some;
  var Option_5 = Option.getShow;
  var Option_6 = Option.getSetoid;
  var Option_7 = Option.getEq;
  var Option_8 = Option.getOrd;
  var Option_9 = Option.some;
  var Option_10 = Option.getApplySemigroup;
  var Option_11 = Option.getApplyMonoid;
  var Option_12 = Option.getFirstMonoid;
  var Option_13 = Option.getLastMonoid;
  var Option_14 = Option.getMonoid;
  var Option_15 = Option.fromNullable;
  var Option_16 = Option.fromPredicate;
  var Option_17 = Option.tryCatch;
  var Option_18 = Option.fromEither;
  var Option_19 = Option.isSome;
  var Option_20 = Option.isNone;
  var Option_21 = Option.fromRefinement;
  var Option_22 = Option.getRefinement;
  var Option_23 = Option.option;
  var Option_24 = Option.getLeft;
  var Option_25 = Option.getRight;
  var Option_26 = Option.fold;
  var Option_27 = Option.toNullable;
  var Option_28 = Option.toUndefined;
  var Option_29 = Option.getOrElse;
  var Option_30 = Option.elem;
  var Option_31 = Option.exists;
  var Option_32 = Option.mapNullable;
  var Option_33 = Option.alt;
  var Option_34 = Option.ap;
  var Option_35 = Option.apFirst;
  var Option_36 = Option.apSecond;
  var Option_37 = Option.chain;
  var Option_38 = Option.chainFirst;
  var Option_39 = Option.duplicate;
  var Option_40 = Option.extend;
  var Option_41 = Option.filter;
  var Option_42 = Option.filterMap;
  var Option_43 = Option.flatten;
  var Option_44 = Option.foldMap;
  var Option_45 = Option.map;
  var Option_46 = Option.partition;
  var Option_47 = Option.partitionMap;
  var Option_48 = Option.reduce;
  var Option_49 = Option.reduceRight;
  var Option_50 = Option.compact;
  var Option_51 = Option.separate;

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
          show: function (t) { return "[" + t.map(function (a, i) { return shows[i].show(a); }).join(', ') + "]"; }
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
              // tslint:disable-next-line: deprecation
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
  function _collect(d, f) {
      var out = [];
      var keys = Object.keys(d).sort();
      for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
          var key = keys_1[_i];
          out.push(f(key, d[key]));
      }
      return out;
  }
  function collect() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1 ? function (d) { return _collect(d, args[0]); } : _collect(args[0], args[1]);
  }
  exports.collect = collect;
  function toArray(d) {
      // tslint:disable-next-line: deprecation
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
      if (!hasOwnProperty(k, d)) {
          return d;
      }
      var r = Object.assign({}, d);
      delete r[k];
      return r;
  }
  exports.remove = remove;
  function _pop(k, d) {
      var a = exports.lookup(k, d);
      // tslint:disable-next-line: deprecation
      return a.isNone() ? Option.none : Option.some([a.value, remove(k, d)]);
  }
  function pop() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1 ? function (d) { return _pop(args[0], d); } : _pop(args[0], args[1]);
  }
  exports.pop = pop;
  /**
   * Test whether one record contains all of the keys and values contained in another record
   *
   * @since 1.14.0
   */
  exports.isSubrecord = function (E) { return function (d1, d2) {
      for (var k in d1) {
          if (!hasOwnProperty(k, d2) || !E.equals(d1[k], d2[k])) {
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
  /**
   * Use `getEq`
   *
   * @since 1.10.0
   * @deprecated
   */
  exports.getSetoid = getEq;
  function getEq(E) {
      var isSubrecordE = exports.isSubrecord(E);
      return Eq.fromEquals(function (x, y) { return isSubrecordE(x, y) && isSubrecordE(y, x); });
  }
  exports.getEq = getEq;
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
      return hasOwnProperty(key, fa) ? Option.some(fa[key]) : Option.none;
  };
  function filter() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1 ? function (fa) { return exports.record.filter(fa, args[0]); } : exports.record.filter(args[0], args[1]);
  }
  exports.filter = filter;
  /**
   * @since 1.10.0
   */
  exports.empty = {};
  function mapWithKey(fa, f) {
      return exports.record.mapWithIndex(fa, f);
  }
  exports.mapWithKey = mapWithKey;
  function map() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1 ? function (fa) { return exports.record.map(fa, args[0]); } : exports.record.map(args[0], args[1]);
  }
  exports.map = map;
  /**
   * Reduce object by iterating over it's values.
   *
   * @since 1.10.0
   *
   * @example
   * import { reduce } from 'fp-ts/lib/Record'
   *
   * const joinAllVals = (ob: {[k: string]: string}) => reduce(ob, '', (acc, val) => acc + val)
   *
   * assert.deepStrictEqual(joinAllVals({a: 'foo', b: 'bar'}), 'foobar')
   */
  function reduce(fa, b, f) {
      return exports.record.reduce(fa, b, f);
  }
  exports.reduce = reduce;
  function foldMap(M) {
      var foldMapM = exports.record.foldMap(M);
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return args.length === 1 ? function (fa) { return foldMapM(fa, args[0]); } : foldMapM(args[0], args[1]);
      };
  }
  exports.foldMap = foldMap;
  /**
   * Use `reduceRight`
   *
   * @since 1.10.0
   * @deprecated
   */
  function foldr(fa, b, f) {
      return exports.record.foldr(fa, b, f);
  }
  exports.foldr = foldr;
  function reduceWithKey(fa, b, f) {
      return exports.record.reduceWithIndex(fa, b, f);
  }
  exports.reduceWithKey = reduceWithKey;
  /**
   * Use `foldMapWithIndex`
   *
   * @since 1.12.0
   * @deprecated
   */
  exports.foldMapWithKey = function (M) { return function (fa, f) {
      return exports.record.foldMapWithIndex(M)(fa, f);
  }; };
  function foldrWithKey(fa, b, f) {
      return exports.record.foldrWithIndex(fa, b, f);
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
      return exports.record.traverseWithIndex(F);
  }
  exports.traverseWithKey = traverseWithKey;
  function traverse(F) {
      return exports.record.traverse(F);
  }
  exports.traverse = traverse;
  function sequence(F) {
      return traverseWithIndex(F)(function (_, a) { return a; });
  }
  exports.sequence = sequence;
  /**
   * @since 1.10.0
   */
  exports.compact = function (fa) {
      var r = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
          var key = keys_2[_i];
          var optionA = fa[key];
          if (optionA.isSome()) {
              r[key] = optionA.value;
          }
      }
      return r;
  };
  function partitionMap() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.partitionMap(fa, args[0]); }
          : exports.record.partitionMap(args[0], args[1]);
  }
  exports.partitionMap = partitionMap;
  function partition() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.partition(fa, args[0]); }
          : exports.record.partition(args[0], args[1]);
  }
  exports.partition = partition;
  /**
   * @since 1.10.0
   */
  function separate(fa) {
      return exports.record.separate(fa);
  }
  exports.separate = separate;
  function wither(F) {
      return exports.record.wither(F);
  }
  exports.wither = wither;
  function wilt(F) {
      return exports.record.wilt(F);
  }
  exports.wilt = wilt;
  function filterMap() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.filterMap(fa, args[0]); }
          : exports.record.filterMap(args[0], args[1]);
  }
  exports.filterMap = filterMap;
  function partitionMapWithKey(fa, f) {
      var left = {};
      var right = {};
      var keys = Object.keys(fa);
      for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
          var key = keys_3[_i];
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
  function partitionWithKey(fa, predicate) {
      return exports.record.partitionWithIndex(fa, predicate);
  }
  exports.partitionWithKey = partitionWithKey;
  function filterMapWithKey(fa, f) {
      return exports.record.filterMapWithIndex(fa, f);
  }
  exports.filterMapWithKey = filterMapWithKey;
  function filterWithKey(fa, predicate) {
      return exports.record.filterWithIndex(fa, predicate);
  }
  exports.filterWithKey = filterWithKey;
  function fromFoldable(
  // tslint:disable-next-line: deprecation
  F) {
      return function (ta, f) {
          return F.reduce(ta, {}, function (b, _a) {
              var k = _a[0], a = _a[1];
              b[k] = hasOwnProperty(k, b) ? f(b[k], a) : a;
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
              r[k] = hasOwnProperty(k, r) ? M.concat(r[k], b) : b;
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
  function elem(E) {
      return function (a, fa) { return some(fa, function (x) { return E.equals(x, a); }); };
  }
  exports.elem = elem;
  function partitionMapWithIndex() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.partitionMapWithIndex(fa, args[0]); }
          : exports.record.partitionMapWithIndex(args[0], args[1]);
  }
  exports.partitionMapWithIndex = partitionMapWithIndex;
  function partitionWithIndex() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.partitionWithIndex(fa, args[0]); }
          : exports.record.partitionWithIndex(args[0], args[1]);
  }
  exports.partitionWithIndex = partitionWithIndex;
  function filterMapWithIndex() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.filterMapWithIndex(fa, args[0]); }
          : exports.record.filterMapWithIndex(args[0], args[1]);
  }
  exports.filterMapWithIndex = filterMapWithIndex;
  function filterWithIndex() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      return args.length === 1
          ? function (fa) { return exports.record.filterWithIndex(fa, args[0]); }
          : exports.record.filterWithIndex(args[0], args[1]);
  }
  exports.filterWithIndex = filterWithIndex;
  function insertAt(k, a) {
      // tslint:disable-next-line: deprecation
      return function (r) { return insert(k, a, r); };
  }
  exports.insertAt = insertAt;
  function deleteAt(k) {
      // tslint:disable-next-line: deprecation
      return function (r) { return remove(k, r); };
  }
  exports.deleteAt = deleteAt;
  /**
   * @since 1.19.0
   */
  exports.URI = 'Record';
  function mapWithIndex(f) {
      return function (fa) { return exports.record.mapWithIndex(fa, f); };
  }
  exports.mapWithIndex = mapWithIndex;
  function reduceWithIndex(b, f) {
      return function (fa) { return exports.record.reduceWithIndex(fa, b, f); };
  }
  exports.reduceWithIndex = reduceWithIndex;
  function foldMapWithIndex(M) {
      var foldMapWithIndexM = exports.record.foldMapWithIndex(M);
      return function (f) { return function (fa) { return foldMapWithIndexM(fa, f); }; };
  }
  exports.foldMapWithIndex = foldMapWithIndex;
  function reduceRightWithIndex(b, f) {
      return function (fa) { return exports.record.foldrWithIndex(fa, b, f); };
  }
  exports.reduceRightWithIndex = reduceRightWithIndex;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * @since 1.19.0
   */
  function hasOwnProperty(k, d) {
      return _hasOwnProperty.call(d, k);
  }
  exports.hasOwnProperty = hasOwnProperty;
  function traverseWithIndex(F) {
      var traverseWithIndexF = exports.record.traverseWithIndex(F);
      return function (f) { return function (ta) { return traverseWithIndexF(ta, f); }; };
  }
  exports.traverseWithIndex = traverseWithIndex;
  function traverse2v(F) {
      var traverseWithIndexF = traverseWithIndex(F);
      return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
  }
  exports.traverse2v = traverse2v;
  /**
   * @since 1.19.0
   */
  exports.record = {
      URI: exports.URI,
      map: function (fa, f) { return exports.record.mapWithIndex(fa, function (_, a) { return f(a); }); },
      reduce: function (fa, b, f) { return exports.record.reduceWithIndex(fa, b, function (_, b, a) { return f(b, a); }); },
      foldMap: function (M) {
          var foldMapWithIndexM = exports.record.foldMapWithIndex(M);
          return function (fa, f) { return foldMapWithIndexM(fa, function (_, a) { return f(a); }); };
      },
      foldr: function (fa, b, f) { return exports.record.foldrWithIndex(fa, b, function (_, a, b) { return f(a, b); }); },
      traverse: function (F) {
          var traverseWithIndexF = exports.record.traverseWithIndex(F);
          return function (ta, f) { return traverseWithIndexF(ta, function (_, a) { return f(a); }); };
      },
      sequence: sequence,
      compact: function (fa) {
          var r = {};
          var keys = Object.keys(fa);
          for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
              var key = keys_4[_i];
              var optionA = fa[key];
              if (Option.isSome(optionA)) {
                  r[key] = optionA.value;
              }
          }
          return r;
      },
      separate: function (fa) {
          var left = {};
          var right = {};
          var keys = Object.keys(fa);
          for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
              var key = keys_5[_i];
              var e = fa[key];
              switch (e._tag) {
                  case 'Left':
                      left[key] = e.value;
                      break;
                  case 'Right':
                      right[key] = e.value;
                      break;
              }
          }
          return {
              left: left,
              right: right
          };
      },
      filter: function (fa, predicate) {
          return exports.record.filterWithIndex(fa, function (_, a) { return predicate(a); });
      },
      filterMap: function (fa, f) { return exports.record.filterMapWithIndex(fa, function (_, a) { return f(a); }); },
      partition: function (fa, predicate) {
          return exports.record.partitionWithIndex(fa, function (_, a) { return predicate(a); });
      },
      partitionMap: function (fa, f) { return exports.record.partitionMapWithIndex(fa, function (_, a) { return f(a); }); },
      wither: function (F) {
          var traverseF = exports.record.traverse(F);
          return function (wa, f) { return F.map(traverseF(wa, f), exports.record.compact); };
      },
      wilt: function (F) {
          var traverseF = exports.record.traverse(F);
          return function (wa, f) { return F.map(traverseF(wa, f), exports.record.separate); };
      },
      mapWithIndex: function (fa, f) {
          var out = {};
          var keys = Object.keys(fa);
          for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
              var key = keys_6[_i];
              out[key] = f(key, fa[key]);
          }
          return out;
      },
      reduceWithIndex: function (fa, b, f) {
          var out = b;
          var keys = Object.keys(fa).sort();
          var len = keys.length;
          for (var i = 0; i < len; i++) {
              var k = keys[i];
              out = f(k, out, fa[k]);
          }
          return out;
      },
      foldMapWithIndex: function (M) { return function (fa, f) {
          var out = M.empty;
          var keys = Object.keys(fa).sort();
          var len = keys.length;
          for (var i = 0; i < len; i++) {
              var k = keys[i];
              out = M.concat(out, f(k, fa[k]));
          }
          return out;
      }; },
      foldrWithIndex: function (fa, b, f) {
          var out = b;
          var keys = Object.keys(fa).sort();
          var len = keys.length;
          for (var i = len - 1; i >= 0; i--) {
              var k = keys[i];
              out = f(k, fa[k], out);
          }
          return out;
      },
      traverseWithIndex: function (F) { return function (ta, f) {
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
          for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
              var key = keys_7[_i];
              _loop_1(key);
          }
          return fr;
      }; },
      partitionMapWithIndex: function (fa, f) {
          var left = {};
          var right = {};
          var keys = Object.keys(fa);
          for (var _i = 0, keys_8 = keys; _i < keys_8.length; _i++) {
              var key = keys_8[_i];
              var e = f(key, fa[key]);
              switch (e._tag) {
                  case 'Left':
                      left[key] = e.value;
                      break;
                  case 'Right':
                      right[key] = e.value;
                      break;
              }
          }
          return {
              left: left,
              right: right
          };
      },
      partitionWithIndex: function (fa, predicateWithIndex) {
          var left = {};
          var right = {};
          var keys = Object.keys(fa);
          for (var _i = 0, keys_9 = keys; _i < keys_9.length; _i++) {
              var key = keys_9[_i];
              var a = fa[key];
              if (predicateWithIndex(key, a)) {
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
      },
      filterMapWithIndex: function (fa, f) {
          var r = {};
          var keys = Object.keys(fa);
          for (var _i = 0, keys_10 = keys; _i < keys_10.length; _i++) {
              var key = keys_10[_i];
              var optionB = f(key, fa[key]);
              if (Option.isSome(optionB)) {
                  r[key] = optionB.value;
              }
          }
          return r;
      },
      filterWithIndex: function (fa, predicateWithIndex) {
          var out = {};
          var changed = false;
          for (var key in fa) {
              if (_hasOwnProperty.call(fa, key)) {
                  var a = fa[key];
                  if (predicateWithIndex(key, a)) {
                      out[key] = a;
                  }
                  else {
                      changed = true;
                  }
              }
          }
          return changed ? out : fa;
      }
  };
  var reduceRight = pipeable_1.pipeable(exports.record).reduceRight;
  exports.reduceRight = reduceRight;
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
  var Record_13 = Record.getEq;
  var Record_14 = Record.getMonoid;
  var Record_15 = Record.lookup;
  var Record_16 = Record.filter;
  var Record_17 = Record.empty;
  var Record_18 = Record.mapWithKey;
  var Record_19 = Record.map;
  var Record_20 = Record.reduce;
  var Record_21 = Record.foldMap;
  var Record_22 = Record.foldr;
  var Record_23 = Record.reduceWithKey;
  var Record_24 = Record.foldMapWithKey;
  var Record_25 = Record.foldrWithKey;
  var Record_26 = Record.singleton;
  var Record_27 = Record.traverseWithKey;
  var Record_28 = Record.traverse;
  var Record_29 = Record.sequence;
  var Record_30 = Record.compact;
  var Record_31 = Record.partitionMap;
  var Record_32 = Record.partition;
  var Record_33 = Record.separate;
  var Record_34 = Record.wither;
  var Record_35 = Record.wilt;
  var Record_36 = Record.filterMap;
  var Record_37 = Record.partitionMapWithKey;
  var Record_38 = Record.partitionWithKey;
  var Record_39 = Record.filterMapWithKey;
  var Record_40 = Record.filterWithKey;
  var Record_41 = Record.fromFoldable;
  var Record_42 = Record.fromFoldableMap;
  var Record_43 = Record.every;
  var Record_44 = Record.some;
  var Record_45 = Record.elem;
  var Record_46 = Record.partitionMapWithIndex;
  var Record_47 = Record.partitionWithIndex;
  var Record_48 = Record.filterMapWithIndex;
  var Record_49 = Record.filterWithIndex;
  var Record_50 = Record.insertAt;
  var Record_51 = Record.deleteAt;
  var Record_52 = Record.URI;
  var Record_53 = Record.mapWithIndex;
  var Record_54 = Record.reduceWithIndex;
  var Record_55 = Record.foldMapWithIndex;
  var Record_56 = Record.reduceRightWithIndex;
  var Record_57 = Record.traverseWithIndex;
  var Record_58 = Record.traverse2v;
  var Record_59 = Record.record;
  var Record_60 = Record.reduceRight;

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
      return t.partial(Record_19(k.keys, () => type), name);
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
  const nullable = (codec) => t.union([codec, t.nullType], `${codec.name}Nullable`);
  const optional = (codec) => t.union([codec, t.undefined], `${codec.name}Optional`);
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
          }, t.identity);
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
  function stringifyNested(types, delim) {
      return types.map((type) => type.name).join(delim);
  }
  function getContextTypeName(context) {
      if (context.length <= 0) {
          return '';
      }
      if (context.length > 1) {
          const parent = context[context.length - 2].type;
          if (isCodec(parent, t.UnionType)) {
              return stringifyNested(parent.types, ' | ');
          }
          else if (isCodec(parent, t.IntersectionType)) {
              return stringifyNested(parent.types, ' & ');
          }
      }
      return context[context.length - 1].type.name;
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
