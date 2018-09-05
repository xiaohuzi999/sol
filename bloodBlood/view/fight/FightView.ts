/**
 * Created by 马达加加加 on 2015/6/1.
 */
class FightView extends XWindow {
    /**跳过*/
    private _breakBtn:egret.Bitmap;
    //战斗图标-我方角色
    private _players:FightIcon[];
    //战斗-对手列表
    private _enemys:EnemyItem[];
    /**技能图标*/
    private _skills:FightSkill[];
    /**血瓶*/
    private _recoverItem:RecoverItem[];
    private item_pos:number[] = [649,553,462];

    //所有参战角色；
    private _allFighters:Object;
    //组合比赛结果界面
    private _resultView:ResultView;
    //战斗id
    private _fightId:string;
    //测试用==动画
    private _act:egret.MovieClip;
    //发动
    private _preact: egret.MovieClip;
    /**测试用-技能*/
    private _skill:egret.MovieClip;
    //临时方案-先设定技能
    private _skill2:egret.MovieClip;
    /** 当前动作 */
    private _currentMov:egret.MovieClip;
    //当前数据
    private _currentVo:FightVo;
    /** 当前选择血瓶 */
    private _currentItem:RecoverItem = null;
    /**定时ID*/
    private _sId:any;
    /** 血瓶和技能个数 */
    private static ITEM_NUM:number = 3;

    /**单例*/
    private static _instance:FightView;
    public constructor(){
        super();
    }

    public show(center:boolean = false, ...args: any[]):void{
        if(!this._players){
            this.init();
        }
        this._fightId = args[0];
        egret.clearTimeout(this._sId);
        //跳过
        this._breakBtn.visible = (User.getInstance().chapterId > 0);
        super.show(center);
        this.initFight();
        SoundManager.playBGM("fightSND");
    }

    /**战斗初始化*/
    private initFight():void{
        this._allFighters = {};
        var home:RoleVo[] = [];
        var teamLen: number = User.getInstance().team.length;
        for(var i:number=0; i < teamLen; i++){
            if(User.getInstance().team[i].state == 1){
                home.push(User.getInstance().team[i].createFighter());
            }
        }
        home.push(User.getInstance().role.createFighter());
        this.initPlayer(home);
        this.initSkill();

        var away:RoleVo[] = FightModel.initNpc(this._fightId);
        this.initEnemy(away);
        FightModel.initFight(home, away);
        //引导判定
        if(!Guide.hasFinishedGuid(Guide.SKILL_GUIDE) && User.getInstance().role.skills.length){//技能引导
            Guide.showGuide(Guide.SKILL_GUIDE);
            Guide.curGuide.showGuide([this._skills[0]], FightModel.startFight, FightModel);
        }else{
            //开始战斗
            FightModel.startFight();
        }
    }

    private onFightEvent(event:XEvent):void{
        switch(event.type){
            case FightModel.TURN:
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
                break;
            case FightModel.UPDATEINFO:
                this.excuteFight(<FightVo>event.data);
                break;
            case FightModel.WIN:
                if(!this._resultView){
                    this._resultView = new ResultView();
                }
                this._resultView.show(event.data);
                this._sId = egret.setTimeout(this.close,this,600);
                break;
            case FightModel.LOSE:
                if(!this._resultView){
                    this._resultView = new ResultView();
                }
                this._resultView.show(null);
                this._sId = egret.setTimeout(this.close,this,600);
                break;
        }
    }

    public close():void {
        this._isReplay =false;
        super.close();
        if(this._currentItem != null)
        {
            this._currentItem.alpha = 1;
            this._currentItem = null;
        }
        SoundManager.playBGM("bgSND");
    }

    /**战斗指令*/
    private excuteFight(vo:FightVo):void{
        var item:any;
        if(vo.action == FightVo.RECOVER) {
            //console.log(vo,"now");
            //console.log(this._currentVo, "other");
            //修改当前的HP属性----
            if(this._currentVo){
                if(this._currentVo.fightInfo[vo.nowId]){
                    this._currentVo.fightInfo[vo.nowId].hp = vo.fightInfo[vo.nowId].hp
                }
            }
            this.updateHp();
            this.excuteFight2(vo);
            return;
        }
        this._currentVo = vo;
        if(!this._preact){
            var data = RES.getRes("mov_json");
            var txtr = RES.getRes("mov_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
            this._preact = new egret.MovieClip( mcFactory.generateMovieClipData( "preact" ));
        }

        if(vo.action != FightVo.RECOVER && vo.nowId){
            item = this._allFighters[vo.nowId];
            if(item.parent){
                item.parent.addChild(this._preact);
            }
            if(item instanceof EnemyItem){
                this._preact.x = item.x + 50;
                this._preact.y = item.y - 200;
            }else{
                this._preact.x = item.x + 130;
                this._preact.y = item.y + 50;
            }
            this._preact.addEventListener(egret.Event.COMPLETE,this.onMovOver,this);
            this._preact.gotoAndPlay(1);
            CoolEffect.doBiger(item);
        }
    }


    /**战斗指令*/
    private excuteFight2(vo:FightVo):void{
        var delta: number;
        var bloodCom:BloodCom;
        var item:any;
        var info:any;
        //是否有动画
        var hasMov:boolean = false;
        //this._currentVo = vo
        //动作角色动画
        if(vo.action == FightVo.ATTACK){
            if(!this._act){
                var data = RES.getRes("mov_json");
                var txtr = RES.getRes("mov_png");
                var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
                this._act = new egret.MovieClip( mcFactory.generateMovieClipData( "attack" ) );
            }
            this._currentMov = this._act;
            hasMov = true
        }else if(vo.action == FightVo.SKILL){
            if(vo.skillId == "1"){
                if(!this._skill){
                    var data = RES.getRes("skill_1_json");
                    var txtr = RES.getRes("skill_1_png");
                    var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
                    this._skill = new egret.MovieClip( mcFactory.generateMovieClipData( "skill_1" ) );
                    this._skill.anchorX =0.5;
                    this._skill.anchorY =0.5;
                }
                this._currentMov = this._skill;
            }else if(vo.skillId == "2"){
                if(!this._skill2){
                    var data = RES.getRes("skill_2_json");
                    var txtr = RES.getRes("skill_2_png");
                    var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
                    this._skill2 = new egret.MovieClip( mcFactory.generateMovieClipData( "skill_2" ) );
                    this._skill2.anchorX =0.5;
                    this._skill2.anchorY =0.5;
                }
                this._currentMov = this._skill2;
            }
            hasMov = true;
            SoundManager.playerSND("skillSND")
        }else if(vo.action == FightVo.RECOVER){
            this.updateHp();
            SoundManager.playerSND("recoverSND")
        }
        for(var i in vo.fightInfo){
            item = this._allFighters[i];
            info = vo.fightInfo[i];
            if(info.hp != undefined){
                delta = info.hp - item.data.hp;
                bloodCom = new BloodCom();
                bloodCom.showNum(vo.showType, delta);
                this.addChild(bloodCom);
                if(item instanceof EnemyItem){
                    bloodCom.x = item.x - bloodCom.width/2;
                    bloodCom.y = item.y - item.height/2;
                }else{
                    bloodCom.x = item.x+30;
                    bloodCom.y = item.y+40;
                }
                CoolEffect.doFlash(item);
                if(hasMov && this._currentMov){
                    this.addChild(this._currentMov);
                    this._currentMov.x = bloodCom.x;
                    this._currentMov.y = bloodCom.y;
                    //居中
                    if(this._currentMov == this._skill2){
                        this._currentMov.x = 120;
                        this._currentMov.y = 300;
                    }
                    this._currentMov.gotoAndPlay(1)
                }
                CoolEffect.flowAndOut(bloodCom);
            }
        }
        for(i in vo.fightInfo){
            item = this._allFighters[i];
            info = vo.fightInfo[i];
            if(info.hp != undefined){
                this._allFighters[i].updateState(info);
            }
        }
        if(hasMov && this._currentMov){
            this._currentMov.addEventListener(egret.Event.COMPLETE,this.onComplet,this);
        }else{
            this.updateSkill(vo);
        }
    }

    //
    private onComplet(event:egret.Event):void{
        if(event.currentTarget.currentFrame == event.currentTarget.totalFrames){
            this.endBattle();
        }
    }

    private endBattle(): void {
        if(this._currentMov){
            this._currentMov.removeEventListener(egret.Event.COMPLETE, this.onComplet, this);
            if(this._currentMov.parent){
                this._currentMov.parent.removeChild(this._currentMov);
            }
            this._currentMov.stop();
        }
        this._currentMov = null;
        if(this._skill){
            if(this._skill.parent){
                this._skill.parent.removeChild(this._skill);
            }
        }

        if(this._currentVo){
            var item:any;
            var info:any;
            for(var i in this._currentVo.fightInfo){
                item = this._allFighters[i];
                info = this._currentVo.fightInfo[i];
                if(this._allFighters[i] && info.hp != undefined){
                    this._allFighters[i].updateState(info);
                }
            }
            this.updateSkill(this._currentVo)
        }


        //植入回复新手引导======================================================================
        if(!Guide.hasFinishedGuid(Guide.RECOVER_GUIDE) && this._players[0].data.hp < this._players[0].data.maxHp){
            Guide.showGuide(Guide.RECOVER_GUIDE);
            var reItem:any;
            for(var k:number = 0; k<this._recoverItem.length; k++){
                if(this._recoverItem[k].itemNum){
                    reItem = this._recoverItem[k];
                    break;
                }
            }
            if(reItem){
                Guide.curGuide.showGuide([reItem, this._players[0]], FightModel.actionComplete, FightModel);
            }else{
                if(!this._isReplay){
                    FightModel.actionComplete();
                }else{
                    this.excuteReplay();
                }
            }
        }else{
            if(!this._isReplay){
                FightModel.actionComplete();
            }else{
                this.excuteReplay();
            }
        }
    }

    private onMovOver(event:egret.Event):void{
        if(event.currentTarget.currentFrame == event.currentTarget.totalFrames){
            var mv:egret.MovieClip = event.currentTarget;
            if(mv.parent){
                mv.parent.removeChild(mv);
            }
            mv.stop();
            mv.removeEventListener(egret.Event.COMPLETE, this.onMovOver, this);
            this.excuteFight2(this._currentVo);
        }
    }

    private onTap(event:egret.TouchEvent):void{
        if(event.target instanceof EnemyItem){//战斗指令
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
            FightModel.doAction(FightVo.ATTACK,event.target.data.roleId);
        }
    }

    private onItemTouch(event:egret.TouchEvent):void{
        var item: any = event.currentTarget;
        //console.log("click item = " +　item);
        switch(event.type){
            case egret.TouchEvent.TOUCH_TAP:
                if(item instanceof FightSkill) {
                    //console.log("CD================",item.cdTime)
                    if(item.cdTime == 0) {
                        if(FightModel.playerSkill(item.skillId)){
                            item.cdTime = 1;
                            item.alpha = 0.5;
                        }
                    }
                }
                //血瓶
                else if(item instanceof RecoverItem) {
                    if(item.itemNum <= 0)
                    {
                        return;
                    }

                    if(this._currentItem != null)
                        this._currentItem.alpha = 1;
                    (<RecoverItem>item).alpha = 0.3;
                    this._currentItem = (<RecoverItem>item);
                }
                //点击角色头像补给
                else if(item instanceof FightIcon)
                {
                    if(this._currentItem != null)
                    {
                        FightModel.recoverHP(this._currentItem.itemId,item.data.roleId);
                        this._currentItem.alpha = 1;
                        this._currentItem = null;
                    }

                }
                break;
        }
    }

    private onTouch(event:egret.TouchEvent):void{
        if(!this._isReplay){
            FightModel.break();
        }else{
            for(var i:number=0; i<this._recordList.length; i++){
                if(this._recordList[i].indexOf("ShowResult") != -1){
                    this._recordList = [this._recordList[i]];
                    break;
                }
            }
            this.excuteReplay();
        }
        this.removeEvent();
        this.endBattle();
    }

    //初始化技能
    private initSkill():void{
        var list:number[] = User.getInstance().role.skills;
        var index:number=0;
        for(var i:number=0; i<FightView.ITEM_NUM; i++){
            this._skills[i].format(list[i]);
            this._recoverItem[i].update();
            if(this._recoverItem[i].itemNum){
                this._recoverItem[i].visible = true;
                this._recoverItem[i].y = this.item_pos[index];
                index ++;
            }else{
                this._recoverItem[i].visible = false;
            }
        }
    }

    /**更新技能状态*/
    private updateSkill(vo:FightVo):void{
        if(vo.isRndOver){
            for(var i:number=0; i<FightView.ITEM_NUM; i++) {
                this._skills[i].update();
            }
        }
        var skillId:string = vo.skillId;
        if(skillId){
            for(var i:number=0; i<FightView.ITEM_NUM; i++) {
                if(this._skills[i].skillId == skillId){
                    this._skills[i].excute();
                    break;
                }
            }
        }
    }

    /**跟新道具状态*/
    private updateHp():void{
        for(var i:number=0; i<FightView.ITEM_NUM; i++){
            this._recoverItem[i].update();
        }
    }

    /**初始化主角阵容*/
    private initPlayer(arr:RoleVo[]):void{
        for(var i:number=0; i<this._players.length; i++){
            if(arr[i]){
                this._players[i].visible = true;
                this._players[i].format(arr[i]);
                this._players[i].scaleX = this._players[i].scaleY = 1;
                this._allFighters[arr[i].roleId] = this._players[i];
            }else{
                this._players[i].visible = false;
            }
        }
    }

    /**初始化怪物*/
    private initEnemy(arr:RoleVo[]):void{
        for(var i:number=0; i<this._enemys.length; i++){
            egret.Tween.removeTweens(this._enemys[i])
            this._enemys[i].scaleX = this._enemys[i].scaleY = 1;
            if(arr[i]){
                this._enemys[i].visible = true;
                this._enemys[i].format(arr[i]);
                this._allFighters[arr[i].roleId] = this._enemys[i];
            }else{
                this._enemys[i].visible = false
            }
            this._enemys[i].setPos(EnemyItem["ENEMY_" + arr.length][i]);
        }
    }

    //显示录像==================================================================================================================
    //==========================================================================================================================
    private _recordList:any[];
    private _home:RoleVo[];
    private _away:RoleVo[];
    private _isReplay:boolean = false;
    private _isHome:boolean;
    private _replayData:any;
    public showReplay(data:any):void{
        this._replayData = data;
        this._isReplay = true;
        this._recordList = data.FightData.split("|");
        //console.log(this._recordList);
        //战斗初始化===================================================
        this._allFighters = {};
        this._home = [];
        if( this._replayData.HomeId == User.getInstance().userId){  var tempArr:any[] = data.HomeData.split("|"); this._isHome = true; }
        else { var tempArr:any[] = data.AwayData.split("|"); this._isHome = false; }
        var role:RoleVo;
        var res:string[]=[];
        for(var i:number=0; i < tempArr.length; i++){
            role = new RoleVo();
            Utils.setRolePro(role, tempArr[i]);
            if( this._isHome ){
                role.roleId = "0_"+i;
            } else{
                role.roleId = "1_"+i;
            }
            this._home.push(role);
        }

        this._away = [];
        if( this._isHome){  var tempArr:any[] = data.AwayData.split("|"); }
        else { var tempArr:any[] = data.HomeData.split("|"); }
        for(var i:number=0; i < tempArr.length; i++){
            role = new RoleVo();
            Utils.setRolePro(role, tempArr[i],false);
            res.push(role.pic);
            if( this._isHome ){
                role.roleId = "1_"+i;
            } else{
                role.roleId = "0_"+i;
            }
            this._away.push(role);
        }

        //加载资源-----------
        RES.createGroup("temp",MainView.FIIGHT_RES.split(",").concat(res), true);
        XLoading.load("temp", this.onGroupLoaded, this, null);
    }

    //
    private onGroupLoaded():void{
        XLoading.dispose("temp");
        if(!this._players){
            this.init();
        }
        super.show();
        for(var i:number=0; i<FightView.ITEM_NUM; i++){
            this._recoverItem[i].visible = false;
        }
        SoundManager.playBGM("fightSND");
        //跳过
        this._breakBtn.visible = true;
        this.initPlayer(this._home);
        this.initEnemy(this._away);
        this.excuteReplay();

        // match.Recorder.AppendFormat("ShowAttack({0},{1},{2},{3},{4},{5})|", match.Turn, match.AttackPos, match.DefendePos,
        //(int)match.EnumAttackType, (int)match.EnumShowType, match.Hurt);

    }
    private excuteReplay():void{
        var comStr:string = this._recordList.shift();
        if(!comStr){
            return;
        }
        while(comStr.indexOf("ShowRound") != -1 || comStr.indexOf("ShowNextPlayer") != -1){
            comStr = this._recordList.shift();
        }
        //
        if(comStr.indexOf("ShowAttack") != -1){//包装战斗指令
            comStr = comStr.replace(")","");
            var args:string[] = comStr.split("(");
            args = args[1].split(",");

            var vo:FightVo = new FightVo();
            vo.nowId = args[0]+"_"+args[1];
            vo.action = FightVo.ATTACK;
            //targetId
            var hp:number;
            var targetId:string = "0";
            if(args[0] == "0"){
                targetId = "1";
                if( this._isHome ){  hp = this._away[args[2]].hp - parseInt(args[5]); }
                else { hp = this._home[args[2]].hp - parseInt(args[5]); }
                //hp = this._away[args[2]].hp - parseInt(args[5]);
            }else{
                if( this._isHome ){  hp = this._home[args[2]].hp - parseInt(args[5]); }
                else { hp = this._away[args[2]].hp - parseInt(args[5]); }
                //hp = this._home[args[2]].hp - parseInt(args[5]);
            }
            vo.fightInfo[targetId+"_"+args[2]] = {"hp":hp};
            vo.showType = args[4];
            var event:XEvent = new XEvent(FightModel.UPDATEINFO);
            event.data = vo;
            MainDispatcher.getInstance().dispatchEvent(event);
        }else if(comStr.indexOf("ShowResult") != -1){
            comStr = comStr.replace(")","");
            var args:string[] = comStr.split("(");
            if(args[1] == "1"){
                if( this._isHome ){
                    XAlert.show("胜利\n恭喜您获得"+ this._replayData.PrizeHomeScore + "积分奖励", this.close, this.close,this);
                }else{
                    XAlert.show("惜败", this.close, this.close,this);
                }
            }else if(args[1] == "3"){
                if( this._isHome ){
                    XAlert.show("惜败", this.close, this.close,this);
                }else{
                    XAlert.show("胜利\n恭喜您获得"+ this._replayData.PrizeAwayScore + "积分奖励", this.close, this.close,this);
                }
            }
        }
    }
    //==========================================================================================================================
    //==========================================================================================================================

    public initEvent():void{
        MainDispatcher.getInstance().addEventListener(FightModel.TURN, this.onFightEvent,this);
        MainDispatcher.getInstance().addEventListener(FightModel.UPDATEINFO, this.onFightEvent,this);
        MainDispatcher.getInstance().addEventListener(FightModel.WIN, this.onFightEvent,this);
        MainDispatcher.getInstance().addEventListener(FightModel.LOSE, this.onFightEvent,this);
        for(var i:number=0; i<FightView.ITEM_NUM; i++){
            this._skills[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
            this._recoverItem[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        }
        var fightIconLen: number = this._players.length;
        for(var i:number = 0; i < fightIconLen; i++){
            this._players[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        }
        this._breakBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        MainDispatcher.getInstance().removeEventListener(FightModel.TURN, this.onFightEvent,this);
        MainDispatcher.getInstance().removeEventListener(FightModel.UPDATEINFO, this.onFightEvent,this);
        MainDispatcher.getInstance().removeEventListener(FightModel.WIN, this.onFightEvent,this);
        MainDispatcher.getInstance().removeEventListener(FightModel.LOSE, this.onFightEvent,this);
        for(var i:number=0; i<FightView.ITEM_NUM; i++){
            this._skills[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
            this._recoverItem[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        }
        var fightIconLen: number = this._players.length;
        for(var i:number=0; i < fightIconLen; i++){
            this._players[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        }
        this._breakBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("zhandoudi");
        //对手
        this._enemys = new Array();
        for(var i:number=0; i<4; i++){
            this._enemys.push(new EnemyItem());
            this.addChild(this._enemys[i]);
            this._enemys[i].setPos(EnemyItem.ENEMY_4[i]);
        }

        //
        this._players = new Array();
        var pos: number[] = new Array(36,178,319,461);
        for(i=0; i<4; i++){
            this._players.push(new FightIcon());
            this.addChild(this._players[i]);
            this._players[i].x = pos[i];
            this._players[i].y = 785;
        }

        this._skills = new Array();
        this._skills.push(new FightSkill());
        this._skills.push(new FightSkill());
        this._skills.push(new FightSkill());
        this._skills[0].x = this._skills[1].x = this._skills[2].x = 526;
        this._skills[0].y = 627;
        this._skills[1].y = 522;
        this._skills[2].y = 417;
        this.addChild(this._skills[0]);
        this.addChild(this._skills[1]);
        this.addChild(this._skills[2]);

        this._recoverItem = new Array();
        this._recoverItem.push(new RecoverItem("xiaoxueping", ItemData.HP_0));
        this._recoverItem.push(new RecoverItem("zhongxueping",ItemData.HP_1));
        this._recoverItem.push(new RecoverItem("daxueping",ItemData.HP_2));
        this._recoverItem[0].x = this._recoverItem[1].x = this._recoverItem[2].x = 16;
        this._recoverItem[0].y = 462;
        this._recoverItem[1].y = 553;
        this._recoverItem[2].y = 649;
        this.addChild(this._recoverItem[0]);
        this.addChild(this._recoverItem[1]);
        this.addChild(this._recoverItem[2]);

        this._breakBtn = new egret.Bitmap();
        this.addChild(this._breakBtn);
        this._breakBtn.texture = RES.getRes("breakBtn");
        this.addChild(this._breakBtn);
        this._breakBtn.x = 500;
        this._breakBtn.y = 10;
        this._breakBtn.touchEnabled = true;
    }

    //获取单例
    public static getInstance():FightView{
        if(!FightView._instance){
            FightView._instance = new FightView();
        }
        return FightView._instance;
    }
}

/**我方图标*/
class FightIcon extends egret.DisplayObjectContainer{
    private $infoTF:egret.TextField;
    //数据
    public data:RoleVo;
    //头像
    private $pic:egret.Bitmap;

    public constructor(){
        super();
        this.init();
    }

    /**格式化数据*/
    public format(data:RoleVo):void{
        this.data = data;
        if(data.hp < data.maxHp/3){
            this.$infoTF.textColor = 0xff0000;
        }else{
            this.$infoTF.textColor = 0x00aa00;
        }
        if( data.hp < 0 ){
            this.$infoTF.text = 0 + "/" +data.maxHp;
        }else{
            this.$infoTF.text = data.hp+"/"+data.maxHp;
        }
        var ur
        if(data.hp <= 0){
            RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/team/"+data.pic+"_f2.png", this.onLoadIcon, this);
            //this.$pic.texture = RES.getRes(data.pic+"_f2")
        }else{
            RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/team/"+data.pic+"_f.png", this.onLoadIcon, this);
            //this.$pic.texture = RES.getRes(data.pic+"_f")
        }

    }

    private onLoadIcon(tx:any):void{
        this.$pic.texture = tx;
    }

    /***/
    public updateState(info:any):void{
        this.data.setValue(info);
        this.format(this.data);
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("biaodi");

        this.$infoTF = new egret.TextField();
        this.addChild(this.$infoTF);
        this.$infoTF.width = 143;
        this.$infoTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$infoTF.y = 130;
        this.$infoTF.size = 20;
        this.$pic = new egret.Bitmap();
        this.addChild(this.$pic);
        this.$pic.x = -28;
        this.$pic.y = -72;

        this.touchEnabled = true;
    }
}

//敌方
class EnemyItem extends egret.DisplayObjectContainer{
    private $pic:egret.Bitmap;
    private $nameBG:egret.Bitmap;
    private $nameTF:egret.TextField;
    private $hpPic:egret.Bitmap;
    private $hpPicBG:egret.Bitmap;
    private $hpValueTF: egret.TextField;
    private $yingzi: egret.Bitmap;

    public data:RoleVo;
    /**对手站位*/
    public static ENEMY_4:IEnemyPos[] = new Array({x:314,y:400,scale:0.68},{x:520,y:574,scale:0.75},{x:120,y:574,scale:0.75},{x:294,y:745,scale:1});
    public static ENEMY_3:IEnemyPos[] = new Array({x:520,y:512,scale:0.75},{x:120,y:512,scale:0.75},{x:294,y:710,scale:1});
    public static ENEMY_2:IEnemyPos[] = new Array({x:176,y:600,scale:0.9},{x:456,y:600,scale:0.9});
    public static ENEMY_1:IEnemyPos[] = new Array({x:320,y:620,scale:1});

    public constructor(){

        super();
        this.init();
    }

    /**初始化*/
    public format(data:RoleVo):void{
        var per:number = data.hp/data.maxHp;
        this.$hpPic.scrollRect = new egret.Rectangle(0,0,this.$hpPic.width*per, this.$hpPic.height);
        //图片
        if(!this.data || this.data.roleId != data.roleId){
            this.$pic.texture = RES.getRes(data.pic);
            this.$nameTF.text = data.roleName;
        }
        this.data = data;
        this.$hpValueTF.text = data.hp + "/" + data.maxHp;
        if(data.hp < data.maxHp/3){
            this.$hpValueTF.textColor = 0xff0000;
        }else{
            this.$hpValueTF.textColor = 0xffffff;
        }
    }

    /***/
    public updateState(info:any):void{
        this.data.setValue(info);
        this.format(this.data);
        if(this.data.hp <= 0){
            CoolEffect.doFlashOut(this);
        }
    }

    /**设定坐标信息*/
    public setPos(info:IEnemyPos):void{
        if(info){
            this.visible = true;
            this.$pic.scaleX = this.$pic.scaleY = info.scale;
            this.setYPosition();
            this.x = info.x;
            this.y = info.y;
        }else{
            this.visible = false;
        }
    }

    private setYPosition():void{
        this.$pic.x = -this.$pic.width/2 * this.$pic.scaleX;
        this.$pic.y = -this.$pic.height * this.$pic.scaleY;
        this.$nameBG.x = -85;
        this.$nameBG.y = this.$pic.y - this.$nameBG.height - 4;
        this.$nameTF.x = -80;
        this.$nameTF.y = this.$nameBG.y +8;
        this.$hpPicBG.x = -95;
        this.$hpPicBG.y = this.$pic.y - this.$hpPicBG.height-2;
        this.$hpPic.x = -95;
        this.$hpPic.y = this.$hpPicBG.y;
        this.$hpValueTF.x = -95;
        this.$hpValueTF.y = this.$hpPic.y + 1;
    }

    private init():void{

        this.$yingzi = new egret.Bitmap();
        this.$yingzi.texture = RES.getRes("yingzi");
        this.addChild(this.$yingzi);
        this.$yingzi.anchorX = 0.5;
        this.$yingzi.anchorY = 0.5;

        this.$pic = new egret.Bitmap();
        this.$pic.texture = RES.getRes("juese");
        this.addChild(this.$pic);

        this.$nameBG = new egret.Bitmap();
        this.addChild(this.$nameBG);
        this.$nameBG.texture = RES.getRes("mingzidi");
        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$nameTF.size = 20;
        this.$nameTF.textColor = 0x33200F;
        this.$nameTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$nameTF.width = 155;

        this.$hpPicBG = new egret.Bitmap();
        this.addChild(this.$hpPicBG);
        this.$hpPicBG.texture = RES.getRes("zhandouxuetiaodi");

        this.$hpPic = new egret.Bitmap();
        this.addChild(this.$hpPic);
        this.$hpPic.texture = RES.getRes("zhandouxuetiao");

        this.$hpValueTF = new egret.TextField();
        this.$hpValueTF.size = 12;
        this.$hpValueTF.width = 190;
        this.$hpValueTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$hpValueTF.text = "0/0";
        this.addChild(this.$hpValueTF);
        this.setYPosition();
        this.touchEnabled = true;
    }
}