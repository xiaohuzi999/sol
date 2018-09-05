/**
 * Created by 马达加加加 on 2015/5/28.
 */
class BottomCom extends egret.DisplayObjectContainer{
    //
    private $storyBtn:egret.Bitmap;
    //
    private $teamBtn:egret.Bitmap;
    //
    private $equiBtn:egret.Bitmap;
    //
    private $farmBtn:egret.Bitmap;
    //
    public $ladderBtn:egret.Bitmap;
    //当前高亮
    private _currentBtn:egret.Bitmap;

    /**事件-显示剧情*/
    public static SHOW_STORY:string = "main";
    /**事件-显示队伍*/
    public static SHOW_TEAM:string = "team";
    /**事件-显示装备*/
    public static SHOW_BAG:string = "bag";
    /**事件-显示商店*/
    public static SHOW_MALL:string = "mall";
    /**事件-显示装备*/
    public static SHOW_EQUIP:string = "equip";
    //事件-显示天梯赛
    public static SHOW_MATCH:string = "match";
    /** 购买确认 */
    public static SHOW_BUYCONFIRM: string = "buyConfirm";
    /** 功绩商店 */
    public static SHOW_POINTMALL: string = "pointMall";
    /**事件-显示充值活动*/
    public static SHOW_RECHARGE:string = "act";
    /**事件-显示兑换活动*/
    public static SHOW_EXCHANGE:string = "exchange";
    /***/
    public static SHOW_FARM:string = "farm";
    /***/
    public static SHOW_SIGN:string = "sign";
    /**事件-关闭浮动窗体*/
    public static CLOSE_POPWIN:string = "close";

    /**单例*/
    private static _instance:BottomCom;
    public constructor(){
        super();
        this.init();
    }

    /**设定选中按钮*/
    public setSelect(type:string):void{
        this.$storyBtn.texture = this.$teamBtn.texture = this.$equiBtn.texture = this.$farmBtn.texture = this.$ladderBtn.texture = RES.getRes("biaodi");
        switch(type){
            case BottomCom.SHOW_STORY:
                this.$storyBtn.texture = RES.getRes("biaodi2");
                this._currentBtn = this.$storyBtn;
                break;
            case BottomCom.SHOW_TEAM:
            case BottomCom.SHOW_EQUIP:
                this.$teamBtn.texture = RES.getRes("biaodi2");
                this._currentBtn = this.$teamBtn;
                break;
            case BottomCom.SHOW_BAG:
                this.$equiBtn.texture = RES.getRes("biaodi2");
                break;
            case BottomCom.SHOW_FARM:
                this.$farmBtn.texture = RES.getRes("biaodi2");
                this._currentBtn = this.$farmBtn;
                break;
            case BottomCom.SHOW_MATCH:
                this.$ladderBtn.texture = RES.getRes("biaodi2");
                this._currentBtn = this.$ladderBtn;
                break;
        }
    }

    /***/
    private onBtnClick(event:egret.TouchEvent):void{
        switch(event.currentTarget){
            case this.$storyBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_STORY));
                break;
            case this.$farmBtn:
                /***
                FightView.getInstance().showReplay(RES.getRes("fightTest").Data);
                return;
                 */
                if(User.getInstance().chapterId==0 && User.getInstance().sectionId < 4){
                    XTip.showTip("通关《阴谋》后开启");
                    return ;
                }
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_FARM));
                break;
            case this.$teamBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_TEAM));
                break;
            case this.$equiBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_BAG));
                break;
            case this.$ladderBtn:
                //XTip.showTip(Strings.COMMING);
                //return;
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_MATCH));
                break;
        }
    }

    /***/
    private onClosePop():void{
        this.$storyBtn.texture = this.$teamBtn.texture = this.$equiBtn.texture = this.$farmBtn.texture = RES.getRes("biaodi");
        this._currentBtn.texture = RES.getRes("biaodi2");
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("di4");
        bm.y = 61;

        this.$storyBtn = new egret.Bitmap(RES.getRes("biaodi2"));
        this._currentBtn = this.$storyBtn;
        this.addChild(this.$storyBtn);
        this.$storyBtn.x = -10;
        this.$storyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);

        this.$teamBtn = new egret.Bitmap(RES.getRes("biaodi"));
        this.addChild(this.$teamBtn);
        this.$teamBtn.x = 116;
        this.$teamBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);

        this.$equiBtn = new egret.Bitmap(RES.getRes("biaodi"));
        this.addChild(this.$equiBtn);
        this.$equiBtn.x = 244;
        this.$equiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);

        this.$farmBtn = new egret.Bitmap(RES.getRes("biaodi"));
        this.addChild(this.$farmBtn);
        this.$farmBtn.x = 370;
        this.$farmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);

        this.$ladderBtn = new egret.Bitmap(RES.getRes("biaodi"));
        this.addChild(this.$ladderBtn);
        this.$ladderBtn.x = 498;
        this.$ladderBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);

        this.$storyBtn.touchEnabled = this.$teamBtn.touchEnabled = this.$equiBtn.touchEnabled = this.$farmBtn.touchEnabled = this.$ladderBtn.touchEnabled = true;
        this.$storyBtn.width = this.$teamBtn.width = this.$equiBtn.width = this.$farmBtn.width = this.$ladderBtn.width = 152;
        this.$storyBtn.height = this.$teamBtn.height = this.$equiBtn.height = this.$farmBtn.height = this.$ladderBtn.height = 139;
        this.$storyBtn.y = this.$teamBtn.y = this.$equiBtn.y = this.$farmBtn.y = this.$ladderBtn.y = -4;

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("juqing");
        bm.x = 8;
        bm.y = -2;

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("duiwu");
        bm.x = 153;
        bm.y = -11;

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("daoju");
        bm.x = 289;
        bm.y = -15;

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("farmIcon");
        bm.x = 388;
        bm.y = -25;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("ladderIcon");
        bm.x = 524;
        bm.y = -17;
        this.addChild(bm);
        MainDispatcher.getInstance().addEventListener(BottomCom.CLOSE_POPWIN, this.onClosePop, this);
    }

    public static getInstance():BottomCom{
        if(!BottomCom._instance){
            BottomCom._instance = new BottomCom();
        }
        return BottomCom._instance;
    }
}