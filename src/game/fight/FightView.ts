/*
* name;
*/
class FightView extends xframe.XWindow{
    protected _view:ui.fight.FightViewUI;
    constructor(){
        super();
    }

    public show(...args):void{
        super.show();
        trace("FightView::",args[0]);
        //====
        trace("monster==========>>", DBMonster.calcTotalPro(args[0]));
    }

    protected createUI():void{
        this._view = new ui.fight.FightViewUI();
        this.addChild(this._view);
    }
}