/**
 * Created by 马达加加加 on 2015/5/28.
 */
class MoneyCom extends egret.DisplayObjectContainer{
    //背景框资源字段
    private _bg:string;
    //背景框纹理
    private _bg_bm:egret.Bitmap;
    //点击按键纹理
    private $addBtn:egret.Bitmap;
    //值
    private $valueTF:egret.TextField;
    /**背景类型-金币*/
    public static GOLD:string = "jinbikuang";
    /**背景类型-宝石*/
    public static POINT:string = "baoshikuang";
    /**背景类型-体力*/
    public static STAMINA:string = "tilikuang";
    /**背景类型-功绩**/
    //public static FEATS:string = "";
    public constructor(bg:string="jinbikuang"){
        this._bg = bg;
        super();
        this.init();
    }

    /***/
    public showValue(v: any): void {
        this.$valueTF.text = v + "";
        //金币框
        /*if(this._bg == "jinbikuang")
            TipsManager.registerTips(this,Strings.MONEY + "：" + v);
        else
            TipsManager.registerTips(this,Strings.POINT + "：" + v);*/
    }

    /**设置背景框大小**/
    public setBgSize(num:number):void{
        this._bg_bm.width = num;
        this.$addBtn.x = num - 46;
        this.$addBtn.y = 12;
        this.$valueTF.y = 0;
        this.$valueTF.width = num - 90;
        this.$valueTF.height = 51;
        this.$valueTF.size = 18/180 * num;
        this.$valueTF.verticalAlign = egret.VerticalAlign.MIDDLE;
    }

    public autoSize(v:number):void {
        if( v > 999999 ){
            this.$valueTF.size = 12;
        }else{
            this.$valueTF.size = 14;
        }
    }

    /**设置点击按键纹理**/
    public setBtnTexture(res:string){
        this.$addBtn.texture = RES.getRes( res );
    }


    private init():void{
        this._bg_bm = new egret.Bitmap();
        this.addChild(this._bg_bm);
        this._bg_bm.width = 150;
        this._bg_bm.texture = RES.getRes(this._bg);

        this.$addBtn = new egret.Bitmap();
        this.$addBtn.texture = RES.getRes("jiahao");
        this.addChild( this.$addBtn);
        this.$addBtn.x = 105;
        this.$addBtn.y = 12;
        this.$addBtn.name = "addBtn";

        this.$valueTF = new egret.TextField();
        this.addChild(this.$valueTF);
        this.$valueTF.x = 39;
        this.$valueTF.y = 16;
        this.$valueTF.width = 64;
        this.$valueTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$valueTF.bold = true;
        this.$valueTF.textAlign = egret.HorizontalAlign.CENTER;
        //this.$valueTF.textAlign = egret.VerticalAlign.MIDDLE;
        this.$valueTF.size = 14;
        this.$valueTF.text = "999999";
        this.touchEnabled = true;
    }
}
