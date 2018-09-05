/**
 * Created by 马达加加加 on 2015/6/9.
 */
class EquipStrModel{
    //强化配置
    private static strDic:any =
    {
        0:{rate:100,money:2000, material:[{2:1}]},
        1:{rate:100,money:2000,material:[{2:1}]},
        2:{rate:95,money:2000,material:[{2:1}]},
        3:{rate:85,money:2000,material:[{2:1}]},
        4:{rate:80,money:2000,material:[{2:1}]},
        5:{rate:75,money:5000,material:[{2:2},{3:1}]},
        6:{rate:70,money:5000,material:[{2:2},{3:1}]},
        7:{rate:65,money:5000,material:[{2:2},{3:1}],exPro:{hitRate:15}},
        8:{rate:60,money:5000,material:[{2:2},{3:1}]},
        9:{rate:55,money:5000,material:[{2:2},{3:1}]},
        10:{rate:50,money:10000,material:[{2:3},{3:2},{4:1}]},
        11:{rate:45,money:10000,material:[{2:3},{3:2},{4:1}]},
        12:{rate:40,money:10000,material:[{2:3},{3:2},{4:1}]},
        13:{rate:35,money:10000,material:[{2:3},{3:2},{4:1}]},
        14:{rate:30,money:10000,material:[{2:3},{3:2},{4:1}],exPro:{crit:20}}
    }
    /**事件-强化成功*/
    public static STR_SUCCESS:string = "str_success";
    /** 强化失败 */
    public static STR_FAIL: string = "str_fail";

    /**获取强化需要的材料*/
    public static getStrMertial(lv:number):any{
        return EquipStrModel.strDic[lv];
    }

    /**强化道具*/
    public static str(item:ItemVo):void{
        var strInfo:any = EquipStrModel.getStrMertial(item.itemStrLv);
        var money:number = strInfo.money;
        //钱--
        if(User.getInstance().money < money){
            XAlert.show(Strings.MONEY_NOT_ENOUGH+",充点小钱玩玩", EquipStrModel.onRecharge, null, EquipStrModel);
            return;
        }
        User.getInstance().money -= money;
        //扣除材料
        var list:any[] = strInfo.material;
        for(var i in list){
            for(var j in list[i]){
                BagModel.delItemByNum(parseInt(j),list[i][j]);
            }
        }
        
        var rnd:number = Math.random() * 100;
        console.log("str rate..." + rnd);
        if(rnd <= strInfo.rate) {
            item.itemStrLv++;
            //数值
            if(!item.itemXProperty) {
                item.itemXProperty = {}
            }
            for(var i in item.itemProperty) {
                var tempObj: any = XUtils.addObject(item.itemProperty,item.itemXProperty)
                if(item.itemXProperty[i]) {
                    item.itemXProperty[i] += (tempObj[i] * 0.1);
                } else {
                    item.itemXProperty[i] = (item.itemProperty[i] * 0.1);
                }
            }
            //附加属性
            if(strInfo.exPro) {
                for(var i in strInfo.exPro) {
                    item.itemXProperty[i] = strInfo.exPro[i];
                }
            }
            //派发事件==================================================
            UserModel.updateKpi();
            UserModel.save();
            MainDispatcher.getInstance().dispatchEvent(new egret.Event(EquipStrModel.STR_SUCCESS));
        }
        else {
            //强化结果1-7之间时，强化失败不降级，强化结果8级以上时强化等级降低1级
            if(item.itemStrLv >= 0 && item.itemStrLv <= 6) {

            }
            else
            {
                item.itemStrLv--;
                //属性变化
                EquipStrModel.setItemPro(item);
            }
            XTip.showTip("很遗憾，强化失败！");
            MainDispatcher.getInstance().dispatchEvent(new egret.Event(EquipStrModel.STR_FAIL));
        }
    }

    private static onRecharge():void{
        MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
    }

    //强化属性结算
    private static setItemPro(item:ItemVo):void{
        item.itemXProperty = {};
        for(var j:number=0; j<item.itemStrLv; j++){
            for(var i in item.itemProperty) {
                var tempObj: any = XUtils.addObject(item.itemProperty,item.itemXProperty)
                if(item.itemXProperty[i]) {
                    item.itemXProperty[i] += (tempObj[i] * 0.1);
                } else {
                    item.itemXProperty[i] = (item.itemProperty[i] * 0.1);
                }
            }
        }

        //附加属性
        var strInfo:any= {};
        if(item.itemStrLv >= 14){
            strInfo = EquipStrModel.getStrMertial(14);
        }else if(item.itemStrLv >= 8){
            strInfo = EquipStrModel.getStrMertial(7);
        }
        if(strInfo.exPro) {
            for(var i in strInfo.exPro) {
                item.itemXProperty[i] = strInfo.exPro[i];
            }
        }
    }
}