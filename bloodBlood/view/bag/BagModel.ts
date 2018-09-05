/**
 * Created by Administrator on 15-6-3.
 * 背包
 */
class BagModel{
    public static items:ItemVo[] = [];
    public static NAME:string = "BagModel";

    /**初始化*/
    public static create():void{
        //BagModel.addItem(1,30000);
        //BagModel.addItem(2,1110)
        //BagModel.addItem(3,1110)
        //BagModel.addItem(4,1110)
        BagModel.addItem(5,5,false);
        //BagModel.addItem(6,110)
    }

    /**获取数据*/
    public static init(str:string = ""):void{
        /*** 11.23注释掉，不安全
        if(!str){
            str = BagModel.getData();
        }
        */
        var list:any[] = JSON.parse(str);
        BagModel.items = [];
        if(list){
            var vo:ItemVo;
            for(var i:number=0; i<list.length; i++){
                vo = new ItemVo();
                vo.setValue(ItemData.getItemData(list[i].itemCode));
                vo.setValue(list[i]);
                BagModel.items.push(vo);
            }
        }
    }

    /**获取JSON数据*/
    public static getJsonStr():string{
        var arr:any[] = [];
        var info:any;
        for(var i:number=0; i<BagModel.items.length; i++){
            info = {};
            info.itemCode = BagModel.items[i].itemCode;
            info.itemId = BagModel.items[i].itemId;
            info.itemNum = BagModel.items[i].itemNum;
            info.itemProperty = BagModel.items[i].itemProperty;
            info.itemXProperty = BagModel.items[i].itemXProperty;
            info.itemStrLv = BagModel.items[i].itemStrLv;
            info.masterId = BagModel.items[i].masterId;
            arr.push(info)
        }
        return JSON.stringify(arr);
    }

    /**
     * 获取背包数据----没有保存数据
     * @param callback 回调
     * @param target 回调作用域
     * */
    public static getInfo(callback:Function, target:any):void{
        var list:ItemVo[] = new Array();
        for(var i:number=0; i<BagModel.items.length; i++){
            if(!BagModel.items[i].masterId){
                list.push(BagModel.items[i])
            }
        }
        //console.log("0=",list);
        callback.apply(target,[list]);
    }

    /**
     * 根据道具类型获取道具
     * @param itemCode 道具ID
     * */
    public static getItemByType(type:number):ItemVo[]{
        var arr:ItemVo[] = new Array();
        for(var i:number=0; i<BagModel.items.length; i++){
            if(BagModel.items[i].itemType == type){
                arr.push(BagModel.items[i]);
            }
        }
        return arr;
    }

    /**
     * 根据道具ID获取道具
     * @param itemCode 道具ID
     * */
    public static getItemById(itemCode:number):ItemVo[]{
        var arr:ItemVo[] = [];
        for(var i:number=0; i<BagModel.items.length; i++){
            if(BagModel.items[i].itemCode == itemCode){
                arr.push(BagModel.items[i]);
            }
        }
        return arr;
    }

    /**根据道具ID获取道具数量*/
    public static getItemNum(itemCode:number):number{
        var list:ItemVo[] = BagModel.getItemById(itemCode);
        var num:number = 0;
        for(var i:number=0; i<list.length; i++){
            num += list[i].itemNum;
        }
        return num;
    }

    /**
     *根据UUID获取道具-------------------------
     *@param itemId 道具用户ID
     **/
    public static getItemByUUid(itemId:string):ItemVo{
        for(var i:number=0; i<BagModel.items.length; i++){
            if(BagModel.items[i].itemId == itemId){
                return BagModel.items[i]
            }
        }
        return null
    }

    /**
     * 加入道具
     * @param itemCode 道具ID
     * @param itemNum 道具数量
     * @param needSave 是否需要保存，默认为需要
     * @return 道具VO,如果是新建的话
     * */
    public static addItem(itemCode:number, itemNum:number=1,needSave:boolean=true):ItemVo{
        //如果是可可以叠加的-修改数量=否者新生成
        var tempVo:ItemVo;
        var tempVo:ItemVo = ItemData.getItemData(itemCode);

        //如果是装备，唯一,新增代码
        if(tempVo.itemType == ItemType.EQUIP){
            if(BagModel.getItemById(itemCode).length > 0){
                return;
            }
        }

        if(tempVo.maxNum > 1){//可以叠加
            var list:ItemVo[] = BagModel.getItemById(itemCode);
            for(var i:number=0; i<list.length; i++){
                var tempNum:number = list[i].maxNum - list[i].itemNum;
                if(tempNum > 0){//可加
                    if(itemNum <= tempNum){//可以加完
                        list[i].itemNum = list[i].itemNum + parseInt(itemNum+"");
                        BagModel.save(needSave);
                        return null;
                    }else{
                        list[i].itemNum += tempNum;
                        itemNum -= tempNum;
                    }
                }
            }
            //
            while(itemNum > 0){
                tempNum = Math.min(itemNum, tempVo.maxNum);
                tempVo = ItemManager.createItem(itemCode, tempNum);
                BagModel.items.push(tempVo);
                itemNum -= tempNum;
            }
        }else{
            tempVo = ItemManager.createItem(itemCode, itemNum);
            BagModel.items.push(tempVo)
        }
        BagModel.save(needSave);
        return tempVo;
    }

    /**
     * 删除道具
     * @param itemId 道具唯一ID
     * */
    public static delItem(itemId:string):any{
        for(var i:number=0; i<BagModel.items.length; i++){
            if(BagModel.items[i].itemId == itemId){
                return BagModel.items.splice(i,1)
            }
        }
        BagModel.save();
        return null;
    }

    /**
     * 删除道具2
     * @param itemCode 道具ID;
     * @param itemNum 道具数量
     * */
    public static delItemByNum(itemCode:number, itemNum:number):void{
        for(var i:number=0; i<BagModel.items.length; i++){
            if(BagModel.items[i].itemCode == itemCode){
                var tempNum:number = itemNum - BagModel.items[i].itemNum;
                BagModel.items[i].itemNum -= itemNum;
                if(BagModel.items[i].itemNum <= 0){//扣完，收工；
                    BagModel.items.splice(i,1);
                    i--;
                }
                itemNum = tempNum;
                if(itemNum<=0){
                    BagModel.save();
                    return;
                }
            }
        }
    }

    /**使用道具*/
    public static useItem(vo:ItemVo,callback:Function, thisObj:any):void{
        if(vo.itemType == ItemType.EQUIP){
            //去装备
            BagView.getInstance().close();
            MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_EQUIP));
        }else if(vo.itemType == ItemType.MEDICINE){
            XTip.showTip("补给类物品在战斗中使用");
        }else{
            if(vo.itemCode == ItemData.BLOOD){
                BagView.getInstance().close();
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_TEAM));
            }else if(vo.itemCode == ItemData.MONEY_0){
                var num:number = vo.itemEffectValue*vo.itemNum;
                User.getInstance().money += num;
                XTip.showTip("使用成功,获得"+Strings.MONEY+num);
                callback.apply(thisObj,null);
                UserModel.save();
                BagModel.save();
            }else {
                XTip.showTip("道具效果开发中~敬请期待~");
            }
        }
    }

    /**装备道具,建立关联对象-----------------------------
     * @param vo 道具
     * @param role 角色
     */

    public static equipItem(vo:ItemVo, role:RoleVo):boolean{
        //console.log(vo.itemId,role.weapon);
        //装备先扒下,如果是本来的装备，就只脱下===============================
        if(vo.masterId){
            if(role.weapon == vo.itemId){//装备卸下
                //console.log("只卸下");
                role.weapon = "";
                vo.masterId = "";
                UserModel.updateKpi();
                UserModel.save();
                BagModel.save();
                return true;
            }else{
                var tempRole:RoleVo = UserModel.getRole(vo.masterId);
                //console.log(tempRole.roleName+"卸下");
                if(tempRole){
                    tempRole.weapon = "";
                    vo.masterId = "";
                }else{
                    //console.log("数据异常，装备的角色找不到。");
                }
            }
        }
        //穿上装备=================================
        if(role.weapon){//已装备
            if(role.weapon == vo.itemId){//装备卸下
                //console.log("只卸下");
                role.weapon = "";
                vo.masterId = "";
            }else{//换装备
                //换上
                var tempVo:ItemVo = BagModel.getItemByUUid(role.weapon);
                //console.log("卸下"+tempVo.itemName);
                if(tempVo){
                    tempVo.masterId = "";
                }else{
                    //console.log("数据异常，装备丢失");
                    //alert("数据出错~装备"+role.weapon+"丢失");
                }
                role.weapon = vo.itemId;
                vo.masterId = role.roleId;
            }
        }else{
            //console.log("空，穿装备");
            role.weapon = vo.itemId;
            vo.masterId = role.roleId;
        }
        //判定新手引导
        if(!Guide.hasFinishedGuid(Guide.EQUIP_GUIDE)){
            if(Guide.curGuide){
                egret.setTimeout(Guide.curGuide.over,Guide.curGuide,10);
                //Guide.curGuide.over();
            }
            User.getInstance().guideList.push(Guide.EQUIP_GUIDE);
        }

        //console.log(role, vo);
        UserModel.updateKpi();
        UserModel.save();
        BagModel.save();
        return true;
    }

    /**脱掉装备---*/
    public static unEquip(role:RoleVo):void{
        if(role.weapon){
            var vo:ItemVo = BagModel.getItemByUUid(role.weapon);
            if(vo){
                vo.masterId = "";
            }
        }
        UserModel.updateKpi();
        BagModel.save();
        UserModel.save();
    }
    //toServer参数失效
    public static save(toServer:boolean=true):void{
        egret.localStorage.setItem(BagModel.NAME, BagModel.getJsonStr());
        UserRequest.callToSave();
    }

    public static getData():any{
        return egret.localStorage.getItem(BagModel.NAME)
    }
}
