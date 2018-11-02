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
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super.call(this) || this;
    }
    MainView.prototype.onItemClick = function (e, index) {
        if (e.type == Laya.Event.CLICK) {
            if (index == this._view.chapList.selectedIndex) {
                xframe.XFacade.instance.showModule(StoryView, Laya.loader.getRes("cfgs/chap_0.txt"));
            }
            else {
                this.scrollToIndex(index - 1);
            }
        }
    };
    MainView.prototype.onScrollEnd = function () {
        var index = Math.round(this._view.chapList.scrollBar.value / 480);
        this.scrollToIndex(index);
    };
    MainView.prototype.scrollToIndex = function (index) {
        this._view.chapList.tweenTo(index);
        this._view.chapList.selectedIndex = index + 1;
        //this.selectedItem = this._view.chapList.getCell(index + 1);
    };
    MainView.prototype.show = function () {
        _super.prototype.show.call(this);
        this._view.chapList.array = [null].concat(DBChapter.getChapList(), [null]);
    };
    MainView.prototype.createUI = function () {
        this._view = new ui.main.MainViewUI();
        this.addChild(this._view);
        this._view.chapList.hScrollBarSkin = "";
        this._view.chapList.scrollBar.elasticBackTime = 100;
        this._view.chapList.scrollBar.rollRatio = 0.7;
        xframe.ModuleManager.addModule(new MainTopView(this._view.topCom), MainTopView).show();
        xframe.ModuleManager.addModule(new MainMenuView(this._view.menuCom), MainMenuView).show();
    };
    MainView.prototype.addEventListener = function () {
        this._view.chapList.mouseHandler = Laya.Handler.create(this, this.onItemClick, null, false);
        this._view.chapList.scrollBar.on(Laya.Event.END, this, this.onScrollEnd);
    };
    MainView.prototype.removeEventListener = function () {
        this._view.chapList.mouseHandler.recover();
        this._view.chapList.mouseHandler = null;
        this._view.chapList.scrollBar.off(Laya.Event.END, this, this.onScrollEnd);
    };
    return MainView;
}(xframe.XWindow));
//# sourceMappingURL=MainView.js.map