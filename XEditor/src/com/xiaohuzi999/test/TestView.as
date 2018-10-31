package com.xiaohuzi999.test
{
	import com.greensock.TweenLite;
	import com.xiaohuzi999.storyEditor.model.Consts;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.storyEditor.vo.StoryVo;
	import com.xiaohuzi999.xControls.frame.XAlert;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	
	import flash.display.Bitmap;
	import flash.display.LoaderInfo;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.filters.ColorMatrixFilter;
	import flash.geom.Rectangle;
	
	import fl.containers.ScrollPane;
	import fl.controls.Button;
	
	/**
	 * TestView
	 * author:xiaohuzi999
	 * TestView.as 2015-5-27 上午10:54:32
	 * version 1.0
	 */
	public class TestView extends XModeWindow
	{
		private var closeBtn:Button;
		//底图
		private var _bg:Bitmap;
		/**左立绘*/
		private var _bm0:Bitmap;
		/**右立绘*/
		private var _bm1:Bitmap;
		private var _bm2:Bitmap;
		private var _bm3:Bitmap;
		/**情绪*/
		private var _leftMoodBm:Bitmap;
		private var _rightMoodBm:Bitmap;
		/***/
		private var _sp:ScrollPane;
		/***/
		private var _itemC:Sprite;
		/***/
		private var _items:Vector.<DialogCom> = new Vector.<DialogCom>();
		private var _diffBtns:Array;
		//特别处理的容器
		private var _specialSp:Sprite;
		
		/**数据源*/
		private var _source:Object;
		/**前一个数据*/
		private var _prevData:RecordVo;
		/***/
		private var _curData:RecordVo;
		
		/***/
		private var _redSp:Sprite;
		/***/
		private var _wSp:Sprite;
		
		private var _blackFilter:ColorMatrixFilter = new ColorMatrixFilter([1, 0, 0, 0, -100,
			0, 1, 0, 0, -100, 
			0, 0, 1, 0, -100, 
			0, 0, 0, 1, 0]);
		
		private var _mythFilter:ColorMatrixFilter = new ColorMatrixFilter([0, 0, 0, 0, 63.5,
			0, 0, 0, 0, 63.5, 
			0, 0, 0, 0, 63.5, 
			0, 0, 0, 1, 0]);
		public function TestView()
		{
			init();
		}
		
		/**显示剧情*/
		public function showStory(data:StoryVo):void{
			clear();
			_source = data.dialogList;
			parseDialog(_source["0"]);
			show();
		}
		
		/**对话分析*/
		public function parseDialog(data:RecordVo):void{
			if(!data){
				XAlert.showArert("剧情结束","调试", this.close, null, "", "", true, false);
				return;
			}
			//上一次对话奖励
			if(_prevData){
				if(_prevData.data){
					for(var i:String in _prevData.data){
						XTip.showTip("获得"+getStr(i)+_prevData.data[i]);
					}
				}
			}
			_curData = data;
			var time:Number = .5;
			if(data && data.time){
				time = int(data.time)/1000;
			}
			
			//切换特效
			if(data.bg){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, data.bg.n)+".jpg", onLoadPic, [_bg]);
				if(_prevData && checkSame(_prevData.bg, data.bg)){
					TweenLite.to(_bg, time, {x:data.bg.x || 0, y:data.bg.y || 0});
				}else{
					_bg.x = data.bg.x
					_bg.y = data.bg.y
				}
			}
			//左立绘
			if(!XUtil.isEmpty(data.p0)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p0.n)+".png", onLoadPic, [_bm0]);
				if(data.p0.sx){
					_bm0.scaleX = data.p0.sx
				}else{
					_bm0.scaleX = 1
				}
				if(data.p0.b){
					_bm0.filters = [_blackFilter];
				}else{
					_bm0.filters = [];
				}
				if(data.p0.m){
					_bm0.filters = [_mythFilter];
				}
				
				if(_prevData && checkSame(_prevData.p0, data.p0)){
					TweenLite.to(_bm0, time, {x:data.p0.x, y:data.p0.y});
				}else{
					_bm0.x = data.p0.x
					_bm0.y = data.p0.y
				}
			}else{
				_bm0.bitmapData = null;
			}
			
			//右立绘
			if(!XUtil.isEmpty(data.p1)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p1.n)+".png", onLoadPic,[_bm1]);
				if(data.p1.sx){
					_bm1.scaleX = data.p1.sx
				}else{
					_bm1.scaleX = 1
				}
				if(data.p1.b){
					_bm1.filters = [_blackFilter];
				}else{
					_bm1.filters = [];
				}
				if(data.p1.m){
					_bm1.filters = [_mythFilter];
				}
				if(_prevData && checkSame(_prevData.p1, data.p1)){
					TweenLite.to(_bm1, time, {x:data.p1.x, y:data.p1.y});
				}else{
					_bm1.x = data.p1.x
					_bm1.y = data.p1.y;
				}
			}else{
				_bm1.bitmapData = null;
			}
			
			//立绘3
			if(!XUtil.isEmpty(data.p2)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p2.n)+".png", onLoadPic,[_bm2]);
				if(data.p2.sx){
					_bm2.scaleX = data.p2.sx
				}else{
					_bm2.scaleX = 1
				}
				if(data.p2.b){
					_bm2.filters = [_blackFilter];
				}else{
					_bm2.filters = [];
				}
				if(data.p2.m){
					_bm2.filters = [_mythFilter];
				}
				if(_prevData && checkSame(_prevData.p2, data.p2)){
					TweenLite.to(_bm2, time, {x:data.p2.x, y:data.p2.y});
				}else{
					_bm2.x = data.p2.x
					_bm2.y = data.p2.y;
				}
			}else{
				_bm2.bitmapData = null;
			}
			
			//立绘4
			if(!XUtil.isEmpty(data.p3)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p3.n)+".png", onLoadPic,[_bm3]);
				if(data.p3.sx){
					_bm3.scaleX = data.p3.sx
				}else{
					_bm3.scaleX = 1
				}
				if(data.p3.b){
					_bm3.filters = [_blackFilter];
				}else{
					_bm3.filters = [];
				}
				if(data.p3.m){
					_bm3.filters = [_mythFilter];
				}
				if(_prevData && checkSame(_prevData.p3, data.p3)){
					TweenLite.to(_bm3, time, {x:data.p3.x, y:data.p3.y});
				}else{
					_bm3.x = data.p3.x
					_bm3.y = data.p3.y;
				}
			}else{
				_bm3.bitmapData = null;
			}
			
			//左表情
			if(!XUtil.isEmpty(data.lm)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.MOOD_URL, data.lm.name)+".png", onLoadPic,[_leftMoodBm]);
				_leftMoodBm.x = data.lm.x
				_leftMoodBm.y = data.lm.y;
			}else{
				_leftMoodBm.bitmapData = null;
			}
			//右表情
			if(!XUtil.isEmpty(data.rm)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.MOOD_URL, data.rm.name)+".png", onLoadPic,[_rightMoodBm]);
				_rightMoodBm.x = data.rm.x
				_rightMoodBm.y = data.rm.y;
			}else{
				_rightMoodBm.bitmapData = null;
			}
			
			//对话=============================
			if(data.name || data.dialog){
				addDialog(data);
			}
			
			//分歧剧情
			if(_diffBtns){
				for(var j:uint=0; j<_diffBtns.length; j++){
					if(_diffBtns[j].parent){
						_diffBtns[j].parent.removeChild(_diffBtns[j]);
						_diffBtns[j].removeEventListener(MouseEvent.CLICK, onSelect);
					}
				}
			}
			_diffBtns = new Array();
			var btn:XSelectButton;
			if(data.lb_1){
				btn = new XSelectButton(new DiffItemUI(), data.lb_0,data.nId_0,false)
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				_diffBtns.push(btn);
				_specialSp.addChild(btn);
				btn.x = 128;
				btn.y = 20;
			}
			if(data.lb_1){
				btn = new XSelectButton(new DiffItemUI(), data.lb_1,data.nId_1,false)
				_diffBtns.push(btn);
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				_specialSp.addChild(btn);
				btn.x = 128;
				btn.y = 88+20;
			}
			if(data.lb_2){
				btn = new XSelectButton(new DiffItemUI(), data.lb_2,data.nId_2,false)
				_diffBtns.push(btn);
				_specialSp.addChild(btn);
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				btn.x = 128;
				btn.y = 88*2+20;
			}
			if(data.lb_3){
				btn = new XSelectButton(new DiffItemUI(), data.lb_3,data.nId_3,false)
				_diffBtns.push(btn);
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				_specialSp.addChild(btn);
				btn.x = 128;
				btn.y = 88*3+20;
			}
			
			//特效
			if(data.act){
				if(data.act.flashRed){
					ActUtil.flash(_redSp)
					//XTip.showTip("特效：：闪红色")
					trace("特效：：闪红色----------------")
				}else if(data.act.flashWhite){
					ActUtil.flash(_wSp)
					trace("特效：：闪白色----------------")
					//XTip.showTip("特效：：闪白色")
				}
				if(data.act.shake){
					//闪动特效;
					trace("闪动----------------")
					ActUtil.shake(this._specialSp);
				}else if(data.act.shake1){
					//闪动特效;
					trace("闪动1----------------")
					ActUtil.shake(this._specialSp, 20, 10);
				}else if(data.act.shake2){
					//闪动特效;
					trace("闪动2----------------")
					ActUtil.shakeX(this._specialSp);
				}else if(data.act.shake3){
					//闪动特效;
					trace("闪动3----------------")
					ActUtil.shakeY(this._specialSp);
				}else if(data.act.shake4){
					//闪动特效;
					trace("闪动4----------------")
					ActUtil.shakeX(this._specialSp, 20, 10);
				}else if(data.act.shake5){
					//闪动特效;
					trace("闪动5----------------")
					ActUtil.shakeY(this._specialSp, 20, 10);
				}else if(data.act.shake6){
					//闪动特效;
					trace("闪动6----------------")
					ActUtil.shakeOnce(this._specialSp, 30, 15);
				}
			}
			
			
			
			function onLoadPic(info:LoaderInfo, targetBM:Bitmap):void{
				targetBM.bitmapData = Bitmap(info.content).bitmapData
				targetBM.smoothing = true;
			}
			
			//判定2个信息是否对等
			function checkSame(obj1:Object, obj2:Object):Boolean{
				if(obj1 && obj2 && obj1.name == obj2.name){
					return true;
				}
				return false;
			}
			
			function addDialog(data:RecordVo):void{
				var item:DialogCom = new DialogCom();
				var isLeft:Boolean = (!XUtil.isEmpty(data.p0) && data.p0.name && (!data.p0.alpha || data.p0.alpha == 1))
				item.showDilog(data.name, data.dialog, isLeft);
				_items.unshift(item);
				_itemC.addChild(item);
				var h:Number = 0;
				for(var i:uint=0; i<_items.length; i++){
					_items[i].y = h;
					_items[i].x = 10;
					h += _items[i].height+5;
				}
			}
		}
		
		/***/
		private function clear():void{
			_bg.bitmapData = _bm0.bitmapData = _bm1.bitmapData = _leftMoodBm.bitmapData = _rightMoodBm.bitmapData = null;
			while(_itemC.numChildren){
				_itemC.removeChildAt(0);
			}
		}
		
		private function onClick(event:MouseEvent):void{
			if(!_curData.lb_1){//分支剧情
				if(_curData.eventInfo){//事件解析，也许是战斗，也许其他
					if(_curData.eventInfo.fight){
						(ModelManager.getInstance(FightCom) as FightCom).showFight(_curData.eventInfo.fight, resume, null)
					}if(_curData.eventInfo.gameOver){
						XAlert.showArert("剧情结束","调试", this.close, null, "", "", true, false);
						return;
					}else{
						XTip.showTip("未知功能~~~");
						resume();
					}
				}else{
					_prevData = _curData;
					_curData = _source[_curData.nId_0];
					parseDialog(_curData);
				}
			}
		}
		
		/**继续*/
		private function resume():void{
			_prevData = _curData;
			_curData = _source[_curData.nId_0];
			parseDialog(_curData);
		}
		
		/***/
		private function onSelect(event:MouseEvent):void{
			var data:Object = event.currentTarget.data;
			_prevData = _curData;
			_curData = _source[data];
			parseDialog(_curData);
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
		
		private function onBtnClick(event:MouseEvent):void{
			this.close();
		}
		
		private function init():void{
			_specialSp = new Sprite();
			this.addChild(_specialSp);
			
			_bg = new Bitmap();
			_specialSp.addChild(_bg);
			_bm0 = new Bitmap();
			_bm1 = new Bitmap();
			_bm2 = new Bitmap();
			_bm3 = new Bitmap();
			_leftMoodBm = new Bitmap();
			_rightMoodBm = new Bitmap();
			_specialSp.addChild(_bm0);
			_specialSp.addChild(_bm1);
			_specialSp.addChild(_bm2);
			_specialSp.addChild(_bm3);
			_specialSp.addChild(_leftMoodBm);
			_specialSp.addChild(_rightMoodBm);
			//底板
			var shp:Shape = new Shape();
			shp.graphics.beginFill(0);
			shp.graphics.drawRect(0,0,750,480);
			shp.graphics.endFill();
			_specialSp.addChild(shp);
			shp.y = 480;
			
			closeBtn = new Button();
			_specialSp.addChild(closeBtn);
			closeBtn.width = 40;
			closeBtn.x = 750-closeBtn.width;;
			closeBtn.label = "关闭";
			shp = new Shape();
			shp.graphics.beginFill(0xff0000, 0.1);
			shp.graphics.drawRect(0,0, 750, 960);
			shp.graphics.endFill();
			_specialSp.addChildAt(shp,0);
			
			_sp = new ScrollPane();
			_specialSp.addChild(_sp);
			_sp.y = 480;
			_sp.setSize(750, 480);
			
			_itemC = new Sprite();
			_specialSp.addChild(_itemC);
			_itemC.y = 480;
			this.bgAlpha = 1;
			
			_specialSp.scrollRect = new Rectangle(0,0, 750, 960);
			
			_redSp = new Sprite();
			_redSp.graphics.beginFill(0xff0000);
			_redSp.graphics.drawRect(0,0,750, 960);
			_redSp.graphics.endFill();
			
			_wSp = new Sprite();
			_wSp.graphics.beginFill(0xffffff);
			_wSp.graphics.drawRect(0,0,750, 960);
			_wSp.graphics.endFill();
			
			_specialSp.addChild(_redSp);
			_specialSp.addChild(_wSp);
			_redSp.visible = _wSp.visible = false;
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show(true);
			//this.y = 0;
		}
		
		override protected function initEvent():void{
			closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			this.addEventListener(MouseEvent.CLICK, onClick);
		}
		
		override protected function removeEvent():void{
			closeBtn.removeEventListener(MouseEvent.CLICK, onBtnClick)
			this.removeEventListener(MouseEvent.CLICK, onClick);
		}
		
		/**Key主要*/
		private function getStr(key:String):String{
			switch(key){
				case "gold":
					return "金币";
					break;
			}
			return key
		}
		
		override public function get width():Number{
			return 640;
		}
		
		override public function get height():Number{
			return 800;
		}
	}
}