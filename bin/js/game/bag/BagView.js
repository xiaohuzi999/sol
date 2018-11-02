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
var BagView = /** @class */ (function (_super) {
    __extends(BagView, _super);
    function BagView() {
        return _super.call(this) || this;
    }
    BagView.prototype.show = function () {
        _super.prototype.show.call(this);
        BagReq.getBagInfo(Handler.create(this, this.initBag));
    };
    BagView.prototype.initBag = function (vo) {
        this._vo = vo;
        this.onChange();
    };
    BagView.prototype.onItemSelect = function (index) {
        var item = this._view.itemList.getItem(index);
        if (item) {
            this._view.pic.skin = "res/item/" + item.icon + ".png";
            this._view.tfName.text = item.name + "";
        }
        this.formatPro();
    };
    BagView.prototype.onRendPro = function (cell, index) {
        var data = this._view.proList.getItem(index);
        cell.getChildByName("lb").text = data.label + "\t+" + data.value;
    };
    BagView.prototype.onChange = function () {
        if (this._group.selectedIndex == 0) {
            this._view.itemList.array = this._vo.getItemByType(ItemVo.ITEM);
        }
        else if (this._group.selectedIndex == 1) {
            this._view.itemList.array = this._vo.getItemByType(ItemVo.EQUIP);
        }
        this._view.itemList.selectedIndex = 0;
        this.onItemSelect(this._view.itemList.selectedIndex);
    };
    BagView.prototype.formatPro = function () {
        var item = this._view.itemList.selectedItem;
        if (item.property) {
            this._view.proList.visible = true;
            this._view.proList.array = getProList(item.property);
        }
        else {
            this._view.proList.visible = false;
        }
        function getProList(pro) {
            var proList = [];
            for (var i in pro) {
                proList.push({ label: i, value: pro[i] });
            }
            return proList;
        }
    };
    BagView.prototype.onC = function (e) {
        switch (e.target) {
            case this._view.btnUse:
                xframe.XFacade.instance.showModule(BagEquipView);
                break;
        }
    };
    BagView.prototype.createUI = function () {
        this._view = new ui.bag.BagViewUI();
        this.addChild(this._view);
        this._view.itemList.hScrollBarSkin = "";
        this._view.itemList.selectEnable = true;
        this._group = new xframe.XGroup([this._view.btnItem, this._view.btnEquip]);
        this._group.selectedIndex = 0;
    };
    BagView.prototype.initEvent = function () {
        this._view.itemList.selectHandler = Handler.create(this, this.onItemSelect, null, false);
        this._view.proList.renderHandler = Handler.create(this, this.onRendPro, null, false);
        this._group.on(Laya.Event.CHANGE, this, this.onChange);
        this._view.on(Laya.Event.CLICK, this, this.onC);
    };
    BagView.prototype.removeEvent = function () {
        this._view.itemList.selectHandler.recover();
        this._view.itemList.selectHandler = null;
        this._view.proList.renderHandler.recover();
        this._view.proList.renderHandler = null;
        this._group.off(Laya.Event.CHANGE, this, this.onChange);
        this._view.off(Laya.Event.CLICK, this, this.onC);
    };
    return BagView;
}(xframe.XWindow));
//# sourceMappingURL=BagView.js.map