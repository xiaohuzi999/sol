/*
* name;
*/
class MainView extends xframe.XWindow{
    protected _view:ui.main.MainViewUI;
    constructor(){
        super();
    }

    private onItemClick(e: Laya.Event, index: number):void{
        if (e.type == Laya.Event.CLICK) {
            if (index == this._view.chapList.selectedIndex) {
                xframe.XFacade.instance.showModule(StoryView, Laya.loader.getRes("cfgs/chap_0.txt"));
            } else {
                this.scrollToIndex(index - 1);
            }
        }
    }

    private onScrollEnd():void{
        var index: number = Math.round(this._view.chapList.scrollBar.value / 480);
        this.scrollToIndex(index);
    }

    private scrollToIndex(index) {
        this._view.chapList.tweenTo(index);
        this._view.chapList.selectedIndex = index + 1;
        //this.selectedItem = this._view.chapList.getCell(index + 1);
    }

    public show():void{
        super.show();
        this._view.chapList.array = [null,...DBChapter.getChapList(), null];
    }

    protected createUI():void{
        this._view = new ui.main.MainViewUI();
        this.addChild(this._view);
        this._view.chapList.hScrollBarSkin="";
        this._view.chapList.scrollBar.elasticBackTime = 100;
        this._view.chapList.scrollBar.rollRatio = 0.7

        xframe.ModuleManager.addModule(new MainTopView(this._view.topCom), MainTopView).show();
        xframe.ModuleManager.addModule(new MainMenuView(this._view.menuCom), MainMenuView).show();
    }

    protected addEventListener():void{
        this._view.chapList.mouseHandler = Laya.Handler.create(this, this.onItemClick,null, false);
        this._view.chapList.scrollBar.on(Laya.Event.END, this, this.onScrollEnd);
    }

    protected removeEventListener():void{
        this._view.chapList.mouseHandler.recover();
        this._view.chapList.mouseHandler = null;
        this._view.chapList.scrollBar.off(Laya.Event.END, this, this.onScrollEnd);
    }
}