/*
* name;
*/
class FightView extends xframe.XWindow{
    protected _view:ui.fight.FightViewUI;
    //当前数据
    private _curVo:FightVo;
    private _fighters:HeroItem[];
    constructor(){
        super();
        this._layer = xframe.LayerManager.LAYER_POP;
    }

    public show(...args):void{
        super.show();
        trace("FightView::",args[0]);
        //====
        trace("monster==========>>", DBMonster.calcTotalPro(args[0]));
        this.initFight(args[0]);
    }

    private initFight(fighters:string):void{
        var hero:Role[] = UserReq.getFightTeam();
        var enemy:Role[] = FightModel.initNpc(fighters)
        this.initHero(hero);
        this.initEnemy(enemy)
        FightModel.initFight(hero, enemy)
        //开始战斗
        FightModel.startFight();
    }

     /**战斗指令*/
    private execFight(vo:FightVo):void{
        trace(vo.rId,"=================", vo.nowId, vo.action, vo.fightInfo)
        this._curVo = vo;
        let fighter:any = this.getFighter(vo.nowId);
        if(fighter){
            fighter.attack(Handler.create(this, ()=>{
                FightModel.actionComplete();
            }));
            this.execFightEff();
        }else{//回合开始，处理BUFF
            this.execFightEff();
            Laya.timer.once(1000,FightModel, FightModel.actionComplete);
        }
    }
    
    /**
     * 效果解析 
     * {hp?:number, addBuff?:any,delBuff?:any}
    */
    private execFightEff():void{
        var fInfo:{hp?:number, addBuff?:any,delBuff?:any};
        for(let i in this._curVo.fightInfo){
            let fighter:any = this.getFighter(i);
            fInfo = this._curVo.fightInfo[i];
            
            if(fInfo.hp){
                fighter.showHp(fInfo.hp);
            }
            
            if(fInfo.addBuff){
                fighter.showBuff(fInfo.addBuff)
            }

            if(fInfo.delBuff){
                fighter.delBuff(fInfo.delBuff)
            }
        }
    }

    private onFightEvent(type:string, data?:any):void{
        //trace("onFightEvent:::::::::::>", type, data)
        switch(type){
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
    }
    
    private getFighter(uid):any{
        let vo:Role;
        for(let i=0; i<3; i++){
            vo = this._view["hero_"+i].data
            if(vo && vo.uid == uid){
                return this._view["hero_"+i];
            }
        }

        for(let i=0;i <4; i++){
            vo = this._view["enemy_"+i].data;
            if(vo && vo.uid == uid){
                return this._view["enemy_"+i];
            }
        }

        return null;
    }

    //
    private initHero(list:Role[]):void{
        for(let i=0; i<3; i++){
            this._view["hero_"+i].data = list[i];
        }
    }

    //
    private initEnemy(list:Role[]):void{
        for(let i=0;i <4; i++){
            this._view["enemy_"+i].data = list[i];
        }
    }
    

    protected initEvent():void{
        xframe.XEvent.instance.on(FightModel.TURN, this, this.onFightEvent, [FightModel.TURN]);
        xframe.XEvent.instance.on(FightModel.UPDATEINFO, this, this.onFightEvent, [FightModel.UPDATEINFO]);
        xframe.XEvent.instance.on(FightModel.WIN, this, this.onFightEvent, [FightModel.WIN]);
        xframe.XEvent.instance.on(FightModel.LOSE, this, this.onFightEvent, [FightModel.LOSE]);
    }

    protected removeEvent():void{
        xframe.XEvent.instance.off(FightModel.TURN, this, this.onFightEvent);
        xframe.XEvent.instance.off(FightModel.UPDATEINFO, this, this.onFightEvent);
        xframe.XEvent.instance.off(FightModel.WIN, this, this.onFightEvent);
        xframe.XEvent.instance.off(FightModel.LOSE, this, this.onFightEvent);
    }

    protected createUI():void{
        this._view = new ui.fight.FightViewUI();
        this.addChild(this._view);
    }
}