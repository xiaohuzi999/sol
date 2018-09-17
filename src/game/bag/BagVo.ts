/*
* name;
*/
class BagVo{
    public itemsList:ItemVo[];
    constructor(data?:any){
        for(let i in data){
            this[i] = data[i];
        }
    }
}