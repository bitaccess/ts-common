import * as t from 'io-ts'
import {
  isObject, isEmptyObject, isNull, isUndefined, isNil, isType, isNumber, isString, isArray,
} from '../src'

describe('guards', () => {
  describe('codec', () => {
    describe('isType', () => {
      it('returns true for valid string', () => {
        expect(isType(t.string, '5')).toBe(true)
      })
      it('returns false for invalid string', () => {
        expect(isType(t.string, 5)).toBe(false)
      })
      it('returns true for valid custom type', () => {
        const customType = t.type({
          a: t.number,
          b: t.string,
        })
        expect(isType(customType, {
          a: 5,
          b: '5',
        })).toBe(true)
      })
      it('returns false for invalid custom type', () => {
        const customType = t.type({
          a: t.number,
          b: t.string,
        })
        expect(isType(customType, {})).toBe(false)
      })
    })
  })
  describe('basic', () => {
    describe('isObject', () => {
      it('returns true for object', () => {
        expect(isObject({ a: 1 })).toBe(true)
      })
      it('returns true for empty object', () => {
        expect(isObject({})).toBe(true)
      })
      it('returns false for number', () => {
        expect(isObject(5)).toBe(false)
      })
      it('returns false for string', () => {
        expect(isObject('5')).toBe(false)
      })
      it('returns false for array', () => {
        expect(isObject([])).toBe(false)
      })
      it('returns false for null', () => {
        expect(isObject(null)).toBe(false)
      })
      it('returns false for undefined', () => {
        expect(isObject(undefined)).toBe(false)
      })
    })
    describe('isEmptyObject', () => {
      it('returns false for object', () => {
        expect(isEmptyObject({ a: 1 })).toBe(false)
      })
      it('returns true for empty object', () => {
        expect(isEmptyObject({})).toBe(true)
      })
      it('returns false for number', () => {
        expect(isEmptyObject(5)).toBe(false)
      })
      it('returns false for string', () => {
        expect(isEmptyObject('5')).toBe(false)
      })
      it('returns false for array', () => {
        expect(isEmptyObject([])).toBe(false)
      })
      it('returns false for null', () => {
        expect(isEmptyObject(null)).toBe(false)
      })
      it('returns false for undefined', () => {
        expect(isEmptyObject(undefined)).toBe(false)
      })
    })
    describe('isUndefined', () => {
      it('returns false for object', () => {
        expect(isUndefined({ a: 1 })).toBe(false)
      })
      it('returns false for empty object', () => {
        expect(isUndefined({})).toBe(false)
      })
      it('returns false for number', () => {
        expect(isUndefined(5)).toBe(false)
      })
      it('returns false for string', () => {
        expect(isUndefined('5')).toBe(false)
      })
      it('returns false for array', () => {
        expect(isUndefined([])).toBe(false)
      })
      it('returns false for null', () => {
        expect(isUndefined(null)).toBe(false)
      })
      it('returns true for undefined', () => {
        expect(isUndefined(undefined)).toBe(true)
      })
    })
    describe('isNull', () => {
      it('returns false for object', () => {
        expect(isNull({ a: 1 })).toBe(false)
      })
      it('returns false for empty object', () => {
        expect(isNull({})).toBe(false)
      })
      it('returns false for number', () => {
        expect(isNull(5)).toBe(false)
      })
      it('returns false for string', () => {
        expect(isNull('5')).toBe(false)
      })
      it('returns false for array', () => {
        expect(isNull([])).toBe(false)
      })
      it('returns true for null', () => {
        expect(isNull(null)).toBe(true)
      })
      it('returns false for undefined', () => {
        expect(isNull(undefined)).toBe(false)
      })
    })
    describe('isNil', () => {
      it('returns false for object', () => {
        expect(isNil({ a: 1 })).toBe(false)
      })
      it('returns false for empty object', () => {
        expect(isNil({})).toBe(false)
      })
      it('returns false for number', () => {
        expect(isNil(5)).toBe(false)
      })
      it('returns false for string', () => {
        expect(isNil('5')).toBe(false)
      })
      it('returns false for array', () => {
        expect(isNil([])).toBe(false)
      })
      it('returns true for null', () => {
        expect(isNil(null)).toBe(true)
      })
      it('returns true for undefined', () => {
        expect(isNil(undefined)).toBe(true)
      })
    })
    describe('isNumber', () => {
      it('returns false for object', () => {
        expect(isNumber({ a: 1 })).toBe(false)
      })
      it('returns false for empty object', () => {
        expect(isNumber({})).toBe(false)
      })
      it('returns true for number', () => {
        expect(isNumber(5)).toBe(true)
      })
      it('returns false for string', () => {
        expect(isNumber('5')).toBe(false)
      })
      it('returns false for array', () => {
        expect(isNumber([])).toBe(false)
      })
      it('returns false for null', () => {
        expect(isNumber(null)).toBe(false)
      })
      it('returns false for undefined', () => {
        expect(isNumber(undefined)).toBe(false)
      })
    })
    describe('isString', () => {
      it('returns false for object', () => {
        expect(isString({ a: 1 })).toBe(false)
      })
      it('returns false for empty object', () => {
        expect(isString({})).toBe(false)
      })
      it('returns false for number', () => {
        expect(isString(5)).toBe(false)
      })
      it('returns true for string', () => {
        expect(isString('5')).toBe(true)
      })
      it('returns false for array', () => {
        expect(isString([])).toBe(false)
      })
      it('returns false for null', () => {
        expect(isString(null)).toBe(false)
      })
      it('returns false for undefined', () => {
        expect(isString(undefined)).toBe(false)
      })
    })
    describe('isArray', () => {
      it('returns false for object', () => {
        expect(isArray({ a: 1 })).toBe(false)
      })
      it('returns false for empty object', () => {
        expect(isArray({})).toBe(false)
      })
      it('returns false for number', () => {
        expect(isArray(5)).toBe(false)
      })
      it('returns false for string', () => {
        expect(isArray('5')).toBe(false)
      })
      it('returns true for array', () => {
        expect(isArray([])).toBe(true)
      })
      it('returns false for null', () => {
        expect(isArray(null)).toBe(false)
      })
      it('returns false for undefined', () => {
        expect(isArray(undefined)).toBe(false)
      })
    })
  })
})
