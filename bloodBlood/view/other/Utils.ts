/**
 * Created by ���ӼӼ� on 2015/6/19.
 */
class Utils{
    //html������
    private static _htmlP;

    //ս��=sqrt(�ƣ�����+����*2+����+���ݣ�^2)
    //����KPI
    public static caculateRolKpi(role:RoleVo):number{
        var kpi:number = 0;
        var tempRole:RoleVo = role.createFighter();
        var num:number = (tempRole.physique+tempRole.attack*2+tempRole.defend+tempRole.agility);
        kpi = Math.sqrt(num*num);
        return kpi;
    }

    //�������KPI
    public static caculateItemKpi(item:ItemVo):number{
        var kpi:number = 0;
        var temp:any = XUtils.addObject(item.itemProperty, item.itemXProperty);
        var num:number = (temp.physique+temp.attack*2+temp.defend+temp.agility);
        kpi = Math.sqrt(num*num);
        return kpi
    }

    /**���뱳��*/
    public static flyToBag(item:ItemVo):void{
        var icon:egret.Bitmap = new egret.Bitmap();
        icon.texture = RES.getRes(item.imageId);
        LayerManager.stage.addChild(icon);
        icon.x = (LayerManager.stage.stageWidth - icon.width) >> 1;
        icon.y = 400;
        egret.Tween.get(icon).to({},600).to({x:400,y:860},300).call(icon.parent.removeChild,icon.parent,[icon]);
    }

    //set role property
    public static setRolePro(role:RoleVo, proStr:string, isHome:boolean=true):void{
        var temp:string[] = proStr.split("@");
        role.maxHp = parseInt(temp[0]);
        role.hp = role.maxHp;
        role.attack = parseInt(temp[1]);
        role.defend = parseInt(temp[2]);
        role.crit = parseInt(temp[3]);
        role.hitRate = parseInt(temp[4]);
        role.roleName = temp[5];
        if(isHome){
            role.pic = temp[6];
        }else{
            role.pic = temp[7];
        }
        if(!role.pic){
            role.pic = "yinxuege";
        }
    }

    public static get htmlParser():egret.HtmlTextParser{
        if(!Utils._htmlP){
            Utils._htmlP = new egret.HtmlTextParser
        }
        return Utils._htmlP;
    }
}