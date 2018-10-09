/*
* name;
*/
var BuffVo = /** @class */ (function () {
    function BuffVo() {
    }
    //num 作用目标数， target 作用对象，1-己方，2-对方，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    BuffVo.TARGET_HOME = 1;
    BuffVo.TARGET_AWAY = 2;
    //type 类型 1，HP增减, 2,attack增减 3，defend增减 4，speed增减, 5，dodge增减， 6，crit增减 7眩晕类 8，混乱类， 9保留 
    BuffVo.TYPE_HP = 1;
    BuffVo.TYPE_ATT = 2;
    BuffVo.TYPE_DEF = 3;
    BuffVo.TYPE_SPD = 4;
    BuffVo.TYPE_DODGE = 5;
    BuffVo.TYPE_CRIT = 6;
    BuffVo.TYPE_DIZZY = 7;
    BuffVo.TYPE_CHAOS = 8;
    return BuffVo;
}());
//# sourceMappingURL=BuffVo.js.map