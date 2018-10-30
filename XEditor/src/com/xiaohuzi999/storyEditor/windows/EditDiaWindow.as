package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.desktop.InteractiveIcon;
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.system.System;
	import flash.text.TextField;
	
	import fl.controls.ColorPicker;
	import fl.events.ColorPickerEvent;
	
	/**
	 * EditDiaWindow
	 * author:xiaohuzi999
	 * EditDiaWindow.as 2015-5-19 下午2:53:57
	 * version 1.0
	 */
	public class EditDiaWindow extends XModeWindow
	{
		private var $ui:MovieClip
		private var $closeBtn:InteractiveObject;
		private var $saveBtn:InteractiveObject;
		private var $resetBtn:InteractiveObject
		private var $cp0:ColorPicker;
		private var $cp1:ColorPicker;
		private var $nameTF:TextField;
		private var $diaTF:TextField;
		private var _data:RecordVo;
		public function EditDiaWindow()
		{
			init();
		}
		
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $saveBtn:
					//数据格式有待商量
					this.close();
					var nameStr:String = $nameTF.text;
					if(nameStr && $nameTF.textColor != 0){
						nameStr = "<font color='#"+$nameTF.textColor.toString(16)+"'>"+$nameTF.text+"</font>";
					}
					if(_data){
						_data.name = nameStr;
						_data.dialog = $diaTF.text;
					}
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"))
					break;
				case $resetBtn:
					$nameTF.text = $diaTF.text = "";
					break;
			}
		}
		
		private function onColor(event:ColorPickerEvent):void{
			switch(event.currentTarget){
				case $cp0:
					$nameTF.textColor = event.color;
					$nameTF.text = $nameTF.text;
					break;
				case $cp1:
					System.setClipboard("<font color='#"+event.color.toString(16)+"'>");
					XTip.showTip("颜色代号已复制到剪贴板");
					break;
			}
		}
		
		public function showWithArgs(data:RecordVo):void{
			_data = data;
			if(data){
				$nameTF.htmlText = data.name?data.name:"";
				$diaTF.text = data.dialog?data.dialog:"";
			}else{
				$diaTF.text = "";
			}
			show();
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
			$ui = new EditDiaWindowUI();
			this.addChild($ui);
			$closeBtn = $ui.closeBtn;
			
			$saveBtn = $ui.saveBtn;
			$resetBtn = $ui.resetBtn;
			
			$nameTF = $ui.nameTF;
			$diaTF = $ui.diaTF;
			
			$cp0 = $ui.cp0;
			$cp1 = $ui.cp1;
			this.$ui.bgMC.scale9Grid  = new Rectangle(100,100,100,100);
		}
		
		override protected function initEvent():void{
			$closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$saveBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$cp0.addEventListener(ColorPickerEvent.CHANGE, onColor);
			$cp1.addEventListener(ColorPickerEvent.CHANGE, onColor);
		}
		
		override protected function removeEvent():void{
			$closeBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$saveBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$cp0.removeEventListener(ColorPickerEvent.CHANGE, onColor);
			$cp1.removeEventListener(ColorPickerEvent.CHANGE, onColor);
		}
	}
}