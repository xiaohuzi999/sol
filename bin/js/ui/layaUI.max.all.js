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
    var bag;
    (function (bag) {
        var BagEquipComUI = /** @class */ (function (_super) {
            __extends(BagEquipComUI, _super);
            function BagEquipComUI() {
                return _super.call(this) || this;
            }
            BagEquipComUI.prototype.createChildren = function () {
                View.regComponent("BagEquipItem", BagEquipItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.BagEquipComUI.uiView);
            };
            BagEquipComUI.uiView = { "type": "View", "props": { "width": 520, "height": 330 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 520, "skin": "share/winBG1.png", "sizeGrid": "58,66,70,62", "height": 330 } }, { "type": "List", "props": { "y": 19, "x": 11, "width": 503, "var": "roleList", "spaceY": 6, "repeatX": 1, "height": 283 }, "child": [{ "type": "BagEquipItem", "props": { "y": 0, "x": 0, "runtime": "BagEquipItem", "name": "render" } }] }] };
            return BagEquipComUI;
        }(View));
        bag.BagEquipComUI = BagEquipComUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BagEquipItemUI = /** @class */ (function (_super) {
            __extends(BagEquipItemUI, _super);
            function BagEquipItemUI() {
                return _super.call(this) || this;
            }
            BagEquipItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.BagEquipItemUI.uiView);
            };
            BagEquipItemUI.uiView = { "type": "View", "props": { "width": 500, "height": 52 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 500, "skin": "share/item.png", "sizeGrid": "20,46,23,36", "height": 52 } }, { "type": "Label", "props": { "y": 14, "x": 90, "width": 320, "var": "tf", "text": "label", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }] };
            return BagEquipItemUI;
        }(View));
        bag.BagEquipItemUI = BagEquipItemUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BagItemUI = /** @class */ (function (_super) {
            __extends(BagItemUI, _super);
            function BagItemUI() {
                return _super.call(this) || this;
            }
            BagItemUI.prototype.createChildren = function () {
                View.regComponent("Item", Item);
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.BagItemUI.uiView);
            };
            BagItemUI.uiView = { "type": "View", "props": { "width": 750, "height": 94 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/daojutiao.png", "sizeGrid": "27,40,32,46" } }, { "type": "Item", "props": { "y": 13, "x": 14, "var": "item", "scaleY": 0.6, "scaleX": 0.6, "runtime": "Item" } }, { "type": "Label", "props": { "y": 15, "x": 94, "width": 172, "var": "tfName", "text": "1234567", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "left" } }] };
            return BagItemUI;
        }(View));
        bag.BagItemUI = BagItemUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var BagViewUI = /** @class */ (function (_super) {
            __extends(BagViewUI, _super);
            function BagViewUI() {
                return _super.call(this) || this;
            }
            BagViewUI.prototype.createChildren = function () {
                View.regComponent("BagItem", BagItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.BagViewUI.uiView);
            };
            BagViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "main/bj_homepage@2x.png" } }, { "type": "Button", "props": { "y": 84, "x": 8, "var": "btnAll", "stateNum": 3, "skin": "common/btn_0.png", "sizeGrid": "24,33,18,24", "scaleY": 0.5, "scaleX": 0.5, "labelSize": 24, "labelColors": "#000000,#ffffff,#ffffff", "label": "全部" } }, { "type": "Button", "props": { "y": 84, "x": 131, "var": "btnWeapon", "stateNum": 3, "skin": "common/btn_0.png", "scaleY": 0.5, "scaleX": 0.5, "labelSize": 24, "labelColors": "#000000,#ffffff,#ffffff", "label": "武器" } }, { "type": "Button", "props": { "y": 84, "x": 255, "var": "btnCloth", "stateNum": 3, "skin": "common/btn_0.png", "scaleY": 0.5, "scaleX": 0.5, "labelSize": 24, "labelColors": "#000000,#ffffff,#ffffff", "label": "衣服" } }, { "type": "Button", "props": { "y": 84, "x": 378, "var": "btnShoe", "stateNum": 3, "skin": "common/btn_0.png", "scaleY": 0.5, "scaleX": 0.5, "labelSize": 24, "labelColors": "#000000,#ffffff,#ffffff", "label": "鞋子" } }, { "type": "Button", "props": { "y": 84, "x": 502, "var": "btnJewel", "stateNum": 3, "skin": "common/btn_0.png", "scaleY": 0.5, "scaleX": 0.5, "labelSize": 24, "labelColors": "#000000,#ffffff,#ffffff", "label": "饰品" } }, { "type": "Button", "props": { "y": 84, "x": 625, "var": "btnItem", "stateNum": 3, "skin": "common/btn_0.png", "scaleY": 0.5, "scaleX": 0.5, "labelSize": 24, "labelColors": "#000000,#ffffff,#ffffff", "label": "道具" } }, { "type": "List", "props": { "y": 143, "x": 0, "width": 750, "var": "itemList", "height": 1033 }, "child": [{ "type": "BagItem", "props": { "runtime": "BagItem", "name": "render" } }] }] };
            return BagViewUI;
        }(View));
        bag.BagViewUI = BagViewUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var bag;
    (function (bag) {
        var ItemUI = /** @class */ (function (_super) {
            __extends(ItemUI, _super);
            function ItemUI() {
                return _super.call(this) || this;
            }
            ItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.bag.ItemUI.uiView);
            };
            ItemUI.uiView = { "type": "View", "props": { "width": 120, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 120, "skin": "main/bg_dialog.png", "height": 120 } }, { "type": "Image", "props": { "width": 120, "var": "pic", "height": 120 } }, { "type": "Label", "props": { "y": 96, "x": 50, "width": 70, "var": "tfNum", "text": "1", "height": 24, "fontSize": 24, "color": "#000000", "align": "right" } }] };
            return ItemUI;
        }(View));
        bag.ItemUI = ItemUI;
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
(function (ui) {
    var debug;
    (function (debug) {
        var DebugAddItemUI = /** @class */ (function (_super) {
            __extends(DebugAddItemUI, _super);
            function DebugAddItemUI() {
                return _super.call(this) || this;
            }
            DebugAddItemUI.prototype.createChildren = function () {
                View.regComponent("DItem", DItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.debug.DebugAddItemUI.uiView);
            };
            DebugAddItemUI.uiView = { "type": "View", "props": { "width": 750, "height": 600 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bg_dialog.png", "sizeGrid": "51,83,89,86", "height": 600 } }, { "type": "List", "props": { "y": 125, "x": 31, "width": 686, "var": "itemList", "spaceY": 15, "spaceX": 20, "repeatX": 5, "height": 437 }, "child": [{ "type": "DebugItem", "props": { "y": 0, "x": 0, "runtime": "DItem", "name": "render" } }, { "type": "Button", "props": { "y": -40, "x": -3, "width": 120, "var": "btnGold", "labelSize": 20, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "Gold +1000", "height": 33 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 120, "lineWidth": 1, "height": 32, "fillColor": "#000000" } }] }, { "type": "Button", "props": { "y": -39, "x": 141, "width": 120, "var": "btnDiamond", "labelSize": 20, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "Dia +1000", "height": 33 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 120, "lineWidth": 1, "height": 32, "fillColor": "#000000" } }] }] }, { "type": "Button", "props": { "y": 3, "x": 672, "width": 76, "var": "btnClose", "stateNum": 1, "skin": "common/ic_back.png", "height": 80 } }] };
            return DebugAddItemUI;
        }(View));
        debug.DebugAddItemUI = DebugAddItemUI;
    })(debug = ui.debug || (ui.debug = {}));
})(ui || (ui = {}));
(function (ui) {
    var debug;
    (function (debug) {
        var DebugItemUI = /** @class */ (function (_super) {
            __extends(DebugItemUI, _super);
            function DebugItemUI() {
                return _super.call(this) || this;
            }
            DebugItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.debug.DebugItemUI.uiView);
            };
            DebugItemUI.uiView = { "type": "View", "props": { "width": 120, "height": 60 }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 120, "var": "tfName", "text": "label", "height": 27, "fontSize": 24, "color": "#000000", "align": "center" } }, { "type": "Button", "props": { "y": 27, "x": 0, "width": 120, "var": "btnAdd", "labelSize": 20, "labelColors": "#ffffff,#ffffff,#ffffff", "label": "Add", "height": 33 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 120, "lineWidth": 1, "height": 32, "fillColor": "#040f60" } }] }] };
            return DebugItemUI;
        }(View));
        debug.DebugItemUI = DebugItemUI;
    })(debug = ui.debug || (ui.debug = {}));
})(ui || (ui = {}));
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
            ResultUI.uiView = { "type": "View", "props": { "width": 600, "height": 520 }, "child": [{ "type": "Image", "props": { "y": 22, "x": 0, "width": 600, "skin": "share/winF0.png", "height": 500, "sizeGrid": "93,46,115,58" } }, { "type": "Image", "props": { "y": 37, "x": 15, "width": 568, "skin": "share/winBG1.png", "height": 473, "sizeGrid": "58,66,70,62" } }, { "type": "Label", "props": { "y": 266, "x": 272, "text": "label" } }, { "type": "Image", "props": { "y": 0, "x": 92, "skin": "share/title_bg.png" } }, { "type": "Button", "props": { "y": 402, "x": 192, "width": 227, "stateNum": 1, "skin": "share/btn_blue.png", "sizeGrid": "31,48,34,47", "height": 86 } }] };
            return ResultUI;
        }(View));
        fight.ResultUI = ResultUI;
    })(fight = ui.fight || (ui.fight = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var ChapItemUI = /** @class */ (function (_super) {
            __extends(ChapItemUI, _super);
            function ChapItemUI() {
                return _super.call(this) || this;
            }
            ChapItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.ChapItemUI.uiView);
            };
            ChapItemUI.uiView = { "type": "View", "props": { "width": 480, "height": 480 }, "child": [{ "type": "Label", "props": { "y": 440, "x": 113, "width": 254, "var": "tfName", "text": "label", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 30, "var": "pic" } }] };
            return ChapItemUI;
        }(View));
        main.ChapItemUI = ChapItemUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainMenuViewUI = /** @class */ (function (_super) {
            __extends(MainMenuViewUI, _super);
            function MainMenuViewUI() {
                return _super.call(this) || this;
            }
            MainMenuViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainMenuViewUI.uiView);
            };
            MainMenuViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 200 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "share/bgBar.png", "sizeGrid": "28,20,34,21", "height": 200 } }, { "type": "Image", "props": { "y": 40, "x": 340, "var": "btnBag", "skin": "main/btn_role.png", "mouseEnabled": true } }, { "type": "Image", "props": { "y": 40, "x": 74, "var": "btnStory", "skin": "main/btn_ranking.png", "mouseEnabled": true } }, { "type": "Image", "props": { "y": 40, "x": 615, "var": "btnUser", "skin": "main/btn_card.png", "mouseEnabled": true } }, { "type": "Label", "props": { "y": 160, "x": 81, "text": "剧情", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 160, "x": 360, "text": "背包", "fontSize": 25, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 160, "x": 610, "text": "音乐卡片", "fontSize": 25, "color": "#ffffff", "align": "center" } }] };
            return MainMenuViewUI;
        }(View));
        main.MainMenuViewUI = MainMenuViewUI;
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
(function (ui) {
    var main;
    (function (main) {
        var MainTopViewUI = /** @class */ (function (_super) {
            __extends(MainTopViewUI, _super);
            function MainTopViewUI() {
                return _super.call(this) || this;
            }
            MainTopViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainTopViewUI.uiView);
            };
            MainTopViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 120 }, "child": [{ "type": "Image", "props": { "y": 120, "x": 0, "width": 750, "skin": "share/bgBar.png", "sizeGrid": "28,20,34,21", "scaleY": -1, "height": 120 } }, { "type": "Box", "props": { "y": 26, "x": 118 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "main/ic_bg.png" } }, { "type": "Label", "props": { "y": 24, "x": 46, "width": 96, "var": "tfDiamond", "text": "1234567", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": -2, "x": -25, "width": 89, "skin": "icons/diamond.png", "height": 69 } }, { "type": "Button", "props": { "y": 13, "x": 134, "var": "btnCharge", "stateNum": 1, "skin": "main/btn_add.png" } }] }, { "type": "Box", "props": { "y": 24, "x": 491 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "main/ic_bg.png" } }, { "type": "Label", "props": { "y": 21, "x": 52, "width": 76, "var": "tfPower", "text": "123456", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 5, "x": -9, "width": 60, "skin": "icons/heart.png", "height": 60 } }] }, { "type": "Image", "props": { "y": 18, "x": 18, "width": 88, "var": "btnUserInfo", "skin": "game/head.png", "mouseEnabled": true, "height": 88 } }, { "type": "Box", "props": { "y": 27, "x": 317 }, "child": [{ "type": "Image", "props": { "y": 14, "x": 30, "skin": "main/ic_bg.png" } }, { "type": "Image", "props": { "y": 0, "x": -10, "width": 60, "skin": "icons/jinbi.png", "height": 60 } }, { "type": "Label", "props": { "y": 21, "x": 50, "width": 95, "var": "tfMoney", "text": "1234567", "height": 24, "fontSize": 24, "color": "#ffffff", "align": "center" } }] }] };
            return MainTopViewUI;
        }(View));
        main.MainTopViewUI = MainTopViewUI;
    })(main = ui.main || (ui.main = {}));
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
                View.regComponent("ui.main.MainMenuViewUI", ui.main.MainMenuViewUI);
                View.regComponent("ChapItem", ChapItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.main.MainViewUI.uiView);
            };
            MainViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "main/bj_homepage@2x.png", "height": 1334 } }, { "type": "MainMenuView", "props": { "y": 1134, "x": 0, "var": "menuCom", "runtime": "ui.main.MainMenuViewUI" } }, { "type": "List", "props": { "y": 427, "x": -358, "width": 1448, "var": "chapList", "spaceY": 1, "height": 480 }, "child": [{ "type": "ChapItem", "props": { "runtime": "ChapItem", "name": "render" } }] }] };
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
            DialogComUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": -2, "x": 0, "var": "bg" } }, { "type": "Image", "props": { "y": 440, "x": 429, "var": "p3" } }, { "type": "Image", "props": { "y": 440, "x": 118, "var": "p1" } }, { "type": "Image", "props": { "y": 440, "x": 0, "var": "p0" } }, { "type": "Image", "props": { "y": 440, "x": 310, "var": "p2" } }, { "type": "Image", "props": { "y": 149, "x": 190, "var": "dec" } }] };
            return DialogComUI;
        }(View));
        story.DialogComUI = DialogComUI;
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
(function (ui) {
    var story;
    (function (story) {
        var MsgCom1UI = /** @class */ (function (_super) {
            __extends(MsgCom1UI, _super);
            function MsgCom1UI() {
                return _super.call(this) || this;
            }
            MsgCom1UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.story.MsgCom1UI.uiView);
            };
            MsgCom1UI.uiView = { "type": "View", "props": { "width": 750, "height": 164 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 750, "width": 750, "skin": "game/2.png", "sizeGrid": "90,229,33,52", "scaleX": -1 } }, { "type": "Label", "props": { "y": 21, "x": 17, "width": 150, "var": "tfName", "text": "label", "height": 24, "fontSize": 24, "color": "#000000", "align": "center" } }, { "type": "Label", "props": { "y": 72, "x": 19, "width": 717, "var": "tfMsg", "text": "label", "height": 69, "fontSize": 24, "color": "#ffffff", "align": "left" } }] };
            return MsgCom1UI;
        }(View));
        story.MsgCom1UI = MsgCom1UI;
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
(function (ui) {
    var story;
    (function (story) {
        var MsgCom2UI = /** @class */ (function (_super) {
            __extends(MsgCom2UI, _super);
            function MsgCom2UI() {
                return _super.call(this) || this;
            }
            MsgCom2UI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.story.MsgCom2UI.uiView);
            };
            MsgCom2UI.uiView = { "type": "View", "props": { "width": 750, "height": 164 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 750, "skin": "game/2.png", "sizeGrid": "90,229,33,52" } }, { "type": "Label", "props": { "y": 20, "x": 582, "width": 147, "var": "tfName", "text": "label", "height": 24, "fontSize": 24, "color": "#000000", "align": "center" } }, { "type": "Label", "props": { "y": 72, "x": 19, "width": 717, "var": "tfMsg", "text": "label", "height": 69, "fontSize": 24, "color": "#ffffff", "align": "left" } }] };
            return MsgCom2UI;
        }(View));
        story.MsgCom2UI = MsgCom2UI;
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
            StoryViewUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "DialogCom", "props": { "y": 0, "x": 0, "var": "msgCom", "runtime": "DialogCom" } }, { "type": "Image", "props": { "y": -2, "x": 0, "skin": "game/bg.png" } }, { "type": "Label", "props": { "y": 48, "x": 181, "width": 366, "var": "tfTitle", "text": "水云村", "height": 39, "fontSize": 36, "color": "#ffffff", "align": "center" } }] };
            return StoryViewUI;
        }(View));
        story.StoryViewUI = StoryViewUI;
    })(story = ui.story || (ui.story = {}));
})(ui || (ui = {}));
(function (ui) {
    var user;
    (function (user) {
        var UserInfoUI = /** @class */ (function (_super) {
            __extends(UserInfoUI, _super);
            function UserInfoUI() {
                return _super.call(this) || this;
            }
            UserInfoUI.prototype.createChildren = function () {
                View.regComponent("RoleItem", RoleItem);
                _super.prototype.createChildren.call(this);
                this.createView(ui.user.UserInfoUI.uiView);
            };
            UserInfoUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "main/bj_homepage@2x.png" }, "child": [{ "type": "Rect", "props": { "y": 1134, "x": 0, "width": 750, "lineWidth": 1, "lineColor": "#ffffff", "height": 200, "fillColor": "#a4a4a4" } }, { "type": "Rect", "props": { "y": 0, "x": 0, "width": 750, "lineWidth": 1, "lineColor": "#ffffff", "height": 200, "fillColor": "#b9b9b9" } }, { "type": "Rect", "props": { "y": 100, "x": 0, "width": 120, "lineWidth": 1, "lineColor": "#ffffff", "height": 625, "fillColor": "#a4a4a4" } }, { "type": "Rect", "props": { "y": 100, "x": 120, "width": 630, "lineWidth": 1, "lineColor": "#ffffff", "height": 625, "fillColor": "#d9d9d9" } }, { "type": "Rect", "props": { "y": 780, "x": 0, "width": 120, "lineWidth": 1, "lineColor": "#ffffff", "height": 554, "fillColor": "#a4a4a4" } }, { "type": "Rect", "props": { "y": 780, "x": 120, "width": 630, "lineWidth": 1, "lineColor": "#ffffff", "height": 554, "fillColor": "#d9d9d9" } }] }, { "type": "UserItem", "props": { "y": 100, "x": 0, "var": "role_0", "runtime": "RoleItem" } }, { "type": "UserItem", "props": { "y": 237, "x": 0, "var": "role_1", "runtime": "RoleItem" } }, { "type": "UserItem", "props": { "y": 376, "x": 0, "var": "role_2", "runtime": "RoleItem" } }, { "type": "Image", "props": { "y": 146, "x": 225, "var": "pic", "skin": "main/05.png" } }, { "type": "Image", "props": { "y": 181, "x": 131, "width": 111, "skin": "main/ui_common_avatar_frame.png", "height": 121 } }, { "type": "Image", "props": { "y": 426, "x": 139, "width": 111, "skin": "main/ui_common_avatar_frame.png", "height": 121 } }, { "type": "Image", "props": { "y": 190, "x": 590, "width": 111, "skin": "main/ui_common_avatar_frame.png", "height": 121 } }, { "type": "Image", "props": { "y": 435, "x": 598, "width": 111, "skin": "main/ui_common_avatar_frame.png", "height": 121 } }, { "type": "Box", "props": { "y": 586, "x": 324, "width": 293, "height": 96 }, "child": [{ "type": "Label", "props": { "width": 81, "text": "HP", "height": 30, "fontSize": 28, "color": "#000000", "align": "center" } }, { "type": "Label", "props": { "y": 33, "width": 81, "text": "AT", "height": 30, "fontSize": 28, "color": "#000000", "align": "center" } }, { "type": "Label", "props": { "y": 66, "width": 81, "text": "SP", "height": 30, "fontSize": 28, "color": "#000000", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 90, "width": 138, "var": "tfHP", "text": "122", "height": 30, "fontSize": 28, "color": "#000000", "align": "left" } }, { "type": "Label", "props": { "y": 33, "x": 90, "width": 150, "var": "tfAttack", "text": "11", "height": 30, "fontSize": 28, "color": "#000000", "align": "left" } }, { "type": "Label", "props": { "y": 66, "x": 90, "width": 177, "var": "tfSpeed", "text": "333", "height": 30, "fontSize": 28, "color": "#000000", "align": "left" } }] }, { "type": "Button", "props": { "y": 9, "x": 664, "var": "btnBack", "stateNum": 1, "skin": "common/ic_back.png" } }] };
            return UserInfoUI;
        }(View));
        user.UserInfoUI = UserInfoUI;
    })(user = ui.user || (ui.user = {}));
})(ui || (ui = {}));
(function (ui) {
    var user;
    (function (user) {
        var UserItemUI = /** @class */ (function (_super) {
            __extends(UserItemUI, _super);
            function UserItemUI() {
                return _super.call(this) || this;
            }
            UserItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.user.UserItemUI.uiView);
            };
            UserItemUI.uiView = { "type": "View", "props": { "width": 120, "height": 140 }, "child": [{ "type": "Image", "props": { "y": 9, "x": 11, "skin": "game/head.png" } }, { "type": "Label", "props": { "y": 119, "x": 3, "width": 115, "var": "tfName", "height": 20, "fontSize": 20, "color": "#000000", "align": "center" } }] };
            return UserItemUI;
        }(View));
        user.UserItemUI = UserItemUI;
    })(user = ui.user || (ui.user = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map