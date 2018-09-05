/**
 * Created by Administrator on 15-6-2.
 * 战斗辅助小组件-飙血
 */
class BloodCom extends egret.Sprite{
    private $tf:egret.TextField;
    private $bm:egret.Bitmap;
    public constructor(){
        super()
        this.$tf = new egret.TextField();
        this.addChild(this.$tf);
        this.$tf.size = 50;
    }

    public showNum(type:string, value:number):void{
        if(type == FightVo.CRIT){
            this.$bm = new egret.Bitmap();
            this.addChild(this.$bm);
            this.$bm.texture = RES.getRes("baoji");
        }else if(type == FightVo.MISS){
            this.$bm = new egret.Bitmap();
            this.addChild(this.$bm);
            this.$bm.texture = RES.getRes("miss");
            return;
        }
        if(value > 0){
            this.$tf.textColor = 0x009900;
            this.$tf.text = "+";
            this.$tf.appendText(value+"");
        }else if(value<0){
            this.$tf.textColor = 0xff9900;
            this.$tf.text = value+"";
        }
        if(this.$bm){
            this.$tf.x = this.$bm.width + 10;
        }
    }
}

/**战斗-技能图标*/
class FightSkill extends egret.DisplayObjectContainer{

    private $icon:egret.Bitmap;
    private $timeTF:egret.TextField;
    public skillId:string;
    public cdTime:number=0;
    /**回合*/
    private _timer:egret.Timer;

    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    public format(skillId:any):void{
        //console.log("技能格式化",skillId)
        this.alpha = 1;
        this.skillId = skillId;
        this.cdTime = 0;
        this.$timeTF.text = "";
        if(skillId){
            this.visible = true;
            RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/skill/" + this.skillId + ".png",this.loadIconCallBack,this);
        }else{
            this.visible = false;
        }
    }

    private loadIconCallBack(data:any, url:string): void
    {
        //console.log(url);
        this.$icon.texture = data;
    }

    public excute():void {
        this.alpha = 1;
        var skillinfo:any = SkillData.getSkillInfo(this.skillId);
        this.cdTime = skillinfo.skillCD;
        this.$timeTF.text = this.cdTime+"";
        /**
         if(!this._timer){
            this._timer = new egret.Timer(1000,3);
        }
         this._timer.reset();
         this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimeEvent, this);
         var skillinfo:any = SkillData.getSkillInfo(this.skillId);
         this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeEvent, this);
         this.cdTime = skillinfo.skillCD;
         this.$timeTF.text = this.cdTime + "S";
         this._timer.start();
         */
        RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/skill/" + this.skillId + "_disable.png",this.loadIconCallBack,this);
    }

    public update():void{
        if(this.cdTime > 0){
            this.cdTime --;
            this.$timeTF.text = this.cdTime+"";
            if(this.cdTime  == 0){
                this.$timeTF.text = "";
                RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/skill/" + this.skillId + ".png",this.loadIconCallBack,this);
            }
        }
    }

    private onTimeEvent(event:egret.TimerEvent):void{
        switch(event.type){
            case egret.TimerEvent.TIMER:
                this.cdTime --;
                this.$timeTF.text = this.cdTime+"";
                break;
            case egret.TimerEvent.TIMER_COMPLETE:
                this.cdTime = 0;
                this.$timeTF.text = "";
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimeEvent, this);
                this._timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeEvent, this);
                RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/skill/" + this.skillId + ".png",this.loadIconCallBack,this);
                break;
        }
    }

    private init():void{

        this.$icon = new egret.Bitmap();
        //this.$icon.texture = RES.getRes("jineng");
        this.addChild(this.$icon);

        this.$timeTF = new egret.TextField();
        this.addChild(this.$timeTF);
        this.$timeTF.x = 18;
        this.$timeTF.y = 22;
        this.$timeTF.width = 72;
        this.$timeTF.size = 50;
        this.$timeTF.textColor = 0xff0000;
        this.$timeTF.strokeColor = 0x000000;
        this.$timeTF.stroke = 2;
        this.$timeTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$timeTF.fontFamily = Strings.DEFAULT_FONT_NAME;
    }
}

/**战斗-血瓶*/
class RecoverItem extends egret.DisplayObjectContainer {

    private $icon:egret.Bitmap;
    private $numTF:egret.TextField;
    public itemId:number;
    public itemNum:number;
    public res:string;

    public constructor(res:string, id:number){
        super();
        this.init();
        this.res = res;
        this.$icon.texture = RES.getRes(res);
        this.itemId = id;
        this.touchEnabled = true;

        this.$numTF.y = this.$icon.height - 20;
        this.$numTF.x = this.$icon.width - this.$numTF.width;
    }

    /***/
    public update():void{
        //刷新数量
        this.itemNum = BagModel.getItemNum(this.itemId);
        this.$numTF.text = this.itemNum.toString();
    }

    private init():void {

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);

        this.$numTF = new egret.TextField();
        this.addChild(this.$numTF);
        this.$numTF.y = 40;
        this.$numTF.width = 55;
        this.$numTF.textAlign = egret.HorizontalAlign.RIGHT;
        this.$numTF.fontFamily = Strings.DEFAULT_FONT_NAME;
    }
}
