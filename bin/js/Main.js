var Label = Laya.Label;
var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(750, 1334, WebGL);
Laya.stage.scaleMode = "showall";
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load([
        "res/atlas/common.atlas",
        "res/atlas/share.atlas",
        "res/atlas/main.atlas",
        "res/atlas/game.atlas",
        "res/atlas/fight.atlas",
        "res/atlas/icons.atlas",
        "cfgs/chap_0.txt",
        "cfgs/npc.txt",
        "cfgs/items.txt",
        "cfgs/skill.txt",
        "cfgs/buff.txt"
    ], Handler.create(null, onLoaded));
}
function onLoaded() {
    xframe.XFacade.instance.init(new App);
    //实例UI界面
    //var testUI: TestUI = new TestUI();
    //Laya.stage.addChild(testUI);
}
//# sourceMappingURL=Main.js.map