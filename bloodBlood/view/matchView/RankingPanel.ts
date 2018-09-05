/**
 * Created by yanmingjie on 2015/7/14.
 */
class RankingPanel extends XWindow{
    private static _instance:RankingPanel;
    //排名列表
    private _list:egret.gui.List;
    //排名列表加载的数据
    private _data:Array<any> = [];
    //没有获取排名提示标语
    private rank_hint:egret.TextField;

    public constructor(){
        super();
        this.init();
    }

    private init():void{
        var tf:egret.TextField = new egret.TextField();
        this.addChild( tf );
        tf.text = "排名";
        tf.x = 35.5 + 18;
        tf.size = 23;
        tf.textColor = 0xFFA000;

        tf = new egret.TextField();
        this.addChild( tf );
        tf.text = "角色名";
        tf.x = 35.5 + 152;
        tf.size = 23;
        tf.textColor = 0xFFA000;

        tf = new egret.TextField();
        this.addChild( tf );
        tf.text = "实力";
        tf.x = 35.5 + 325;
        tf.size = 23;
        tf.textColor = 0xFFA000;

        tf = new egret.TextField();
        this.addChild( tf );
        tf.text = "积分";
        tf.x = 35.5 + 469;
        tf.size = 23;
        tf.textColor = 0xFFA000;

        this.rank_hint = new egret.TextField();
        this.addChild( this.rank_hint );
        this.rank_hint.text = "请检查您网络是否已连接";
        this.rank_hint.textColor = 0xFFA000;
        this.rank_hint.size = 23;
        this.rank_hint.x = (LayerManager.stage.width - this.rank_hint.width)/2;
        this.rank_hint.y = tf.height + 15 + (470 - this.rank_hint.height)/2;

        this._list = new egret.gui.List();
        this.addChild( this._list );
        this._list.y = tf.height + 15;
        this._list.x = 35.5;
        this._list.height = 470;
        this._list.itemRenderer = new egret.gui.ClassFactory( match.RankingItem );

    }

    public updateListData():void{
        var http_rk:HttpMatch = HttpMatch.getInstance();
        http_rk.setRankingUrl(1, 1, 20);
        var _this = this;
        http_rk.callback = function(data){
            var d = JSON.parse(data);
            if( !d.Code ){
                var list_data:Array<any> = [];
                var list = d.Data.Ranks;
                var length = list.length;
                for( var i=0; i<length; i++){
                    list_data.push({rank:list[i].Rank, name:list[i].Name, score:list[i].Score, kpi:list[i].Kpi});
                }
                _this.setListData( list_data );
            }else{  //放回错误，没有获取
                if( _this.getChildIndex(_this.rank_hint) != -1 ){
                    _this.rank_hint.text = "排名系统正在维护中...";
                }else{
                    _this.addChild( _this.rank_hint );
                    _this.rank_hint.text = "排名系统正在维护中...";
                }
            }
        };
    }

    private setListData(data:Array<any>):void{
        var str_data = JSON.stringify(data);
        var str_this_data = JSON.stringify(this._data);
        if( str_data != str_this_data ){
            this._data = data;
            if( this.getChildIndex(this.rank_hint) != -1 ){
                this.removeChild( this.rank_hint );
            }
            this._list.dataProvider = new egret.gui.ArrayCollection( this._data );
        }

    }

    public static getInstance():RankingPanel{
        if(!RankingPanel._instance){
            RankingPanel._instance = new RankingPanel();
        }
        return RankingPanel._instance;
    }

}

module match{
    export class RankingItem extends egret.gui.ItemRenderer {
        public constructor() {
            super();
            this.skinName = skins.match.RankingItemSkin;
            this.touchChildren = false;
        }

        private ranking:egret.gui.Label;
        private characterName:egret.gui.Label;
        private strength:egret.gui.Label;
        private score:egret.gui.Label;

        public dataChanged():void{
            if( this.ranking ){
                this.ranking.text = this.data.rank + "";
            }
            if( this.characterName ){
                this.characterName.text = this.data.name;
            }
            if( this.strength ){
                this.strength.text = this.data.kpi + "";
            }
            if( this.score ){
                this.score.text = this.data.score + "";
            }
            super.dataChanged();
        }

    }

}