import * as t from 'io-ts'
import BigNumber from 'bignumber.js'

class BigNumberType extends t.Type<BigNumber, string> {
  readonly _tag: 'BigNumberType' = 'BigNumberType'
  constructor() {
    super(
      'BigNumberT',
      BigNumber.isBigNumber,
      (u, c) => {
        if (u instanceof BigNumber) {
          return t.success(u)
        } else if (BigNumber.isBigNumber(u)) {
          // In some cases duplicate bignumber dependencies may exist and the instances won't match despite being
          // nearly identical. Fortunately bignumber.js provides an `isBigNumber` helper to detect this.
          // Recreate the instance so all BigNumbers are the same exact type.
          return t.success(new BigNumber(u))
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
      u => u.toString(),
    )
  }
}
export interface BigNumberC extends BigNumberType {}
/**
 * An io-ts codec representing a BigNumber. Can also be decoded from a string or number.
 */
export const BigNumberT: BigNumberC = new BigNumberType()
export type BigNumberT = t.TypeOf<typeof BigNumberT>
export { BigNumber }
