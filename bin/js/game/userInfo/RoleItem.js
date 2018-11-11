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
var RoleItem = /** @class */ (function (_super) {
    __extends(RoleItem, _super);
    function RoleItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RoleItem.prototype, "dataSource", {
        get: function () {
            return this._data;
        },
        set: function (role) {
            this._data = role;
            if (this._data) {
                this.visible = true;
                this.tfName.text = role.name + "";
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleItem.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (v) {
            this._selected = v;
            if (this._selected) {
                this.filters = [new Laya.GlowFilter("#ff6600", 5)];
            }
            else {
                this.filters = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return RoleItem;
}(ui.user.UserItemUI));
//# sourceMappingURL=RoleItem.js.map