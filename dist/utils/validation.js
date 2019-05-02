"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io_ts_1 = require("io-ts");
var string_1 = require("./string");
var PathReporter_1 = require("io-ts/lib/PathReporter");
exports.PathReporter = PathReporter_1.PathReporter;
function getContextPath(context) {
    return context
        .filter(function (_a, i) {
        var type = _a.type;
        if (i === 0)
            return true;
        var previousType = context[i - 1].type;
        return !(previousType instanceof io_ts_1.UnionType || previousType instanceof io_ts_1.IntersectionType);
    })
        .map(function (_a) {
        var key = _a.key, type = _a.type;
        return (key ? key : type.name);
    })
        .join('.');
}
function getMessage(e) {
    var expectedType = e.context.length > 0 ? e.context[e.context.length - 1].type.name : '';
    var contextPath = getContextPath(e.context);
    var expectedMessage = expectedType !== contextPath ? expectedType + " for " + contextPath : expectedType;
    return e.message !== undefined ? e.message : "Expected type " + expectedMessage + ", but got: " + string_1.stringify(e.value);
}
exports.getMessage = getMessage;
exports.SimpleReporter = {
    report: function (validation) { return validation.fold(function (es) { return es.map(getMessage); }, function () { return ['No errors!']; }); },
};
function assertType(typeCodec, value, description) {
    if (description === void 0) { description = 'type'; }
    var validation = typeCodec.decode(value);
    if (validation.isLeft()) {
        throw new TypeError("Invalid " + description + " - " + exports.SimpleReporter.report(validation)[0]);
    }
    return validation.value;
}
exports.assertType = assertType;
//# sourceMappingURL=validation.js.map