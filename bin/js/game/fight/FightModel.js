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
        this._home = new Array();
        for (var i = 0; i < homeTeam.length; i++) {
            this._home.push(xframe.XUtils.clone(homeTeam[i]));
            this._home[i].power = 0;
        }
        this._away = new Array();
        for (var i = 0; i < awayTeam.length; i++) {
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
    };
    /***/
    FightModel.sortOnSpeed = function (roleA, roleB) {
        if (roleA.speed > roleB.speed) {
            return 1;
        }
        return -1;
    };
    /**
     * 开始战斗
     */
    FightModel.startFight = function () {
        //console.log("startFight============================")
        var role = this._waitList.shift();
        if (role.fightState == Role.FS_DIZZY) {
            trace("some one dizzy---------------------------------");
            this.actionComplete();
        }
        else {
            this._currentRole = role;
            this.excuteAI(role);
        }
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
            //更新BUFF回合数;
            for (var i in this._buffInfo) {
                for (var j in this._buffInfo[i]) {
                    var info = this._buffInfo[i][j];
                    if (info) {
                        info[0]++;
                        if (info[0] > info[1]) {
                            //状态解除
                            var role = this.getRole(i);
                            if (role.fightState != Role.FS_NORMAL && info[2] == role.fightState) {
                                role.fightState = Role.FS_NORMAL;
                            }
                            //扔掉数据
                            delete this._buffInfo[i][j];
                            trace("删除BUFF——————", i, j);
                        }
                    }
                }
            }
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
                target = this._away[0];
                // target = FightModel._away[FightModel.getRnd(FightModel._away.length)];
            }
            else {
                target = this._home[0];
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
    FightModel.exSkill = function (skillRole, vo) {
        trace("skillRole.power========", skillRole.power);
        //寻找当前能执行的技能；
        var list = skillRole.skills;
        for (var i = list.length - 1; i > -1; i--) {
            var skillData = DBSkill.getSkill(list[i]);
            if (skillData && skillRole.power >= skillData.power) {
                break;
            }
        }
        if (!skillData) {
            skillData = { id: 101, name: "T01", num: 1, target: 2, type: 1, rate: 1, power: 0, addPower: 50 };
        }
        trace("exSkill::", skillData.name);
        //寻找目标==========================================================
        var targets = [];
        var tmp;
        if (skillData.target == DBSkill.TARGET_HOME) {
            if (skillData.num == 1) {
                targets.push(skillRole);
            }
            else {
                for (var i = 0; i < skillData.num; i++) {
                    if (skillRole.isNpc) {
                        this._away[i] && targets.push(this._away[i]);
                    }
                    else {
                        this._home[i] && targets.push(this._home[i]);
                    }
                }
            }
        }
        else if (skillData.target == DBSkill.TARGET_AWAY) {
            for (var i = 0; i < skillData.num; i++) {
                if (skillRole.isNpc) {
                    this._home[i] && targets.push(this._home[i]);
                }
                else {
                    this._away[i] && targets.push(this._away[i]);
                }
            }
        }
        else if (skillData.target == DBSkill.TARGET_ALL) {
            for (var i = 0; i < skillData.num; i++) {
                this._fightList[i] && targets.push(this._fightList[i]);
            }
        } //有情况未列举完
        //技能效果(伤害)解析==============================================================
        for (var i = 0; i < targets.length; i++) {
            //计算伤害=============
            var hurt = skillRole.attack * skillData.rate;
            hurt = this.getHurt(this._buffInfo[skillRole.uid], hurt);
            //BUFF伤害加成；
            hurt = parseInt(hurt + "");
            if (hurt > 0) {
                //TODO：BUFF减伤；
                targets[i].hp = Math.max(0, targets[i].hp - hurt);
                vo.fightInfo[targets[i].uid] = { "hp": targets[i].hp };
            }
            targets[i].power += 10;
        }
        //BUFF解析===============================================================
        if (skillData.buff) {
            var makeBuff = Math.random() < skillData.buffRate;
            if (makeBuff) {
                var buffData = DBBuff.getBuff(skillData.buff);
                if (buffData) {
                    var tmp_1;
                    if (buffData.target == BuffVo.TARGET_HOME) {
                        if (buffData.num == 1) {
                            this.addBuff(skillRole, buffData);
                        }
                        else {
                            tmp_1 = skillRole.isNpc ? this._away : this._home;
                            for (var i = 0; i < tmp_1.length; i++) {
                                this.addBuff(tmp_1[i], buffData);
                            }
                        }
                    }
                    else if (buffData.target == BuffVo.TARGET_AWAY) {
                        if (buffData.num == 1) {
                            this.addBuff(targets[0], buffData);
                        }
                        else {
                            tmp_1 = skillRole.isNpc ? this._home : this._away;
                            for (var i = 0; i < tmp_1.length; i++) {
                                this.addBuff(tmp_1[i], buffData);
                            }
                        }
                    }
                }
            }
        }
        skillRole.power -= skillData.power;
        skillRole.power += skillData.addPower;
        //生成操作列表
        vo.action = FightVo.SKILL;
        vo.skillId = skillData.id + "";
        return targets;
    };
    /**加BUFF */
    FightModel.addBuff = function (role, buff) {
        trace("加BUFF======================", role.uid, buff.id);
        if (!this._buffInfo[role.uid]) {
            this._buffInfo[role.uid] = {};
        }
        //todo同类BUFF重复加的问题
        //格式【当前回合，持续回合, BUFF附加状态】
        var state = Role.FS_NORMAL;
        if (buff.type == BuffVo.TYPE_DIZZY) {
            state = Role.FS_DIZZY;
            role.fightState = state;
        }
        else if (buff.type == BuffVo.TYPE_CHAOS) {
            state = Role.FS_CHAOS;
            role.fightState = state;
        }
        this._buffInfo[role.uid][buff.id] = [0, buff.rnd, state];
    };
    /**辅助-计算BUFF伤害加成 */
    FightModel.getHurt = function (buffInfo, srcHurt) {
        var nowHurt = srcHurt;
        for (var i in buffInfo) {
            if (i.charAt(0) == BuffVo.TYPE_ATT + "") {
                var buff = DBBuff.getBuff(i);
                if (buff.value && buff.value.attack) {
                    var val = buff.value.attack;
                    if (val.indexOf("%") != -1) {
                        val = val.substr(0, val.length - 1);
                        nowHurt = srcHurt * (1 + parseFloat(val) / 100);
                    }
                    else {
                        nowHurt += parseFloat(val);
                    }
                }
            }
        }
        trace("getHurt............", srcHurt, nowHurt);
        return nowHurt;
    };
    /**辅助-取随机数0----num-1*/
    FightModel.getRnd = function (num) {
        return Math.floor(Math.random() * num);
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
    /**执行技能攻击,新核心*/
    FightModel._buffInfo = {};
    return FightModel;
}());
//# sourceMappingURL=FightModel.js.map