/*
* name;数据管理
*/
class XDB{
    /**KEY-USER INFO */
    public static readonly USER:string = "user";
    /**KEY-ROLE INFO */
    public static readonly ROLE:string = "role";
    /**KEY-BAG */
    public static readonly BAG:string = "bag";
    constructor(){

    }

    public static getData(key:string):any{
        return Laya.LocalStorage.getItem(key)
    }

    /**save */
    public static save(key:string, value:any):void{
        if(typeof value === "string"){
            Laya.LocalStorage.setItem(key, value)
        }else{
            Laya.LocalStorage.setItem(key, JSON.stringify(value));
        }
    }
}