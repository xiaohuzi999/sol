/**
 * Created by Administrator on 15-6-3.
 * 道具相关-道具VO
 */
class ItemVo{
    /** 道具uid */
    public itemId:string;
    /**道具id */
    public itemCode:number;
    /**图片ID*/
    public imageId:string;
    /**名字*/
    public itemName:string;
    /**描述*/
    public itemDesc:string;
    /** 道具数量 */
    public itemNum:number;
    /**最大数量*/
    public maxNum:number;
    /**道具价格*/
    public itemPrice:number;
    /** 道具类型 */
    public itemType:number;
    /** 基础属性包*/
    public itemProperty:any;
    /**扩展属性包*/
    public itemXProperty:any;
    /**强化等级*/
    public itemStrLv:number=0;
    //效果
    public itemEffectValue:number=0;
    /**所属对象,谁装备了，只有装备类需要*/
    public masterId:string;
    /**出售价格*/
    public sellPrice:number=50;

    public constructor(data:any = null){
        if(data){
            this.setValue(data);
        }
    }

    /**赋值*/
    public setValue(v:Object):void{
        for(var i in v){
            this[i] = v[i];
        }
    }

    /**解析含义*/
    /**字典*/
    private static dic:any =
    {
        "attack":"攻击",
        "agility":"敏捷",
        "defend":"防御",
        "physique":"体质",
        "hitRate":"命中率",
        "crit":"暴击率"
    };
    public static parse(pro:any):string{
        var str:string="";
        for(var i in pro){
            if(str){
                str += "\t"+ItemVo.dic[i]+"+"+pro[i];
            }else{
                str = ItemVo.dic[i]+"+"+pro[i];
            }
        }
        return str;
    }

    /**解析key*/
    public static parseKey(key:string):string{
        var str:string = ItemVo.dic[key];
        if(!str){
            str= key;
        }
        return str;
    }
}

/**
 * 类型定义
 */
class ItemType{
    /**类型-装备*/
    public static EQUIP:number = 9;
    /**类型-补给*/
    public static MEDICINE:number = 3;
    /**类型-其他*/
    public static OTHER:number = 1;
}


/**
 * 道具管理
 * */
class ItemManager{
    /**生成道具*/
    public static createItem(itemCode:number, itemNum:number=1):ItemVo{
        var vo:ItemVo = new ItemVo();
        vo.setValue(ItemData.getItemData(itemCode))
        vo.itemNum = itemNum;
        vo.itemId = GUID.create();
        return vo;
    }
}

/**
 * 道具静态数据
 */
class ItemData{
    /***/
    public static data:any = {};
    //精华
    public static BLOOD:number=1;
    /**特殊道具定义*/
    public static HP_0:number=5;
    public static HP_1:number=6;
    public static HP_2:number=7;
    //金币包
    public static MONEY_0:number=8;
    //基础装备
    public static F_EQUIP:number = 101;
    /**小麦*/
    public static FOOD:number = 601;
    /**木头*/
    public static WOOD:number = 602;
    //预览图地址:
    public static PRE_URL:string = "resource/assets/ui/item/";
    private static items: any[];
    /**
    * 根据itemCode获取道具
    */
    public static getItemData(itemCode:number):any{
        return ItemData.data[itemCode];
    }

    /**根据名字获取道具*/
    public static getItemByName(itemName:string):ItemVo{
        for(var i in ItemData.data){
            if(ItemData.data[i].itemName == itemName){
                return ItemData.data[i];
            }
        }
        return null;
    }

    /**数据分析*/
    public static init(str:string):void{
        ItemData.data = JSON.parse(str);
    }

    /**
     * 随机生成一个物品ID
     */
    public static creatRndItemID():string{
        if(!ItemData.items){
            ItemData.items = new Array();
            for(var i in ItemData.data){
                ItemData.items.push(i);
            }
        }
        var index: number = parseInt(Math.random() * (ItemData.items.length) + "");
        return ItemData.items[index];
    }
}