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
var BagItem = /** @class */ (function (_super) {
    __extends(BagItem, _super);
    function BagItem() {
        var _this = _super.call(this) || this;
        _this.dataSource;
        return _this;
    }
    Object.defineProperty(BagItem.prototype, "dataSource", {
        get: function () {
            return this._vo;
        },
        set: function (vo) {
            this._vo = vo;
            if (vo) {
                this.tfName.text = vo.name + "";
            }
            this.item.dataSource = vo;
        },
        enumerable: true,
        configurable: true
    });
    return BagItem;
}(ui.bag.BagItemUI));
//# sourceMappingURL=BagItem.js.map