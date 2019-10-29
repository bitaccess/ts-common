import BigNumber from 'bignumber.js';
import { isNil } from '#/guards';
export function toBigNumber(value) {
    if (isNil(value)) {
        return value;
    }
    if (value instanceof BigNumber) {
        return value;
    }
    return new BigNumber(value);
}
//# sourceMappingURL=helpers.js.map