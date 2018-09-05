/*
* name;
*/
var UserReq = /** @class */ (function () {
    function UserReq() {
    }
    UserReq.getUserInfo = function (cb) {
        var userInfo = XDB.getData(XDB.USER);
        if (userInfo) {
            userInfo = JSON.parse(userInfo);
        }
        else {
            //create user
            userInfo = this.createUser();
            //create role
            //create bag
        }
        User.getInstance().update(userInfo);
        cb && cb.run();
    };
    UserReq.createUser = function () {
        return {
            name: "xiaohuzi999",
            pic: "",
            money: 0,
            diamond: 6,
            power: 10
        };
    };
    UserReq.createRole = function () {
        return new Role();
    };
    return UserReq;
}());
//# sourceMappingURL=UserReq.js.map