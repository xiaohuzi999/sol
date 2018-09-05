/*
* name;
*/
class User extends Laya.EventDispatcher{
    public name:string;

    public pic:string;

    public money:number;
    
    public diamond:number;
    //单例;
    private static _instance:User;
    //
    public static readonly UPDATE:string = "update";
    constructor(){
        super();
    }

    //更新
    public update(value:any):void{
        for(var i in value){
            this[i] = value[i];
        }
        //
        this.event(User.UPDATE);
    }

    public static getInstance():User{
        if(!this._instance){
            this._instance = new User();
        }
        return this._instance;
    }
}