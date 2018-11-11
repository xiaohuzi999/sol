/*
* name;
*/
class MainTopView extends xframe.XWindow{
    protected _view:ui.main.MainTopViewUI;
    constructor(){
        super();
        this._autoDispose = false;
        this.layer = xframe.LayerManager.LAYER_UI;
    }

    protected createUI():void{
        this._view = new ui.main.MainTopViewUI();
        this.addChild(this._view);
        this.mouseThrough = this._view.mouseThrough = true;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this._view.btnUserInfo:
                xframe.XFacade.instance.showModule(UserInfoView);
            break;
            case this._view.btnCharge:
                xframe.XTip.showTip("coming soon");
            break;
        }
    }

    private onUpdte():void{
        var user:User = User.getInstance();
        this._view.tfPower.text = user.power+"";
        this._view.tfDiamond.text = user.diamond+"";
        this._view.tfMoney.text = user.gold+"";
    }

    protected initEvent():void{
        xframe.XEvent.instance.on(User.UPDATE, this, this.onUpdte);
        this._view.on(Laya.Event.CLICK, this, this.onClick)
    }

    protected removeEvent():void{
        xframe.XEvent.instance.off(User.UPDATE, this, this.onUpdte);
        this._view.off(Laya.Event.CLICK, this, this.onClick)
    }
}