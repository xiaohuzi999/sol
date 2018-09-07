/*
* name;
*/
class HeroItem extends ui.fight.HeroItemUI{
    private _data:Role;
    constructor(){
        super();
    }

    public attack(cb:Handler):void{
        trace("attack。。。。。", this._data.uid);
        cb && cb.run();
    }

    public beAttacked():void{
        //trace("beAttacked");
    }

    public set data(role:Role){
        this._data = role;
        if(role){
            this.visible = true;
        }else{
            this.visible = false;
        }
    }

    public get data():Role{
        return this._data;
    }
}