/*
* name;
*/
class BagItem extends ui.bag.BagItemUI{
    private _vo:ItemVo;
    constructor(){
        super();
        this.dataSource;
    }

    public set dataSource(vo:ItemVo){
        this._vo = vo;
        if(vo){
            this.tfName.text = vo.name +"";
        }
        this.item.dataSource = vo;
    }

    public get dataSource():ItemVo{
        return this._vo;
    }
}