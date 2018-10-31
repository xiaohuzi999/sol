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
var ChapItem = /** @class */ (function (_super) {
    __extends(ChapItem, _super);
    function ChapItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ChapItem.prototype, "dataSource", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
            if (data) {
                this.tfName.text = data.name + "";
                this.visible = true;
                this.pic.skin = "res/chapter/" + data.id + ".png";
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return ChapItem;
}(ui.main.ChapItemUI));
//# sourceMappingURL=ChapItem.js.map