/*
* name;
*/
class BuffVo{
    //组成格式：类型+增减(0增，1减)+编号
    public id:number; 
    public name:string;
    public num:number; 
    public target:number; 
    public type:number; 
    //rnd 持续回合
    public rnd:number; 
    public value:any

    //num 作用目标数， target 作用对象，1-己方，2-对方，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    public static readonly TARGET_HOME:number = 1;
    public static readonly TARGET_AWAY:number = 2;

    //type 类型 1，HP增减, 2,attack增减 3，defend增减 4，speed增减, 5，dodge增减， 6，crit增减 7眩晕类 8，混乱类， 9保留 
    public static readonly TYPE_HP:number = 1;
    public static readonly TYPE_ATT:number = 2;
    public static readonly TYPE_DEF:number = 3;
    public static readonly TYPE_SPD:number = 4;
    public static readonly TYPE_DODGE:number = 5;
    public static readonly TYPE_CRIT:number = 6;
    public static readonly TYPE_DIZZY:number = 7;
    public static readonly TYPE_CHAOS:number = 8;

    constructor(){
    }
}