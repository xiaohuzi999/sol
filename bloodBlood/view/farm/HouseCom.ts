/**
 * Created by 马达加加加 on 2015/7/14.
 */
/**
 * Created by 马达加加加 on 2015/7/14.
 */
class HouseCom extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    private $tipTF:egret.TextField;
    //
    private _items:HouseItem[] = [];
    private _timer:egret.Timer;
    private _data:any;
    private _currentItem:HouseItem;
    public constructor(){
        super();
        this.init();
    }

    public show(center:boolean=true, ...args: any[]){
        super.show(center);
        this.formatField(args[0]);
        this._timer.start();
        CoolEffect.flowIn(this)
    }

    public close():void{
        CoolEffect.flowOut(this,200,super.close,this,null);
    }

    private formatField(data:any):void{
        this._data = data;
        for(var i:number=0; i<6; i++){
            this._items[i].format(this._data[i]);
        }
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
            var item:HouseItem = event.target.parent;
            this._currentItem = item;
            var info:any = FarmModel.vo.houseInfo;
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
                    var str:string = arr[0]+Strings.BUILDINGS_HOUSE+arr[1]+point+arr[2];
                    XAlert.show(str, this.onExpand, null, this);

                    //FarmModel.expand(FarmModel.HOUSE, this.formatField,this);
                    break;
                case "lvUpBtn":
                    info = info.grids[item.name];
                    var hallLv:number = FarmModel.vo.hallInfo.lv;
                    if(info.lv >= hallLv){
                        XTip.showTip(Strings.BUILDING_LV_ERR);
                        return;
                    }
                    var materialInfo:any=FarmModel.getMaterial(FarmModel.HOUSE,info.lv);
                    var arr:string[] = Strings.BUILDING_UP_STR.split("$");
                    var str:string = arr[0]+Strings.BUILDINGS_HOUSE+arr[1]+materialInfo.money+arr[2]+materialInfo.wood+arr[3];
                    str += "效果：人口增长"+FarmModel.getGainNum(FarmModel.HOUSE, (info.lv+1))+"分钟/10人";
                    XAlert.show(str, this.confirmUp,null,this,true,false);
                    break;
            }
        }
    }

    private onExpand():void{
        FarmModel.expand(FarmModel.HOUSE, this.formatField,this);
    }

    private confirmUp():void{
        if(FarmModel.upBuilding(FarmModel.HOUSE,parseInt(this._currentItem.name))){
            this.formatField(this._data);
            XTip.showTip(Strings.LV_UP_SUC);
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

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.x = 116;
        bm.texture = RES.getRes("title_bg");

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("minju");
        bm.x = 207;
        bm.y = 18;

        this.$tipTF = new egret.TextField();
        this.addChild(this.$tipTF);
        this.$tipTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$tipTF.strokeColor = 0x222222;
        this.$tipTF.stroke = 2;
        this.addChild(this.$tipTF);
        this.$tipTF.x = 50;
        this.$tipTF.y = 756;
        this.$tipTF.size = 20;
        this.$tipTF.text = Strings.HOUSE_TIP;

        var item:HouseItem;
        var pos:any= [{x:22,y:83},{x:265,y:83},{x:22,y:310},{x:265,y:310},{x:22,y:538},{x:265,y:538}];
        for(var i:number=0; i<6; i++){
            item = new HouseItem();
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
class HouseItem extends egret.DisplayObjectContainer{
    private $item:egret.Bitmap;
    private $lvUpBtn:egret.Bitmap;
    private $buildBtn:egret.Bitmap;
    private $lvTF:egret.TextField;
    private $lvUpTimeTF:egret.TextField;
    private $gainTF:egret.TextField;
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
            this.$buildBtn.visible = false;
            var upTime:number = FarmModel.getUpTime(FarmModel.FIELD,data.lv);
            var delTime:number = upTime - (time - data.upTime)/1000;
            if(delTime >0){
                this.$item.texture = RES.getRes("farm_h0");
            }else{
                this.$item.texture = RES.getRes("farm_h1");
            }
            this.$lvUpBtn.visible = true;
            var val:number = FarmModel.getGainNum(FarmModel.HOUSE, data.lv);
            this.$gainTF.text = val+Strings.PERSON_PER_MN;
        }else{
            this.$lvTF.text = "";
            this.$gainTF.text = "";
            this.$item.texture = RES.getRes("farm_h2");
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

        this.$lvUpTimeTF = new egret.TextField();
        this.addChild(this.$lvUpTimeTF);
        this.$lvUpTimeTF.x = 12;
        this.$lvUpTimeTF.y = 122;
        this.$lvUpTimeTF.width = 182;
        this.$lvUpTimeTF.textAlign = egret.HorizontalAlign.CENTER;

        this.$gainTF = new egret.TextField();
        this.addChild(this.$gainTF);
        this.$gainTF.x = 12;
        this.$gainTF.y = 122;
        this.$gainTF.width = 182;
        this.$gainTF.textAlign = egret.HorizontalAlign.CENTER;

        this.$lvTF.fontFamily = this.$lvUpTimeTF.fontFamily = this.$gainTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$lvTF.bold = this.$lvUpTimeTF.bold = this.$gainTF.bold = true;
        this.$lvTF.textColor = 0xff9900;
        this.$lvUpTimeTF.textColor = this.$gainTF.textColor = 0xff0000;
        this.$lvTF.size = 20;
        this.$lvUpTimeTF.size = this.$gainTF.size = 18;
        this.$lvTF.strokeColor = this.$lvUpTimeTF.strokeColor = this.$gainTF.strokeColor = 0x222222;
        this.$lvTF.stroke = this.$lvUpTimeTF.stroke = this.$gainTF.stroke = 2;
    }
}