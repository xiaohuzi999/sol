/*
* name;
*/
class DBSkill{
    private static _db:any;
    constructor(){

    }

    /** */
    public static getSkill(skillId:any):SkillVo{
        return this.data[skillId];
    }
    
    private static get data():any{
        if(!this._db){
            this._db = JSON.parse(Laya.loader.getRes("cfgs/skill.txt")+"");
            Laya.loader.clearRes("cfgs/skill.txt");
        }
        return this._db
    }
}