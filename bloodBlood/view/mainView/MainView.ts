/**
 * Created by 马达加加加 on 2015/5/28.
 * 主界面
 */
class MainView extends XWindow{
    /**头像*/
    private $headCom:HeadCom;
    private $moneyCom_0:MoneyCom;
    private $moneyCom_1:MoneyCom;
    //体力框
    private $stamina:MoneyCom;
    /***/
    private $shopBtn:egret.Bitmap;
    /**shenying*/
    private $musicBtn:egret.Bitmap;
    /**剧情回放*/
    private $replayeBtn:egret.Bitmap;
    /**精英剧本*/
    private $exBtn:egret.Bitmap;
    /**普通剧本*/
    private $normalBtn:egret.Bitmap;
    /**签到*/
    private $signBtn:egret.Bitmap;
    //
    private _replayView:SelectStoryView;
    //
    private $actBtn:egret.Bitmap;
    //
    private $rechargeBtn:egret.Bitmap;
    //记录背景
    /**背景*/
    private $bg:egret.Bitmap;
    //章节文本
    private $infoTF:egret.TextField;
    /**/
    private _itemList:egret.gui.List;
    //
    private _items:StoryItemCom[];
    //数据层
    private _myCollection:egret.gui.ArrayCollection;
    //
    public static FIIGHT_RES:string = "zhandoudi,daxueping,breakBtn,xiaoxueping,zhongxueping,mov_png,mov_json,skill_1_png,skill_1_json,baoji,miss,yingzi,qianghuaanniu,zhuangbeianniu,pingjiabiao,shibai,tongguan,zhandouxuetiao,zhandouxuetiaodi,zhandouxuetiaoguang,jiesudi,jinjiekuang,fightSND,recoverSND,skillSND";
    public constructor(){
        super();
        this.init();
    }

    public show():void{
        this.addChild(BottomCom.getInstance());
        BottomCom.getInstance().y = 829;
        this.addChild(TopCom.getInstance());
        super.show();
        this.showUserInfo();
        this.showChapter();
        SoundManager.playBGM("bgSND");
        //this.$rechargeBtn.visible = !User.getInstance().hasReward;
    }

    /**显示用户信息*/
    public showUserInfo():void{
        var user:User = User.getInstance();
        this.$headCom.showUserInfo(user);
        this.$moneyCom_0.showValue(user.money);
        this.$moneyCom_1.showValue(user.point);
        this.$stamina.showValue(user.stamina+"/"+user.staminaMax);
    }

    /**显示关卡进度*/
    public showChapter():void{
        this.$normalBtn.visible = this.$exBtn.visible = this.$replayeBtn.visible = (User.getInstance().chapterId >0);

        if(this.$bg.texture && this.$bg.texture != RES.getRes(DialogModel.data.pic)){
            var bm:egret.Bitmap = new egret.Bitmap();
            this.addChildAt(bm,this.getChildIndex(this.$bg));
            bm.x = this.$bg.x;
            bm.y = this.$bg.y;
            bm.texture = this.$bg.texture;
            CoolEffect.fadeOut(bm,600,bm.parent.removeChild, bm.parent, [bm]);
            CoolEffect.fadeIn(this.$bg,600);
        }
        this.$bg.texture = RES.getRes(DialogModel.data.pic);
        this.clearItems();
        var id:number;
        if(User.getInstance().nowChapId == User.getInstance().chapterId){
            id  = User.getInstance().sectionId+1;
        }else{
            id = DialogModel.data.list.length;
        }
        this.$infoTF.text = DialogModel.data.name;
        var sourceArr:any[] = [];
        if(FightModel.FIGHT_MODE == "normal"){
            var maxNum:number = DialogModel.maxSection;
            for(var i:number=0; i<=id; i++){
                sourceArr.unshift({ data: DialogModel.data.list[i],isNew: (i == id) });
                if(i == maxNum-1){
                    break;
                }
            }
        }else{
            var list:any[] = DialogModel.getEXLv();
            for(var i:number=0; i<list.length; i++){
                sourceArr.unshift({ data: list[i],isNew: (i == id) });
            }
        }
        //console.log(sourceArr,"xxo",list);
        this._myCollection = new egret.gui.ArrayCollection(sourceArr);
        this._itemList.dataProvider = this._myCollection;

        //植入新手引导=========================================================================================
        //====================================================================================================
        if(!Guide.hasFinishedGuid(Guide.STORY_GUIDE)){
            Guide.showGuide(Guide.STORY_GUIDE);
            Guide.curGuide.showGuide([this._itemList], null, null)
        }else if((User.getInstance().chapterId > 0 || User.getInstance().sectionId >= 0) && !Guide.hasFinishedGuid(Guide.EQUIP_GUIDE)){
            if(BagModel.getItemById(ItemData.F_EQUIP).length > 0){
                Guide.showGuide(Guide.EQUIP_GUIDE);
                Guide.curGuide.showGuide([BottomCom.getInstance()]);
            }
        }else if(!Guide.hasFinishedGuid(Guide.GROW_GUIDE) && Guide.hasFinishedGuid(Guide.FRAM_GUIDE) && (User.getInstance().chapterId > 0 || User.getInstance().sectionId >= 5)){
            //成长引导
            egret.setTimeout(function(){
                Guide.showGuide(Guide.GROW_GUIDE);
                Guide.curGuide.showGuide([BottomCom.getInstance()]);
            }, this,50);
        }else if(!Guide.hasFinishedGuid(Guide.LADDER_GUIDE) && Guide.hasFinishedGuid(Guide.EQUIP_GUIDE) && (User.getInstance().chapterId > 0 || User.getInstance().sectionId >= 3)){
            //天梯引导
            egret.setTimeout(function(){
                Guide.showGuide(Guide.LADDER_GUIDE);
                Guide.curGuide.showGuide();
            }, this,50);
        }else if(!Guide.hasFinishedGuid(Guide.FRAM_GUIDE) && Guide.hasFinishedGuid(Guide.LADDER_GUIDE) && (User.getInstance().chapterId > 0 || User.getInstance().sectionId >= 4)){
            //城邦
            egret.setTimeout(function(){
                Guide.showGuide(Guide.FRAM_GUIDE);
                Guide.curGuide.showGuide();
            }, this,50);
        }
    }

    //可以优化
    private clearItems():void{
        if(this._items){
            for(var i:number=0; i<this._items.length; i++){
                if(this._items[i].parent){
                    this._items[i].parent.removeChild(this._items[i]);
                }
            }
        }
        this._items = [];
    }

    //打开精英关卡
    private onOpenEXLv():void{
        DialogModel.initEXLv(RES.getRes("fightData"));
        RewardData.initEX(RES.getRes("rewardData2"));
        FightModel.initEXNpcData(RES.getRes("SMonsterData"));
        //
        this.showChapter();
    }

    //
    private onChange(event:egret.Event):void{
        this.showUserInfo();
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        this.$bg = bm;

        bm = new egret.Bitmap();
        bm.y = 380;
        this.addChild(bm);
        bm.texture = RES.getRes("di1");

        bm = new egret.Bitmap();
        bm.y = 352;
        this.addChild(bm);
        bm.texture = RES.getRes("renwudi");
        this.$infoTF = new egret.TextField();
        this.addChild(this.$infoTF);
        this.$infoTF.x = 12;
        this.$infoTF.y = 390;
        this.$infoTF.width  = 156;
        this.$infoTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$infoTF.size = 23;
        this.$infoTF.text = "嫡子微软雅黑";
        this.$infoTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$infoTF.strokeColor = 0x251E16;
        this.$infoTF.stroke = 2;

        this.$headCom = new HeadCom();
        this.$headCom.x = 8;
        TopCom.getInstance().addChild(this.$headCom);
        this.$moneyCom_0 = new MoneyCom();
        this.$moneyCom_1 = new MoneyCom(MoneyCom.POINT);
        TopCom.getInstance().addChild(this.$moneyCom_0);
        TopCom.getInstance().addChild(this.$moneyCom_1);
        this.$moneyCom_1.x= LayerManager.stage.stageWidth-this.$moneyCom_1.width;
        this.$moneyCom_0.x = this.$moneyCom_1.x - this.$moneyCom_0.width;
        this.$stamina = new MoneyCom(MoneyCom.STAMINA);
        TopCom.getInstance().addChild(this.$stamina);
        this.$stamina.x = this.$moneyCom_0.x - this.$stamina.width;
        this.$moneyCom_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$moneyCom_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$stamina.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);

        this.$actBtn = new egret.Bitmap();
        this.addChild(this.$actBtn);
        this.$actBtn.x = 516;
        this.$actBtn.y = 209;
        this.$actBtn.texture = RES.getRes("huodong");

        this.$rechargeBtn = new egret.Bitmap();
        this.addChild(this.$rechargeBtn);
        this.$rechargeBtn.x = 515;
        this.$rechargeBtn.y = 290;
        this.$rechargeBtn.texture = RES.getRes("rechargeIcon");

        this.$signBtn = new egret.Bitmap();
        this.addChild(this.$signBtn);
        this.$signBtn.x = 536;
        this.$signBtn.y = 128;
        this.$signBtn.texture = RES.getRes("signIcon");

        this.$shopBtn = new egret.Bitmap();
        this.addChild(this.$shopBtn);
        this.$shopBtn.x = 541;
        this.$shopBtn.y = 54;
        this.$shopBtn.texture = RES.getRes("shangdian");
        this.$shopBtn.touchEnabled = this.$actBtn.touchEnabled = this.$rechargeBtn.touchEnabled = this.$signBtn.touchEnabled = true;

        this.$musicBtn = new egret.Bitmap();
        this.addChild(this.$musicBtn);
        if(SoundManager.isOff){
            this.$musicBtn.texture = RES.getRes("music2");
        }else{
            this.$musicBtn.texture = RES.getRes("music");
        }
        this.$musicBtn.x = 8;
        this.$musicBtn.y = 72;
        this.$musicBtn.touchEnabled = true;

        this.$replayeBtn = new egret.Bitmap();
        this.addChild(this.$replayeBtn);
        this.$replayeBtn.touchEnabled = true;
        this.$replayeBtn.x = 14;
        this.$replayeBtn.y = 305;
        this.$replayeBtn.visible = false;
        this.$replayeBtn.texture = RES.getRes("replayBtn");

        this.$exBtn = new egret.Bitmap();
        this.addChild(this.$exBtn);
        this.$exBtn.touchEnabled = true;
        this.$exBtn.x = 410;
        this.$exBtn.y = 390;
        this.$exBtn.visible = false;
        RES.getResAsync("exBtn",this.loadExBtn,this);

        this.$normalBtn = new egret.Bitmap();
        this.addChild(this.$normalBtn);
        this.$normalBtn.touchEnabled = true;
        this.$normalBtn.x = 530;
        this.$normalBtn.y = 390;
        this.$normalBtn.visible = false;
        RES.getResAsync("normalBtn",this.loadNormalBtn,this);

        this._itemList = new egret.gui.List();
        this._itemList.percentWidth = 100;
        this._itemList.percentHeight = 100;
        this._itemList.x = 40;
        this._itemList.y = 456;
        this._itemList.height = 350;
        this.addChild(this._itemList);
        this._itemList.itemRenderer = new egret.gui.ClassFactory(StoryItemRender);

        this.addChild(BottomCom.getInstance());
        BottomCom.getInstance().y = 829;
    }

    private loadExBtn(tx:any){
        this.$exBtn.texture = tx;
    }

    private loadNormalBtn(tx:any){
        this.$normalBtn.texture = tx;
    }

    private onTouchHandle(event: egret.TouchEvent): void
    {
        switch(event.currentTarget)
        {
            case this.$moneyCom_1:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
                break;
            case this.$moneyCom_0:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_MALL));
                break;
            case this.$stamina:
                UserModel.buyStamina();
                break;
            case this.$actBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_EXCHANGE));
                break;
            case this.$rechargeBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_RECHARGE));
                break;
            case this.$shopBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_MALL));
                break;
            case this.$signBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_SIGN));
                break;
            case this.$musicBtn:
                if(SoundManager.isOff){
                   /* if(!SoundManager.getBgSnd() ){
                        SoundManager.playBGM("bgSND");
                    }*/
                    SoundManager.isOff = false;
                    SoundManager.playBGM("bgSND");
                    this.$musicBtn.texture = RES.getRes("music");
                }else{
                    SoundManager.isOff = true;
                    this.$musicBtn.texture = RES.getRes("music2");
                }
                break;
            case this.$replayeBtn:
                if(!this._replayView){
                    this._replayView = new SelectStoryView();
                }
                this._replayView.show();
                break;
            case this.$normalBtn:
                if(FightModel.FIGHT_MODE != "normal"){
                    FightModel.FIGHT_MODE = "normal";
                    this.showChapter();
                }
                break;
            case this.$exBtn:
                if(FightModel.FIGHT_MODE != "ex"){
                    FightModel.FIGHT_MODE = "ex";
                    XLoading.load("exLv", this.onOpenEXLv, this, null);
                }
                break;
        }
    }

    public initEvent():void{
        User.getInstance().addEventListener(User.CHANGE,this.onChange,this);
        this._itemList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        //this.$moneyCom_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        //this.$moneyCom_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$actBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$rechargeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$signBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$replayeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$exBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$normalBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }

    public removeEvent():void{
        //User.getInstance().removeEventListener(User.CHANGE,this.onChange,this);
        this._itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        //this.$moneyCom_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        //this.$moneyCom_0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$actBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$rechargeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$shopBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$signBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$replayeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$exBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$normalBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }

    private onTap(event:egret.TouchEvent):void{
        if(!this._itemList.selectedItem || !this._itemList.selectedItem.data){
            return;
        }
        if(this._itemList.selectedItem.data.type == "1"){
            //改成体力计算了20150812----------------------
            var staminaNeed:number = 5;
            if(FightModel.FIGHT_MODE == "ex"){
                staminaNeed = 10;
            }
            if(User.getInstance().stamina < staminaNeed) {
                XTip.showTip("啊呀~没体力了也,亲可以去挑战天梯，能获得丰厚奖励哦！");
            }else{
                UserModel.updateStamina(-1*staminaNeed);
                var info:any = this._itemList.selectedItem.data.dialogList[0];
                var npcList:string[] = info.eventInfo.fight.split("|");
                var imgList:string[] = [];
                var tempInfo:any;
                for(var i in npcList){

                    //区别普通与精英战斗===================================
                    if(FightModel.FIGHT_MODE == "normal"){
                        tempInfo= FightModel.getNpcData(npcList[i]);
                    }else{
                        tempInfo= FightModel.getEXNpcData(npcList[i]);
                    }

                    if(imgList.indexOf(tempInfo.pic) == -1){
                        imgList.push(tempInfo.pic);
                    }
                }
                //console.log(MainView.FIIGHT_RES.split(",").concat(imgList),"npc");
                RES.createGroup("temp",MainView.FIIGHT_RES.split(",").concat(imgList), true);
                XLoading.load("temp", this.onGroupLoaded, this, null);
            }
        }else{
            GameView.getInstance().show(false,this._itemList.selectedItem.data);
            this._itemList.selectedIndex = -1;
            this.close();
        }
    }

    private onGroupLoaded():void{
        XLoading.dispose("temp");
        GameView.getInstance().show(false,this._itemList.selectedItem.data);
        this._itemList.selectedIndex = -1;
        this.close();
    }
}

class TopCom extends egret.DisplayObjectContainer{
    private static _instace:TopCom;
    public constructor(){
        super();
    }
    public static getInstance():TopCom{
        if(!TopCom._instace){
            TopCom._instace = new TopCom();
        }
        return TopCom._instace;
    }
}