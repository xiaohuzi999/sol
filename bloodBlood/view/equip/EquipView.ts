/**
 * Created by 马达加加加 on 2015/6/5.
 * 装备界面
 */
class EquipView extends XWindow{
    private $nameTF:egret.TextField;
    private $proTF:egret.TextField;
    private $exproTF:egret.TextField;
    private $bigIcon:egret.Bitmap;
    private _list:egret.gui.List;
    //数据层
    private _myCollection:egret.gui.ArrayCollection;
    //设定当前目标
    public static target:RoleVo;
    public constructor(){
        super();
        this.init();
    }

    public show():void{
        super.show();
        var index:number = this._list.selectedIndex;
        var list:ItemVo[] = BagModel.getItemByType(ItemType.EQUIP);
        var sourceArr:any[] = [];
        for (var i:number = 0; i < list.length; i++) {
            sourceArr.push({data:list[i]});
        }
        this._myCollection = new egret.gui.ArrayCollection(sourceArr);
        this._list.dataProvider = this._myCollection;
        if(index == -1){
            index = 0;
        }
        this._list.selectedIndex = index;
        this.onChange();
        this.addChild(BottomCom.getInstance());
        BottomCom.getInstance().y = 829;

        //植入新手引导
        if(Guide.curGuide){
            egret.setTimeout(this.showGuide, this, 50);
        }
    }

    private showGuide():void{
        if(Guide.curGuide){
            if(Guide.curGuide instanceof EquipGuide){
                Guide.curGuide.showEquipGuide([this._list])
            }
        }
    }

    public close():void{
        super.close();
        EquipView.target = null;
    }

    private onChange(event:egret.Event=null):void{
        if(this._list.selectedItem){
            var data:ItemVo = this._list.selectedItem.data;
            this.$nameTF.text = data.itemName+"";
            this.$proTF.text = ItemVo.parse(XUtils.addObject(data.itemProperty, data.itemXProperty));
            //this.$bigIcon.texture = RES.getRes("dadao");
            RES.getResByUrl(AppConfig.imgURL+ItemData.PRE_URL + data.imageId + "_b.png", this.onGetIcon, this);
        }else{
            this.$nameTF.text = this.$proTF.text = this.$exproTF.text = "";
            this.$bigIcon.texture = null;
        }
    }

    private onGetIcon(tx:any):void{
        this.$bigIcon.texture = tx;
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        if(event.target){
            switch(event.target.name){
                case "strBtn":
                    EquipStrView.getInstance().show(true,this._list.selectedItem.data)
                    break;
                case "equipBtn":
                    var target:RoleVo = EquipView.target;
                    if(!target){
                        target = User.getInstance().role
                    }
                    var bool:Boolean = BagModel.equipItem(this._list.selectedItem.data, target);
                    if(bool){//粗暴的重新来一次
                        this.show();
                    }
                    break;
            }
        }
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("di5");

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.y = 315
        bm.texture = RES.getRes("di1");

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.y = 92;
        this.$nameTF.size = 28;
        this.$nameTF.strokeColor = 0x38280A;
        this.$nameTF.stroke = 2;

        this.$proTF = new egret.TextField();
        this.$proTF.y = 134;
        this.addChild(this.$proTF)
        this.$proTF.size = 24;

        this.$exproTF = new egret.TextField();
        this.addChild(this.$exproTF);
        this.$exproTF.y = 200;
        this.$exproTF.size = 24;
        this.$nameTF.x = this.$proTF.x = this.$exproTF.x = 52;
        this.$nameTF.width = this.$proTF.width = this.$exproTF.width = 240;
        this.$nameTF.fontFamily = this.$proTF.fontFamily = this.$exproTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.$proTF.textColor = this.$exproTF.textColor = 0x38280A;

        this.$bigIcon = new egret.Bitmap();
        this.addChild(this.$bigIcon);
        this.$bigIcon.x = 340;
        this.$bigIcon.y = 52;

        this._list = new egret.gui.List();
        this.addChild(this._list);
        this._list.percentWidth = 100;
        this._list.percentHeight = 100;
        this._list.x = 10;
        this._list.y = 370
        this._list.height = 400;
        this._list.itemRenderer = new egret.gui.ClassFactory(EquipItemRenderer);
    }

    public initEvent():void{
        this._list.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        MainDispatcher.getInstance().addEventListener(EquipStrModel.STR_SUCCESS, this.show, this);
        MainDispatcher.getInstance().addEventListener(EquipStrModel.STR_FAIL, this.show, this);
    }
    public removeEvent():void{
        this._list.removeEventListener(egret.Event.CHANGE, this.onChange, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        MainDispatcher.getInstance().removeEventListener(EquipStrModel.STR_SUCCESS, this.show, this);
        MainDispatcher.getInstance().removeEventListener(EquipStrModel.STR_FAIL, this.show, this);
    }
}
