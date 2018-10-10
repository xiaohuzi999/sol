/**
 * Created by 马达加加加 on 2015/6/2.
 * 战斗逻辑,静态
 */
class FightModel{
    //当前战斗数据
    private static _curretnData:any;
    //主队
    private static _home:Role[];
    //客队
    private static _away:Role[];
    //战斗队列
    private static _fightList:Role[];
    //等待参战的角色;
    private static _waitList:Role[];
    //当前操作对象
    private static _currentRole:Role;
    //当前回合
    private static _currentRnd:number;

    /**NPC总数据*/
    private static _npcData:any;
    /**精英怪数据*/
    private static _exNpcData:any;

    /**事件-轮到某个角色行动*/
    public static TURN:string = "turn";
    /**事件-更新战斗消息*/
    public static UPDATEINFO:string = "updateinfo";
    /**事件-胜利*/
    public static WIN:string = "win";
    /**事件-失败*/
    public static LOSE:string = "lose";

    /**
     * 初始化话
     * @param homeTeam 主队
     * @param awayTeam 客队
     * */
    public static initFight(homeTeam:Role[], awayTeam:Role[]):void{
        this._currentRnd = 0;
        this._home = new Array();
        for(var i:number=0; i<homeTeam.length; i++){
            this._home.push(xframe.XUtils.clone(homeTeam[i]));
            this._home[i].power = 0;
        }
        this._away = new Array();
        for(var i:number=0; i<awayTeam.length; i++){
            this._away.push(xframe.XUtils.clone(awayTeam[i]));
            this._away[i].isNpc = true;
            this._away[i].power = 0;
            this._away[i].fightTeam = 1;
        }
        this._away = this._away.reverse();
        this._fightList = this._home.concat(this._away);
        //战斗排序方式有待考虑
        //this._fightList.sort(this.sortOnSpeed);
        this._waitList = this._fightList.slice(0, this._fightList.length);
        trace("initFight___________________", JSON.stringify(this._waitList));
        //this.startFight();
    }
    /***/
    private static sortOnSpeed(roleA:Role,roleB:Role){
        if(roleA.speed > roleB.speed){
            return 1;
        }
        return -1;
    }

    /**
     * 开始战斗
     */
    public static startFight():void{
        //console.log("startFight============================")
        var role:Role = this._waitList.shift();
        if(role.fightState == Role.FS_DIZZY){
            trace("some one dizzy---------------------------------")
            this.actionComplete();
        }else{
            this._currentRole = role;
            this.excuteAI(role);
        }
    }

    /**操作结束——单次操作结束*/
    public static actionComplete():void{
        //已经产生结果,需要生成结果==========================================
        if(this._home.length == 0){//结果
            xframe.XEvent.instance.event(FightModel.LOSE);
        }else if(this._away.length == 0) {
            var reward:any = {};
            var rewardInfo: any;
            //金钱
            //reward.money = parseInt(reward.money + "");
            //道具==================================
            reward.items = new Array();
            /**加入背包*/
            //
            //修改用户状态
            User.getInstance().money += reward.money;
            //
            xframe.XEvent.instance.event(FightModel.WIN, reward);
        }else{
            //
            if(this._waitList.length == 0){//回合结束
                this._waitList = this._fightList.slice(0, this._fightList.length);

                 //更新BUFF回合数;
                for(let i in this._buffInfo){
                for(let j in this._buffInfo[i]){
                    let info:any[] = this._buffInfo[i][j];
                    if(info){
                        info[0] ++;
                        if(info[0] > info[1]){
                            //状态解除
                            let role:Role = this.getRole(i);
                            if(role.fightState != Role.FS_NORMAL && info[2] == role.fightState){
                                role.fightState = Role.FS_NORMAL
                            }
                            //扔掉数据
                            delete this._buffInfo[i][j];
                            trace("删除BUFF——————", i,j);
                        }
                    }
                }
                }
            }
            this.startFight();
        }
    }

    /**
     * 玩家操作
     * @param action 玩家动作
     * @param targetId 目标对象ID
     * @param skillId技能ID,当action为技能时有效
     */
    public static doAction(action:string, targetId:string, skillId?:string):void{
        var target:Role;
        for(var i:number=0; i<this._fightList.length; i++){
            if(this._fightList[i].uid == targetId){
                target = this._fightList[i];
                break;
            }
        }
        this.excuteAI(this._currentRole, target, action, skillId )
    }

    /**
     * 执行AI逻辑*
     * @param target可选，不传表示AI托管
     * @param action动作
     * @param skillId 技能ID
     */
    public static excuteAI(role:Role, target?:Role, action?:string, skillId?:string):void{
        var vo:FightVo = new FightVo();
        vo.nowId = this._currentRole.uid;
        var list:Role[];
        //1，判定对象，可能受技能影响--------------------------
        if(!target){
            if(this._home.indexOf(role) != -1){//主队//改成第一个目标了
                target = this._away[0];
               // target = FightModel._away[FightModel.getRnd(FightModel._away.length)];
            }else{
                target = this._home[0];
               // target = FightModel._home[FightModel.getRnd(FightModel._home.length)];
            }
        }
        //2,操作------------------------------------------------
        if(action){//指定操作
            if(action == FightVo.ATTACK){
                this.exAttack(this._currentRole, target, vo);
            }else if(action == FightVo.SKILL){
                list = this.exSkill(this._currentRole, vo);
                //console.log(list.length,JSON.stringify(list))
            }
        }else{//AI托管
            list = this.exSkill(this._currentRole, vo);
            /*
            if(target.fightTeam == this._currentRole.fightTeam){//同队伍，暂时不处理----------------------------
                console.log("Special skill")
            }else{
                this.exAttack(this._currentRole, target, vo)
            }
            */
        }
        //3，操作结果------------------------------------------------
        if(list && list.length >0){
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxo",list.length);
            var len:number = list.length;
            var ids:string[]=[]
            for(var i=0; i<len; i++){
                ids.push(list[i].uid)
            }
            for(var i=0; i<len; i++){
                target = this.getRole(ids[i]);
                if(target.hp <= 0){
                    //console.log("xxxxxxxxxxxxxxxxx",i)
                    xframe.XUtils.delArrItem(this._fightList, target);
                    xframe.XUtils.delArrItem(this._waitList, target);
                    xframe.XUtils.delArrItem(this._home, target);
                    xframe.XUtils.delArrItem(this._away, target);
                }
            }
        }else{
            if(target.hp <= 0){
                xframe.XUtils.delArrItem(this._fightList, target);
                xframe.XUtils.delArrItem(this._waitList, target);
                xframe.XUtils.delArrItem(this._home, target);
                xframe.XUtils.delArrItem(this._away, target);
            }
        }
        //4,小回合结束，派发事件
        vo.rId  = FightModel._currentRnd;
        if(FightModel._waitList.length == 0) {//回合结束
            vo.isRndOver = true;
            FightModel._currentRnd ++;
        }
        xframe.XEvent.instance.event(FightModel.UPDATEINFO, vo);
        //console.log("excuteAI=====================================")
    }

    //
    private static getRole(roleId:string):Role{
        for(var i in FightModel._fightList){
            if(FightModel._fightList[i].uid == roleId){
                return FightModel._fightList[i];
            }
        }
        return null;
    }

    /**执行普通攻击*/
    private static exAttack(attRole:Role, beAttRole:Role, vo:FightVo):void{
        //：伤害=（（人物攻击+装备攻击+技能加成1）*（1+技能加成2）*5-（人物防御+装备防御+技能加成1）*（1+技能加成2）*2）*（1+伤害增幅）*（1+暴击加成）
        //var hurt:number = attRole.attack - beAttRole.defend*0.6;//防御系数0.6;
        var hurt:number = Math.floor(attRole.attack);
        //生成随机数值
        var rnd:number = Math.random()*100;
        //暴击闪避处理==========================================================
        if(rnd<=attRole.crit){//暴击,200%~250%
            vo.showType = FightVo.CRIT;
            hurt *= 2 + (rnd * 0.005);
        }else if(rnd < beAttRole.dodge){//闪避,如果超过100,永远不miss
            vo.showType = FightVo.MISS;
            hurt = 0;
        }
        hurt = Math.floor(hurt);
        if(vo.showType != FightVo.MISS && hurt <=0){
            hurt = 1;
        }
        beAttRole.hp = beAttRole.hp - hurt;
        if(beAttRole.hp < 0){
            beAttRole.hp = 0;
        }
        //生成操作列表
        vo.action = FightVo.ATTACK;
        vo.fightInfo[beAttRole.uid] = {"hp":beAttRole.hp};
    }

    /**执行技能攻击,新核心*/
    private static _buffInfo:any = {};
    private static exSkill(skillRole:Role, vo?:FightVo):any {
        trace("skillRole.power========",skillRole.power)
        //寻找当前能执行的技能；
        var list:any = skillRole.skills;
        for(let i=list.length-1; i>-1; i--){
            var skillData:SkillVo = DBSkill.getSkill(list[i]);
            if(skillData && skillRole.power >= skillData.power){
                break;
            }
        }
        if(!skillData){
            skillData =  {id:101, name:"T01", num:1,target:2, type:1, rate:1, power:0, addPower:50};
        }
        trace("exSkill::",skillData.name);

        //寻找目标==========================================================
        var targets:Role[] = [];
         let tmp:Role[];
        //本方
        if(skillData.target == SkillVo.TARGET_HOME){
            if(skillData.num == 1){
                targets.push(skillRole)
            }else{
                for(let i=0; i<skillData.num; i++){
                    if(skillRole.isNpc){
                        this._away[i] && targets.push(this._away[i])
                    }else{
                        this._home[i] && targets.push(this._home[i])
                    }
                }
            }
        }
        //对方
        else if(skillData.target == SkillVo.TARGET_AWAY){
            for(let i=0; i<skillData.num; i++){
                if(skillRole.isNpc){
                    this._home[i] && targets.push(this._home[i])
                }else{
                    this._away[i] && targets.push(this._away[i])
                }
            }
        }
        //本方随机
        else if(skillData.target == SkillVo.TARGET_H_RAN){
            for(let i=0; i<skillData.num; i++){
                if(skillRole.isNpc){
                    tmp = xframe.XUtils.randomArr(this._away)
                }else{
                    tmp = xframe.XUtils.randomArr(this._home)
                }
                if(tmp[i]){
                    targets.push(this._home[i])
                }else{
                    break;
                }
            }
        }
        //对方随机
        else if(skillData.target == SkillVo.TARGET_A_RAN){
            for(let i=0; i<skillData.num; i++){
                if(skillRole.isNpc){
                    tmp = xframe.XUtils.randomArr(this._home)
                }else{
                    tmp = xframe.XUtils.randomArr(this._away)
                }
                if(tmp[i]){
                    targets.push(this._home[i])
                }else{
                    break;
                }
            }
        }
        //缺2中情况
        

        //技能效果(伤害)解析==============================================================
        for(let i=0; i<targets.length; i++){
            //计算伤害=============
            var hurt:number = skillRole.attack * skillData.rate;     
            hurt = this.getHurt(this._buffInfo[skillRole.uid], hurt);
            //BUFF伤害加成；
            hurt = parseInt(hurt+"");   
            if(hurt > 0){
                //TODO：BUFF减伤；
                targets[i].hp = Math.max(0, targets[i].hp - hurt);
                vo.fightInfo[targets[i].uid] = {"hp":targets[i].hp};
            }
            targets[i].power += 10;
        }

        //BUFF解析===============================================================
        if(skillData.buff){
            let makeBuff:boolean = Math.random() < skillData.buffRate;
            if(makeBuff){
                let buffData:BuffVo = DBBuff.getBuff(skillData.buff);
                if(buffData){
                    let tmp:Role[];
                    if(buffData.target == BuffVo.TARGET_HOME){
                        if(buffData.num == 1){
                            this.addBuff(skillRole, buffData);
                        }else{
                            tmp = skillRole.isNpc?this._away:this._home;
                            for(let i=0; i<tmp.length; i++){
                                this.addBuff(tmp[i], buffData);
                            }
                        }
                    }else if(buffData.target == BuffVo.TARGET_AWAY){
                        if(buffData.num == 1){
                            this.addBuff(targets[0], buffData);
                        }else{
                            tmp = skillRole.isNpc?this._home:this._away;
                            for(let i=0; i<tmp.length; i++){
                                this.addBuff(tmp[i], buffData);
                            }
                        }
                    }
                }
            }
        }

        
        skillRole.power -= skillData.power;
        skillRole.power += skillData.addPower
        //生成操作列表
        vo.action = FightVo.SKILL;
        vo.skillId = skillData.id+"";
        return targets;
    }

    /**加BUFF */
    private static addBuff(role:Role, buff:BuffVo):void{
        trace("加BUFF======================", role.uid, buff.id)
        if(!this._buffInfo[role.uid]){
            this._buffInfo[role.uid] = {};
        }
        //todo同类BUFF重复加的问题
        //格式【当前回合，持续回合, BUFF附加状态】
        let state:number = Role.FS_NORMAL
        if(buff.type == BuffVo.TYPE_DIZZY){
            state = Role.FS_DIZZY;
            role.fightState = state;
            trace("sb has dizzied......................",buff)
        }else if(buff.type == BuffVo.TYPE_CHAOS){
            state = Role.FS_CHAOS
            role.fightState = state;
        }
        this._buffInfo[role.uid][buff.id] = [0, buff.rnd, state];
    }

    /**辅助-计算BUFF伤害加成 */
    private static getHurt(buffInfo:any, srcHurt:number):number{
        var nowHurt:number = srcHurt;
        for(var i in buffInfo){
            if(i.charAt(0) == BuffVo.TYPE_ATT+""){
                let buff:BuffVo = DBBuff.getBuff(i);
                if(buff.value && buff.value.attack){
                    let val:string = buff.value.attack;
                    if(val.indexOf("%") != -1){
                        val = val.substr(0, val.length-1);
                        nowHurt = srcHurt*(1+parseFloat(val)/100);
                    }else{
                        nowHurt += parseFloat(val);
                    }
                }
            }
        }
        trace("getHurt............", srcHurt, nowHurt);
        return nowHurt;
    }


    /**辅助-取随机数0----num-1*/
    private static getRnd(num:number):number{
        return Math.floor(Math.random()*num);
    }

    /**获取战斗列表----战斗需要进行配置*/
    public static initNpcData(str:string):void{
        FightModel._npcData = JSON.parse(str);
    }

    /**初始化NPC*/
    public static initNpc(fighters:string):Role[]{
        var fighterList:string[] = fighters.split("|");
        var arr:Role[] = [];
        var vo:Role;
        var index:number = 1000;
        for(var i:number=0; i<fighterList.length; i++){
            vo = DBMonster.calcTotalPro(fighterList[i]);
            vo.uid = index++;
            arr.push(vo);
        }
        return arr;
    }
}