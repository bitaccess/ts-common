import BigNumber from 'bignumber.js';
import { Numeric } from '#/types';
export declare function toBigNumber(value: Numeric): BigNumber;
export declare function toBigNumber(value: Numeric | null): BigNumber | null;
export declare function toBigNumber(value: Numeric | undefined): BigNumber | undefined;
export declare function toBigNumber(value: Numeric | null | undefined): BigNumber | null | undefined;
