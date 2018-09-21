/*
* name;
*/
class BagEquipView extends xframe.XMWindow{
    protected _view:ui.bag.BagEquipComUI;
    constructor(){
        super();
    }

    public show():void{
        super.show();
        this._view.roleList.array = [User.getInstance().role].concat(User.getInstance().heros);
    }

    protected createUI():void{
        this._view = new ui.bag.BagEquipComUI();
        this.addChild(this._view);
        this.closeOnBlank = true;
    }
}

//单元条
class BagEquipItem extends ui.bag.BagEquipItemUI{
    protected _data:Role;
    constructor(){
        super();
    }

    public set datasource(v:Role){
        trace("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        this._data = v;
        this.tf.name = v.name+"";
    }

    public get datasource():Role{
        return this._data;
    }
}