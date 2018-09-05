var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
                return __assign({}, this._data[i]);
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
        role.hp = role.maxHp = role.physique * 10;
        role.speed = role.agility * 1;
        role.critRate = role.strength * 0.1;
        role.dodgeRate = role.agility * 0.2;
        return role;
    };
    return DBMonster;
}());
//# sourceMappingURL=DBMonster.js.map