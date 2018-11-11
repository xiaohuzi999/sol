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
var DAddItem = /** @class */ (function (_super) {
    __extends(DAddItem, _super);
    function DAddItem() {
        return _super.call(this) || this;
    }
    DAddItem.prototype.onClick = function (e) {
        switch (e.target) {
            case this._ui.btnClose:
                this.close();
                break;
            case this._ui.btnGold:
                User.getInstance().gold += 1000;
                User.getInstance().emit();
                break;
            case this._ui.btnDiamond:
                User.getInstance().diamond += 1000;
                User.getInstance().emit();
                break;
        }
    };
    DAddItem.prototype.show = function () {
        _super.prototype.show.call(this);
        this._ui.itemList.array = DBItem.getItemList();
    };
    DAddItem.prototype.createUI = function () {
        this._ui = new ui.debug.DebugAddItemUI();
        this.addChild(this._ui);
        this._ui.itemList.vScrollBarSkin = "";
    };
    DAddItem.prototype.initEvent = function () {
        this._ui.on(Laya.Event.CLICK, this, this.onClick);
    };
    DAddItem.prototype.removeEvent = function () {
        this._ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return DAddItem;
}(xframe.XMWindow));
//# sourceMappingURL=DAddItem.js.map