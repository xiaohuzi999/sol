/**
 * Created by 马达加加加 on 2015/8/14.
 */
class SelectStoryView extends XModelWindow{
    private $bg:egret.Bitmap;
    private $closeBtn:egret.Bitmap;
    //单元条
    private _items:SeleteStoryItem[] = [];
    /**时间-选择关卡*/
    public static SELECTED_STORY:string = "selectd_story";
    public constructor(){
        super();
        this.init();
    }

    //
    public show():void{
        this.showStory();
        super.show();
        CoolEffect.flowIn(this);
    }

    public close():void{
        CoolEffect.flowOut(this,250, super.close, this);
    }
    //
    private showStory():void{
        var index:number = 0;
        var delH:number = 0;
        for(var i:number=0; i<SelectStoryView.DATA.length; i++){
            if(SelectStoryView.DATA[i].id>User.getInstance().chapterId){
                continue;
            }
            if(!this._items[i]){
                this._items[i] = new SeleteStoryItem();
            }
            this._items[i].showMsg(SelectStoryView.DATA[i]);
            this.addChild(this._items[i]);
            this._items[i].x = index%2 * 240+20;
            this._items[i].y = Math.floor(index/2) * 66+64;
            delH = this._items[i].y;
            index++;
        }
        this.$bg.height = Math.max(delH+120,420);
    }

    //
    private onTouch(event:egret.TouchEvent):void{
        if(event.target == this.$closeBtn){
            this.close();
        }else if(event.target instanceof SeleteStoryItem){
            MainDispatcher.getInstance().dispatchEventWith(SelectStoryView.SELECTED_STORY,false,event.target.data.id);
            this.close();
        }
    }

    private init():void{
        this.$bg = new egret.Bitmap();
        this.addChild(this.$bg);
        this.$bg.texture = RES.getRes("daojudi");

        this.$closeBtn = new egret.Bitmap();
        this.$closeBtn.texture = RES.getRes("guanbi");
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 450;
        this.$closeBtn.y = 4;
        this.$closeBtn.name = "closeBtn";
        this.$closeBtn.touchEnabled = true;
    }

    public initEvent():void{
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    public removeEvent():void{
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    //数据定义
    private static DATA:any[] =
        [
            {id:"17","name":"仙界"},{id:"16","name":"幽冥界"},{id:"15","name":"神煌战场"},
            {id:"14","name":"鸿蒙道宫"},{id:"13","name":"圊云州"},{id:"12","name":"玄天府"},
            {id:"11","name":"两仪星"},{id:"10","name":"炎灵界"},{id:"9","name":"赤蒙天"},
            {id:"8","name":"第一世家"},{id:"7","name":"荧惑道场"},{id:"6","name":"邙山鬼府"},
            {id:"5","name":"殷族城邦"},{id:"4","name":"阿尔卑斯山"},{id:"3","name":"凡卢尔城"},
            {id:"2","name":"殷族城邦"},{id:"1","name":"大柏林城"},{id:"0","name":"殷族城邦"}
        ]
}

//剧情条目
class SeleteStoryItem extends egret.DisplayObjectContainer{
    private _tf:egret.TextField;
    public data:any;
    public constructor(){
        super();
        this.init();
        this.touchEnabled = true;
    }

    public showMsg(data:any):void{
        this.data = data;
        this._tf.text = (parseInt(this.data.id)+1) + "."+this.data.name+"";
    }

    private init():void{
        var bg:egret.Bitmap  =new egret.Bitmap();
        this.addChild(bg);
        bg.width = 240;
        bg.texture = RES.getRes("selectItem");

        this._tf = new egret.TextField();
        this.addChild(this._tf);
        this._tf.x = 34;
        this._tf.y = 10;
        this._tf.width = 180;
        this._tf.textAlign = egret.HorizontalAlign.CENTER;
        this._tf.size = 24;
        this._tf.textColor = 0xffb606;
        this._tf.fontFamily = Strings.DEFAULT_FONT_NAME;
    }
}