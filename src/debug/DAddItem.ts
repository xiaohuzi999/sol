/*
* name;
*/
class DAddItem extends xframe.XMWindow{
    private _ui:ui.debug.DebugAddItemUI;
    constructor(){
        super();
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this._ui.btnClose:
                this.close();
            break;
            case this._ui.btnGold:
                User.getInstance().gold += 1000;
                User.getInstance().emit();
            break;
            case this._ui.btnDiamond:
                User.getInstance().diamond += 1000;
                User.getInstance().emit();
            break;
        }
    }

    public show():void{
        super.show();
        this._ui.itemList.array = DBItem.getItemList();
    }

    protected createUI():void{
        this._ui = new ui.debug.DebugAddItemUI();
        this.addChild(this._ui);

        this._ui.itemList.vScrollBarSkin = "";
    }

    protected initEvent():void{
        this._ui.on(Laya.Event.CLICK, this, this.onClick)
    }

    protected removeEvent():void{
        this._ui.off(Laya.Event.CLICK, this, this.onClick)
    }
}