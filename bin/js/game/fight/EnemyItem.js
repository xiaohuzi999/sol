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
var EnemyItem = /** @class */ (function (_super) {
    __extends(EnemyItem, _super);
    function EnemyItem() {
        return _super.call(this) || this;
    }
    EnemyItem.prototype.attack = function (cb) {
        trace("attack");
        cb && cb.run();
    };
    EnemyItem.prototype.beAttacked = function () {
        trace("beAttacked");
    };
    Object.defineProperty(EnemyItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (role) {
            this._data = role;
            if (role) {
                this.visible = true;
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    return EnemyItem;
}(ui.fight.EnemyItemUI));
//# sourceMappingURL=EnemyItem.js.map