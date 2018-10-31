/*
* name;
*/
class User{
    public name:string;

    public pic:string;

    public power:number;

    public gold:number;
    
    public diamond:number;
    //
    public role:Role;
    //
    public heros:Role[] = [];
    //
    public pets:Role[] = [];

    //单例;
    private static _instance:User;
    //
    public static readonly UPDATE:string = "update";

    constructor(){
    }

    //更新
    public update(value:any):void{
        for(var i in value){
            this[i] = value[i];
        }
        trace(this.role);
        //测试用======================================
        var role = DBMonster.calcTotalPro(1);
        role.state = Role.IN_FIGHT;
        role.uid = 2;
        this.heros.push(role);
        //=============================================
        //

        xframe.XEvent.instance.event(User.UPDATE);
    }

    public static getInstance():User{
        if(!this._instance){
            this._instance = new User();
        }
        return this._instance;
    }
}