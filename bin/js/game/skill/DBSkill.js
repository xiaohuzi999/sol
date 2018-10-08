/*
* name;
*/
var DBSkill = /** @class */ (function () {
    function DBSkill() {
    }
    /** */
    DBSkill.getSkill = function (skillId) {
        return this.data[skillId];
    };
    Object.defineProperty(DBSkill, "data", {
        get: function () {
            if (!this._db) {
                this._db = JSON.parse(Laya.loader.getRes("cfgs/skill.txt") + "");
                Laya.loader.clearRes("cfgs/skill.txt");
            }
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    DBSkill.TARGET_HOME = 1;
    DBSkill.TARGET_AWAY = 2;
    DBSkill.TARGET_ALL = 0;
    //本方随机；
    //public static readonly TARGET_RAN:number = 3;
    //对方方随机；
    //public static readonly TARGET_RAN2:number = 4;
    //本方HP最少
    //public static readonly TARGET_HP:number = 5;
    //对方HP最少
    //public static readonly TARGET_HP2:number = 6;
    DBSkill.TYPE_HURT = 1;
    DBSkill.TYPE_DIZZY = 2;
    DBSkill.TYPE_CHAOS = 3;
    return DBSkill;
}());
//# sourceMappingURL=DBSkill.js.map