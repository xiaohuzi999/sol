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

    protected createUI():void{
        this.addChild(this._view);
    }
}