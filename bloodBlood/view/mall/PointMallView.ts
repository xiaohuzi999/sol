/**
 *
 * @author 
 *
 */
class PointMallView extends XModelWindow {
    
    private _closeBtn:egret.Bitmap;
    private _ownContainer: egret.Sprite;
    private _title: egret.Bitmap;
    private _ownTF: egret.TextField;
    private _pointIcon: egret.Bitmap;
    private _itemList:egret.gui.List;
    private _listData: egret.gui.ArrayCollection;
    private _listContainer: egret.Sprite;
    public static IsdoubleCharge1:boolean = true;
    public static IsdoubleCharge2:boolean = true;
    public static IsdoubleCharge3:boolean = true;
    public static IsdoubleCharge4:boolean = true;
    public static IsdoubleCharge5:boolean = true;
    
    private static _instance:PointMallView;
    
	public constructor() {
        super();
        this.init();
	}
    
    public show(center:boolean = true, ...args: any[]):void{
        super.show(true);
        CoolEffect.flowIn(this);
        
        this._ownTF.text = "您拥有：" + User.getInstance().point.toString();
        this._pointIcon.x = this._ownTF.x + this._ownTF.width + 10;
        this._ownContainer.x = (this.width - this._ownContainer.width) >> 1;   
    }
        
    public close():void{
        CoolEffect.flowOut(this,250, super.close, this);
    }
    
    private init():void{
        
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("daojudi");
        this.addChild(bm);
        bm.height = 766;
        bm.y = 30;
                
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("pointMall_json.gongjishangdian");
        this.addChild(bm);
        bm.x = (this.width - bm.width) >> 1;
//        bm.y = -3;
                
        this._closeBtn = new egret.Bitmap();
        this._closeBtn.texture = RES.getRes("guanbi");
        this.addChild(this._closeBtn);
        this._closeBtn.x = 450;
        this._closeBtn.y = 32;
        this._closeBtn.name = "closeBtn";
        this._closeBtn.touchEnabled = true;
        
        this._ownContainer = new egret.Sprite();
//        this._ownContainer.x = 164;
        this._ownContainer.y = 81;
        this.addChild(this._ownContainer);
        
        this._ownTF = new egret.TextField();
        this._ownTF.text = "您拥有：0";
        this._ownTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this._ownTF.size = 26;
        this._ownTF.y = 8;
        this._ownTF.textColor = 0xf3c786;
        this._ownContainer.addChild(this._ownTF);
        this._ownTF.textAlign = egret.HorizontalAlign.LEFT;
        
        this._pointIcon = new egret.Bitmap();
        this._pointIcon.texture = RES.getRes("pointMall_json.gongji");
        this._pointIcon.x = this._ownTF.x + this._ownTF.width + 10;
//        this._pointIcon.y = 9;
        this._ownContainer.addChild(this._pointIcon);
        this._ownContainer.x = (this.width - this._ownContainer.width) >> 1;
        
        this._title = new egret.Bitmap();
        this._title.texture = RES.getRes("pointMall_json.zi");
        this._title.x = 90;
        this._title.y = 143;
        this.addChild(this._title);
           
        /*this._listData = new egret.gui.ArrayCollection(MallModel.POINT_CONFIG);
        this._itemList = new egret.gui.List();
        this._itemList.percentWidth = 100;
        this._itemList.percentHeight = 100;
        this.addChild(this._itemList);
        this._itemList.x = 14;
        this._itemList.y = 169;
        this._itemList.height = 650;
        this._itemList.itemRenderer = new egret.gui.ClassFactory(PointMallItemRenderer);
        this._itemList.dataProvider = this._listData;*/
        
        this._listContainer = new egret.Sprite();
        this.addChild(this._listContainer);
        this._listContainer.x = 14;
        this._listContainer.y = 169;
        this.touchEnabled = false;
        this.renderItems();
    }
    
    private renderItems(): void
    { 
        var pointMallItem: PointMallItem;
        var gap: number = 8;
        var lastY: number = 0;
        for(var index in MallModel.POINT_CONFIG)
            { 
            pointMallItem = new PointMallItem();
            pointMallItem.format(MallModel.POINT_CONFIG[index]);
            pointMallItem.y = lastY;
            this._listContainer.addChild(pointMallItem);
                        
            lastY += pointMallItem.getHeight()+gap;
        }
    }
    
    public initEvent():void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }

    //
    private _selectedInfo:any;
    private onTouchHandle(event: egret.TouchEvent): void
    { 
        if(event.target == this._closeBtn)
            this.close();
        else {
                        
            if(event.target.name == "buyButton")
            { 
                var index:number = event.target.parent.index;
                var info:any;
                for(var i in MallModel.POINT_CONFIG){
                    if(MallModel.POINT_CONFIG[i].index == index){
                        info = MallModel.POINT_CONFIG[i];
                        break;
                    }
                }
                if(info){//调用充值--
                    this._selectedInfo = info;
                    this.rechare(info.cost);
                }
            }
        }
    }

    //充值===
    private rechare(money:number):void{
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //loader.addEventListener(egret.Event.COMPLETE,onGetComplete,this);
        var url:string = "http://xs.qidian.com/html/user_paygame.shtml?gameid=200102&serverid="+AppConfig.serverId+"&orderid=";
        if(AppConfig.plant == "qq"){
            url = "http://game.book.qq.com/html/user_paygame.shtml?gameid=600127&serverid="+AppConfig.serverId+"&orderid="
        }
        url += GUID.create();
        var request:egret.URLRequest = new egret.URLRequest(url);
        top.location.href = url;
        request.method = egret.URLRequestMethod.GET;
        //loader.load(request);

        function onGetComplete(event:egret.Event):void {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            loader.removeEventListener(egret.Event.COMPLETE,onGetComplete,this);
            var data:egret.URLVariables = loader.data;
            data = JSON.parse(data+"");
            this.onRechange(data);
        }
    }

    private onRechange(data:any):void{
        if(data.ReturnCode == 0){//充值问题
            var info:any = this._selectedInfo;
            User.getInstance().point += info.point;
            UserRequest.getBonus(info.point,null, null);
            if(info.reward > 0 && !User.getInstance()["rechargeGift_"+info.index]){
                User.getInstance()["rechargeGift_"+info.index] = true;
                User.getInstance().point += info.reward;
                UserRequest.getBonus(info.reward,null, null);
            }
            UserModel.save(true);
            XTip.showTip(data.ReturnMessage);
        }else{
            XTip.showTip(data.ReturnMessage);
        }
    }
        
    public removeEvent():void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }
    
    public static getInstance(): PointMallView {
        if(!PointMallView._instance) {
            PointMallView._instance = new PointMallView();
        }
        return PointMallView._instance;
    }
}

class PointMallItem extends egret.Sprite{
        
    private _rewardIcon: egret.Bitmap;
    private _bg: egret.Bitmap;
    private _buyButton: egret.Bitmap;
    public index:number;
        
    public constructor(){
        super();
        this.init();
    }
    
    public getHeight(): number
    {
        return this._bg.height;
    }
    
    public format(data: { index: number;point: number;}):void{
                
        var index: number = data.index;
        var point: number = data.point;
        this.index = data.index;
        
        this._rewardIcon.visible = PointMallView["IsdoubleCharge"+index];
        this._bg.texture = RES.getRes("pointMall_json."+point+"a");
        this._buyButton.texture = RES.getRes("pointMall_json."+point+"b");
    }
        
    private init():void{
                
        this._rewardIcon = new egret.Bitmap();
        this._rewardIcon.texture = RES.getRes("pointMall_json.shuangbei");
        this._rewardIcon.visible = false;
        
        this._bg = new egret.Bitmap();
        this._bg.texture = null;
        this._bg.x = 20;
        this._bg.y = 30;
        this.addChild(this._bg);
        this.addChild(this._rewardIcon);
        
        this._buyButton = new egret.Bitmap();
        this._buyButton.touchEnabled = true;
        this._buyButton.x = 306;
        this._buyButton.y = 40;
        this._buyButton.name = "buyButton";
        this.addChild(this._buyButton);
        this._buyButton.touchEnabled = true;
    }
}

class PointMallItemRenderer extends egret.gui.ItemRenderer {
    public constructor(){
        super();
        this.skinName = PointMallItem;
        this.touchChildren = true;
    }
    public dataChanged():void{
        <PointMallItem>this.skin.format(this.data);
    }
}
