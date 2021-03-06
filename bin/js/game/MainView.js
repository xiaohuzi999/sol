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
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super.call(this) || this;
    }
    MainView.prototype.onC = function (e) {
        switch (e.target) {
            case this._view.btnStart:
                trace("gogogo");
                break;
        }
    };
    MainView.prototype.createUI = function () {
        this._view = new ui.main.MainViewUI();
        this.addChild(this._view);
    };
    MainView.prototype.addEventListener = function () {
        this._view.on(Laya.Event.CLICK, this, this.onC);
    };
    MainView.prototype.removeEventListener = function () {
        this._view.off(Laya.Event.CLICK, this, this.onC);
    };
    return MainView;
}(xframe.XWindow));
//# sourceMappingURL=MainView.js.map