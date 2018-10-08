/*
* name;
*/
class DBSkill{
    private static _db:any;
    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    public static readonly TARGET_HOME:number = 1;
    public static readonly TARGET_AWAY:number = 2;
    public static readonly TARGET_ALL:number = 0;
    //本方随机；
    //public static readonly TARGET_RAN:number = 3;
    //对方方随机；
    //public static readonly TARGET_RAN2:number = 4;
    //本方HP最少
    //public static readonly TARGET_HP:number = 5;
    //对方HP最少
    //public static readonly TARGET_HP2:number = 6;

    public static readonly TYPE_HURT:number = 1;
    public static readonly TYPE_DIZZY:number = 2;
    public static readonly TYPE_CHAOS:number = 3;
    constructor(){

    }

    /** */
    public static getSkill(skillId:any):{id:number, name:string, num:number,target:number, type:number, rate:number, power:number, addPower:number, buff?:number, buffRate?:number}{
        return this.data[skillId];
    }
    
    private static get data():any{
        if(!this._db){
            this._db = JSON.parse(Laya.loader.getRes("cfgs/skill.txt")+"");
            Laya.loader.clearRes("cfgs/skill.txt");
        }
        return this._db
    }
}