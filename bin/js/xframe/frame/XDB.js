/*
* name;数据管理
*/
var XDB = /** @class */ (function () {
    function XDB() {
    }
    XDB.getData = function (key) {
        return Laya.LocalStorage.getItem(key);
    };
    /**save */
    XDB.save = function (key, value) {
        if (typeof value === "string") {
            Laya.LocalStorage.setItem(key, value);
        }
        else {
            Laya.LocalStorage.setItem(key, JSON.stringify(value));
        }
    };
    /**KEY-USER INFO */
    XDB.USER = "user";
    /**HEROS */
    XDB.HERO = "hero";
    /**PET */
    XDB.PET = "pet";
    /**KEY-ROLE INFO */
    XDB.ROLE = "role";
    /**KEY-BAG */
    XDB.BAG = "bag";
    return XDB;
}());
//# sourceMappingURL=XDB.js.map