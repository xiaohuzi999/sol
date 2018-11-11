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
var UserInfoView = /** @class */ (function (_super) {
    __extends(UserInfoView, _super);
    function UserInfoView() {
        var _this = _super.call(this) || this;
        _this.ItemNum = 3;
        _this.layer = xframe.LayerManager.LAYER_POP;
        return _this;
    }
    UserInfoView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this.format();
    };
    UserInfoView.prototype.format = function () {
        var roles = [User.getInstance().role].concat(User.getInstance().heros);
        for (var i = 0; i < this.ItemNum; i++) {
            this._ui["role_" + i].dataSource = roles[i];
        }
        if (!this._group.selectedBtn) {
            this._group.selectedBtn = this._group.buttons[0];
        }
    };
    UserInfoView.prototype.onSelect = function () {
        var role = this._group.selectedBtn.dataSource;
        this._ui.tfAttack.text = role.attack + "";
        this._ui.tfHP.text = role.maxHp + "";
        this._ui.tfSpeed.text = role.speed + "";
    };
    UserInfoView.prototype.onClick = function (e) {
        switch (e.target) {
            case this._ui.btnBack:
                this.close();
                break;
        }
    };
    UserInfoView.prototype.createUI = function () {
        this._ui = new ui.user.UserInfoUI();
        this.addChild(this._ui);
        this._group = new xframe.XGroup([this._ui.role_0, this._ui.role_1, this._ui.role_2]);
    };
    UserInfoView.prototype.initEvent = function () {
        this._group.on(Laya.Event.SELECT, this, this.onSelect);
        this._ui.on(Laya.Event.CLICK, this, this.onClick);
        _super.prototype.initEvent.call(this);
    };
    UserInfoView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._group.off(Laya.Event.SELECT, this, this.onSelect);
        this._ui.off(Laya.Event.CLICK, this, this.onClick);
    };
    return UserInfoView;
}(xframe.XWindow));
//# sourceMappingURL=UserInfoView.js.map