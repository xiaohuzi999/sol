/*
* name;
*/
class BagView extends xframe.XWindow{
    protected _view:ui.bag.BagViewUI;
    private _group:xframe.XGroup;
    private _vo:BagVo;
    constructor(){
        super();
    }

    public show():void{
        super.show();
        
        BagReq.getBagInfo(Handler.create(this, this.initBag));
    }

    private initBag(vo:BagVo):void{
        this._vo = vo;
        this.onChange();
    }

    private onItemSelect(index:number):void{
        var item:ItemVo = this._view.itemList.getItem(index);
        if(item){
            this._view.pic.skin = "res/item/"+item.icon+".png";
            this._view.tfName.text = item.name+"";
        }
        this.formatPro();
    }

    private onRendPro(cell:any,index:number):void{
        var data:{label:string, value:number} = this._view.proList.getItem(index);
        cell.getChildByName("lb").text = data.label + "\t+"+data.value;
    }

    private onChange():void{
        if(this._group.selectedIndex == 0 ){
            this._view.itemList.array = this._vo.getItemByType(ItemVo.ITEM);
        }else if(this._group.selectedIndex == 1){
            this._view.itemList.array = this._vo.getItemByType(ItemVo.EQUIP);
        }
        this._view.itemList.selectedIndex = 0;
        this.onItemSelect(this._view.itemList.selectedIndex);
    }

    private formatPro():void{
        var item:ItemVo = this._view.itemList.selectedItem;
        
        if(item.property){
            this._view.proList.visible = true;
            this._view.proList.array = getProList(item.property);
        }else{
            this._view.proList.visible = false;
        }

        function getProList(pro:any):any[]{
            let proList:any[] = [];
            for(let i in pro){
                proList.push({label:i, value:pro[i]});
            }
            return proList;
        } 
    }

    private onC(e:Laya.Event):void{
        switch(e.target){
            case this._view.btnUse:
            xframe.XFacade.instance.showModule(BagEquipView);
            break; 
        }
    }

    protected createUI():void{
        this._view = new ui.bag.BagViewUI();
        this.addChild(this._view);
        this._view.itemList.hScrollBarSkin = "";
        this._view.itemList.selectEnable = true;

        this._group = new xframe.XGroup([this._view.btnItem, this._view.btnEquip]);
        this._group.selectedIndex = 0;
    }

    protected initEvent():void{
        this._view.itemList.selectHandler = Handler.create(this, this.onItemSelect, null, false);
        this._view.proList.renderHandler = Handler.create(this, this.onRendPro, null, false);
        this._group.on(Laya.Event.CHANGE, this, this.onChange);
        this._view.on(Laya.Event.CLICK, this, this.onC);
    }

    protected removeEvent():void{
        this._view.itemList.selectHandler.recover();
        this._view.itemList.selectHandler = null;
        this._view.proList.renderHandler.recover();
        this._view.proList.renderHandler = null;
        this._group.off(Laya.Event.CHANGE, this, this.onChange);
        this._view.off(Laya.Event.CLICK, this, this.onC);
    }
}