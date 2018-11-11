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
        return _super.call(this) || this;
    }
    DialogCom.prototype.showDialog = function (vo) {
        if (vo) {
            this.visible = true;
            format(vo, "bg", this.bg, "background", ".jpg");
            format(vo, "p0", this.p0, "player");
            format(vo, "p1", this.p1, "player");
            format(vo, "p2", this.p2, "player");
            format(vo, "p3", this.p3, "player");
        }
        else {
            this.visible = false;
        }
        function format(vo, key, img, fileLocation, type) {
            if (type === void 0) { type = ".png"; }
            var info = vo[key];
            if (info) {
                if (img.name == info.n) { //同一张图，动画
                    var pro = {};
                    if (info.x != img.x) {
                        pro.x = info.x;
                    }
                    if (info.y != img.y - DialogCom.OffsetY) {
                        pro.y = info.y + DialogCom.OffsetY;
                    }
                    var targetAl = info.al != undefined ? info.al : 1;
                    if (img.alpha != targetAl) {
                        pro.alpha = targetAl;
                    }
                    if (!xframe.XUtils.isEmpty(pro)) {
                        Laya.Tween.to(img, pro, vo.time);
                    }
                }
                else { //不同，直接赋值
                    img.name = info.n;
                    img.skin = DialogCom.PreUrl + fileLocation + "/" + info.n + type;
                    img.x = info.x;
                    img.y = info.y + DialogCom.OffsetY;
                    if (info.al != undefined) {
                        img.alpha = info.al;
                    }
                    else {
                        img.alpha = 1;
                    }
                }
            }
            else {
                img.skin = "";
            }
        }
    };
    DialogCom.PreUrl = "res/";
    DialogCom.OffsetY = 320;
    return DialogCom;
}(ui.story.DialogComUI));
//# sourceMappingURL=DialogCom.js.map