/*
* name;
*/
class DBMonster{
    private static _data:Role[];
    constructor(){

    }

    public static init(data:string):void{
        this._data = JSON.parse(data);
    }

    /**获取静态属性 */
    public static getMonsterInfo(id:any):Role{
        for(let i in this._data){
            if(this._data[i].id == id){
                return this._data[i];
            }
        }
        return null;
    }

    /**
     * 计算总属性 ,需要一个公式
    */
    public static calcTotalPro(id:any):Role{
        var role:Role = xframe.XUtils.clone(this.getMonsterInfo(id));
        role.attack = role.strength*5;
        role.hp = role.maxHp = role.physique*10;
        role.speed = role.agility*1
        role.crit = role.strength*0.1;
        role.dodge = role.agility*0.2;
        return role;
    }
}