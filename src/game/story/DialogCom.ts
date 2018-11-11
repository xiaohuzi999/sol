/*
* name;
*/
class DialogCom extends ui.story.DialogComUI{
    private static readonly PreUrl:string = "res/"
    private static readonly OffsetY:number  = 320;
    constructor(){
        super();
    }

    public showDialog(vo:DialogVo):void{
        if(vo){
            this.visible = true;
            format(vo, "bg", this.bg, "background", ".jpg")

            format(vo, "p0", this.p0, "player");
            format(vo, "p1", this.p1, "player");
            format(vo, "p2", this.p2, "player");
            format(vo, "p3", this.p3, "player");

        }else{
            this.visible = false;
        }

        function format(vo:DialogVo ,key:string, img:Laya.Image, fileLocation:string, type:string = ".png"):void{
            var info:{n:string, x:number,y:number,sx:number, al:number,b:boolean,m:boolean} = vo[key];
            if(info){
                if(img.name == info.n){//同一张图，动画
                    let pro:any = {};
                    if(info.x != img.x){
                        pro.x = info.x;
                    }
                    if(info.y != img.y-DialogCom.OffsetY){
                        pro.y = info.y+DialogCom.OffsetY;
                    }
                    let targetAl:number = info.al!=undefined?info.al:1;
                    if(img.alpha != targetAl){
                        pro.alpha = targetAl;
                    }
                    if(!xframe.XUtils.isEmpty(pro)){
                        Laya.Tween.to(img, pro, vo.time)
                    }
                }else{//不同，直接赋值
                    img.name = info.n;
                    img.skin = DialogCom.PreUrl+fileLocation+"/"+info.n+ type;
                    img.x = info.x;
                    img.y = info.y+DialogCom.OffsetY;
                    if(info.al != undefined){
                        img.alpha = info.al;
                    }else{
                        img.alpha = 1;
                    }
                }
            }else{
                img.skin = "";
            }
        }
    }
}