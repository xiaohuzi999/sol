/**
 *　开始界面
 * Created by Administrator on 15-5-14.
 */
class LoginView extends XWindow{
    /** 新的旅程 */
    private $newBtn: egret.Bitmap;
    //创建底面
    private $nameBg:egret.Bitmap;
    //随机名字按钮
    private $rndBtn:egret.Bitmap;
    //
    private $nameTF:egret.TextField;
    //是否属于新建
    private _isNew:boolean = false;
    /**开始新的旅程*/
    public static START_NEW:string = "start_new";
    /**继续游戏*/
    public static START_CONTINUE:string = "start_continue";
    
    public constructor(){
        super();
        this.init();
    }
    
    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("front");
        this.addChild(bg);

        this.$newBtn = new egret.Bitmap();
        this.$newBtn.texture = RES.getRes("preload_data.startButton");
        this.addChild(this.$newBtn);
        this.$newBtn.y = 700;
        this.$newBtn.x = 216;
        this.$newBtn.touchEnabled = true;

        this.$nameBg = new egret.Bitmap();
        this.addChild(this.$nameBg);
        this.$nameBg.texture = RES.getRes("cjjs");
        this.$nameBg.x = 228;
        this.$nameBg.y = 580;

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$nameTF.text = "";
        this.$nameTF.textColor = 0x999999;
        this.$nameTF.width = 214;
        this.$nameTF.height = 40;
        this.$nameTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$nameTF.maxChars = 6;
        this.$nameTF.x = 228;
        this.$nameTF.y = 586;

        this.$rndBtn = new egret.Bitmap();
        this.$rndBtn.touchEnabled = true;
        this.addChild(this.$rndBtn);
        this.$rndBtn.x = this.$nameTF.x + this.$nameTF.width+4;
        this.$rndBtn.y = this.$nameTF.y-2;
        RES.getResByUrl(AppConfig.imgURL+"resource/assets/ui/mainView/randomBtn.png", this.onLoadBtn, this);
        this.$rndBtn.visible =false;

   }
    private onLoadBtn(tx:any):void{
        this.$rndBtn.texture = tx;
    }

    public show():void{
        super.show();
        /**
        var data = egret.localStorage.getItem(UserModel.NAME);
        if(data){
            this.$nameTF.textColor = 0xffffff;
            //读取本地数据
            User.getInstance().init();
            //User.getInstance().point = 200000
            //User.getInstance().money = 200000
            BagModel.init();
            this.$nameTF.type = egret.TextFieldType.DYNAMIC;
            this.$nameTF.text = User.getInstance().userName;
            this.$newBtn.texture = RES.getRes("preload_data.continue");
        }else{
            this.$nameTF.type = egret.TextFieldType.INPUT;
            //背包初始化
            User.getInstance().create();
            BagModel.create();
            this.$newBtn.texture = RES.getRes("preload_data.startButton");
        }
         */
        RES.loadGroup("main");
        this.$newBtn.visible = false;
        //AppConfig.account = getAccount();
        //AppConfig.cookie = getCookie();
        AppConfig.account = XUtils.getQueryString("account");
        AppConfig.cookie = XUtils.getQueryString("ck");
        AppConfig.plant = XUtils.getQueryString("plant");
        if(XUtils.getQueryString("httpRoot")){
            AppConfig.httpRoot = XUtils.getQueryString("httpRoot");
            if(AppConfig.httpRoot.indexOf("http") == -1){
                AppConfig.httpRoot = "http://"+AppConfig.httpRoot
            }
            if(AppConfig.httpRoot.charAt(AppConfig.httpRoot.length-1) != "/"){
                AppConfig.httpRoot += "/";
            }
        }
        if(XUtils.getQueryString("sid")){
            AppConfig.serverId = XUtils.getQueryString("sid");
        }
        if(!AppConfig.account){
            AppConfig.account = getAccount();
            AppConfig.cookie = getCookie();
        }
        egret.localStorage.removeItem(BagModel.NAME);
        egret.localStorage.removeItem(UserModel.NAME);
        egret.localStorage.removeItem(FarmModel.NAME);
        UserRequest.getManagrInfo( this.getManagerInfo, this);
    }

    private getManagerInfo(data:any):void{
        if(data.Code == 0){
            var managerInfo:any;
            if(data.Data.Manager && data.Data.Manager.Extra){//有角色=各种赋值
                try{
                    managerInfo = JSON.parse(data.Data.Manager.Extra);
                }catch(e){
                    alert("数据异常，请联系客服修正。");
                    return;
                }
             //console.log(AppConfig.loginTime,"time");
             }
             /**
             if(!managerInfo || !managerInfo.userId){//没有经理，新建
                this.$nameTF.type = egret.TextFieldType.INPUT;
                this._isNew = true;
                //背包初始化
                User.getInstance().create();
                BagModel.create();
                egret.localStorage.removeItem(UserModel.NAME);
                this.$newBtn.texture = RES.getRes("preload_data.startButton");
            }else{//读取存档========================
            */
                this.$nameTF.textColor = 0xffffff;
                if(!managerInfo){//没有保存经理数据，新建，容错。。
                    User.getInstance().create();
                    BagModel.create();
                }else{
                    User.getInstance().init(managerInfo);
                    BagModel.init(managerInfo.bag);
                    FarmModel.init(managerInfo.farm, false);
                    AppConfig.loginTime = Math.round(managerInfo.OnLineTick);
                }
                User.getInstance().recharegeNum = parseInt(data.Data.IsCharge+"");
                //处理点券
                User.getInstance().point = parseInt(data.Data.SurplusPoint);
                //首充处理
                PointMallView.IsdoubleCharge1 = data.Data.IsdoubleCharge1;
                PointMallView.IsdoubleCharge2 = data.Data.IsdoubleCharge2;
                PointMallView.IsdoubleCharge3 = data.Data.IsdoubleCharge3;
                PointMallView.IsdoubleCharge4 = data.Data.IsdoubleCharge4;
                PointMallView.IsdoubleCharge5 = data.Data.IsdoubleCharge5;

                User.getInstance().userId = data.Data.Manager.Idx;
                this.$nameTF.type = egret.TextFieldType.DYNAMIC;
                this.$nameTF.text = User.getInstance().userName;
                this.$newBtn.texture = RES.getRes("preload_data.continue");
           // }
            this.$newBtn.visible = true;
        }else{
            if(data.Code == DBMessage.NO_REGISTER){
                this.$rndBtn.visible = true;
                this.$newBtn.visible = true;
                this.$nameTF.type = egret.TextFieldType.INPUT;
                this.$nameTF.text = UserModel.RDName();
                this._isNew = true;
                //背包初始化
                User.getInstance().create();
                BagModel.create();
                this.$newBtn.texture = RES.getRes("preload_data.startButton");
            }else{
                XTip.showTip(DBMessage.getMsg(data.Code));
            }
        }
    }

    public initEvent():void{
        this.$newBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.$nameTF.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFoIn, this);
        this.$rndBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
    }

    public removeEvent():void{
        this.$newBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.$nameTF.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onFoIn, this);
        this.$rndBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
    }

    private onTap(event:egret.TouchEvent):void{
        switch(event.currentTarget){
            case this.$newBtn:
                if(!this._isNew ){
                    this.dispatchEvent(new egret.Event(LoginView.START_CONTINUE));
                }else{
                    if(this.$nameTF.text == "请输入角色名"){
                        XTip.showTip("亲~您需要一个如雷贯耳的大名");
                        return;
                    }
                    var len:number = this.$nameTF.text.replace(/[^\x00-\xff]/g,'**').length;
                    if(len < 4){
                        XTip.showTip("亲~听说名字长点容易火");
                        return;
                    }else if(len >8){
                        XTip.showTip("亲~您的名字太长啦~");
                        return;
                    }
                    if(User.getInstance().userName != this.$nameTF.text){
                        User.getInstance().userName = this.$nameTF.text;
                        User.getInstance().role.roleName = this.$nameTF.text;
                    }
                    //XAlert.show("确定以"+this.$nameTF.text+"这个名字开启您辉煌的冒险之旅么？", this.start, null, this);
                    this.$newBtn.visible = false;
                    UserRequest.create(this.onCreate, this);
                }
                break;
            case this.$rndBtn:
                this.$nameTF.text = UserModel.RDName();
                break;
        }
    }

    //
    private onCreate(data:any):void{
        //console.log("onCreate",data);
        if(data.Code == 0){
            User.getInstance().userId = data.Data;
            this.start();
        }else{
            this.$newBtn.visible = true;
            XTip.showTip(DBMessage.getMsg(data.Code));
        }
    }

    private onFoIn():void{
        if(this.$nameTF.text == "请输入角色名"){
            this.$nameTF.text = "";
        }
        this.$nameTF.textColor = 0xffffff;
    }

    private start():void{
        if(egret.localStorage.getItem(UserModel.NAME)){
            this.dispatchEvent(new egret.Event(LoginView.START_CONTINUE));
        }else{
            this.dispatchEvent(new egret.Event(LoginView.START_NEW));
            UserModel.save(false);
        }
    }
}
