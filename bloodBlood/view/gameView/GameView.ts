/**
 * Created by 马达加加加 on 2015/5/25.
 */
class GameView extends XWindow {

    private _source:any;
    private _data:any;
    //
    private _currentData:any;
    //
    private _prevData:any;

    //背景
    private _bg:egret.Bitmap;
    //立绘
    private _leftPlayer:egret.Bitmap;
    private _rightPlayer:egret.Bitmap;
    //表情
    private _leftMood:egret.Bitmap;
    private _rightMood:egret.Bitmap;
    /**聊天对话框容器*/
    private _dialogContainer:egret.DisplayObjectContainer;
    /***/
    private _items:DialogCom[] = new Array();
    /**聊天背景*/
    private _dialogBg:egret.Bitmap;
    /**聊天文本*/
    private _tf:egret.TextField;
    private _index:string = "0";
    /**按钮组*/
    private _btns:XButton[] = new Array();
    /**单例*/
    private static _instance: GameView;

    /**事件-关卡完成*/
    public static CHAPTER_COMPLETE:string = "chapter_complete";
    /**事件-继续*/
    public static RESUME:string = "resume";
    /**事件-挑战失败*/
    public static FAIL:string = "fail";
    /**事件-游戏借宿*/
    public static GAMEOVER:string = "gameOver";
    public constructor(){

        super();
        this.init();
    }

    private showStory(index:string):void{
        this.clear();
        //判定分歧是否完成
        if(this._currentData){
            if(this._currentData.parentId && this._data[index] && !this._data[index].parentId){//分歧跑完
                User.getInstance().diffList.push(this._currentData.parentId);
            }
        }
        this._currentData = this._data[index];
        if(this._currentData){
            //切换效果
            if(this._bg.texture && this._bg.texture != RES.getRes(this._currentData.bg)){
                var bm:egret.Bitmap = new egret.Bitmap();
                this.addChildAt(bm,this.getChildIndex(this._bg));
                bm.x = this._bg.x;
                bm.y = this._bg.y;
                bm.texture = this._bg.texture;
                CoolEffect.fadeOut(bm,500,bm.parent.removeChild, bm.parent, [bm]);
                CoolEffect.fadeIn(this._bg,500);
            }
            this._bg.texture = RES.getRes(this._currentData.bg);

            if(this._currentData.name || this._currentData.dialog){
                var item:DialogCom = DialogComPool.get();
                item.showDialog(this._currentData);
                this._dialogContainer.addChild(item);
                this._items.unshift(item);
                var h:number = 0
                for(var i:number=0; i<this._items.length; i++){
                    this._items[i].y = h;
                    h += this._items[i].height+10;
                    if(i>0){
                        this._items[i].drawMask();
                    }
                    if(h > LayerManager.stage.stageHeight-200){
                        this._items[i].parent.removeChild(this._items[i]);
                        item = this._items.splice(i,1)[0];
                        item.reset();
                        DialogComPool.put(item);
                        i--;
                    }
                }
            }
            //rightPlayer
            egret.Tween.removeTweens(this._leftPlayer);
            egret.Tween.removeTweens(this._rightPlayer);
            var targetAlpha:number;
            if(this._currentData.leftPlayer){
                if(this._currentData.leftPlayer.scaleX){
                    this._leftPlayer.scaleX = this._currentData.leftPlayer.scaleX;
                }else{
                    this._leftPlayer.scaleX = 1;
                }
                //动画
                if(!this._leftPlayer.texture){
                    this._leftPlayer.alpha = 0;
                    targetAlpha = 1
                    this._leftPlayer.x = this._currentData.leftPlayer.x;
                    this._leftPlayer. y = this._currentData.leftPlayer.y;
                }else{
                    if(this._currentData.leftPlayer.alpha){
                        targetAlpha = this._currentData.leftPlayer.alpha;
                    }else{
                        targetAlpha = 1;
                    }
                    if(this._currentData.leftPlayer.name  != this._prevData.leftPlayer){//与前一帧不同,l
                        this._leftPlayer.alpha = 0;
                        this._leftPlayer.x = this._currentData.leftPlayer.x;
                        this._leftPlayer. y = this._currentData.leftPlayer.y;
                    }
                }
                this._leftPlayer.texture = RES.getRes(this._currentData.leftPlayer.name);
                this._prevData.leftPlayer = this._currentData.leftPlayer.name;
                egret.Tween.get(this._leftPlayer).to({alpha:targetAlpha, x:this._currentData.leftPlayer.x, y:this._currentData.leftPlayer.y},300)
            }else{
                if(this._leftPlayer.alpha != 0){
                    egret.Tween.get(this._leftPlayer).to({alpha:0},300).call(this.resetTexture, this, [this._leftPlayer])
                }
                this._prevData.leftPlayer = "";
            }
            //console.log(this._currentData.rightPlayer)
            if(this._currentData.rightPlayer){
                if(this._currentData.rightPlayer.scaleX){
                    this._rightPlayer.scaleX = this._currentData.rightPlayer.scaleX
                }else{
                    this._rightPlayer.scaleX = 1;
                }
                if(!this._rightPlayer.texture){
                    this._rightPlayer.alpha = 0;
                    targetAlpha = 1
                    this._rightPlayer.x = this._currentData.rightPlayer.x;
                    this._rightPlayer.y = this._currentData.rightPlayer.y;
                }else{
                    if(this._currentData.rightPlayer.alpha){
                        targetAlpha = this._currentData.rightPlayer.alpha;
                    }else{
                        targetAlpha = 1;
                    }
                    if(this._currentData.rightPlayer.name  != this._prevData.rightPlayer){//与前一帧不同
                        this._rightPlayer.alpha = 0;
                        this._rightPlayer.x = this._currentData.rightPlayer.x;
                        this._rightPlayer.y = this._currentData.rightPlayer.y;
                    }
                }
                this._rightPlayer.texture = RES.getRes(this._currentData.rightPlayer.name);
                this._prevData.rightPlayer = this._currentData.rightPlayer.name;
                egret.Tween.get(this._rightPlayer).to({alpha:targetAlpha, x:this._currentData.rightPlayer.x, y:this._currentData.rightPlayer.y},300)
            }else{
                egret.Tween.get(this._rightPlayer).to({alpha:0},300).call(this.resetTexture, this, [this._rightPlayer])
                this._prevData._rightPlayer = "";
            }

            //左表情
            if(this._currentData.leftMood){
                this._leftMood.texture = RES.getRes(this._currentData.leftMood.name);
                this._leftMood.x = this._currentData.leftMood.x;
                this._leftMood.y = this._currentData.leftMood.y;
            }else{
                this._leftMood.texture = null;
            }
            //右表情
            if(this._currentData.rightMood){
                this._rightMood.texture = RES.getRes(this._currentData.rightMood.name);
                this._rightMood.x = this._currentData.rightMood.x;
                this._rightMood.y = this._currentData.rightMood.y;
            }else{
                this._rightMood.texture = null;
            }

            //分歧剧情
            var btn: XButton;
            if(this._currentData.label_1){
                for(var i:number=0; i<5; i++){
                    if(this._currentData["label_"+i]){
                        btn = new XButton(RES.getRes("renwu2"));
                        btn.label = this._currentData["label_"+i];
                        this._btns.push(btn);
                        btn.name = this._currentData["nextRecordId_"+i];
                        this.addChild(btn);
                    }
                }
                //分歧剧情按钮布局,待完善
                for(i=0; i<this._btns.length; i++){
                    this._btns[i].x = 100;
                    this._btns[i].y = 120 * i + 40;
                    this._btns[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnTouch,this);
                }
            }
            //数据操作
            if(this._currentData.dataInfo){
                if(User.getInstance().taskList.indexOf(User.getInstance().chapterId+"_"+this._currentData.recordId) == -1){
                    //如果是分歧剧情，判定是否已经领取过;
                    if(this._currentData.parentId){
                        if(User.getInstance().diffList.indexOf(this._currentData.parentId) != -1){
                            return;
                        }
                    }
                    //console.log("需要数据操作------",this._currentData.dataInfo);
                    var info:any = this._currentData.dataInfo;
                    if(info.msg){
                        XTip.showTip(info.msg);
                    }
                    //金币
                    if(info.money){
                        User.getInstance().money += parseInt(info.money);
                    }
                    //点券
                    if(info.point){
                        User.getInstance().point += parseInt(info.point);
                        UserRequest.getBonus(parseInt(info.point),null, null);
                    }
                    //技能
                    if(info.skill){
                        if(SkillData.getSkillInfo(info.skill) && User.getInstance().role.skills.indexOf(info.skill) == -1){
                            SoundManager.playerSND("dSND");
                            User.getInstance().role.skills.push(info.skill);
                        }
                    }
                    //属性变化===
                    if(info.other){
                        SoundManager.playerSND("dSND");
                        var list:any[] = (info.other+"").split("|");
                        var temp:any[];
                        var obj:any = {};
                        for(var i:number=0; i<list.length; i++){
                            temp = list[i].split(":");
                            obj[temp[0]] = temp[1];
                        }
                        var role:RoleVo;
                        if(obj.role){
                            //console.log(obj);
                            role = UserModel.getRoleByName(obj.role);
                        }else{
                            role  = User.getInstance().role/*[temp[0]] += parseInt(temp[1]);*/
                        }
                        for(var j in obj){
                            if(j != "role"){
                                //console.log(role.roleName+"属性变化--B",j,role[j])
                                role[j] += parseInt(obj[j]);
                                //console.log(role.roleName+"属性变化--A",j,role[j])
                            }
                        }
                    }
                    //道具=======================================
                    if(info.item){
                        SoundManager.playerSND("dSND");
                        var list:any[] = (info.item+"").split("|");
                        var temp:any[];
                        var vo:ItemVo;
                        var tempVo:ItemVo;
                        for(var i:number=0; i<list.length; i++){
                            var str:string = list[i];
                            temp = str.split(":");
                            vo = ItemData.getItemByName(temp[0]);
                            if(vo){//加入背包
                                tempVo = BagModel.addItem(vo.itemCode, <number>temp[1], false);
                                //飞入背包动画
                                Utils.flyToBag(vo);
                                /**
                                 if(tempVo && tempVo.itemType == ItemType.EQUIP){
                                    var kpi:number = Utils.caculateItemKpi(tempVo);
                                    if(User.getInstance().role.weapon){
                                        var vo:ItemVo = BagModel.getItemByUUid(User.getInstance().role.weapon);
                                        if(kpi > Utils.caculateItemKpi(vo)){
                                            BagModel.equipItem(tempVo,User.getInstance().role);
                                        }
                                    }else{
                                        BagModel.equipItem(tempVo,User.getInstance().role);
                                    }
                                }
                                 */
                            }
                        }
                    }
                    //记录
                    User.getInstance().taskList.push(User.getInstance().chapterId+"_"+this._currentData.recordId);
                }
            }
        }else{
            //console.log("章节完成")
            //章节完成
            var e: XEvent = new XEvent(GameView.CHAPTER_COMPLETE);
            if(FightModel.FIGHT_MODE == "normal"){
                e.data = this._source;

            }
            MainDispatcher.getInstance().dispatchEvent(e);
        }
    }

    /***/
    private resetTexture(bm:egret.Bitmap):void{
        bm.texture  =null
    }

    public show(center:boolean = false, ...args: any[]):void{
        this._source = args[0];
        this._data = this._source.dialogList;
        this.reset();
        super.show(center);
        if(this._source.type == "1"){
            this._currentData = this._data[0];
            this.visible = false;
            ResultView.reward = this._currentData;
            /**
            if(this._source.storyId <= User.getInstance().sectionId) {
                this.resume(null);
                return;
            }
            */
            FightView.getInstance().show(false,this._currentData.eventInfo.fight)
            //XLoading.load("fight", FightView.getInstance().show, FightView.getInstance(),[false,this._currentData.eventInfo.fight]);
        }else{
            this.showStory("0");
        }
    }

    /***/
    public close():void{
        this.visible = true;
        super.close();
        if(FightView.getInstance().stage){
            FightView.getInstance().close();
        }
    }

    /**继续剧情*/
    public resume(event:egret.Event = null):void{
        this._index = this._currentData.nextRecordId_0;
        //console.log("resume", this._index);
        this.showStory(this._index);
    }
    //
    private onBtnTouch(event:egret.TouchEvent):void{
        this._index = event.currentTarget.name;
        this.showStory(this._index);
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    //
    private clear():void{
        if(this._btns){
            for(var i:number=0; i<this._btns.length; i++){
                if(this._btns[i] && this._btns[i].parent){
                    this._btns[i].parent.removeChild(this._btns[i]);
                }
            }
        }
        this._btns = new Array();
    }

    //重置
    private reset():void{
        this.clear();
        if(this._items){
            for(var i:number=0; i<this._items.length; i++){
                if(this._items[i] && this._items[i].parent){
                    this._items[i].parent.removeChild(this._items[i]);
                }
            }
        }
        this._items = new Array();
        this._leftPlayer.texture = this._rightPlayer.texture
            = this._leftMood.texture = this._rightMood.texture = null;
    }

    private onTouch(event:egret.TouchEvent):void{

        if(this._currentData && !this._currentData.label_1)
        {
            if(this._currentData.eventInfo){

                //进入战斗
                if(this._currentData.eventInfo.fight){
                    //console.log("storyId = " + this._source.storyId);
                    //console.log("进入战斗，已经通关的章节跳过战斗！");

                    if(this._source.storyId <= User.getInstance().sectionId)
                    {
                        this.resume(null);
                        return;
                    }
                    var staminaNeed:number = 5;
                    if(FightModel.FIGHT_MODE == "ex"){
                        staminaNeed = 10;
                    }
                    if(User.getInstance().stamina < staminaNeed) {
                        XTip.showTip("啊呀~没体力了也~~~~~");
                    }else{
                        UserModel.updateStamina(-1*staminaNeed);
                        XLoading.load("fight", FightView.getInstance().show, FightView.getInstance(),[false,this._currentData.eventInfo.fight]);
                    }

                    //FightView.getInstance().show(false,this._currentData.eventInfo.fight);
                }
                //增加队友
                else if(this._currentData.eventInfo.joinTeam){
                    UserModel.joinTeam(this._currentData.eventInfo.joinTeam);
                    this._index = this._currentData.nextRecordId_0;
                    this.showStory(this._index);
                }
                //队友离开
                else if(this._currentData.eventInfo.leftTeam){
                    //离开队伍，需要一定的离队机制
//                  UserModel.leftTeam(this._currentData.eventInfo.leftTeam);
                    this._index = this._currentData.nextRecordId_0;
                    this.showStory(this._index);
                }else if(this._currentData.eventInfo.gameOver){//游戏结束
                    this.close();
                    XTip.showTip("出师未捷身先死\n长使英雄泪满襟。")
                    MainDispatcher.getInstance().dispatchEvent(new XEvent(GameView.GAMEOVER));
                }
                else{
                    this._index = this._currentData.nextRecordId_0;
                    this.showStory(this._index);
                }
            }
            else{
                this._index = this._currentData.nextRecordId_0;
                this.showStory(this._index);
            }
        }
    }

    private init():void{
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this.width = LayerManager.stage.stageWidth;
        //this._bg.texture = RES.getRes(this._data["0"].bg);
        this._leftPlayer = new egret.Bitmap();
        this.addChild(this._leftPlayer);
        this._rightPlayer = new egret.Bitmap();
        this.addChild(this._rightPlayer);
        this._rightPlayer.x = 320;

        this._leftMood = new egret.Bitmap();
        this.addChild(this._leftMood);
        this._rightMood = new egret.Bitmap();
        this.addChild(this._rightMood)

        this._dialogBg = new egret.Bitmap();
        this._dialogBg.texture = RES.getRes("di1");
        this.addChild(this._dialogBg);
        this._dialogBg.y = 380;
        this._tf = new egret.TextField();
        this._tf.width = this.width;
        this._tf.height = this._dialogBg.height;
        this._tf.y = this._dialogBg.y;
        this.addChild(this._tf);
        this._dialogContainer = new egret.DisplayObjectContainer();
        this.addChild(this._dialogContainer);
        this._dialogContainer.x = 60;
        this._dialogContainer.y = 432;

        this._prevData = {leftPlayer:"",rightPlayer:""};
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        MainDispatcher.getInstance().addEventListener(GameView.RESUME, this.resume, this)
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        MainDispatcher.getInstance().removeEventListener(GameView.RESUME, this.resume, this)
    }

    /**获取单例*/
    public static getInstance():GameView{
        if(!GameView._instance){
            GameView._instance = new GameView();
        }
        return GameView._instance;
    }
}
