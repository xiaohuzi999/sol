package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.frame.XSelecteGroup;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	/**
	 * InsertDiffentWindow //插入分歧剧情
	 * author:xiaohuzi999
	 * InsertDiffentWindow.as 2015-5-21 上午11:05:45
	 * version 1.0
	 */
	public class InsertDiffentWindow extends XModeWindow
	{
		private var $ui:MovieClip
		private var $closeBtn:InteractiveObject;
		private var $addBtn:InteractiveObject;
		private var $removeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var $cancelBtn:InteractiveObject;
		private var $nameTF:TextField;
		private var _data:RecordVo;
		private var _group:XSelecteGroup;
		public function InsertDiffentWindow()
		{
			init();
		}
		
		public function showWithArgs(data:RecordVo):void{
			_data = data;
			this.show();
			for(var i:uint=0; i<_group.buttons.length; i++){
				if(_data.hasOwnProperty("label_"+i) && _data["label_"+i] ){
					_group.buttons[i].data = _data["nextRecordId_"+i];
					_group.buttons[i].label = _data["label_"+i];
					_group.buttons[i].ui.tipTF.visible = true;
				}else{
					_group.buttons[i].data = null;
					_group.buttons[i].label = " ";
					_group.buttons[i].ui.tipTF.visible = false;
				}
			}
			_group.selectedButton = _group.buttons[0];
		}
		
		private function addItem(itemName:String):void{
			if(Object($addBtn).label == "添加"){
				for(var i:uint=0; i<_group.buttons.length; i++){
					if(!_group.buttons[i].label || _group.buttons[i].label == " "){
						//链接
						_group.buttons[i].data = _data.nextRecordId_0
						_group.buttons[i].label = itemName;
						_group.buttons[i].ui.tipTF.visible = true;
						return;
					}
				}
			}else{//修改
				_group.selectedButton.label = itemName
				Object(_group.selectedButton.ui).tipTF.visible = true;
			}
		}
		
		/***/
		private function delItem():void{
			if(_group.selectedButton.data != null){
				_group.selectedButton.data = null;
			}
			var list:Array = new Array();
			for(var i:uint=0; i<_group.buttons.length; i++){
				if(_group.buttons[i].data){
					list.push(_group.buttons[i].data);
				}
			}
			for(i=0; i<_group.buttons.length; i++){
				_group.buttons[i].data = list[i];
				if(_group.buttons[i].data){
					_group.buttons[i].label = String(_group.buttons[i].data).split("|")[1];
					_group.buttons[i].ui.tipTF.visible = true;
				}else{
					_group.buttons[i].label = " ";
					_group.buttons[i].ui.tipTF.visible = false;
				}
			}
		}
		
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
				case $cancelBtn:
					close();
					break;
				case $addBtn:
					if($nameTF.text){
						addItem($nameTF.text);
						onChange();
					}
					break;
				case $removeBtn:
					delItem();
					break;
				case $confirmBtn:
					for(var i:uint=0; i<_group.buttons.length; i++){
						if(_group.buttons[i].label && _group.buttons[i].label != " "){
							_data["nextRecordId_"+i] = _group.buttons[i].data
							_data["label_"+i] = _group.buttons[i].label;
							//出现条件没处理=================================
						}else{
							_data["nextRecordId_"+i] = null;
							_data["label_"+i] = null;
							_data["condition_"+i] = null;
						}
					}
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"))
					this.close();
					break;
			}
		}
		
		private function onItemClick(event:MouseEvent):void{
			var btn:XSelectButton = event.currentTarget as XSelectButton;
			if(btn.data){
				XTip.showTip("功能暂未实现");
			}
		}
		
		//
		private function onChange(event:Event=null):void{
			if(_group.selectedButton.data){
				Object($addBtn).label = "修改";
				$nameTF.text = _group.selectedButton.label
			}else{
				Object($addBtn).label = "添加";
				$nameTF.text = "";
			}
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show();
			$nameTF.text = "";
			XWindow.addPopWindow(this);
		}
		
		override public function close():void{
			super.close();
			XWindow.removePopWindow(this);
		}
		
		private function init():void{
			$ui = new DiffentWindowUI();
			this.addChild($ui);
			$nameTF = $ui.nameTF
			
			$closeBtn = $ui.closeBtn;
			$addBtn = $ui.addBtn;
			$removeBtn = $ui.removeBtn;
			$confirmBtn = $ui.confirmBtn;
			$cancelBtn = $ui.cancelBtn
			
			var btns:Array = new Array();
			for(var i:uint=0; i<4; i++){
				btns.push(new XSelectButton($ui["item_"+i],"", null, false));
				XSelectButton(btns[i]).doubleClickEnabled = true;
				btns[i].ui.tipTF.visible = false;
			}
			_group = new XSelecteGroup(btns);
			_group.selectedButton = btns[0];
		}
		
		override protected function initEvent():void{
			$closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$addBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$cancelBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$removeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			_group.addEventListener(XEvent.CHANGE, onChange);
			
			for(var i:uint=0; i<_group.buttons.length; i++){
				_group.buttons[i].addEventListener(MouseEvent.DOUBLE_CLICK, onItemClick);
			}
		}
	}
}