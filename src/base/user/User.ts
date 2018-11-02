/*
* name;
*/
class User{
    public id:string;

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
        //测试用======================================
        UserReq.addHero(1);
        //=============================================
        //
        this.emit();
    }

    /** */
    public emit():void{
        xframe.XEvent.instance.event(User.UPDATE);
    }

    public static getInstance():User{
        if(!this._instance){
            this._instance = new User();
        }
        return this._instance;
    }
}