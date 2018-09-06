var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var StoryView = /** @class */ (function (_super) {
    __extends(StoryView, _super);
    function StoryView() {
        return _super.call(this) || this;
    }
    StoryView.prototype.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.show.call(this);
        this._data = JSON.parse(args[0]);
        this._curStory = this._data.list.shift();
        this.showStory();
    };
    StoryView.prototype.showStory = function () {
        this._curDialog = this.getCurDialog(this._curStory);
        trace("showStory===", this._curDialog);
        //trace(this._curDialog);
        if (this._curDialog) {
            if (this._curDialog.dialog) {
                trace(this._curDialog.name + "::", this._curDialog.dialog);
            }
            this.execute();
        }
        else {
        }
    };
    StoryView.prototype.execute = function () {
        //是否分支选项
        if (this._curDialog.nextRecordId_1) {
            trace("分支1：", this._curDialog.label_0);
            trace("分支2：", this._curDialog.label_1);
            trace("分支3：", this._curDialog.label_2);
            trace("分支4：", this._curDialog.label_3);
        }
        //是否具有事件
        else if (this._curDialog.eventInfo) {
            trace("事件：：", this._curDialog.eventInfo);
            //fight 
            if (this._curDialog.eventInfo.fight) {
                this.removeEventListener();
                xframe.XFacade.instance.showModule(FightView, this._curDialog.eventInfo.fight);
            }
        }
        //是否具有数据操作
        else if (this._curDialog.dataInfo) {
            trace("数据：：", this._curDialog.dataInfo);
        }
    };
    StoryView.prototype.getCurDialog = function (data) {
        var curId = this._curDialog ? this._curDialog.nextRecordId_0 : "0";
        for (var i in data.dialogList) {
            if (data.dialogList[i].recordId == curId) {
                return data.dialogList[i];
            }
        }
        return null;
    };
    StoryView.prototype.onC = function () {
        this.showStory();
    };
    StoryView.prototype.createUI = function () {
        this._view = new ui.story.StoryViewUI();
        this.addChild(this._view);
    };
    StoryView.prototype.addEventListener = function () {
        Laya.stage.on(Laya.Event.CLICK, this, this.onC);
    };
    StoryView.prototype.removeEventListener = function () {
        Laya.stage.off(Laya.Event.CLICK, this, this.onC);
    };
    return StoryView;
}(xframe.XWindow));
//# sourceMappingURL=StoryView.js.map