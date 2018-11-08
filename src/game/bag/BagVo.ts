/*
* name;
*/
class BagVo{
    public itemsList:ItemVo[] = [];
    constructor(data?:any){
        for(let i in data){
            this[i] = data[i];
        }
    }

    public getItemByType(type:number):ItemVo[]{
        let items:ItemVo[] = [];
        for(let i in this.itemsList){
            if(this.itemsList[i].type == type){
                items.push(this.itemsList[i]);
            }
        }
        return items;
    }
}