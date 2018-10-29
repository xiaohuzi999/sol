package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.model.Consts;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.frame.XSelecteGroup;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.desktop.InteractiveIcon;
	import flash.display.Bitmap;
	import flash.display.InteractiveObject;
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.text.TextField;
	
	import fl.data.DataProvider;
	
	/**
	 * DataEditWindow
	 * author:xiaohuzi999
	 * DataEditWindow.as 2015-5-27 上午10:11:28
	 * version 1.0
	 */
	public class ActEditWindow extends XModeWindow
	{
		private var $ui:ActEditUI;
		//关闭
		private var $closeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var $resetBtn:InteractiveObject;
		
		private var $tfX:TextField;
		private var $tfY:TextField;
		private var $tfAlpha:TextField;
		
		//{name, x, y, scaleX, alpha, x1, alpha1};
		private var _data:Object;
		private var _vo:RecordVo;
		private var _key:String;
		private var _curData:Array;
		private var _bm:Bitmap;
		private var _group:XSelecteGroup;
		public function ActEditWindow()
		{
			init();
		}
		
		//
		public function showWithArgs( vo:RecordVo, key:String, title:String = ""):void{
			_vo = vo;
			show();
			for(var i:int=0; i<_group.buttons.length; i++){
				if(_group.buttons[i].data+"" == key){
					_group.selectedButton = _group.buttons[i];
					break;
				}
			}
			format(_vo, key);
			return;
			_data = vo[key];
			if(!_data){
				_data = {x:0, y:0};
			}
			show();
			reset();
			$ui.tfTitle.text = title+"";
			$tfX.text = (_data.x || 0)+"";
			$tfY.text = (_data.y || 0)+"";
			if(_data.hasOwnProperty("al")){
				$tfAlpha.text  = (_data.al)+""
			}else{
				$tfAlpha.text  = "1"
			}
			if(key == "eff"){
				_curData = _effectData;
			}else if(key == "bg"){
				_curData = _sceneData;
				$ui.cb.dataProvider = new DataProvider(_sceneData);
			}else{
				_curData = _playerData;
			}
			
			if(_curData){
				$ui.cb.dataProvider = new DataProvider(_curData);
			}else{
				this.close();
				XTip.showTip("未初始化，请挨个点击左上角的按钮");
			}
		}
		
		private function format(vo:RecordVo, key:String):void{
			reset();
			_data = vo[key];
			_key  = key;
			if(!_data){
				_data = {x:0, y:0};
			}
			//$ui.tfTitle.text = title+"";
			$tfX.text = (_data.x || 0)+"";
			$tfY.text = (_data.y || 0)+"";
			if(_data.hasOwnProperty("al")){
				$tfAlpha.text  = (_data.al)+""
			}else{
				$tfAlpha.text  = "1"
			}
			
			if(key == "eff"){
				_curData = _effectData;
			}else if(key == "bg"){
				_curData = _sceneData;
				$ui.cb.dataProvider = new DataProvider(_sceneData);
			}else{
				_curData = _playerData;
			}
			
			if(_curData){
				$ui.cb.dataProvider = new DataProvider(_curData);
			}else{
				this.close();
				XTip.showTip("未初始化，请挨个点击左上角的按钮");
				return;
			}
			
			var index:int = -1;
			for(var i:int=0; i<_curData.length; i++){
				if(_curData[i].label == _data.n){
					index = i;
					break;
				}
			}
			$ui.cb.selectedIndex = index;
			onBMChange();
			
			if(_data.act){
				for(i=0; i<$ui.actCB.dataProvider.length; i++){
					var item:Object = $ui.actCB.dataProvider.getItemAt(i);
					if(item.data == _data.act){
						$ui.actCB.selectedIndex = i;
						break;
					}
				}
			}else{
				$ui.actCB.selectedIndex = -1;
			}
			
			
		}
		
		//
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $confirmBtn:
					//
					if($ui.cb.selectedItem && $ui.cb.selectedItem.data){
						_data.al = parseFloat($tfAlpha.text);
						_data.x = int($tfX.text);
						_data.y = int($tfY.text);
						_data.n = $ui.cb.selectedItem.label;
					}
					if($ui.actCB.selectedItem && $ui.actCB.selectedItem.data){
						_data.act = $ui.actCB.selectedItem.data
					}else{
						delete _data.act;
					}
					_vo[_key] = _data;
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"))
					break;
				case $resetBtn:
					$tfY.text = "";
					$tfAlpha.text = "";
					break;
			}
		}
		
		private function onChange(e:XEvent):void{
			format(_vo, _group.selectedButton.data+"");
			$ui.tfTitle.text = _group.selectedButton.label+"";
		}
		
		private function onBMChange(e:Event=null):void{
			_bm.bitmapData = null;
			if(_key == "bg"){
				_bm.scaleX = _bm.scaleY = 0.1;
			}else{
				_bm.scaleX = _bm.scaleY = 0.4;
			}
			$ui.cb.selectedItem && DisplayLoader.getLoaderInfo($ui.cb.selectedItem.data, onLoadPic);
			
			function onLoadPic(info:LoaderInfo):void{
				_bm.bitmapData = Bitmap(info.content).bitmapData
			}
		}
		
		private function reset():void{
			_bm && (_bm.bitmapData = null);
			this.$tfX.text = this.$tfY.text =this.$tfAlpha.text ="";
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show(autoAlignCenter);
			XWindow.addPopWindow(this);
		}
		
		override public function close():void{
			super.close();
			XWindow.removePopWindow(this);
		}
		
		private function init():void{
			$ui = new ActEditUI();
			this.addChild($ui);
			this.$tfX = $ui.tfX;
			this.$tfY = $ui.tfY;
			this.$tfAlpha  = $ui.tfAlpha;
			this.$tfX.restrict = this.$tfY.restrict =this.$tfAlpha.restrict ="+-0123456789";
			reset();
			
			$closeBtn = $ui.closeBtn;
			$confirmBtn = $ui.btnSave;
			$resetBtn = $ui.btnDel;
			
			var btns:Array  = new Array();
			var lbs:Array = ["背景", "装饰", "立绘1", "立绘2", "立绘3", "立绘4"];
			var keys:Array = ["bg", "eff", "p0", "p1", "p2", "p3"]
			for(var i:int=0; i<lbs.length; i++){
				var btn:XSelectButton = new XSelectButton($ui["btn_"+i],  lbs[i], keys[i]);
				btns.push(btn);
			}
			_group = new XSelecteGroup(btns);
			
			_bm = new Bitmap();
			this.$ui.addChild(_bm);
			_bm.x = 50;
			_bm.y = 200;
			_bm.scaleX = _bm.scaleY = 0.2;
			
			var arr:Array = [
				{label:"无", data:null},
				{label:"咚咚咚", data:"ddd"},
				{label:"踏踏踏", data:"ttt"}
			]
			$ui.actCB.dataProvider = new DataProvider(arr);
		}
		
		override protected function initEvent():void{
			$closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			_group.addEventListener(XEvent.CHANGE, onChange);
			$ui.cb.addEventListener(Event.CHANGE, onBMChange);
		}
		
		override protected function removeEvent():void{
			$closeBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			_group.removeEventListener(XEvent.CHANGE, onChange);
			$ui.cb.removeEventListener(Event.CHANGE, onBMChange);
		}
		
		private static var _sceneData:Array;
		private static var _playerData:Array;
		private static var _effectData:Array;
		/**初始化场景数据*/
		public static function initScene(arr:Array):void{
			var file:File;
			var tmp:Array = [{label:"无", data:null}];
			for(var i:int=0; i<arr.length; i++){
				file = arr[i];
				tmp.push({label:(file.name+"").split(".")[0], data:file.url});
			}
			_sceneData = tmp;
		}
		
		/**初始化头像*/
		public static function initPlayer(arr:Array):void{
			var file:File;
			var tmp:Array = [{label:"无", data:null}];
			for(var i:int=0; i<arr.length; i++){
				file = arr[i];
				tmp.push({label:(file.name+"").split(".")[0], data:file.url});
			}
			_playerData = tmp;
		}
		
		/**初始化特效*/
		public static function initEffect(arr:Array):void{
			var file:File;
			var tmp:Array = [{label:"无", data:null}];
			for(var i:int=0; i<arr.length; i++){
				file = arr[i];
				tmp.push({label:(file.name+"").split(".")[0], data:file.url});
			}
			_effectData = tmp;
		}
	}
}