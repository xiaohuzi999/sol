/**
 * Created by ���ӼӼ� on 2015/6/11.
 */
class RewardData{
    public static data:any;

    public static exRwardData:any;

    public static init(str:string):void{
        RewardData.data = JSON.parse(str);
    }

    /**��ȡ������Ϣ*/
    public static getRewardInfo(id:any):any{
        return RewardData.data[id];
    }

    //��ʼ����Ӣ����
    public static initEX(str:string):void{
        if(!RewardData.exRwardData){
            RewardData.exRwardData = JSON.parse(str);
        }
    }

    /**��ȡ��Ӣ������Ϣ*/
    public static getEXRewardInfo(id:any):any{
        return RewardData.exRwardData[id];
    }
}
