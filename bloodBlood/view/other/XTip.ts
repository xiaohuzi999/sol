/**
 * Created by 马达加加加 on 2015/6/10.
 */
class XTip extends XWindow{
    private $msgTF:egret.TextField;
    private $bg:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    public static showTip(str:string):void{
        var tip:XTip = new XTip();
        tip.showTip(str);
        egret.setTimeout(tip.close,tip,1000);
    }

    private showTip(str:string):void{
        this.$msgTF.text = str;
        this.$bg.height = this.$msgTF.y + this.$msgTF.height + 20;
        this.show(true);
        this.y -= 100;
    }

    public close():void{
        CoolEffect.flowOut(this, 500, super.close,this)
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes("xiaochuang");
        this.addChild(bm);
        this.$bg = bm;

        this.$msgTF = new egret.TextField();
        this.addChild(this.$msgTF);
        this.$msgTF.x = 40;
        this.$msgTF.y = 32;
        this.$msgTF.width = 349;
        this.$msgTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$msgTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.touchEnabled = false;
    }
    public getLayer():number{
        return LayerManager.LAYER_TOP;
    }
}