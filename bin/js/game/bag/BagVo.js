/*
* name;
*/
var BagVo = /** @class */ (function () {
    function BagVo(data) {
        for (var i in data) {
            this[i] = data[i];
        }
    }
    BagVo.prototype.getItemByType = function (type) {
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