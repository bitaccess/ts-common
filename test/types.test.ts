import * as t from 'io-ts'
import {
  DateT,
  Logger,
  nullable,
  optional,
  enumCodec,
  instanceofCodec,
  requiredOptionalCodec,
  extendCodec,
  assertType,
  BigNumberT,
  Numeric,
  BigNumber as BigNumberExported,
} from '../src'
import BigNumber from 'bignumber.js'

const VERY_PRECISE_STRING = '1234567890.012345678901234567890123456789'
const VERY_PRECISE_NUMBER = 1234567890.0123456789
const VERY_PRECISE_BIGNUMBER = new BigNumber(VERY_PRECISE_STRING)

describe('types', () => {
  describe('BigNumberT', () => {
    it('has name BigNumberT', () => {
      expect(BigNumberT.name).toBe('BigNumberT')
    })
    it('has tag BigNumberType', () => {
      expect(BigNumberT._tag).toBe('BigNumberType')
    })
    it('is returns true for valid BigNumber', () => {
      expect(BigNumberT.is(VERY_PRECISE_BIGNUMBER)).toBe(true)
    })
    it('is returns false for number', () => {
      expect(BigNumberT.is(VERY_PRECISE_NUMBER)).toBe(false)
    })
    it('is returns false for string', () => {
      expect(BigNumberT.is(VERY_PRECISE_STRING)).toBe(false)
    })
    it('decode returns same instance for a BigNumber', () => {
      const x = VERY_PRECISE_BIGNUMBER
      const decoded = BigNumberT.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toBe(x)
    })
    it('decode returns correct BigNumber for number', () => {
      const x = VERY_PRECISE_NUMBER
      const decoded = BigNumberT.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(new BigNumber(x))
    })
    it('decode returns correct BigNumber for numeric string', () => {
      const x = VERY_PRECISE_STRING
      const decoded = BigNumberT.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(new BigNumber(x))
    })
    it('decode returns error for alphabetic string', () => {
      const decoded = BigNumberT.decode('abc')
      expect(decoded.isLeft()).toBe(true)
    })
    it('decode returns error for object', () => {
      const decoded = BigNumberT.decode({})
      expect(decoded.isLeft()).toBe(true)
    })
    it('encode returns string', () => {
      expect(BigNumberT.encode(VERY_PRECISE_BIGNUMBER)).toBe(VERY_PRECISE_STRING)
    })
  })

  describe('Numeric', () => {
    it('has name Numeric', () => {
      expect(Numeric.name).toBe('Numeric')
    })
    it('is returns true for valid BigNumber', () => {
      expect(Numeric.is(VERY_PRECISE_BIGNUMBER)).toBe(true)
    })
    it('is returns true for number', () => {
      expect(Numeric.is(VERY_PRECISE_NUMBER)).toBe(true)
    })
    it('is returns true for string', () => {
      expect(Numeric.is(VERY_PRECISE_STRING)).toBe(true)
    })
    it('decode works for BigNumber', () => {
      const x = VERY_PRECISE_BIGNUMBER
      const decoded = Numeric.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode works for number', () => {
      const x = VERY_PRECISE_NUMBER
      const decoded = Numeric.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode works for number string', () => {
      const x = VERY_PRECISE_STRING
      const decoded = Numeric.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode returns error for object', () => {
      expect(Numeric.decode({}).isLeft()).toBe(true)
    })
    it('encode returns string for bignumber', () => {
      expect(Numeric.encode(VERY_PRECISE_BIGNUMBER)).toBe(VERY_PRECISE_STRING)
    })
    it('encode returns number for number', () => {
      expect(Numeric.encode(VERY_PRECISE_NUMBER)).toBe(VERY_PRECISE_NUMBER)
    })
  })

  describe('bignumber', () => {
    it('bignumber is exported', () => {
      const a = new BigNumberExported(123)
      const b = new BigNumber(123)
      const isAEqualToB = a.isEqualTo(b)
      expect(isAEqualToB).toBe(true)
    })
  })

  describe('enumCodec', () => {
    enum ExampleEnum {
      Foo = 'foo',
      Bar = 'bar',
      Unknown = 'unknown',
    }

    describe('type without default', () => {
      const ExampleT = enumCodec<ExampleEnum>(ExampleEnum, 'ExampleEnum')
      it('has name set', () => {
        expect(ExampleT.name).toBe('ExampleEnum')
      })
      it('is returns true for valid string', () => {
        const x = 'foo'
        expect(ExampleT.is(x)).toBe(true)
      })
      it('is returns false for invalid string', () => {
        const x = 'blah'
        expect(ExampleT.is(x)).toBe(false)
      })
      it('is returns false for object', () => {
        const x = {}
        expect(ExampleT.is(x)).toBe(false)
      })
      it('decode returns success for valid string', () => {
        const x = 'foo'
        const decoded = ExampleT.decode(x)
        expect(decoded.isRight()).toBe(true)
        expect(decoded.value).toEqual(ExampleEnum.Foo)
      })
      it('decode returns error for invalid string', () => {
        const x = 'blah'
        const decoded = ExampleT.decode(x)
        expect(decoded.isLeft()).toBe(true)
      })
      it('decode returns error for object', () => {
        const x = {}
        const decoded = ExampleT.decode(x)
        expect(decoded.isLeft()).toBe(true)
      })
    })

    describe('type with default', () => {
      const ExampleT = enumCodec<ExampleEnum>(ExampleEnum, 'ExampleEnum', ExampleEnum.Unknown)

      it('has name set', () => {
        expect(ExampleT.name).toBe('ExampleEnum')
      })
      it('is returns true for valid string', () => {
        const x = 'foo'
        expect(ExampleT.is(x)).toBe(true)
      })
      it('is returns false for invalid string', () => {
        const x = 'blah'
        expect(ExampleT.is(x)).toBe(false)
      })
      it('is returns false for object', () => {
        const x = {}
        expect(ExampleT.is(x)).toBe(false)
      })
      it('decode returns success for valid string', () => {
        const x = 'foo'
        const decoded = ExampleT.decode(x)
        expect(decoded.isRight()).toBe(true)
        expect(decoded.value).toEqual(ExampleEnum.Foo)
      })
      it('decode returns unknown for invalid string', () => {
        const x = 'blah'
        const decoded = ExampleT.decode(x)
        expect(decoded.isRight()).toBe(true)
        expect(decoded.value).toEqual(ExampleEnum.Unknown)
      })
      it('decode returns error for object', () => {
        const x = {}
        const decoded = ExampleT.decode(x)
        expect(decoded.isLeft()).toBe(true)
      })
    })
  })

  describe('instanceofCodec', () => {
    const instanceofDate = instanceofCodec(Date)
    it('has correct name', () => {
      expect(instanceofDate.name).toBe('instanceof(Date)')
    })
    it('is returns true for valid instance', () => {
      expect(instanceofDate.is(new Date())).toBe(true)
    })
    it('is returns false for invalid instance', () => {
      expect(instanceofDate.is(5)).toBe(false)
    })
    it('decode returns success for valid instance', () => {
      const x = new Date()
      const decoded = instanceofDate.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode returns error for invalid instance', () => {
      expect(instanceofDate.decode('abc').isLeft()).toBe(true)
    })
    it('encode returns identity', () => {
      const x = new Date()
      expect(instanceofDate.encode(x)).toBe(x)
    })
  })

  describe('DateT', () => {
    it('has correct name', () => {
      expect(DateT.name).toBe('Date')
    })
    it('has correct tag', () => {
      expect(DateT._tag).toBe('DateType')
    })
    it('is returns true for valid Date', () => {
      expect(DateT.is(new Date())).toBe(true)
    })
    it('is returns false for number', () => {
      expect(DateT.is(5)).toBe(false)
    })
    it('is returns false for string', () => {
      expect(DateT.is('a')).toBe(false)
    })
    it('decode returns success for valid Date', () => {
      const x = new Date()
      const decoded = DateT.decode(x)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode returns success for number', () => {
      const x = new Date()
      const decoded = DateT.decode(x.getTime())
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode returns success for ISO string date', () => {
      const x = new Date()
      const decoded = DateT.decode(x.toISOString())
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toEqual(x)
    })
    it('decode returns error for invalid string', () => {
      expect(DateT.decode('abc').isLeft()).toBe(true)
    })
    it('decode returns error for object', () => {
      expect(DateT.decode({}).isLeft()).toBe(true)
    })
    it('encode returns identity', () => {
      const x = new Date()
      expect(DateT.encode(x)).toBe(x)
    })
  })

  describe('Logger', () => {
    it('has correct name', () => {
      expect(Logger.name).toBe('Logger')
    })
    it('is returns true for console', () => {
      const x: Logger = console
      expect(Logger.is(x)).toBe(true)
    })
    it('is returns true for custom implementation', () => {
      class CustomLogger implements Logger {
        error = () => {}
        warn = () => {}
        info = () => {}
        log = () => {}
        debug = () => {}
        trace = () => {}
      }
      const x = new CustomLogger()
      expect(Logger.is(x)).toBe(true)
    })
    it('decode returns success for console', () => {
      const decoded = Logger.decode(console)
      expect(decoded.isRight()).toBe(true)
      expect(decoded.value).toBe(console)
    })
    it('codec type and static interface are assignable to each other', () => {
      let codecType: t.TypeOf<typeof Logger> = console
      let staticType: Logger = codecType
      codecType = staticType
    })
    it('decode returns error for invalid object', () => {
      expect(Logger.decode({}).isLeft()).toBe(true)
    })
    it('encode returns identity', () => {
      expect(Logger.encode(console)).toBe(console)
    })
  })

  describe('nullable', () => {
    it('nullable(t.string).is returns true for string', () => {
      expect(nullable(t.string).is('a')).toBe(true)
    })
    it('nullable(t.string).is returns false for number', () => {
      expect(nullable(t.string).is(5)).toBe(false)
    })
    it('nullable(t.string).is returns true for null', () => {
      expect(nullable(t.string).is(null)).toBe(true)
    })
    it('nullable(t.string).is returns false for undefined', () => {
      expect(nullable(t.string).is(undefined)).toBe(false)
    })
    it('nullable(t.string) has correct name', () => {
      expect(nullable(t.string).name).toBe('(string | null)')
    })
  })

  describe('optional', () => {
    it('optional(t.string).is returns true for string', () => {
      expect(optional(t.string).is('a')).toBe(true)
    })
    it('optional(t.string).is returns false for number', () => {
      expect(optional(t.string).is(5)).toBe(false)
    })
    it('optional(t.string).is returns false for null', () => {
      expect(optional(t.string).is(null)).toBe(false)
    })
    it('optional(t.string).is returns true for undefined', () => {
      expect(optional(t.string).is(undefined)).toBe(true)
    })
    it('optional(t.string) has correct name', () => {
      expect(optional(t.string).name).toBe('(string | undefined)')
    })
  })

  describe('requiredOptionalCodec', () => {
    const ExampleT = requiredOptionalCodec(
      {
        a: t.string,
        b: t.number,
      },
      {
        c: t.number,
      },
      'Example',
    )
    it('has correct name', () => {
      expect(ExampleT.name).toBe('Example')
    })
    it('is returns true when all values provided', () => {
      expect(ExampleT.is({ a: '', b: 0, c: 0 })).toBe(true)
    })
    it('is returns true when only required provided', () => {
      expect(ExampleT.is({ a: '', b: 0 })).toBe(true)
    })
    it('is returns false when required missing', () => {
      expect(ExampleT.is({ a: '' })).toBe(false)
    })
  })

  describe('extendCodec', () => {
    const ParentT = t.type(
      {
        p: t.string,
      },
      'Parent',
    )
    describe('all args provided', () => {
      const ChildT = extendCodec(
        ParentT,
        {
          a: t.string,
          b: t.number,
        },
        {
          c: t.number,
        },
        'Child',
      )
      it('has correct name', () => {
        expect(ChildT.name).toBe('Child')
      })
      it('is returns true when all values provided', () => {
        expect(ChildT.is({ p: '', a: '', b: 0, c: 0 })).toBe(true)
      })
      it('is returns true when only required provided', () => {
        expect(ChildT.is({ p: '', a: '', b: 0 })).toBe(true)
      })
      it('is returns false when child required missing', () => {
        expect(ChildT.is({ p: '', a: '' })).toBe(false)
      })
      it('is returns false when parent required missing', () => {
        expect(ChildT.is({ a: '', b: '', c: 0 })).toBe(false)
      })
    })
    describe('optional arg omitted', () => {
      const ChildT = extendCodec(
        ParentT,
        {
          a: t.string,
          b: t.number,
        },
        'Child',
      )
      it('has correct name', () => {
        expect(ChildT.name).toBe('Child')
      })
      it('is returns true when all values provided', () => {
        expect(ChildT.is({ p: '', a: '', b: 0 })).toBe(true)
      })
      it('is returns true when only required provided', () => {
        expect(ChildT.is({ p: '', a: '', b: 0 })).toBe(true)
      })
      it('is returns false when child required missing', () => {
        expect(ChildT.is({ p: '', a: '' })).toBe(false)
      })
      it('is returns false when parent required missing', () => {
        expect(ChildT.is({ a: '', b: '' })).toBe(false)
      })
    })
    describe('required arg empty', () => {
      const ChildT = extendCodec(
        ParentT,
        {},
        {
          c: t.number,
        },
        'Child',
      )
      it('has correct name', () => {
        expect(ChildT.name).toBe('Child')
      })
      it('is returns true when all values provided', () => {
        expect(ChildT.is({ p: '', c: 0 })).toBe(true)
      })
      it('is returns true when only required provided', () => {
        expect(ChildT.is({ p: '' })).toBe(true)
      })
      it('is returns false when parent required missing', () => {
        expect(ChildT.is({ c: 0 })).toBe(false)
      })
    })
    describe('required and optional arg empty', () => {
      const ChildT = extendCodec(ParentT, {}, {}, 'Child')
      it('is equivalent to parent', () => {
        expect(ChildT).toBe(ParentT)
      })
    })
  })
})
