/*
* name;
*/
var SkillVo = /** @class */ (function () {
    function SkillVo() {
    }
    //target 作用对象，1-己方，2-对方，0-不限
    SkillVo.TARGET_ALL = 0;
    SkillVo.TARGET_HOME = 1;
    SkillVo.TARGET_AWAY = 2;
    //本方随机；
    SkillVo.TARGET_H_RAN = 3;
    //对方方随机；
    SkillVo.TARGET_A_RAN = 4;
    //本方HP最少
    SkillVo.TARGET_H_HP = 5;
    //对方HP最少
    SkillVo.TARGET_A_HP = 6;
    SkillVo.TYPE_HURT = 1;
    SkillVo.TYPE_DIZZY = 2;
    SkillVo.TYPE_CHAOS = 3;
    return SkillVo;
}());
//# sourceMappingURL=SkillVo.js.map