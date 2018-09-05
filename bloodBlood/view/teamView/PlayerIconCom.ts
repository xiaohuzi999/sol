/**
 * Created by 马达加加加 on 2015/5/29.
 */
class PlayerIconCom extends egret.DisplayObjectContainer{
    /**头像*/
    private $icon:egret.Bitmap;
    private $bg:egret.Bitmap;
    
    public constructor(){
        
        super();
        this.init();
    }

    /***/
    public format(data:RoleVo):void{
        if(data){
            RES.getResByUrl(AppConfig.imgURL + "resource/assets/ui/team/"+data.pic+"_f.png", this.onLoadIcon, this);
        }else{
            this.$icon.texture = null;
        }
    }

    private onLoadIcon(tx:any):void{
        this.$icon.texture = tx;
    }
    //
    private init():void{
        
        this.$bg = new egret.Bitmap();
        this.$bg.texture = RES.getRes("biaodi");
        this.addChild(this.$bg);

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = -28;
        this.$icon.y = -72;
        
//        this.touchEnabled = true;
    }
}