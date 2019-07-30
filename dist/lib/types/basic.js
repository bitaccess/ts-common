import * as t from 'io-ts';
import { BigNumberT } from './BigNumber';
export const Numeric = t.union([t.string, t.number, BigNumberT], 'Numeric');
//# sourceMappingURL=basic.js.map