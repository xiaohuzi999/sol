/*
* name;
*/
class HeroItem extends ui.fight.HeroItemUI{
    private _data:Role;
    constructor(){
        super();
    }

    public attack(cb:Handler):void{
        FightAniUtils.attack(this,cb);
    }

    public beAttacked():void{
        FightAniUtils.beAttacked(this);
    }
    

    public die():void{
        FightAniUtils.die(this, this);
    }

    public update(info:any):void{
        for(let i in info){
            this._data[i] = info[i];
        }
        if(this._data.hp <= 0 ){
            this.die();
        }
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