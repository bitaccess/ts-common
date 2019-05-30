import * as t from 'io-ts';
export const Logger = t.type({
    error: t.Function,
    warn: t.Function,
    info: t.Function,
    log: t.Function,
    debug: t.Function,
    trace: t.Function,
}, 'Logger');
//# sourceMappingURL=Logger.js.map