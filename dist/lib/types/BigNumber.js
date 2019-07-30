import * as t from 'io-ts';
import BigNumber from 'bignumber.js';
class BigNumberType extends t.Type {
    constructor() {
        super('BigNumberT', (u) => u instanceof BigNumber, (u, c) => {
            if (this.is(u)) {
                return t.success(u);
            }
            else if (t.number.is(u)) {
                return t.success(new BigNumber(u));
            }
            else if (t.string.is(u)) {
                return t.success(new BigNumber(u));
            }
            else {
                return t.failure(u, c);
            }
        }, t.identity);
        this._tag = 'BigNumberType';
    }
}
export const BigNumberT = new BigNumberType();
//# sourceMappingURL=BigNumber.js.map