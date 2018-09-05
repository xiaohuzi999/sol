class Sleep{
    public callBack:Function;
    public backEach:Function;
    private _timer:egret.Timer;
    private _time;
    private _interrupt;
    public constructor( interrupt,time ){
        this._time = time;
        this._interrupt = interrupt;
        this.backEach = new Function();
        this.callBack = new Function();
        this.creteTimer();
        this._timer.start();
    }

    public creteTimer(){
        this._timer = new egret.Timer( this._interrupt, this._time );
        this._timer.addEventListener( egret.TimerEvent.TIMER, this.onTimer, this );
        this._timer.addEventListener( egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this );
    }

    private onTimer(){
        return this.backEach( "FINISH_INTERRUPT" );
    }

    private onTimerCom(){
        this._timer.stop();
        this._timer.reset();
        return this.callBack( "FINISH" );
    }

    public stop(){
        this._timer.stop();
        this._timer.reset();
    }

    public start(){
        this._timer.reset();
        this._timer.start();
    }

}