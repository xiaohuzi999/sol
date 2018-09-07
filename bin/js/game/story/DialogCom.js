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
var DialogCom = /** @class */ (function (_super) {
    __extends(DialogCom, _super);
    function DialogCom() {
        var _this = _super.call(this) || this;
        _this.leftPlayer.scrollRect = _this.rightPlayer.scrollRect = new Laya.Rectangle(0, 0, 320, 430);
        return _this;
    }
    DialogCom.prototype.showDialog = function (vo) {
        if (vo) {
            this.visible = true;
            this.tfMsg.text = vo.dialog;
            if (vo.leftPlayer) {
                this.leftPic.skin = "res/graphics/fighter/" + vo.leftPlayer.name + ".png";
                this.leftPic.scaleX = vo.leftPlayer.scaleX;
                this.leftPic.pos(vo.leftPlayer.x, vo.leftPlayer.y);
                this.leftPic.alpha = vo.leftPlayer.alpha;
            }
            else {
                this.leftPic.skin = "";
            }
            if (vo.rightPlayer) {
                this.rightPic.skin = "res/graphics/fighter/" + vo.rightPlayer.name + ".png";
                this.rightPic.scaleX = vo.rightPlayer.scaleX;
                this.rightPic.pos(vo.rightPlayer.x - this.rightPlayer.x, vo.rightPlayer.y);
                this.rightPic.alpha = vo.rightPlayer.alpha;
            }
            else {
                this.rightPic.skin = "";
            }
        }
        else {
            this.visible = false;
        }
    };
    return DialogCom;
}(ui.story.DialogComUI));
//# sourceMappingURL=DialogCom.js.map