/*
* name;
*/
class MainMenuView extends xframe.XWindow{
    protected _view:ui.main.MainMenuViewUI;
    protected _curWin:IXWindow;
    constructor(ui:any){
        super();
        this._view = ui;
        this._autoDispose = false;
        this.layer = xframe.LayerManager.LAYER_UI;
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this._view.btnBag:
            this.curWin = xframe.XFacade.instance.getView(BagView);
            break;
            case this._view.btnStory:
            this.curWin = xframe.XFacade.instance.getView(MainView);
            break;
            case this._view.btnUser:
            //this.curWin = xframe.XFacade.instance.getView(UserInfoView);
            xframe.XFacade.instance.showModule(DAddItem);
            break;
        }
    }

    public set curWin(w:any){
        if(this._curWin != w){
            if(this._curWin){
                this._curWin.close();
            }
            this._curWin = w;
            if(this._curWin){
                this._curWin.show();
            }
        }
    }

    public get curWin():any{
        return this._curWin;
    }
    

    protected createUI():void{
        this.addChild(this._view);
        this.mouseThrough = this._view.mouseThrough = true;
        this.curWin = xframe.XFacade.instance.getView(MainView);
    }

    protected initEvent():void{
        this._view.on(Laya.Event.CLICK, this, this.onClick);
    }

    protected removeEvent():void{
        this._view.off(Laya.Event.CLICK, this, this.onClick);
    }
}