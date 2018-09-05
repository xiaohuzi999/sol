/**
 * Created by Administrator on 2015/7/11.
 */
class MatchView extends XWindow{
    /**头像**/
    private $headCom:HeadCom;
    //金币和功绩按钮
    private $moneyCom_0:MoneyCom;
    private $moneyCom_1:MoneyCom;
    /**背景**/
    private $bg:egret.Bitmap;
    //返回该类对象
    private static _instance:MatchView;
    //领取按钮，根据时间
    private takeBtn:egret.Bitmap;
    //领取奖励的时间
    private time:egret.TextField;

    //挑战按钮
    private challengeBtn:egret.Bitmap;
    //排名按钮
    private rankingBtn:egret.Bitmap;
    //招募按钮
    private recruitBtn:egret.Bitmap;
    //当前的处于的状态（挑战、排名、招募）
    private _currentView:XWindow;

    public constructor(){
        super();
        XLoading.load("match", this.init, this, null);
    }

    public show():void{
        this.addChild(BottomCom.getInstance());
        BottomCom.getInstance().y = 829;
        this.challengeBtn.texture = RES.getRes("tiaozhan_png");
        this.recruitBtn.texture = RES.getRes("zhaomuhui_png");
        this.rankingBtn.texture = RES.getRes("paiminghui_png");
        this.currentView = ChallengePanel.getInstance();
        this.addChild( this._currentView );
        ChallengePanel.getInstance().finishSkinLoad();
        this.takePrizeInfo();
        super.show();
        this.showUserInfo();

        //植入新手引导=========================================================================
        if(!Guide.hasFinishedGuid(Guide.LADDER_GUIDE) && Guide.curGuide instanceof LadderGuide){
            Guide.curGuide.showExchange(this.recruitBtn);
        }
    }

    public close():void{
        MatchView.getInstance()._currentView.close();
        super.close();
    }

    public static getInstance():MatchView{
        if(!MatchView._instance){
            MatchView._instance = new MatchView();
        }
        return MatchView._instance;
    }

    //领取点击，获取奖励
    private takeBtnClick():void{
        //PrizeListCom.showPrize( "恭喜您获得了200功绩点 " + "\n恭喜您获得金钱 10000" );
        if( this.is_take ){
            var prize = UserModel.getPrizeData();
            var http_sp = new HttpMatch();
            var i = 0;
            var len  = this.prize_list.length;
            var _this = this;
            var point = 0;
            var money = 0;
            http_sp.setTakeUrl(this.prize_list[i].Idx);
            http_sp.callback = function(data){
                //console.log("" + data);
                var data = JSON.parse(data);
                if( !data.Code ){  //返回Code：0时进行下面显示操作
                    point += prize[_this.prize_list[i].PackId].point;
                    UserRequest.getBonus(prize[_this.prize_list[i].PackId].point,null, null);
                    money += prize[_this.prize_list[i].PackId].money;
                    i += 1;
                    if( i < len ){
                        http_sp.setTakeUrl(_this.prize_list[i].Idx);
                    }else{  //假如中间奖励顺利返回，把所有的奖励一次性发给玩家
                        userGetPrize();
                        _this.noExistPrizeBtn();
                    }
                }else{  //假如中间返回奖励出了错误，先把前面的奖励发给玩家
                    userGetPrize();
                    _this.takePrizeInfo();
                }
                //显示和玩家更新数据
                function userGetPrize(){
                    if( money == 0 ){
                        PrizeListCom.showPrize( "恭喜您获得了"+ point +"功绩点 " );
                        User.getInstance().point = User.getInstance().point + point;
                    }else{
                        PrizeListCom.showPrize( "恭喜您获得了"+ point +"功绩点\n恭喜您获得金钱" + money );
                        User.getInstance().point = User.getInstance().point + point;
                        User.getInstance().money = User.getInstance().money + money;
                    }
                }
            };
        }else{
            XTip.showTip(" 没有领取的奖励！");
        }
    }

    //是否有奖品可以获取
    private is_take:boolean;
    // Idx , PackId , SeasonId , Rank , RowTime
    private prize_list:Array<any> = [];
    private takePrizeInfo():void{
        var http_sp = new HttpMatch();
        http_sp.setNoTakeUrl();
        var _this = this;
        http_sp.callback = function(data){
            console.log("" + data);
            var data = JSON.parse(data);
            if( !data.Code ){
                var list:Array<any> = data.Data.PrizeList;
                var len = list.length;
                if( !len ){
                    _this.noExistPrizeBtn();
                }else{
                    _this.existPrizeBtn();
                    _this.prize_list = list;
                }
            }else{
                XTip.showTip("服务器正在更新中 请稍后连接！");
            }
        }
    }

    //领取按钮显示
    private existPrizeBtn():void{
        this.takeBtn.texture = RES.getRes( "lingqu_png" );
        this.is_take = true;
    }
    private noExistPrizeBtn():void{
        this.takeBtn.texture = RES.getRes("lingqu_hui_png");
        this.is_take = false;
    }

    //金币、头像、功绩显示刷新
    private showUserInfo():void{
        var user = User.getInstance();
        this.$headCom.showUserInfo( user );
        this.$moneyCom_0.showValue( user.money );
        this.$moneyCom_0.autoSize( user.money );
        this.$moneyCom_0.autoSize( user.money );
        this.$moneyCom_1.showValue( user.point );
        this.$moneyCom_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
        this.$moneyCom_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle,this);
    }

    //点击事件
    private onTouchHandle(event: egret.TouchEvent): void{
        switch(event.currentTarget) {
            case this.$moneyCom_1:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_POINTMALL));
                break;
            case this.$moneyCom_0:
                MainDispatcher.getInstance().dispatchEvent(new egret.Event(BottomCom.SHOW_MALL));
                break;
            case this.challengeBtn:
                this.challengeBtn.texture = RES.getRes("tiaozhan_png");
                this.recruitBtn.texture = RES.getRes("zhaomuhui_png");
                this.rankingBtn.texture = RES.getRes("paiminghui_png");
                this.currentView = ChallengePanel.getInstance();
                ChallengePanel.getInstance().finishSkinLoad();
                break;
            case this.rankingBtn:
                this.challengeBtn.texture = RES.getRes("tiaozhanhui_png");
                this.recruitBtn.texture = RES.getRes("zhaomuhui_png");
                this.rankingBtn.texture = RES.getRes("paiming_png");
                this.currentView = RankingPanel.getInstance();
                RankingPanel.getInstance().updateListData();
                break;
            case this.recruitBtn:
                this.challengeBtn.texture = RES.getRes("tiaozhanhui_png");
                this.recruitBtn.texture = RES.getRes("zhaomu_png");
                this.rankingBtn.texture = RES.getRes("paiminghui_png");
                this.currentView = RecruitPanel.getInstance();
                break;
            case this.takeBtn:
                this.takeBtnClick();
                break;
        }
    }

    //赛季时间显示
    public setTime(start, end):void{
        var date = new Date().getTime();
        if( date < end && date > start ){
            this.seconds = ( (end - date)/1000 )|0;
            this.hour = (this.seconds/3600)|0;
            this.minute = ( (this.seconds - this.hour*3600)/60 )|0;
            this.second = this.seconds - (this.hour*3600 + this.minute*60);
            var d = (this.hour/24)|0;
            var h = this.hour - (d * 24);
            this.time.text = d + "天" + h + "小时";
            //this.time.text = this.hour + ":" + this.minute + ":" + this.second;
            this.creteTimer();
            this._timer.start();
        }else{
            this.time.text = "本赛季结束";
        }
    }

    private set currentView(w:XWindow){
        if(this._currentView != w){
            if(this._currentView){
                this._currentView.close();
            }
            this._currentView = w;
        }
        if(this._currentView){
            this._currentView.show();
            this._currentView.y = LayerManager.stage.stageHeight - 694 + 25;
        }
    }

    //计算器的创建和触发后的处理
    private _timer:egret.Timer;
    private seconds:number;
    private creteTimer(){
        //计算器一秒触发一次
        if( !this._timer ){
            this._timer = new egret.Timer( 1000,this.seconds );
            this._timer.addEventListener( egret.TimerEvent.TIMER, this.onTimer, this );
            this._timer.addEventListener( egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this );
        }
    }
    //时间计数器没触发一次时间消耗一秒，并显示在文本上面
    private hour = 0;
    private minute = 0;
    private second = 0;
    private onTimer(){
        var second;
        var minute;
        var hour;
        this.second = this.second - 1;
        if( this.second == -1 ){
            this.minute = this.minute - 1;
            this.second = 59;
            if( this.minute == -1 ){
                this.hour = this.hour - 1;
                this.minute = 59;
            }
        }
        if( this.second < 10 ){
            second = "0" + this.second;
        }else{
            second = this.second;
        }
        if( this.minute < 10 ){
            minute = "0" + this.minute;
        }else{
            minute = this.minute;
        }
        if( this.hour < 10 ){
            hour = "0" + this.hour;
        }else{
            hour = this.hour;
        }
        //this.time.text = hour + ":" + minute + ":" + second;
        var d = (this.hour/24)|0;
        var h = this.hour - (d * 24);
        this.time.text = d + "天" + h + "小时";
    }
    //时间走完了后触发的事件方法
    private onTimerCom(){
        this._timer.reset();
        this.time.text = "本赛季结束";
    }

    private box:egret.Bitmap;
    //match资源组资源加载完成后，调用该回调函数
    private init():void{
        this.$bg = new egret.Bitmap();
        this.addChild( this.$bg );
        this.$bg.texture = RES.getRes( "di_png" );
        //头像
        this.$headCom = new HeadCom();
        this.$headCom.x = 10;
        this.$headCom.y = 20;
        this.addChild(this.$headCom);

        //用户的金币和功绩
        this.$moneyCom_0 = new MoneyCom();
        this.$moneyCom_1 = new MoneyCom(MoneyCom.POINT);
        this.addChild(this.$moneyCom_0);
        this.addChild(this.$moneyCom_1);
        this.$moneyCom_0.setBgSize(145);
        this.$moneyCom_1.setBgSize(145);
        this.$moneyCom_0.x = 10;
        this.$moneyCom_1.x = this.$moneyCom_0.x + this.$moneyCom_0.width + 5;
        this.$moneyCom_1.y = 30 + this.$headCom.height + 20;
        this.$moneyCom_0.y = this.$moneyCom_1.y;

        this.box = new egret.Bitmap();
        this.addChild( this.box );
        this.box.texture = RES.getRes( "baoxiang_png" );
        this.box.x = LayerManager.stage.stageWidth * 3/4 - 20;
        this.box.y = 30 + this.$headCom.height + 10;
        this.box.touchEnabled = true;
        TipsManager.registerTips(this.box, Strings.PRIZE_SHOW);
        //领取
        this.takeBtn = new egret.Bitmap();
        this.addChild( this.takeBtn );
        this.takeBtn.texture = RES.getRes( "lingqu_hui_png" );
        this.takeBtn.x = this.box.x + this.box.width + 5;
        this.takeBtn.y = this.box.y + 3;
        this.takeBtn.touchEnabled = true;

        //领取时间
        this.time = new egret.TextField();
        this.addChild( this.time );
        this.time.width = this.takeBtn.width;
        this.time.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.time.textAlign = egret.HorizontalAlign.CENTER;
        this.time.size = 18;
        this.time.y = this.takeBtn.y - 20;
        this.time.x = this.takeBtn.x;
        this.time.textColor = 0xFFA000;

        var di2:egret.Bitmap = new egret.Bitmap();
        this.addChild( di2 );
        di2.texture = RES.getRes("di2_png");
        di2.y = LayerManager.stage.stageHeight - 694;

        //挑战
        this.challengeBtn = new egret.Bitmap();
        this.addChild(this.challengeBtn);
        this.challengeBtn.texture = RES.getRes("tiaozhan_png");
        this.challengeBtn.x = this.$headCom.x + 5;
        this.challengeBtn.y = 220;
        this.challengeBtn.touchEnabled = true;

        //排名
        this.rankingBtn = new egret.Bitmap();
        this.addChild(this.rankingBtn);
        this.rankingBtn.texture = RES.getRes("paiminghui_png");
        this.rankingBtn.x = this.challengeBtn.x + this.challengeBtn.width + 1;
        this.rankingBtn.y = 220;
        this.rankingBtn.touchEnabled = true;

        //招募
        this.recruitBtn = new egret.Bitmap();
        this.addChild(this.recruitBtn);
        this.recruitBtn.texture = RES.getRes("zhaomuhui_png");
        this.recruitBtn.x = this.rankingBtn.x + this.rankingBtn.width + 1;
        this.recruitBtn.y = 220;
        this.recruitBtn.touchEnabled = true;

        var tf = new egret.TextField();
        this.addChild( tf );
        tf.text = "每天0点依据积分将结算荣誉";
        tf.textColor = 0x990033;
        tf.size = 16;
        tf.x = this.box.x - 26;
        tf.y = 250;
    }

    //初始化事件
    public initEvent():void{
        this.takeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.recruitBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.rankingBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.challengeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        User.getInstance().addEventListener(User.CHANGE, this.showUserInfo,this);
    }
    //删除监听事件
    public removeEvent():void{
        this.takeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.recruitBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.rankingBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.challengeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        User.getInstance().removeEventListener(User.CHANGE, this.showUserInfo, this);
    }

}