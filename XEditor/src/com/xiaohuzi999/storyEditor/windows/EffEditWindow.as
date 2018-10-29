package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	import fl.controls.RadioButtonGroup;
	
	/**
	 * EffEditWindow
	 * author:xiaohuzi999
	 * EffEditWindow.as 2018-10-29 下午11:08:34
	 * version 1.0
	 *
	 */
	public class EffEditWindow extends XModeWindow
	{
		private var $ui:EffEditWindowUI;
		private var $tfTime:TextField;
		
		//关闭
		private var $closeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var $resetBtn:InteractiveObject;
		private var _data:RecordVo;
		private var _group:RadioButtonGroup;
		private var _group2:RadioButtonGroup;
		
		public function EffEditWindow()
		{
			init();
		}
		
		//
		public function showWithArgs(data:RecordVo):void{
			_data = data;
			show();
			reset();
			$tfTime.text = (_data.time || 500) +"";
			
			var obj:Object = data.act || {};
			if(obj.flashRed){
				_group.selection = $ui.rbRed
			}else if(obj.flashWhite){
				_group.selection = $ui.rbWhite;
			}else{
				_group.selection = $ui.rbNo;
			}
			
			if(obj.shake){
				_group2.selection = $ui.rbShake;
			}else if(obj.shake1){
				_group2.selection = $ui.rbShake1;
			}else if(obj.shake2){
				_group2.selection = $ui.rbShake2;
			}else if(obj.shake3){
				_group2.selection = $ui.rbShake3;
			}else if(obj.shake4){
				_group2.selection = $ui.rbShake4;
			}else if(obj.shake5){
				_group2.selection = $ui.rbShake5;
			}else if(obj.shake6){
				_group2.selection = $ui.rbShake6;
			}else{
				_group2.selection = $ui.rbNo2;
			}
			
		}
		
		//
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $confirmBtn:
					_data.time = Math.max(0, int($tfTime.text));
					
					_data.eventInfo = obj;
					
					//特效
					var obj:Object = new Object();
					if(_group.selectedData){
						obj[_group.selectedData] = true;
					}
					if(_group2.selectedData){
						obj[_group2.selectedData] = true;
					}
					_data.act = obj;
					
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"));
					close();
					break;
				case $resetBtn:
					reset();
					break;
			}
		}
		
		private function reset():void{
			
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
			$ui = new EffEditWindowUI();
			this.addChild($ui);
			$closeBtn = $ui.closeBtn;
			$confirmBtn = $ui.confirmBtn;
			$resetBtn = $ui.resetBtn;
			
			$tfTime = $ui.tfTime;
			_group = new RadioButtonGroup("act0");
			$ui.rbNo.group = $ui.rbRed.group = $ui.rbWhite.group = _group;
			
			_group2 = new RadioButtonGroup("act1");
			$ui.rbNo2.group = $ui.rbShake.group = $ui.rbShake1.group = $ui.rbShake2.group = $ui.rbShake3.group =  
				$ui.rbShake4.group = $ui.rbShake5.group = $ui.rbShake6.group= _group2;
		}
		
		override protected function initEvent():void{
			$closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
		}
		
		override protected function removeEvent():void{
			$closeBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
		}
	}
}