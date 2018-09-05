/**
 * Created by 马达加加加 on 2015/7/10.
 */
class FarmView extends XWindow{
    //帮助按钮
    private $helpBtn:egret.Bitmap;
    private _helpView:HelpCom;
    //数量
    private $woodNumTF:egret.TextField;
    private $foodNumTF:egret.TextField;
    private $personNumTF:egret.TextField;

    //功能按钮-矿山
    private $mineBtn:egret.Bitmap;
    private $mainBtn:egret.Bitmap;
    private $fieldBtn:egret.Bitmap;
    private $houseBtn:egret.Bitmap;
    private $woodBtn:egret.Bitmap;

    //矿场收取
    private $moneyBtn:egret.Bitmap;
    private $bloodBtn:egret.Bitmap;
    private $mutouBtn:egret.Bitmap;
    private $moneyTip:egret.Bitmap;
    private $bloodTip:egret.Bitmap;
    private $mutouTip:egret.Bitmap;

    //升级收取
    private $mineTimeTF:egret.TextField;
    private $fieldTimeTF:egret.TextField;
    private $hallTimeTF:egret.TextField;
    private $woodTimeTF:egret.TextField;
    private $houseTimeTF:egret.TextField;
    

    //各种升级按钮
    private $mainUpBtn:egret.Bitmap;
    private $mineUpBtn:egret.Bitmap;
    private $fieldUpBtn:egret.Bitmap;
    private $houseUpBtn:egret.Bitmap;
    private $woodUpBtn:egret.Bitmap;
    //各种收取按钮
    private $mineGainBtn:egret.Bitmap;
    private $hallGainBtn:egret.Bitmap;
    private $woodGainBtn:egret.Bitmap;

    //各种建筑等级
    private $mainLvTF:egret.TextField;
    private $mineLvTF:egret.TextField;
    private $woodLvTF:egret.TextField;
    //单例
    private static _instance:FarmView;
    //数据引用
    private _data:FarmVo;
    private _timer:egret.Timer;
    //当前升级类型
    private _curType:string;
    //当前收获类型
    private _curGainType:string;
    //农田收获
    private _fieldCom:FieldCom;
    //民居升级
    private _houseCom:HouseCom;
    //收获总时间==
    public static TOTAL_TIME:number = 43200;

    public constructor(){
        super();
        this.init();
    }

    public show():void{
        super.show();
        this.addChild(BottomCom.getInstance());
        this.addChild(TopCom.getInstance());
        //获取信息
        this._data = FarmModel.getFarmInfo();
        this.showFarmInfo();
        //计算消耗=========
        FarmModel.exec();
        this._timer.start();
        SoundManager.playBGM("farmBGSND");

        //植入新手引导
        if(Guide.curGuide && Guide.curGuide instanceof FarmGuide){
            Guide.curGuide.showHall(this.$hallGainBtn);
        }
    }

    public close():void{
        //新手引导判定
        if(Guide.curGuide && Guide.curGuide instanceof FarmGuide){
            if(Guide.hasFinishedGuid(Guide.FRAM_GUIDE)){
                Guide.curGuide = null;
            }
        }
        super.close();
        SoundManager.playBGM("bgSND");
    }

    private showFarmInfo():void{
        this.$foodNumTF.text = this._data.foodNum+"";
        this.$woodNumTF.text = this._data.woodNum+"";
        this.$personNumTF.text = this._data.personNum*10+"";

        this.$mainLvTF.text = "Lv."+this._data.hallInfo.lv;
        this.$mineLvTF.text = "Lv."+this._data.mineInfo.lv;
        this.$woodLvTF.text = "Lv."+this._data.woodInfo.lv;

        this.formatTime();
    }

    //格式收获时间
    private formatTime():void{
        var time:number = (new Date()).getTime();
        var delTime:number;
        var upTime:number;

        if(this._data.mineInfo.uping){
            upTime = FarmModel.getUpTime(FarmModel.MINE,this._data.mineInfo.lv);
            delTime = upTime - (time - this._data.mineInfo.upTime)/1000;
            if(delTime > 0){
                this.$mineTimeTF.text = Strings.UPDATE_CD+XUtils.formatTime(delTime);
            }else{
                this._data.mineInfo.uping = false;
                this.$mineTimeTF.text = "";
            }
        }
        delTime = (time - this._data.mineInfo.startTime)/1000;
        if(delTime > 60){
            this.$moneyBtn.visible = true;
            this.$moneyTip.visible = true;
        }else{
            this.$moneyBtn.visible = false;
            this.$moneyTip.visible = false;
        }

        if(this._data.fieldInfo.uping){
            upTime = FarmModel.getUpTime(FarmModel.FIELD,this._data.fieldInfo.lv);
            delTime = upTime - (time - this._data.fieldInfo.upTime)/1000;
            if(delTime > 0){
                this.$fieldTimeTF.text = Strings.UPDATE_CD+XUtils.formatTime(delTime);
            }else{
                this._data.fieldInfo.uping = false;
                this.$fieldTimeTF.text = "";
            }
        }

        if(this._data.houseInfo.uping){
            upTime = FarmModel.getUpTime(FarmModel.HOUSE,this._data.houseInfo.lv);
            delTime = upTime - (time - this._data.houseInfo.upTime)/1000;
            if(delTime > 0 ){
                this.$houseTimeTF.text = Strings.UPDATE_CD+XUtils.formatTime(delTime);
            }else{
                this.$houseTimeTF.text = "";
                this._data.houseInfo.uping = false;
            }
        }

        if(this._data.woodInfo.uping){
            upTime = FarmModel.getUpTime(FarmModel.WOOD,this._data.woodInfo.lv);
            delTime = upTime - (time - this._data.woodInfo.upTime)/1000;
            if(delTime > 0 ){
                this.$woodTimeTF.text = Strings.UPDATE_CD+XUtils.formatTime(delTime);
            }else{
                this.$woodTimeTF.text = "";
                this._data.woodInfo.uping = false;
            }
        }
        delTime = (time - this._data.woodInfo.startTime)/1000;
        if(delTime >= 60){
            this.$mutouBtn.visible = true;
            this.$mutouTip.visible = true;
        }else{
            this.$mutouBtn.visible = false;
            this.$mutouTip.visible = false;
        }

        if(this._data.hallInfo.uping){
            upTime = FarmModel.getUpTime(FarmModel.HOUSE,this._data.hallInfo.lv);
            delTime = upTime - (time - this._data.hallInfo.upTime)/1000;
            if(delTime > 0 ){
                this.$hallTimeTF.text = Strings.UPDATE_CD+XUtils.formatTime(delTime);
            }else{
                this.$hallTimeTF.text = "";
                this._data.hallInfo.uping = false;
            }
        }
        delTime = (time - this._data.hallInfo.startTime)/1000;
        if(delTime > 7200){//2小时收取-粗略
            this.$bloodBtn.visible = true;
            this.$bloodTip.visible = true;
        }else{
            this.$bloodBtn.visible = false;
            this.$bloodTip.visible = false;
        }
    }

    private upBuilding(type:string):void{
        this._curType = type;
        var materialInfo:any;
        var name:string = "";
        var info:any = this._data[type+"Info"];
        materialInfo=FarmModel.getMaterial(type,info.lv);
        if(info.lv < FarmModel.MAX_LV){
            switch (type){
                case FarmModel.FIELD:
                    if(!this._fieldCom){
                        this._fieldCom = new FieldCom();
                    }
                    this._fieldCom.show(true,this._data.fieldInfo.grids);
                    return;
                case FarmModel.HOUSE:
                    if(!this._houseCom){
                        this._houseCom = new HouseCom();
                    }
                    this._houseCom.show(true,this._data.houseInfo.grids);
                    return;
                case FarmModel.MINE:
                    name = Strings.BUILDINGS_MINE;
                    break;
                case FarmModel.WOOD:
                    name = Strings.BUILDINGS_WOOD;
                    break;
                case FarmModel.HALL:
                    name = Strings.BUILDINGS_HALL;
                    break;
            }
            if(type != FarmModel.HALL){
                var hallLv:number = FarmModel.vo.hallInfo.lv;
                if(info.lv >= hallLv){
                    XTip.showTip(Strings.BUILDING_LV_ERR);
                    return;
                }
            }
            var arr:string[] = Strings.BUILDING_UP_STR.split("$");
            var str:string = arr[0]+name+arr[1]+materialInfo.money+arr[2]+materialInfo.wood+arr[3];
            if(type == FarmModel.HALL){
                str += "效果：所有建筑等级上限提升至"+(info.lv+1);
            }else {
                str += "效果：产量提升至"+FarmModel.getGainNum(type, (info.lv+1))+"/分钟";
            }
            XAlert.show(str, this.confirmUp,null,this,true,false);
        }else{
            XTip.showTip(Strings.BUILDING_LV_MAX);
        }
    }
    //
    private confirmUp():void{
        var bool:Boolean = FarmModel.upBuilding(this._curType);
        if(bool){
            this.showFarmInfo();

            //植入新手引导========================================
            if(this._curGainType == FarmModel.HALL){//
                if(Guide.curGuide && Guide.curGuide instanceof FarmGuide){
                    egret.setTimeout(Guide.curGuide.showNext, Guide.curGuide,10);
                }
            }
        }
    }


    //显示收获
    private showGain(type:string):void{
        this._curGainType = type;
        var time:number = (new Date()).getTime();
        var delTime:number;
        var materialName:string = "";
        switch (type){
            case FarmModel.HALL:
                delTime = (time - this._data.hallInfo.startTime)/1000;
                materialName = Strings.BLOOD;
                break;
            case FarmModel.MINE:
                delTime = (time - this._data.mineInfo.startTime)/1000;
                materialName = Strings.MONEY;
                break;
            case FarmModel.WOOD:
                delTime = (time - this._data.woodInfo.startTime)/1000;
                materialName = Strings.WOOD;
                break;
            case FarmModel.FIELD:
                if(!this._fieldCom){
                    this._fieldCom = new FieldCom();
                }
                this._fieldCom.show(true,this._data.fieldInfo.grids);
                return;
        }
        delTime = Math.min(delTime, 86400);

        if(delTime < 60){
            if(type != FarmModel.HALL){
               // XTip.showTip(Strings.GAIN_NOT_TIME+"\n"+Strings.GAIN_TIME_TIP+parseInt((60-delTime)+"")+Strings.TIME_S);
                XAlert.show(Strings.GAIN_NOT_TIME+materialName+";"+Strings.GAIN_TIME_TIP+Math.round((60-delTime))+Strings.TIME_S, null,null,null,false);
            }else{
                //XTip.showTip(Strings.GAIN_NOT_TIME+"\n"+Strings.GAIN_TIME_TIP+parseInt((120-(delTime/60))+"")+Strings.TIME_MIN);
                XAlert.show(Strings.GAIN_NOT_TIME+materialName+";"+Strings.GAIN_TIME_TIP+Math.round(15-(delTime/60))+Strings.TIME_MIN, null,null,null,false);
                //植入新手引导======================
                if(!Guide.hasFinishedGuid(Guide.FRAM_GUIDE) && Guide.curGuide && Guide.curGuide instanceof FarmGuide) {
                    User.getInstance().guideList.push(Guide.FRAM_GUIDE);
                    Guide.curGuide = null;
                    UserModel.save();
                }
            }
        }else{
            delTime = parseInt(delTime/60 + "");
            var materialNum:number = FarmModel.getGainNum(type, this._data[type+"Info"].lv);
            var toalNum:number = Math.round(materialNum*delTime);
            materialNum = Math.round(materialNum * 1000)/1000;
            if(toalNum > 0){
                var str:string = Strings.GAIN_NUM+materialNum+Strings.PER_MIN;
                XAlert.show(Strings.GAIN_TIPS+materialName+" "+ toalNum+"\n"+str, this.confirmGain,null, this);
            }else{
                XAlert.show(Strings.GAIN_NOT_TIME+materialName+";"+Strings.GAIN_TIME_TIP+Math.round(15-delTime)+Strings.TIME_MIN, null,null,null,false);
                //植入新手引导======================
                if(!Guide.hasFinishedGuid(Guide.FRAM_GUIDE) && Guide.curGuide && Guide.curGuide instanceof FarmGuide) {
                    User.getInstance().guideList.push(Guide.FRAM_GUIDE);
                    Guide.curGuide = null;
                    UserModel.save();
                }
                //XTip.showTip(Strings.GAIN_NOT_TIME);
            }
        }
    }

    //确认收取
    private confirmGain():void{
        if(FarmModel.gain(this._curGainType)){
            this.showFarmInfo();

            //植入新手引导========================================
            if(this._curGainType == FarmModel.HALL){//
                if(Guide.curGuide && Guide.curGuide instanceof FarmGuide){
                    egret.setTimeout(Guide.curGuide.showUp, Guide.curGuide,10,this.$mainUpBtn);
                    //Guide.curGuide.showUp(this.$mainUpBtn);
                }
            }
        }
    }

    private onTimer(event:egret.TimerEvent):void{
        this.formatTime();
        FarmModel.exec();
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        switch (event.target){
            case this.$mainUpBtn:
                this.upBuilding(FarmModel.HALL);
                break;
            case this.$mineUpBtn:
                this.upBuilding(FarmModel.MINE);
                break;
            case this.$fieldUpBtn:
                this.upBuilding(FarmModel.FIELD);
                break;
            case this.$houseUpBtn:
                this.upBuilding(FarmModel.HOUSE);
                break;
            case this.$woodUpBtn:
                this.upBuilding(FarmModel.WOOD);
                break;
            //收获;
            case this.$hallGainBtn:
                this.showGain(FarmModel.HALL);
                break;
            case this.$mineGainBtn:
                this.showGain(FarmModel.MINE);
                break;
            case this.$woodGainBtn:
                this.showGain(FarmModel.WOOD);
                break;
            case this.$helpBtn:
                if(!this._helpView){
                    this._helpView = new HelpCom();
                }
                this._helpView.show();
                break;
        }
    }

    private updateInfo():void{
        this.showFarmInfo();
    }

    public initEvent():void{
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        MainDispatcher.getInstance().addEventListener(FarmModel.UPDATA_INFO, this.updateInfo, this);
    }

    public removeEvent():void{
        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        MainDispatcher.getInstance().removeEventListener(FarmModel.UPDATA_INFO, this.updateInfo, this);
    }

    //
    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("farmBg");
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("maizi");
        bm.x = 22;
        bm.y = 80;
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("mutou");
        bm.x = 23;
        bm.y = 154;
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("xuenu");
        bm.x = 37;
        bm.y = 208;

        this.$helpBtn = new egret.Bitmap();
        this.addChild(this.$helpBtn);
        this.$helpBtn.x = 526;
        this.$helpBtn.y = 58;
        this.$helpBtn.texture = RES.getRes("farm_help");
        this.$helpBtn.touchEnabled = true;

        this.$foodNumTF = new egret.TextField();
        this.addChild(this.$foodNumTF);
        this.$foodNumTF.x = 72;
        this.$foodNumTF.y = 106;
        this.$woodNumTF = new egret.TextField();
        this.addChild(this.$woodNumTF);
        this.$woodNumTF.x = 72;
        this.$woodNumTF.y = 166;
        this.$personNumTF = new egret.TextField();
        this.addChild(this.$personNumTF);
        this.$personNumTF.x = 72;
        this.$personNumTF.y = 234;
        this.$woodNumTF.strokeColor = this.$foodNumTF.strokeColor = this.$personNumTF.strokeColor = 0x222222;
        this.$woodNumTF.stroke = this.$foodNumTF.stroke = this.$personNumTF.stroke = 2;
        this.$woodNumTF.size = this.$foodNumTF.size = this.$personNumTF.size = 20;

        //生成透明操作按钮
        this.$mainBtn = new egret.Bitmap();
        this.addChild(this.$mainBtn);
        this.$mainBtn.x = 108;
        this.$mainBtn.y = 280;
        this.$mainBtn.texture = RES.getRes("blankBtn");

        this.$mineBtn = new egret.Bitmap();
        this.addChild(this.$mineBtn);
        this.$mineBtn.x = 438;
        this.$mineBtn.y = 274;
        this.$mineBtn.texture = RES.getRes("blankBtn");

        this.$fieldBtn = new egret.Bitmap();
        this.addChild(this.$fieldBtn);
        this.$fieldBtn.x = 268;
        this.$fieldBtn.y = 415;
        this.$fieldBtn.texture = RES.getRes("blankBtn");

        this.$houseBtn = new egret.Bitmap();
        this.addChild(this.$houseBtn);
        this.$houseBtn.x = 106;
        this.$houseBtn.y = 592;
        this.$houseBtn.texture = RES.getRes("blankBtn");

        this.$woodBtn = new egret.Bitmap();
        this.addChild(this.$woodBtn);
        this.$woodBtn.x = 436;
        this.$woodBtn.y = 526;
        this.$woodBtn.texture = RES.getRes("blankBtn");
        this.$mainBtn.touchEnabled = this.$mineBtn.touchEnabled = this.$fieldBtn.touchEnabled = this.$houseBtn.touchEnabled = this.$woodBtn.touchEnabled = true;

        this.$moneyBtn = new egret.Bitmap();
        this.addChild(this.$moneyBtn);
        this.$moneyBtn.texture = RES.getRes("qianbi");
        this.$moneyBtn.scaleX = this.$moneyBtn.scaleY = 1.5;
        this.$moneyBtn.x = 484;
        this.$moneyBtn.y = 232;

        this.$bloodBtn = new egret.Bitmap();
        this.addChild(this.$bloodBtn);
        this.$bloodBtn.texture = RES.getRes("jingxue");
        this.$bloodBtn.x = 146;
        this.$bloodBtn.y = 272;

        this.$mutouBtn = new egret.Bitmap();
        this.addChild(this.$mutouBtn);
        this.$mutouBtn.texture = RES.getRes("mutou");
        this.$mutouBtn.x = 470;
        this.$mutouBtn.y = 538;
        this.$moneyBtn.touchEnabled = this.$bloodBtn.touchEnabled = this.$mutouBtn.touchEnabled = true;
        //
        this.$mineTimeTF = new egret.TextField();
        this.addChild(this.$mineTimeTF);
        this.$mineTimeTF.x = 454;
        this.$mineTimeTF.y = 272;

        this.$fieldTimeTF = new egret.TextField();
        this.addChild(this.$fieldTimeTF);
        this.$fieldTimeTF.x = 296;
        this.$fieldTimeTF.y = 466;

        this.$hallTimeTF = new egret.TextField();
        this.addChild(this.$hallTimeTF);
        this.$hallTimeTF.x = 124;
        this.$hallTimeTF.y = 308;

        this.$woodTimeTF = new egret.TextField();
        this.addChild(this.$woodTimeTF);
        this.$woodTimeTF.x = 450;
        this.$woodTimeTF.y = 576;

        this.$houseTimeTF = new egret.TextField();
        this.addChild(this.$houseTimeTF);
        this.$houseTimeTF.x = 120;
        this.$houseTimeTF.y = 611;
        this.$mineTimeTF.size = this.$fieldTimeTF.size = this.$hallTimeTF.size = this.$woodTimeTF.size = this.$houseTimeTF.size = 20;
        this.$mineTimeTF.fontFamily = this.$fieldTimeTF.fontFamily = this.$hallTimeTF.fontFamily = this.$woodTimeTF.fontFamily = this.$houseTimeTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$mineTimeTF.bold = this.$fieldTimeTF.bold = this.$hallTimeTF.bold = this.$woodTimeTF.bold = this.$houseTimeTF.bold = true;
        this.$mineTimeTF.textColor = this.$fieldTimeTF.textColor = this.$hallTimeTF.textColor = this.$woodTimeTF.textColor = this.$houseTimeTF.textColor = 0xff0000;
        this.$mineTimeTF.strokeColor = this.$fieldTimeTF.strokeColor = this.$hallTimeTF.strokeColor = this.$woodTimeTF.strokeColor = this.$houseTimeTF.strokeColor = 0x222222;
        this.$mineTimeTF.stroke = this.$fieldTimeTF.stroke = this.$hallTimeTF.stroke = this.$woodTimeTF.stroke = this.$houseTimeTF.stroke = 2;

        //升级按钮
        this.$mainUpBtn = new egret.Bitmap();
        this.addChild(this.$mainUpBtn);
        this.$mainUpBtn.x = 89;
        this.$mainUpBtn.y = 360;
        this.$mineUpBtn = new egret.Bitmap();
        this.addChild(this.$mineUpBtn);
        this.$mineUpBtn.x = 424;
        this.$mineUpBtn.y = 325;
        this.$fieldUpBtn = new egret.Bitmap();
        this.addChild(this.$fieldUpBtn);
        this.$fieldUpBtn.x = 310;
        this.$fieldUpBtn.y = 514;
        this.$houseUpBtn = new egret.Bitmap();
        this.addChild(this.$houseUpBtn);
        this.$houseUpBtn.x = 124;
        this.$houseUpBtn.y = 666;
        this.$woodUpBtn = new egret.Bitmap();
        this.addChild(this.$woodUpBtn);
        this.$woodUpBtn.x = 416;
        this.$woodUpBtn.y = 626;
        this.$mainUpBtn.texture = this.$mineUpBtn.texture = this.$fieldUpBtn.texture = this.$houseUpBtn.texture = this.$woodUpBtn.texture = RES.getRes("farm_update");
        this.$mainUpBtn.touchEnabled = this.$mineUpBtn.touchEnabled = this.$fieldUpBtn.touchEnabled = this.$houseUpBtn.touchEnabled = this.$woodUpBtn.touchEnabled = true;

        this.$mineGainBtn = new egret.Bitmap();
        this.addChild(this.$mineGainBtn);
        this.$mineGainBtn.x = 516;
        this.$mineGainBtn.y = 330;
        this.$moneyTip = new egret.Bitmap();
        this.$moneyTip.texture = RES.getRes("dian");
        this.addChild(this.$moneyTip);
        this.$moneyTip.x = 584;
        this.$moneyTip.y = 332;
        this.$woodGainBtn = new egret.Bitmap();
        this.addChild(this.$woodGainBtn);
        this.$woodGainBtn.x = 508;
        this.$woodGainBtn.y = 630;
        this.$mutouTip = new egret.Bitmap();
        this.$mutouTip.texture = RES.getRes("dian");
        this.addChild(this.$mutouTip);
        this.$mutouTip.x = 576;
        this.$mutouTip.y = 632;
        this.$hallGainBtn = new egret.Bitmap();
        this.addChild(this.$hallGainBtn);
        this.$hallGainBtn.x = 181;
        this.$hallGainBtn.y = 363;
        this.$bloodTip = new egret.Bitmap();
        this.$bloodTip.texture = RES.getRes("dian");
        this.addChild(this.$bloodTip);
        this.$bloodTip.x = 253;
        this.$bloodTip.y = 365;
        this.$mineGainBtn.texture = this.$woodGainBtn.texture = this.$hallGainBtn.texture = RES.getRes("farm_gain");
        this.$mineGainBtn.touchEnabled = this.$woodGainBtn.touchEnabled = this.$hallGainBtn.touchEnabled = true;
        this.$mineGainBtn.width = this.$woodGainBtn.width = this.$hallGainBtn.width = 90;
        this.$mineGainBtn.height = this.$woodGainBtn.height = this.$hallGainBtn.height = 48.6;

        //等级
        this.$mainLvTF = new egret.TextField();
        this.addChild(this.$mainLvTF);
        this.$mainLvTF.x = 228;
        this.$mainLvTF.y = 298;
        this.$mineLvTF = new egret.TextField();
        this.addChild(this.$mineLvTF);
        this.$mineLvTF.x = 556;
        this.$mineLvTF.y = 272;
        this.$woodLvTF = new egret.TextField();
        this.addChild(this.$woodLvTF);
        this.$woodLvTF.x = 554;
        this.$woodLvTF.y = 578;
        this.$mainLvTF.size = this.$mineLvTF.size = this.$woodLvTF.size = 20;
        this.$mainLvTF.strokeColor = this.$mineLvTF.strokeColor = this.$woodLvTF.strokeColor = 0x222222;
        this.$mainLvTF.stroke = this.$mineLvTF.stroke = this.$woodLvTF.stroke = 3;

        this._timer = new egret.Timer(10000);
    }

    //
    public static getInstance():FarmView{
        if(!FarmView._instance){
            FarmView._instance = new FarmView()
        }
        return FarmView._instance;
    }
}