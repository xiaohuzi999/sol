/**
 * Created by 马达加加加 on 2015/11/5.
 */
class WX{
    //
    public static appId:string = "";
    public static appSecret:string = "";
    private static _isRdy:boolean = false;
    public static init(appid:string, appSecret:string):void{
        WX.appId = appid;
        WX.appSecret = appSecret;

        var bodyConfig:BodyConfig = WX.getSignPackage();
        bodyConfig.appId = "game_qd";
        bodyConfig.debug = true;
        bodyConfig.timestamp = 0;
        bodyConfig.nonceStr = "";
        bodyConfig.signature = "";
        bodyConfig.jsApiList = ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"];
        /// ... 其他的配置属性赋值
        /// 通过config接口注入权限验证配置
        if(wx) {
            wx.config(bodyConfig);
            wx.ready(function () {
                WX._isRdy = true;
                alert("wx is rdy");
                /// 在这里调用微信相关功能的 API
            });
        }
    }

    public static share(title:string, link:string):void{
        if(!WX._isRdy){
            return;
        }
        wx.onMenuShareTimeline({
            title:title, // 分享标题
            link: link, // 分享链接
            imgUrl: '', // 分享图标
            trigger:null,
            success:function(){
                alert("success")
            },
            cancel: function(){
                alert("cancel")
            },
            fail:function(){
                alert("fail")
            }
        });
    }


    public static getSignPackage() {
        var jsapiTicket:string = WX.getJsApiTicket();

        // 注意 URL 一定要动态获取，不能 hardcode.
        //$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        var url:string = window.location.href.split("#")[0];

        var date:Date = new Date();
        var timestamp:string = Math.floor(date.getTime()/1000)+"";
        var nonceStr:string = WX.createNonceStr();

        // 这里参数的顺序要按照 key 值 ASCII 码升序排序
        var str:string = "jsapi_ticket="+jsapiTicket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+url;

        var signature = SHA1.getInstance().hex_sha1(str);
        var signPackage:any = {
            "appId"     : WX.appId,
            "nonceStr"  : nonceStr,
            "timestamp" : timestamp,
            "url"       : url,
            "signature" : signature,
            "rawString" : str
        };
        return signPackage;
    }

    private static createNonceStr(length = 16) {
        var chars:string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var str:string = "";
        for (var i:number = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random()*(chars.length- 1)));
        }
        return str;
    }

    private static jsapi_ticketData:any = {};
    private static getJsApiTicket():string {
        var date:Date = new Date();
        var time:number = Math.floor(date.getTime()/1000);
        // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
        if (WX.jsapi_ticketData.expire_time < time) {
            var accessToken:string = WX.getAccessToken();
            // 如果是企业号用以下 URL 获取 ticket
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=$accessToken";
            var url:string = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token="+accessToken;
            UserRequest.callServer(url, onGetTicket, null);

        }
        return WX.jsapi_ticketData.jsapi_ticket;

        function onGetTicket(res:any):void{
            if(res.ticket){
                WX.jsapi_ticketData.expire_time = time;
                WX.jsapi_ticketData.jsapi_ticket = res.ticket;
            }
        }
    }


    private static tokenData:any = {};
    private static getAccessToken() {
        // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
        var date:Date = new Date();
        var time:number = Math.floor(date.getTime()/1000);
        if (WX.tokenData.expire_time < time) {
            // 如果是企业号用以下URL获取access_token
            // $url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=$this->appId&corpsecret=$this->appSecret";
            var url:string = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+WX.appId+"&secret="+WX.appSecret;
            UserRequest.callServer(url, onGetToken, null);
        }

        function onGetToken(res:any):void{
            if (res.access_token) {
                WX.tokenData.expire_time = time + 7000;
                WX.tokenData.access_token = res.access_token;
            }
        }

        return WX.tokenData.access_token;
    }
}