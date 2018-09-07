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
                this.close();
                xframe.XFacade.instance.showModule(StoryView, Laya.loader.getRes("cfgs/chap_0.txt"));
            break;
        }
    }

    private onUpdte():void{
        var user:User = User.getInstance();
        this._view.tfPower.text = user.power+"";
        this._view.tfDiamond.text = user.diamond+"";
        this._view.tfMoney.text = user.money+"";
    }

    protected createUI():void{
        this._view = new ui.main.MainViewUI();
        this.addChild(this._view);
    }

    protected addEventListener():void{
        this._view.on(Laya.Event.CLICK, this, this.onC);
        xframe.XEvent.instance.on(User.UPDATE, this, this.onUpdte);
    }

    protected removeEventListener():void{
        this._view.off(Laya.Event.CLICK, this, this.onC);
        xframe.XEvent.instance.off(User.UPDATE, this, this.onUpdte);
    }
}