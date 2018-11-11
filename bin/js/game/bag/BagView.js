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
        var _this = _super.call(this) || this;
        _this.types = [0, ItemVo.WEAPON, ItemVo.CLOTH, ItemVo.SHOES, ItemVo.JEWEL, ItemVo.ITEM];
        return _this;
    }
    BagView.prototype.show = function () {
        _super.prototype.show.call(this);
        BagReq.getBagInfo(Handler.create(this, this.initBag));
        xframe.XFacade.instance.closeModule(MainTopView);
    };
    BagView.prototype.initBag = function (vo) {
        this._vo = vo;
        trace(this._vo);
        this.onChange();
    };
    BagView.prototype.onItemSelect = function (index) {
        var item = this._view.itemList.getItem(index);
        if (item) {
            //this._view.pic.skin = "res/item/"+item.icon+".png";
            //this._view.tfName.text = item.name+"";
        }
    };
    BagView.prototype.onChange = function () {
        var type = this.types[this._group.selectedIndex];
        if (type != 0) {
            this._view.itemList.array = this._vo.getItemByType(type);
        }
        else {
            this._view.itemList.array = this._vo.getItemByType();
        }
        this._view.itemList.selectedIndex = 0;
        this.onItemSelect(this._view.itemList.selectedIndex);
    };
    BagView.prototype.onC = function (e) {
        switch (e.target) {
        }
    };
    BagView.prototype.createUI = function () {
        this._view = new ui.bag.BagViewUI();
        this.addChild(this._view);
        this._view.itemList.vScrollBarSkin = "";
        this._view.itemList.selectEnable = true;
        var btns = [];
        btns.push(this._view.btnAll, this._view.btnWeapon, this._view.btnCloth, this._view.btnShoe, this._view.btnJewel, this._view.btnItem);
        this._group = new xframe.XGroup(btns);
        this._group.selectedIndex = 0;
    };
    BagView.prototype.initEvent = function () {
        this._view.itemList.selectHandler = Handler.create(this, this.onItemSelect, null, false);
        this._group.on(Laya.Event.CHANGE, this, this.onChange);
        this._view.on(Laya.Event.CLICK, this, this.onC);
    };
    BagView.prototype.removeEvent = function () {
        this._view.itemList.selectHandler.recover();
        this._view.itemList.selectHandler = null;
        this._group.off(Laya.Event.CHANGE, this, this.onChange);
        this._view.off(Laya.Event.CLICK, this, this.onC);
    };
    return BagView;
}(xframe.XWindow));
//# sourceMappingURL=BagView.js.map