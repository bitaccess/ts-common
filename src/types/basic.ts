import * as t from 'io-ts'
import { BigNumberT } from './BigNumber'

export type Predicate<T> = (x: T) => boolean

export type Defined<T> = T extends undefined ? never : T

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}

export type Enum = (string | number)[] | Object

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const Numeric = t.union([t.string, t.number, BigNumberT], 'Numeric')
export type Numeric = t.TypeOf<typeof Numeric>
