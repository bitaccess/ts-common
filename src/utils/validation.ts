import { Context, ValidationError, UnionType, IntersectionType, Type } from 'io-ts'
import { Reporter } from 'io-ts/lib/Reporter'
import { stringify } from './string'

function isCodec<T extends { new (...args: any[]): Type<any> }>(
  actual: object,
  expected: T,
): actual is InstanceType<T> {
  return actual instanceof expected || (actual as any)._tag === expected.name
}

function getContextPath(context: Context): string {
  return context
    .filter(({ type }, i) => {
      if (i === 0) return true
      const previousType = context[i - 1].type as any
      return !(isCodec(previousType, UnionType) || isCodec(previousType, IntersectionType))
    })
    .map(({ key, type }) => (key ? key : type.name))
    .join('.')
}

function stringifyNested(types: any[], delim: string): string {
  return types.map((type: Type<any>) => type.name).join(delim)
}

function getContextTypeName(context: Context): string {
  if (context.length <= 0) {
    return ''
  }
  if (context.length > 1) {
    const parent = context[context.length - 2].type
    if (isCodec(parent, UnionType)) {
      return stringifyNested(parent.types, ' | ')
    } else if (isCodec(parent, IntersectionType)) {
      return stringifyNested(parent.types, ' & ')
    }
  }
  return context[context.length - 1].type.name
}

export function getMessage(e: ValidationError): string {
  const expectedType = getContextTypeName(e.context)
  const contextPath = getContextPath(e.context)
  const expectedMessage = expectedType !== contextPath ? `${expectedType} for ${contextPath}` : expectedType
  return e.message !== undefined ? e.message : `Expected type ${expectedMessage}, but got: ${stringify(e.value)}`
}

export const SimpleReporter: Reporter<Array<string>> = {
  report: validation => validation.fold(es => es.map(getMessage), () => ['No errors!']),
}

/**
 * Throws a type error if `value` isn't conformant to type `T`.
 *
 * @param typeCodec - An io-ts type codec for T
 * @param value - The value to check
 * @returns The decoded value
 * @throws TypeError when assertion fails
 */
export function assertType<T>(
  typeCodec: Type<T>,
  value: unknown,
  description: string = 'type',
  ErrorType: { new (message: string): Error } = TypeError,
): T {
  const validation = typeCodec.decode(value)
  if (validation.isLeft()) {
    throw new ErrorType(`Invalid ${description} - ${SimpleReporter.report(validation)[0]}`)
  }
  return validation.value
}
