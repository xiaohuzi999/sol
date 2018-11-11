/*
* name;
*/
class UserInfoView extends xframe.XWindow{
    private _ui:ui.user.UserInfoUI;
    private _group:xframe.XGroup;
    private readonly ItemNum:number = 3;
    constructor(){
        super();
        this.layer = xframe.LayerManager.LAYER_POP;
    }

    public show(...args):void{
        super.show();
        this.format();
    }

    private format():void{
        let roles:Role[] = [User.getInstance().role].concat(User.getInstance().heros);
        for(let i=0; i<this.ItemNum; i++){
            this._ui["role_"+i].dataSource = roles[i];
        }
        if(!this._group.selectedBtn){
            this._group.selectedBtn = this._group.buttons[0];
        }
    }

    private onSelect():void{
        let role:Role = this._group.selectedBtn.dataSource;
        this._ui.tfAttack.text = role.attack+"";
        this._ui.tfHP.text = role.maxHp+"";
        this._ui.tfSpeed.text = role.speed+"";
    }

    private onClick(e:Laya.Event):void{
        switch(e.target){
            case this._ui.btnBack:
            this.close();
            break;
        }
    }

    public createUI():void{
        this._ui = new ui.user.UserInfoUI();
        this.addChild(this._ui);
        this._group = new xframe.XGroup([this._ui.role_0,this._ui.role_1,this._ui.role_2]);
    }

    protected initEvent():void{
        this._group.on(Laya.Event.SELECT, this, this.onSelect)
        this._ui.on(Laya.Event.CLICK, this, this.onClick)
        super.initEvent();
    }

    protected removeEvent():void{
        super.removeEvent();
        this._group.off(Laya.Event.SELECT, this, this.onSelect)
        this._ui.off(Laya.Event.CLICK, this, this.onClick)
    }
}