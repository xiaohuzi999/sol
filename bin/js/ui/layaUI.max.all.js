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
        var EnemyItemUI = /** @class */ (function (_super) {
            __extends(EnemyItemUI, _super);
            function EnemyItemUI() {
                return _super.call(this) || this;
            }
            EnemyItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.EnemyItemUI.uiView);
            };
            EnemyItemUI.uiView = { "type": "View", "props": { "width": 300, "height": 450 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "pic" } }, { "type": "Rect", "props": { "y": 0, "x": 0, "width": 300, "lineWidth": 2, "lineColor": "#000000", "height": 450, "fillColor": "#737373" } }] };
            return EnemyItemUI;
        }(View));
        fight.EnemyItemUI = EnemyItemUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var FightViewUI = /** @class */ (function (_super) {
            __extends(FightViewUI, _super);
            function FightViewUI() {
                return _super.call(this) || this;
            }
            FightViewUI.prototype.createChildren = function () {
                View.regComponent("HeroItem", HeroItem);
                View.regComponent("EnemyItem", EnemyItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.FightViewUI.uiView);
            };
            FightViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bj_homepage@2x.png", "height": 1334 } }, { "type": "HeroItem", "props": { "y": 1097, "x": 20, "var": "hero_0", "runtime": "HeroItem" } }, { "type": "HeroItem", "props": { "y": 1097, "x": 270, "var": "hero_1", "runtime": "HeroItem" } }, { "type": "HeroItem", "props": { "y": 1097, "x": 520, "var": "hero_2", "runtime": "HeroItem" } }, { "type": "EnemyItem", "props": { "y": 92, "x": 38, "var": "enemy_0", "runtime": "EnemyItem" } }, { "type": "EnemyItem", "props": { "y": 62, "x": 255, "var": "enemy_1", "runtime": "EnemyItem" } }, { "type": "EnemyItem", "props": { "y": 412, "x": 14, "var": "enemy_2", "runtime": "EnemyItem" } }, { "type": "EnemyItem", "props": { "y": 216, "x": 384, "var": "enemy_3", "runtime": "EnemyItem" } }] };
            return FightViewUI;
        }(View));
        fight.FightViewUI = FightViewUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var HeroItemUI = /** @class */ (function (_super) {
            __extends(HeroItemUI, _super);
            function HeroItemUI() {
                return _super.call(this) || this;
            }
            HeroItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.HeroItemUI.uiView);
            };
            HeroItemUI.uiView = { "type": "View", "props": { "width": 216, "height": 220 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "fight/tx.png" } }] };
            return HeroItemUI;
        }(View));
        fight.HeroItemUI = HeroItemUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var fight;
    (function (fight) {
        var ResultUI = /** @class */ (function (_super) {
            __extends(ResultUI, _super);
            function ResultUI() {
                return _super.call(this) || this;
            }
            ResultUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.fight.ResultUI.uiView);
            };
            ResultUI.uiView = { "type": "View", "props": { "width": 400, "height": 300 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 400, "lineWidth": 0, "height": 300, "fillColor": "#787878" } }, { "type": "Label", "props": { "y": 144, "x": 186, "text": "label" } }] };
            return ResultUI;
        }(View));
        fight.ResultUI = ResultUI;
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
        var DialogComUI = /** @class */ (function (_super) {
            __extends(DialogComUI, _super);
            function DialogComUI() {
                return _super.call(this) || this;
            }
            DialogComUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.story.DialogComUI.uiView);
            };
            DialogComUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Box", "props": { "y": 350, "x": 0, "var": "leftPlayer" }, "child": [{ "type": "Image", "props": { "var": "leftPic" } }] }, { "type": "Box", "props": { "y": 350, "x": 430, "var": "rightPlayer" }, "child": [{ "type": "Image", "props": { "var": "rightPic" } }] }, { "type": "Image", "props": { "y": 738, "x": 0, "width": 750, "skin": "main/bg_dialog.png", "sizeGrid": "57,41,52,76", "height": 430 } }, { "type": "Label", "props": { "y": 791, "x": 36, "width": 678, "var": "tfMsg", "text": "label", "height": 332, "fontSize": 24, "color": "#000000" } }] };
            return DialogComUI;
        }(View));
        story.DialogComUI = DialogComUI;
    })(story = ui.story || (ui.story = {}));
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
                View.regComponent("DialogCom", DialogCom);
                _super.prototype.createChildren.call(this);
                this.createView(ui.story.StoryViewUI.uiView);
            };
            StoryViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bj_homepage@2x.png", "height": 1334 } }, { "type": "DialogCom", "props": { "y": 0, "x": 0, "var": "msgCom", "runtime": "DialogCom" } }] };
            return StoryViewUI;
        }(View));
        story.StoryViewUI = StoryViewUI;
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map