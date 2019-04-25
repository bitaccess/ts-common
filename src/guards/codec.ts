import * as t from 'io-ts'

export function isType<T extends t.Mixed>(codec: t.Type<T>, x: unknown): x is T {
  return codec.is(x)
}
