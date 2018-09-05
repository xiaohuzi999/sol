/**
 * Created by 马达加加加 on 2015/6/3.
 * 战斗结果
 */
class ResultView extends XWindow{
    
    private $resultBm:egret.Bitmap;
    private $bloodItemTF:egret.TextField;
    private $moneyTF:egret.TextField;
    private $closeBtn:egret.Bitmap;
    private $growBtn:egret.Bitmap;
    private $tip:egret.DisplayObjectContainer;
    private _items:RewardItem[];
    private isWin:boolean = false;
    //特殊奖励数据===================================
    public static reward:any;
    
    public constructor(){
        super();
        this.init();
    }

    public show(data:any):void{
        super.show();
        CoolEffect.fadeIn(this);
        if(data == undefined){
            this.isWin = false;
            this.$resultBm.texture = RES.getRes("shibai");
            this.$moneyTF.text = "";
            this.$bloodItemTF.text = "";
            for(var i:number=0; i<3; i++){
                this._items[i].format(null);
            }
            this.addChild(this.$tip);

            //植入新手引导=========================================================
            //if(/*Guide.hasFinishedGuid(Guide.EQUIP_GUIDE) &&*/ !Guide.hasFinishedGuid(Guide.GROW_GUIDE)){
                //egret.setTimeout(this.showGuide, this,100);
            //}
        }else{
            this.isWin = true;
            if(this.$tip.parent){
                this.removeChild(this.$tip)
            }
            this.$resultBm.texture = RES.getRes("tongguan");
            //解析奖励
            if(data.money){
                this.$moneyTF.text = "金钱：" + data.money;
            }else{
                this.$moneyTF.text = "";
            }
            if(data.blood){
                this.$bloodItemTF.text = "血液精华：" + data.blood;
            }else{
                this.$bloodItemTF.text = "";
            }
            if(data.items){
                for(var i:number=0; i<3; i++){
                    this._items[i].format(data.items[i]);
                }
            }
        }

        //特殊奖励=================================================
        if(this.isWin){
            if(ResultView.reward && ResultView.reward.dataInfo) {
                if (User.getInstance().taskList.indexOf(User.getInstance().chapterId+"_"+ResultView.reward.recordId) == -1) {
                    var info:any = ResultView.reward.dataInfo;
                    if (info.msg) {
                        XTip.showTip(info.msg);
                    }
                    //金币
                    if (info.money) {
                        User.getInstance().money += parseInt(info.money);
                    }
                    //点券
                    if (info.point) {
                        User.getInstance().point += parseInt(info.point);
                        UserRequest.getBonus(parseInt(info.point),null, null);
                    }
                    //技能
                    if (info.skill) {
                        if (SkillData.getSkillInfo(info.skill) && User.getInstance().role.skills.indexOf(info.skill) == -1) {
                            SoundManager.playerSND("dSND");
                            User.getInstance().role.skills.push(info.skill);
                        }
                    }
                    //属性变化===
                    if (info.other) {
                        SoundManager.playerSND("dSND");
                        var list:any[] = (info.other + "").split("|");
                        var temp:any[];
                        var obj:any = {};
                        for (var i:number = 0; i < list.length; i++) {
                            temp = list[i].split(":");
                            obj[temp[0]] = temp[1];
                        }
                        var role:RoleVo;
                        if (obj.role) {
                            console.log(obj);
                            role = UserModel.getRoleByName(obj.role);
                        } else {
                            role = User.getInstance().role;
                            /*[temp[0]] += parseInt(temp[1]);*/
                        }
                        for (var j in obj) {
                            if (j != "role") {
                                console.log(role.roleName + "属性变化--B", j, role[j])
                                role[j] += parseInt(obj[j]);
                                console.log(role.roleName + "属性变化--A", j, role[j])
                            }
                        }
                    }
                    //道具=======================================
                    if (info.item) {
                        SoundManager.playerSND("dSND");
                        var list:any[] = (info.item + "").split("|");
                        var temp:any[];
                        var vo:ItemVo;
                        var tempVo:ItemVo;
                        for (var i:number = 0; i < list.length; i++) {
                            var str:string = list[i];
                            temp = str.split(":");
                            vo = ItemData.getItemByName(temp[0]);
                            if (vo) {//加入背包
                                tempVo = BagModel.addItem(vo.itemCode, <number>temp[1], false);
                                //飞入背包动画
                                Utils.flyToBag(vo);
                            }
                        }
                    }
                    //记录
                    User.getInstance().taskList.push(User.getInstance().chapterId+"_"+ResultView.reward.recordId);
                }
            }
        }
    }

    private showGuide():void{
        Guide.showGuide(Guide.GROW_GUIDE);
        Guide.curGuide.showGuide([this.$growBtn], null, null);
    }

    public close():void{
        ResultView.reward = null;
        super.close();
    }

    private onBtnClick(event:egret.TouchEvent):void{
        if(this.isWin){
            MainDispatcher.getInstance().dispatchEvent(new egret.Event(GameView.RESUME));
        }else{
            MainDispatcher.getInstance().dispatchEvent(new XEvent(GameView.FAIL));
        }
        this.close();
    }

    private onTouch(event:egret.TouchEvent):void{
        if(event.target){
            switch(event.target.name){
                case "strBtn":
                case "growUpBtn":
                case "equipBtn":
                    MainDispatcher.getInstance().dispatchEvent(new XEvent(GameView.FAIL));
                    this.close();
                    MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_TEAM));
                    break;
            }
        }
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("jiesudi");

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("pingjiabiao");
        this.addChild(bm);
        bm.x = 127;
        bm.y = 173;

        this.$resultBm = new egret.Bitmap();
        this.addChild(this.$resultBm);
        this.$resultBm.texture = RES.getRes("tongguan");
        this.$resultBm.x = 256;
        this.$resultBm.y = 259;

        this.$bloodItemTF = new egret.TextField();
        this.addChild(this.$bloodItemTF);
        this.$bloodItemTF.x = 138;
        this.$bloodItemTF.y = 352;
        this.$bloodItemTF.textColor = 0x009900;

        this.$moneyTF = new egret.TextField();
        this.addChild(this.$moneyTF);
        this.$moneyTF.x = 338;
        this.$moneyTF.y = 352;
        this.$moneyTF.textColor = 0xff6600;
        this.$bloodItemTF.fontFamily = this.$moneyTF.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$closeBtn = new egret.Bitmap();
        this.$closeBtn.touchEnabled = true;
        this.$closeBtn.texture = RES.getRes("quedinganniu");
        this.addChild(this.$closeBtn);
        this.$closeBtn.x = 208;
        this.$closeBtn.y = 790;

        this._items = new Array();
        var yP:number[] = [420,502,590];
        for(var i:number=0; i<3; i++){
            var item:RewardItem = new RewardItem();
            this.addChild(item);
            this._items.push(item);
            item.x = 104;
            item.y = yP[i];
            item.visible = false;
        }

        this.$tip = new egret.DisplayObjectContainer();
        var tf:egret.TextField = new egret.TextField();
        tf.text = "胜败乃兵家常事\n屡败屡战真男儿";
        this.$tip.addChild(tf);
        tf.x = 84;
        tf = new egret.TextField();
        tf.text = "提升实力看这里";
        this.$tip.addChild(tf);
        tf.x = 6;
        tf.y = 162;

        var btn:egret.Bitmap = new egret.Bitmap();
        btn.texture = RES.getRes("qianghuaanniu");
        this.$tip.addChild(btn);
        btn.x = 302;
        btn.y = 198;
        btn.touchEnabled = true;
        btn.name = "strBtn";

        btn = new egret.Bitmap();
        btn.texture = RES.getRes("jinjiekuang");
        this.$tip.addChild(btn);
        btn.x = 151;
        btn.y = 204.5;
        btn.touchEnabled = true;
        btn.name = "growUpBtn";
        this.$growBtn = btn;

        btn = new egret.Bitmap();
        btn.texture = RES.getRes("zhuangbeianniu");
        this.$tip.addChild(btn);
        btn.y = 198;
        btn.touchEnabled = true;
        btn.name = "equipBtn";
        this.$tip.x = 107;
        this.$tip.y = 395;
    }

    public initEvent():void{
        this.$closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.$tip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }

    public removeEvent():void{
        this.$closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
        this.$tip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this)
    }
}

class RewardItem extends egret.DisplayObjectContainer{
    private $nameTF:egret.TextField;
    private $icon:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    public format(item:any):void{
        if(item){
            var itemId:number = item.itemId
            var vo:ItemVo = ItemData.getItemData(itemId);
            if(vo){
                this.visible = true;
                this.$nameTF.text = vo.itemName+" ×"+item.itemNum;
                this.$icon.texture = RES.getRes(vo.imageId);
            }else{
                this.visible = false;
            }
        }else{
            this.visible = false;
        }

    }

    private init():void{
        
        var bm:egret.Bitmap = new egret.Bitmap();
       this.addChild(bm);
        bm.texture = RES.getRes("renwukuang");
        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = -2;
        this.$icon.y = -4;

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.y = 24;
        this.$nameTF.x = 93;
        this.$nameTF.size = 24;
        this.$nameTF.textAlign = egret.HorizontalAlign.LEFT;
        this.$nameTF.fontFamily = Strings.DEFAULT_FONT_NAME;
    }
}
