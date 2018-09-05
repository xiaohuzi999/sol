/**
 * Created by 马达加加加 on 2015/6/11.
 */
class RewardData{
    public static data:any;

    public static exRwardData:any;

    public static init(str:string):void{
        RewardData.data = JSON.parse(str);
    }

    /**获取掉落信息*/
    public static getRewardInfo(id:any):any{
        return RewardData.data[id];
    }

    //初始化精英奖励
    public static initEX(str:string):void{
        if(!RewardData.exRwardData){
            RewardData.exRwardData = JSON.parse(str);
        }
    }

    /**获取精英掉落信息*/
    public static getEXRewardInfo(id:any):any{
        return RewardData.exRwardData[id];
    }
}
