/**
 * Created by Administrator on 15-6-2.
 */
class FightVo{
    //
    public nowId:string;
    //操作
    public action:string;
    //技能ID
    public skillId:string;
    //表现类型=-
    public showType:string = "0";
    //结果，数组,形如{1:{hp:30}};
    public fightInfo:any = {};
    //回合ID
    public rId:number;
    /**是否回合结束*/
    public isRndOver:boolean = false;

    /**动作类型-普通攻击*/
    public static ATTACK:string = "attack";
    /**动作类型-技能*/
    public static SKILL:string = "skill";
    /**动作类型-防御*/
    public static DEFEND:string = "defend";
    /**动作类型-回复*/
    public static RECOVER:string = "recover";

    /**表现类型*/
    public static NORMAL:string = "0";
    /**表现类型-暴击*/
    public static CRIT:string = "1";
    /**表现类型-未命中*/
    public static MISS:string = "2"
}