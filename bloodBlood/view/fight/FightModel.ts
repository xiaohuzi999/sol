/**
 * Created by 马达加加加 on 2015/6/2.
 * 战斗逻辑,静态
 */
class FightModel{
    //当前战斗数据
    private static _curretnData:any;
    //主队
    private static _home:RoleVo[];
    //客队
    private static _away:RoleVo[];
    //战斗队列
    private static _fightList:RoleVo[];
    //等待参战的角色;
    private static _waitList:RoleVo[];
    //当前操作对象
    private static _currentRole:RoleVo;
    //当前回合
    private static _currentRnd:number;
    /**玩家技能id-判定是否使用了技能*/
    private static _roleSkill:string;

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

    //模式配置normal/ex==============================================
    public static FIGHT_MODE:string = "normal";

    /**
     * 初始化话
     * @param homeTeam 主队
     * @param awayTeam 客队
     * */
    public static initFight(homeTeam:RoleVo[], awayTeam:RoleVo[]):void{
        FightModel._currentRnd = 0;
        FightModel._roleSkill = "";
        FightModel._home = new Array();
        for(var i:number=0; i<homeTeam.length; i++){
            FightModel._home.push(homeTeam[i].clone());
        }
        FightModel._away = new Array();
        for(var i:number=0; i<awayTeam.length; i++){
            FightModel._away.push(awayTeam[i].clone());
            FightModel._away[i].isNpc = true;
            FightModel._away[i].fightTeam = 1;
        }
        FightModel._away = FightModel._away.reverse();
        FightModel._fightList = FightModel._home.concat(FightModel._away);
        //战斗排序方式有待考虑
        //FightModel._fightList.sort(FightModel.sortOnSpeed);
        FightModel._waitList = FightModel._fightList.slice(0, FightModel._fightList.length);
        //FightModel.startFight();
    }
    /***/
    private static sortOnSpeed(roleA:RoleVo,roleB:RoleVo){
        if(roleA.speed > roleB.speed){
            return 1;
        }
        return -1;
    }

    /**技能*/
    public static playerSkill(skillId:string):boolean{
        if(!FightModel._roleSkill){
            FightModel._roleSkill = skillId;
            return true;
        }
        return false;
    }

    /**加血*/
    public static recoverHP(itemId:number, roleId:string):void{
        var info:any = ItemData.getItemData(itemId);
        var num = info.itemEffectValue;
        var role:RoleVo;
        for(var i:number=0; i<FightModel._fightList.length; i++){
            if(FightModel._fightList[i].roleId == roleId){
                role = FightModel._fightList[i];
                break;
            }
        }
        if(role){
            role.hp += num;
            if(role.hp > role.maxHp){
                role.hp = role.maxHp;
            }
        }else{
            XTip.showTip("角色已阵亡~");
            return;
        }
        var vo:FightVo = new FightVo();
        vo.nowId = User.getInstance().role.roleId;
        vo.action = FightVo.RECOVER;
        vo.fightInfo[role.roleId] = {"hp":role.hp};
        //1扣道具
        BagModel.delItemByNum(itemId, 1);
        //2,小回合结束，派发事件
        var event:XEvent = new XEvent(FightModel.UPDATEINFO);
        event.data = vo;
        MainDispatcher.getInstance().dispatchEvent(event);
    }

    /**
     * 开始战斗
     */
    public static startFight():void{
        //console.log("startFight============================")
        var role:RoleVo = FightModel._waitList.shift();
        FightModel._currentRole = role;
        if(FightModel._roleSkill && role.roleId == User.getInstance().role.roleId){
            FightModel.excuteAI(role,null,FightVo.SKILL, FightModel._roleSkill);
        }else{
            FightModel.excuteAI(role);
        }
        return;
        //改成自动战斗================================
        if(role.isNpc){//自动操作
            //console.log("npc doing========================")
            FightModel.excuteAI(role)
        }else{//
            var event:XEvent = new XEvent(FightModel.TURN);
            event.data = role.roleId;
            MainDispatcher.getInstance().dispatchEvent(event);
        }
    }

    /**跳过战斗*/
    public static break():void{
        while(!(FightModel._home.length == 0 || FightModel._away.length==0)){
            FightModel.actionComplete();
        }
        FightModel.actionComplete();
    }

    /**操作结束——单次操作借宿*/
    public static actionComplete():void{
        //已经产生结果,需要生成结果==========================================
        if(FightModel._home.length == 0){//结果
            var event:XEvent = new XEvent(FightModel.LOSE);
            MainDispatcher.getInstance().dispatchEvent(event);
        }else if(FightModel._away.length == 0) {
            var reward:any = {};
            var rewardInfo: any;
            //区别普通与精英战斗
            if(FightModel.FIGHT_MODE == "normal"){
                rewardInfo = RewardData.getRewardInfo(FightModel._curretnData.rewardLv);
            }else{
                rewardInfo = RewardData.getEXRewardInfo(FightModel._curretnData.rewardLv);
            }

            //金钱
            reward.money = rewardInfo.moneyMin + Math.random()*(rewardInfo.moneyMax - rewardInfo.moneyMin);
            reward.money = parseInt(reward.money + "");
            //精血精华
            reward.blood = rewardInfo.bloodMin + Math.random()*(rewardInfo.bloodMax - rewardInfo.bloodMin);
            reward.blood = parseInt(reward.blood + "");
            //道具==================================
            reward.items = new Array();
            if(rewardInfo.items.length){
                var rnd:number = Math.random();
                var tempInfo:any;
                //生成列表
                for(var i:number=0; i<rewardInfo.items.length; i++){
                    tempInfo = rewardInfo.items[i];
                    if(tempInfo.rate >= rnd){
                        //叠加
                        var hasSameItem:boolean = false;
                        if(reward.items.length){
                            for(var j:number=0; j<reward.items.length; j++) {
                                if (reward.items[j].itemId == tempInfo.itemId) {
                                    reward.items[j].itemNum += tempInfo.itemNum;
                                    hasSameItem = true;
                                    break;
                                }
                            }
                        }
                        if(!hasSameItem){
                            reward.items.push({itemId:tempInfo.itemId,itemNum:tempInfo.itemNum})
                        }
                    }
                }
            }
            /**加入背包*/
            if(reward.blood){
                BagModel.addItem(ItemData.BLOOD, reward.blood);
            }
            if(reward.items.length > 0 ){
                for(var i:number=0; i<reward.items.length; i++){
                    BagModel.addItem(reward.items[i].itemId, reward.items[i].itemNum)
                }
            }
            //修改用户状态
            User.getInstance().money += reward.money;
            var event:XEvent = new XEvent(FightModel.WIN);
            event.data = reward;
            MainDispatcher.getInstance().dispatchEvent(event);
        }else{
            //
            if(FightModel._waitList.length == 0){//回合结束
                FightModel._waitList = FightModel._fightList.slice(0, FightModel._fightList.length);
            }
            FightModel.startFight();
        }
    }

    /**
     * 玩家操作
     * @param action 玩家动作
     * @param targetId 目标对象ID
     * @param skillId技能ID,当action为技能时有效
     */
    public static doAction(action:string, targetId:string, skillId?:string):void{
        var target:RoleVo;
        for(var i:number=0; i<FightModel._fightList.length; i++){
            if(FightModel._fightList[i].roleId == targetId){
                target = FightModel._fightList[i];
                break;
            }
        }
        FightModel.excuteAI(FightModel._currentRole, target, action, skillId )
    }

    /**
     * 执行AI逻辑*
     * @param target可选，不传表示AI托管
     * @param action动作
     * @param skillId 技能ID
     */
    public static excuteAI(role:RoleVo, target?:RoleVo, action?:string, skillId?:string):void{
        var vo:FightVo = new FightVo();
        vo.nowId = FightModel._currentRole.roleId;
        var list:RoleVo[];
        //1，判定对象，可能受技能影响--------------------------
        if(!target){
            if(FightModel._home.indexOf(role) != -1){//主队//改成第一个目标了
                target = FightModel._away[0/*FightModel.getRnd(FightModel._away.length)*/];
               // target = FightModel._away[FightModel.getRnd(FightModel._away.length)];
            }else{
                target = FightModel._home[0/*FightModel.getRnd(FightModel._home.length)*/];
               // target = FightModel._home[FightModel.getRnd(FightModel._home.length)];
            }
        }
        //2,操作------------------------------------------------
        if(action){//指定操作
            if(action == FightVo.ATTACK){
                FightModel.exAttack(FightModel._currentRole, target, vo);
            }else if(action == FightVo.SKILL){
                list = FightModel.exSkill(FightModel._currentRole, vo);
                //console.log(list.length,JSON.stringify(list))
            }
        }else{//AI托管
            if(target.fightTeam == FightModel._currentRole.fightTeam){//同队伍，暂时不处理----------------------------
                console.log("Special skill")
            }else{
                FightModel.exAttack(FightModel._currentRole, target, vo)
            }
        }
        //3，操作结果------------------------------------------------
        if(list && list.length >0){
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxo",list.length);
            var len:number = list.length;
            var ids:string[]=[]
            for(var i=0; i<len; i++){
                ids.push(list[i].roleId)
            }
            for(var i=0; i<len; i++){
                target = FightModel.getRole(ids[i]);
                if(target.hp <= 0){
                    //console.log("xxxxxxxxxxxxxxxxx",i)
                    XUtils.delArrItem(FightModel._fightList, target);
                    XUtils.delArrItem(FightModel._waitList, target);
                    XUtils.delArrItem(FightModel._home, target);
                    XUtils.delArrItem(FightModel._away, target);
                }
            }
        }else{
            if(target.hp <= 0){
                XUtils.delArrItem(FightModel._fightList, target);
                XUtils.delArrItem(FightModel._waitList, target);
                XUtils.delArrItem(FightModel._home, target);
                XUtils.delArrItem(FightModel._away, target);
            }
        }
        //4,小回合结束，派发事件
        var event:XEvent = new XEvent(FightModel.UPDATEINFO);
        vo.rId  = FightModel._currentRnd;
        if(FightModel._waitList.length == 0) {//回合结束
            vo.isRndOver = true;
            FightModel._currentRnd ++;
        }
        event.data = vo;
        MainDispatcher.getInstance().dispatchEvent(event);
        //console.log("excuteAI=====================================")
    }

    //
    private static getRole(roleId:string):RoleVo{
        for(var i in FightModel._fightList){
            if(FightModel._fightList[i].roleId == roleId){
                return FightModel._fightList[i];
            }
        }
        return null;
    }

    /**执行普通攻击*/
    private static exAttack(attRole:RoleVo, beAttRole:RoleVo, vo:FightVo):void{
        //：伤害=（（人物攻击+装备攻击+技能加成1）*（1+技能加成2）*5-（人物防御+装备防御+技能加成1）*（1+技能加成2）*2）*（1+伤害增幅）*（1+暴击加成）
        //var hurt:number = attRole.attack - beAttRole.defend*0.6;//防御系数0.6;
        var hurt:number = attRole.attack *5 - beAttRole.defend*2;
        hurt = parseInt(hurt+"");
        //生成随机数值
        var rnd:number = Math.random()*100;
        //暴击闪避处理==========================================================
        if(rnd<=attRole.crit){//暴击,200%~250%
            vo.showType = FightVo.CRIT;
            hurt *= 2 + (rnd * 0.005);
        }else if(rnd > attRole.hitRate){//miss,如果超过100,永远不miss
            vo.showType = FightVo.MISS;
            hurt = 0;
        }
        hurt = parseInt(hurt+"");
        if(vo.showType != FightVo.MISS && hurt <=0){
            hurt = 1;
        }
        beAttRole.hp = beAttRole.hp - hurt;
        if(beAttRole.hp < 0){
            beAttRole.hp = 0;
        }
        //生成操作列表
        vo.action = FightVo.ATTACK;
        vo.fightInfo[beAttRole.roleId] = {"hp":beAttRole.hp};
    }

    /**执行技能攻击*/
    private static exSkill(skillRole:RoleVo, vo:FightVo):any {
        var skillData:any = SkillData.getSkillInfo(FightModel._roleSkill);
        var targets:RoleVo[] = new Array();
        if(skillData.skillType == SkillType.ONE){
            if(FightModel._home.indexOf(skillRole) != -1){
                targets = [FightModel._away[0]];
            }else{
                targets = [FightModel._home[0]];
            }
        }else if(skillData.skillType == SkillType.ALL){
            if(FightModel._home.indexOf(skillRole) != -1){
                targets = FightModel._away;
            }else{
                targets = FightModel._home;
            }
        }

        for(var i:number=0; i<targets.length; i++){
            var hurt:number = skillRole.attack * (skillData.skillEffect/100)*5 -targets[i].defend*2 ;           //伤害=（（人物攻击+装备攻击+技能加成1）*（1+技能加成2）*5-（人物防御+装备防御+技能加成1）*（1+技能加成2）*2）*（1+伤害增幅）*（1+暴击加成）

            hurt = parseInt(hurt+"");
            if(hurt <=0){
                hurt = 1;
            }
            targets[i].hp = targets[i].hp - hurt;
            if(targets[i].hp < 0){
                targets[i].hp = 0;
            }
            vo.fightInfo[targets[i].roleId] = {"hp":targets[i].hp};
        }
        //生成操作列表
        vo.action = FightVo.SKILL;
        vo.skillId = FightModel._roleSkill;
        FightModel._roleSkill = "";
        return targets;
    }


    /**辅助-取随机数0----num-1*/
    private static getRnd(num:number):number{
        var temp:number = Math.random()*num;
        return parseInt(temp+"");
    }

    public static getNpcData(npcId:string):any{
        return FightModel._npcData[npcId]
    }

    /**获取战斗列表----战斗需要进行配置*/
    public static initNpcData(str:string):void{
        FightModel._npcData = JSON.parse(str);
    }

    public static getEXNpcData(npcId:string):any{
        return FightModel._npcData[npcId]
    }

    /**获取战斗列表----战斗需要进行配置*/
    public static initEXNpcData(str:string):void{
        if(!FightModel._exNpcData){
            FightModel._exNpcData = JSON.parse(str);
        }
    }

    /**初始化NPC*/
    public static initNpc(fighters:string):RoleVo[]{
        var fighterList:string[] = fighters.split("|");
        var arr:RoleVo[] = new Array();
        var vo:RoleVo;
        for(var i:number=0; i<fighterList.length; i++){
            var fightId:string = fighterList[i];
            var info:any


            //普通精英副本区别==============================
            if(FightModel.FIGHT_MODE == "normal"){
                info = FightModel._npcData[fightId];
            }else if(FightModel.FIGHT_MODE == "ex"){
                info = FightModel._exNpcData[fightId];
            }



            FightModel._curretnData = info;
            if(info){
                var num:number = parseInt((info.npcType+"").charAt(1));
                if(fighterList.length == 1 && num > fighterList.length){//小兵
                    for(var i:number=0; i<num; i++){
                        vo = new RoleVo;
                        vo.roleName = info.npcName;
                        vo.hp = vo.maxHp = info.physique * 10;
                        vo.attack = info.attack;
                        vo.defend = info.defend;
                        vo.agility = info.agility;
                        vo.pic = info.pic;
                        vo.roleId = GUID.create();
                        vo.hitRate = 90+(vo.attack-vo.agility)*0.001;
                        arr.push(vo);
                    }
                }else{
                    vo = new RoleVo;
                    vo.roleName = info.npcName;
                    vo.hp = vo.maxHp = info.physique * 10;
                    vo.attack = info.attack;
                    vo.defend = info.defend;
                    vo.agility = info.agility;
                    vo.pic = info.pic;
                    vo.roleId = GUID.create();
                    vo.hitRate = 90+(vo.attack-vo.agility)*0.001;
                    arr.push(vo);
                }
            }
        }
        return arr;
    }
}