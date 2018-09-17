/*
* name;
*/
class Item extends ui.bag.ItemUI{
    private _data:ItemVo;
    constructor(){
        super();
    }

    public set dataSource(data:ItemVo){
        this._data = data;
        if(this._data){
            this.tfNum.text = data.num +"";
            this.pic.skin = "res/item/"+data.icon+".png";
        }
    }

    public get dataSource():ItemVo{
        return this._data;
    }
}