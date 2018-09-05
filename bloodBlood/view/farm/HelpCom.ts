/**
 * Created by 马达加加加 on 2015/7/16.
 */
class HelpCom extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    public constructor(){
        super();
        this.init();
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
        bm.height = 766;
        this.addChild(bm);

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 450;
        this.$closeBtn.y = 1;
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.touchEnabled = true;

        var strArr:string[] = Strings.FARM_HELP.split("|");
        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.text = strArr[0];
        tf.x = 152;
        tf.y = 52;
        tf.width = 196;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.textColor = 0xcea86d;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        tf = new egret.TextField();
        this.addChild(tf);
        tf.text = strArr[1];
        tf.x = 50;
        tf.lineSpacing = 8;
        tf.y = 110;
        tf.size = 24;
        tf.width = 420;
        tf.textColor = 0xa28454;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;


    }
}