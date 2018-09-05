/**
 * Created by Administrator on 15-5-30.
 */
class RoleVo {
    /**角色ID，唯一*/
    public roleId:string;
    /**角色名*/
    public roleName:string = "XRole";
    /**等级*/
    public quality:string;
    /**头像*/
    public pic:string = "";
    /**战斗形象*/
    public fightPic:string="";
    /**经验*/
    public exp:number = 0;
    /**升级经验*/
    public lvExp:number = 1;
    /**等级*/
    public lv:number = 0;
    /**技能列表*/
    public skills:number[] = new Array();
    /**荣誉称号*/
    public honorLv:number = 1;
    /**荣誉值*/
    public honor:number = 0;
    /**兑换荣誉值*/
    public exHonor:number = 0;
    /**状态--0,离队，1，入队*/
    public state:number = 0;
    //一级属性===================================================
    /**HP*/
    public hp:number = 1;
    /**最大HP*/
    public maxHp:number = 1;
    /**攻击*/
    public attack:number = 1;
    /**防御*/
    public defend:number = 0;
    /**攻击成长*/
    public attackGrow:number = 1;
    /**防御成长*/
    public defendGrow:number = 0;
    /**闪避*/
    public avoid:number = 0;
    /**暴击*/
    public crit:number = 0;
    /**命中*/
    public hitRate:number=0;
    //二级属性==================================================
    /**体质*/
    public physique:number = 0;
    /**敏捷*/
    public agility:number = 0;
    /**体质成长*/
    public physiqueGrow:number = 0;
    /**敏捷成长*/
    public agilityGrow:number = 0;
    /**智力*/
    public mentality:number = 0;
    /**速度*/
    public speed:number = 0;
    //装备，暂时只有一个=============================================
    public weapon:string = "";
    //服务端逻辑用============================================================
    /**是否NPC，即是否采用AI逻辑*/
    public isNpc:boolean = false;
    /**所在队伍*/
    public fightTeam:number = 0;

    public constructor(data:any=null) {
        if(data){
            this.setValue(data);
        }
    }

    /**
     *赋值
     * @param valueObj 值对象,JSON格式化对象
     */
    public setValue(valueObj:any) {
        for(var i in valueObj) {
            //if(this.hasOwnProperty(i)) {
                this[i] = valueObj[i];
            //}
        }
    }
    /**转换成最终属性*/
    public createFighter():RoleVo{
        var vo:RoleVo = this.clone();
        vo.hp = vo.maxHp = Math.round(vo.physique *10);
        //	命中公式：命中率=90%+0.1%*（（人物攻击+装备攻击+技能加成）-（人物防御+装备防御+技能加成））
        vo.hitRate = 90+(vo.attack-vo.defend)*0.001;
        //	暴击率公式：暴击率=10%+0.1%*（（人物敏捷+装备敏捷+技能加成）-（人物防御+装备防御+技能加成））
        vo.crit = 10 + (vo.agility-vo.defend)*0.001;
        if(vo.weapon){
            var tempVo:ItemVo = BagModel.getItemByUUid(vo.weapon);
            if(tempVo){
                var info:any = XUtils.addObject(tempVo.itemProperty, tempVo.itemXProperty);
                if(info.attack){
                    vo.attack += info.attack;
                }
                if(info.defend){
                    vo.defend += info.defend;
                }
                if(info.physique){
                    vo.hp += info.physique*10;
                    vo.maxHp += info.physique*10;
                }
                vo.hitRate = 90+(vo.attack-vo.defend)*0.001;
                vo.crit = 10 + (vo.agility-vo.defend)*0.001;

                info = XUtils.diffObject(tempVo.itemXProperty, tempVo.itemProperty);
                if(info.crit){
                    vo.crit += info.crit
                }
                if(info.hitRate){
                    vo.hitRate += info.hitRate;
                }
            }
        }
        return vo;
    }

    /**克隆*/
    public clone():RoleVo{
        var str:string = JSON.stringify(this);
        return new RoleVo(JSON.parse(str));
    }
}
