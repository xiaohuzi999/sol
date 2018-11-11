/*
* name;
*/
var BagVo = /** @class */ (function () {
    function BagVo(data) {
        this.itemsList = [];
        for (var i in data) {
            this[i] = data[i];
        }
    }
    BagVo.prototype.getItemByType = function (type) {
        if (type === void 0) { type = 0; }
        if (type == 0) {
            return this.itemsList;
        }
        var items = [];
        for (var i in this.itemsList) {
            if (this.itemsList[i].type == type) {
                items.push(this.itemsList[i]);
            }
        }
        return items;
    };
    return BagVo;
}());
//# sourceMappingURL=BagVo.js.map