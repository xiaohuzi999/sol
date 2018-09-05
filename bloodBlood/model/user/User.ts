/**
 * Created by Administrator on 15-5-30.
 * 用户类
 */
class User extends egret.EventDispatcher{
    //
    private _account:string;
    /**用户名*/
    private _userName:string = "殷血歌";
    /**头像*/
    private _pic: string = "";
    /**用户ID*/
    private _userId:string = "";
    /**等级*/
    private _lv:number = 0;
    /**天梯荣誉**/
    private _ladderHonor:number = 0;
    /**当前最大关卡*/
    private _chapterId:number=0;
    /**已经完成章节*/
    private _sectionId:number = -1;
    /**经验*/
    private _exp:number=0;
    /**游戏币*/
    private _money:number = 0;
    /**充值币*/
    private _point:number = 0;
    /**赠送币*/
    private _giftPoint:number = 0;
    /**行动力*/
    private _stamina:number = 0;
    /**最大行动力*/
    private _staminaMax:number;
    /**行动力回复时间*/
    private _resumeStaminaTime:number = -1;
    /**购买体力次数*/
    private _staminaBuyTimes:number = 0;
    /**购买体力时间*/
    private _staminaBuyTime:number = -1;
    /**战斗力*/
    private _kpi:number = 0;
    /**充值金额*/
    private _recharegeNum:number=0;
    /**是否领取过奖励*/
    private _hasReward:boolean=false;
    /**额外属性-是否领过充值双倍奖励*/
    private _rechargeGift_1:boolean=false;
    /**额外属性-是否领过充值双倍奖励*/
    private _rechargeGift_2:boolean=false;


    public role:RoleVo;
    /**阵容-雇佣兵列表*/
    private _team:RoleVo[] = new Array();
    /**本章节已任务列表*/
    private _taskList:string[] = new Array();
    /**分歧已选择列表*/
    private _diffList:string[] = new Array();
    /**已引导列表*/
    private _guideList:string[] = new Array();

    //临时参数，不存档,选章节用
    public nowChapId:number=-1;

    /**单例*/
    private static _instance:User;
    /**事件-属性变化*/
    public static CHANGE:string = "change";
    public constructor() {
        super();
    }

    /**新建*/
    public create():void{
        var info:any = JSON.parse(UserModel.create());
        this.role = new RoleVo();
        this.setValue(info);
        UserModel.updateKpi();
    }

    //获取服务端奖励
    public getReward():void{
        UserRequest.getReward(this.onGetReward, this)
    }

    private onGetReward(data:any):void{
        //console.log("getReward",data);
        if(data.Code == 0){
            if(data.Data.Money){
                this.money = data.Data.Money;
            }
            if(data.Data.Point){
                this.point = data.Data.Point;
            }
        }
    }

    //获取服务端奖励2补偿
    public getReward2():void{
        UserRequest.getReward2(this.onGetReward2, this)
    }

    private onGetReward2(data:any):void{
        if(data.Code == 0){
            if(data.Data.Status == 0){
                if(data.Data.Money){
                    this.money += parseInt(data.Data.Money);
                }
                if(data.Data.Point){
                    this.point += parseInt(data.Data.Point);
                    UserRequest.getBonus(data.Data.Point,null, null);
                }
                if(data.Data.Items != ""){
                    var list:string[] = (data.Data.Items+"").split("|");
                    var info:string[];
                    var itemCode:number;
                    for(var i:number=0; i<list.length; i++){
                        info = (list[i]+"").split(",");
                        itemCode = parseInt(info[0]);
                        if(info && info.length == 2){
                            if(itemCode == ItemData.WOOD){
                                FarmModel.getFarmInfo().woodNum += parseInt(info[1]);
                                FarmModel.save();
                            }else if(itemCode == ItemData.FOOD){
                                FarmModel.getFarmInfo().foodNum += parseInt(info[1]);
                                FarmModel.save();
                            }else{
                                BagModel.addItem(itemCode,parseInt(info[1]), true);
                            }
                        }
                    }
                }
                UserModel.save()
            }
        }
    }

    /**初始化*/
    public init(info:any = null):void{
        this.role = new RoleVo();
        if(!info){
            info = JSON.parse(UserModel.getData());
        }
        info.role = JSON.parse(info.role);
        this.setValue(info);
        //UserModel.updateKpi();
        if(User.getInstance().resumeStaminaTime == -1 && this.stamina < this.staminaMax){
            this.stamina = this.staminaMax;
        }
        UserModel.updateStamina(0, false);
        //console.log("读取",info);
    }

    public  setValue(data:any):void{
        for(var i in data){
            if( i == "role" ){
                this.role.setValue(data.role);
            }else if(i == "team"){
                this._team = [];
                var temp:RoleVo;
                for(var j:number=0; j< data.team.length; j++){
                    temp = new RoleVo();
                    temp.setValue(JSON.parse(data.team[j]));
                    this._team.push(temp);
                }
            }else{
                this["_"+i] = data[i];
            }
        }
        this.nowChapId = this.chapterId;
    }

    //
    public getJsonValue():string{
        var obj:any = {};
        obj.userName = this.userName;
        obj.pic = this.pic;
        obj.userId = this.userId;
        obj.lv = this.lv;
        obj.chapterId = this.chapterId;
        obj.sectionId = this.sectionId;
        obj.exp = this.exp;
        obj.money = this.money;
        obj.point = this.point;
        obj.giftPoint = this.giftPoint;
        obj.stamina = this.stamina;
        obj.resumeStaminaTime = this.resumeStaminaTime;
        obj.staminaBuyTimes = this.staminaBuyTimes;
        obj.staminaBuyTime = this.staminaBuyTime;
        obj.kpi = this.kpi;
        obj.taskList = this.taskList;
        obj.diffList = this.diffList;
        obj.guideList = this.guideList;
        obj.role = JSON.stringify(this.role);
        obj.honor = this.ladderHonor;
        obj.recharegeNum = this.recharegeNum;
        obj.hasReward = this.hasReward;
        obj.rechargeGift_1 = this.rechargeGift_1;
        obj.rechargeGift_2 = this.rechargeGift_2;
        obj.team = [];
        for(var i:number=0; i<this.team.length; i++){
            obj.team.push(JSON.stringify(this.team[i]));
        }
        return JSON.stringify(obj);
    }

    //set && get =====================================================================================================================================

    /**账号*/
    public set account(v:string){
        if(this._account != v){
            this._account = v;
        }
    }
    /**用户名*/
    public get account():string{
        return this._account;
    }

    /**用户名*/
    public set userName(v:string){
        if(this._userName != v){
            this._userName = v;
            this.dispatchEvent(new egret.Event(User.CHANGE));
        }
    }
    /**用户名*/
    public get userName():string{
        return this._userName;
    }

    /**头像*/
    public  set pic(v:string){
        if(this._pic != v){
            this._pic = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**头像*/
    public  get pic():string{
        return this._pic;
    }

    /**用户ID*/
    public  set userId(v:string){
        this._userId = v;
    }
    /**用户ID*/
    public  get userId():string{
        return this._userId;
    }

    /**天梯荣誉*/
    public  set ladderHonor(v:number){
        if(this._ladderHonor != v){
            this._ladderHonor = v;
            this.dispatchEvent(new egret.Event(User.CHANGE));
        }
    }
    /**天梯荣誉*/
    public  get ladderHonor():number{
        return this._ladderHonor;
    }

    /**等级*/
    public  set lv(v:number){
        if(this._lv != v){
            this._lv = v;
            this.dispatchEvent(new egret.Event(User.CHANGE));
        }
    }
    /**等级*/
    public  get lv():number{
        return Math.max(1,this._lv);
    }

    /***/
    public set chapterId(v:number){
        if(v > this._chapterId){
            this._chapterId = v;
        }
        this.dispatchEvent(new egret.Event(User.CHANGE));
    }
    //
    public get chapterId():number{
        return this._chapterId;
    }

    /***/
    public set sectionId(v:number){
        if(this._sectionId != v){
            this._sectionId = v;
        }
        this.dispatchEvent(new egret.Event(User.CHANGE));
    }
    //
    public get sectionId():number{
        return this._sectionId;
    }

    /**经验*/
    public  set exp(v:number){
        if(this._exp != v){
            this._exp = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**经验*/
    public  get exp():number{
        return this._exp;
    }

    /**升级经验*/
    public  get lvExp():number{
        return User.getLvExp(this._lv)
    }

    /**行动力*/
    public  set stamina(v:number){
        if(this._stamina != v){
            this._stamina = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**行动力*/
    public  get stamina():number{
        return this._stamina;
    }

    /**最大行动力*/
    public  get staminaMax():number{
        return 100+(this.role.honorLv-1)*5;
    }

    /**行动力回复时间*/
    public  set resumeStaminaTime(v:number){
        if(this._resumeStaminaTime != v){
            this._resumeStaminaTime = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**行动力回复时间*/
    public  get resumeStaminaTime():number{
        return this._resumeStaminaTime;
    }

    /**购买体力次数*/
    public set staminaBuyTimes(v:number){
        if(this._staminaBuyTimes != v){
            this._staminaBuyTimes = v;
        }
    }
    /**购买体力次数*/
    public  get staminaBuyTimes():number{
        return this._staminaBuyTimes;
    }

    /**购买体力次数*/
    public set staminaBuyTime(v:number){
        if(this._staminaBuyTime != v){
            this._staminaBuyTime = v;
        }
    }
    /**购买体力次数*/
    public  get staminaBuyTime():number{
        return this._staminaBuyTime;
    }

    /**战斗力*/
    public  set kpi(v:number){
        if(this._kpi != v){
            this._kpi = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**战斗力*/
    public  get kpi():number{
        return this._kpi;
    }

    /**游戏币*/
    public  set money(v:number){
        if(this._money != v){
            this._money = v;
            this._money = Math.max(0,this._money);
            this.dispatchEvent(new egret.Event(User.CHANGE));
        }
    }
    /**游戏币*/
    public  get money():number{
        return this._money;
    }

    /**充值币*/
    public  set point(v:number){
        if(this._point != v){
            this._point = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**充值币*/
    public  get point():number{
        return this._point;
    }

    /**赠送币*/
    public  set giftPoint(v:number){
        if(this._giftPoint != v){
            this._giftPoint = v;
            this.dispatchEvent(new egret.Event(User.CHANGE))
        }
    }
    /**赠送币*/
    public  get giftPoint():number{
        return this._giftPoint;
    }

    /**阵容-雇佣兵列表*/
    public  set team(v:any[]){
        this._team = v;
    }
    /**阵容-雇佣兵列表*/
    public  get team():any[]{
        return this._team;
    }

    /**
    * 当前完成剧情任务列表
    */
    public set taskList(v:any[]){
        this._taskList = v;
    }
    /**当前完成剧情任务列表*/
    public get taskList():any[]{
        return this._taskList;
    }

    /**
     * 当前完成分歧列表
     */
    public set diffList(v:any[]){
        this._diffList = v;
    }
    /**当前完成分歧列表*/
    public get diffList():any[]{
        return this._diffList;
    }

    /**
     * 当前完成引导
     */
    public set guideList(v:any[]){
        this._guideList = v;
    }
    /**当前完成引导列表*/
    public get guideList():any[]{
        return this._guideList;
    }

    /**充值金额*/
    public set recharegeNum(v:number){
        this._recharegeNum = v;
    }
    /**充值金额*/
    public get recharegeNum():number{
        return this._recharegeNum;
    }
    /**是否领取过奖励*/
    public set hasReward(v:boolean){
        this._hasReward = v;
    }
    /**是否领取过奖励*/
    public get hasReward():boolean{
        return this._hasReward
    }

    /**是否领取过充值奖励*/
    public set rechargeGift_1(v:boolean){
        this._rechargeGift_1 = v;
    }
    /**是否领取过充值奖励*/
    public get rechargeGift_1():boolean{
        return this._rechargeGift_1
    }

    /**是否领取过充值奖励*/
    public set rechargeGift_2(v:boolean){
        this._rechargeGift_2 = v;
    }
    /**是否领取过充值奖励*/
    public get rechargeGift_2():boolean{
        return this._rechargeGift_2
    }

    //获取单例
    public static  getInstance():User{
        if(!User._instance){
            User._instance = new User();
        }
        return User._instance;
    }
    /**升级经验*/
    public static getLvExp(lv:number){
        return parseInt((lv*lv*lv+60)/5*(lv*2+60)+"");
    }
}

