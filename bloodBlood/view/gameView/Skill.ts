/**
 * Created by ���ӼӼ� on 2015/6/10.
 */
class SkillData{
    public static data:any;
    public static initData(str:string):void{
        SkillData.data = JSON.parse(str);
    }

    /**��ȡ�������*/
    public static getSkillInfo(skillId:any):any{
        return SkillData.data[skillId];
    }
}

class SkillType{
    /**��һĿ��*/
    public static ONE:number = 1;
    /**ȫ��*/
    public static ALL:number = 2;
}