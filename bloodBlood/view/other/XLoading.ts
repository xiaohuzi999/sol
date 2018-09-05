/**
 * Created by 马达加加加 on 2015/6/17.
 */
class XLoading extends XModelWindow{
    private textField:egret.TextField;
    private bar:egret.Bitmap;
    private flag:egret.Bitmap;
    private _callback:Function;
    private _thisObj:any;
    private _args:any[];
    private _name:string;

    //zidian
    private static _map:any = {};
    //单例
    private static _instance:XLoading;

    public constructor(){
        super();
        this.init();
    }

    private load(group:string, callback:Function, thisObj:any, args:any[]):void{
        this.show();
        this.textField.text = "资源加载中...";
        this._callback = callback;
        this._args = args;
        this._thisObj = thisObj;
        this._name = group;
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoad,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onError,this);
        RES.loadGroup(group,1);
    }

    private onLoad(event:RES.ResourceEvent):void{
        if(event.groupName == this._name){
            XLoading._map[this._name] = true;
            if(this._callback){
                this._callback.apply(this._thisObj, this._args);
                this._callback = null;
                this._thisObj = null;
                this._args = null;
            }
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoad,this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.close();
        }
    }

    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if(event.groupName == this._name){
            this.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /***/
    public close():void{
        super.close();
        this.setProgress(0,1);
        this.textField.text = "";
    }

    private onError():void{
        XTip.showTip("资源加载失败--!");
        this.close();
    }

    public static load(group:string, callback:Function,thisObj:any, args:any[]):void{
        if(!XLoading._map[group]){
            XLoading.getInstance().load(group,callback, thisObj,args);
        }else{
            callback.apply(thisObj,args);
        }
    }

    //销毁资源组
    public static dispose(key:string):void{
        delete XLoading._map[key];
    }

    public static setProgress(current, total):void {
        XLoading.getInstance().setProgress(current,total);
        if(!XLoading.getInstance().stage){
            XLoading.getInstance().show();
        }
    }

    private setProgress(current, total):void {
        this.textField.text = "资源加载中..." + current + "/" + total;
        var per:number = current/total;
        this.bar.scrollRect = new egret.Rectangle(0,0,per*this.bar.width,this.bar.height);
        if(current == 0 || current == total){
            this.flag.visible = false;
        }else{
            this.flag.visible = true;
            this.flag.x = this.bar.x + per*this.bar.width-this.flag.width/2;
        }
    }

    private init():void {
        var bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x252525);
        bg.graphics.drawRect(0,0,382,100);
        bg.graphics.endFill();
        this.addChild(bg);

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.x = 31;
        this.textField.y = 22;
        this.textField.width = 314;
        this.textField.textColor = 0xFFCC00;
        this.textField.textAlign = "center";

        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.x = 22;
        bm.y = 62;
        bm.texture = RES.getRes("jiazai04");

        //tou
        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.x = 22;
        bm.y = 62;
        bm.texture = RES.getRes("jiazai02");

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("jiazai02");
        bm.scaleX = -1;
        bm.x = 360;
        bm.y = 62;
        this.addChild(bm);

        this.bar = new egret.Bitmap();
        this.bar.x = 36;
        this.bar.y = 64;
        this.addChild(this.bar);

        this.flag = new egret.Bitmap();
        this.flag.y = 50;
        this.addChild(this.flag);

        this.bar.texture = RES.getRes("jiazai05");
        this.flag.texture = RES.getRes("jiazai03");
    }

    private static getInstance():XLoading{
        if(!XLoading._instance){
            XLoading._instance = new XLoading();
        }
        return XLoading._instance;
    }
}