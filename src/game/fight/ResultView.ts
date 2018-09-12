/*
* name;
*/
class ResultView extends xframe.XMWindow{
    protected _view:ui.fight.ResultUI;
    constructor(){
        super();
        this.bgAlpha = .5;
    }

    public show():void{
        super.show();
        xframe.AniUtil.flowIn(this);
    }

    public close():void{
        xframe.AniUtil.flowOut(this, Handler.create(null, ()=>{
            super.close();
        }))
    }

    protected createUI():void{
        this._view = new ui.fight.ResultUI();
        this.addChild(this._view);
        this.closeOnBlank = true;
    }
}