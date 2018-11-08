/*
* name;
*/
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.start = function () {
        //
        DBMonster.init(Laya.loader.getRes("cfgs/npc.txt"));
        //加载。。
        var main = xframe.XFacade.instance.showModule(MainView);
        //
        UserReq.getUserInfo(Handler.create(null, function () {
            trace(User.getInstance());
        }));
    };
    return App;
}());
//# sourceMappingURL=App.js.map