import * as t from 'io-ts'
import { map } from 'fp-ts/lib/Record'
import { isEmptyObject } from '#/guards'

export function instanceofCodec<T>(con: { new (): T }): t.Type<T> {
  return new t.Type(
    `instanceof(${con.name})`,
    (u): u is T => u instanceof con,
    (u, c) => (u instanceof con ? t.success(u) : t.failure(u, c)),
    t.identity,
  )
}

export function partialRecord<KS extends t.KeyofType<any>, T extends t.Any>(
  k: KS,
  type: T,
  name?: string,
): t.PartialC<Record<keyof KS['keys'], T>> {
  return t.partial(map(k.keys, () => type) as any, name)
}

export function autoImplement<T extends object>() {
  return class {
    constructor(values?: T | (() => T)) {
      if (values) {
        Object.assign(this, typeof values === 'object' ? values : values())
      }
    }
  } as new (values?: T | (() => T)) => T
}

export const nullable = <T extends t.Mixed>(codec: T) => t.union([codec, t.nullType], `${codec.name}Nullable`)
export const optional = <T extends t.Mixed>(codec: T) => t.union([codec, t.undefined], `${codec.name}Optional`)

/**
 * Creates a codec for an object with required and optional params using an intersection
 * codec.
 *
 * @param required The required attributes
 * @param optional The optional attributes
 * @param name The name of the type
 */
export function requiredOptionalCodec<A extends t.Props, B extends t.Props>(required: A, optional: B, name: string) {
  return t.intersection([t.type(required, `${name}Req`), t.partial(optional, `${name}Opt`)], name)
}

/**
 * Extends a codec with additional required and optional attributes
 *
 * @param parent The type to extend
 * @param required The required props to add
 * @param optional The optional props to add
 * @param name The name of the type
 */
export function extendCodec<P extends t.Mixed>(parent: P, required: {}, name: string): P
export function extendCodec<P extends t.Mixed, R extends t.Props>(
  parent: P,
  required: R,
  name: string,
): t.IntersectionC<[P, t.TypeC<R>]>
export function extendCodec<P extends t.Mixed>(parent: P, required: {}, optional: {}, name: string): P
export function extendCodec<P extends t.Mixed, O extends t.Props>(
  parent: P,
  required: {},
  optional: O,
  name: string,
): t.IntersectionC<[P, t.PartialC<O>]>
export function extendCodec<P extends t.Mixed, R extends t.Props>(
  parent: P,
  required: R,
  optional: {},
  name: string,
): t.IntersectionC<[P, t.TypeC<R>]>
export function extendCodec<P extends t.Mixed, R extends t.Props, O extends t.Props>(
  parent: P,
  required: R,
  optional: O,
  name: string,
): t.IntersectionC<[P, t.TypeC<R>, t.PartialC<O>]>
export function extendCodec<P extends t.Mixed, R extends t.Props, O extends t.Props>(
  parent: P,
  required: R | {},
  optional: O | {} | string,
  name?: string,
): any {
  if (typeof optional === 'string') {
    name = optional
    optional = {}
  }
  const noRequired = isEmptyObject(required)
  const noOptional = isEmptyObject(optional)
  const nameOpt = `${name}Opt`
  const nameReq = `${name}Req`
  if (noRequired && noOptional) {
    return parent
  }
  if (noRequired) {
    return t.intersection([parent, t.partial(optional, nameOpt)], name)
  }
  if (noOptional) {
    return t.intersection([parent, t.type(required, nameReq)], name)
  }
  return t.intersection([parent, t.type(required, nameReq), t.partial(optional, nameOpt)], name)
}
