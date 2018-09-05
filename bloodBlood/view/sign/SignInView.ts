/**
 * Created by 马达加加加 on 2015/10/8.
 */
class SignInView extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    private _db:any;
    private _items:SignItem[];
    private _data:any;
    private _currentItem:SignItem;
    //
    private static _instance:SignInView;
    //
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
            case this._currentItem:
                if(!this._data.IsAttend){
                    //this.onSign(null);
                    HttpModel.sign(this.onSign, this);
                }
                break;
        }
    }

    private onSign(data:any):void{
        //data = '{"Code":0,"Pr":0,"Data":{"Prize":{"Idx":1,"PrizeType":1,"ItemCode":1,"Count":2000,"V3":false}}}';
        data = JSON.parse(data);
        if(data.Code == 0){
            var info:any = data.Data.Prize;
            var type:string = info.PrizeType;
            var str:string = "获得";
            if(type == "1"){//金币
                User.getInstance().money += info.Count;
                str += Strings.MONEY+info.Count
            }else if(type == "2"){//功绩
                User.getInstance().point += info.Count;
                str += "功绩"+info.Count;
                UserRequest.getBonus(info.Count,null, null);
            }else if(type == "3"){
                BagModel.addItem(info.ItemCode, info.Count);
                var tempInfo:any = ItemData.getItemData(info.ItemCode);
                str += tempInfo.itemName + info.Count
            }
            UserModel.save();
            XTip.showTip(str);
            this._data.IsAttend = true;
            HttpModel.getSignInfo(this.onGetSignInfo, this);
        }else{
            XTip.showTip("签到失败~请稍后重试。");
        }
    }

    private showReward(day:number):void{
        if(!this._db){
            this._db = RES.getRes("signDB");
            this._items = [];
            var item:SignItem;
            for(var i:number=0; i<day; i++){
                item = new SignItem();
                item.format(this._db.DailyAttendPrize[i]);
                this.addChild(item);
                item.x = i%6*88+10;
                item.y = Math.floor(i/6) * 88+110;
                this._items.push(item);
            }
        }
        console.log(this._db);
    }

    public show():void{
        super.show();
        CoolEffect.flowIn(this);
        //this.onGetSignInfo();
        HttpModel.getSignInfo(this.onGetSignInfo, this)
    }

    private onGetSignInfo(data:any=null):void{
        //data = '{"Code":0,"Pr":0,"Data":{"AttendTimes":1,"MaxAttendTimes":31,"IsAttend":true}}';
        data = JSON.parse(data);
        this._data = data.Data;
        if(data.Code == 0){
            var MaxAttendTimes:number = data.Data.MaxAttendTimes;
            this.showReward(MaxAttendTimes);
            var nowDay:number = data.Data.AttendTimes;
            var flag:boolean = data.Data.IsAttend;
            if(flag){
                nowDay -= 1
            }
            for(var i:number=0; i<MaxAttendTimes; i++){
                this._items[i].showSign(i-nowDay,flag);
            }
            this._currentItem = this._items[nowDay];
        }else{
            XTip.showTip("获取用户信息失败，请稍后重试");
            this.close();
        }
    }

    public close():void{
        CoolEffect.flowOut(this, 250,super.close, this);
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouoch, this)
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouoch, this)
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("signUI.signBG");
        this.addChild(bg);

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.x = 480;
        this.$closeBtn.y = 36;
        this.$closeBtn.touchEnabled = true;
    }

    //
    public static getInstance():SignInView{
        if(!SignInView._instance){
            SignInView._instance = new SignInView();
        }
        return SignInView._instance
    }
}

//
class SignItem extends egret.DisplayObjectContainer{
    private $bg:egret.Bitmap;
    private $icon:egret.Bitmap;
    private $label:egret.Bitmap;
    private $tf:egret.TextField;
    private $frame:egret.Bitmap;
    public data:any;
    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    public format(data:any):void{
        this.data = data;
        var type:string = data.PrizeType;
        if(type == "1"){//金币
            this.$icon.texture = RES.getRes("8");
            this.$icon.x = -2;
            this.$icon.y = -3;
        }else if(type == "2"){//功绩
            this.$icon.texture = RES.getRes("gongji");
            this.$icon.x = (this.width - this.$icon.width)*0.5;
            this.$icon.y = (this.height - this.$icon.height)*0.5;
        }else if(type == "3"){
            this.$icon.texture = RES.getRes(data.ItemCode)
            this.$icon.x = -2;
            this.$icon.y = -3;
        }
        this.$tf.text = data.Count;
    }

    //是否已签到
    public showSign(flag:number, isSign:Boolean=false):void{
        if(flag<0){
            this.$label.texture = RES.getRes("signUI.signLabel");
            this.$frame.texture = null;
        }else if(flag==0){
            if(isSign){
                this.$label.texture = RES.getRes("signUI.signLabel");
            }else{
                this.$label.texture =null;
            }
            this.$frame.texture = RES.getRes("signUI.signFrame")
        }else{
            this.$label.texture = null;
            this.$frame.texture = null;
        }
    }

    private init():void{
        this.$bg = new egret.Bitmap();
        this.addChild(this.$bg);
        this.$bg.texture = RES.getRes("renwukuang");

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);

        this.$tf = new egret.TextField();
        this.$tf.width = 84;
        this.$tf.x = -6;
        this.$tf.textAlign = egret.HorizontalAlign.RIGHT;
        this.$tf.y = this.$bg.height - this.$tf.height-24;
        this.addChild(this.$tf);
        this.$tf.size = 24;

        this.$label = new egret.Bitmap();
        this.addChild(this.$label);

        this.$frame = new egret.Bitmap();
        this.addChild(this.$frame);
    }
}