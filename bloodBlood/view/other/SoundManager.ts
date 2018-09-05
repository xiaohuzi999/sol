/**
 * Created by ���ӼӼ� on 2015/7/8.
 */
class SoundManager{
    private static _bgSnd:egret.Sound;

    public static getBgSnd():egret.Sound{
        return SoundManager._bgSnd;
    }

    /**���ű�������*/
    public static playBGM(snd:string):void{
        /*if(SoundManager._bgSnd == RES.getRes(snd)){
            return;
        }*/
        if(SoundManager._bgSnd){
            SoundManager._bgSnd.stop();
        }
        SoundManager._bgSnd = RES.getRes(snd);
        if(!SoundManager.isOff){
            if(SoundManager._bgSnd){
                SoundManager._bgSnd.play(true);
            }
        }
    }
    /**������Ч*/
    public static playerSND(snd:string):void{
        if(SoundManager.isOff){
            return
        }
        var sound:egret.Sound = RES.getRes(snd);
        if(sound){
            sound.play();
        }
    }

    /***/
    public static get isOff():boolean{
        return egret.localStorage.getItem("isOff") != null && egret.localStorage.getItem("isOff") != "false";
    }

    /***/
    public static set isOff(v:boolean){
        if(v){
            if(SoundManager._bgSnd){
                SoundManager._bgSnd.stop();
            }
        }else{
            if(SoundManager._bgSnd){
                //SoundManager._bgSnd.play(true);
            }
        }
        egret.localStorage.setItem("isOff", v+"");
    }
}
