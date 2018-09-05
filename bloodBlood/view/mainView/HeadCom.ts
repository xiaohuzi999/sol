/**
 * Created by 马达加加加 on 2015/5/28.
 * 头像组件
 */
class HeadCom extends egret.DisplayObjectContainer{
    
    private $lvTF:egret.TextField;
    private $nameTF: egret.TextField;
    private $hpTF: egret.TextField;
    private $hpBm:egret.Bitmap;
    private $hpFlag:egret.Bitmap;
    private $hpSprite: egret.Sprite;
    private $honorIcon: egret.Bitmap;
    
    public constructor(){
        super();
        this.init();
    }

    /**显示数据*/
    public showUserInfo(user:User):void{
        this.$lvTF.text = user.lv.toString();
        var info:any = TeamModel.getGrowData(user.role.honorLv);
        var per:number = user.role.honor/info.honor;
        this.$hpBm.scrollRect = new egret.Rectangle(0,0,per*this.$hpBm.width, this.$hpBm.height);
        this.$hpTF.text = user.role.honor + "/" + info.honor;
        if(user.exp != 0){
            this.$hpFlag.visible = true;
            this.$hpFlag.x = this.$hpBm.x + per*this.$hpBm.width-this.$hpFlag.width/2;
        }else{
            this.$hpFlag.visible = false;
        }
        
        var honorImgUrl: string = TeamModel.getHonorRes(user.role.honorLv-1);
        RES.getResByUrl(honorImgUrl, this.getHonorImgResult,this);

        TipsManager.registerTips(this.$hpSprite,"进阶：" + user.role.honor + "/" + info.honor);
    }
    
    private getHonorImgResult(data: any, url:string): void
    { 
        this.$honorIcon.texture = data;
        this.$honorIcon.x = 1 + (57 - this.$honorIcon.width ) >> 1;
    }

    private init():void{
        
        this.$hpSprite = new egret.Sprite();
        this.addChild(this.$hpSprite);
        this.$hpSprite.touchEnabled = true;
        
        var bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes("xuetiaodi");
        bm.x = 36;
        bm.y = 12;
        this.$hpSprite.addChild(bm);

        this.$hpBm = new egret.Bitmap();
        this.$hpBm.texture = RES.getRes("xuetiao");
        this.$hpSprite.addChild(this.$hpBm);
        this.$hpBm.x = 57;
        this.$hpBm.y = 24;

        this.$hpFlag = new egret.Bitmap();
        this.$hpSprite.addChild(this.$hpFlag);
        this.$hpFlag.texture = RES.getRes("xuetiaoguang");
        this.$hpFlag.y =16;
        
        this.$hpTF = new egret.TextField();
        this.$hpTF.text = "0/0";
        this.$hpTF.x = 57;
        this.$hpTF.y = 25;
        this.$hpTF.size = 14;
        this.$hpTF.width = 118;
        this.$hpTF.textColor = 0xffffff;
        this.$hpTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$hpTF.bold = true;
        this.$hpTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$hpSprite.addChild(this.$hpTF);

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("touxiang");
        this.addChild(bm);

        this.$honorIcon = new egret.Bitmap();
        this.$honorIcon.y = 50;
        this.addChild(this.$honorIcon);
        
        /*bm = new egret.Bitmap();
        bm.texture = RES.getRes("dengjidi");
        bm.x = 36;
        bm.y = 19;
        this.addChild(bm);*/
        
        var honorLv:number = User.getInstance().role.honorLv;
        this.$nameTF = new egret.TextField();
        this.$nameTF.text = User.getInstance().userName;
        this.$nameTF.size = 14;
        this.$nameTF.width = 118;
        this.$nameTF.textColor = 0xf3c786;
//        this.$upgradeTitle.strokeColor = 0x000000;
//        this.$upgradeTitle.stroke = 1;
        this.addChild(this.$nameTF);
        this.$nameTF.bold = true;
        this.$nameTF.x = 57;
        this.$nameTF.y = 4;
        this.$nameTF.textAlign = egret.HorizontalAlign.CENTER;

        this.$lvTF = new egret.TextField();
        this.addChild(this.$lvTF);
        this.$lvTF.visible = false;
        this.$lvTF.x= 44;
        this.$lvTF.y = 28;
        this.$lvTF.width = 20;
        this.$lvTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$lvTF.size = 16;
        this.$lvTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$lvTF.bold = true;
        this.$lvTF.text = "1";
    }
}