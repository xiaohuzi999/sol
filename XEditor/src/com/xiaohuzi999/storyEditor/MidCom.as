package com.xiaohuzi999.storyEditor
{
	import com.xiaohuzi999.storyEditor.main.BgItem;
	import com.xiaohuzi999.storyEditor.main.PlayerItem;
	import com.xiaohuzi999.storyEditor.model.Consts;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.storyEditor.windows.ActEditWindow;
	import com.xiaohuzi999.storyEditor.windows.DataEditWindow;
	import com.xiaohuzi999.storyEditor.windows.EditDiaWindow;
	import com.xiaohuzi999.storyEditor.windows.EffEditWindow;
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
		private var $elementBtn:InteractiveObject
		private var $funBtn:InteractiveObject;
		
		//背景
		private var _bgItem:BgItem;
		//立绘
		private var _p0:PlayerItem;
		private var _p1:PlayerItem;
		private var _p2:PlayerItem;
		private var _p3:PlayerItem;
		//分歧剧情选单
		private var _diffBtns:Array;
		
		//数据层
		private var _data:RecordVo;
		
		//
		private var _tipTF:TextField;
		private var _msgTF:TextField;
		
		//对话框
		private var _diaEditWindow:EditDiaWindow;
		//分歧
		private var _diffentWindow:InsertDiffentWindow;
		//数据编辑
		private var _dataEditWindw:DataEditWindow;
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
			
			_bgItem.format(data.bg)
			//立绘
			_p0.format(data.p0);
			_p1.format(data.p1);
			_p2.format(data.p2);
			_p3.format(data.p3);
			
			
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
			if(data.lb_1){
				btn = new XSelectButton(new DiffItemUI(), data.lb_0,data.nId_0,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 20;
			}
			if(data.lb_1){
				btn = new XSelectButton(new DiffItemUI(), data.lb_1,data.nId_1,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 88+20;
			}
			if(data.lb_2){
				btn = new XSelectButton(new DiffItemUI(), data.lb_2,data.nId_2,false)
				_diffBtns.push(btn);
				$ui.addChild(btn);
				btn.x = 128;
				btn.y = 88*2+20;
			}
			if(data.lb_3){
				btn = new XSelectButton(new DiffItemUI(), data.lb_3,data.nId_3,false)
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
				_bgItem.update(item);
				_data.bg = _bgItem.data;
				dispatchEvent(new Event(XEvent.CHANGE));
			}else if(url.indexOf("player") != -1){
				if(XUtil.checkHit(_p0)){
					_p0.update(item);
					_data.p0 = _p0.data;
				}else if(XUtil.checkHit(_p1)){
					_p1.update(item);
					_data.p1 = _p1.data;
				}else if(XUtil.checkHit(_p2)){
					_p2.update(item);
					_data.p2 = _p2.data;
				}else if(XUtil.checkHit(_p3)){
					_p3.update(item);
					_data.p3 = _p3.data;
				}
				
				dispatchEvent(new Event(XEvent.CHANGE));
			}
		}
		
		/**获取数据*/
		public function get info():Object{
			return _data;
		}
		

		//
		private function onClick(event:MouseEvent):void{
			diaEditWindow.showWithArgs(_data);
		}
		
		private function onSave(event:XEvent):void{
			/*if(event.data){
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
			}*/
			format(this._data);
			dispatchEvent(new Event(XEvent.CHANGE));
		}
		
		private function onUpdate(e:Event):void{
			_data.p0 = _p0.data;
			_data.p1 = _p1.data;
			_data.p2 = _p2.data;
			_data.p3 = _p3.data;
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
				case $elementBtn:
					(ModelManager.getInstance(ActEditWindow) as ActEditWindow).showWithArgs(_data, "bg")
					break;
				case $effectBtn:
					(ModelManager.getInstance(EffEditWindow) as EffEditWindow).showWithArgs(_data)
					break;
				case $funBtn:
					(ModelManager.getInstance(FunEditWindow) as FunEditWindow).showWithArgs(_data)
					break;
			}
		}
		
		private function clear():void{
			_bgItem.reset();
			_p0.reset();
			_p1.reset();
			_p2.reset();
			_p3.reset();
			_p0.y = _p1.y = 120;
			_p1.x = _p3.x = 750-320;
			_p0.x = _p2.x = _p2.y = _p3.y = 0;
			_p0.alpha = _p2.alpha = _p2.alpha = _p3.alpha = 0;
			_bgItem.x = _bgItem.y = 0;
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
			$ui.diaMC.doubleClickEnabled = true;
			
			$dialogBtn = $ui.dialogBtn;
			$diffentBtn = $ui.diffentBtn;
			$dataBtn = $ui.dataBtn;
			$effectBtn = $ui.effectBtn;
			$funBtn = $ui.funBtn;
			$elementBtn = $ui.elementBtn;
			
			$ui.x = $ui.y = 0;
			_bgItem = new BgItem();
			$ui.picMC.addChild(_bgItem);
			
			_p0 = new PlayerItem();
			_p1 = new PlayerItem();
			_p2 = new PlayerItem();
			_p3 = new PlayerItem();
			_p0.y = _p1.y = 120;
			_p1.x = _p3.x = 750-320;
			_p2.visible = _p3.visible = false;
			$ui.picMC.addChild(_p0);
			$ui.picMC.addChild(_p1);
			$ui.picMC.addChild(_p2);
			$ui.picMC.addChild(_p3);
			_bgItem.atachPlayer(_p0, _p1, _p2, _p3);
			
			
			$ui.diaMC.mouseChildren = false;
			_tipTF = $ui.diaMC.tipTF;
			_msgTF = $ui.diaMC.msgTF;
			_msgTF.text = "";
		}
		
		private function initEvent():void{
			$ui.diaMC.addEventListener(MouseEvent.DOUBLE_CLICK, onClick);
			$dialogBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$diffentBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$dataBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$funBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$effectBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$elementBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			MainDispatcher.getInstance().addEventListener("save", onSave)
				
			MainDispatcher.getInstance().addEventListener(PlayerItem.UPDATE, onUpdate);
		}
	}
}
