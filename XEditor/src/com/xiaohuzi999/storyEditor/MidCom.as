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
		private var _bg:MovieClip;
		private var _bgSp:Sprite;
		//左立绘
		private var _leftMC:MovieClip;
		//
		private var _dragSp:Sprite;
		//右立绘
		private var _rigthMC:MovieClip;
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
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, data.bg.name)+".jpg", onLoadPic, [_bg.bm]);
				_bg.x = data.bg.x;
				_bg.y = data.bg.y;
			}
			//左立绘
			if(!XUtil.isEmpty(data.p0)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p0.name)+".png", onLoadPic, [_leftMC.bm]);
				_leftMC.x = data.p0.x;
				_leftMC.y = data.p0.y;
				if(data.p0.scaleX){
					_leftMC.scaleX = data.p0.scaleX
				}
				if(data.p0.alpha){
					_leftMC.alpha = data.p0.alpha;
				}
			}
			
			//右立绘
			if(!XUtil.isEmpty(data.p1)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p1.name)+".png", onLoadPic,[_rigthMC.bm]);
				_rigthMC.x = data.p1.x;
				_rigthMC.y = data.p1.y
				if(data.p1.scaleX){
					_rigthMC.scaleX = data.p1.scaleX
				}
				if(data.p1.alpha != undefined){
					_rigthMC.alpha = data.p1.alpha;
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
				obj.name = (data.name+"").split(".")[0];
				obj.x = _leftMC.x;
				obj.y = _leftMC.y
				_data.bg = obj;
				
				_bg.bm.bitmapData = item.pic;
				dispatchEvent(new Event(XEvent.CHANGE));
			}else if(url.indexOf("player") != -1){
				if($ui.mouseX < 375){
					_leftMC.bm.bitmapData = item.pic;
					_leftMC.x = 0;
					_leftMC.y = 0
					_leftMC.scaleX = 1;
					obj.name = (data.name+"").split(".")[0];
					obj.x = _leftMC.x;
					obj.y = _leftMC.y
					_data.p0 = obj;
				}else{
					_rigthMC.bm.bitmapData = item.pic;
					_rigthMC.x = 0;
					_rigthMC.y = 0
					_rigthMC.scaleX = 1;
					obj.name = (data.name+"").split(".")[0];
					obj.x = _rigthMC.x;
					obj.y = _rigthMC.y
					_data.p1 = obj;
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
				if(_dragSp == _leftMC){
					_data.p0.x = _leftMC.x;
					_data.p0.y = _leftMC.y;
					_data.p0.scaleX=_leftMC.scaleX;
					_data.p0.alpha = _leftMC.alpha;
				}else if(_dragSp == _rigthMC){
					_data.p1.x = _rigthMC.x;
					_data.p1.y = _rigthMC.y;
					_data.p1.scaleX=_rigthMC.scaleX;
					_data.p1.alpha = _leftMC.alpha;
				}else if(_dragSp == _bg){
					_data.bg.x = _bg.x;
					_data.bg.y = _bg.y;
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
				
				if(_currentMenuItem == _leftMC){
					_data.p0.x = _leftMC.x;
					_data.p0.y = _leftMC.y;
					_data.p0.scaleX = _leftMC.scaleX;
					_data.p0.alpha = _leftMC.alpha
				}else{
					_data.p1.x = _rigthMC.x
					_data.p1.y = _rigthMC.y;
					_data.p1.scaleX = _rigthMC.scaleX;
					_data.p1.alpha = _rigthMC.alpha
				}
			}else if(event.currentTarget.label == "半透明"){
				if(_currentMenuItem.alpha == 1){
					_currentMenuItem.alpha = 0.7;
				}else{
					_currentMenuItem.alpha = 1;
				}
				
				if(_currentMenuItem == _leftMC){
					_data.p0.x = _leftMC.x;
					_data.p0.y = _leftMC.y;
					_data.p0.scaleX = _leftMC.scaleX;
					_data.p0.alpha = _leftMC.alpha
				}else{
					_data.p1.x = _rigthMC.x;
					_data.p1.y = _rigthMC.y;
					_data.p1.scaleX = _rigthMC.scaleX;
					_data.p1.alpha = _rigthMC.alpha
				}
			}else if(event.currentTarget.label == "删除"){
				if(_currentMenuItem == _leftMC){
					_data.p0 = "";
					_leftMC.bm.bitmapData = null;
				}else if(_currentMenuItem == _rigthMC){
					_rigthMC.bm.bitmapData = null;
					_data.p1 = "";
				}
			}else if(event.currentTarget.label == "自动对齐"){
				this.dispatchEvent(new XEvent(ALIGN, _currentMenuItem == _leftMC));
			}else if(event.currentTarget.label == "一键背景"){
				if(_data.bg){
					dispatchEvent(new XEvent(SETBG,_data.bg));
				}else{
					XTip.showTip("当前对话没有背景~");
				}
			}else if(event.currentTarget.label == "继承立绘"){
				dispatchEvent(new XEvent(SETPLAYER,_data));
			}else if(event.currentTarget.label == "锁定立绘"){
				_leftMC.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
				_rigthMC.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
			}else if(event.currentTarget.label == "解锁立绘"){
				_leftMC.addEventListener(MouseEvent.MOUSE_DOWN, onME);
				_rigthMC.addEventListener(MouseEvent.MOUSE_DOWN, onME);
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
			_leftMC.alpha = _rigthMC.alpha = _leftMC.scaleX = _rigthMC.scaleX = 1;
			_leftMC.bm.bitmapData = _rigthMC.bm.bitmapData = _bg.bm.bitmapData = null;
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
			_bg = new MovieClip();
			_bg.bm = new Bitmap();
			_bg.addChild(_bg.bm)
			_bgSp = new Sprite();
			_bgSp.addChild(_bg);
			$ui.picMC.addChild(_bgSp);
			_bgSp.scrollRect = new Rectangle(0,0,750, 800);
			//this.scrollRect = new Rectangle(0,0, this.width, this.height);
			
			createMenu()
			$ui.picMC.contextMenu = _bgMenu
			
			
			_leftMC = new MovieClip();
			TipManager.registerTip(_leftMC, "左立绘");
			_leftMC.bm = new Bitmap();
			_leftMC.addChild(_leftMC.bm);
			$ui.picMC.addChild(_leftMC);
			_leftMC.contextMenu = _menu;
			
			_rigthMC = new MovieClip();
			_rigthMC.bm = new Bitmap();
			_rigthMC.addChild(_rigthMC.bm)
			$ui.picMC.addChild(_rigthMC);
			_rigthMC.x = $ui.picMC.width-320;
			_rigthMC.contextMenu = _menu
			TipManager.registerTip(_rigthMC, "右立绘");
			$ui.diaMC.doubleClickEnabled = true;
			
			$ui.diaMC.mouseChildren = false;
			_tipTF = $ui.diaMC.tipTF;
			_msgTF = $ui.diaMC.msgTF;
			_msgTF.text = "";
		}
		
		private function initEvent():void{
			_leftMC.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			_rigthMC.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			_bg.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			
			_leftMC.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
			_rigthMC.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
			_bg.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
			
			
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
