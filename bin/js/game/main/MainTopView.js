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
    function MainTopView() {
        var _this = _super.call(this) || this;
        _this._autoDispose = false;
        _this.layer = xframe.LayerManager.LAYER_UI;
        return _this;
    }
    MainTopView.prototype.createUI = function () {
        this._view = new ui.main.MainTopViewUI();
        this.addChild(this._view);
        this.mouseThrough = this._view.mouseThrough = true;
    };
    MainTopView.prototype.onClick = function (e) {
        switch (e.target) {
            case this._view.btnUserInfo:
                xframe.XFacade.instance.showModule(UserInfoView);
                break;
            case this._view.btnCharge:
                xframe.XTip.showTip("coming soon");
                break;
        }
    };
    MainTopView.prototype.onUpdte = function () {
        var user = User.getInstance();
        this._view.tfPower.text = user.power + "";
        this._view.tfDiamond.text = user.diamond + "";
        this._view.tfMoney.text = user.gold + "";
    };
    MainTopView.prototype.initEvent = function () {
        xframe.XEvent.instance.on(User.UPDATE, this, this.onUpdte);
        this._view.on(Laya.Event.CLICK, this, this.onClick);
    };
    MainTopView.prototype.removeEvent = function () {
        xframe.XEvent.instance.off(User.UPDATE, this, this.onUpdte);
        this._view.off(Laya.Event.CLICK, this, this.onClick);
    };
    return MainTopView;
}(xframe.XWindow));
//# sourceMappingURL=MainTopView.js.map