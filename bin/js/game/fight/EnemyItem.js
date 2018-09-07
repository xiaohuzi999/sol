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
        trace("attack。。。。。", this._data.uid);
        this.pic.scale(0.5, 0.5);
        Laya.Tween.to(this.pic, { scaleX: 1, scaleY: 1 }, 400, null, cb);
        //cb && cb.run();
    };
    EnemyItem.prototype.beAttacked = function () {
        //trace("beAttacked");
    };
    Object.defineProperty(EnemyItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (role) {
            var _this = this;
            this._data = role;
            if (role) {
                this.visible = true;
                var skinUrl = "res/graphics/fighter/" + role.pic + ".png";
                Laya.loader.load(skinUrl, Handler.create(null, function () {
                    _this.pic.skin = skinUrl;
                    _this.pic.anchorX = 0.5;
                    _this.pic.anchorY = 1;
                    _this.pic.x = EnemyItem.SIZE.WIDTH / 2;
                    _this.pic.y = EnemyItem.SIZE.HEIGHT;
                }));
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    EnemyItem.SIZE = { WIDTH: 300, HEIGHT: 450 };
    return EnemyItem;
}(ui.fight.EnemyItemUI));
//# sourceMappingURL=EnemyItem.js.map