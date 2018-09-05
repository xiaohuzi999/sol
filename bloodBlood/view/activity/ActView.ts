/**
 * Created by 马达加加加 on 2015/10/8.
 */
class ActView extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    private $firstBtn:egret.Bitmap;
    private $firstLabel:egret.Bitmap;
    private $chargeBtn:egret.Bitmap;
    private $chargeLabel:egret.Bitmap;
    //
    private $dayChargeBtn:egret.Bitmap;
    private $dayChargeLabel:egret.Bitmap;
    private $ladderActBtn:egret.Bitmap;
    private $strActLabel:egret.Bitmap;

    //
    private _selectedBtn:egret.Bitmap;
    private _currentView:any;
    //
    private _actInfo:any;
    //首充
    private $firstChargeView:FirtRechargeActCom;
    //充值
    private $recharegeCom:RechargeActCom;
    //天梯
    private $ladderActCom:LadderActCom;
    //每日首充
    private $dayChargeCom:DayChargeCom;

    private BTN_TX:any = {"firstBtn":"a_label_00","chargeBtn":"a_label_10","strActBtn":"a_label_20","dayChargeBtn":"a_label_30"};
    private BTN_TX2:any = {"firstBtn":"a_label_01","chargeBtn":"a_label_11","strActBtn":"a_label_21","dayChargeBtn":"a_label_31"};
    private LABELS:any = {"firstBtn":"$firstLabel","chargeBtn":"$chargeLabel","strActBtn":"$strActLabel","dayChargeBtn":"$dayChargeLabel"};
    private static _instance:ActView;
    public constructor(){
        super();
        this.init();
    }

    private onTouoch(event:egret.TouchEvent):void{
        switch (event.target){
            case this.$closeBtn:
                this.close();
                MainDispatcher.getInstance().dispatchEventWith(BottomCom.CLOSE_POPWIN);
                break;
            case this.$firstBtn:
                this.selectedBtn = this.$firstBtn;
                if(!this.$firstChargeView){
                    this.$firstChargeView = new FirtRechargeActCom();
                }
                this.currentView = this.$firstChargeView;
                break;
            case this.$chargeBtn:
                this.selectedBtn = this.$chargeBtn;
                if(!this.$recharegeCom){
                    this.$recharegeCom = new RechargeActCom();
                }
                this.currentView = this.$recharegeCom;
                HttpModel.getActionInfo(this.onGetActionInfo, this, this._actInfo[0].ZoneActivityId);
                //this.onGetActionInfo(null);
                break;
            case this.$ladderActBtn:
                this.selectedBtn = this.$ladderActBtn;
                if(!this.$ladderActCom){
                    this.$ladderActCom = new LadderActCom();
                }
                this.currentView = this.$ladderActCom;
                HttpModel.getActionInfo(this.onGetActionInfo, this, this._actInfo[1].ZoneActivityId);
                //this.onGetActionInfo(null);
                break;
            case this.$dayChargeBtn:
                this.selectedBtn = this.$dayChargeBtn;
                if(!this.$dayChargeCom){
                    this.$dayChargeCom = new DayChargeCom();
                }
                this.currentView = this.$dayChargeCom;
                break;
        }
    }

    //
    private onUpdate():void{
        if(this._selectedBtn == this.$ladderActBtn){
            HttpModel.getActionInfo(this.onGetActionInfo, this, this._actInfo[1].ZoneActivityId);
        }else{
            HttpModel.getActionInfo(this.onGetActionInfo, this, this._actInfo[0].ZoneActivityId);
        }
    }

    //
    private onGetActionInfo(data:any):void{
        //data = '{"Code":0,"Pr":0,"Data":{"Groups":[{"GroupId":1,"ExData":0,"ExRecord":{"Idx":1,"ManagerId":"7AF2D67B-D5CB-46B5-ADF4-A4CF010985CF","ZoneActivityId":1,"ExcitingId":1,"GroupId":1,"CurData":0,"ExData":0,"ExStep":10,"ReceiveTimes":0,"Status":1}},{"GroupId":2,"ExData":0,"ExRecord":{"Idx":2,"ManagerId":"7AF2D67B-D5CB-46B5-ADF4-A4CF010985CF","ZoneActivityId":1,"ExcitingId":1,"GroupId":2,"CurData":0,"ExData":0,"ExStep":30,"ReceiveTimes":0,"Status":0}},{"GroupId":3,"ExData":0,"ExRecord":{"Idx":3,"ManagerId":"7AF2D67B-D5CB-46B5-ADF4-A4CF010985CF","ZoneActivityId":1,"ExcitingId":1,"GroupId":3,"CurData":0,"ExData":0,"ExStep":100,"ReceiveTimes":0,"Status":0}},{"GroupId":4,"ExData":0,"ExRecord":{"Idx":4,"ManagerId":"7AF2D67B-D5CB-46B5-ADF4-A4CF010985CF","ZoneActivityId":1,"ExcitingId":1,"GroupId":4,"CurData":0,"ExData":0,"ExStep":300,"ReceiveTimes":0,"Status":0}},{"GroupId":5,"ExData":0,"ExRecord":{"Idx":5,"ManagerId":"7AF2D67B-D5CB-46B5-ADF4-A4CF010985CF","ZoneActivityId":1,"ExcitingId":1,"GroupId":5,"CurData":0,"ExData":0,"ExStep":500,"ReceiveTimes":0,"Status":0}}]}}';
        data = JSON.parse(data);
        if(data.Code == 0){
            this._currentView.format(data.Data);
        }else{
            XTip.showTip("数据获取失败，请稍后重试。");
            this.close();
        }
    }

    //
    private set selectedBtn(btn:egret.Bitmap){
        if(this._selectedBtn != btn){
            if(this._selectedBtn){
                this._selectedBtn.texture = RES.getRes("act.a_bg_1");
                this[this.LABELS[this._selectedBtn.name]].texture = RES.getRes("act."+this.BTN_TX2[this._selectedBtn.name]);
            }
            this._selectedBtn = btn;
            if(this._selectedBtn){
                this._selectedBtn.texture = RES.getRes("act.a_bg_0");
                this[this.LABELS[this._selectedBtn.name]].texture = RES.getRes("act."+this.BTN_TX[this._selectedBtn.name]);
            }
        }
    }

    //
    private set currentView(view:egret.DisplayObject){
        if(this._currentView != view){
            if(this._currentView){
                this._currentView.parent.removeChild(this._currentView)
            }
            this._currentView = view;
            if(this._currentView){
                this.addChild(this._currentView);
                this._currentView.initEvent();
            }
        }
    }

    //
    private onGetActionList(data:any):void{
        //data = '{"Code":0,"Pr":0,"Data":{"List":[{"ZoneActivityId":1,"StartTimeTick":1444262400000,"EndTimeTick":1445990400000,"ExcitingId":1},{"ZoneActivityId":2,"StartTimeTick":1444262400000,"EndTimeTick":1445990400000,"ExcitingId":2}]}}'
        data = JSON.parse(data);
        if(data.Code == 0){
            this._actInfo = data.Data.List;
            console.log(this._actInfo,"act")
        }else{
            XTip.showTip("数据获取失败，请稍后重试。");
            this.close();
        }
    }

    public show():void{
        super.show();
        CoolEffect.flowIn(this);
        //
        HttpModel.getActionList(this.onGetActionList, this)
    }

    public close():void{
        CoolEffect.flowOut(this, 250,super.close, this);
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouoch, this);
        MainDispatcher.getInstance().addEventListener("act_update", this.onUpdate, this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouoch, this);
        MainDispatcher.getInstance().removeEventListener("act_update", this.onUpdate, this);
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("daojudi");
        bg.y = 30;
        bg.width = 550;
        bg.height = 700;

        bg = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("a_title");
        bg.x = 160;

        this.$firstBtn = new egret.Bitmap();
        this.addChild(this.$firstBtn);
        this.$firstBtn.texture = RES.getRes("act.a_bg_1");
        this.$firstBtn.x = 8;
        this.$firstBtn.y = 84;
        this.$firstBtn.width = 120;
        this.$firstBtn.name = "firstBtn";

        this.$firstLabel = new egret.Bitmap();
        this.addChild(this.$firstLabel);
        this.$firstLabel.texture = RES.getRes("act.a_label_00");
        this.$firstLabel.x = 18;
        this.$firstLabel.y = 106;

        this.$chargeBtn = new egret.Bitmap();
        this.addChild(this.$chargeBtn);
        this.$chargeBtn.texture = RES.getRes("act.a_bg_1");
        this.$chargeBtn.x = 120;
        this.$chargeBtn.y = 84;
        this.$chargeBtn.width = 120;
        this.$chargeBtn.name = "chargeBtn";

        this.$chargeLabel = new egret.Bitmap();
        this.addChild(this.$chargeLabel);
        this.$chargeLabel.texture = RES.getRes("act.a_label_11");
        this.$chargeLabel.x  = 130;
        this.$chargeLabel.y = 106;

        this.$ladderActBtn = new egret.Bitmap();
        this.addChild(this.$ladderActBtn);
        this.$ladderActBtn.texture = RES.getRes("act.a_bg_1");
        this.$ladderActBtn.x = 231;
        this.$ladderActBtn.width = 166;
        this.$ladderActBtn.y = 84;
        this.$ladderActBtn.name = "strActBtn";

        this.$strActLabel = new egret.Bitmap();
        this.addChild(this.$strActLabel);
        this.$strActLabel.texture = RES.getRes("act.a_label_21");
        this.$strActLabel.x  = 244;
        this.$strActLabel.y = 106;

        this.$dayChargeBtn = new egret.Bitmap();
        this.addChild(this.$dayChargeBtn);
        this.$dayChargeBtn.texture = RES.getRes("act.a_bg_1");
        this.$dayChargeBtn.x = 382;
        this.$dayChargeBtn.width = 168;
        this.$dayChargeBtn.y = 84;
        this.$dayChargeBtn.name = "dayChargeBtn";

        this.$dayChargeLabel = new egret.Bitmap();
        this.addChild(this.$dayChargeLabel);
        this.$dayChargeLabel.texture = RES.getRes("act.a_label_31");
        this.$dayChargeLabel.x  = 398;
        this.$dayChargeLabel.y = 106;

        bg = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("E_line");
        bg.x = -6;
        bg.y = 139;

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.x = 486;
        this.$closeBtn.y = 31;
        this.$closeBtn.touchEnabled = this.$firstBtn.touchEnabled = this.$chargeBtn.touchEnabled =
            this.$ladderActBtn.touchEnabled = this.$dayChargeBtn.touchEnabled = true;

        this.selectedBtn = this.$firstBtn;
        if(!this.$firstChargeView){
            this.$firstChargeView = new FirtRechargeActCom();
        }
        this.currentView = this.$firstChargeView;
    }

    //
    public static getInstance():ActView{
        if(!ActView._instance){
            ActView._instance = new ActView();
        }
        return ActView._instance;
    }
}

//首充界面
class FirtRechargeActCom extends egret.DisplayObjectContainer{
    private $rechargeBtn:egret.Bitmap;
    private $getBtn:egret.Bitmap;
    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        switch(event.target){
            case this.$rechargeBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
                break;
            case this.$getBtn:
                if(User.getInstance().recharegeNum >0){
                    if(User.getInstance().hasReward){
                        XTip.showTip("亲~您已领取该奖励。")
                    }else{
                        BagModel.addItem(108);
                        XTip.showTip("获得玄屠剑");
                        User.getInstance().hasReward = true;
                        UserModel.save();
                    }
                }else{
                    XTip.showTip("亲~您还没有充值哦。")
                }
                break;
        }
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("act.a_jian");

        bg = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("act.a_xtj");
        bg.x = 30;
        bg.y = 100;

        this.$rechargeBtn = new egret.Bitmap();
        this.addChild(this.$rechargeBtn);
        this.$rechargeBtn.x = 81;
        this.$rechargeBtn.texture = RES.getRes("act.RA_chargeBtn");

        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.text = "充值任意金额，即可获得绝版珍藏武器";
        tf.x = 30;
        tf.y  = 370;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;
        tf.size = 24;
        tf.textColor = 0xDFBE8A;

        this.$getBtn = new egret.Bitmap();
        this.addChild(this.$getBtn);
        this.$getBtn.texture = RES.getRes("act.RA_getBtn");
        this.$getBtn.x = 260;
        this.$rechargeBtn.y = this.$getBtn.y = 440;
        this.$getBtn.touchEnabled = this.$rechargeBtn.touchEnabled = true;
        this.x = 20;
        this.y = 180;
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }
}


//充值活动
class RechargeActCom extends egret.DisplayObjectContainer{
    private $btn_0:egret.Bitmap;
    private $btn_1:egret.Bitmap;
    private $btn_2:egret.Bitmap;
    private $btn_3:egret.Bitmap;
    private $btn_4:egret.Bitmap;
    //充值标志
    private $rechargeTF:egret.TextField;
    private data:any;
    private _idx:number;
    //礼包配置

    private static GIFTS:any = {
        0:{"wood":2000,blood:"10","money":100000},
        1:{"wood":5000,blood:"20","money":200000},
        2:{"wood":15000,blood:"80","money":1000000},
        3:{"wood":40000,blood:"250","money":3000000},
        4:{"wood":100000,blood:"300","money":5000000}
    }
    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    //
    public format(data:any):void{
        this.data = data;
        var info:any;
        var bm:egret.Bitmap;
        for(var i:number=0; i<5; i++){
            info = data.Groups[i];
            bm = this["$btn_"+i];
            if(info.ExRecord.Status == 0){//未领取
                bm.texture = RES.getRes("lingqu_hui_png");
                bm.touchEnabled = false;
            }else if(info.ExRecord.Status == 1){//可以领取
                bm.texture = RES.getRes("lingqu_png");
                bm.touchEnabled = true;
            }else{//已领取
                bm.texture = RES.getRes("act.a_doneBtn");
                bm.touchEnabled = false;
            }
        }
        this.$rechargeTF.text = "当前已经充值:"+User.getInstance().recharegeNum;
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        var info:any
        switch (event.target){
            case this.$btn_0:
                info = this.data.Groups[0];
                this._idx = 0;
                break;
            case this.$btn_1:
                info = this.data.Groups[1];
                this._idx = 1;
                break;
            case this.$btn_2:
                info = this.data.Groups[2];
                this._idx = 2;
                break;
            case this.$btn_3:
                info = this.data.Groups[3];
                this._idx = 3;
                break;
            case this.$btn_4:
                info = this.data.Groups[4];
                this._idx = 4;
                break;
        }
        if(info){
            HttpModel.getReward(this.onGetReward, this, info.ExRecord.Idx);
            //this.onGetReward(null)
        }
    }

    //
    private onGetReward(data:any):void{
        //data = '{"Code":8000}';
        data = JSON.parse(data);
        if(data.Code == 0 || data.Code == 8000){
            var gift:any = RechargeActCom.GIFTS[this._idx];
            User.getInstance().money += Math.round(gift.money);//金币
            BagModel.addItem(ItemData.BLOOD,gift.blood);//精华
            FarmModel.getFarmInfo().woodNum += Math.round(gift.wood);
            FarmModel.save();
            UserModel.save();
            BagModel.save();
            XTip.showTip("领取成功。");
            //更新状态===
            MainDispatcher.getInstance().dispatchEventWith("act_update");
        }else{
            if(data.Code == 901){
                XTip.showTip("该奖励已领取")
            }else{
                XTip.showTip("领取失败。")
            }
        }
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("rechargeBG");

        this.x = 16;
        this.y = 160;

        this.$btn_0 = new egret.Bitmap();
        this.$btn_0.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_0);
        this.$btn_0.x = 390;
        this.$btn_0.y = 84;

        this.$btn_1 = new egret.Bitmap();
        this.$btn_1.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_1);
        this.$btn_1.x = 390;
        this.$btn_1.y = 178;

        this.$btn_2 = new egret.Bitmap();
        this.$btn_2.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_2);
        this.$btn_2.x = 390;
        this.$btn_2.y = 274;

        this.$btn_3 = new egret.Bitmap();
        this.$btn_3.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_3);
        this.$btn_3.x = 390;
        this.$btn_3.y = 364;

        this.$btn_4 = new egret.Bitmap();
        this.$btn_4.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_4);
        this.$btn_4.x = 390;
        this.$btn_4.y = 460;

        this.$rechargeTF = new egret.TextField();
        this.addChild(this.$rechargeTF);
        this.$rechargeTF.textColor = 0xff0000;
        this.$rechargeTF.width = 280;
        this.$rechargeTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$rechargeTF.size = 22;
        this.$rechargeTF.textAlign = egret.HorizontalAlign.RIGHT;
        this.$rechargeTF.x = 240;

        var tf:egret.TextField = this.createTF();
        tf.text = "2000";
        tf.x = 180;
        tf.y = 126;
        tf = this.createTF();
        tf.text = "10";
        tf.x = 280;
        tf.y = 126;
        tf = this.createTF();
        tf.text = "10万";
        tf.x = 330;
        tf.y = 126;

        tf = this.createTF();
        tf.text = "5000";
        tf.x = 180;
        tf.y = 220;
        tf = this.createTF();
        tf.text = "20";
        tf.x = 280;
        tf.y = 220;
        tf = this.createTF();
        tf.text = "20万";
        tf.x = 330;
        tf.y = 220;

        tf = this.createTF();
        tf.text = "15000";
        tf.x = 170;
        tf.y = 318;
        tf = this.createTF();
        tf.text = "80";
        tf.x = 280;
        tf.y = 318;
        tf = this.createTF();
        tf.text = "100万";
        tf.x = 320;
        tf.y = 318;

        tf = this.createTF();
        tf.text = "40000";
        tf.x = 170;
        tf.y = 410;
        tf = this.createTF();
        tf.text = "250";
        tf.x = 264;
        tf.y = 410;
        tf = this.createTF();
        tf.text = "300万";
        tf.x = 320;
        tf.y = 410;

        tf = this.createTF();
        tf.text = "10万";
        tf.x = 180;
        tf.y = 504;
        tf = this.createTF();
        tf.text = "300";
        tf.x = 264;
        tf.y = 504;
        tf = this.createTF();
        tf.text = "500万";
        tf.x = 320;
        tf.y = 504;
        this.cacheAsBitmap = true;
    }


    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private createTF():egret.TextField{
        var tf:egret.TextField = new egret.TextField();
        tf.size = 20;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.addChild(tf);
        return tf;
    }
}


//天梯活动
class LadderActCom extends egret.DisplayObjectContainer{
    private $btn_0:egret.Bitmap;
    private $btn_1:egret.Bitmap;
    private $btn_2:egret.Bitmap;
    private $btn_3:egret.Bitmap;
    private data:any;
    private _idx:number;
    //礼包配置
    private static GIFTS:any = {
        0:[{ItemCode:2,Count:5}],
        1:[{ItemCode:2,Count:5},{ItemCode:3,Count:5}],
        2:[{ItemCode:2,Count:10},{ItemCode:3,Count:10}],
        3:[{ItemCode:2,Count:15},{ItemCode:3,Count:15},{ItemCode:4,Count:10}]
    }
    //礼包配置
    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    //
    public format(data:any):void{
        this.data = data;
        var info:any;
        var bm:egret.Bitmap;
        for(var i:number=0; i<4; i++){
            info = data.Groups[i];
            bm = this["$btn_"+i];
            if(info.ExRecord.Status == 0){//未领取
                bm.texture = RES.getRes("lingqu_hui_png");
                bm.touchEnabled = false;
            }else if(info.ExRecord.Status == 1){//可以领取
                bm.texture = RES.getRes("lingqu_png");
                bm.touchEnabled = true;
            }else{//已领取
                bm.texture = RES.getRes("act.a_doneBtn");
                bm.touchEnabled = false;
            }
        }
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        var info:any;
        switch (event.target){
            case this.$btn_0:
                info = this.data.Groups[0];
                this._idx = 0;
                break;
            case this.$btn_1:
                info = this.data.Groups[1];
                this._idx = 1;
                break;
            case this.$btn_2:
                info = this.data.Groups[2];
                this._idx = 2;
                break;
            case this.$btn_3:
                info = this.data.Groups[3];
                this._idx = 3;
                break;
        }
        if(info){
            HttpModel.getReward(this.onGetReward, this, info.ExRecord.Idx);
            //this.onGetReward(null);
            //
        }
    }

    //
    private onGetReward(data:any):void{
        //data = '{"Code":8000}'
        data = JSON.parse(data);
        if(data.Code == 0 || data.Code == 8000){
            var gifts:any[] = LadderActCom.GIFTS[this._idx];
            var info:any;
            for(var i:number=0; i<gifts.length; i++){
                info = gifts[i];
                BagModel.addItem(info.ItemCode, info.Count)
            }
            XTip.showTip("领取成功。");
            BagModel.save();
            //更新状态===
            MainDispatcher.getInstance().dispatchEventWith("act_update");
        }else{
            if(data.Code == 901){
                XTip.showTip("该奖励已领取")
            }else{
                XTip.showTip("领取失败。")
            }
        }
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("ladderAct");

        this.x = 16;
        this.y = 160;

        this.$btn_0 = new egret.Bitmap();
        this.$btn_0.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_0);
        this.$btn_0.x = 390;
        this.$btn_0.y = 120;

        this.$btn_1 = new egret.Bitmap();
        this.$btn_1.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_1);
        this.$btn_1.x = 390;
        this.$btn_1.y = 224;

        this.$btn_2 = new egret.Bitmap();
        this.$btn_2.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_2);
        this.$btn_2.x = 390;
        this.$btn_2.y = 328;

        this.$btn_3 = new egret.Bitmap();
        this.$btn_3.texture = RES.getRes("lingqu_hui_png");
        this.addChild(this.$btn_3);
        this.$btn_3.x = 390;
        this.$btn_3.y = 430;

        var tf:egret.TextField = this.createTF();
        tf.text = "5";
        tf.x = 216;
        tf.y = 162;

        tf = this.createTF();
        tf.text = "5";
        tf.x = 216;
        tf.y = 264;
        tf = this.createTF();
        tf.text = "5";
        tf.x = 292;
        tf.y = 264;

        tf = this.createTF();
        tf.text = "10";
        tf.x = 210;
        tf.y = 366;
        tf = this.createTF();
        tf.text = "10";
        tf.x = 286;
        tf.y = 366;

        tf = this.createTF();
        tf.text = "15";
        tf.x = 210;
        tf.y = 468;
        tf = this.createTF();
        tf.text = "15";
        tf.x = 286;
        tf.y = 468;
        tf = this.createTF();
        tf.text = "10";
        tf.x = 362;
        tf.y = 468;
        this.cacheAsBitmap = true;
    }

    private createTF():egret.TextField{
        var tf:egret.TextField = new egret.TextField();
        tf.size = 22;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.addChild(tf);
        return tf;
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }
}

class DayChargeCom extends egret.DisplayObjectContainer{
    private $rechargeBtn:egret.Bitmap;
    private $getBtn:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        switch(event.target){
            case this.$rechargeBtn:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
                break;
            case this.$getBtn:
                HttpModel.getDayChargeReward(this.onGetReward, this);
                break;
        }
    }

    //
    private onGetReward(data:any):void{
        var data:any = JSON.parse(data);
        if(data.Code == 0){
            BagModel.addItem(ItemData.BLOOD, 10);
            BagModel.save();
            XTip.showTip("领取成功,获得血液精华*10");
        }else{
            if(data.Code == 314){
                XTip.showTip("没有可领取的奖励");
            }else{
                XTip.showTip("领取失败！");
            }
        }
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("act.dayChargeBG"));
        this.addChild(bg);

        var tf:egret.TextField = new egret.TextField();
        tf.size = 24;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;
        tf.textFlow = Utils.htmlParser.parser("每日充值任意金额，即可获得<font color='#ff0000'>血液精华*10</font>");
        this.addChild(tf);
        tf.y = 340;
        tf.x = 20;

        this.$rechargeBtn = new egret.Bitmap();
        this.addChild(this.$rechargeBtn);
        this.$rechargeBtn.x = 81;
        this.$rechargeBtn.texture = RES.getRes("act.RA_chargeBtn");

        this.$getBtn = new egret.Bitmap();
        this.addChild(this.$getBtn);
        this.$getBtn.texture = RES.getRes("act.RA_getBtn");
        this.$getBtn.x = 260;
        this.$rechargeBtn.y = this.$getBtn.y = 440;
        this.$getBtn.touchEnabled = this.$rechargeBtn.touchEnabled = true;
        this.x = 20;
        this.y = 180;
    }
}