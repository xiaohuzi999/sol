/*
* name;
*/
class App implements IApp{
    constructor(){

    }

    public start():void{
        //
        DBMonster.init(Laya.loader.getRes("cfgs/npc.txt"));
        //加载。。
        var main:MainView = new MainView();
        main.show();
        //
        UserReq.getUserInfo(Handler.create(null, ()=>{
            trace(User.getInstance());
        }))
    }
}