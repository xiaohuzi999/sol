/**
 * Created by 马达加加加 on 2015/6/2.
 * 战斗逻辑,静态
 */
var FightModel = /** @class */ (function () {
    function FightModel() {
    }
    /**
     * 初始化话
     * @param homeTeam 主队
     * @param awayTeam 客队
     * */
    FightModel.initFight = function (homeTeam, awayTeam) {
        this._currentRnd = 0;
        this._roleSkill = "";
        this._home = new Array();
        for (var i = 0; i < homeTeam.length; i++) {
            this._home.push(xframe.XUtils.clone(homeTeam[i]));
        }
        this._away = new Array();
        for (var i = 0; i < awayTeam.length; i++) {
            this._away.push(xframe.XUtils.clone(awayTeam[i]));
            this._away[i].isNpc = true;
            this._away[i].fightTeam = 1;
        }
        this._away = this._away.reverse();
        this._fightList = this._home.concat(this._away);
        //战斗排序方式有待考虑
        //this._fightList.sort(this.sortOnSpeed);
        this._waitList = this._fightList.slice(0, this._fightList.length);
        trace("initFight___________________", JSON.stringify(this._waitList));
        //this.startFight();
    };
    /***/
    FightModel.sortOnSpeed = function (roleA, roleB) {
        if (roleA.speed > roleB.speed) {
            return 1;
        }
        return -1;
    };
    /**技能*/
    FightModel.playerSkill = function (skillId) {
        if (!this._roleSkill) {
            this._roleSkill = skillId;
            return true;
        }
        return false;
    };
    /**加血*/
    /*
    public static recoverHP(itemId:number, roleId:string):void{
        var info:any = ItemData.getItemData(itemId);
        var num = info.itemEffectValue;
        var role:Role;
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
    */
    /**
     * 开始战斗
     */
    FightModel.startFight = function () {
        //console.log("startFight============================")
        var role = this._waitList.shift();
        this._currentRole = role;
        if (this._roleSkill && role.uid == User.getInstance().role.uid) {
            this.excuteAI(role, null, FightVo.SKILL, this._roleSkill);
        }
        else {
            this.excuteAI(role);
        }
        return;
        /*
        //改成自动战斗================================
        if(role.isNpc){//自动操作
            //console.log("npc doing========================")
            FightModel.excuteAI(role)
        }else{//
            var event:XEvent = new XEvent(FightModel.TURN);
            event.data = role.roleId;
            MainDispatcher.getInstance().dispatchEvent(event);
        }
        */
    };
    /**跳过战斗*/
    FightModel.break = function () {
        while (!(this._home.length == 0 || this._away.length == 0)) {
            this.actionComplete();
        }
        this.actionComplete();
    };
    /**操作结束——单次操作结束*/
    FightModel.actionComplete = function () {
        //已经产生结果,需要生成结果==========================================
        if (this._home.length == 0) { //结果
            xframe.XEvent.instance.event(FightModel.LOSE);
        }
        else if (this._away.length == 0) {
            var reward = {};
            var rewardInfo;
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
        }
        else {
            //
            if (this._waitList.length == 0) { //回合结束
                trace("回合结束===============================================");
                this._waitList = this._fightList.slice(0, this._fightList.length);
            }
            this.startFight();
        }
    };
    /**
     * 玩家操作
     * @param action 玩家动作
     * @param targetId 目标对象ID
     * @param skillId技能ID,当action为技能时有效
     */
    FightModel.doAction = function (action, targetId, skillId) {
        var target;
        for (var i = 0; i < this._fightList.length; i++) {
            if (this._fightList[i].uid == targetId) {
                target = this._fightList[i];
                break;
            }
        }
        this.excuteAI(this._currentRole, target, action, skillId);
    };
    /**
     * 执行AI逻辑*
     * @param target可选，不传表示AI托管
     * @param action动作
     * @param skillId 技能ID
     */
    FightModel.excuteAI = function (role, target, action, skillId) {
        var vo = new FightVo();
        vo.nowId = this._currentRole.uid;
        var list;
        //1，判定对象，可能受技能影响--------------------------
        if (!target) {
            if (this._home.indexOf(role) != -1) { //主队//改成第一个目标了
                target = this._away[0 /*FightModel.getRnd(FightModel._away.length)*/];
                // target = FightModel._away[FightModel.getRnd(FightModel._away.length)];
            }
            else {
                target = this._home[0 /*FightModel.getRnd(FightModel._home.length)*/];
                // target = FightModel._home[FightModel.getRnd(FightModel._home.length)];
            }
        }
        //2,操作------------------------------------------------
        if (action) { //指定操作
            if (action == FightVo.ATTACK) {
                this.exAttack(this._currentRole, target, vo);
            }
            else if (action == FightVo.SKILL) {
                list = this.exSkill(this._currentRole, vo);
                //console.log(list.length,JSON.stringify(list))
            }
        }
        else { //AI托管
            if (target.fightTeam == this._currentRole.fightTeam) { //同队伍，暂时不处理----------------------------
                console.log("Special skill");
            }
            else {
                this.exAttack(this._currentRole, target, vo);
            }
        }
        //3，操作结果------------------------------------------------
        if (list && list.length > 0) {
            //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxo",list.length);
            var len = list.length;
            var ids = [];
            for (var i = 0; i < len; i++) {
                ids.push(list[i].uid);
            }
            for (var i = 0; i < len; i++) {
                target = this.getRole(ids[i]);
                if (target.hp <= 0) {
                    //console.log("xxxxxxxxxxxxxxxxx",i)
                    xframe.XUtils.delArrItem(this._fightList, target);
                    xframe.XUtils.delArrItem(this._waitList, target);
                    xframe.XUtils.delArrItem(this._home, target);
                    xframe.XUtils.delArrItem(this._away, target);
                }
            }
        }
        else {
            if (target.hp <= 0) {
                xframe.XUtils.delArrItem(this._fightList, target);
                xframe.XUtils.delArrItem(this._waitList, target);
                xframe.XUtils.delArrItem(this._home, target);
                xframe.XUtils.delArrItem(this._away, target);
            }
        }
        //4,小回合结束，派发事件
        vo.rId = FightModel._currentRnd;
        if (FightModel._waitList.length == 0) { //回合结束
            vo.isRndOver = true;
            FightModel._currentRnd++;
        }
        xframe.XEvent.instance.event(FightModel.UPDATEINFO, vo);
        //console.log("excuteAI=====================================")
    };
    //
    FightModel.getRole = function (roleId) {
        for (var i in FightModel._fightList) {
            if (FightModel._fightList[i].uid == roleId) {
                return FightModel._fightList[i];
            }
        }
        return null;
    };
    /**执行普通攻击*/
    FightModel.exAttack = function (attRole, beAttRole, vo) {
        //：伤害=（（人物攻击+装备攻击+技能加成1）*（1+技能加成2）*5-（人物防御+装备防御+技能加成1）*（1+技能加成2）*2）*（1+伤害增幅）*（1+暴击加成）
        //var hurt:number = attRole.attack - beAttRole.defend*0.6;//防御系数0.6;
        var hurt = Math.floor(attRole.attack);
        //生成随机数值
        var rnd = Math.random() * 100;
        //暴击闪避处理==========================================================
        if (rnd <= attRole.crit) { //暴击,200%~250%
            vo.showType = FightVo.CRIT;
            hurt *= 2 + (rnd * 0.005);
        }
        else if (rnd < beAttRole.dodge) { //闪避,如果超过100,永远不miss
            vo.showType = FightVo.MISS;
            hurt = 0;
        }
        hurt = Math.floor(hurt);
        if (vo.showType != FightVo.MISS && hurt <= 0) {
            hurt = 1;
        }
        beAttRole.hp = beAttRole.hp - hurt;
        if (beAttRole.hp < 0) {
            beAttRole.hp = 0;
        }
        //生成操作列表
        vo.action = FightVo.ATTACK;
        vo.fightInfo[beAttRole.uid] = { "hp": beAttRole.hp };
    };
    /**执行技能攻击*/
    FightModel.exSkill = function (skillRole, vo) {
        /*
        var skillData:any = SkillData.getSkillInfo(FightModel._roleSkill);
        var targets:Role[] = new Array();
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
            vo.fightInfo[targets[i].uid] = {"hp":targets[i].hp};
        }
        //生成操作列表
        vo.action = FightVo.SKILL;
        vo.skillId = FightModel._roleSkill;
        FightModel._roleSkill = "";
        return targets;
        */
    };
    /**辅助-取随机数0----num-1*/
    FightModel.getRnd = function (num) {
        return Math.floor(Math.random() * num);
    };
    FightModel.getNpcData = function (npcId) {
        return FightModel._npcData[npcId];
    };
    /**获取战斗列表----战斗需要进行配置*/
    FightModel.initNpcData = function (str) {
        FightModel._npcData = JSON.parse(str);
    };
    /**初始化NPC*/
    FightModel.initNpc = function (fighters) {
        var fighterList = fighters.split("|");
        var arr = [];
        var vo;
        var index = 1000;
        for (var i = 0; i < fighterList.length; i++) {
            vo = DBMonster.calcTotalPro(fighterList[i]);
            vo.uid = index++;
            arr.push(vo);
        }
        return arr;
    };
    /**事件-轮到某个角色行动*/
    FightModel.TURN = "turn";
    /**事件-更新战斗消息*/
    FightModel.UPDATEINFO = "updateinfo";
    /**事件-胜利*/
    FightModel.WIN = "win";
    /**事件-失败*/
    FightModel.LOSE = "lose";
    return FightModel;
}());
//# sourceMappingURL=FightModel.js.map