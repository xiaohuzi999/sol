/**
 * Created by yanmingjie on 2015/7/29.
 */
class PrizeListCom extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    private $context:egret.TextField;
    public constructor(){
        super();
        this.init();
    }

    private static _instance: PrizeListCom;
    public static showPrize(str:string):void{
        if( !this._instance )
            this._instance = new PrizeListCom();
        this._instance.show();
        this._instance.$context.text = str;
    }

    public show():void{
        super.show();
        CoolEffect.flowIn(this);
    }
    public close():void{
        CoolEffect.flowOut(this,250,super.close,this,null);
    }

    private onTouch(event:egret.TouchEvent):void{
        this.close();
    }

    public initEvent():void{
        this.$closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.$closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes("daojudi");
        bm.height = 400;
        this.addChild(bm);

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 440;
        this.$closeBtn.y = 1;
        this.$closeBtn.width = 80;
        this.$closeBtn.height = 80;
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.touchEnabled = true;

        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.text = "排行奖励";
        tf.x = 152;
        tf.y = 50;
        tf.width = 196;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.textColor = 0xcea86d;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$context = new egret.TextField();
        this.addChild(this.$context);
        this.$context.x = 50;
        this.$context.lineSpacing = 6;
        this.$context.y = 115;
        this.$context.size = 24;
        this.$context.width = 420;
        this.$context.textColor = 0xa28454;
        this.$context.lineSpacing = 10;
        this.$context.textAlign = egret.HorizontalAlign.CENTER;
        this.$context.fontFamily = Strings.DEFAULT_FONT_NAME;

    }


}