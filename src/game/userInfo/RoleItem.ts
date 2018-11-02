/*
* name;
*/
class RoleItem extends ui.user.UserItemUI implements ISelectable{
    private _data:Role;
    private _selected:boolean;
    constructor(){
        super();
    }

    public set dataSource(role:Role){
        this._data = role;
        if(this._data){
            this.visible = true;
            this.tfName.text = role.name+"";
        }else{
            this.visible = false;
        }
    }

    public set selected(v:boolean){
        this._selected = v;
    }

    public get selected():boolean{
        return this._selected;
    }

    public get dataSource():Role{
        return this._data;
    }
}