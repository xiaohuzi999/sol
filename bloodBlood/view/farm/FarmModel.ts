/**
 * Created by 马达加加加 on 2015/7/13.
 * 外务殿,民居,农田,矿场,林场
 * 麦子-木头,血奴;
 */
class FarmModel{
    //名字
    public static NAME:string = "farm";
    //数据
    public static vo:FarmVo;
    //建筑类型——外务殿
    public static HALL:string = "hall";
    //建筑类型——矿山
    public static MINE:string = "mine";
    //建筑类型——农田
    public static FIELD:string = "field";
    //建筑类型——民居
    public static HOUSE:string = "house";
    //建筑类型——木场
    public static WOOD:string = "wood";
    //建筑最高等级
    public static MAX_LV:number = 20;
    //事件-更新数量
    public static UPDATA_INFO:string = "update";

    //初始化-----------------------------------------
    public static init(data:string = "",needSave:boolean = true):void{
        FarmModel.getFarmInfo(data);
        if(needSave){
            FarmModel.save();
        }
    }

    /**获取数据*/
    public static getFarmInfo(data:string=""):FarmVo{
        /**不安全,11,23修改
        if(!data){
            data = FarmModel.getData();
        }
        **/
        if(data){
            if(!FarmModel.vo){
                FarmModel.vo = new FarmVo();
            }
            FarmModel.vo.setValue(JSON.parse(data));
            //消耗产出判定=======================
            //FarmModel.exec();
            /**
            var time:number = new Date().getTime();
            FarmModel.vo.time = time-10000000;
            FarmModel.vo.mineInfo.startTime = time-10000000;
            FarmModel.vo.fieldInfo.grids[0].startTime = time-10000000;
            FarmModel.vo.fieldInfo.grids[1].startTime = time-10000000;
            FarmModel.vo.hallInfo.startTime = time-10000000;
            FarmModel.vo.woodInfo.startTime = time-10000000;
             **/
            //FarmModel.vo.houseInfo.grids[0].startTime = time-10000000;
            //FarmModel.vo.houseInfo.grids[1].startTime = time-10000000;
            //FarmModel.vo.foodNum = 10000000000;
            //FarmModel.vo.personNum = 5;
        }else{
            if(!FarmModel.vo){
                FarmModel.vo = new FarmVo();
                var time:number = new Date().getTime();
                FarmModel.vo.time = time;
                FarmModel.vo.mineInfo.startTime = time-600000;
                FarmModel.vo.fieldInfo.grids[0].startTime = time;
                FarmModel.vo.fieldInfo.grids[1].startTime = time;
                FarmModel.vo.hallInfo.startTime = time-930000;
                FarmModel.vo.woodInfo.startTime = time-600000;
                FarmModel.vo.houseInfo.grids[0].startTime = time;
                FarmModel.vo.houseInfo.grids[1].startTime = time;
            }
        }
        return FarmModel.vo;
    }

    //保存信息
    public static save():void{
        var str:string = JSON.stringify(FarmModel.vo);
        egret.localStorage.setItem(FarmModel.NAME,str);
        UserRequest.callToSave();
    }

    //获取信息
    public static getData():string{
        return egret.localStorage.getItem(FarmModel.NAME);
    }

    //销毁记录
    public static dispose():void{
        egret.localStorage.removeItem(FarmModel.NAME);
    }

    //消耗计算，1分钟执行一次----
    public static exec():void{
        //粮耗------------------------------------------
    //	每个血奴需消耗小麦来维持生计，当小麦消耗完之后，血奴将在10分钟后死亡。每个血奴每1分钟需消耗5个小麦。
        //计算与上次执行的时间差-------------------------------
        var time:number = (new Date()).getTime();
        var delTime:number = parseInt((time - FarmModel.vo.time)/60000+"");
        var deltaTime:number = delTime;
        if(delTime < 1){
            return;
        }

        //记录执行时间--------------------------------------------------------------
        FarmModel.vo.time = FarmModel.vo.time + delTime*60000;
        //粮食增长计算==============================================
        info = FarmModel.vo.fieldInfo.grids;
        var totalM:number=0;
        var detalM:number;//产量
        for(var i:number=0; i<6; i++){
            if(!info[i].opened){
                break;
            }else{
                delTime = (time-info[i].startTime)/60000;
                totalM += FarmModel.getGainNum(FarmModel.FIELD, info[i].lv);
                if(delTime > 1){//有效生产
                    var n:number = parseInt(delTime+"");
                    detalM = FarmModel.getGainNum(FarmModel.FIELD, info[i].lv);
                    info[i].startTime = info[i].startTime + n*60000;
                    FarmModel.vo.foodNum += detalM*n*(1+FarmModel.vo.personNum*0.002);
                }
            }
        }
        //console.log(JSON.stringify(info),totalM,i);

        FarmModel.vo.foodNum = Math.round(FarmModel.vo.foodNum);
        //人口增长计算-------------------------------------------------------------------
        var info:any = FarmModel.vo.houseInfo.grids;
        var deltaPerson:number=0;
        var makeTime:number;//
        for(var i:number=0; i<6; i++){
            if(!info[i].opened){
                break;
            }else{
                makeTime = FarmModel.getGainNum(FarmModel.HOUSE, info[i].lv)*60000;
                delTime = time-info[i].startTime;
                if(delTime > makeTime){//有效生产
                    var n:number = parseInt(delTime/makeTime+"");
                    info[i].startTime = info[i].startTime + n*makeTime;
                    deltaPerson += n;
                }
            }
        }
        if(FarmModel.vo.foodNum<500){
            deltaPerson = Math.max(0,Math.floor(totalM/5) - FarmModel.vo.personNum);
            if(FarmModel.vo.foodNum<=totalM){
                //deltaPerson = Math.floor(totalM/5 - FarmModel.vo.personNum);
            }
        }
        FarmModel.vo.personNum += deltaPerson;
        //console.log(deltaPerson,"WTF", totalM,FarmModel.vo.personNum);


        //需要消耗的总量
        var needFood:number = deltaTime* FarmModel.vo.personNum*5;
        //还清上次所差的粮食
        //FarmModel.vo.foodNum = FarmModel.vo.foodNum - FarmModel.vo.borrowFood;
        FarmModel.vo.foodNum -= needFood;
        //10分钟粮耗----------------------------
        var foodTenMin:number = FarmModel.vo.personNum*5*10;//不需要
        //console.log("exec",FarmModel.vo.borrowFood,foodTenMin,"WTF",needFood,deltaTime);
        if(FarmModel.vo.foodNum < 0){// 粮食不够，逐步减少人口-10%递减，最低为粮食产量
            if(deltaTime>=10){//超过10分钟，人口回复到最低
                FarmModel.vo.personNum = Math.floor(totalM/5);
            }else{
                deltaPerson = Math.max(1,FarmModel.vo.personNum*0.1);
                //console.log(deltaPerson,"||",Math.floor(totalM/5))
                FarmModel.vo.personNum = Math.round(FarmModel.vo.personNum - deltaPerson);
                FarmModel.vo.personNum = Math.max(FarmModel.vo.personNum, Math.floor(totalM/5));
            }

            XTip.showTip("粮食过低，需要及时补充。");
            /*
            if(FarmModel.vo.foodNum < -foodTenMin){//断粮，全部死了
                FarmModel.vo.personNum = Math.floor(totalM/5);
                FarmModel.vo.borrowFood = 0;
            }else{//记录所差粮食===
                FarmModel.vo.borrowFood = -FarmModel.vo.foodNum;
                XTip.showTip("粮食过低，需要及时补充。")
            }
            */
            FarmModel.vo.foodNum = 0;
        }else{
            FarmModel.vo.borrowFood = 0;
        }
        MainDispatcher.getInstance().dispatchEventWith(FarmModel.UPDATA_INFO);
        FarmModel.save();
    }

    public static upBuilding(type:string,index:number=-1):boolean{
        var info:any = FarmModel.vo[type+"Info"];
        if(index != -1){
            info = info.grids[index];
        }
        var lv:number = info.lv;
        var time:number = (new Date()).getTime();
        var upTime:number = FarmModel.getUpTime(type,lv);
        //判定是否最大等级
        if(lv >= FarmModel.MAX_LV){
            XTip.showTip(Strings.BUILDING_LV_MAX);
            return false;
        }
        //判定外务殿等级
        if(type != FarmModel.HALL){
            var hallLv:number = FarmModel.vo.hallInfo.lv;
            if(lv >= hallLv){
                XTip.showTip(Strings.BUILDING_LV_ERR);
                return false;
            }
        }
        //判定是否升级中
        if(info.uping){
            var delTime:number;
            delTime = upTime - (time - info.upTime)/1000;
            if(delTime > 0 ){
                XTip.showTip(Strings.BUILDING_UPING_STR);
                return false
            }
        }
        //升级，获取材料
        var materialInfo:any = FarmModel.getMaterial(type, lv);
        if(User.getInstance().money < materialInfo.money){
            //XTip.showTip(Strings.MONEY_NOT_ENOUGH);
            XAlert.show(Strings.MONEY_NOT_ENOUGH+",充点小钱玩玩", FarmModel.onRecharge, null, FarmModel);
            return false;
        }
        if(FarmModel.vo.woodNum < materialInfo.wood){
            //XTip.showTip(Strings.WOOD_NOT_ENOUGH);
            XAlert.show(Strings.WOOD_NOT_ENOUGH+",充点小钱玩玩", FarmModel.onRecharge, null, FarmModel);
            return false;
        }
        //升级成功
        User.getInstance().money -= parseInt(materialInfo.money+"");
        FarmModel.vo.woodNum -= parseInt(materialInfo.wood+"");
        info.lv = (info.lv+1);
        info.upTime = time;
        info.uping = true;
        MainDispatcher.getInstance().dispatchEventWith(FarmModel.UPDATA_INFO);
        //植入新手引导======================
        if(!Guide.hasFinishedGuid(Guide.FRAM_GUIDE) && Guide.curGuide && Guide.curGuide instanceof FarmGuide) {
            User.getInstance().guideList.push(Guide.FRAM_GUIDE);
        }

        FarmModel.save();
        UserModel.save();
        return true;
    }

    private static onRecharge():void{
        MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
    }

    //扩建
    public static expand(type:string, callback:Function, thisObj:any):void{
        var info:any = FarmModel.vo[type+"Info"];
        var index:number=0;
        for(var i:number=0; i<6; i++) {
            if (info.grids[i].opened == false) {
                index=i;
                break;
            }
        }
        var point:number = 10*(index-1);
        if(User.getInstance().point < point){
            XTip.showTip(Strings.POINT_NOT_ENOUGH);
            return;
        }
        User.getInstance().point -= point;
        var str:string = "Farm Expand";
        UserRequest.cosumePoint(point,str,null, null);
        UserModel.save();
        for(var i:number=0; i<6; i++){
            if(info.grids[i].opened == false){
                info.grids[i].opened = true;
                info.grids[i].startTime = (new Date()).getTime();
                FarmModel.save();
                callback.apply(thisObj,[info.grids]);
                return;
            }
        }
    }

    //收获
    public static gain(type:string, index:number = -1):boolean{
        var info:any = FarmModel.vo[type+"Info"];
        if(index != -1){
            info = info.grids[index];
        }
        var mNum:number = FarmModel.getGainNum(type, info.lv);
        var time:number = (new Date()).getTime();
        var delTime:number = parseInt((time - info.startTime)/60000 + "");
        delTime = Math.min(delTime,1440);
        if(delTime < 1){
            XTip.showTip(Strings.GAIN_NOT_TIME);
            return false;
        }
        var num:number = Math.round(parseFloat(delTime*mNum + ""));
        //每多1个血奴增加0.2%的产量
        switch (type){
            case FarmModel.FIELD:
                FarmModel.vo.foodNum  = FarmModel.vo.foodNum + num;
                MainDispatcher.getInstance().dispatchEventWith(FarmModel.UPDATA_INFO);
                XTip.showTip(Strings.FOOD+"+"+num);
                break;
            case FarmModel.WOOD:
                num = parseInt(num*(1+FarmModel.vo.personNum*0.002)+"");
                FarmModel.vo.woodNum  = FarmModel.vo.woodNum + num;
                XTip.showTip(Strings.WOOD+"+"+num);
                MainDispatcher.getInstance().dispatchEventWith(FarmModel.UPDATA_INFO);
                break;
            case FarmModel.HALL:
                BagModel.addItem(ItemData.BLOOD, num);
                XTip.showTip(Strings.BLOOD+"+"+num);
                break;
            case FarmModel.MINE:
                num = parseInt(num*(1+FarmModel.vo.personNum*0.002)+"");
                XTip.showTip(Strings.MONEY+"+"+num)
                User.getInstance().money = User.getInstance().money+num;
                break
        }
        //重新设定时间===
        info.startTime = time;
        FarmModel.save();
        UserModel.save();
        return true
    }

    /**获取建筑升级材料*/
    public static getMaterial(type:string, lv:number):any{
        var info:any = FarmModel._materialData[type];
        return {"wood":info.wood*lv, "money":info.money*lv};
    }

    /**获取建筑产量*/
    public static getGainNum(type:string, lv:number):number{
        if(type == FarmModel.HALL){
            return 60/Math.max(60,(900-10*FarmModel.vo.personNum));//每个血奴-10秒;
        }
        return FarmModel._gainData[type][lv-1];
    }

    /**获取建筑升级时间*/
    public static getUpTime(type:string, lv:number):number{
        return 0;
        return FarmModel._upTimeData[type][lv];
    }

    //升级材料
    private static _materialData:any =
    {
        "hall":{"wood":800,"money":5000},
        "house":{"wood":200,"money":2000},
        "field":{"wood":100,"money":1000},
        "mine":{"wood":500,"money":3000},
        "wood":{"wood":600,"money":2000}
    }

    //升级时间
    private static _upTimeData:any =
    {
        "hall":[20,60,180,480,900,1800,3600,7200,14400,21600,28800,43200,64800,72000,86400,100800,115200,129600,144000,162000],
        "house":[10,30,90,180,490,900,1800,2700,3600,7200,14400,21600,28800,36000,43200,50400,57600,64800,72000,86400],
        "field":[10,30,90,180,490,900,1800,2700,3600,7200,14400,21600,28800,36000,43200,50400,57600,64800,72000,86400],
        "mine":[15,50,120,300,600,1200,2700,3600,5400,7200,18000,28800,43200,64800,72000,86400,100800,115200,129600,144000],
        "wood":[15,50,120,300,600,1200,2700,3600,5400,7200,18000,28800,43200,64800,72000,86400,100800,115200,129600,144000]
    }

    //产出
    private static _gainData:any =
    {
        "house":[30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11],
        "field":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25],
        "mine":[10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48],
        "wood":[10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48]
    }
}

//
class FarmVo{
    //木头数量
    public woodNum:number = 1000;
    //血奴数量
    public personNum:number = 0;
    //麦子
    public foodNum:number = 1000;
    //上次系统执行时间
    public time:number;
    //人口计算时间
    public personTime:number;
    //欠系统的粮食
    public borrowFood:number=0;
    //外务殿信息
    public hallInfo:any = {"lv":1,"upTime":-1,"startTime":-1,"uping":false};
    //居民信息
    public houseInfo:any = {"lv":1,"canUp":true,"grids":
    {
        "0":{lv:1,opened:true,"upTime":-1,"startTime":-1,"uping":false},
        "1":{lv:1,opened:true,"upTime":-1,"startTime":-1,"uping":false},
        "2":{lv:1,opened:false,"upTime":-1,"startTime":-1,"uping":false},
        "3":{lv:1,opened:false,"upTime":-1,"startTime":-1,"uping":false},
        "4":{lv:1,opened:false,"upTime":-1,"startTime":-1,"uping":false},
        "5":{lv:1,opened:false,"upTime":-1,"startTime":-1,"uping":false}
    }};
    //农田信息
    public fieldInfo:any = {"lv":1,"canUp":true,"grids":
        {
            "0":{lv:1,opened:true,"startTime":-1,"upTime":-1,"uping":false},
            "1":{lv:1,opened:true,"startTime":-1,"upTime":-1,"uping":false},
            "2":{lv:1,opened:false,"startTime":-1,"upTime":-1,"uping":false},
            "3":{lv:1,opened:false,"startTime":-1,"upTime":-1,"uping":false},
            "4":{lv:1,opened:false,"startTime":-1,"upTime":-1,"uping":false},
            "5":{lv:1,opened:false,"startTime":-1,"upTime":-1,"uping":false}
        }
    };
    //矿山信息
    public mineInfo:any = {"lv":1,"startTime":-1,"upTime":-1,"uping":false};
    //牧场信息
    public woodInfo:any= {"lv":1,"startTime":-1,"upTime":-1,"uping":false};

    public setValue(obj:any):void{
        for(var i in obj){
            this[i] = obj[i];
        }
    }
}