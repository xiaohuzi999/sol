/** 队伍界面
* todo 增加队友呼唤上场操作
 * Created by 马达加加加 on 2015/5/29.
 */
class TeamView extends XWindow {
    
    private _icons:PlayerIconCom[];
    //战斗力
    private _kpiTF:egret.TextField;
    /**人物单元*/
    private _players: PlayerDetailCom[];
    //
    private _itemList:egret.gui.List;
    //数据层
    private _myCollection: egret.gui.ArrayCollection;
    
    public constructor(){
        super();
        this.init();
    }

    public show():void{
        this.addChild(BottomCom.getInstance());
        BottomCom.getInstance().y = 829;
        super.show();
        this.update();
    }

    //更新状态
    private update():void{
        var list:RoleVo[]  = new Array();
        list.push(User.getInstance().role);
        var temp:RoleVo[] = new Array();
        temp.push(User.getInstance().role);
        for(var i:number=0; i<User.getInstance().team.length; i++){
            list.push(User.getInstance().team[i]);
            if(User.getInstance().team[i].state == 1){
                temp.push(User.getInstance().team[i]);
            }
        }
        for(i=0; i<this._icons.length; i++){
            //this._players[i].format(list[i]);
            this._icons[i].format(temp[i]);
        }
        this._kpiTF.text = "战斗力：" + User.getInstance().kpi;

        var sourceArr:any[] = [];
        for (var i:number = 0; i < list.length; i++) {
            sourceArr.push({name:i,data:list[i]});
        }
        this._myCollection = new egret.gui.ArrayCollection(sourceArr);
        this._itemList.dataProvider = this._myCollection;
        //植入新手引导
        if(Guide.curGuide){
            egret.setTimeout(this.showGuide, this, 50);
        }
    }

    //
    private showGuide():void{
        if(Guide.curGuide){
            if(Guide.curGuide instanceof EquipGuide){
                Guide.curGuide.showTeamGuide([this._itemList]);
            }else if(Guide.curGuide instanceof GrowGuide){
                Guide.curGuide.showGorwGuide([this._itemList]);
            }
        }
    }

    private onTap(event:egret.TouchEvent):void{
        if(!event.target){
            return;
        }
        var item:PlayerDetailCom;
        switch(event.target.name){
            case "equipBtn":
                item = event.target.parent;
                EquipView.target = item.data;
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_EQUIP));
                break;
            case "growUpBtn":
                item = event.target.parent;
                GrowUpView.getInstance().show(true,item.data);
                break;
            case "fightBtn":
                item = event.target.parent;
                TeamModel.changeState(item.data, this.update, this);
                break;
            /*case "itemPlayer":
                item = event.target.parent;
                var role:RoleVo = item.data.createFighter();
                //var str:string = "战斗力："+Utils.caculateRolKpi(role);
                var str:string = "生命值："+role.maxHp;
                str += "\n攻击：" +role.attack;
                str += "\n防御："+ role.defend;
                str += "\n敏捷："+role.agility;
                TipsManager.registerTips( event.target,str);
                return;
                    TipsManager.registerTips( event.target, "战斗力：" + User.getInstance().kpi +
                    "\n防御力：" + User.getInstance().role.defend  +
                    "\n生命值：" + User.getInstance().role.maxHp +
                    "\n敏捷：" + User.getInstance().role.agility
                );
                break;*/
            default:
                break;
        }
    }

    private updateKpi():void{
        this._kpiTF.text = "战斗力：" + User.getInstance().kpi;
        this.update();
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes("di3");
        this.addChild(bm);

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("di1");
        bm.y = 315;
        this.addChild(bm);

        bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("chuzhengbiaoti");
        this.addChild(bm);
        bm.x = 197;
        bm.y = 60;

        this._icons = new Array();
        var item:PlayerIconCom = new PlayerIconCom();
        this.addChild(item);
        item.x = 35;
        item.y = 172;
        this._icons.push(item);
        item = new PlayerIconCom();
        this.addChild(item);
        item.x = 177;
        item.y = 172;
        this._icons.push(item);
        item = new PlayerIconCom();
        this.addChild(item);
        item.x = 320;
        item.y = 172;
        this._icons.push(item);
        item = new PlayerIconCom();
        this.addChild(item);
        item.x = 462;
        item.y = 172;
        this._icons.push(item);

        this._kpiTF = new egret.TextField();
        this.addChild(this._kpiTF);
        this._kpiTF.strokeColor = 0x222222;
        this._kpiTF.stroke = 2;
        this._kpiTF.x = 25;
        this._kpiTF.y = 17;
        this._kpiTF.textColor = 0xFFA000;
        this._kpiTF.size = 24;
        this._kpiTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this._kpiTF.bold = true;

        /*
        this._players = new Array();
        var tempItem:PlayerDetailCom = new PlayerDetailCom();
        tempItem.x = 9;
        tempItem.y = 359;
        this.addChild(tempItem);
        this._players.push(tempItem);
        tempItem = new PlayerDetailCom();
        tempItem.x = 9;
        tempItem.y = 465;
        this.addChild(tempItem);
        this._players.push(tempItem);
        tempItem = new PlayerDetailCom();
        tempItem.x = 9;
        tempItem.y = 570;
        this.addChild(tempItem);
        this._players.push(tempItem);
        tempItem = new PlayerDetailCom();
        tempItem.x = 9;
        tempItem.y = 676;
        this.addChild(tempItem);
        this._players.push(tempItem);
        */

        this._itemList = new egret.gui.List();
        //this._itemList.dataProvider = myCollection;
        this._itemList.percentWidth = 100;
        this._itemList.percentHeight = 100;
        this.addChild(this._itemList);
        this._itemList.x = 9;
        this._itemList.y = 359;
        this._itemList.height = 460;
        this._itemList.itemRenderer = new egret.gui.ClassFactory(TeamItemRenderer);

        this.addChild(BottomCom.getInstance());
        BottomCom.getInstance().y = 829;

    }

    public initEvent():void{
        /*for(var i:number=0; i<this._players.length;i++){
            this._players[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
        }*/
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        User.getInstance().addEventListener(User.CHANGE, this.updateKpi, this)
    }

    public removeEvent():void{
        /*for(var i:number=0; i<this._players.length;i++){
            this._players[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
        }*/
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        User.getInstance().removeEventListener(User.CHANGE, this.updateKpi, this)
    }

}