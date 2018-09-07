/*
* name;
*/
var DBMonster = /** @class */ (function () {
    function DBMonster() {
    }
    DBMonster.init = function (data) {
        this._data = JSON.parse(data);
    };
    /**获取静态属性 */
    DBMonster.getMonsterInfo = function (id) {
        for (var i in this._data) {
            if (this._data[i].id == id) {
                return this._data[i];
            }
        }
        return null;
    };
    /**
     * 计算总属性 ,需要一个公式
    */
    DBMonster.calcTotalPro = function (id) {
        var role = xframe.XUtils.clone(this.getMonsterInfo(id));
        role.attack = role.strength * 5;
        role.hp = role.maxHp = role.physique * 100;
        role.speed = role.agility * 1;
        role.crit = role.strength * 0.1;
        role.dodge = role.agility * 0.2;
        return role;
    };
    return DBMonster;
}());
//# sourceMappingURL=DBMonster.js.map