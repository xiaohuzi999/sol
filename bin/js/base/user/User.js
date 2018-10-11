/*
* name;
*/
var User = /** @class */ (function () {
    function User() {
        //
        this.heros = [];
        //
        this.pets = [];
    }
    //更新
    User.prototype.update = function (value) {
        trace("updatexxxxxxxxxxxxx", value);
        for (var i in value) {
            this[i] = value[i];
        }
        trace(this.role);
        //测试用======================================
        var role = DBMonster.calcTotalPro(1);
        role.state = Role.IN_FIGHT;
        role.uid = 2;
        this.heros.push(role);
        //=============================================
        //
        xframe.XEvent.instance.event(User.UPDATE);
    };
    User.getInstance = function () {
        if (!this._instance) {
            this._instance = new User();
        }
        return this._instance;
    };
    //
    User.UPDATE = "update";
    return User;
}());
//# sourceMappingURL=User.js.map