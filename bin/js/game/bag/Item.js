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
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Item.prototype, "dataSource", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            if (this._data) {
                this.tfNum.text = data.num + "";
                this.pic.skin = "res/item/" + data.icon + ".png";
            }
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}(ui.bag.ItemUI));
//# sourceMappingURL=Item.js.map