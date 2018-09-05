/**
 * Created by yanmingjie on 2015/7/16.
 */
class HttpMatch{
    //请求的完整url
    private request_url:string;
    //回调函数返回请求url返回数据
    public callback:Function;
    //user
    private user:User;
    private role:RoleVo;
    //user的id
    private managerId:string;
    //user的数据
    private managerData:string;
    //user的名字
    private name:string;

    public static LoginSignFormat:string = "account={0}&time={1}&key={2}";

    public static ItemStoreSaveFormat:string = "storekey={0}&time={1}&key={2}";

    public static PayGetBillingIdFormat:string = "account={0}&time={1}&cash={2}&key={3}";

    public static PayChargeFormat:string = "chargeId={0}&billingId={1}&time={2}&status={3}&key={4}";

    public static PayConsumeFormat:string = "account={0}&orderId={1}&point={2}&mallCode={3}&time={4}&key={5}";

    public static LadderManagerInfoFormat:string = "managerId={0}&name={1}&managerData={2}&time={3}&key={4}";

    public static LadderReceivePrizeFormat:string = "managerId={0}&recordId={1}&time={2}&key={3}";

    public static LadderAttendFormat:string = "managerId={0}&name={1}&managerData={2}&time={3}&key={4}";

    public static LoginKey:string =  "4EE8-8370-0021BEABD3D1";

    public constructor(){
        this.init();
    }
    private init():void{
        this.user = User.getInstance();
        this.managerId = this.user.userId;
        this.name = this.user.userName;
    }

    //拼接经理数据(Hp@Attack@Defend@Crit@HitRate|Hp@Attack@Defend@Crit@HitRate)
    private getManagerData():string{
        this.role = this.user.role.createFighter();
        var length:number = this.user.team.length;
        var role_data:string = Math.round(this.role.hp) + "@"+ Math.round(this.role.attack) + "@" + Math.round(this.role.defend) + "@" + Math.round(this.role.crit) + "@" + Math.round(this.role.hitRate) + "@" + this.role.roleName +
            "@" + this.role.pic + "@" + this.role.fightPic;
        var role;
        var user = this.user;
        for(var i=0; i<length; i++){
            role = user.team[i].createFighter();
            if(role.state == 1){
                role_data = role_data + "|" + Math.round(role.hp) + "@" + Math.round(role.attack) + "@" + Math.round(role.defend) + "@" + Math.round(role.crit) + "@" + Math.round(role.hitRate) + "@" + role.roleName +
                    "@" + role.pic + "@" +  role.fightPic;
            }
        }
        return role_data;
    }
    //获取时间戳
    private getTime():number{
        var time = new Date();
        return time.getTime() /1000;
    }
    /**
     * 报名
     * m:经理id
     * n:经理名称
     * d:经理数据(Hp@Attack@Defend@Crit@HitRate)
     * t:时间戳
     * s:加密串,m,n,d,t 加密
     * k:KPI
     * l:荣誉等级
     **/
    public setChallengeUrl():void{
        var time = this.getTime();
        this.managerData = this.getManagerData();
        var s:string = SHA1.getInstance().hex_sha1( this.stringFormat([HttpMatch.LadderManagerInfoFormat, this.managerId, this.name, this.managerData, time, HttpMatch.LoginKey] ));
        this.request_url = AppConfig.httpRoot + "L.do?action=at&m=" + this.managerId + "&n=" + this.name + "&d=" + this.managerData + "&t=" + time + "&s=" + s + "&k=" + User.getInstance().kpi + "&l=" + User.getInstance().role.honorLv+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 取消报名
     * m:经理id
     **/
    public setCancelChallengeUrl():void{
        this.request_url = AppConfig.httpRoot + "L.do?action=le&m=" + this.managerId+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 轮询状态
     * m:经理id
     **/
    public setPullUrl( ):void{
        this.request_url = AppConfig.httpRoot + "L.do?action=ht&m=" + this.managerId+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 获取排行榜
     * m:经理id
     * rt:排行榜类型：1,天梯赛
     * pi:分页索引，从1开始
     * ps:每页显示数量
     **/
    public setRankingUrl(rt, pi, ps):void{
        this.request_url = AppConfig.httpRoot + "L.do?action=rk&m=" + this.managerId + "&rt=" + rt + "&pi=" + pi + "&ps=" + ps+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 领取奖励
     * m：经理id
     * r：奖励记录idx
     * t: 时间戳
     * s: 加密串,m,r,t 加密
     **/
    public setTakeUrl(r):void{
        var time = this.getTime();
        var s:string = SHA1.getInstance().hex_sha1( this.stringFormat([HttpMatch.LadderReceivePrizeFormat, this.managerId, r, time, HttpMatch.LoginKey] ));
        this.request_url = AppConfig.httpRoot + "L.do?action=rp&m=" + this.managerId + "&r=" + r  + "&t=" + time + "&s=" + s+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 未领取奖励
     * m：经理id
     **/
    public setNoTakeUrl():void{
        this.request_url = AppConfig.httpRoot + "L.do?action=sp&m=" + this.managerId+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 获取比赛
     * m：经理id
     * h：比赛id
     **/
    public setTakeMatchUrl(h):void{
        this.request_url = AppConfig.httpRoot + "L.do?action=gmh&m=" + this.managerId + "&h=" + h+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    /**
     * 获取天梯经理信息
     * m:经理id
     * n:经理名称
     * d:经理数据
     * t:时间戳
     * s:加密串,m,n,d,t 加密
     * k:经理的kpi
     **/
    public setTakeUserUrl():void{
        var time = this.getTime();
        this.managerData = this.getManagerData();
        var role = User.getInstance().role.createFighter;
        var s:string = SHA1.getInstance().hex_sha1( this.stringFormat([HttpMatch.LadderAttendFormat, this.managerId, this.name, this.managerData, time, HttpMatch.LoginKey] ));
        this.request_url = AppConfig.httpRoot + "L.do?action=mi&m=" + this.managerId + "&n=" + this.name + "&d=" + this.managerData + "&t=" + time + "&s=" + s +"&k=" + User.getInstance().kpi+"&ck="+AppConfig.cookie;
        this.sendGetRequest();
    }

    private sendGetRequest() {
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,onGetComplete,this);
        var request:egret.URLRequest = new egret.URLRequest(this.request_url);
        request.method = egret.URLRequestMethod.GET;
        request.data = new egret.URLVariables();
        loader.load(request);

        var _this = this;
        function onGetComplete(event:egret.Event):void {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            var data:egret.URLVariables = loader.data;
            return _this.callback( data );
        }
    }

    private stringFormat(arg){
        if (arg.length == 0)
            return null;
        var str = arg[0];
        for (var i = 1; i < arg.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arg[i]);
        }
        return str;
    }

    private static _instance:HttpMatch;
    public static getInstance():HttpMatch{
        if( !HttpMatch._instance ){
            HttpMatch._instance = new HttpMatch();
        }
        return HttpMatch._instance;
    }

}