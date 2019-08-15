import * as t from 'io-ts'
import BigNumber from 'bignumber.js'

class BigNumberType extends t.Type<BigNumber> {
  readonly _tag: 'BigNumberType' = 'BigNumberType'
  constructor() {
    super(
      'BigNumberT',
      (u): u is BigNumber => u instanceof BigNumber,
      (u, c) => {
        if (u instanceof BigNumber || (u && (u as any)._isBigNumber)) {
          return t.success(u as BigNumber)
        } else if (t.number.is(u)) {
          return t.success(new BigNumber(u))
        } else if (t.string.is(u)) {
          const v = new BigNumber(u)
          if (v.isNaN()) {
            return t.failure(u, c)
          } else {
            return t.success(v)
          }
        } else {
          return t.failure(u, c)
        }
      },
      t.identity,
    )
  }
}
export interface BigNumberC extends BigNumberType {}
/**
 * An io-ts codec representing a BigNumber. Can also be decoded from a string or number.
 */
export const BigNumberT: BigNumberC = new BigNumberType()
export type BigNumberT = t.TypeOf<typeof BigNumberT>
