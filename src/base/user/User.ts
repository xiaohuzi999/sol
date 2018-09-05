/*
* name;
*/
class User{
    public name:string;

    public pic:string;

    public power:number;

    public money:number;
    
    public diamond:number;
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