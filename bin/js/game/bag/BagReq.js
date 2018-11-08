/*
* name;
*/
var BagReq = /** @class */ (function () {
    function BagReq() {
    }
    /** */
    BagReq.getBagInfo = function (cb) {
        if (cb === void 0) { cb = null; }
        if (!this.vo) {
            this.vo = new BagVo(XDB.getData(XDB.BAG));
        }
        //this.vo.itemsList || (this.vo.itemsList = []);
        //this.vo.itemsList.push(DBItem.createItem(101,10));
        //this.vo.itemsList.push(DBItem.createItem(201,1));
        //this.vo.itemsList.push(DBItem.createItem(202,1));
        //this.vo.itemsList.push(DBItem.createItem(203,1));
        //this.vo.itemsList.push(DBItem.createItem(204,1));
        //this.vo.itemsList.push(DBItem.createItem(205,1));
        //this.vo.itemsList.push(DBItem.createItem(206,1));
        cb && cb.runWith(this.vo);
    };
    /** add item*/
    BagReq.addItem = function (id, num) {
        if (num === void 0) { num = 1; }
        //判定是否可以叠加
        var itemDB = DBItem.getItemDB(id);
        var item;
        if (itemDB.max == 1) {
            item = DBItem.createItem(id, num);
            this.vo.itemsList.push(item);
        }
        else {
            item = this.getItems(id)[0];
            if (!item) {
                item = DBItem.createItem(id, num);
                this.vo.itemsList.push(item);
            }
            item.num = item.num + num;
        }
        //更新表现===
        xframe.XEvent.instance.event(this.UPDATE);
        //保存数据==
    };
    /**delete items */
    BagReq.delItem = function (id, num) {
        if (num === void 0) { num = 1; }
        var item = this.getItems(id)[0];
        if (item) {
            item.num = item.num - num;
            if (item.num <= 0) {
                for (var i = 0; i < this.vo.itemsList.length; i++) {
                    if (this.vo.itemsList[i].uid == item.uid) {
                        this.vo.itemsList.splice(i, 1);
                        break;
                    }
                }
            }
            //更新表现===
            xframe.XEvent.instance.event(this.UPDATE);
            //保存数据==
        }
    };
    /**get items by item id */
    BagReq.getItems = function (id) {
        var items = [];
        for (var i in this.vo.itemsList) {
            if (this.vo.itemsList[i].id == id) {
                items.push(this.vo.itemsList[i]);
            }
        }
        return items;
    };
    /**get item by uid */
    BagReq.getItemByUid = function (uid) {
        for (var i in this.vo.itemsList) {
            if (this.vo.itemsList[i].id == uid) {
                return this.vo.itemsList[i];
            }
        }
    };
    /**时间-更新 */
    BagReq.UPDATE = "b_update";
    return BagReq;
}());
//# sourceMappingURL=BagReq.js.map