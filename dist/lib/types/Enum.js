import * as t from 'io-ts';
export class EnumType extends t.Type {
    constructor(name, is, validate, encode) {
        super(name, is, validate, encode);
        this._tag = 'EnumType';
    }
}
export function enumCodec(e, name, defaultValue) {
    const keyed = {};
    Object.values(e).forEach(v => {
        keyed[v] = null;
    });
    const valueUnion = t.keyof(keyed);
    return new EnumType(name, (u) => valueUnion.is(u), (u, c) => {
        const validation = valueUnion.validate(u, c);
        if (validation.isRight()) {
            return validation;
        }
        else if (typeof defaultValue !== 'undefined' && typeof u === 'string') {
            return t.success(defaultValue);
        }
        else {
            return t.failure(u, c);
        }
    }, t.identity);
}
//# sourceMappingURL=Enum.js.map