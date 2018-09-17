/*
* name;
*/
class DBItem{
    //item database
    private static _db:any;
    constructor(){

    }

    /**获取数据源 */
    public static getItemDB(itemId:any):ItemVo{
        for(let i in this.db){
            if(this.db[i].id == itemId){
                return this.db[i];
            }
        }
    }

    /**生成道具 */
    public static createItem(id:number, num:number):ItemVo{
        var item:ItemVo = xframe.XUtils.clone(this.getItemDB(id));
        item.num = num;
        item.uid = XDB.uid+"";
        return item;
    }



    private static get db():any{
        if(!this._db){
            this._db = JSON.parse(Laya.loader.getRes("cfgs/items.txt")+"");
        }
        return this._db
    }
}