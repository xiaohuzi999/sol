/*
* name;
*/
class BagView extends xframe.XWindow{
    protected _view:ui.bag.BagViewUI;
    constructor(){
        super();
    }

    public show():void{
        super.show();
        
        BagReq.getBagInfo(Handler.create(this, this.initBag));
    }

    private initBag(vo:BagVo):void{
        this._view.itemList.array = vo.itemsList;
        this._view.itemList.selectedIndex = 1;
    }

    private onItemClick(e:Laya.Event,index:number):void{
        if(e.type == Laya.Event.CLICK){
            var item:ItemVo = this._view.itemList.getItem(index);
            this._view.pic.skin = "res/item/"+item.icon+".png";
            this._view.tfName.text = item.name+"";
        }
    }

    protected createUI():void{
        this._view = new ui.bag.BagViewUI();
        this.addChild(this._view);
    }

    protected addEventListener():void{
        this._view.itemList.mouseHandler = Handler.create(this, this.onItemClick, null, false);
    }

    protected removeEventListener():void{
        this._view.itemList.mouseHandler.recover();
        this._view.itemList.mouseHandler = null;
    }
}