import * as t from 'io-ts';
import BigNumber from 'bignumber.js';
declare class BigNumberType extends t.Type<BigNumber> {
    readonly _tag: 'BigNumberType';
    constructor();
}
export interface BigNumberC extends BigNumberType {
}
export declare const BigNumberT: BigNumberC;
export declare type BigNumberT = t.TypeOf<typeof BigNumberT>;
export {};
