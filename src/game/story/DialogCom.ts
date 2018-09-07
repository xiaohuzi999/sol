/*
* name;
*/
class DialogCom extends ui.story.DialogComUI{
    constructor(){
        super();
        this.leftPlayer.scrollRect = this.rightPlayer.scrollRect = new Laya.Rectangle(0,0, 320, 430);
    }

    public showDialog(vo:DialogVo):void{
        if(vo){
            this.visible = true;
            this.tfMsg.text = vo.dialog;
            if(vo.leftPlayer){
                this.leftPic.skin = "res/graphics/fighter/"+vo.leftPlayer.name+".png";
                this.leftPic.scaleX = vo.leftPlayer.scaleX;
                this.leftPic.pos(vo.leftPlayer.x, vo.leftPlayer.y);
                this.leftPic.alpha = vo.leftPlayer.alpha;
            }else{
                this.leftPic.skin = "";
            }

            if(vo.rightPlayer){
                this.rightPic.skin = "res/graphics/fighter/"+vo.rightPlayer.name+".png";
                this.rightPic.scaleX = vo.rightPlayer.scaleX;
                this.rightPic.pos(vo.rightPlayer.x-this.rightPlayer.x, vo.rightPlayer.y);
                this.rightPic.alpha = vo.rightPlayer.alpha;
            }else{
                this.rightPic.skin = "";
            }
        }else{
            this.visible = false;
        }
    }
}