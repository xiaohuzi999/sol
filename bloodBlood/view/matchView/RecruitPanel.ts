/**
 * Created by yanmingjie on 2015/7/17.
 */
class RecruitPanel extends XWindow{
    private static _instance:RecruitPanel;
    //当前荣誉值
    private _honor:egret.TextField;
    //招募列表
    private _list:egret.gui.List;
    //招募列表数据
    private _data:Array<any>;

    public constructor(){
        super();
        this.init();
    }

    private init():void{

        var tf:egret.TextField = new egret.TextField();
        this.addChild(tf);
        tf.text = "当前荣誉：";
        tf.size = 22;
        tf.x = 20;
        tf.y = 5;
        tf.textColor = 0xFFA000;

        this._honor = new egret.TextField();
        this.addChild( this._honor );
        this._honor.x = tf.x + tf.width + 3;
        this._honor.y = tf.y;
        this._honor.size = tf.size;
        this._honor.textColor = 0xFFA000;

        this._list = new egret.gui.List();
        this.addChild( this._list );
        this._list.y = tf.height + 20;
        this._list.x = 28;
        this._list.height = 470;
        this._list.itemRenderer = new egret.gui.ClassFactory( match.RecruitItem );
        this._data = UserModel.getExchangeHeroList();
        this._list.dataProvider = new egret.gui.ArrayCollection( this._data );
    }

    //增加新手引导==============================================================
    public show(center:boolean=false,...args: any[]):void{
        super.show(center);
        this.showPanel();
        //植入新手引导====================================================
        if(!Guide.hasFinishedGuid(Guide.LADDER_GUIDE) && Guide.curGuide instanceof LadderGuide){
            egret.setTimeout(function(){
                Guide.curGuide.showExchange2(this._list)
            }, this,20);
        }
    }

    //初始化事件
    public initEvent():void{
        User.getInstance().addEventListener(User.CHANGE, this.showPanel,this);
    }
    //删除监听事件
    public removeEvent():void{
        User.getInstance().removeEventListener(User.CHANGE, this.showPanel, this);
    }

    private showPanel():void{
        this._honor.text = User.getInstance().ladderHonor + "";
    }

    public static getInstance():RecruitPanel{
        if(!RecruitPanel._instance){
            RecruitPanel._instance = new RecruitPanel();
        }
        return RecruitPanel._instance;
    }

}

module match{
    export class RecruitItem extends egret.gui.ItemRenderer{

        public constructor(){
            super();
            this.touchEnabled = false;
            this.skinName = skins.match.RecruitItemSkin;
        }

        //招募角色的名字
        private _name:egret.gui.Label;
        //招募角色需要的荣誉
        private _honor:egret.gui.Label;
        //招募角色的实力
        private _strength:egret.gui.UIAsset;
        //招募角色的头像信息；
        private _avatar:egret.gui.UIAsset;
        //招募的角色状态：招募、已招募、未解锁
        private _state:egret.gui.UIAsset;

        /**
         * 传入的参数是有4个
         * 1：传入的是招募角色的名字
         * 2：传入的是招募角色需要的荣誉值
         * 3：传入的是招募角色的实力
         * 4：传入的事招募角色的头像
         * [{roleName:"殷血歌",exHonor:300,kpi:500,pic:"yinxuege"}]
         **/
        public dataChanged():void{
            if( this._name ){
                this._name.text = this.data.roleName;
            }
            if( this._honor ){
                this._honor.text = this.data.exHonor + "";
            }
            if( this._strength ){
                this._strength.source = this.data.quality + "_png";
            }
            if( this._avatar ){
                this._avatar.source = this.data.pic + "_s";
            }
            if( this._state ){
                var user_team = User.getInstance().team;
                var length:number = user_team.length;
                var bool:boolean = true;
                for( var i=0; i< length; i++ ){
                    if( user_team[i].roleName == this.data.roleName ){
                        this.state = "yizhaomu_png";
                        bool = false;
                    }
                }
                if( bool ){
                    this.state = "zhaomu_item_png";
                }
            }
            super.dataChanged();
        }

        public partAdded(partName:string,instance:any):void {
            super.partAdded(partName,instance);
            if( instance == this._state ) {
                this._state.touchEnabled = true;
                this._state.addEventListener( egret.TouchEvent.TOUCH_TAP, this.stateClick, this );
            }
        }

        //点击招募按钮
        private stateClick(event:egret.Event):void{
            if( this._state.source == "zhaomu_item_png" ){
                var user = User.getInstance();
                var role = UserModel.getExchangeHeroList()[this.itemIndex];

                if( role.exHonor == 0 ){
                    UserModel.joinTeam( role.roleName );
                    XTip.showTip("招募成功！");
                    this.state = "yizhaomu_png";
                }else if(  user.ladderHonor < role.exHonor  ){
                    XTip.showTip("荣誉不够 无法招募!");
                }else{
                    User.getInstance().ladderHonor = User.getInstance().ladderHonor - role.exHonor;
                    UserRequest.consumeHonor(role.exHonor,null, null);
                    XTip.showTip("招募成功!");
                    this.state = "yizhaomu_png";
                    UserModel.joinTeam( role.roleName );

                }
            }else{
                //不可以招募的情况
            }
        }

        public set state(s:string){
            this._state.source = s;
        }

    }



}