/**
 * 序言界面
 * @author 
 *
 */
class ForewordView extends XWindow {
    private _bg:egret.Bitmap;
    private _index:number = 1;
    public static START_NEW_GAME: string = "start_new_game";
    
	public constructor() {
        super();
        this.init();
	}
    
    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandle,this);
    }
    
    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTapHandle,this);
    }
    
    public close(): void
    { 
        super.close();
    }

    private changeBG():void{
        egret.Tween.removeTweens(this._bg);
        var bg: egret.Bitmap = this._bg;
        bg.alpha = 1;
        egret.Tween.get(bg).to({},500).call(this.removeChild, this,[bg]);
        if(this._index <4){
            this._bg = new egret.Bitmap();
            this._bg.texture = RES.getRes("foreword"+this._index);
            this.addChild(this._bg);
            this._bg.alpha = 0;
            this._index ++;
            egret.Tween.get(this._bg).to({alpha:1},500).call(this.next, this);
        }else{
            this.dispatchEvent(new egret.Event(ForewordView.START_NEW_GAME));
        }
    }

    private next():void{
        egret.Tween.get(this._bg).to({},5000).call(this.changeBG, this);
    }
    
    private init(): void
    { 
        var bg: egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("foreword");
        this.addChild(bg);
        this._bg = bg;
        egret.Tween.get(this._bg).to({},5000).call(this.changeBG, this);
    }
    
    private onTouchTapHandle(event: egret.TouchEvent): void
    {
        event.stopPropagation();
        event.stopImmediatePropagation();
        this.changeBG();
        //this.dispatchEvent(new egret.Event(ForewordView.START_NEW_GAME));
    }
}
