/**
 * Created by 马达加加加 on 2015/6/15.
 */
class TeamModel{
    
    private static data:any;
    //单个精血的
    public static HORNOR:number = 10;
    //最大阶
    public static MAX_LV:number = 13;
    //最大队伍人数
    public static MAX_TEAM_NUM:number = 4;
    //初始化成长信息
    public static initGrowData(str:string):void{
        TeamModel.data = JSON.parse(str);
    }

    /**获取成长信息*/
    public static getGrowData(honorLv:number):any {
        return TeamModel.data[honorLv];
    }

    private static gotoMall(): void
    { 
        GrowUpView.getInstance().close();
        MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_MALL));
    }
    
    /**成长一次*/
    public static growUP(role:RoleVo):boolean{
        /*if(role.honorLv == TeamModel.MAX_LV){
            XTip.showTip("已达到满阶。")
            return false;
        }*/
        //抓数据
        var info:any = TeamModel.getGrowData(role.honorLv);
        if(role.honor == info.honor){
            XTip.showTip(Strings.FULL_XIUWEI);
            return false;
        }
        //扣道具
        var num:number = BagModel.getItemNum(ItemData.BLOOD);
        if(num < info.bloodNum){
            XAlert.show(Strings.BLOOD_NOT_ENOUGH, this.gotoMall, null, this);
            return false;
        }
        BagModel.delItemByNum(ItemData.BLOOD,info.bloodNum);
        //加属性
        role.physique += role.physiqueGrow*info.growUpNum;
        role.attack += role.attackGrow*info.growUpNum;
        role.defend += role.defendGrow*info.growUpNum;
        role.agility += role.agilityGrow*info.growUpNum;
        //加修为
        role.honor += TeamModel.HORNOR*info.bloodNum;
        //判定新手引导
        if(!Guide.hasFinishedGuid(Guide.GROW_GUIDE)){
            if(Guide.curGuide){
                Guide.curGuide.onTouch3();
            }
            User.getInstance().guideList.push(Guide.GROW_GUIDE);
        }
        //保存
        UserModel.updateKpi();
        UserModel.save();
        return true;
    }

    //一键
    public static growUPOnce(role:RoleVo):boolean{
       /* if(role.honorLv == TeamModel.MAX_LV){
            XTip.showTip("已达到满阶。")
            return false;
        }*/
        //抓数据
        var info:any = TeamModel.getGrowData(role.honorLv);
        if(role.honor == info.honor){
            XTip.showTip(Strings.FULL_XIUWEI);
            return false;
        }
        //扣道具
        var num:number = BagModel.getItemNum(ItemData.BLOOD);
        if(num < info.bloodNum){
                XAlert.show(Strings.BLOOD_NOT_ENOUGH, this.gotoMall, null, this);
            return false;
        }
        //自动计算出道具
        var itemNum:number = (info.honor - role.honor)/10;
        itemNum = Math.min(itemNum, num);
        //能自动的次数
        var times:number = parseInt(itemNum/info.bloodNum+"");
        itemNum = times*info.bloodNum;
        BagModel.delItemByNum(ItemData.BLOOD,itemNum);
        //加属性,修为
        var index:number;
        for(var i:number=0; i<times; i++){
            role.physique += role.physiqueGrow*info.growUpNum;
            role.attack += role.attackGrow*info.growUpNum;
            role.defend += role.defendGrow*info.growUpNum;
            role.agility += role.agilityGrow*info.growUpNum;
            role.honor += TeamModel.HORNOR*info.bloodNum;
        }
        //判定新手引导
        if(!Guide.hasFinishedGuid(Guide.GROW_GUIDE)){
            if(Guide.curGuide){
                Guide.curGuide.onTouch3();
            }
            User.getInstance().guideList.push(Guide.GROW_GUIDE);
        }
        //保存
        UserModel.updateKpi();
        UserModel.save();
        return true;
    }


    /**突破*/
    public static growBreak(role:RoleVo):boolean{
        if(role.honorLv == TeamModel.MAX_LV){
            XTip.showTip(Strings.MAX_HONOR_LV);
            return false;
        }
        //抓数据
        var info:any = TeamModel.getGrowData(role.honorLv);
        //扣金币
        if(User.getInstance().money < info.money){
            XTip.showTip(Strings.MONEY_NOT_ENOUGH);
            return false;
        }
        User.getInstance().money -= info.money;
        //加属性
        role.physique += info.breakFeed;
        role.attack += info.breakFeed;
        role.defend += info.breakFeed;
        role.agility += info.breakFeed;
        //改修为
        role.honor = 0;
        role.honorLv += 1;
        //恢复体力
        if(role.roleId == User.getInstance().role.roleId){
            UserModel.updateStamina(10)
        }
        //保存
        UserModel.updateKpi();
        UserModel.save();
        return true;
    }

    /**战斗或休息*/
    public static changeState(role:RoleVo, callback:Function, thisObj:any):void{
        if(role.state == 0){
            var num:number = 1;
            for(var i:number=0; i<User.getInstance().team.length; i++){
                if(User.getInstance().team[i].state == 1){
                    num ++;
                }
            }
            if(num < TeamModel.MAX_TEAM_NUM){
                role.state = 1;
            }else{
                XTip.showTip("参战人员已达上限！")
                return;
            }
        }else{
            role.state = 0;
        }
        UserModel.updateKpi();
        callback.apply(thisObj, null);
        UserModel.save();
    }

    private static honorResArr: Array<string> = ["zhizi", "xingzhanshi", "yuezhanshi", "yezhanshi",
        "nanjue", "zijue", "bojue", "houjue", "gongjue", "qianniangongjue", "qinwang", "xuedi", "xueshen"];
    public static getHonorRes(honorLv: number): string
    { 
        return AppConfig.imgURL+"resource/assets/ui/honor/" + this.honorResArr[honorLv] + ".png";
    }
    
    /**获取星阶TX*/
    public static getRES(hornorLv:number):string{
        switch (hornorLv){
            case 1:
                return "zhizi_s";
            case 2:
                return "xingzhanshi_s";
            case 3:
                return "yuezhanshi_s";
            case 4:
                return "yezhanshi_s";
            case 5:
                return "nanjue_s";
            case 6:
                return "zijue_s";
            case 7:
                return "bojue_s";
            case 8:
                return "houjue_s";
            case 9:
                return "gongjue_s";
            case 10:
                return "qianniangongjue_s";
            case 11:
                return "qinwang_s";
            case 12:
                return "xuedi_s";
            case 13:
                return "xueshen_s";
        }
        return "xingzhanshi_s";
    }

    /**获取星阶颜色*/
    public static getColor(hornorLv:number):string{
        switch (hornorLv){
            case 1:
            case 2:
            case 3:
            case 4:
                return "52ac02";
            case 5:
            case 6:
            case 7:
            case 8:
                return "008de6";
            case 9:
            case 10:
            case 11:
                return "c80dcf";
            case 12:
            case 13:
                return "f3ce00";
        }
        return "52ac02";
    }
}
