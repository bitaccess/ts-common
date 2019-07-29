import * as t from 'io-ts';
import { map } from 'fp-ts/lib/Record';
import { isEmptyObject } from '#/guards';
export function instanceofCodec(con) {
    return new t.Type(`instanceof(${con.name})`, (u) => u instanceof con, (u, c) => (u instanceof con ? t.success(u) : t.failure(u, c)), t.identity);
}
export function partialRecord(k, type, name) {
    return t.partial(map(k.keys, () => type), name);
}
export function autoImplement() {
    return class {
        constructor(values) {
            if (values) {
                Object.assign(this, typeof values === 'object' ? values : values());
            }
        }
    };
}
export const nullable = (codec) => t.union([codec, t.nullType], `${codec.name}Nullable`);
export const optional = (codec) => t.union([codec, t.undefined], `${codec.name}Optional`);
export function requiredOptionalCodec(required, optional, name) {
    return t.intersection([t.type(required, `${name}Req`), t.partial(optional, `${name}Opt`)], name);
}
export function extendCodec(parent, required, optional, name) {
    if (typeof optional === 'string') {
        name = optional;
        optional = {};
    }
    const noRequired = isEmptyObject(required);
    const noOptional = isEmptyObject(optional);
    const nameOpt = `${name}Opt`;
    const nameReq = `${name}Req`;
    if (noRequired && noOptional) {
        return parent;
    }
    if (noRequired) {
        return t.intersection([parent, t.partial(optional, nameOpt)], name);
    }
    if (noOptional) {
        return t.intersection([parent, t.type(required, nameReq)], name);
    }
    return t.intersection([parent, t.type(required, nameReq), t.partial(optional, nameOpt)], name);
}
//# sourceMappingURL=helpers.js.map