import * as t from 'io-ts'

export function isType<T extends t.Mixed>(codec: T, x: unknown): x is t.TypeOf<T> {
  return codec.is(x)
}
