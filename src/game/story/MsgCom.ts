/*
* name;
*/
class MsgCom extends Laya.Component{
    private _curUI:any;
    private _ui:ui.story.MsgCom1UI;
    private _ui2:ui.story.MsgCom2UI;
    constructor(){
        super();
        this.curUI = this.ui;
    }

    public set dataSource(vo:DialogVo){
        if(vo){
            this.visible = true;
            if(vo.dir ==1){
                this.curUI = this.ui;
            }else{
                this.curUI = this.ui2;
            }
            this.ui.tfName.text = vo.name+"";
            this.ui.tfMsg.text = vo.dialog+"";
        }else{
            this.visible = false;
        }
    }
    

    private set curUI(ui:any){
        if(this._curUI){
            this._curUI.removeSelf();
        }
        this._curUI = ui;
        if(this._curUI){
            this.addChild(this._curUI);
        }
    }
    

    private get ui():ui.story.MsgCom1UI{
        if(!this._ui){
            this._ui = new ui.story.MsgCom1UI();
        }
        return this._ui;
    }

    private get ui2():ui.story.MsgCom2UI{
        if(!this._ui2){
            this._ui2 = new ui.story.MsgCom2UI();
        }
        return this._ui2;
    }
}