"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_ts_1 = require("io-ts");
function stringify(v) {
    if (typeof v === 'undefined') {
        return 'undefined';
    }
    if (typeof v === 'function') {
        return io_ts_1.getFunctionName(v);
    }
    if (typeof v === 'number' && !isFinite(v)) {
        if (isNaN(v)) {
            return 'NaN';
        }
        return v > 0 ? 'Infinity' : '-Infinity';
    }
    return JSON.stringify(v);
}
exports.stringify = stringify;
function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalizeFirst = capitalizeFirst;
//# sourceMappingURL=string.js.map