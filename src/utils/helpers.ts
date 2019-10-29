import BigNumber from 'bignumber.js'
import { Numeric } from '../types'
import { isNil } from '../guards'

export function toBigNumber(value: Numeric): BigNumber
export function toBigNumber(value: Numeric | null): BigNumber | null
export function toBigNumber(value: Numeric | undefined): BigNumber | undefined
export function toBigNumber(value: Numeric | null | undefined): BigNumber | null | undefined
export function toBigNumber(value: Numeric | null | undefined): BigNumber | null | undefined {
  if (isNil(value)) {
    return value
  }
  if (value instanceof BigNumber) {
    return value
  }
  return new BigNumber(value)
}
