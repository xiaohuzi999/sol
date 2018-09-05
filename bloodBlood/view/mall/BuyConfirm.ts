/**
 *
 * @author
 *
 */
class BuyConfirm extends XModelWindow {

    private _closeBtn:egret.Bitmap;
    private _countTF: egret.TextField;
    private _priceTF:egret.TextField;
    private _addBtn: egret.Bitmap;
    private _reduceBtn: egret.Bitmap;
    private _confirmBtn: egret.Bitmap;

    private static _instance:BuyConfirm;

    public constructor() {
        super();
        this.init();
    }

    public show(center:boolean = true, ...args: any[]):void{
        super.show(true);
        CoolEffect.flowIn(this);
    }

    private _data: any = null;
    public setData(data: Object): void
    {
        this._countTF.text = "1";
        this._data = data;
        this.onChagne();
    }

    public close():void{
        CoolEffect.flowOut(this, 250, super.close, this);
    }

    public initEvent():void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this._countTF.addEventListener(egret.Event.CHANGE, this.onChagne, this);
    }

    public removeEvent():void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this._countTF.removeEventListener(egret.Event.CHANGE, this.onChagne, this);
    }

    private onTouchHandle(event: egret.TouchEvent): void
    {
        var count: number = parseInt(this._countTF.text);
        switch(event.target)
        {
            case this._closeBtn:
                this.close();
                break;
            case this._addBtn:
                count++;
//                count = Math.max(20,count);
                this._countTF.text = count.toString();
                this.onChagne();
                break;
            case this._reduceBtn:
                count--;
                count = Math.max(0,count);
                this._countTF.text = count.toString();
                this.onChagne();
                break;
            case this._confirmBtn:
                var costMoney: number = this._data.itemPrice*count;
                if(User.getInstance().point < costMoney)
                {
                    //XTip.showTip("功绩不足，无法购买！");
                    XAlert.show("功绩不足，无法购买，前往获得功绩？", this.confirmRecharge, null, this);
                    return;
                }
                User.getInstance().point -= costMoney;
                var type:string = "BuyItem:"+this._data.itemCode+"*"+count;
                UserRequest.cosumePoint(costMoney,type,null, null);
                BagModel.addItem(this._data.itemCode,parseInt(this._countTF.text));
                XTip.showTip("恭喜，购买成功！");
                UserModel.save();
                this.close();
                break;
        }
    }

    private confirmRecharge():void{
        MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
    }

    private onChagne(event:egret.Event=null):void{
        if( this._countTF.text ){
            this._priceTF.text = "总计 "+this._data.itemPrice*parseInt(this._countTF.text)+" 功绩";
        }else{
            this._priceTF.text = "总计 0 功绩";
        }
    }

    private init():void{

        var bg: egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("tanchu");
        this.addChild(bg);

        this._closeBtn = new egret.Bitmap();
        this._closeBtn.texture = RES.getRes("guanbi");
        this.addChild(this._closeBtn);
        this._closeBtn.x = 271;
        this._closeBtn.y = 0;
        this._closeBtn.name = "closeBtn";
        this._closeBtn.touchEnabled = true;

        this._addBtn = new egret.Bitmap();
        this._addBtn.texture = RES.getRes("b_jiahao");
        this._addBtn.x = 262;
        this._addBtn.y = 57;
        this.addChild(this._addBtn);
        this._reduceBtn = new egret.Bitmap();
        this._reduceBtn.texture = RES.getRes("jianhao");
        this._reduceBtn.x = 42;
        this._reduceBtn.y = 57;
        this.addChild(this._reduceBtn);
        this._addBtn.touchEnabled = true;
        this._reduceBtn.touchEnabled = true;

        this._confirmBtn = new egret.Bitmap();
        this._confirmBtn.texture = RES.getRes("queding");
        this._confirmBtn.x = 110;
        this._confirmBtn.y = 132;
        this.addChild(this._confirmBtn);
        this._confirmBtn.touchEnabled = true;

        this._countTF = new egret.TextField();
        this._countTF.text = "1";
        this._countTF.size = 28;
        this._countTF.width = 145;
        this._countTF.textAlign = egret.HorizontalAlign.CENTER;
        this._countTF.type = egret.TextFieldType.INPUT;
        this.addChild(this._countTF);
        this._countTF.x = 100;
        this._countTF.y = 62;

        this._priceTF = new egret.TextField();
        this._priceTF.size = 28;
        this._priceTF.width = 300;
        this._priceTF.textAlign = egret.HorizontalAlign.CENTER;
        this._priceTF.fontFamily = Strings.DEFAULT_FONT_NAME
        this.addChild(this._priceTF);
        this._priceTF.x = 20;
        this._priceTF.y = 100;

        this.touchEnabled = false;
    }

    public static getInstance():BuyConfirm{
        if(!BuyConfirm._instance){
            BuyConfirm._instance = new BuyConfirm();
        }
        return BuyConfirm._instance;
    }
}
