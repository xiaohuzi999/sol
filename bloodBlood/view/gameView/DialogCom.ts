/**
 * Created by 马达加加加 on 2015/5/28.
 */
class DialogCom extends  egret.DisplayObjectContainer {
    
    /**背景-支持9宫格*/
    private $bg:egret.Bitmap;
    /**名字背景条*/
    private $nameBg:egret.Bitmap;
    /**名字*/
    private $nameTF:egret.TextField;
    /**对话内容*/
    private $dialogTF:egret.TextField;
    /***/
    private $maskSp:egret.Shape;
    /**箭头*/
    private static $arrow:egret.Bitmap;

    private $data: any;
    
    public constructor(){
        super();
        this.init();
    }

    private init():void{
        this.$bg = new egret.Bitmap();
        this.$nameBg = new egret.Bitmap();
        this.addChild(this.$nameBg);
        this.$nameBg.x = 0;
        this.$nameBg.y = 40;
    }

    public reset():void{
        if(this.$maskSp){
            this.$maskSp.graphics.clear();
            this.removeChild(this.$maskSp);
        }
        if(this.$nameTF){
            this.$nameTF.text = "";
        }
        if(this.$dialogTF){
            this.$dialogTF.text = "";
        }
        this.$bg.texture = null;
        this.$nameBg.texture = null;
        this.$bg.y = 0;
    }

    /**变灰*/
    public drawMask():void{
        if(!this.$maskSp){
            this.$maskSp = new egret.Shape();
        }
        this.$maskSp.graphics.beginFill(0x0);
        this.$maskSp.graphics.drawRect(0,0, this.width,this.$bg.y+this.$bg.height);
        this.$maskSp.graphics.endFill();
        this.$maskSp.alpha = 0.3;
        this.addChild(this.$maskSp);
    }

    /**显示对话信息*/
    public showDialog(data:any):void{
        this.$data = data;
        if(data.dialog){
            if(data.name){
                if(User.getInstance().userName != "殷血歌"){
                    data.name = (data.name+"").replace("殷血歌",User.getInstance().userName);
                }
                if(!this.$nameTF){
                    this.$nameTF = new egret.TextField();
                }
                this.$nameTF.textFlow = Utils.htmlParser.parser(data.name);
                this.addChild(this.$nameTF);
                this.$nameTF.x = 16;
                this.$nameTF.y = 45;
                this.$nameTF.fontFamily = Strings.DEFAULT_FONT_NAME;
                this.$nameTF.size = 24;
            }
            if(data.dialog){
                if(User.getInstance().userName != "殷血歌"){
                    data.dialog = (data.dialog+"").replace("殷血歌",User.getInstance().userName);
                    data.dialog = (data.dialog+"").replace("血歌",User.getInstance().userName);
                }
                if(!this.$dialogTF){
                    this.$dialogTF = new egret.TextField();
                    this.$dialogTF.width = 485;
                    this.addChild(this.$dialogTF);
                }
                this.$dialogTF.text = data.dialog;
                this.$dialogTF.x = 16;
                this.$dialogTF.fontFamily = Strings.DEFAULT_FONT_NAME;
                this.$dialogTF.size = 24;
                this.$dialogTF.textColor = 0x604017;
                if(this.$nameTF && data.name){
                    this.$dialogTF.y = this.$nameTF.y+this.$nameTF.height + 16;
                }else{
                    this.$dialogTF.y = 30;
                }
            }
        }
        //console.log("dialog",data, data.rightPlayer)
        if(data.name && data.leftPlayer && data.leftPlayer.name && (!data.leftPlayer.alpha || data.leftPlayer.alpha == 1)){//左边
           this.$bg.texture = RES.getRes("duihuakuang1");
            this.$nameBg.texture = RES.getRes("duihuarenwu");
        }else if(data.name && data.rightPlayer && data.rightPlayer.name && (!data.rightPlayer.alpha || data.rightPlayer.alpha == 1)){//右边
            this.$bg.texture = RES.getRes("duihuakuang2");
            this.$nameBg.texture = RES.getRes("duihuarenwu2");
        }else{
            this.$bg.texture = RES.getRes("pangbai");
            this.$bg.y = 14;
            this.$nameBg.texture = null;
            if(this.$dialogTF){
                this.$dialogTF.textColor = 0xffffff;
            }
        }
        if(this.$dialogTF){
            this.$bg.height = Math.max(97,this.$dialogTF.y + this.$dialogTF.height + 14);
            this.$dialogTF.text = "";
            this.$dialogTF.textFlow = Utils.htmlParser.parser(data.dialog);
//            CoolEffect.typerEffect(this.$dialogTF,DialogCom.htmlParser.parser(data.dialog),50);
        }
        this.addChildAt(this.$bg, 0);

        //箭头
        DialogCom.arrow.y = this.$bg.y + this.$bg.height+5;
        this.addChild(DialogCom.arrow);
        egret.Tween.removeTweens(DialogCom.arrow);
        this.moveArrowDown();
    }

    private moveArrowDown(): void
    { 
        egret.Tween.get(DialogCom.arrow).to({ y: DialogCom.arrow.y + 5 }, 300).call(
            this.moveArrowUp, this
        );
        
    }
    private moveArrowUp(): void
    { 
        egret.Tween.get(DialogCom.arrow).to({ y: DialogCom.arrow.y - 5 }, 300).call(
            this.moveArrowDown, this
        );
    }

    /***/
    private static get arrow():egret.Bitmap{
        if(!DialogCom.$arrow){
            DialogCom.$arrow = new egret.Bitmap();
            DialogCom.arrow.texture = RES.getRes("jiantou");
            DialogCom.$arrow.x = 400;
        }
        return DialogCom.$arrow;
    }
}

/**对象池*/
class DialogComPool{
    /***/
    private static _map:DialogCom[]=[];
    /**最大容量*/
    private static MAX_SIZE:number = 10;
    /**获取*/
    public static get():DialogCom{
        if(DialogComPool._map.length){
            return DialogComPool._map.shift();
        }
        return new DialogCom();
    }

    /**入池*/
    public static put(item:DialogCom):void{
        if(DialogComPool._map.length < DialogComPool.MAX_SIZE){
            DialogComPool._map.push(item);
        }
    }
}
