/*
* name;
*/
class BagReq{
    public static vo:BagVo;
    /**时间-更新 */
    public static readonly UPDATE:string = "b_update";
    constructor(){

    }

    /** */
    public static getBagInfo(cb:Handler):void{
        this.vo = new BagVo(XDB.getData(XDB.BAG));
        this.vo.itemsList || (this.vo.itemsList = []);
        this.vo.itemsList.push(DBItem.createItem(101,10));
        this.vo.itemsList.push(DBItem.createItem(201,1));
        cb.runWith(this.vo);
        
    }

    /** add item*/
    public static addItem(id:number, num:number = 1):void{
        //判定是否可以叠加
        let itemDB:ItemVo = DBItem.getItemDB(id);
        let item:ItemVo;
        if(itemDB.max == 1){
            item = DBItem.createItem(id, num);
            this.vo.itemsList.push(item);
        }else{
            item = this.getItems(id)[0];
            if(item){
                item.num = item.num + num;
            }
        }
        //更新表现===
        xframe.XEvent.instance.event(this.UPDATE);
        //保存数据==
    }

    /**delete items */
    public static delItem(id:number, num:number = 1):void{
        let item:ItemVo = this.getItems(id)[0];
        if(item){
            item.num = item.num - num;
            if(item.num <= 0){
                for(let i=0; i<this.vo.itemsList.length; i++){
                    if(this.vo.itemsList[i].uid == item.uid){
                        this.vo.itemsList.splice(i, 1);
                        break;
                    }
                }
            }
            //更新表现===
            xframe.XEvent.instance.event(this.UPDATE);
            //保存数据==
        }
    }

    /**get items by item id */
    public static getItems(id:number):ItemVo[]{
        let items:ItemVo[] = [];
        for(let i in this.vo.itemsList){
            if(this.vo.itemsList[i].id == id){
                items.push(this.vo.itemsList[i]);
            }
        }
        return items;
    }

    /**get item by uid */
    public static getItemByUid(uid:number):ItemVo{
        for(let i in this.vo.itemsList){
            if(this.vo.itemsList[i].id ==uid){
                return this.vo.itemsList[i];
            }
        }
    }
}