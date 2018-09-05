/**
 * Created by 马达加加加 on 2015/8/27.
 */
class RechargeActView extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    private $rechargeBtn:egret.Bitmap;
    private $getBtn:egret.Bitmap;
    //单例
    private static _instance:RechargeActView;
    public constructor(){
        super();
        this.init();
    }

    public show():void{
        super.show();
        CoolEffect.flowIn(this);
    }

    public close():void{
        CoolEffect.flowOut(this, 250,super.close, this);
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        switch(event.target){
            case this.$closeBtn:
                this.close();
                MainDispatcher.getInstance().dispatchEventWith(BottomCom.CLOSE_POPWIN);
                break;
            case this.$rechargeBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
                break;
            case this.$getBtn:
                if(User.getInstance().recharegeNum >0){
                    if(User.getInstance().hasReward){
                        XTip.showTip("亲~您已领取该奖励。")
                    }else{
                        BagModel.addItem(108);
                        XTip.showTip("获得玄屠剑");
                        User.getInstance().hasReward = true;
                        UserModel.save();
                    }
                }else{
                    XTip.showTip("亲~您还没有充值哦。")
                }
                break;
        }
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("RA_bg");

        this.$closeBtn = new egret.Bitmap();
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 427;
        this.$closeBtn.y = 40;

        this.$rechargeBtn = new egret.Bitmap();
        this.addChild(this.$rechargeBtn);
        this.$rechargeBtn.x = 81;
        this.$rechargeBtn.texture = RES.getRes("RA_chargeBtn");

        this.$getBtn = new egret.Bitmap();
        this.addChild(this.$getBtn);
        this.$getBtn.texture = RES.getRes("RA_getBtn");
        this.$getBtn.x = 260;
        this.$rechargeBtn.y = this.$getBtn.y = 365;
        this.$closeBtn.touchEnabled = this.$getBtn.touchEnabled = this.$rechargeBtn.touchEnabled = true;
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    //
    public static getInstance():RechargeActView{
        if(!RechargeActView._instance){
            RechargeActView._instance = new RechargeActView();
        }
        return RechargeActView._instance;
    }
}