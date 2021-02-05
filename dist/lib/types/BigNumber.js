import * as t from 'io-ts';
import BigNumber from 'bignumber.js';
class BigNumberType extends t.Type {
    constructor() {
        super('BigNumberT', BigNumber.isBigNumber, (u, c) => {
            if (u instanceof BigNumber) {
                return t.success(u);
            }
            else if (BigNumber.isBigNumber(u)) {
                return t.success(new BigNumber(u));
            }
            else if (t.number.is(u)) {
                return t.success(new BigNumber(u));
            }
            else if (t.string.is(u)) {
                const v = new BigNumber(u);
                if (v.isNaN()) {
                    return t.failure(u, c);
                }
                else {
                    return t.success(v);
                }
            }
            else {
                return t.failure(u, c);
            }
        }, u => u.toString());
        this._tag = 'BigNumberType';
    }
}
export const BigNumberT = new BigNumberType();
//# sourceMappingURL=BigNumber.js.map