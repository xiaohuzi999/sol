/**
 * Created by 马达加加加 on 2015/7/30.
 */
class PreLoad{
    private static keyStr:string = "101,102,103,zhandoudi,daxueping,breakBtn,xiaoxueping,zhongxueping,mov_png,mov_json,skill_1_png,skill_1_json,baoji,miss,yingzi,qianghuaanniu,zhuangbeianniu,pingjiabiao,shibai,tongguan,zhandouxuetiao,zhandouxuetiaodi,zhandouxuetiaoguang,jiesudi,jinjiekuang,fightSND,recoverSND,skillSND,"+
            "laitening_s,ailun_s,fayinlan_s,fennisi_s,qiaolusi_s,qilin_s,sangdeer_s,di3,renwukuang,zhuangbeianniu,tiao,xiaojie_s,wumu_s,,yinxuege_s,,chuzhan,,youquan_s,,xueyingwu_s,fight,rest,zhizi_s,xingzhanshi_s,yezhanshi_s,yuezhanshi_s,zijue_s,nanjue_s,bojue_s,houjue_s,gongjue_s,qianniangongjue_s,qinwang_s,xuedi_s,xueshen_s,chuzhengbiaoti,jinjiexiaochuang,jingxuetiao,jingxuetiaodi,jinjiekuang,jinjie,kuaisujinjie,tupo,tizhixuetiao,tizhixuetiaodi,jingxueguang,"+
            "daojudi,daojubiaoti,shiyong,chushou,1,2,3,4,5,6,7,8,104,105,106,107,108," +
            "xuexia,yizhuangbei,qianghuadi,di5,qianghuaanniu,qianghuaanniuhui,zhuangbeianniu,tiao,"+
            "farmBGSND,farmBg,blankBtn,jingxue,maizi,mutou,xuenu,farm_update,farm_gain,title_bg,daojudi,guanbi,nongtian,tian1,tian2,tian3,farm_expand,farm_speed,farm_update2,minju,farm_h0,farm_h1,farm_h2,harvest_png,harvest_json,farm_help";
    private static keys:string[];
    public static start():void{
        if(!PreLoad.keys){
            PreLoad.keys = PreLoad.keyStr.split(",");
        }
        egret.setTimeout(PreLoad.load,PreLoad,10);
    }

    private static load():void{
        if(PreLoad.keys.length){
            RES.getResAsync(PreLoad.keys.shift(),PreLoad.start,PreLoad);
        }
    }
}