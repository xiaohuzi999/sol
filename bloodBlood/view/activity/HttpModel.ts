/**
 * Created by yanmingjie on 2015/8/24.
 */
class HttpModel{
    //用户名
    private static UID;
    //游戏名
    private static GAMEID:string = "gn=xg";

    public static init():void{
        HttpModel.UID = User.getInstance().userId;
    }

    //获取用户信息
    public static userInfo( callback:Function, thisobj:any ){
        var url = AppConfig.httpRoot + "Sh.do?action=gu&uid=" + User.getInstance().userId + "&" + HttpModel.GAMEID+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //根据分享码领取奖励,兑换奖品，提供参数：分享码
    public static shareCodePrize( callback:Function, thisobj:any, shareCode:string ){
        var url = AppConfig.httpRoot + "Sh.do?action=sp&uid=" + User.getInstance().userId  + "&" + HttpModel.GAMEID + "&sa=" + shareCode+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //分享后领取奖励
    public static sharePrize( callback:Function, thisobj:any ){
        var url = AppConfig.httpRoot + "Sh.do?action=ssp&uid=" + User.getInstance().userId + "&"  + HttpModel.GAMEID+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //获取签到信息http://180.150.178.193:8011/M.do?action=dai&proId=1&m=7af2d67b-d5cb-46b5-adf4-a4cf010985cf&n=dbbb1
    public static getSignInfo(callback:Function, thisobj:any ):void{
        var url = AppConfig.httpRoot + "M.do?action=dai&m=" + User.getInstance().userId + "&proId=1&n="  + User.getInstance().userName+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //签到http://180.150.178.193:8011/M.do?action=dap&proId=1&m=7af2d67b-d5cb-46b5-adf4-a4cf010985cf&n=dbb1
    public static sign(callback:Function, thisobj:any ):void{
        var url = AppConfig.httpRoot + "M.do?action=dap&m=" + User.getInstance().userId + "&proId=1&n="  + User.getInstance().userName+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //获取活动列表http://180.150.178.193:8011/ae.do?action=gal
    public static getActionList(callback:Function, thisobj:any):void{
        var url = AppConfig.httpRoot + "ae.do?action=gal"+"&ck="+AppConfig.cookie;;
        this.sendGetRequest(callback, thisobj, url);
    }

    //获取用户活动信息http://180.150.178.193:8011/ae.do?action=gua&m=7af2d67b-d5cb-46b5-adf4-a4cf010985cf&a=1
    public static getActionInfo(callback:Function, thisobj:any,actionId:any):void{
        var url = AppConfig.httpRoot + "ae.do?action=gua&m="+User.getInstance().userId+"&a="+actionId+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //领取奖励http://180.150.178.193:8011/ae.do?action=pr&m=&exr=
    public static getReward(callback:Function, thisobj:any,idx:any):void{
        var url = AppConfig.httpRoot + "ae.do?action=pr&m="+User.getInstance().userId+"&exr="+idx+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    //每日充值奖励http://180.150.178.193:8011/ae.do?action=sd&m=
    public static getDayChargeReward(callback:Function, thisobj:any):void{
        var url = AppConfig.httpRoot + "ae.do?action=sd&m="+User.getInstance().userId+"&ck="+AppConfig.cookie;
        this.sendGetRequest(callback, thisobj, url);
    }

    private static sendGetRequest(callback:Function, thisobj:any, url:string) {
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,onGetComplete,this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.GET;
        request.data = new egret.URLVariables();
        loader.load(request);

        function onGetComplete(event:egret.Event):void {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            var data:egret.URLVariables = loader.data;
            callback.apply(thisobj, [data]);
        }
    }


}