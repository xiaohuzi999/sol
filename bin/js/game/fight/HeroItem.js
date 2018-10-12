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
var HeroItem = /** @class */ (function (_super) {
    __extends(HeroItem, _super);
    function HeroItem() {
        return _super.call(this) || this;
    }
    HeroItem.prototype.attack = function (cb) {
        FightAniUtils.attack(this, cb);
    };
    HeroItem.prototype.beAttacked = function () {
        FightAniUtils.beAttacked(this);
    };
    HeroItem.prototype.die = function () {
        FightAniUtils.die(this, this);
    };
    /** */
    HeroItem.prototype.showHp = function (hp) {
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
    HeroItem.prototype.showBuff = function (buffId) {
        trace(this._data.uid, " add buff ", buffId);
    };
    HeroItem.prototype.delBuff = function (buffId) {
        trace(this._data.uid, " remove buff ", buffId);
    };
    HeroItem.prototype.update = function (info) {
        for (var i in info) {
            this._data[i] = info[i];
        }
        if (this._data.hp <= 0) {
            this.die();
        }
    };
    Object.defineProperty(HeroItem.prototype, "data", {
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
    return HeroItem;
}(ui.fight.HeroItemUI));
//# sourceMappingURL=HeroItem.js.map