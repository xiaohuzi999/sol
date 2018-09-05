/**
 * 商城界面
 * @author 
 *
 */
class MallView extends XModelWindow{
    
    private _closeBtn:egret.Bitmap;
    private _itemList:egret.gui.List;
    private _listData: egret.gui.ArrayCollection;
    private static _instance:MallView;
    
	public constructor() {
        super();
        this.init();
	}
    
    public show(center:boolean = true, ...args: any[]):void{
        super.show(true);
        CoolEffect.flowIn(this);
    }
    
    public close():void{
        CoolEffect.flowOut(this,250, super.close, this);
        MainDispatcher.getInstance().dispatchEventWith(BottomCom.CLOSE_POPWIN)
    }
    
    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("daojudi");
        this.addChild(bm);
        bm.height = 766;
        bm.y = 28;
        
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("shangdianbiaoti");
        this.addChild(bm);
        bm.x = (517 - 246) >> 1;
        bm.y = -3;
        
        this._closeBtn = new egret.Bitmap();
        this._closeBtn.texture = RES.getRes("guanbi");
        this.addChild(this._closeBtn);
        this._closeBtn.x = 450;
        this._closeBtn.y = 30;
        this._closeBtn.name = "closeBtn";
        this._closeBtn.touchEnabled = true;
        
        this._listData = new egret.gui.ArrayCollection();
        this._itemList = new egret.gui.List();
        this._itemList.percentWidth = 100;
        this._itemList.percentHeight = 100;
        this.addChild(this._itemList);
        this._itemList.x = 20;
        this._itemList.y = 90;
        this._itemList.height = 650;
        this._itemList.itemRenderer = new egret.gui.ClassFactory(MallItemRenderer);
        this._itemList.dataProvider = this._listData;
        
        this.touchEnabled = false;
        
        MallModel.getItemsForMall(this.renderItems,this);
    }
    
    private renderItems(): void
    { 
        this._listData.source = MallModel.itemsForMall;
    }
    
    public initEvent():void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }
    
    public removeEvent():void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }
    
    private onTouchHandle(event: egret.TouchEvent): void
    { 
        if(event.target == this._closeBtn)
            this.close();
        else {
            
            //购买
            if(event.target.name == "buyButton")
            { 
                var itemVo: ItemVo = this._itemList.selectedItem;
                MainDispatcher.getInstance().dispatchEventWith(BottomCom.SHOW_BUYCONFIRM, false, itemVo);
            }
        }
    }
    
    public static getInstance():MallView{
        if(!MallView._instance){
                MallView._instance = new MallView();
        }
        return MallView._instance;
    }
}

class MallItem extends egret.Sprite{
    
    private $icon:egret.Bitmap;
    private $nameTF:egret.TextField;
    private $infoTF:egret.TextField;
    
    private $priceTF: egret.TextField;
    private $moneyIcon: egret.Bitmap;
    private $buyButton: egret.Sprite;
    
    public constructor(){
        super();
        this.init();
    }
    
    public format(vo:ItemVo):void{
        
        this.$nameTF.text = vo.itemName;
        this.$infoTF.text = vo.itemDesc;
        this.$icon.texture = RES.getRes(vo.imageId);
        this.$priceTF.text = vo.itemPrice.toString();
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
        this.$icon.y = 2;
        
        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.x = 85;
        this.$nameTF.y = 14;
        this.$nameTF.size = 22;
        
        this.$infoTF = new egret.TextField();
        this.addChild(this.$infoTF);
        this.$infoTF.x = 85;
        this.$infoTF.y = 40;
        this.$infoTF.size = 18;
        this.$infoTF.width = 152;
        this.$infoTF.textColor = 0xff9900;
        this.$nameTF.fontFamily = this.$infoTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        
        var buttonBg: egret.Bitmap = new egret.Bitmap();
        buttonBg.texture = RES.getRes("goumai");
        this.$buyButton = new egret.Sprite();
        this.addChild(this.$buyButton);
        
        this.$buyButton.addChild(buttonBg);
        this.$priceTF = new egret.TextField();
        this.$priceTF.text = "0";
        this.$priceTF.x = 62;
        this.$priceTF.y = 14;
        this.$priceTF.textColor = 0xf3c786;
        this.$priceTF.strokeColor = 0x000000;
        this.$priceTF.stroke = 2;
        this.$priceTF.size = 22;
        this.$buyButton.addChild(this.$priceTF);
        this.$moneyIcon = new egret.Bitmap();
        this.$moneyIcon.texture = RES.getRes("gongji");
        this.$moneyIcon.x = 28;
        this.$moneyIcon.y = 2;
        this.$buyButton.addChild(this.$moneyIcon);
        this.$buyButton.name = "buyButton";
        this.$buyButton.touchEnabled = true;
        this.$buyButton.x = 330;
        this.$buyButton.y = (this.height - this.$buyButton.height) >> 1;
    }
}

class MallItemRenderer extends egret.gui.ItemRenderer {
    public constructor(){
        super();
        this.skinName = MallItem;
        this.touchChildren = true;
    }
    public dataChanged():void{
        <MallItem>this.skin.format(this.data);
    }
}
