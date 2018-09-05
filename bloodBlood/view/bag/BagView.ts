/**
 * Created by 马达加加加 on 2015/5/29.
 */
class BagView extends XModelWindow{
    private $closeBtn:egret.Bitmap;
    //
    private _itemList:egret.gui.List;
    //数据层
    private _myCollection: egret.gui.ArrayCollection;
    /**单例*/
    private static _instance:BagView;
    public constructor(){
        super();
        this.init();
    }

    /**需要优化*/
    private initBag(items:any):void{
        var list:ItemVo[] = items;
        var sourceArr:any[] = [];
        for (var i:number = 0; i < list.length; i++) {
            sourceArr.push({name:i,data:list[i]});
        }
        this._myCollection = new egret.gui.ArrayCollection(sourceArr);
        this._itemList.dataProvider = this._myCollection;
    }

    private sellItem(vo:ItemVo):void{
        if(vo.masterId){
            XTip.showTip("该物品已装备");
        }else{
            User.getInstance().money += <number>vo.sellPrice*vo.itemNum;
            BagModel.delItem(vo.itemId);
            //删除背包中索引---
            this._myCollection.removeItemAt(this._itemList.selectedIndex);
            this._myCollection.replaceAll(this._myCollection.source);
            //this._myCollection.refresh();
            BagModel.save();
            UserModel.save();
        }
    }

    public show(center:boolean=true, ...args: any[]):void{
        super.show(true);
        CoolEffect.flowIn(this);
        BagModel.getInfo(this.initBag, this)
    }

    public close():void{
        CoolEffect.flowOut(this,250, super.close, this);
        MainDispatcher.getInstance().dispatchEventWith(BottomCom.CLOSE_POPWIN)
    }

    private onTouch(event:egret.TouchEvent):void{
        if(event.target){
            switch(event.target.name){
                case "closeBtn":
                    this.close();
                    break;
                case "useBtn":
                    BagModel.useItem(this._itemList.selectedItem.data, this.onDelItem, this);
                    break;
                case "sellBtn":
                    var vo:ItemVo = this._itemList.selectedItem.data;
                    var money:number = <number>vo.sellPrice*vo.itemNum
                    XAlert.show("出售"+vo.itemName+"可以获得"+money+Strings.MONEY+"，确定出售？",this.sellConfirm,null,this);
                    break;
            }
        }
    }

    private onDelItem():void{
        var vo:ItemVo = this._itemList.selectedItem.data;
        BagModel.delItem(vo.itemId);
        //删除背包中索引---
        this._myCollection.removeItemAt(this._itemList.selectedIndex);
        this._myCollection.replaceAll(this._myCollection.source);
        //this._myCollection.refresh();
    }
    
    private sellConfirm(): void
    {
        this.sellItem(this._itemList.selectedItem.data);
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("daojudi");
        bm.height = 766;
        this.addChild(bm);
        bm.y = 28;
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("daojubiaoti");
        this.addChild(bm);
        bm.x = 147;
        bm.y = -3;
        this.$closeBtn = new egret.Bitmap();
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 450;
        this.$closeBtn.y = 30;
        this.$closeBtn.name = "closeBtn";
        this.$closeBtn.touchEnabled = true;
        this._itemList = new egret.gui.List();
        //this._itemList.dataProvider = myCollection;
        this._itemList.percentWidth = 100;
        this._itemList.percentHeight = 100;
        this.addChild(this._itemList);
        this._itemList.x = 20;
        this._itemList.y = 90;
        this._itemList.height = 650;
        this._itemList.itemRenderer = new egret.gui.ClassFactory(BagItemRenderer);
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch,this);
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch,this);
    }

    /**获取单例*/
    public static getInstance():BagView{
        if(!BagView._instance){
            BagView._instance = new BagView();
        }
        return BagView._instance;
    }
}

/**背包道具*/
class BagItem extends egret.DisplayObjectContainer{
    private $icon:egret.Bitmap;
    private $nameTF:egret.TextField;
    private $infoTF:egret.TextField;
    private $useBtn:egret.Bitmap;
    private $sellBtn:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    /***/
    public format(vo:ItemVo):void{
        this.$nameTF.text = vo.itemName+"";
        if(vo.itemType == ItemType.MEDICINE || vo.itemCode == 2 || vo.itemCode == 3 || vo.itemCode == 4){
            this.$useBtn.visible = false;
            this.$nameTF.width = this.$infoTF.width = 264;
        }else{
            this.$useBtn.visible = true;
            this.$nameTF.width = this.$infoTF.width = 152;
        }
        if(vo.itemType == ItemType.EQUIP){
            if(vo.itemStrLv){
                this.$nameTF.text += ("\t+"+vo.itemStrLv)
            }
            this.$infoTF.text = ItemVo.parse(XUtils.addObject(vo.itemProperty,vo.itemXProperty))
        }else{
            this.$nameTF.text += ("\t×"+vo.itemNum)
            this.$infoTF.text = vo.itemDesc+"";
        }
        this.$icon.texture = RES.getRes(vo.imageId);
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("daojutiao");
        bm.width = 480;
        this.addChild(bm);

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = 0;
        this.$icon.y = 0;
        this.$icon.texture = RES.getRes("zhuangbei");

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.x = 83;
        this.$nameTF.y = 10;
        this.$nameTF.size = 22;

        this.$infoTF = new egret.TextField();
        this.addChild(this.$infoTF);
        this.$infoTF.x = 83;
        this.$infoTF.y = 38;
        this.$infoTF.size = 18;
        this.$infoTF.width = 152;
        this.$infoTF.textColor = 0xff9900;
        this.$nameTF.fontFamily = this.$infoTF.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$useBtn = new egret.Bitmap();
        this.addChild(this.$useBtn);
        this.$useBtn.texture = RES.getRes("shiyong");
        this.$useBtn.x = 238;
        this.$useBtn.y = 20;
        this.$useBtn.name = "useBtn";

        this.$sellBtn = new egret.Bitmap();
        this.addChild(this.$sellBtn);
        this.$sellBtn.x = 354;
        this.$sellBtn.y = 21;
        this.$sellBtn.texture = RES.getRes("chushou");
        this.$sellBtn.name = "sellBtn";
        this.$useBtn.touchEnabled = this.$sellBtn.touchEnabled = true;
    }
}

class BagItemRenderer extends egret.gui.ItemRenderer {
    public constructor(){
        super();
        this.skinName = BagItem;
        this.touchChildren = true;
    }
    public dataChanged():void{
        <BagItem>this.skin.format(this.data.data);
    }
}
