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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var fight;
    (function (fight) {
        var FightViewUI = /** @class */ (function (_super) {
            __extends(FightViewUI, _super);
            function FightViewUI() {
                return _super.call(this) || this;
            }
            FightViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.FightViewUI.uiView);
            };
            FightViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bj_homepage@2x.png", "height": 1334 } }] };
            return FightViewUI;
        }(View));
        fight.FightViewUI = FightViewUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainViewUI = /** @class */ (function (_super) {
            __extends(MainViewUI, _super);
            function MainViewUI() {
                return _super.call(this) || this;
            }
            MainViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainViewUI.uiView);
            };
            MainViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bj_homepage@2x.png", "height": 1334 } }, { "type": "Image", "props": { "y": 1159, "x": 330, "var": "roleBtn", "skin": "main/btn_role.png" } }, { "type": "Image", "props": { "y": 1159, "x": 64, "var": "btnRank", "skin": "main/btn_ranking.png" } }, { "type": "Image", "props": { "y": 128, "x": 589, "visible": false, "var": "btnMore" } }, { "type": "Image", "props": { "y": 1020, "x": 242, "var": "btnStart", "skin": "main/btn_play.png", "mouseEnabled": true } }, { "type": "Image", "props": { "y": 244, "x": 24, "var": "btnSignin", "skin": "main/btn_sign.png" } }, { "type": "Image", "props": { "y": 116, "x": 20, "width": 88, "var": "btnUserInfo", "skin": "main/ic_add_power.png", "height": 88 }, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 88, "renderType": "mask", "height": 88 }, "child": [{ "type": "Circle", "props": { "y": 44, "x": 44, "radius": 44, "lineWidth": 1, "fillColor": "#d12424" } }] }] }, { "type": "Box", "props": { "y": 28, "x": 20 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "main/ic_bg.png" } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 45, "var": "tfDiamond", "text": "11", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "width": 60, "skin": "main/ic_star.png" } }] }, { "type": "Box", "props": { "y": 28, "x": 362 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "main/ic_bg.png" } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 76, "var": "tfPower", "text": "56", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "skin": "main/ic_power.png" } }] }, { "type": "Box", "props": { "y": 31, "x": 190 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "main/ic_bg.png" } }, { "type": "Image", "props": { "width": 60, "skin": "main/ic_coin.png", "height": 60 } }, { "type": "Label", "props": { "y": 21, "x": 64, "width": 52, "var": "tfMoney", "text": "99", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }] }, { "type": "Button", "props": { "y": 41, "x": 132, "var": "btnAddPower", "stateNum": 1, "skin": "main/btn_add.png" } }, { "type": "Image", "props": { "y": 1159, "x": 605, "var": "cardBtn", "skin": "main/btn_card.png" } }, { "type": "Label", "props": { "y": 1279, "x": 71, "text": "排行榜", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 1279, "x": 350, "text": "角色", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 1279, "x": 600, "text": "音乐卡片", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 324, "x": 36, "text": "签到", "fontSize": 25, "color": "#ffffff" } }] };
            return MainViewUI;
        }(View));
        main.MainViewUI = MainViewUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var story;
    (function (story) {
        var StoryViewUI = /** @class */ (function (_super) {
            __extends(StoryViewUI, _super);
            function StoryViewUI() {
                return _super.call(this) || this;
            }
            StoryViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.story.StoryViewUI.uiView);
            };
            StoryViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bj_homepage@2x.png", "height": 1334 } }] };
            return StoryViewUI;
        }(View));
        story.StoryViewUI = StoryViewUI;
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map