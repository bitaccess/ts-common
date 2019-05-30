import * as t from 'io-ts';
const LoggerCodec = t.type({
    error: t.Function,
    warn: t.Function,
    info: t.Function,
    log: t.Function,
    debug: t.Function,
    trace: t.Function,
}, 'Logger');
class LoggerType extends t.Type {
    constructor() {
        super('Logger', (u) => LoggerCodec.is(u), (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity);
        this._tag = 'LoggerType';
    }
}
export const Logger = new LoggerType();
//# sourceMappingURL=Logger.js.map