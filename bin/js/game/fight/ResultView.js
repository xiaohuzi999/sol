var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var ResultView = /** @class */ (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        var _this = _super.call(this) || this;
        _this.bgAlpha = .5;
        return _this;
    }
    ResultView.prototype.show = function () {
        _super.prototype.show.call(this);
        xframe.AniUtil.flowIn(this);
    };
    ResultView.prototype.close = function () {
        var _this = this;
        xframe.AniUtil.flowOut(this, Handler.create(null, function () {
            _super.prototype.close.call(_this);
        }));
    };
    ResultView.prototype.createUI = function () {
        this._view = new ui.fight.ResultUI();
        this.addChild(this._view);
        this.closeOnBlank = true;
    };
    return ResultView;
}(xframe.XMWindow));
//# sourceMappingURL=ResultView.js.map