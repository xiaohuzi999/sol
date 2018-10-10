/*
* name;
*/
class SkillVo{
    //num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例, power消耗能量
    public id:number;
    public name:string;
    public num:number;

    public target:number;

    public type:number;
    public rate:number;
    public power:number;
    public addPower:number;
    public buff?:number;
    public buffRate?:number

    
    //target 作用对象，1-己方，2-对方，0-不限
    public static readonly TARGET_ALL:number = 0;
    public static readonly TARGET_HOME:number = 1;
    public static readonly TARGET_AWAY:number = 2;
    //本方随机；
    public static readonly TARGET_H_RAN:number = 3;
    //对方方随机；
    public static readonly TARGET_A_RAN:number = 4;
    //本方HP最少
    public static readonly TARGET_H_HP:number = 5;
    //对方HP最少
    public static readonly TARGET_A_HP:number = 6;

    
    public static readonly TYPE_HURT:number = 1;
    public static readonly TYPE_DIZZY:number = 2;
    public static readonly TYPE_CHAOS:number = 3;
    constructor(){

    }
}