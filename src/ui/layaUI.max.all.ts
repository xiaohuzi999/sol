
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.bag {
    export class BagEquipComUI extends View {
		public roleList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":520,"height":330},"child":[{"type":"Image","props":{"y":0,"x":0,"width":520,"skin":"share/winBG1.png","sizeGrid":"58,66,70,62","height":330}},{"type":"List","props":{"y":19,"x":11,"width":503,"var":"roleList","spaceY":6,"repeatX":1,"height":283},"child":[{"type":"BagEquipItem","props":{"y":0,"x":0,"runtime":"BagEquipItem","name":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("BagEquipItem",BagEquipItem);

            super.createChildren();
            this.createView(ui.bag.BagEquipComUI.uiView);

        }

    }
}

module ui.bag {
    export class BagEquipItemUI extends View {
		public tf:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":500,"height":52},"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"skin":"share/item.png","sizeGrid":"20,46,23,36","height":52}},{"type":"Label","props":{"y":14,"x":90,"width":320,"var":"tf","text":"label","height":24,"fontSize":24,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.bag.BagEquipItemUI.uiView);

        }

    }
}

module ui.bag {
    export class BagViewUI extends View {
		public itemList:Laya.List;
		public pic:Laya.Image;
		public tfName:Laya.Label;
		public btnItem:Laya.Button;
		public btnEquip:Laya.Button;
		public btnUse:Laya.Button;
		public proList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/bj_homepage@2x.png"},"child":[{"type":"Rect","props":{"y":889,"x":0,"width":750,"lineWidth":1,"lineColor":"#ffffff","height":160,"fillColor":"#ffffff"}},{"type":"Rect","props":{"y":1134,"x":0,"width":750,"lineWidth":1,"lineColor":"#ffffff","height":200,"fillColor":"#a4a4a4"}},{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"lineColor":"#ffffff","height":200,"fillColor":"#b9b9b9"}},{"type":"Rect","props":{"y":216,"x":2,"width":750,"lineWidth":1,"lineColor":"#ffffff","height":160,"fillColor":"#ffffff"}}]},{"type":"List","props":{"y":902,"x":1,"width":728,"var":"itemList","spaceX":18,"repeatY":1,"height":134},"child":[{"type":"Item","props":{"y":0,"x":0,"runtime":"Item","name":"render"}}]},{"type":"Image","props":{"y":474,"x":278,"var":"pic"}},{"type":"Label","props":{"y":415,"x":262,"width":226,"var":"tfName","text":"1","height":24,"fontSize":28,"color":"#000000","align":"center"}},{"type":"Button","props":{"y":230,"x":10,"var":"btnItem","stateNum":3,"skin":"common/btn_0.png","labelSize":24,"labelColors":"#000000,#ffffff,#ffffff","label":"ITEM"}},{"type":"Button","props":{"y":230,"x":260,"var":"btnEquip","stateNum":3,"skin":"common/btn_0.png","labelSize":24,"labelColors":"#000000,#ffffff,#ffffff","label":"EQUIP"}},{"type":"Button","props":{"y":1077,"x":288,"var":"btnUse","stateNum":1,"skin":"common/btn_1.png","mouseEnabled":true,"label":"装备"}},{"type":"List","props":{"y":445,"x":593,"width":125,"var":"proList","height":143},"child":[{"type":"Box","props":{"y":0,"x":0,"width":115,"name":"render","height":29},"child":[{"type":"Label","props":{"y":0,"x":0,"width":115,"text":"label","name":"lb","height":27,"fontSize":24,"color":"#ffffff"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Item",Item);

            super.createChildren();
            this.createView(ui.bag.BagViewUI.uiView);

        }

    }
}

module ui.bag {
    export class ItemUI extends View {
		public pic:Laya.Image;
		public tfNum:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":120,"height":120},"child":[{"type":"Image","props":{"y":0,"x":0,"width":120,"skin":"main/bg_dialog.png","height":120}},{"type":"Image","props":{"width":120,"var":"pic","height":120}},{"type":"Label","props":{"y":96,"x":50,"width":70,"var":"tfNum","text":"1","height":24,"fontSize":24,"color":"#000000","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.bag.ItemUI.uiView);

        }

    }
}

module ui.fight {
    export class EnemyItemUI extends View {
		public pic:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":300,"height":450},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"pic"}},{"type":"Rect","props":{"y":0,"x":0,"width":300,"lineWidth":2,"lineColor":"#000000","height":450,"fillColor":"#737373"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fight.EnemyItemUI.uiView);

        }

    }
}

module ui.fight {
    export class FightViewUI extends View {
		public hero_0:HeroItem;
		public hero_1:HeroItem;
		public hero_2:HeroItem;
		public enemy_0:EnemyItem;
		public enemy_1:EnemyItem;
		public enemy_2:EnemyItem;
		public enemy_3:EnemyItem;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"main/bj_homepage@2x.png","height":1334}},{"type":"HeroItem","props":{"y":1097,"x":20,"var":"hero_0","runtime":"HeroItem"}},{"type":"HeroItem","props":{"y":1097,"x":270,"var":"hero_1","runtime":"HeroItem"}},{"type":"HeroItem","props":{"y":1097,"x":520,"var":"hero_2","runtime":"HeroItem"}},{"type":"EnemyItem","props":{"y":92,"x":38,"var":"enemy_0","runtime":"EnemyItem"}},{"type":"EnemyItem","props":{"y":62,"x":255,"var":"enemy_1","runtime":"EnemyItem"}},{"type":"EnemyItem","props":{"y":412,"x":14,"var":"enemy_2","runtime":"EnemyItem"}},{"type":"EnemyItem","props":{"y":216,"x":384,"var":"enemy_3","runtime":"EnemyItem"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("HeroItem",HeroItem);
			View.regComponent("EnemyItem",EnemyItem);

            super.createChildren();
            this.createView(ui.fight.FightViewUI.uiView);

        }

    }
}

module ui.fight {
    export class HeroItemUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":216,"height":220},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"fight/tx.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fight.HeroItemUI.uiView);

        }

    }
}

module ui.fight {
    export class ResultUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":600,"height":520},"child":[{"type":"Image","props":{"y":22,"x":0,"width":600,"skin":"share/winF0.png","height":500,"sizeGrid":"93,46,115,58"}},{"type":"Image","props":{"y":37,"x":15,"width":568,"skin":"share/winBG1.png","height":473,"sizeGrid":"58,66,70,62"}},{"type":"Label","props":{"y":266,"x":272,"text":"label"}},{"type":"Image","props":{"y":0,"x":92,"skin":"share/title_bg.png"}},{"type":"Button","props":{"y":402,"x":192,"width":227,"stateNum":1,"skin":"share/btn_blue.png","sizeGrid":"31,48,34,47","height":86}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fight.ResultUI.uiView);

        }

    }
}

module ui.main {
    export class ChapItemUI extends View {
		public tfName:Laya.Label;
		public pic:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":480,"height":480},"child":[{"type":"Label","props":{"y":440,"x":113,"width":254,"var":"tfName","text":"label","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":0,"x":30,"var":"pic"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.ChapItemUI.uiView);

        }

    }
}

module ui.main {
    export class MainMenuViewUI extends View {
		public btnBag:Laya.Image;
		public btnStory:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":200},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"share/bgBar.png","sizeGrid":"28,20,34,21","height":200}},{"type":"Image","props":{"y":40,"x":340,"var":"btnBag","skin":"main/btn_role.png","mouseEnabled":true}},{"type":"Image","props":{"y":40,"x":74,"var":"btnStory","skin":"main/btn_ranking.png","mouseEnabled":true}},{"type":"Image","props":{"y":40,"x":615,"skin":"main/btn_card.png"}},{"type":"Label","props":{"y":160,"x":81,"text":"剧情","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":160,"x":360,"text":"背包","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":160,"x":610,"text":"音乐卡片","fontSize":25,"color":"#ffffff","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.MainMenuViewUI.uiView);

        }

    }
}

module ui.main {
    export class MainTopViewUI extends View {
		public tfDiamond:Laya.Label;
		public tfPower:Laya.Label;
		public btnUserInfo:Laya.Image;
		public tfMoney:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":200},"child":[{"type":"Image","props":{"y":200,"x":0,"width":750,"skin":"share/bgBar.png","sizeGrid":"28,20,34,21","scaleY":-1,"height":200}},{"type":"Box","props":{"y":108,"x":20},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":45,"var":"tfDiamond","text":"11","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"width":60,"skin":"main/ic_star.png"}}]},{"type":"Box","props":{"y":108,"x":362},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"tfPower","text":"56","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"skin":"main/ic_power.png"}}]},{"type":"Image","props":{"y":18,"x":20,"width":88,"var":"btnUserInfo","skin":"main/ic_add_power.png","height":88},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":88,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":44,"x":44,"radius":44,"lineWidth":1,"fillColor":"#d12424"}}]}]},{"type":"Box","props":{"y":111,"x":190},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"main/ic_bg.png"}},{"type":"Image","props":{"width":60,"skin":"main/ic_coin.png","height":60}},{"type":"Label","props":{"y":21,"x":64,"width":52,"var":"tfMoney","text":"99","height":24,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":121,"x":142,"stateNum":1,"skin":"main/btn_add.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.main.MainTopViewUI.uiView);

        }

    }
}

module ui.main {
    export class MainViewUI extends View {
		public topCom:ui.main.MainTopViewUI;
		public menuCom:ui.main.MainMenuViewUI;
		public chapList:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"main/bj_homepage@2x.png","height":1334}},{"type":"MainTopView","props":{"y":0,"x":0,"var":"topCom","runtime":"ui.main.MainTopViewUI"}},{"type":"MainMenuView","props":{"y":1134,"x":0,"var":"menuCom","runtime":"ui.main.MainMenuViewUI"}},{"type":"List","props":{"y":427,"x":-358,"width":1448,"var":"chapList","spaceY":1,"height":480},"child":[{"type":"ChapItem","props":{"runtime":"ChapItem","name":"render"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.main.MainTopViewUI",ui.main.MainTopViewUI);
			View.regComponent("ui.main.MainMenuViewUI",ui.main.MainMenuViewUI);
			View.regComponent("ChapItem",ChapItem);

            super.createChildren();
            this.createView(ui.main.MainViewUI.uiView);

        }

    }
}

module ui.story {
    export class DialogComUI extends View {
		public leftPlayer:Laya.Box;
		public leftPic:Laya.Image;
		public rightPlayer:Laya.Box;
		public rightPic:Laya.Image;
		public tfMsg:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Box","props":{"y":350,"x":0,"var":"leftPlayer"},"child":[{"type":"Image","props":{"var":"leftPic"}}]},{"type":"Box","props":{"y":350,"x":430,"var":"rightPlayer"},"child":[{"type":"Image","props":{"var":"rightPic"}}]},{"type":"Image","props":{"y":738,"x":0,"width":750,"skin":"main/bg_dialog.png","sizeGrid":"57,41,52,76","height":430}},{"type":"Label","props":{"y":791,"x":36,"width":678,"var":"tfMsg","text":"label","height":332,"fontSize":24,"color":"#000000"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.story.DialogComUI.uiView);

        }

    }
}

module ui.story {
    export class StoryViewUI extends View {
		public msgCom:DialogCom;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"main/bj_homepage@2x.png","height":1334}},{"type":"DialogCom","props":{"y":0,"x":0,"var":"msgCom","runtime":"DialogCom"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("DialogCom",DialogCom);

            super.createChildren();
            this.createView(ui.story.StoryViewUI.uiView);

        }

    }
}

module ui.user {
    export class UserInfoUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/bj_homepage@2x.png"},"child":[{"type":"Rect","props":{"y":1134,"x":0,"width":750,"lineWidth":1,"lineColor":"#ffffff","height":200,"fillColor":"#a4a4a4"}},{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"lineColor":"#ffffff","height":200,"fillColor":"#b9b9b9"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.user.UserInfoUI.uiView);

        }

    }
}
