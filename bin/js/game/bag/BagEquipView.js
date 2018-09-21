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
var BagEquipView = /** @class */ (function (_super) {
    __extends(BagEquipView, _super);
    function BagEquipView() {
        return _super.call(this) || this;
    }
    BagEquipView.prototype.show = function () {
        _super.prototype.show.call(this);
        this._view.roleList.array = [User.getInstance().role].concat(User.getInstance().heros);
    };
    BagEquipView.prototype.createUI = function () {
        this._view = new ui.bag.BagEquipComUI();
        this.addChild(this._view);
        this.closeOnBlank = true;
    };
    return BagEquipView;
}(xframe.XMWindow));
//单元条
var BagEquipItem = /** @class */ (function (_super) {
    __extends(BagEquipItem, _super);
    function BagEquipItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BagEquipItem.prototype, "datasource", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            trace("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            this._data = v;
            this.tf.name = v.name + "";
        },
        enumerable: true,
        configurable: true
    });
    return BagEquipItem;
}(ui.bag.BagEquipItemUI));
//# sourceMappingURL=BagEquipView.js.map