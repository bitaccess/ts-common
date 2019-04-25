var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as t from 'io-ts';
var DateType = (function (_super) {
    __extends(DateType, _super);
    function DateType() {
        var _this = _super.call(this, 'Date', function (u) { return u instanceof Date; }, function (u, c) {
            if (_this.is(u)) {
                return t.success(u);
            }
            else if (t.number.is(u) || t.string.is(u)) {
                var date = new Date(u);
                if (Number.isNaN(date.getTime())) {
                    return t.failure(u, c);
                }
                else {
                    return t.success(date);
                }
            }
            else {
                return t.failure(u, c);
            }
        }, t.identity) || this;
        _this._tag = 'DateType';
        return _this;
    }
    return DateType;
}(t.Type));
export { DateType };
export var DateT = new DateType();
//# sourceMappingURL=DateT.js.map