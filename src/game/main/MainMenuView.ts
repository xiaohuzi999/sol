/*
* name;
*/
class MainMenuView extends xframe.XWindow{
    protected _view:ui.main.MainMenuViewUI;
    constructor(ui:any){
        super();
        this._view = ui;
        this._autoDispose = false;
        this.layer = xframe.LayerManager.LAYER_UI;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this._view.btnBag:
            xframe.XFacade.instance.showModule(BagView);
            break;
        }
    }

    protected createUI():void{
        this.addChild(this._view);
    }

    protected addEventListener():void{
        this._view.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEventListener():void{
        this._view.off(Laya.Event.CLICK, this, this.onClick);
    }
}