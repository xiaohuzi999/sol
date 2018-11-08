/*
* name;
*/
class DItem extends ui.debug.DebugItemUI{
    private _data:ItemVo;
    constructor(){
        super();
        this.btnAdd.on(Laya.Event.CLICK, this, this.onClick)
    }

    private onClick(e:Laya.Event):void{
        BagReq.addItem(this.dataSource.id);
        xframe.XTip.showTip("增加"+this.dataSource.name+"*1");
    }

    public set dataSource(vo:ItemVo){
        this._data = vo;
        trace("dataSource", vo);
        if(vo){
            this.tfName.text  = vo.name+"";
        }
    }

    public get dataSource():ItemVo{
        return this._data;
    }
}