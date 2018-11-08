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
var DItem = /** @class */ (function (_super) {
    __extends(DItem, _super);
    function DItem() {
        var _this = _super.call(this) || this;
        _this.btnAdd.on(Laya.Event.CLICK, _this, _this.onClick);
        return _this;
    }
    DItem.prototype.onClick = function (e) {
        BagReq.addItem(this.dataSource.id);
        xframe.XTip.showTip("增加" + this.dataSource.name + "*1");
    };
    Object.defineProperty(DItem.prototype, "dataSource", {
        get: function () {
            return this._data;
        },
        set: function (vo) {
            this._data = vo;
            trace("dataSource", vo);
            if (vo) {
                this.tfName.text = vo.name + "";
            }
        },
        enumerable: true,
        configurable: true
    });
    return DItem;
}(ui.debug.DebugItemUI));
//# sourceMappingURL=DItem.js.map