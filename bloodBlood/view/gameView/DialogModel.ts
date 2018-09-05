/**
 * Created by 马达加加加 on 2015/5/29.
 */
class DialogModel{
    public static data:any;
    public static maxChapeter:number=2;
    //
    public static exData:any;
    public constructor(){

    }

    /**数据分析=二进制方式，暂时有问题*/
    public static pharse(ab:ArrayBuffer):void{
        var by:egret.ByteArray = new egret.ByteArray(ab);
        by.endian = egret.Endian.BIG_ENDIAN;
        var str:string = by.readUTFBytes(by.length);
        str = JSON.stringify(str);
        DialogModel.data = JSON.parse(str)
    }

    /**数据分析-测试用*/
    public static pharse2(str:string):void{
        DialogModel.data = JSON.parse(str);
    }

    /***/
    public static get maxSection():number{
        return DialogModel.data.list.length;
    }

    /**精英副本数据*/
    public static initEXLv(data:any):void{
        if(!DialogModel.exData){
            DialogModel.exData = JSON.parse(data);
        }
    }

    /**获取精英关卡列表*/
    public static getEXLv():any{
        var list:any[] = [];
        var temp:any;
        for(var i:number=0; i<=User.getInstance().chapterId; i++){
            temp = DialogModel.exData[i].list;
            for(var j:number=0; j<temp.length; j++){
                if(i < User.getInstance().chapterId){
                    if(temp[j]){
                        list.push(temp[j])
                    }
                }else{
                    if(temp[j] && temp[j].storyId <= User.getInstance().sectionId){
                        list.push(temp[j])
                    }
                }
            }
        }
        return list;
    }
}