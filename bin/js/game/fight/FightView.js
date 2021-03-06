var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var FightView = /** @class */ (function (_super) {
    __extends(FightView, _super);
    function FightView() {
        var _this = _super.call(this) || this;
        _this._layer = xframe.LayerManager.LAYER_POP;
        return _this;
    }
    FightView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        trace("FightView::", args[0]);
        //====
        trace("monster==========>>", DBMonster.calcTotalPro(args[0]));
        this.initFight(args[0]);
    };
    FightView.prototype.initFight = function (fighters) {
        var hero = UserReq.getFightTeam();
        var enemy = FightModel.initNpc(fighters);
        this.initHero(hero);
        this.initEnemy(enemy);
        FightModel.initFight(hero, enemy);
        //开始战斗
        FightModel.startFight();
    };
    /**战斗指令*/
    FightView.prototype.execFight = function (vo) {
        trace(vo.rId, "=================", vo.nowId, vo.action, vo.fightInfo);
        this._curVo = vo;
        var fighter = this.getFighter(vo.nowId);
        if (fighter) {
            fighter.attack(Handler.create(this, function () {
                FightModel.actionComplete();
            }));
            this.execFightEff();
        }
        else { //回合开始，处理BUFF
            this.execFightEff();
            Laya.timer.once(1000, FightModel, FightModel.actionComplete);
        }
    };
    /**
     * 效果解析
     * {hp?:number, addBuff?:any,delBuff?:any}
    */
    FightView.prototype.execFightEff = function () {
        var fInfo;
        for (var i in this._curVo.fightInfo) {
            var fighter = this.getFighter(i);
            fInfo = this._curVo.fightInfo[i];
            if (fInfo.hp) {
                fighter.showHp(fInfo.hp);
            }
            if (fInfo.addBuff) {
                fighter.showBuff(fInfo.addBuff);
            }
            if (fInfo.delBuff) {
                fighter.delBuff(fInfo.delBuff);
            }
        }
    };
    FightView.prototype.onFightEvent = function (type, data) {
        //trace("onFightEvent:::::::::::>", type, data)
        switch (type) {
            case FightModel.TURN:
                //
                break;
            case FightModel.UPDATEINFO:
                this.execFight(data);
                break;
            case FightModel.WIN:
                xframe.XFacade.instance.showModule(ResultView);
                break;
            case FightModel.LOSE:
                xframe.XFacade.instance.showModule(ResultView);
                break;
        }
    };
    FightView.prototype.getFighter = function (uid) {
        var vo;
        for (var i = 0; i < 3; i++) {
            vo = this._view["hero_" + i].data;
            if (vo && vo.uid == uid) {
                return this._view["hero_" + i];
            }
        }
        for (var i = 0; i < 4; i++) {
            vo = this._view["enemy_" + i].data;
            if (vo && vo.uid == uid) {
                return this._view["enemy_" + i];
            }
        }
        return null;
    };
    //
    FightView.prototype.initHero = function (list) {
        for (var i = 0; i < 3; i++) {
            this._view["hero_" + i].data = list[i];
        }
    };
    //
    FightView.prototype.initEnemy = function (list) {
        for (var i = 0; i < 4; i++) {
            this._view["enemy_" + i].data = list[i];
        }
    };
    FightView.prototype.initEvent = function () {
        xframe.XEvent.instance.on(FightModel.TURN, this, this.onFightEvent, [FightModel.TURN]);
        xframe.XEvent.instance.on(FightModel.UPDATEINFO, this, this.onFightEvent, [FightModel.UPDATEINFO]);
        xframe.XEvent.instance.on(FightModel.WIN, this, this.onFightEvent, [FightModel.WIN]);
        xframe.XEvent.instance.on(FightModel.LOSE, this, this.onFightEvent, [FightModel.LOSE]);
    };
    FightView.prototype.removeEvent = function () {
        xframe.XEvent.instance.off(FightModel.TURN, this, this.onFightEvent);
        xframe.XEvent.instance.off(FightModel.UPDATEINFO, this, this.onFightEvent);
        xframe.XEvent.instance.off(FightModel.WIN, this, this.onFightEvent);
        xframe.XEvent.instance.off(FightModel.LOSE, this, this.onFightEvent);
    };
    FightView.prototype.createUI = function () {
        this._view = new ui.fight.FightViewUI();
        this.addChild(this._view);
    };
    return FightView;
}(xframe.XWindow));
//# sourceMappingURL=FightView.js.map