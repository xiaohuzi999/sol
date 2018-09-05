/**
 * Created by 马达加加加 on 2015/7/6.
 * todo:所有的引导类可以用接口形式规范。。
 */
class Guide{
    /**剧情引导*/
    public static STORY_GUIDE:string = "0"
    /**回复引导*/
    public static RECOVER_GUIDE:string = "1";
    /**技能引导*/
    public static SKILL_GUIDE:string = "2";
    /**装备引导*/
    public static EQUIP_GUIDE:string = "3";
    /**进阶引导*/
    public static GROW_GUIDE:string = "4";
    /**城邦引导*/
    public static FRAM_GUIDE:string = "5";
    //天梯引导
    public static LADDER_GUIDE:string = "6";
    //当前引导实例
    public static curGuide:any;
    private static _arrow:egret.Bitmap;
    public static tipTF:egret.TextField;
    private static _window:GuideWindow;

    /**是否已经完成引导*/
    public static hasFinishedGuid(gid:string):boolean{
        return User.getInstance().guideList.indexOf(gid) != -1;
    }

    /**显示引导*/
    public static showGuide(guideId:string):any{
        if(Guide.hasFinishedGuid(guideId)){
            return null;
        }
        Guide.window;//初始化
        switch(guideId){
            case Guide.STORY_GUIDE:
                Guide.curGuide = new StoryGuide();
                break;
            case Guide.RECOVER_GUIDE:
                Guide.curGuide = new RecoverGuide();
                break;
            case Guide.SKILL_GUIDE:
                Guide.curGuide = new SkillGuide();
                break;
            case Guide.EQUIP_GUIDE:
                Guide.curGuide = new EquipGuide();
                break;
            case Guide.GROW_GUIDE:
                Guide.curGuide = new GrowGuide();
                break;
            case Guide.FRAM_GUIDE:
                Guide.curGuide = new FarmGuide();
                break;
            case Guide.LADDER_GUIDE:
                Guide.curGuide = new LadderGuide();
                break;
        }
        return Guide.curGuide
    }

    /**箭头-单例*/
    public static get arrow():egret.Bitmap{
        if(!Guide._arrow){
            Guide._arrow = new egret.Bitmap();
            Guide._arrow.texture = RES.getRes("arrow");

            Guide.tipTF = new egret.TextField();
            Guide.tipTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        }
        return Guide._arrow;
    }

    /**窗体-*/
    public static get window():GuideWindow{
        if(!Guide._window){
            Guide._window = new GuideWindow();
        }
        return Guide._window
    }
}

//剧情引导
class StoryGuide{
    private _callback:Function;
    private _thisObj:any;
    private _targets:egret.DisplayObject[];
    /**第一个关卡的位置*/
    public showGuide(targets:egret.DisplayObject[],callback:Function, thisObj:any):void{
        this._targets = targets;
        var target:egret.DisplayObject = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.x = target.x+240;
        Guide.arrow.y = target.y+20;
        target.parent.addChild(Guide.tipTF);
        Guide.tipTF.textFlow = new egret.HtmlTextParser().parser("<font color='#ff9900'>点击进入剧情</font>");
        Guide.tipTF.x = Guide.arrow.x+120;
        Guide.tipTF.y = Guide.arrow.y+10;
        this._callback = callback;
        this._thisObj = thisObj;
        CoolEffect.addAnimation(Guide.arrow, 0);
        target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if(this._callback){
            this._callback.call(this._thisObj, null);
        }
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        if(Guide.tipTF.parent){
            Guide.tipTF.parent.removeChild(Guide.tipTF);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        this._callback = null;
        this._thisObj = null;
        Guide.arrow.scaleX = 1;
        User.getInstance().guideList.push(Guide.STORY_GUIDE);
    }

}

//回复引导
class RecoverGuide{
    private _callback:Function;
    private _thisObj:any;
    private _targets:egret.DisplayObject[];
    /**只是血瓶位置*/
    public showGuide(targets:egret.DisplayObject[],callback:Function, thisObj:any):void{
        Guide.arrow.rotation = 0
        this._targets = targets;
        var target = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = 0;
        Guide.arrow.x = target.x+18;
        Guide.arrow.y = target.y+10;
        target.parent.addChild(Guide.tipTF);
        Guide.tipTF.text = "点击血瓶";
        Guide.tipTF.x = Guide.arrow.x+120;
        Guide.tipTF.y = Guide.arrow.y+10;
        this._callback = callback;
        this._thisObj = thisObj;
        CoolEffect.addAnimation(Guide.arrow, 0);
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        var target = this._targets[1];
        target.parent.addChild(Guide.arrow);
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.x = target.x+80;
        Guide.arrow.y = target.y+30;
        Guide.tipTF.text = "点击头像";
        Guide.tipTF.x = Guide.arrow.x+120;
        Guide.tipTF.y = Guide.arrow.y+10;
        CoolEffect.addAnimation(Guide.arrow, 0);
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this);
    }

    private onTouch2(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this);
        this._callback.call(this._thisObj, null);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        if(Guide.tipTF.parent){
            Guide.tipTF.parent.removeChild(Guide.tipTF);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        this._callback = null;
        this._thisObj = null;
        User.getInstance().guideList.push(Guide.RECOVER_GUIDE);
    }
}

//技能引导
class SkillGuide{
    private _callback:Function;
    private _thisObj:any;

    //只需要点击一下技能图标
    public showGuide(targets:egret.DisplayObject[],callback:Function, thisObj:any):void{
        Guide.arrow.rotation = 0;
        var target = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.scaleX = -1;
        Guide.arrow.x = target.x;
        Guide.arrow.y = target.y+20;
        Guide.tipTF.text = "点击技能图标";
        Guide.tipTF.x = Guide.arrow.x-Guide.arrow.width - Guide.tipTF.width;
        Guide.tipTF.y = Guide.arrow.y+10;
        target.parent.addChild(Guide.tipTF);

        this._callback = callback;
        this._thisObj = thisObj;
        CoolEffect.addAnimation(Guide.arrow, 0);
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this._callback.call(this._thisObj, null);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        if(Guide.tipTF.parent){
            Guide.tipTF.parent.removeChild(Guide.tipTF);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        this._callback = null;
        this._thisObj = null;
        Guide.arrow.scaleX = 1;
        User.getInstance().guideList.push(Guide.SKILL_GUIDE);
    }
}

//装备引导
class EquipGuide{
    //点队伍图标
    public showGuide(targets:egret.DisplayObject[]):void{
        var target = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = target.x+170;
        Guide.arrow.y = target.y;
        CoolEffect.addAnimation(Guide.arrow, 1);
        //target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //队伍点装备按钮
    public showTeamGuide(targets:egret.DisplayObject[]):void{
        var target = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = 90;
        Guide.arrow.x = target.x+470;
        Guide.arrow.y = target.y+100;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this)
    }
    private onTouch2(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //队伍点装备按钮
    public showEquipGuide(targets:egret.DisplayObject[]):void{
        var target = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = 90;
        Guide.arrow.x = target.x+560;
        Guide.arrow.y = target.y+100;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch3, this)
    }
    private onTouch3(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch3, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //结束
    public over():void{
        if( Guide.curGuide == this){
            Guide.curGuide = null;
        }
        var target = BottomCom.getInstance();
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = target.x+40;
        Guide.arrow.y = target.y;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch4, this)
    }

    private onTouch4(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch4, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }
}

//进阶引导
class GrowGuide{
    private _closeBtn:egret.DisplayObject;
    private _funMap:any = {};
    //点队伍图标
    public showGuide(targets:egret.DisplayObject[]):void{
        var target = targets[0];
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = target.x+170;
        Guide.arrow.y = target.y;
        CoolEffect.addAnimation(Guide.arrow, 1);
    }

    private onTouch(event:egret.TouchEvent):void{
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //队伍点进阶按钮
    public showGorwGuide(targets:egret.DisplayObject[]):void{
        if(!this._funMap["showGorwGuide"]){
            this._funMap["showGorwGuide"] = true;
            var target = targets[0];
            target.parent.addChild(Guide.arrow);
            Guide.arrow.rotation = 90;
            Guide.arrow.x = target.x+580;
            Guide.arrow.y = target.y+100;
            CoolEffect.addAnimation(Guide.arrow, 1);
            target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this)
        }
    }
    private onTouch2(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //
    public showGrowGuide2(targets:egret.DisplayObject[]):void{
        if(!this._funMap["showGrowGuide2"]){
            this._funMap["showGrowGuide2"] = true;
            var target = targets[0];
            this._closeBtn = targets[1];
            target.parent.addChild(Guide.arrow);
            Guide.arrow.rotation = 90;
            Guide.arrow.x = target.x+90;
            Guide.arrow.y = target.y+30;
            CoolEffect.addAnimation(Guide.arrow, 1);
            target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch3, this)
        }
    }

    public onTouch3(event:egret.TouchEvent=null):void{
        if(event){
            event.stopPropagation();
            event.stopImmediatePropagation();
            event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch3, this);
        }
        if(Guide.curGuide != this){//
            return;
        }
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
        this.showClose();
    }

    //
    private showClose():void{
        var target = this._closeBtn
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = 90;
        Guide.arrow.x = target.x+60;
        Guide.arrow.y = target.y+30;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch4, this)
    }

    private onTouch4(event:egret.TouchEvent):void{
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch4, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
        this.over();
    }

    //结束
    public over():void{
        if( Guide.curGuide == this){
            Guide.curGuide = null;
        }
        var target = BottomCom.getInstance();
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = target.x+40;
        Guide.arrow.y = target.y;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOver, this)
    }

    private onOver(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOver, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }
}

//城邦引导
class FarmGuide{
    private _funMap:any = {};
    private _target:egret.DisplayObject;
    //点城邦图标
    public showGuide():void{
        LayerManager.stage.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = 400;
        Guide.arrow.y = 800;
        CoolEffect.addAnimation(Guide.arrow, 1);
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    private onTouch(event:egret.TouchEvent):void{
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    public showHall(target:egret.DisplayObject):void{
        if(this._funMap["showHall"]){
            return;
        }
        this._funMap["showHall"] = true;
        this._target = target;
        Guide.window.showMsg("外务殿可产出血液精华，用于角色升阶。血奴数量越多产出的速度越快，升级民居可增加血奴数量");
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this)
    }
    private onTouch2(event:egret.TouchEvent):void{
        Guide.window.close();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this);
        this._target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = 90;
        Guide.arrow.x = this._target.x+90;
        Guide.arrow.y = this._target.y+30;
        CoolEffect.addAnimation(Guide.arrow, 1);
        this._target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeArrow, this)
    }

    public showUp(target:egret.DisplayObject):void{
        if(this._funMap["showHall"]){
            this._target = target;
            Guide.window.showMsg("升级建筑可以提高资源产量，城邦中所有建筑等级不能超过外务殿等级，我们先来升级一下外务殿");
            LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch2, this)
        }
    }

    //
    private _tips:string[] = [
        "养活血奴需足够的粮食，扩建或升级农田可增加粮食产量。",
        "建造或升级建筑需金币及木材，伐木场和矿场将源源不断的产出这些材料。"
    ];
    public showNext():void{
        Guide.window.showMsg("升级民居可增加血奴数量，血奴数量越多资源产量越高");
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextTip, this);
    }
    private onNextTip(event:egret.TouchEvent){
        event.stopPropagation();
        event.stopImmediatePropagation();
        if(this._tips.length){
            Guide.window.showMsg(this._tips.shift())
        }else{
            Guide.window.close();
            LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextTip, this);
            this.over();
        }
    }

    //remove Array
    private removeArrow(event:egret.TouchEvent):void{
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeArrow, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //结束
    public over():void{
        if( Guide.curGuide == this){
            Guide.curGuide = null;
        }
        var target = BottomCom.getInstance();
        target.parent.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = target.x+40;
        Guide.arrow.y = target.y;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOver, this)
    }

    private onOver(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOver, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }
}

//天梯引导
class LadderGuide{
    private _target:egret.DisplayObject;
    //点城邦图标
    public showGuide():void{
        var target:egret.DisplayObject = BottomCom.getInstance().$ladderBtn;
        BottomCom.getInstance().addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = target.x+30;
        Guide.arrow.y = target.y;
        CoolEffect.addAnimation(Guide.arrow, 1);
        target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }
    //
    private onTouch(event:egret.TouchEvent):void{
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //显示兑换按钮
    public showExchange(target:egret.DisplayObject):void{
        this._target = target;//"攒够荣誉就能招募强力伙伴"
        Guide.window.showMsg("天梯赛是挑战其他玩家的地方，挑战成功即可获得荣誉值。");
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
    }
    private next(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.next, this);
        Guide.window.showMsg("攒够荣誉值，就可以招募强力伙伴了，各种萝莉御姐软妹子壮汉……咱看看去先。");
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showExchangeNext, this);
    }
    private showExchangeNext(event:egret.TouchEvent):void{
        Guide.window.close();
        LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showExchangeNext, this);
        Guide.arrow.rotation = 90;
        Guide.arrow.x = this._target.x+100;
        Guide.arrow.y = this._target.y+40;
        this._target.parent.addChild(Guide.arrow);
        CoolEffect.addAnimation(Guide.arrow, 1);
        this._target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeArrow, this)
    }

    //显示招募第二
    public showExchange2(target:egret.DisplayObject):void{
        Guide.arrow.rotation = -90;
        Guide.arrow.x = 505;
        Guide.arrow.y = 360;
        LayerManager.stage.addChild(Guide.arrow);
        CoolEffect.addAnimation(Guide.arrow, 1);
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeArrow, this)
    }

    //结束
    public over():void{
        if( Guide.curGuide == this){
            Guide.curGuide = null;
        }
        Guide.window.showMsg("招募的伙伴已加入队伍，在“队伍”中查看TA的三围，废话不多说，咱还是去推倒黑色叉腰大魔王先。");
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.overNext, this)
    }
    private overNext(event:egret.TouchEvent):void{
        Guide.window.close();
        event.stopImmediatePropagation();
        event.stopPropagation();
        LayerManager.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.overNext, this)
        LayerManager.stage.addChild(Guide.arrow);
        Guide.arrow.rotation = -90;
        Guide.arrow.x = 40;
        Guide.arrow.y = 840;
        CoolEffect.addAnimation(Guide.arrow, 1);
        LayerManager.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOver, this)
    }

    private onOver(event:egret.TouchEvent):void{
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOver, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }

    //
    private removeArrow(event:egret.TouchEvent):void{
        event.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeArrow, this);
        if(Guide.arrow.parent){
            Guide.arrow.parent.removeChild(Guide.arrow);
        }
        CoolEffect.removeAnimation(Guide.arrow);
        Guide.arrow.rotation = 0;
    }
}

//通用引导窗体
class GuideWindow extends XModelWindow{
    private $bg:egret.Bitmap;
    private $tf:egret.TextField;
    private $arrow:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    public showMsg(str:string):void{
        if(!this.stage){
            this.show(false);
        }
        this.$tf.text = str;
    }

    public close():void{
        super.close();
        CoolEffect.removeAnimation(this.$arrow);
    }

    private init():void{
        var bg:egret.Bitmap = new egret.Bitmap();
        this.addChild(bg);
        bg.y = 180;
        this.$bg = bg;
        RES.getResAsync("guideBG", this.onLoadBG, this);

        this.$tf = new egret.TextField();
        this.addChild(this.$tf);
        this.$tf.width = 300;
        this.$tf.x = 330;
        this.$tf.y = 310;
        this.$tf.size = 24;
        this.$tf.lineSpacing = 3;
        this.$tf.fontFamily = Strings.DEFAULT_FONT_NAME;

        bg = new egret.Bitmap();
        bg.texture = RES.getRes("jiantou");
        this.addChild(bg);
        bg.x = 580;
        bg.y = 450;
        this.$arrow = bg;
    }

    private onLoadBG(tx:any):void{
        this.$bg.texture = RES.getRes("guideBG")
    }
}