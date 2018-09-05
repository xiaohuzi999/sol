/**
 * Created by 马达加加加 on 2015/10/15.
 */
class UserRequest{
    //产品ID
    private static PRO_ID:string = "1001";
    /**登陆 http://180.150.178.193:8011/M.do?action=l&a=&t=&s=*/
    public static login(callback:Function, thisObj:any):void{
        var time = (new Date()).getTime()/1000;
        var s:string = "account="+AppConfig.account+"&time="+time+"&key="+HttpMatch.LoginKey;
        s = SHA1.getInstance().hex_sha1(s);
        var url:string = AppConfig.httpRoot + "M.do?action=l&a=" + AppConfig.account + "&t="+time+"&s="+s+"&ck="+AppConfig.cookie;
        this.callServer(url,callback,thisObj);
    }

    //获取经理信息action=mi&ck={}&r=
    public static getManagrInfo(callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=mi&ck="+AppConfig.cookie+"&r="+Math.random();
        this.callServer(url,callback,thisObj);
    }

    //领取奖励http://180.150.178.193:8011/M.do?action=ig&m=111
    public static getReward(callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=ig&m=" + User.getInstance().userId+"&ck="+AppConfig.cookie;
        this.callServer(url,callback,thisObj);
    }

    //领取奖励http://180.150.178.193:8011/m.do?action=rml
    public static getReward2(callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=rml&a="+AppConfig.account+"&ck="+AppConfig.cookie;
        this.callServer(url,callback,thisObj);
    }

    //获得奖励点券
    public static getBonus(bonus:number,callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=ab&a="+AppConfig.account+"&b="+bonus+"&ck="+AppConfig.cookie;
        this.callServer(url,callback,thisObj);
    }

    //消耗点券
    public static cosumePoint(point:any,type:string,callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=cspoint&a="+AppConfig.account+"&p="+point+"&meno="+type+"&ck="+AppConfig.cookie;
        this.callServer(url,callback,thisObj);
    }

    //注册角色http://180.150.178.193:8011/M.do?action=rm&proId=&a=&n=&l=&e=
    public static create(callback:Function, thisObj:any):void{
        var time = (new Date()).getTime()/1000;
        var str:string = User.getInstance().getJsonValue();
        var data:any = JSON.parse(str);
        data.OnLineTick = 0;
        data.MonsterKilledNum = 0;
        data.bag = BagModel.getJsonStr();
        data.farm = JSON.stringify(FarmModel.vo);

        var val:any = new egret.URLVariables("action=rm&proId=" +UserRequest.PRO_ID+"&a="+AppConfig.account+"&n="+User.getInstance().userName + "&l=0&e="+JSON.stringify(data)+"&ck="+AppConfig.cookie);

        var url:string = AppConfig.httpRoot + "M.do?r="+Math.random();
        this.callServer(url,callback,thisObj,val);
    }

    //呼叫保存策略，0.3秒之内只保存一次==
    private static saveId:number = -1;
    public static callToSave():void{
        if(UserRequest.saveId == -1){
            //console.log("callToSave->");
            UserRequest.saveId = egret.setTimeout(UserRequest.save, UserRequest, 80);
        }
    }

    //保存数据http://180.150.178.193:8011/M.do?action=se&m=&e=
    public static save(callback:Function, thisObj:any):void{
        UserRequest.saveId = -1;
        //单位，分钟
        var onlineTime:number = (egret.getTimer() - AppConfig.startTime)/60000 + AppConfig.loginTime;
        //console.log("call save==============");
        var time = (new Date()).getTime()/1000;
        time = Math.floor(time);
        //等级|经验|战力|Vip|灵气|登陆时长|击杀怪物数量，已改
        //var data:any = "0|0|"+User.getInstance().kpi+"|0|0|"+onlineTime+"|0";

        var str:string = User.getInstance().getJsonValue();
        var data:any = JSON.parse(str);
        data.OnLineTick = onlineTime;
        data.MonsterKilledNum = 0;
        data.bag = BagModel.getJsonStr();
        data.farm = JSON.stringify(FarmModel.vo);
        data = JSON.stringify(data);

        var s:string = "managerId="+User.getInstance().userId+"&e="+data+"&time="+time+"&key="+HttpMatch.LoginKey;
        s = SHA1.getInstance().hex_sha1(s);

        var val:any = new egret.URLVariables("action=se&m=" + User.getInstance().userId + "&e=" + data+"&t="+ time +"&s="+s+"&ck="+AppConfig.cookie);

        //var url:string = AppConfig.httpRoot + "M.do?action=se&m=" + User.getInstance().userId + "&e=" + data+"&t="+ time +"&s="+s;
        var url:string = AppConfig.httpRoot + "M.do?r="+Math.random();

        if(callback == null){
            callback = UserRequest.onSave;
            thisObj = UserRequest;
        }
        this.callServer(url,callback,thisObj,val);
    }

    private static onSave(data:any):void{
        if(data.Code == DBMessage.NO_LOGIN){
            XAlert.show("登录超时！", null, null, null);
        }else if(data.Code == DBMessage.COOKIE_OUT){
            XAlert.show("您的账号在其他地方登录！", null, null, null);
        }
    }

    //扣除荣誉180.150.178.193:8011/m.do?action=ch&h=2&m=1B2EE632-0428-070D-C617-CA1F088C51BC
    public static consumeHonor(honor:number,callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=ch&h="+honor+"&m="+User.getInstance().userId+"&ck="+AppConfig.cookie;
        this.callServer(url,callback,thisObj);
    }

    //获得通知
    public static getNotice(callback:Function, thisObj:any):void{
        var url:string = AppConfig.httpRoot + "M.do?action=news"+"&ck="+AppConfig.cookie+"&r="+Math.random();
        this.callServer(url,callback,thisObj);
    }


    /** 暂时使用，白鹭2.5以后可以换成egret.HttpRequest*/
    public static callServer(url:string,callback:Function, thisObj:any,val:egret.URLVariables=null):void{
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,onGetComplete,this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        if(val){
            request.data = val;
            request.method = egret.URLRequestMethod.POST;
        }else{
            request.method = egret.URLRequestMethod.GET;
        }
        loader.load(request);

        function onGetComplete(event:egret.Event):void {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            loader.removeEventListener(egret.Event.COMPLETE,onGetComplete,this);
            var data:egret.URLVariables = loader.data;
            data = JSON.parse(data+"");
            if(callback != null){
                callback.apply(thisObj, [data]);
            }
        }
    }
}