export function isObject(x: unknown): x is object {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

export function isEmptyObject(x: unknown): x is {} {
  return isObject(x) && Object.entries(x).length === 0 && x.constructor === Object
}

export function isUndefined(x: unknown): x is undefined {
  return typeof x === 'undefined'
}

export function isNull(x: unknown): x is null {
  return x === null
}

export function isNil(x: unknown): x is null | undefined {
  return isUndefined(x) || isNull(x)
}

export function isString(x: unknown): x is string {
  return typeof x === 'string'
}

export function isNumber(x: unknown): x is number {
  return typeof x === 'number'
}

export function isArray(x: unknown): x is unknown[] {
  return Array.isArray(x)
}
