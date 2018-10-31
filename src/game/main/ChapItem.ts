/*
* name;
*/
class ChapItem extends ui.main.ChapItemUI{
    private _data:{name:string, id:number, cfg:string}
    constructor(){
        super();
    }

    public set dataSource(data:{name:string, id:number, cfg:string}){
        this._data = data;
        if(data){
            this.tfName.text = data.name+"";
            this.visible = true;
            this.pic.skin = "res/chapter/"+data.id+".png"
        }else{
            this.visible = false;
        }
    }

    public get dataSource():{name:string, id:number, cfg:string}{
        return this._data;
    }
}