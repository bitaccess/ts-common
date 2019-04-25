import * as t from 'io-ts';
import { isEmptyObject } from '#/guards';
export var nullable = function (codec) { return t.union([codec, t.null], codec.name + "Nullable"); };
export var optional = function (codec) { return t.union([codec, t.undefined], codec.name + "Optional"); };
export function enumCodec(e, name) {
    var keyed = {};
    Object.values(e).forEach(function (v) {
        keyed[v] = null;
    });
    return t.keyof(keyed, name);
}
export function requiredOptionalCodec(required, optional, name) {
    return t.intersection([t.type(required, name + "Req"), t.partial(optional, name + "Opt")], name);
}
export function extendCodec(parent, required, optional, name) {
    if (typeof optional === 'string') {
        name = optional;
        optional = {};
    }
    var noRequired = isEmptyObject(required);
    var noOptional = isEmptyObject(optional);
    var nameOpt = name + "Opt";
    var nameReq = name + "Req";
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