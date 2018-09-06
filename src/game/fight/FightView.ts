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
        this._curVo = vo;
        trace("excuteFight------->", vo);
        let fighter:any = this.getFighter(vo.nowId);
        fighter.attack(Handler.create(this, this.execFightEff));
    }
    
    //
    private execFightEff():void{
        trace("x______________",this._curVo.fightInfo)
        for(let i in this._curVo.fightInfo){
            trace("i________________",i)
            let fighter:any = this.getFighter(i);
            fighter.beAttacked();
        }
        FightModel.actionComplete();
    }

    private onFightEvent(type:string, data?:any):void{
        trace("onFightEvent:::::::::::>", type, data)
        switch(type){
            case FightModel.TURN:
                //
                break;
            case FightModel.UPDATEINFO:
                this.execFight(data);
                break;
            case FightModel.WIN:
               
                break;
            case FightModel.LOSE:

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
                return this._view["hero_"+i];
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
    

    protected addEventListener():void{
        xframe.XEvent.instance.on(FightModel.TURN, this, this.onFightEvent, [FightModel.TURN]);
        xframe.XEvent.instance.on(FightModel.UPDATEINFO, this, this.onFightEvent, [FightModel.UPDATEINFO]);
        xframe.XEvent.instance.on(FightModel.WIN, this, this.onFightEvent, [FightModel.WIN]);
        xframe.XEvent.instance.on(FightModel.LOSE, this, this.onFightEvent, [FightModel.LOSE]);
    }

    protected removeEventListener():void{
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