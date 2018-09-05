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
var FightView = /** @class */ (function (_super) {
    __extends(FightView, _super);
    function FightView() {
        return _super.call(this) || this;
    }
    FightView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        trace("FightView::", args[0]);
        //====
        trace("monster==========>>", DBMonster.calcTotalPro(args[0]));
    };
    FightView.prototype.createUI = function () {
        this._view = new ui.fight.FightViewUI();
        this.addChild(this._view);
    };
    return FightView;
}(xframe.XWindow));
//# sourceMappingURL=FightView.js.map