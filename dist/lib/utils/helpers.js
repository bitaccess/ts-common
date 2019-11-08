import BigNumber from 'bignumber.js';
import { isNil } from '../guards';
export function isMatchingError(e, partialMessages) {
    const messageLower = e.toString().toLowerCase();
    return partialMessages.some(pm => messageLower.includes(pm.toLowerCase()));
}
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