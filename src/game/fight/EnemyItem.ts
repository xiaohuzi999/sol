/*
* name;
*/
class EnemyItem extends ui.fight.EnemyItemUI{
    private _data:Role;
    private static readonly SIZE:{WIDTH:number, HEIGHT:number} = {WIDTH:300, HEIGHT:450};
    constructor(){
        super();
    }

    public attack(cb:Handler):void{
        FightAniUtils.attack(this.pic,cb);
    }

    public beAttacked():void{
        FightAniUtils.beAttacked(this.pic);
    }

    public die():void{
        trace("die..............");
        FightAniUtils.die(this.pic, this);
    }

    /** */
    public showHp(hp:number):void{
        //效果
        let delHp:number = hp- this._data.hp
        this._data.hp = hp;
        if(this._data.hp <= 0 ){
            this.die();
        }
        if(delHp < 0){
            this.beAttacked();
        }
        trace(this._data.uid, " current hp ", this._data.hp, " __", delHp)
    }

    /**showBuff */
    public showBuff(buffId:any):void{
        trace(this._data.uid, " add buff ", buffId)
    }

    public delBuff(buffId:any):void{
        trace(this._data.uid, " remove buff ", buffId)
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
            var skinUrl:string = "res/graphics/fighter/"+role.pic+".png"
            Laya.loader.load(skinUrl, Handler.create(null, ()=>{
                this.pic.skin = skinUrl;
                this.pic.anchorX = 0.5;
                this.pic.anchorY = 1;
                this.pic.x = EnemyItem.SIZE.WIDTH/2;
                this.pic.y = EnemyItem.SIZE.HEIGHT;
            }));
        }else{
            this.visible = false;
        }
    }

    public get data():Role{
        return this._data;
    }
}