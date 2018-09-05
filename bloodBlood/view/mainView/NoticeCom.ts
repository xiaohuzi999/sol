/**
 * Created by 马达加加加 on 2015/11/20.
 * 公告
 */
class NoticeCom extends egret.DisplayObjectContainer{
    private $bg:egret.Bitmap;
    private $icon:egret.Bitmap;
    private $tf:egret.TextField;
    private _msg:string= "";
    public static DIC:any = {};
    //最大播放次数
    private MAX:number = 10;
    public constructor(){
        super();
        this.init();
    }

    public showNotice(msg:string):boolean{
        this._msg = msg;
        if(this._msg){
            return this.showMsg();
        }
        return false;
    }

    private showMsg():boolean{
        NoticeCom.DIC[this._msg].cur ++;
        if(NoticeCom.DIC[this._msg].cur > NoticeCom.DIC[this._msg].max){
            return;
        }
        LayerManager.stage.addChild(this);
        this.$tf.text = this._msg;
        egret.setTimeout(this.hide, this, 8000);
        return NoticeCom.DIC[this._msg].cur == NoticeCom.DIC[this._msg].max;
    }

    private hide():void{
        if(this.parent){
            this.parent.removeChild(this);
        }
    }

    private onLoadBG(tx:any):void{
        this.$bg.texture = tx;
    }

    private onLoadIcon(tx:any):void{
        this.$icon.texture = tx;
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        this.$bg = bm;
        RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/mainView/noticeBG.png", this.onLoadBG, this);

        bm = new egret.Bitmap(RES.getRes("notice.honk"));
        this.addChild(bm);
        bm.x = 56;
        bm.y = 7;
        this.$icon = bm;
        RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/mainView/honk.png", this.onLoadIcon, this);

        this.$tf = new egret.TextField();
        this.addChild(this.$tf);
        this.$tf.x = 105;
        this.$tf.y = 12;
        this.$tf.size = 20;
        this.$tf.textColor = 0xd3c5a9;
        this.$tf.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$tf.textAlign = egret.HorizontalAlign.LEFT;
        this.$tf.width = 420;

        this.x = 50;
        this.y = 100;
    }

    private static _instance:NoticeCom;
    public static getInstance():NoticeCom{
        if(!NoticeCom._instance){
            NoticeCom._instance = new NoticeCom();
        }
        return NoticeCom._instance;
    }
}
