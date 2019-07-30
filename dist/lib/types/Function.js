import * as t from 'io-ts';
class FunctionType extends t.Type {
    constructor(name = 'Function') {
        super(name, (u) => typeof u === 'function', (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)), t.identity);
        this._tag = 'FunctionType';
    }
}
export function functionT(name) {
    return new FunctionType(name);
}
//# sourceMappingURL=Function.js.map