import * as t from 'io-ts'

class FunctionType<Fn extends Function> extends t.Type<Fn> {
  readonly _tag: 'FunctionType' = 'FunctionType'
  constructor(name: string = 'Function') {
    super(
      name,
      (u): u is Fn => typeof u === 'function',
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity,
    )
  }
}
export interface FunctionC<Fn extends Function> extends FunctionType<Fn> {}
/**
 * An io-ts codec representing a Function. Only tests for typeof function but allows generic to specify
 * a more specific static type with a signature and return type.
 */
export function functionT<Fn extends Function>(name?: string): FunctionC<Fn> {
  return new FunctionType<Fn>(name)
}
