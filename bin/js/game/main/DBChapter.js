/*
* name;
*/
var DBChapter = /** @class */ (function () {
    function DBChapter() {
    }
    DBChapter.getChapInfo = function (id) {
        return this.cfg[id];
    };
    /** */
    DBChapter.getChapList = function () {
        var list = [];
        for (var i in this.cfg) {
            list.push(this.cfg[i]);
        }
        return list.sort(onSort);
        ;
        function onSort(v1, v2) {
            if (v1.id < v2.id) {
                return -1;
            }
            else if (v1.id > v2.id) {
                return 1;
            }
            return 0;
        }
    };
    Object.defineProperty(DBChapter, "cfg", {
        get: function () {
            if (!this._cfg) {
                this._cfg = {
                    1: { name: "xx1", id: 1, cfg: "chap_0" },
                    2: { name: "xx2", id: 2, cfg: "chap_1" },
                    3: { name: "xx3", id: 3, cfg: "chap_2" }
                };
            }
            return this._cfg;
        },
        enumerable: true,
        configurable: true
    });
    return DBChapter;
}());
//# sourceMappingURL=DBChapter.js.map