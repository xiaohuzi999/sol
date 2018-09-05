/*
* name;
*/
class App implements IApp{
    constructor(){

    }

    public start():void{
        var main:MainView = new MainView();
        main.show();
    }
}