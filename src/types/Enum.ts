import * as t from 'io-ts'

export class EnumType<E> extends t.Type<E> {
  readonly _tag: 'EnumType' = 'EnumType'
  constructor(name: string, is: EnumType<E>['is'], validate: EnumType<E>['validate'], encode: EnumType<E>['encode']) {
    super(name, is, validate, encode)
  }
}

export interface EnumC<E> extends EnumType<E> {}

/**
 * Creates an io-ts runtime type based off a typescript enum `e`
 */
export function enumCodec<E extends string>(e: Object, name: string, defaultValue?: E): t.Type<E> {
  const keyed: { [k: string]: null } = {}
  Object.values(e).forEach(v => {
    keyed[v] = null
  })
  const valueUnion = (t.keyof(keyed) as any) as t.Type<E>
  return new EnumType(
    name,
    (u): u is E => valueUnion.is(u),
    (u, c) => {
      const validation = valueUnion.validate(u, c)
      if (validation.isRight()) {
        return validation
      } else if (typeof defaultValue !== 'undefined' && typeof u === 'string') {
        return t.success(defaultValue)
      } else {
        return t.failure(u, c)
      }
    },
    t.identity,
  )
}
