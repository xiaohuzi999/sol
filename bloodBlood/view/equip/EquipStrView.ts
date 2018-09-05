/**
 * Created by 马达加加加 on 2015/6/9.
 */
class EquipStrView extends XModelWindow{
    //单例
    private static _instance:EquipStrView;
    private $icon:egret.Bitmap;
    private $nameTF:egret.TextField;
    private $proTF:egret.TextField;
    private $xProTF:egret.TextField;
    private $moneyTF:egret.TextField;
    private _mertialItems:EquipStrItem[];
    private $closeBtn:egret.Bitmap;
    private $strBtn:egret.Bitmap;
    private _item:ItemVo;
    private _data:any;
    private _canStr:boolean;
    public constructor(){
        super();
        this.init();
    }

    public show(center:boolean=true, ...args: any[]):void{
        if(args[0].itemStrLv == 15){
            XTip.showTip("该物品已强化至顶级");
            return;
        }
        this.formatItem(args[0]);
        super.show(center);
        CoolEffect.flowIn(this);
    }

    private formatItem(item:ItemVo):void{
        this._item = item;
        if(this._item.itemStrLv == 15){
            XTip.showTip("该物品已强化至顶级");
            this._canStr = false;
            return;
        }
        RES.getResByUrl(AppConfig.imgURL+ItemData.PRE_URL + item.imageId + "_b.png", this.onGetIcon, this);
        this.$icon.scaleX = this.$icon.scaleY = .6;
        this.$nameTF.textFlow = (new egret.HtmlTextParser()).parser(this._item.itemName+"\t<font color='#009900'>+"+(this._item.itemStrLv+1)+"</font>");
        this.$proTF.text = this._item.itemProperty;
        var newPro:any = XUtils.addObject(this._item.itemProperty, this._item.itemXProperty);
        var str:string = "";
        for(var i in newPro){
            if(!str){
                str = ItemVo.parseKey(i)+"："+newPro[i] + "\t<font color='#009900'>+"+(newPro[i]*0.1).toFixed(1)+"</font>";
            }else{
                str +="\n"+ItemVo.parseKey(i)+"："+newPro[i]+ "\t<font color='#009900'>+"+(newPro[i]*0.1).toFixed(1)+"</font>";
            }
        }
        this.$proTF.textFlow = (new egret.HtmlTextParser()).parser(str)

        this._data = EquipStrModel.getStrMertial(this._item.itemStrLv);
        //附加其他属性，特殊处理
        newPro = XUtils.diffObject(this._item.itemXProperty, this._item.itemProperty)
        str = "";
        for(var i in newPro){
            if(!str){
                str = ItemVo.parseKey(i)+"："+newPro[i];
            }else{
                str +="\n"+ItemVo.parseKey(i)+"："+newPro[i];
            }
        }
        //强化扩展属性=====================================
        if(this._data.exPro){
            for(var i in this._data.exPro){
                if(!str){
                    str = "<font color='#009900'>"+ItemVo.parseKey(i)+"："+this._data.exPro[i]+"</font>";
                }else{
                    str +="\n<font color='#009900'>"+ItemVo.parseKey(i)+"："+this._data.exPro[i]+"</font>";
                }
            }
        }
        this.$xProTF.textFlow = (new egret.HtmlTextParser()).parser(str);
        this.$moneyTF.text = "金币："+this._data.money;
        var list:any[] = this._data.material;
        //格式化材料
        this._canStr = true;
        if(list.length == 1){
            this._mertialItems[0].format(null);
            this._mertialItems[1].format(list[0]);
            this._mertialItems[2].format(null);
            this._canStr = this._mertialItems[1].canStr;
        }else{
            for(var j:number=0; j<3; j++){
                this._mertialItems[j].format(list[j])
                this._canStr = this._canStr && this._mertialItems[j].canStr;
            }
        }
        if(this._canStr){
            this.$strBtn.texture = RES.getRes("qianghuaanniu");
        }else{
            this.$strBtn.texture = RES.getRes("qianghuaanniuhui");
        }
    }

    private onGetIcon(tx:any):void{
        this.$icon.texture = tx;
    }

    public close():void{
        CoolEffect.flowOut(this, 300, super.close, this);
    }

    private onTouch(event:egret.TouchEvent):void{
        switch(event.currentTarget){
            case this.$closeBtn:
                this.close();
                break;
            case this.$strBtn:
                if(this._canStr){
                    EquipStrModel.str(this._item);
                }
                break;
        }
    }

    private onStr(event:egret.Event):void
    {
        this.formatItem(this._item);
        BagModel.save();
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("qianghuadi");

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = 51;
        this.$icon.y = 37;
        //this.$icon.texture = RES.getRes("qianghuadao");

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.x = 240;
        this.$nameTF.y = 34;

        this.$proTF = new egret.TextField();
        this.addChild(this.$proTF);
        this.$proTF.x = 240;
        this.$proTF.y = 76;

        this.$xProTF = new egret.TextField();
        this.addChild(this.$xProTF);
        this.$xProTF.x  = 240;
        this.$xProTF.y = 180;
        this.$proTF.size = this.$xProTF.size = 24;

        this._mertialItems = new Array();
        var item:EquipStrItem = new EquipStrItem();
        this.addChild(item);
        item.x = 91;
        item.y = 278;
        this._mertialItems.push(item);
        item = new EquipStrItem();
        this.addChild(item);
        item.x = 212;
        item.y = 278;
        this._mertialItems.push(item);
        item = new EquipStrItem();
        this.addChild(item);
        item.x = 333;
        item.y = 278;
        this._mertialItems.push(item);

        this.$moneyTF = new egret.TextField();
        this.addChild(this.$moneyTF)
        this.$moneyTF.x = 141;
        this.$moneyTF.y = 362;
        this.$moneyTF.width = 242;
        this.$moneyTF.textColor = 0xff9900;
        this.$moneyTF.textAlign = egret.HorizontalAlign.CENTER;
        this.$nameTF.fontFamily = this.$proTF.fontFamily = this.$xProTF.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$closeBtn = new egret.Bitmap();
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 450;
        this.$closeBtn.y = 2;
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.$closeBtn.touchEnabled = true;

        this.$strBtn = new egret.Bitmap();
        this.addChild(this.$strBtn);
        this.$strBtn.texture = RES.getRes("qianghuaanniu");
        this.$strBtn.x = 192;
        this.$strBtn.y = 398;
        this.$strBtn.touchEnabled = true;
    }

    public initEvent():void{
        this.$closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch,this);
        this.$strBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch,this)
        MainDispatcher.getInstance().addEventListener(EquipStrModel.STR_SUCCESS, this.onStr, this);
        MainDispatcher.getInstance().addEventListener(EquipStrModel.STR_FAIL, this.onStr, this);
    }

    public removeEvent():void{
        this.$closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch,this);
        this.$strBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch,this)
        MainDispatcher.getInstance().removeEventListener(EquipStrModel.STR_SUCCESS, this.onStr, this);
        MainDispatcher.getInstance().removeEventListener(EquipStrModel.STR_FAIL, this.onStr, this);
    }

    //
    public static getInstance():EquipStrView{
        if(!EquipStrView._instance){
            EquipStrView._instance = new EquipStrView();
        }
        return EquipStrView._instance;
    }
}

class EquipStrItem extends egret.DisplayObjectContainer{
    private $icon:egret.Bitmap;
    private $numTF:egret.TextField;
    public canStr:boolean;
    public constructor(){
        super();
        this.init();
    }

    /***/
    public format(data:any):void{
        if(data){
            this.visible = true;
            for(var i in data){
                var vo:ItemVo = ItemData.getItemData(parseInt(i));
                this.$icon.texture = RES.getRes(vo.imageId);
                var itemNum:number = BagModel.getItemNum(parseInt(i));
                if(itemNum < data[i]){
                    this.$numTF.textColor = 0xff0000;
                    this.canStr = false;
                }else{
                    this.$numTF.textColor = 0xffffff;
                    this.canStr = true;
                }
                this.$numTF.text =itemNum+"/"+ data[i];
                TipsManager.registerTips(this, vo.itemName + "\n" + vo.itemDesc);
                break;
            }
        }else{
            this.canStr = true;
            this.visible = false;
        }
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("renwukuang");

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = -4;
        this.$icon.y = -4;

        this.$numTF = new egret.TextField();
        this.addChild(this.$numTF);
        this.$numTF.y = 52;
        this.$numTF.width = 80;
        this.$numTF.size = 22;
        this.$numTF.textAlign = egret.HorizontalAlign.RIGHT;
        this.$numTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        
        this.touchEnabled = true;
    }
}