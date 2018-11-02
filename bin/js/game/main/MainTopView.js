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
var MainTopView = /** @class */ (function (_super) {
    __extends(MainTopView, _super);
    function MainTopView(ui) {
        if (ui === void 0) { ui = null; }
        var _this = _super.call(this) || this;
        _this._view = ui;
        _this._autoDispose = false;
        _this.layer = xframe.LayerManager.LAYER_UI;
        return _this;
    }
    MainTopView.prototype.createUI = function () {
        this.addChild(this._view);
        this.mouseThrough = this._view.mouseThrough = true;
    };
    MainTopView.prototype.onUpdte = function () {
        var user = User.getInstance();
        this._view.tfPower.text = user.power + "";
        this._view.tfDiamond.text = user.diamond + "";
        this._view.tfMoney.text = user.gold + "";
    };
    MainTopView.prototype.initEvent = function () {
        xframe.XEvent.instance.on(User.UPDATE, this, this.onUpdte);
    };
    MainTopView.prototype.removeEvent = function () {
        xframe.XEvent.instance.off(User.UPDATE, this, this.onUpdte);
    };
    return MainTopView;
}(xframe.XWindow));
//# sourceMappingURL=MainTopView.js.map