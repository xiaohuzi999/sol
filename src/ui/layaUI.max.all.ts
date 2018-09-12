
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
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

        public static  uiView:any ={"type":"View","props":{"width":400,"height":300},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":400,"lineWidth":0,"height":300,"fillColor":"#787878"}},{"type":"Label","props":{"y":144,"x":186,"text":"label"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.fight.ResultUI.uiView);

        }

    }
}

module ui.main {
    export class MainViewUI extends View {
		public roleBtn:Laya.Image;
		public btnRank:Laya.Image;
		public btnMore:Laya.Image;
		public btnStart:Laya.Image;
		public btnSignin:Laya.Image;
		public btnUserInfo:Laya.Image;
		public tfDiamond:Laya.Label;
		public tfPower:Laya.Label;
		public tfMoney:Laya.Label;
		public btnAddPower:Laya.Button;
		public cardBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"skin":"main/bj_homepage@2x.png","height":1334}},{"type":"Image","props":{"y":1159,"x":330,"var":"roleBtn","skin":"main/btn_role.png"}},{"type":"Image","props":{"y":1159,"x":64,"var":"btnRank","skin":"main/btn_ranking.png"}},{"type":"Image","props":{"y":128,"x":589,"visible":false,"var":"btnMore"}},{"type":"Image","props":{"y":1020,"x":242,"var":"btnStart","skin":"main/btn_play.png","mouseEnabled":true}},{"type":"Image","props":{"y":244,"x":24,"var":"btnSignin","skin":"main/btn_sign.png"}},{"type":"Image","props":{"y":116,"x":20,"width":88,"var":"btnUserInfo","skin":"main/ic_add_power.png","height":88},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":88,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":44,"x":44,"radius":44,"lineWidth":1,"fillColor":"#d12424"}}]}]},{"type":"Box","props":{"y":28,"x":20},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":45,"var":"tfDiamond","text":"11","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"width":60,"skin":"main/ic_star.png"}}]},{"type":"Box","props":{"y":28,"x":362},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"main/ic_bg.png"}},{"type":"Label","props":{"y":21,"x":64,"width":76,"var":"tfPower","text":"56","height":24,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"skin":"main/ic_power.png"}}]},{"type":"Box","props":{"y":31,"x":190},"child":[{"type":"Image","props":{"y":14,"x":30,"skin":"main/ic_bg.png"}},{"type":"Image","props":{"width":60,"skin":"main/ic_coin.png","height":60}},{"type":"Label","props":{"y":21,"x":64,"width":52,"var":"tfMoney","text":"99","height":24,"fontSize":24,"color":"#ffffff","align":"center"}}]},{"type":"Button","props":{"y":41,"x":132,"var":"btnAddPower","stateNum":1,"skin":"main/btn_add.png"}},{"type":"Image","props":{"y":1159,"x":605,"var":"cardBtn","skin":"main/btn_card.png"}},{"type":"Label","props":{"y":1279,"x":71,"text":"排行榜","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1279,"x":350,"text":"角色","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1279,"x":600,"text":"音乐卡片","fontSize":25,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":324,"x":36,"text":"签到","fontSize":25,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
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
