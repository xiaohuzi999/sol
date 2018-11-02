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
    Object.defineProperty(XDB, "uid", {
        get: function () {
            return this._uniqueIndex++;
        },
        enumerable: true,
        configurable: true
    });
    /**KEY-USER INFO */
    XDB.USER = "user";
    /**KEY-BAG */
    XDB.BAG = "bag";
    /**unique id index */
    XDB._uniqueIndex = 0;
    return XDB;
}());
//# sourceMappingURL=XDB.js.map