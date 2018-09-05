/**
 * Created by yanmingjie on 2015/7/15.
 */
/**
 * 这个类是天梯赛里面点击挑战按钮在下面出现的界面
 *
 * */
class ChallengePanel extends XWindow{

    private static _instance:ChallengePanel;
    public constructor(){
        super();
        this.init();
    }

    /*
    * {"Code":0,"Pr":0,
    * "Data":{"Idx":19,"ProductId":1001,"ManagerId":"D590A2B4-0257-8E9F-1A2D-4306E2EF548A","Name":"殷血歌","Score":1000,"NewlyScore":0,"NewlyHonor":0,"Honor":0,"MaxScore":0,"MatchTime":0,"ExchangeIds":"","Status":0,"RefreshTimes":0,"ExtraData":"100@10@10@10@90",
    * "Season":{"Idx":2,"ProductId":1001,"SeasonId":2,"Status":0,"StartTick":1437436800000,"EndTick":1437955200000},"ExchangeRefreshTick":0,"MyRank":0,"YesterdayRank":0,"WinRate":0.0}}
    *
    * */
    //获取个人信息
    private challenge:match.Challenge;
    public finishSkinLoad():void{
        this.challenge.setMyName( User.getInstance().userName );
        this.challenge.setMyStrength( User.getInstance().kpi + "" );
        var _this = this;
        var http_mi:HttpMatch = new HttpMatch();
        http_mi.setTakeUserUrl();
        http_mi.callback = function(data){
            //console.log( "" + data );
            var data = JSON.parse(data);
            if( !data.Code ){
                _this.challenge.setScore( data.Data.Score + "" );
                if( data.Data.MyRank == -1 ){
                    _this.challenge.setRanking( "暂时无排名" );
                }else{
                    if(data.Data.MyRank){
                        _this.challenge.setRanking( data.Data.MyRank + "" );
                    }else{
                        _this.challenge.setRanking( "暂时无排名" );
                    }
                }
                User.getInstance().ladderHonor = data.Data.Honor;
                MatchView.getInstance().setTime( data.Data.Season.StartTick, data.Data.Season.EndTick );
                _this.challenge.setTime( MillisecondsToDate.millisecondsStrToDate( data.Data.Season.EndTick, "yyyy/MM/dd") );
            }
        }
    }

    private init():void{
        this.challenge = match.Challenge.getInstance();
        this.addChild( this.challenge );
        this.challenge.x = 22;
        //皮肤加载完成事件
        this.challenge.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, this.finishSkinLoad, this);
    }

    public static getInstance():ChallengePanel{
        if(!ChallengePanel._instance){
            ChallengePanel._instance = new ChallengePanel();
        }
        return ChallengePanel._instance;
    }

}

module match{

    export class Challenge extends egret.gui.SkinnableComponent{
        //开始挑战按钮
        private challengeBegin:egret.gui.UIAsset;
        //我的排名数
        private _ranking:egret.gui.Label;
        //赛季截止时间
        private _time:egret.gui.Label;
        //当前积分数
        private _score:egret.gui.Label;
        //当前荣誉点数
        private _honor:egret.gui.Label;
        //本人的名字
        private my_name:egret.gui.Label;
        //本人的头像
        private my_avatar:egret.gui.UIAsset;
        //本人的称号地位
        private my_status:egret.gui.UIAsset;
        //本人的实力
        private my_strength:egret.gui.Label;
        //对战方的名字
        private enemy_name:egret.gui.Label;
        //对战方的头像
        private enemy_avatar:egret.gui.UIAsset;
        //对战方的称号地位
        private enemy_status:egret.gui.UIAsset;
        //对战方的实力
        private enemy_strength:egret.gui.Label;
        //括号
        private enemy_right:egret.gui.Label;
        private enemy_left:egret.gui.Label;
        private enemy_info:egret.gui.Label;

        public constructor() {
            super();
            this.skinName = skins.match.ChallengeSkin;
        }

        public partAdded(partName:string,instance:any):void {
            if( instance == this.challengeBegin ) {
                this.challengeBegin.touchChildren = true;
                this.challengeBegin.addEventListener( egret.TouchEvent.TOUCH_TAP, this.challengeBeginClick, this);
            }
            if( instance == this.my_status ) {
                this.setMyStatus( Strings.ROLE_HONOR_RANK[ User.getInstance().role.honorLv -1 ] );
            }
            if( instance == this._honor ) {
                this.setHonor( User.getInstance().ladderHonor  + "" );
            }
            super.partAdded(partName,instance);
            User.getInstance().addEventListener(User.CHANGE,this.showUserInfo,this);
        }


        private showUserInfo():void{
            var user = User.getInstance();
            this.setHonor(  user.ladderHonor + "" );
            this.setMyStatus( Strings.ROLE_HONOR_RANK[ user.role.createFighter().honorLv -1 ] );
        }


        //点击开始挑战
        private is_challenge:boolean = true;
        private challengeBeginClick():void{
            if( this.is_challenge ){
                this.fight();
            }else{
                this.cancelFight();
            }
        }

        //轮流显示匹配对手
        private mate:Sleep;
        private showMateEnemy():void{
            var _this = this;
            if( !this.mate ){
                this.mate = new Sleep(50,50000);
            }
            this.mate.start();
            var index = -1;
            this.mate.backEach = function(){
                index += 1;
                if( index == 9 ){
                    index = 0;
                }
                _this.setEnemyName( Strings.ENEMY_INFO[index].name );
                _this.setEnemyStatus( Strings.ROLE_HONOR_RANK[Strings.ENEMY_INFO[index].honorLv -1] );
                _this.setEnemyStrength( Strings.ENEMY_INFO[index].kpi + "" );
            };
        }

        //显示的开始挑战
        private showChallenge():void{
            this.is_challenge = true;
            this.challengeBegin.source = "tiaozhan_begin_png";
        }
        //显示的是取消挑战
        private cancelChallenge():void{
            this.is_challenge = false;
            this.challengeBegin.source = "tiaozhan_cancel_png";
        }
        //显示是匹配对方的信息
        private showEnemyInfo():void{
            this.enemy_info.visible = false;
            this.enemy_name.visible = true;
            this.enemy_status.visible = true;
            this.enemy_left.visible = true;
            this.enemy_right.visible = true;
        }
        //隐藏匹配对手的信息，用？？？？来代替
        private hideEnemyInfo():void{
            this.enemy_info.visible = true;
            this.enemy_name.visible = false;
            this.enemy_status.visible = false;
            this.enemy_left.visible = false;
            this.enemy_right.visible = false;
            this.setEnemyStrength("???");
        }

        //设置挑战界面里面的的值
        public setRanking(r:string):void{
            this._ranking.text = r;
        }
        public setTime(t:string):void{
            this._time.text = t;
        }
        public setScore(s:string):void{
            if( s != "undefined"){
                this._score.text = s;
            }
        }
        public setHonor(h:string):void{
            if( h != "undefined"){
                this._honor.text = h;
            }
        }
        public setMyName(n:string):void{
            this.my_name.text = n;
        }
        public setMyAvatar(a:string):void{
            this.my_avatar.source = a;
        }
        public setMyStatus(s:string):void{
            this.my_status.source = s;
        }
        public setMyStrength(s:string):void{
            this.my_strength.text = s;
        }

        public setEnemyName(n:string):void{
            this.enemy_name.text = n;
        }
        public setEnemyAvatar(a:string):void{
            this.enemy_avatar.source = a;
        }
        public setEnemyStatus(s:string):void{
            this.enemy_status.source = s;
        }
        public setEnemyStrength(s:string):void{
            this.enemy_strength.text = s;
        }

        //请求挑战
        private fight():void{
            var http_at:HttpMatch = HttpMatch.getInstance();
            var http_ht:HttpMatch = new HttpMatch();
            var http_gmh:HttpMatch = new HttpMatch();
            http_at.setChallengeUrl();
            var _this = this;
            http_at.callback = function(data){
                //console.log("" + data);
                var data = JSON.parse(data);
                if( !data.Code){
                    http_ht.setPullUrl();
                    _this.cancelChallenge();
                    _this.showMateEnemy();
                    _this.showEnemyInfo();
                }else if( data.Code == 200 ){
                    if(_this.mate){
                        _this.mate.stop();
                    }
                    XTip.showTip("匹配失败，请等待10秒后重新匹配!");
                    _this.showChallenge();
                }else{
                    if(_this.mate){
                        _this.mate.stop();
                    }
                    XTip.showTip(" 匹配系统维护中!");
                    _this.showChallenge();
                }
            };
            http_ht.callback = function(data){
                //console.log("" + data);
                var data = JSON.parse(data);
                if(!data.Code){
                    if( !data.Data ){
                        if(_this.mate){
                            _this.mate.stop();
                        }
                        _this.showChallenge();
                    }else{
                        if( !data.Data.AwayId ){
                            egret.setTimeout(function(){
                                if( !_this.is_challenge ){
                                    http_ht.setPullUrl();
                                }
                            }, this, 2000);
                        }else{
                            http_gmh.setTakeMatchUrl( data.Data.MatchId );
                        }
                    }
                }
            };
            http_gmh.callback = function(data){
                //console.log("" + data);
                var data = JSON.parse(data);
                if(!data.Code){
                    _this.mate.stop();
                    if( data.Data.HomeId == User.getInstance().userId ){  //主场
                        _this.setEnemyName( data.Data.AwayName );
                        _this.setEnemyStatus( Strings.ROLE_HONOR_RANK[data.Data.AwayHonorLevel] );
                        _this.setEnemyStrength( data.Data.AwayKpi + "" );
                    }else{  //客场
                        _this.setEnemyName( data.Data.HomeName );
                        _this.setEnemyStatus( Strings.ROLE_HONOR_RANK[data.Data.HomeHonorLevel] );
                        _this.setEnemyStrength( data.Data.HomeKpi + "" );
                    }
                    //3秒后显示比赛结果
                    var sleep:Sleep = new Sleep(50, 1);
                    sleep.callBack = function(){
                        if( !data.Data.FightData ){ //当没有返回战斗数据时
                            XTip.showTip("匹配对手无法连接 请重新匹配!");
                            _this.hideEnemyInfo();
                            _this.showChallenge();
                        }else{
                            //20150826增加条件判定====如果界面已经关闭，则不进入比赛
                            if(MatchView.getInstance().stage){
                                XTip.showTip("匹配对手成功 即将进入战场!");
                                FightView.getInstance().showReplay(data.Data);
                            }

                            if( data.Data.HomeId == User.getInstance().userId ){
                                var score = data.Data.HomeLadderScore + data.Data.PrizeHomeScore;
                            }else{
                                var score = data.Data.AwayLadderScore + data.Data.PrizeAwayScore;
                            }
                            _this.setScore( score + "" );
                            _this.hideEnemyInfo();
                            _this.showChallenge();
                            ChallengePanel.getInstance().finishSkinLoad();
                        }
                    };

                }
            };
        }

        //取消挑战
        private cancelFight():void{
            var http_le:HttpMatch = HttpMatch.getInstance();
            var _this = this;
            http_le.setCancelChallengeUrl();
            http_le.callback = function(data){
                //console.log( "" + data );
                var data = JSON.parse(data);
                if(!data.Code){
                    _this.mate.stop();
                    XTip.showTip(" 匹配已经被取消！");
                    _this.showChallenge();
                    _this.hideEnemyInfo();
                }else if(data.Code == 202){
                    XTip.showTip(" 已经进入比赛行列 无法取消比赛！");
                }
            }
        }

        private static _instance:match.Challenge;
        public static getInstance():match.Challenge{
            if(!match.Challenge._instance){
                match.Challenge._instance = new match.Challenge();
            }
            return match.Challenge._instance;
        }

    }
}