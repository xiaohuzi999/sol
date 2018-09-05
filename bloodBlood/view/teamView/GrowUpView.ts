/**
 * Created by 马达加加加 on 2015/6/15.
 */
class GrowUpView extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    //称号名称
    private $labelPic: egret.Bitmap;
    //精血条进度
    private $bloodPic:egret.Bitmap;
    //体质进度
    private $phiPic:egret.Bitmap;
    //攻击进度
    private $attPic:egret.Bitmap;
    //防御进度
    private $denPic:egret.Bitmap;
    //敏捷进度
    private $agiPic:egret.Bitmap;
    //进阶按钮
    private $growUpBtn:egret.Bitmap;
    //一键
    private $onceBtn:egret.Bitmap;
    //突破
    private $breakBtn:egret.Bitmap;
    //文本
    private $phiTF:egret.TextField;
    private $attTF:egret.TextField;
    private $denTF:egret.TextField;
    private $agiTF:egret.TextField;
    private $tipTF:egret.TextField;
    private $bloodTF:egret.TextField;

    //
    private _data:RoleVo;
    //单例
    private static _instance:GrowUpView;
    public constructor(){
        super();
        this.init();
    }

    public show(center:boolean=true, ...args: any[]):void{
        this._data = args[0];
        super.show(center);
        CoolEffect.flowIn(this);
        this.formatRoleInfo();
    }

    public close():void{
        CoolEffect.flowOut(this, 300, super.close,this)
    }

    private formatRoleInfo():void{
        var info:any = TeamModel.getGrowData(this._data.honorLv);
        //console.log(info);
        if(info){
            this.$labelPic.texture = RES.getRes(TeamModel.getRES(this._data.honorLv));
            //todo：最大值计算;---当前值+剩余升阶次数的提升；
            var restTimes:number = (info.honor - this._data.honor)/(info.bloodNum*10);
            var maxPhy:number = this.caculateMax(this._data.physique, this._data.physiqueGrow*info.growUpNum, restTimes);
            var maxAgi:number = this.caculateMax(this._data.agility, this._data.agilityGrow*info.growUpNum, restTimes);
            var maxDen:number = this.caculateMax(this._data.defend, this._data.defendGrow*info.growUpNum, restTimes);
            var maxAtt:number = this.caculateMax(this._data.attack, this._data.attackGrow*info.growUpNum, restTimes);
            this.$phiTF.text = Math.round(this._data.physique)+"/"+Math.round(maxPhy);
            this.$agiTF.text = Math.round(this._data.agility)+"/"+Math.round(maxAgi);
            this.$denTF.text = Math.round(this._data.defend)+"/"+Math.round(maxDen);
            this.$attTF.text = Math.round(this._data.attack)+"/"+Math.round(maxAtt);
            this.$bloodTF.text = this._data.honor+"/"+info.honor;

            this.setPicPer(this.$phiPic, this._data.physique/maxPhy);
            this.setPicPer(this.$attPic, this._data.attack/maxAtt);
            this.setPicPer(this.$denPic, this._data.defend/maxDen);
            this.setPicPer(this.$agiPic, this._data.agility/maxAgi);
            this.setPicPer(this.$bloodPic, (this._data.honor)/info.honor);

            if(this._data.honor < info.honor){
                this.$tipTF.text = "血液精华："+BagModel.getItemNum(ItemData.BLOOD)+"/"+info.bloodNum;
                this.$breakBtn.visible = false;
                this.$growUpBtn.visible = this.$onceBtn.visible = true;
            }else{
                this.$tipTF.text = "突破消耗：金币"+info.money;
                if(this._data.honorLv < TeamModel.MAX_LV){
                    this.$breakBtn.visible = true;
                }else{
                    this.$breakBtn.visible = false;
                    this.$tipTF.text = "已达到最高阶!";
                }
                this.$growUpBtn.visible = this.$onceBtn.visible = false;
            }

            //植入新手引导
            if(Guide.curGuide && Guide.curGuide instanceof GrowGuide){
                egret.setTimeout(this.showGuide, this, 100);
            }
        }
    }

    private showGuide():void{
        Guide.curGuide.showGrowGuide2([this.$growUpBtn, this.$closeBtn]);
    }

    private setPicPer(bm:egret.Bitmap, per:number):void{
        bm.scrollRect = new egret.Rectangle(0,0, bm.width*per,bm.height);
    }
    /**计算最大值*/
    private caculateMax(pro:number, proGrow:number, times:number):number{
        return pro + proGrow*times;
    }

    private onTouch(event:egret.TouchEvent):void{
        var bool:boolean;
        switch(event.currentTarget){
            case this.$closeBtn:
                this.close();
                break;
            case this.$growUpBtn:
                bool = TeamModel.growUP(this._data);
                if(bool){
                    this.formatRoleInfo();
                }
                break;
            case this.$onceBtn:
                bool = TeamModel.growUPOnce(this._data);
                if(bool){
                    this.formatRoleInfo();
                }
                break;
            case this.$breakBtn:
                bool = TeamModel.growBreak(this._data);
                if(bool){
                    this.formatRoleInfo();
                }
                break;
        }
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("jinjiexiaochuang");

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.x = 450;
        this.$closeBtn.y = 4;

        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.text = "体质";
        tf.x = 78;
        tf.y = 92;
        tf.size = 24;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        tf = new egret.TextField();
        this.addChild(tf);
        tf.text = "攻击";
        tf.x = 78;
        tf.y = 130;
        tf.size = 24;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        tf = new egret.TextField();
        this.addChild(tf);
        tf.text = "防御";
        tf.x = 78;
        tf.y = 168;
        tf.size = 24;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        tf = new egret.TextField();
        this.addChild(tf);
        tf.text = "敏捷";
        tf.x = 78;
        tf.y = 206;
        tf.size = 24;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        tf = new egret.TextField();
        this.addChild(tf);
        tf.text = "修为经验";
        tf.x = 78;
        tf.y = 243;
        tf.size = 24;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("jingxuetiaodi");
        this.addChild(bm);
        bm.x = 72;
        bm.y = 267;
        this.$bloodPic = new egret.Bitmap();
        this.addChild(this.$bloodPic)
        this.$bloodPic.texture = RES.getRes("jingxuetiao");
        this.$bloodPic.x = 72;
        this.$bloodPic.y = 268;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("tizhixuetiaodi");
        bm.x = 138;
        bm.y = 98;
        this.addChild(bm);
        this.$phiPic = new egret.Bitmap();
        this.addChild(this.$phiPic);
        this.$phiPic.texture = RES.getRes("tizhixuetiao");
        this.$phiPic.x = 138.2;
        this.$phiPic.y = 98;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("tizhixuetiaodi");
        bm.x = 138;
        bm.y = 136;
        this.addChild(bm);
        this.$attPic = new egret.Bitmap();
        this.addChild(this.$attPic);
        this.$attPic.texture = RES.getRes("tizhixuetiao");
        this.$attPic.x = 138.2;
        this.$attPic.y = 136;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("tizhixuetiaodi");
        bm.x = 138;
        bm.y = 174;
        this.addChild(bm);
        this.$denPic = new egret.Bitmap();
        this.addChild(this.$denPic);
        this.$denPic.texture = RES.getRes("tizhixuetiao");
        this.$denPic.x = 138.2;
        this.$denPic.y = 174;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("tizhixuetiaodi");
        bm.x = 138;
        bm.y = 212;
        this.addChild(bm);
        this.$agiPic = new egret.Bitmap();
        this.addChild(this.$agiPic);
        this.$agiPic.texture = RES.getRes("tizhixuetiao");
        this.$agiPic.x = 138.2;
        this.$agiPic.y = 212;

        this.$growUpBtn = new egret.Bitmap();
        this.addChild(this.$growUpBtn);
        this.$growUpBtn.texture = RES.getRes("jinjie");
        this.$growUpBtn.x = 114;
        this.$growUpBtn.y = 340;
        this.$onceBtn = new egret.Bitmap();
        this.addChild(this.$onceBtn);
        this.$onceBtn.texture = RES.getRes("kuaisujinjie");
        this.$onceBtn.x = 256;
        this.$onceBtn.y = 340;

        this.$breakBtn = new egret.Bitmap();
        this.addChild(this.$breakBtn);
        this.$breakBtn.texture = RES.getRes("tupo");
        this.$breakBtn.x = 188;
        this.$breakBtn.y = 338;

        this.$closeBtn.touchEnabled = this.$growUpBtn.touchEnabled = this.$onceBtn.touchEnabled = this.$breakBtn.touchEnabled = true;

        this.$phiTF = new egret.TextField();
        this.addChild(this.$phiTF);
        this.$phiTF.y = 92;

        this.$attTF = new egret.TextField();
        this.addChild(this.$attTF);
        this.$attTF.y = 130;

        this.$denTF = new egret.TextField();
        this.addChild(this.$denTF);
        this.$denTF.y = 165;

        this.$agiTF = new egret.TextField();
        this.addChild(this.$agiTF);
        this.$agiTF.y = 206;
        this.$phiTF.x = this.$attTF.x = this.$denTF.x = this.$agiTF.x = 197;
        this.$phiTF.width = this.$attTF.width = this.$denTF.width = this.$agiTF.width = 180;

        this.$bloodTF = new egret.TextField();
        this.addChild(this.$bloodTF);
        this.$bloodTF.x = 174;
        this.$bloodTF.y = 266;
        this.$bloodTF.width = 180;

        this.$tipTF = new egret.TextField();
        this.addChild(this.$tipTF);
        this.$tipTF.x = 78;
        this.$tipTF.y = 314;
        this.$tipTF.width = 374;
        this.$phiTF.fontFamily = this.$attTF.fontFamily = this.$denTF.fontFamily = this.$agiTF.fontFamily =
            this.$bloodTF.fontFamily = this.$tipTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$phiTF.textAlign = this.$attTF.textAlign = this.$denTF.textAlign = this.$agiTF.textAlign =
            this.$bloodTF.textAlign = this.$tipTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$phiTF.size = this.$attTF.size = this.$denTF.size = this.$agiTF.size =
            this.$bloodTF.size = this.$tipTF.size = 24;

        this.$labelPic = new egret.Bitmap();
        this.addChild(this.$labelPic);
        this.$labelPic.x = 210;
        this.$labelPic.y = 32;
    }

    public initEvent():void{
        this.$closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$growUpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$breakBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$onceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.$closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$growUpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$onceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$breakBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }


    //获取单例
    public  static getInstance():GrowUpView{
        if(!GrowUpView._instance){
            GrowUpView._instance = new GrowUpView();
        }
        return GrowUpView._instance;
    }
}
