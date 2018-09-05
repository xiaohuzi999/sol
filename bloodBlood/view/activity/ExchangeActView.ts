/**
 * Created by 马达加加加 on 2015/8/27.
 */
class ExchangeActView extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    private $exchangeBtn:egret.Bitmap;
    private $shareBtn:egret.Bitmap;
    private _selectedBtn:egret.Bitmap;
    //
    private _exchangeCom:ExchangeCom;
    //
    private _shareCom:ShareCom;
    //
    private _currentView:egret.DisplayObject;
    //
    private static _instance:ExchangeActView;
    public constructor(){
        super();
        this.init();
    }

    public show():void{
        super.show();
        CoolEffect.flowIn(this);
    }

    public close():void{
        CoolEffect.flowOut(this,250, super.close, this);
    }

    private onTouch(event:egret.TouchEvent):void{
        switch (event.target){
            case this.$closeBtn:
                this.close();
                MainDispatcher.getInstance().dispatchEventWith(BottomCom.CLOSE_POPWIN);
                break;
            case this.$exchangeBtn:
                this.selectedBtn = this.$exchangeBtn;
                break;
            case this.$shareBtn:
                this.selectedBtn = this.$shareBtn;
                break;
        }
    }

    private set selectedBtn(btn:egret.Bitmap){
        this._selectedBtn = btn;
        if(btn == this.$exchangeBtn){
            this.$exchangeBtn.texture = RES.getRes("E_exchangeBtn_0");
            this.$shareBtn.texture = RES.getRes("E_share_1");
            this.currentView = this._exchangeCom;
        }else{
            this.$exchangeBtn.texture = RES.getRes("E_exchangeBtn_1");
            this.$shareBtn.texture = RES.getRes("E_share_0");
            this.currentView = this._shareCom;
        }
    }

    private set currentView(v:egret.DisplayObject){
        if(this._currentView != v){
            if(this._currentView && this._currentView.parent){
                this.removeComEvent();
                this.removeChild(this._currentView);
            }
            this._currentView = v;
            this.addComEvent();
            this.addChild(this._currentView);
        }
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("daojudi");
        bg.y = 30;
        bg.width = 550;
        bg.height = 720;

        bg = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("title_bg");
        bg.x = 154;

        bg = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("E_label");
        bg.x = 211;
        bg.y = 16;

        this.$exchangeBtn = new egret.Bitmap();
        this.addChild(this.$exchangeBtn);
        this.$exchangeBtn.texture = RES.getRes("E_exchangeBtn_0");
        this.$exchangeBtn.x = 16;
        this.$exchangeBtn.y = 78;

        this.$shareBtn = new egret.Bitmap();
        this.addChild(this.$shareBtn);
        this.$shareBtn.texture = RES.getRes("E_share_1");
        this.$shareBtn.x = 138;
        this.$shareBtn.y = 78;

        bg = new egret.Bitmap();
        this.addChild(bg);
        bg.texture = RES.getRes("E_line");
        bg.x = -6;
        bg.y = 131;

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.x = 486;
        this.$closeBtn.y = 31;
        this.$closeBtn.touchEnabled = this.$exchangeBtn.touchEnabled = this.$shareBtn.touchEnabled = true;

        this._exchangeCom = new ExchangeCom();
        this._exchangeCom.y = 197;
        this.currentView = this._exchangeCom;

        this._shareCom = new ShareCom();
        this._shareCom.x = 5;
        this._shareCom.y = 154;

        HttpModel.init();
    }

    private addComEvent():void{
        if(this._currentView == this._exchangeCom){
            this._exchangeCom.initEvent();
        }else if(this._currentView == this._shareCom){
            this._shareCom.initEvent();
        }
    }
    private removeComEvent():void{
        if(this._currentView == this._exchangeCom){
            this._exchangeCom.removeEvent();
        }else if(this._currentView == this._shareCom){
            this._shareCom.removeEvent();
        }
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addComEvent();
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.removeComEvent();
    }

    //
    public static getInstance():ExchangeActView{
        if(!ExchangeActView._instance){
            ExchangeActView._instance = new ExchangeActView();
        }
        return ExchangeActView._instance;
    }
}


//兑换界面
class ExchangeCom extends egret.DisplayObjectContainer{
    private $codeTF:egret.TextField;
    private $getBtn:egret.Bitmap;
    private _code:string;
    public constructor(){
        super();
        this.init();
    }

    public initEvent():void{
        this.$getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$codeTF.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.$getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$codeTF.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(event:egret.TouchEvent):void{
        switch (event.currentTarget){
            case this.$getBtn:
                if(this.$codeTF.text == "" || this.$codeTF.text == "请您输入兑换码"){
                    XTip.showTip(" 请输入兑换码！");
                }else{
                    this._code = this.$codeTF.text;
                    HttpModel.shareCodePrize(this.getPrize, this, this.$codeTF.text);
                }
                break
            case this.$codeTF:
                if(this.$codeTF.text == "请您输入兑换码"){
                    this.$codeTF.text = "";
                }
                break
        }
    }

    //领取奖励
    private getPrize(data):void{
        var data_json = JSON.parse(data);
        if(data_json.Code == 0){
            if(this._code.indexOf("__") != -1) {//5个初级血瓶
                BagModel.addItem(ItemData.HP_0,5);
                XTip.showTip("礼包兑换成功！");
                BagModel.save();
            }else if(this._code.indexOf("-") != -1){//微信外发礼包:1万金币，5个血精，5个初级血瓶
                User.getInstance().money += 10000;
                BagModel.addItem(ItemData.BLOOD, 5);
                BagModel.addItem(ItemData.HP_0,5);
                UserModel.save();
                BagModel.save();
                XTip.showTip("礼包兑换成功！");
            }else if(this._code.indexOf("$") != -1){//20000,1级强化石*10,2级强化石*5；
                User.getInstance().money += 20000;
                BagModel.addItem(2, 10);
                BagModel.addItem(3,5);
                UserModel.save();
                BagModel.save();
                XTip.showTip("礼包兑换成功！");
            }else if(this._code.indexOf("_") != -1){//20000,血液精华*10,中级治疗药剂*2；
                User.getInstance().money += 20000;
                BagModel.addItem(ItemData.BLOOD, 10);
                BagModel.addItem(ItemData.HP_1,2);
                UserModel.save();
                BagModel.save();
                XTip.showTip("礼包兑换成功！");
            }else{//分享礼包
                User.getInstance().point += 20;
                UserRequest.getBonus(20,null, null);
                UserModel.save();
                XTip.showTip(" 成功领取20功绩！");
            }
        }else if(data_json.Code == 8002){
            XTip.showTip(" 该兑换码已经领取过了！");
        }else if(data_json.Code == 8004){
            XTip.showTip(" 该兑换码是自己！");
        }else if(data_json.Code == 8005){
            XTip.showTip("该兑换码不存在！");
        }else if(data_json.Code == 8001){
            XTip.showTip(" 领取奖励失败！");
        }else{
            XTip.showTip(DBMessage.getMsg(data_json.Code));
        }
    }

    private init():void{
        var tf:egret.TextField = new egret.TextField();
        tf.text = "输入兑换码领取丰厚大礼";
        this.addChild(tf);
        tf.x = 114 + 7;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("E_baoshi");
        bm.x = 26;
        bm.y = -10;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("E_input");
        this.addChild(bm);
        bm.width = 480;
        bm.height = 55;
        bm.x = 35;
        bm.y = 264;

        this.$codeTF = new egret.TextField();
        this.addChild(this.$codeTF);
        this.$codeTF.type = egret.TextFieldType.INPUT;
        this.$codeTF.x = 35 + 13;
        this.$codeTF.y = 280;
        this.$codeTF.width = 454;
        this.$codeTF.size = 22;
        this.$codeTF.textColor = 0xdfbf88;
        this.$codeTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$codeTF.text = "请您输入兑换码";

        this.$getBtn = new egret.Bitmap();
        this.$getBtn.texture = RES.getRes('E_getBtn');
        this.addChild(this.$getBtn);
        this.$getBtn.x = 114 + 79;
        this.$getBtn.y = 386;
        this.$getBtn.touchEnabled = true;
    }
}

//分享界面
class ShareCom extends egret.DisplayObjectContainer{
    private $codeTF:egret.TextField;
    private $shareBtn:egret.Bitmap;
    //招募
    private $getBtn:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    public initEvent():void{
        this.$getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    public removeEvent():void{
        this.$getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.$shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(event:egret.TouchEvent):void{
        switch (event.currentTarget){
            case this.$getBtn:
                HttpModel.sharePrize(this.getPrize, this);
                break;
            case this.$shareBtn:
                //XTip.showTip(" 暂未开放！");
                var url:string = "http://xs.qidian.com/html/index.shtml";
                var _container:string = "狂舞高歌，踏血而行，是为三界血歌！修仙礼包兑换："+this.$codeTF.text+"。   踏上修仙路"+url;
                var imgUrl:string = "";
                var sharesinastring:string='http://v.t.sina.com.cn/share/share.php?title='+_container+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+imgUrl;
                window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
                //console.log("分享");
                //WX.share("test","22");
                break
        }
    }

    private getPrize(data):void{
        var data_json = JSON.parse(data);
        if(data_json.Code == 0){
            UserModel.joinTeam("黑麒麟");
        }else if(data_json.Code == 8003){
            XTip.showTip(" 分享次数不够！");
        }else if(data_json.Code == -1){
            XTip.showTip(" 服务器更新中！");
        }else if(data_json.Code == 8002){
            XTip.showTip(" 分享奖励已经领取过了！");
        }else if(data_json.Code == 8001){
            XTip.showTip(" 领取奖励失败！");
        }else{
            XTip.showTip(DBMessage.getMsg(data_json.Code));
        }
    }


    //显示分享码
    private showShareCode(data):void{
        var data_json = JSON.parse(data);
        if(data_json.Code == 0){
            this.$codeTF.text = data_json.Data.ShareYard;
        }else if(data_json.Code == -1){
            XTip.showTip("服务器正在维护中...");
        }
    }

    private init():void{
        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.x = 15;
        tf.text = "我的兑换码：";
        tf.textColor = 0x00E8FD;
        tf.size = 25;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$codeTF = new egret.TextField();
        this.addChild(this.$codeTF);
        this.$codeTF.textColor = 0x00E8FD;
        this.$codeTF.size = 18;
        this.$codeTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$codeTF.x = tf.x + tf.width - 3;
        this.$codeTF.y = tf.y + 7;

        var bm:egret.Bitmap = new egret.Bitmap();
        bm.texture  = RES.getRes("E_qilin");
        this.addChild(bm);
        bm.y = 12;

        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.width = 486;
        tf.x = 38;
        tf.y = 366;
        tf.size = 24;
        tf.textColor = 0xa28454;
        tf.fontFamily = Strings.DEFAULT_FONT_NAME;
        tf.lineSpacing = 3;
        tf.text = "将兑换码分享至新浪平台，其他玩家在游戏内可使用该兑换码获取20功绩点，限兑换1次。当一个分享码被5个玩家使用，可直接获得“黑麒麟”。";

        this.$shareBtn = new egret.Bitmap();
        this.addChild(this.$shareBtn);
        this.$shareBtn.texture = RES.getRes("E_shareBn");
        this.$shareBtn.x = 115;
        this.$shareBtn.y = 502;

        this.$getBtn = new egret.Bitmap();
        this.addChild(this.$getBtn);
        this.$getBtn.texture = RES.getRes("zhaomu_item_png");
        this.$getBtn.x = 293;
        this.$getBtn.y = 502;
        this.$shareBtn.touchEnabled = this.$getBtn.touchEnabled = true;

        HttpModel.userInfo(this.showShareCode, this);
    }
}