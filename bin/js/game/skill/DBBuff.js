/*
* name;
*/
var DBBuff = /** @class */ (function () {
    function DBBuff() {
    }
    /** */
    DBBuff.getBuff = function (buffId) {
        return this.data[buffId];
    };
    Object.defineProperty(DBBuff, "data", {
        get: function () {
            if (!this._db) {
                this._db = JSON.parse(Laya.loader.getRes("cfgs/buff.txt") + "");
                Laya.loader.clearRes("cfgs/buff.txt");
            }
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    DBBuff.TARGET_HOME = 1;
    DBBuff.TARGET_AWAY = 2;
    DBBuff.TARGET_ALL = 0;
    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，增减益 2眩晕类 3，混乱类 rnd 持续回合
    DBBuff.TYPE_BUFF = 1;
    DBBuff.TYPE_DIZZY = 2;
    DBBuff.TYPE_CHAOS = 3;
    return DBBuff;
}());
//# sourceMappingURL=DBBuff.js.map