/**
 * Created by 马达加加加 on 2015/7/14.
 */
class FieldCom extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    //
    private _items:FieldItem[] = [];
    private $tipTF:egret.TextField;
    private $tipTF2:egret.TextField;
    private _timer:egret.Timer;
    private _data:any;
    private _currentItem:FieldItem;
    public constructor(){
        super();
        this.init();
    }

    public show(center:boolean=true, ...args: any[]){
        super.show(center);
        this.formatField(args[0]);
        this._timer.start();
        CoolEffect.flowIn(this);
    }

    public close():void{
        CoolEffect.flowOut(this,200,super.close,this,null);
    }

    private formatField(data:any):void{
        this._data = data;
        var num:number = 0;
        for(var i:number=0; i<6; i++){
            this._items[i].format(this._data[i]);
            num+= this._items[i].gainNum;
        }
        this.$tipTF.text = Strings.GAIN_NUM+num+Strings.PER_MIN;
        this.$tipTF.text+=("\n"+Strings.NEED_NUM+FarmModel.vo.personNum*5)+Strings.PER_MIN;
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        if(event.currentTarget == this.$closeBtn){
            this._timer.stop();
            this.close();
        }
    }

    //
    private onItemTouch(event:egret.TouchEvent):void{
        if(event.target){
            //console.log(event.target.name);
            var item:FieldItem = event.target.parent;
            this._currentItem = item;
            var info:any = FarmModel.vo.fieldInfo;
            switch (event.target.name){
                case "buildBtn":
                    //提示多少钱
                    var index:number=0;
                    for(var i:number=0; i<6; i++) {
                        if (info.grids[i].opened == false) {
                            index=i;
                            break;
                        }
                    }
                    var point:number = 10*(index-1);
                    var arr:string[] = Strings.EXPAND_TIP.split("$");
                    var str:string = arr[0]+Strings.BUILDINGS_FIELD+arr[1]+point+arr[2];
                    XAlert.show(str, this.onExpand, null, this);
                    break;
                case "lvUpBtn":
                    info = info.grids[item.name];
                    var hallLv:number = FarmModel.vo.hallInfo.lv;
                    if(info.lv >= hallLv){
                        XTip.showTip(Strings.BUILDING_LV_ERR);
                        return;
                    }
                    var materialInfo:any=FarmModel.getMaterial(FarmModel.FIELD,info.lv);
                    var arr:string[] = Strings.BUILDING_UP_STR.split("$");
                    var str:string = arr[0]+Strings.BUILDINGS_FIELD+arr[1]+materialInfo.money+arr[2]+materialInfo.wood+arr[3];
                    str += "效果：产量提升至"+FarmModel.getGainNum(FarmModel.FIELD, (info.lv+1))+"/分钟";
                    XAlert.show(str, this.confirmUp,null,this,true,false);
                    break;
                case "gainBtn":
                    if(FarmModel.gain(FarmModel.FIELD, parseInt(item.name))){
                        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("harvest_json"), RES.getRes("harvest_png") );
                        var mc:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "harvest" ) );
                        this.addChild(mc);
                        mc.x = item.x-20;
                        mc.y = item.y;
                        mc.addEventListener(egret.Event.ENTER_FRAME, this.onEF, this)
                        mc.gotoAndPlay(1);
                        this._timer.stop();
                        //this.formatField(this._data);
                    }
                    break;
            }
        }
    }

    private confirmUp():void{
        if(FarmModel.upBuilding(FarmModel.FIELD,parseInt(this._currentItem.name))){
            XTip.showTip(Strings.LV_UP_SUC);
            this.formatField(this._data);
        }
    }

    private onExpand():void{
        FarmModel.expand(FarmModel.FIELD, this.formatField,this);
    }

    private onEF(event:egret.Event):void{
        var mc:egret.MovieClip = event.currentTarget;
        if(mc.currentFrame == mc.totalFrames){
            mc.parent.removeChild(mc);
            mc.stop();
            mc.removeEventListener(egret.Event.ENTER_FRAME, this.onEF, this);
            this._timer.start();
            this.formatField(this._data);
        }
    }

    private onTimer(event:egret.TimerEvent):void{
        this.formatField(this._data);
    }

    public initEvent():void{
        this.$closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }

    public removeEvent():void{
        this.$closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onItemTouch, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    }

    //
    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.y = 32;
        bm.texture = RES.getRes("daojudi");
        bm.height = 766;

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.touchEnabled = true;
        this.$closeBtn.x = 450;
        this.$closeBtn.y = 32;

        this.$tipTF = new egret.TextField();
        this.addChild(this.$tipTF);
        this.$tipTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$tipTF.strokeColor = 0x222222;
        this.$tipTF.stroke = 2;
        this.addChild(this.$tipTF);
        this.$tipTF.x = 50;
        this.$tipTF.y = 76;
        this.$tipTF.size = 20;

        this.$tipTF2 = new egret.TextField();
        this.addChild(this.$tipTF2);
        this.$tipTF2.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$tipTF2.strokeColor = 0x222222;
        this.$tipTF2.stroke = 2;
        this.addChild(this.$tipTF2);
        this.$tipTF2.x = 50;
        this.$tipTF2.y = 756;
        this.$tipTF2.size = 20;
        this.$tipTF2.text = Strings.FIELD_TIP;

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.x = 116;
        bm.texture = RES.getRes("title_bg");

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("nongtian");
        bm.x = 207;
        bm.y = 18;

        var item:FieldItem;
        var pos:any= [{x:22,y:114},{x:265,y:114},{x:22,y:326},{x:265,y:326},{x:22,y:538},{x:265,y:538}];
        for(var i:number=0; i<6; i++){
            item = new FieldItem();
            this.addChild(item);
            item.x = pos[i].x;
            item.y = pos[i].y;
            item.name = i+"";
            this._items.push(item);
        }
        this._timer = new egret.Timer(1000);
    }
}

//农田单元
class FieldItem extends egret.DisplayObjectContainer{
    private $item:egret.Bitmap;
    private $lvUpBtn:egret.Bitmap;
    private $buildBtn:egret.Bitmap;
    private $lvTF:egret.TextField;
    private $gainTF:egret.TextField;
    public gainNum:number = 0;
    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    //格式化
    public format(data:any):void{
        this.$lvTF.text = "Lv."+data.lv;
        if(data.opened){
            //计算时间
            var time:number = (new Date()).getTime();
            var delTime:number = FarmView.TOTAL_TIME - (time - data.startTime)/1000;
            var mNum:number = FarmModel.getGainNum(FarmModel.FIELD, data.lv);
            if(delTime < 0){
                this.$item.texture = RES.getRes("tian2");
                this.$gainTF.text = "";
            }else{
                this.$item.texture = RES.getRes("tian1");
                this.gainNum = FarmModel.getGainNum(FarmModel.FIELD, data.lv)
                this.$gainTF.text = Strings.GAIN_NUM+this.gainNum+Strings.PER_MIN;
            }
            delTime = (time - data.startTime)/60000;
            delTime = parseInt(delTime+"");
            delTime = Math.min(delTime, 720);
            var num:number = parseInt(mNum*delTime+"");
            this.$lvUpBtn.visible = true;
            this.$buildBtn.visible = false;
        }else{
            this.gainNum = 0;
            this.$lvTF.text = "";
            this.$gainTF.text = "";
            this.$item.texture = RES.getRes("tian3");
            this.$lvUpBtn.visible = false;
            this.$buildBtn.visible = true;
        }
    }

    private init():void{
        this.$item = new egret.Bitmap();
        this.addChild(this.$item);
        this.$item.x = 12;
        this.$item.texture = RES.getRes("tian3");

        this.$lvUpBtn = new egret.Bitmap();
        this.addChild(this.$lvUpBtn);
        this.$lvUpBtn.texture = RES.getRes("farm_update2");
        this.$lvUpBtn.x = 50;
        this.$lvUpBtn.y = 146;
        this.$lvUpBtn.name = "lvUpBtn";

        this.$buildBtn = new egret.Bitmap();
        this.addChild(this.$buildBtn);
        this.$buildBtn.texture = RES.getRes("farm_expand");
        this.$buildBtn.x = 50;
        this.$buildBtn.y = 146;
        this.$buildBtn.name = "buildBtn";

        this.$lvUpBtn.touchEnabled = this.$buildBtn.touchEnabled = true;
        this.$lvUpBtn.visible = false;

        this.$lvTF = new egret.TextField();
        this.addChild(this.$lvTF);
        this.$lvTF.x = 144;
        this.$lvTF.y = 42;

        this.$gainTF = new egret.TextField();
        this.addChild(this.$gainTF);
        this.$gainTF.x = 12;
        this.$gainTF.y = 122;
        this.$gainTF.width = 182;
        this.$gainTF.textAlign = egret.HorizontalAlign.CENTER;

        this.$lvTF.fontFamily = this.$gainTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$lvTF.bold = this.$gainTF.bold = true;
        this.$lvTF.textColor = 0xff9900;
        this.$gainTF.textColor = 0xff0000;
        this.$lvTF.size = 20;
        this.$gainTF.size = 18;
        this.$lvTF.strokeColor = this.$gainTF.strokeColor = 0x222222;
        this.$lvTF.stroke = this.$gainTF.stroke = 2;
    }
}