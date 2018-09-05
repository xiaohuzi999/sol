/*
* name;
*/
var User = /** @class */ (function () {
    function User() {
    }
    //更新
    User.prototype.update = function (value) {
        for (var i in value) {
            this[i] = value[i];
        }
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