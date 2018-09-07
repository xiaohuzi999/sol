package com.xiaohuzi999.storyEditor
{
	import com.xiaohuzi999.storyEditor.model.Consts;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.storyEditor.windows.DataEditWindow;
	import com.xiaohuzi999.storyEditor.windows.EditDiaWindow;
	import com.xiaohuzi999.storyEditor.windows.FunEditWindow;
	import com.xiaohuzi999.storyEditor.windows.InsertDiffentWindow;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	import com.xiaohuzi999.xControls.frame.manager.TipManager;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.Bitmap;
	import flash.display.InteractiveObject;
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	
	/**
	 * MidCom
	 * author:xiaohuzi999
	 * MidCom.as 2015-5-18 下午11:24:15
	 * version 1.0
	 *
	 */
	internal class MidCom extends Sprite
	{
		private var $ui:MovieClip
		//
		private var $dialogBtn:InteractiveObject;
		private var $diffentBtn:InteractiveObject
		private var $dataBtn:InteractiveObject;
		private var $effectBtn:InteractiveObject;
		private var $funBtn:InteractiveObject;
		
		//背景
		private var _bgBM:Bitmap;
		//左立绘
		private var _leftCon:Sprite;
		private var _leftPlayerBM:Bitmap;
		private var _leftSP:Sprite;
		//
		private var _dragSp:Sprite;
		//右立绘
		private var _rightCon:Sprite;
		private var _rightPlayerBM:Bitmap;
		private var _rigthSp:Sprite;
		//分歧剧情选单
		private var _diffBtns:Array;
		
		//数据层
		private var _data:RecordVo;
		
		//
		private var _tipTF:TextField;
		private var _msgTF:TextField;
		
		private var _menu:NativeMenu;
		//背景表情
		private var _bgMenu:NativeMenu;
		//当前操作的对象
		private var _currentMenuItem:Sprite;
		
		//对话框
		private var _diaEditWindow:EditDiaWindow;
		//分歧
		private var _diffentWindow:InsertDiffentWindow;
		//数据编辑
		private var _dataEditWindw:DataEditWindow;
		
		//事件-对齐
		public static const ALIGN:String = "align"
		//事件-一键背景
		public static const SETBG:String = "setBg"
		//事件-立绘
		public static const SETPLAYER:String = "setPlayer"
		public function MidCom(ui:MovieClip)
		{
			$ui = ui;
			init();
			initEvent();
		}
		
		/**
		 * 格式化数据 ----------公式
		 * */
		public function format(data:RecordVo):void{
			clear();
			_data = data;
			//背景
			if(data.bg){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, data.bg)+".jpg", onLoadPic, [_bgBM]);
			}
			//左立绘
			if(!XUtil.isEmpty(data.leftPlayer)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.leftPlayer.name)+".png", onLoadPic, [_leftPlayerBM]);
				_leftSP.x = data.leftPlayer.x;
				_leftSP.y = data.leftPlayer.y;
				if(data.leftPlayer.scaleX){
					_leftSP.scaleX = data.leftPlayer.scaleX
				}
				if(data.leftPlayer.alpha){
					_leftSP.alpha = data.leftPlayer.alpha;
				}
			}
			
			//右立绘
			if(!XUtil.isEmpty(data.rightPlayer)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.rightPlayer.name)+".png", onLoadPic,[_rightPlayerBM]);
				_rigthSp.x = data.rightPlayer.x-this._rightCon.x;
				_rigthSp.y = data.rightPlayer.y
				if(data.rightPlayer.scaleX){
					_rigthSp.scaleX = data.rightPlayer.scaleX
				}
				if(data.rightPlayer.alpha != undefined){
					_rigthSp.alpha = data.rightPlayer.alpha;
				}
			}
			
			
			if(data.name || data.dialog){
				$ui.diaMC.tipTF.visible = false;
				if(data.name){
					$ui.diaMC.msgTF.text = data.name+":\n"+data.dialog
				}else{
					$ui.diaMC.msgTF.text = data.dialog
				}
			}else{
				$ui.diaMC.tipTF.visible = true;
				$ui.diaMC.msgTF.text = "";
			}
			
			//分歧剧情
			_diffBtns = new Array();
			var btn:XSelectButton;
			if(data.label_1){
				btn = new XSelectButton(new DiffItemUI(), data.label_0,data.nextRecordId_0,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 20;
			}
			if(data.label_1){
				btn = new XSelectButton(new DiffItemUI(), data.label_1,data.nextRecordId_1,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 88+20;
			}
			if(data.label_2){
				btn = new XSelectButton(new DiffItemUI(), data.label_2,data.nextRecordId_2,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 88*2+20;
			}
			if(data.label_3){
				btn = new XSelectButton(new DiffItemUI(), data.label_3,data.nextRecordId_3,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 88*3+20;
			}
			
			function onLoadPic(info:LoaderInfo, targetBM:Bitmap):void{
				targetBM.bitmapData = Bitmap(info.content).bitmapData
				targetBM.smoothing = true;
			}
		}
		
		/**加入背景-立绘*/
		public function addItem(item:Object):void{
			var data:* = item.data;
			var url:String = data.nativePath;
			var obj:Object = new Object();
			if(url.indexOf("background") != -1){//背景操作
				_data.bg = (data.name+"").split(".")[0];
				_bgBM.bitmapData = item.pic;
				dispatchEvent(new Event(XEvent.CHANGE));
			}else if(url.indexOf("player") != -1){
				if($ui.mouseX < 375){
					_leftPlayerBM.bitmapData = item.pic;
					_leftSP.x = 0;
					_leftSP.y = 0
					_leftSP.scaleX = 1;
					obj.name = (data.name+"").split(".")[0];
					obj.x = _leftSP.x;
					obj.y = _leftSP.y
					_data.leftPlayer = obj;
				}else{
					_rightPlayerBM.bitmapData = item.pic;
					_rigthSp.x = 0;
					_rigthSp.y = 0
					_rigthSp.scaleX = 1;
					obj.name = (data.name+"").split(".")[0];
					obj.x = this._rightCon.x+_rigthSp.x;
					obj.y = _rigthSp.y
					_data.rightPlayer = obj;
				}
				dispatchEvent(new Event(XEvent.CHANGE));
			}
		}
		
		/**获取数据*/
		public function get info():Object{
			return _data;
		}
		
		private function onME(event:MouseEvent):void{
			_dragSp = event.currentTarget as Sprite;
			_dragSp.startDrag();
			//_dragSp.parent.addChild(_dragSp);
		}
		
		private function onSelectItem(event:Event):void{
			_currentMenuItem = event.currentTarget as Sprite;
		}
		
		private function onMU(event:MouseEvent):void{
			if(_dragSp){
				var obj:Object;
				if(_dragSp == _leftSP){
					_data.leftPlayer.x = _leftSP.x;
					_data.leftPlayer.y = _leftSP.y;
					_data.leftPlayer.scaleX=_leftSP.scaleX;
					_data.leftPlayer.alpha = _leftSP.alpha;
				}else if(_dragSp == _rigthSp){
					_data.rightPlayer.x = _rigthSp.x+_rightCon.x;
					_data.rightPlayer.y = _rigthSp.y;
					_data.rightPlayer.scaleX=_rigthSp.scaleX;
					_data.rightPlayer.alpha = _leftSP.alpha;
				}
				_dragSp.stopDrag();
				dispatchEvent(new Event(XEvent.CHANGE));
				_dragSp = null;
			}
		}
		
		//
		private function onClick(event:MouseEvent):void{
			diaEditWindow.showWithArgs(_data);
		}
		
		private function onSave(event:XEvent):void{
			if(event.data){
				var data:Object = event.data;
				if(data.type == "EditDiaWindow"){
					_data.name = data.name;
					_data.dialog = data.dialog;
					$ui.diaMC.tipTF.visible = false;
					if(_data.name){
						$ui.diaMC.msgTF.text =_data.name+":\n"+_data.dialog
					}else if(_data.dialog){
						$ui.diaMC.msgTF.text = _data.dialog
					}
				}			
			}
			dispatchEvent(new Event(XEvent.CHANGE));
		}
		
		/***/
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $dialogBtn:
					diaEditWindow.showWithArgs(_data);
					break;
				case $diffentBtn:
					diffentWindow.showWithArgs(_data);
					break;
				case $dataBtn:
					dataEditWindw.showWithArgs(_data)
					break;
				case $effectBtn:
					XTip.showTip("~没做");
					break;
				case $funBtn:
					(ModelManager.getInstance(FunEditWindow) as FunEditWindow).showWithArgs(_data)
					break;
			}
		}
		
		private function onSelect(event:Event):void{
			var temp:Array 
			if(event.currentTarget.label == "翻转"){
				var tempX:Number = _currentMenuItem.x;
				_currentMenuItem.scaleX *= -1;
				_currentMenuItem.x = tempX - _currentMenuItem.scaleX * _currentMenuItem.width;
				
				if(_currentMenuItem == _leftSP){
					_data.leftPlayer.x = _leftSP.x;
					_data.leftPlayer.y = _leftSP.y;
					_data.leftPlayer.scaleX = _leftSP.scaleX;
					_data.leftPlayer.alpha = _leftSP.alpha
				}else{
					_data.rightPlayer.x = _rigthSp.x+_rightCon.x
					_data.rightPlayer.y = _rigthSp.y;
					_data.rightPlayer.scaleX = _rigthSp.scaleX;
					_data.rightPlayer.alpha = _rigthSp.alpha
				}
			}else if(event.currentTarget.label == "半透明"){
				if(_currentMenuItem.alpha == 1){
					_currentMenuItem.alpha = 0.7;
				}else{
					_currentMenuItem.alpha = 1;
				}
				
				if(_currentMenuItem == _leftSP){
					_data.leftPlayer.x = _leftSP.x;
					_data.leftPlayer.y = _leftSP.y;
					_data.leftPlayer.scaleX = _leftSP.scaleX;
					_data.leftPlayer.alpha = _leftSP.alpha
				}else{
					_data.rightPlayer.x = _rigthSp.x+_rightCon.x;
					_data.rightPlayer.y = _rigthSp.y;
					_data.rightPlayer.scaleX = _rigthSp.scaleX;
					_data.rightPlayer.alpha = _rigthSp.alpha
				}
			}else if(event.currentTarget.label == "删除"){
				if(_currentMenuItem == _leftSP){
					_data.leftPlayer = "";
					_leftPlayerBM.bitmapData = null;
				}else if(_currentMenuItem == _rigthSp){
					_rightPlayerBM.bitmapData = null;
					_data.rightPlayer = "";
				}
			}else if(event.currentTarget.label == "自动对齐"){
				this.dispatchEvent(new XEvent(ALIGN, _currentMenuItem == _leftSP));
			}else if(event.currentTarget.label == "一键背景"){
				if(_data.bg){
					dispatchEvent(new XEvent(SETBG,_data.bg));
				}else{
					XTip.showTip("当前对话没有背景~");
				}
			}else if(event.currentTarget.label == "继承立绘"){
				dispatchEvent(new XEvent(SETPLAYER,_data));
			}else if(event.currentTarget.label == "锁定立绘"){
				_leftSP.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
				_rigthSp.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
			}else if(event.currentTarget.label == "解锁立绘"){
				_leftSP.addEventListener(MouseEvent.MOUSE_DOWN, onME);
				_rigthSp.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			}
			
			dispatchEvent(new Event(XEvent.CHANGE));
		}
		
		//生成右键菜单
		private function createMenu():void{
			if(!_menu){
				_menu = new NativeMenu();
				var item:NativeMenuItem = new NativeMenuItem("翻转")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("半透明")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("自动对齐")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("删除")
				_menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				
				
				_bgMenu = new NativeMenu();
				item = new NativeMenuItem("一键背景")
				_bgMenu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("继承立绘")
				_bgMenu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("锁定立绘")
				_bgMenu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
				
				item = new NativeMenuItem("解锁立绘")
				_bgMenu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
			}
		}
		
		private function clear():void{
			_leftSP.alpha = _rigthSp.alpha = _leftSP.scaleX = _rigthSp.scaleX = 1;
			_leftPlayerBM.bitmapData = _rightPlayerBM.bitmapData = _bgBM.bitmapData = null;
			$ui.diaMC.tipTF.visible = true;
			$ui.diaMC.msgTF.text = "";
			_data = null;
			if(_diffBtns){
				for(var i:uint=0; i<_diffBtns.length; i++){
					if(_diffBtns[i] && _diffBtns[i].parent){
						_diffBtns[i].parent.removeChild(_diffBtns[i]);
					}
				}
			}
			_diffBtns = null;
		}
		
		private function get diaEditWindow():EditDiaWindow{
			if(!_diaEditWindow){
				_diaEditWindow = new EditDiaWindow();
			}
			return _diaEditWindow
		}
		
		private function get diffentWindow():InsertDiffentWindow{
			if(!_diffentWindow){
				_diffentWindow = new InsertDiffentWindow();
			}
			return _diffentWindow
		}
		
		private function get dataEditWindw():DataEditWindow{
			if(!_dataEditWindw){
				_dataEditWindw = new DataEditWindow();
			}
			return _dataEditWindw
		}
		
		private function init():void{
			this.addChild($ui);
			
			$dialogBtn = $ui.dialogBtn;
			$diffentBtn = $ui.diffentBtn;
			$dataBtn = $ui.dataBtn;
			$effectBtn = $ui.effectBtn;
			$funBtn = $ui.funBtn;
			
			$ui.x = $ui.y = 0;
			_bgBM = new Bitmap();
			$ui.picMC.addChild(_bgBM);
			_bgBM.scrollRect = new Rectangle(0,0,750, 800);
			this.scrollRect = new Rectangle(0,0, this.width, this.height);
			
			createMenu()
			$ui.picMC.contextMenu = _bgMenu
			
			_leftPlayerBM = new Bitmap();
			_leftSP = new Sprite();
			_leftCon = new Sprite();
			TipManager.registerTip(_leftSP, "左立绘");
			_leftSP.addChild(_leftPlayerBM);
			$ui.picMC.addChild(_leftCon);
			_leftCon.addChild(_leftSP);
			_leftCon.scrollRect = new Rectangle(0,0,320,430)
			_leftSP.contextMenu = _menu;
			
			_rightPlayerBM = new Bitmap();
			_rigthSp = new Sprite();
			_rightCon = new Sprite();
			//_rightCon.graphics.beginFill(0xff6600);
			//_rightCon.graphics.drawRect(0,0,320, 430);
			_rigthSp.addChild(_rightPlayerBM)
			$ui.picMC.addChild(_rightCon);
			_rightCon.addChild(_rigthSp);
			_rightCon.x = $ui.picMC.width-320;
			TipManager.registerTip(_rigthSp, "右立绘");
			_rightCon.scrollRect = new Rectangle(0,0,320,430)
			$ui.diaMC.doubleClickEnabled = true;
			_rigthSp.contextMenu = _menu
			
			$ui.diaMC.mouseChildren = false;
			_tipTF = $ui.diaMC.tipTF;
			_msgTF = $ui.diaMC.msgTF;
			_msgTF.text = "";
		}
		
		private function initEvent():void{
			_leftSP.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			_rigthSp.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			
			_leftSP.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
			_rigthSp.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
			
			
			LayerManager.stage.addEventListener(MouseEvent.MOUSE_UP, onMU);
			$ui.diaMC.addEventListener(MouseEvent.DOUBLE_CLICK, onClick);
			$dialogBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$diffentBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$dataBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$funBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$effectBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			MainDispatcher.getInstance().addEventListener("save", onSave)
		}
	}
}
