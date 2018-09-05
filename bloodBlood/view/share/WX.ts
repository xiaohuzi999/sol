/**
 * Created by ���ӼӼ� on 2015/11/5.
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
        /// ... �������������Ը�ֵ
        /// ͨ��config�ӿ�ע��Ȩ����֤����
        if(wx) {
            wx.config(bodyConfig);
            wx.ready(function () {
                WX._isRdy = true;
                alert("wx is rdy");
                /// ���������΢����ع��ܵ� API
            });
        }
    }

    public static share(title:string, link:string):void{
        if(!WX._isRdy){
            return;
        }
        wx.onMenuShareTimeline({
            title:title, // �������
            link: link, // ��������
            imgUrl: '', // ����ͼ��
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

        // ע�� URL һ��Ҫ��̬��ȡ������ hardcode.
        //$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        var url:string = window.location.href.split("#")[0];

        var date:Date = new Date();
        var timestamp:string = Math.floor(date.getTime()/1000)+"";
        var nonceStr:string = WX.createNonceStr();

        // ���������˳��Ҫ���� key ֵ ASCII ����������
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
        // jsapi_ticket Ӧ��ȫ�ִ洢����£����´�����д�뵽�ļ�����ʾ��
        if (WX.jsapi_ticketData.expire_time < time) {
            var accessToken:string = WX.getAccessToken();
            // �������ҵ�������� URL ��ȡ ticket
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
        // access_token Ӧ��ȫ�ִ洢����£����´�����д�뵽�ļ�����ʾ��
        var date:Date = new Date();
        var time:number = Math.floor(date.getTime()/1000);
        if (WX.tokenData.expire_time < time) {
            // �������ҵ��������URL��ȡaccess_token
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