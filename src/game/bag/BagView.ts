/*
* name;
*/
class BagView extends xframe.XWindow{
    protected _view:ui.bag.BagViewUI;
    private _group:xframe.XGroup;
    private _vo:BagVo;
    private readonly types:number[] = [0, ItemVo.WEAPON, ItemVo.CLOTH, ItemVo.SHOES, ItemVo.JEWEL, ItemVo.ITEM];
    constructor(){
        super();
    }

    public show():void{
        super.show();
        
        BagReq.getBagInfo(Handler.create(this, this.initBag));
        xframe.XFacade.instance.closeModule(MainTopView);
    }

    private initBag(vo:BagVo):void{
        this._vo = vo;
        trace(this._vo);
        this.onChange();
    }

    private onItemSelect(index:number):void{
        var item:ItemVo = this._view.itemList.getItem(index);
        if(item){
            //this._view.pic.skin = "res/item/"+item.icon+".png";
            //this._view.tfName.text = item.name+"";
        }
    }

    private onChange():void{
        let type:number = this.types[this._group.selectedIndex];
        if(type != 0){
            this._view.itemList.array = this._vo.getItemByType(type);
        }else{
            this._view.itemList.array = this._vo.getItemByType();
        }
        this._view.itemList.selectedIndex = 0;
        this.onItemSelect(this._view.itemList.selectedIndex);
    }

    private onC(e:Laya.Event):void{
        switch(e.target){
            
        }
    }

    protected createUI():void{
        this._view = new ui.bag.BagViewUI();
        this.addChild(this._view);
        this._view.itemList.vScrollBarSkin = "";
        this._view.itemList.selectEnable = true;

        var btns:any[] = [];
        btns.push(this._view.btnAll, this._view.btnWeapon, this._view.btnCloth, this._view.btnShoe, this._view.btnJewel, this._view.btnItem)
        this._group = new xframe.XGroup(btns);
        this._group.selectedIndex = 0;
    }

    protected initEvent():void{
        this._view.itemList.selectHandler = Handler.create(this, this.onItemSelect, null, false);
        this._group.on(Laya.Event.CHANGE, this, this.onChange);
        this._view.on(Laya.Event.CLICK, this, this.onC);
    }

    protected removeEvent():void{
        this._view.itemList.selectHandler.recover();
        this._view.itemList.selectHandler = null;
        this._group.off(Laya.Event.CHANGE, this, this.onChange);
        this._view.off(Laya.Event.CLICK, this, this.onC);
    }
}