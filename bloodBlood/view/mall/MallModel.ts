/**
 * 商城数据配置
 * @author 
 *
 */
class MallModel {
    
    public static NAME: string = "MallModel";
    public static itemsForMall: Array<ItemVo> = null;
    /**
        功绩包配置
    */
    public static POINT_CONFIG: Array<any> = [
        
        {index:1, cost:6, point:60, reward:60},
        {index:2, cost:30, point:300, reward:300},
        {index:3, cost:98, point:980, reward:0}, 
        {index:4, cost:198, point:1980, reward:0}, 
        {index:5, cost:328, point:3280, reward:0}
    ];
    
    public static getItemsForMall(callBack:Function, thisObj:any): Array<ItemVo>
    { 
        if(MallModel.itemsForMall != null)
            return MallModel.itemsForMall;
        var items: any = ItemData.data;
        MallModel.itemsForMall = [];
        for(var itemIndex in items)
        { 
            var itemData: any = items[itemIndex];
            if(itemData.itemType == ItemType.EQUIP){
                continue;
            }
            MallModel.itemsForMall.push(new ItemVo(itemData));
        }
        
        callBack.apply(thisObj);
    }
    
	public constructor() {
	}
}
