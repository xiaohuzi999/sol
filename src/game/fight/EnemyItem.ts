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
        trace("attack。。。。。", this._data.uid);
        this.pic.scale(0.5, 0.5)
        Laya.Tween.to(this.pic, {scaleX:1, scaleY:1}, 400, null, cb);
        //cb && cb.run();
    }

    public beAttacked():void{
        //trace("beAttacked");
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