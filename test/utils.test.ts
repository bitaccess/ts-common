import * as t from 'io-ts'
import { capitalizeFirst, stringify, assertType, getMessage } from '../src'
import { toBigNumber } from '../src/utils/helpers'
import BigNumber from 'bignumber.js'

describe('utils', () => {
  describe('string', () => {
    describe('capitalizeFirst', () => {
      it('correctly capitalizes lowercase string', () => {
        expect(capitalizeFirst('abcd')).toBe('Abcd')
      })
      it('doesnt capitalize uppercase string', () => {
        expect(capitalizeFirst('AbCd')).toBe('AbCd')
      })
    })
    describe('stringify', () => {
      it('correctly stringifies strings', () => {
        expect(stringify('abc')).toBe('"abc"')
      })
      it('correctly stringifies numbers', () => {
        expect(stringify(5)).toBe('5')
      })
      it('correctly stringifies functions', () => {
        function exampleFn() {}
        expect(stringify(exampleFn)).toBe('exampleFn')
      })
      it('correctly stringifies NaN', () => {
        expect(stringify(NaN)).toBe('NaN')
      })
      it('correctly stringifies Infinity', () => {
        expect(stringify(Infinity)).toBe('Infinity')
      })
      it('correctly stringifies -Infinity', () => {
        expect(stringify(-Infinity)).toBe('-Infinity')
      })
      it('correctly stringifies null', () => {
        expect(stringify(null)).toBe('null')
      })
      it('correctly stringifies undefined', () => {
        expect(stringify(undefined)).toBe('undefined')
      })
      it('correctly stringifies arrays', () => {
        let x = [1, 'a']
        expect(stringify(x)).toBe(JSON.stringify(x))
      })
      it('correctly stringifies objects', () => {
        let x = { a: 1, b: 'c' }
        expect(stringify(x)).toBe(JSON.stringify(x))
      })
    })
  })

  describe('validation', () => {
    describe('getMessage', () => {
      it('returns provided error message', () => {
        expect(getMessage(validationError('custom message'))).toBe('custom message')
      })
      it('returns generated error message', () => {
        expect(getMessage(validationError())).toContain('Expected type')
      })
    })
    describe('assertType', () => {
      it('succeeds for valid string', () => {
        assertType(t.string, '5')
      })
      it('throws for invalid string', () => {
        expect(() => assertType(t.string, 5, 'myDescription')).toThrow('Invalid myDescription')
      })
      it('succeeds for valid custom type', () => {
        const customType = t.type({
          a: t.number,
          b: t.string,
        })
        assertType(customType, {
          a: 5,
          b: '5',
        })
      })
      it('throws for invalid custom type', () => {
        const customType = t.type({
          a: t.number,
          b: t.string,
        })
        expect(() => assertType(customType, {})).toThrow()
      })
      it('throws TypeError when error type not provided', () => {
        expect(() => assertType(t.string, 5, '')).toThrow(TypeError)
      })
      it('throws correct error type when specified', () => {
        expect(() => assertType(t.string, 5, '', SyntaxError)).toThrow(SyntaxError)
      })
    })
  })

  describe('helpers', () => {
    describe('toBigNumber', () => {
      it('returns argument when provided BigNumber', () => {
        const x = new BigNumber(123.456)
        expect(toBigNumber(x)).toBe(x)
      })
      it('returns BigNumber when provided number', () => {
        const x = 123.456
        expect(toBigNumber(x)).toEqual(new BigNumber(x))
      })
      it('returns BigNumber when provided string', () => {
        const x = '123.456'
        expect(toBigNumber(x)).toEqual(new BigNumber(x))
      })
      it('returns null when provided null', () => {
        const x = null
        expect(toBigNumber(x)).toBe(x)
      })
      it('returns undefined when provided undefined', () => {
        const x = undefined
        expect(toBigNumber(x)).toBe(x)
      })
    })
  })
})

function validationError(message?: string): t.ValidationError {
  return {
    value: null,
    message,
    context: [],
  }
}
