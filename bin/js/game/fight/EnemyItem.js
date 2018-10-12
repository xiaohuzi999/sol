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
        FightAniUtils.attack(this.pic, cb);
    };
    EnemyItem.prototype.beAttacked = function () {
        FightAniUtils.beAttacked(this.pic);
    };
    EnemyItem.prototype.die = function () {
        trace("die..............");
        FightAniUtils.die(this.pic, this);
    };
    /** */
    EnemyItem.prototype.showHp = function (hp) {
        //效果
        var delHp = hp - this._data.hp;
        this._data.hp = hp;
        if (this._data.hp <= 0) {
            this.die();
        }
        if (delHp < 0) {
            this.beAttacked();
        }
        trace(this._data.uid, " current hp ", this._data.hp, " __", delHp);
    };
    /**showBuff */
    EnemyItem.prototype.showBuff = function (buffId) {
        trace(this._data.uid, " add buff ", buffId);
    };
    EnemyItem.prototype.delBuff = function (buffId) {
        trace(this._data.uid, " remove buff ", buffId);
    };
    EnemyItem.prototype.update = function (info) {
        for (var i in info) {
            this._data[i] = info[i];
        }
        if (this._data.hp <= 0) {
            this.die();
        }
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