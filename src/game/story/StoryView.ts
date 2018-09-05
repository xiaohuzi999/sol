/*
* name;
*/
class StoryView extends xframe.XWindow{
    protected _view:ui.story.StoryViewUI;
    //数据
    private _data:{list:StoryVo[], name:string, pic:string};
    //
    private _curStory:StoryVo;
    //
    private _curDialog:DialogVo;
    constructor(){
        super();
    }

    public show(...args):void{
        super.show();
        this._data = JSON.parse(args[0]);
        this._curStory = this._data.list.shift();
        this.showStory();
    }

    private showStory():void{
        this._curDialog = this.getCurDialog(this._curStory);
        trace("showStory===",this._curDialog);
        //trace(this._curDialog);
        if(this._curDialog){
            if(this._curDialog.dialog){
                trace(this._curDialog.name+"::", this._curDialog.dialog);
            }
            this.execute();
        }else{

        }
    }

    private execute():void{
        //是否分支选项
        if(this._curDialog.nextRecordId_1){
            trace("分支1：",this._curDialog.label_0);
            trace("分支2：",this._curDialog.label_1);
            trace("分支3：",this._curDialog.label_2);
            trace("分支4：",this._curDialog.label_3);
        }
        //是否具有事件
        else if(this._curDialog.eventInfo){
            trace("事件：：",this._curDialog.eventInfo);
            //fight 
            if(this._curDialog.eventInfo.fight){
                xframe.XFacade.instance.showModule(FightView, this._curDialog.eventInfo.fight)
            }
        }
        //是否具有数据操作
        else if(this._curDialog.dataInfo){
            trace("数据：：",this._curDialog.dataInfo)
        }
    }

    private getCurDialog(data:StoryVo):DialogVo{
        var curId:string = this._curDialog?this._curDialog.nextRecordId_0:"0";
        for(var i in data.dialogList){
            if(data.dialogList[i].recordId == curId){
                return data.dialogList[i];
            }
        }
        return null;
    }

    private onC():void{
        this.showStory();
    }

    protected createUI():void{
        this._view = new ui.story.StoryViewUI();
        this.addChild(this._view);
    }

    protected addEventListener():void{
        Laya.stage.on(Laya.Event.CLICK, this, this.onC);
    }

    protected removeEventListener():void{
        Laya.stage.off(Laya.Event.CLICK, this, this.onC);
    }
}