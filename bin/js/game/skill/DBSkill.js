/*
* name;
*/
var DBSkill = /** @class */ (function () {
    function DBSkill() {
    }
    /** */
    DBSkill.getSkill = function (skillId) {
        return this.data[skillId];
    };
    Object.defineProperty(DBSkill, "data", {
        get: function () {
            if (!this._db) {
                this._db = JSON.parse(Laya.loader.getRes("cfgs/skill.txt") + "");
                Laya.loader.clearRes("cfgs/skill.txt");
            }
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    return DBSkill;
}());
//# sourceMappingURL=DBSkill.js.map