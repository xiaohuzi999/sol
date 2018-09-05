package com.xiaohuzi999.test
{
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
		private var _leftPlayerBm:Bitmap;
		/**右立绘*/
		private var _rightPlayerBm:Bitmap;
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
				if(_prevData.dataInfo){
					for(var i:String in _prevData.dataInfo){
						XTip.showTip("获得"+getStr(i)+_prevData.dataInfo[i]);
					}
				}
			}
			//切换特效
			_curData = data;
			if(data.bg){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, data.bg)+".jpg", onLoadPic, [_bg]);
			}
			//左立绘
			if(!XUtil.isEmpty(data.leftPlayer)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.leftPlayer.name)+".png", onLoadPic, [_leftPlayerBm]);
				if(data.leftPlayer.scaleX){
					_leftPlayerBm.scaleX = data.leftPlayer.scaleX
				}else{
					_leftPlayerBm.scaleX = 1
				}
				if(data.leftPlayer.alpha != undefined){
					_leftPlayerBm.alpha = data.leftPlayer.alpha;
				}else{
					_leftPlayerBm.alpha = 1;
				}
				_leftPlayerBm.x = data.leftPlayer.x
				_leftPlayerBm.y = data.leftPlayer.y
			}else{
				_leftPlayerBm.bitmapData = null;
			}
			
			//右立绘
			if(!XUtil.isEmpty(data.rightPlayer)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.rightPlayer.name)+".png", onLoadPic,[_rightPlayerBm]);
				if(data.rightPlayer.scaleX){
					_rightPlayerBm.scaleX = data.rightPlayer.scaleX
				}else{
					_rightPlayerBm.scaleX = 1
				}
				if(data.rightPlayer.alpha != undefined){
					_rightPlayerBm.alpha = data.rightPlayer.alpha
				}else{
					_rightPlayerBm.alpha = 1;
				}
				_rightPlayerBm.x = data.rightPlayer.x
				_rightPlayerBm.y = data.rightPlayer.y;
			}else{
				_rightPlayerBm.bitmapData = null;
			}
			//左表情
			if(!XUtil.isEmpty(data.leftMood)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.MOOD_URL, data.leftMood.name)+".png", onLoadPic,[_leftMoodBm]);
				_leftMoodBm.x = data.leftMood.x
				_leftMoodBm.y = data.leftMood.y;
			}else{
				_leftMoodBm.bitmapData = null;
			}
			//右表情
			if(!XUtil.isEmpty(data.rightMood)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.MOOD_URL, data.rightMood.name)+".png", onLoadPic,[_rightMoodBm]);
				_rightMoodBm.x = data.rightMood.x
				_rightMoodBm.y = data.rightMood.y;
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
			if(data.label_1){
				btn = new XSelectButton(new DiffItemUI(), data.label_0,data.nextRecordId_0,false)
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				_diffBtns.push(btn);
				_specialSp.addChild(btn);
				btn.x = 128;
				btn.y = 20;
			}
			if(data.label_1){
				btn = new XSelectButton(new DiffItemUI(), data.label_1,data.nextRecordId_1,false)
				_diffBtns.push(btn);
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				_specialSp.addChild(btn);
				btn.x = 128;
				btn.y = 88+20;
			}
			if(data.label_2){
				btn = new XSelectButton(new DiffItemUI(), data.label_2,data.nextRecordId_2,false)
				_diffBtns.push(btn);
				_specialSp.addChild(btn);
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				btn.x = 128;
				btn.y = 88*2+20;
			}
			if(data.label_3){
				btn = new XSelectButton(new DiffItemUI(), data.label_3,data.nextRecordId_3,false)
				_diffBtns.push(btn);
				btn.addEventListener(MouseEvent.CLICK, onSelect);
				_specialSp.addChild(btn);
				btn.x = 128;
				btn.y = 88*3+20;
			}
			
			
			
			function onLoadPic(info:LoaderInfo, targetBM:Bitmap):void{
				targetBM.bitmapData = Bitmap(info.content).bitmapData
				targetBM.smoothing = true;
			}
			
			function addDialog(data:RecordVo):void{
				var item:DialogCom = new DialogCom();
				var isLeft:Boolean = (!XUtil.isEmpty(data.leftPlayer) && data.leftPlayer.name && (!data.leftPlayer.alpha || data.leftPlayer.alpha == 1))
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
			_bg.bitmapData = _leftPlayerBm.bitmapData = _rightPlayerBm.bitmapData = _leftMoodBm.bitmapData = _rightMoodBm.bitmapData = null;
			while(_itemC.numChildren){
				_itemC.removeChildAt(0);
			}
		}
		
		private function onClick(event:MouseEvent):void{
			if(!_curData.label_1){//分支剧情
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
					_curData = _source[_curData.nextRecordId_0];
					parseDialog(_curData);
				}
			}
		}
		
		/**继续*/
		private function resume():void{
			_prevData = _curData;
			_curData = _source[_curData.nextRecordId_0];
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
			_leftPlayerBm = new Bitmap();
			_rightPlayerBm = new Bitmap();
			_leftMoodBm = new Bitmap();
			_rightMoodBm = new Bitmap();
			_specialSp.addChild(_leftPlayerBm);
			_specialSp.addChild(_rightPlayerBm);
			_specialSp.addChild(_leftMoodBm);
			_specialSp.addChild(_rightMoodBm);
			//底板
			var shp:Shape = new Shape();
			shp.graphics.beginFill(0);
			shp.graphics.drawRect(0,0,640,480);
			shp.graphics.endFill();
			_specialSp.addChild(shp);
			shp.y = 480;
			
			closeBtn = new Button();
			_specialSp.addChild(closeBtn);
			closeBtn.width = 40;
			closeBtn.x = 640-closeBtn.width;;
			closeBtn.label = "关闭";
			shp = new Shape();
			shp.graphics.beginFill(0xff0000, 0.1);
			shp.graphics.drawRect(0,0, 640, 960);
			shp.graphics.endFill();
			_specialSp.addChildAt(shp,0);
			
			_sp = new ScrollPane();
			_specialSp.addChild(_sp);
			_sp.y = 480;
			_sp.setSize(640, 480);
			
			_itemC = new Sprite();
			_specialSp.addChild(_itemC);
			_itemC.y = 480;
			this.bgAlpha = 1;
			
			_specialSp.scrollRect = new Rectangle(0,0, 640, 960);
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show(true);
			this.y = 0;
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
	}
}