/*
* name;
*/
class UserInfoView extends xframe.XWindow{
    private _ui:ui.user.UserInfoUI;
    constructor(){
        super();
    }

    public show(...args):void{
        super.show();
        this.format();
    }

    private format():void{
        let roles:Role[] = [User.getInstance().role].concat(User.getInstance().heros);
        for(let i=0; i<roles.length; i++){
            this._ui["role_"+i].dataSource = roles[0];
        }
    }

    public createUI():void{
        this._ui = new ui.user.UserInfoUI();
        this.addChild(this._ui);
    }
}