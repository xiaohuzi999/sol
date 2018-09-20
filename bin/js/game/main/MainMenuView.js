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
var MainMenuView = /** @class */ (function (_super) {
    __extends(MainMenuView, _super);
    function MainMenuView(ui) {
        var _this = _super.call(this) || this;
        _this._view = ui;
        _this._autoDispose = false;
        _this.layer = xframe.LayerManager.LAYER_UI;
        return _this;
    }
    MainMenuView.prototype.onClick = function (e) {
        switch (e.target) {
            case this._view.btnBag:
                xframe.XFacade.instance.showModule(BagView);
                break;
        }
    };
    MainMenuView.prototype.createUI = function () {
        this.addChild(this._view);
    };
    MainMenuView.prototype.addEventListener = function () {
        this._view.on(Laya.Event.CLICK, this, this.onClick);
    };
    MainMenuView.prototype.removeEventListener = function () {
        this._view.off(Laya.Event.CLICK, this, this.onClick);
    };
    return MainMenuView;
}(xframe.XWindow));
//# sourceMappingURL=MainMenuView.js.map