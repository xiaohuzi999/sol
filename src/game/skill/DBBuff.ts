/*
* name;
*/
class DBBuff{
    private static _db:any;
    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    public static readonly TARGET_HOME:number = 1;
    public static readonly TARGET_AWAY:number = 2;
    public static readonly TARGET_ALL:number = 0;

    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，增减益 2眩晕类 3，混乱类 rnd 持续回合
    public static readonly TYPE_BUFF:number = 1;
    public static readonly TYPE_DIZZY:number = 2;
    public static readonly TYPE_CHAOS:number = 3;
    constructor(){

    }

    /** */
    public static getBuff(buffId:any):{id:number, name:string, num:number, target:number, type:number, rnd:number, value:any}{
        return this.data[buffId];
    }
    
    private static get data():any{
        if(!this._db){
            this._db = JSON.parse(Laya.loader.getRes("cfgs/buff.txt")+"");
            Laya.loader.clearRes("cfgs/buff.txt");
        }
        return this._db
    }
}