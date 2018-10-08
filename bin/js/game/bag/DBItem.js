/*
* name;
*/
var DBItem = /** @class */ (function () {
    function DBItem() {
    }
    /**获取数据源 */
    DBItem.getItemDB = function (itemId) {
        for (var i in this.db) {
            if (this.db[i].id == itemId) {
                return this.db[i];
            }
        }
    };
    /**生成道具 */
    DBItem.createItem = function (id, num) {
        var item = xframe.XUtils.clone(this.getItemDB(id));
        item.num = num;
        item.uid = XDB.uid + "";
        return item;
    };
    Object.defineProperty(DBItem, "db", {
        get: function () {
            if (!this._db) {
                this._db = JSON.parse(Laya.loader.getRes("cfgs/items.txt") + "");
            }
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    //绿，蓝，紫，橙，红
    DBItem.COLORS = [0x006600, 0x0000FF, 0x8B00FF, 0xFF7F00, 0xff0000];
    return DBItem;
}());
//# sourceMappingURL=DBItem.js.map