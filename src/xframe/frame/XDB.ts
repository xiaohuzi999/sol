/*
* name;数据管理
*/
class XDB{
    /**KEY-USER INFO */
    public static readonly USER:string = "user";
    /**HEROS */
    public static readonly HERO:string = "hero";
    /**PET */
    public static readonly PET:string = "pet";
    /**KEY-ROLE INFO */
    public static readonly ROLE:string = "role";
    /**KEY-BAG */
    public static readonly BAG:string = "bag";
    /**unique id index */
    private static _uniqueIndex:number = 0;
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

    public static get uid():number{
        return this._uniqueIndex++;
    }
}