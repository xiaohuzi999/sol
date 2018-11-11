var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var MsgCom = /** @class */ (function (_super) {
    __extends(MsgCom, _super);
    function MsgCom() {
        var _this = _super.call(this) || this;
        _this.curUI = _this.ui;
        return _this;
    }
    Object.defineProperty(MsgCom.prototype, "dataSource", {
        set: function (vo) {
            if (vo) {
                this.visible = true;
                if (vo.dir == 1) {
                    this.curUI = this.ui;
                }
                else {
                    this.curUI = this.ui2;
                }
                this.ui.tfName.text = vo.name + "";
                this.ui.tfMsg.text = vo.dialog + "";
            }
            else {
                this.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MsgCom.prototype, "curUI", {
        set: function (ui) {
            if (this._curUI) {
                this._curUI.removeSelf();
            }
            this._curUI = ui;
            if (this._curUI) {
                this.addChild(this._curUI);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MsgCom.prototype, "ui", {
        get: function () {
            if (!this._ui) {
                this._ui = new ui.story.MsgCom1UI();
            }
            return this._ui;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MsgCom.prototype, "ui2", {
        get: function () {
            if (!this._ui2) {
                this._ui2 = new ui.story.MsgCom2UI();
            }
            return this._ui2;
        },
        enumerable: true,
        configurable: true
    });
    return MsgCom;
}(Laya.Component));
//# sourceMappingURL=MsgCom.js.map