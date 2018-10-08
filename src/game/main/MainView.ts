/*
* name;
*/
class MainView extends xframe.XWindow{
    protected _view:ui.main.MainViewUI;
    constructor(){
        super();
    }

    private onC(e:Laya.Event):void{
        e.stopPropagation();
        switch(e.target){
            case this._view.btnStart:
                //this.close();
                xframe.XFacade.instance.showModule(StoryView, Laya.loader.getRes("cfgs/chap_0.txt"));
            break;
        }
    }

    protected createUI():void{
        this._view = new ui.main.MainViewUI();
        this.addChild(this._view);

        xframe.ModuleManager.addModule(new MainTopView(this._view.topCom), MainTopView).show();
        xframe.ModuleManager.addModule(new MainMenuView(this._view.menuCom), MainMenuView).show();
    }

    protected addEventListener():void{
        this._view.on(Laya.Event.CLICK, this, this.onC);
    }

    protected removeEventListener():void{
        this._view.off(Laya.Event.CLICK, this, this.onC);
    }
}