"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var t = __importStar(require("io-ts"));
var guards_1 = require("#/guards");
exports.nullable = function (codec) { return t.union([codec, t.null], codec.name + "Nullable"); };
exports.optional = function (codec) { return t.union([codec, t.undefined], codec.name + "Optional"); };
function enumCodec(e, name) {
    var keyed = {};
    Object.values(e).forEach(function (v) {
        keyed[v] = null;
    });
    return t.keyof(keyed, name);
}
exports.enumCodec = enumCodec;
function requiredOptionalCodec(required, optional, name) {
    return t.intersection([t.type(required, name + "Req"), t.partial(optional, name + "Opt")], name);
}
exports.requiredOptionalCodec = requiredOptionalCodec;
function extendCodec(parent, required, optional, name) {
    if (typeof optional === 'string') {
        name = optional;
        optional = {};
    }
    var noRequired = guards_1.isEmptyObject(required);
    var noOptional = guards_1.isEmptyObject(optional);
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
exports.extendCodec = extendCodec;
//# sourceMappingURL=helpers.js.map