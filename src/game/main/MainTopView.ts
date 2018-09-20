/*
* name;
*/
class MainTopView extends xframe.XWindow{
    protected _view:ui.main.MainTopViewUI;
    constructor(ui:any = null){
        super();
        this._view = ui;
        this._autoDispose = false;
        this.layer = xframe.LayerManager.LAYER_UI;
    }

    protected createUI():void{
        this.addChild(this._view);
    }

    private onUpdte():void{
        var user:User = User.getInstance();
        this._view.tfPower.text = user.power+"";
        this._view.tfDiamond.text = user.diamond+"";
        this._view.tfMoney.text = user.money+"";
    }

    protected addEventListener():void{
        xframe.XEvent.instance.on(User.UPDATE, this, this.onUpdte);
    }

    protected removeEventListener():void{
        xframe.XEvent.instance.off(User.UPDATE, this, this.onUpdte);
    }
}