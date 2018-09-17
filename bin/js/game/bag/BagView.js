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
        this._view.itemList.array = vo.itemsList;
        this._view.itemList.selectedIndex = 1;
    };
    BagView.prototype.onItemClick = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            var item = this._view.itemList.getItem(index);
            this._view.pic.skin = "res/item/" + item.icon + ".png";
            this._view.tfName.text = item.name + "";
        }
    };
    BagView.prototype.createUI = function () {
        this._view = new ui.bag.BagViewUI();
        this.addChild(this._view);
    };
    BagView.prototype.addEventListener = function () {
        this._view.itemList.mouseHandler = Handler.create(this, this.onItemClick, null, false);
    };
    BagView.prototype.removeEventListener = function () {
        this._view.itemList.mouseHandler.recover();
        this._view.itemList.mouseHandler = null;
    };
    return BagView;
}(xframe.XWindow));
//# sourceMappingURL=BagView.js.map