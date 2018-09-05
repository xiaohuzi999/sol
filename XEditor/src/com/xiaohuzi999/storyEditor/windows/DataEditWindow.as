package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	/**
	 * DataEditWindow
	 * author:xiaohuzi999
	 * DataEditWindow.as 2015-5-27 上午10:11:28
	 * version 1.0
	 */
	public class DataEditWindow extends XModeWindow
	{
		private var $ui:MovieClip;
		private var $goldTF:TextField;
		private var $pointTF:TextField;
		private var $skillTF:TextField;
		private var $itemTF:TextField;
		private var $otherTF:TextField;
		private var $msgTF:TextField;
		private var $honorTF:TextField;
		//关闭
		private var $closeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var $resetBtn:InteractiveObject;
		
		private var _data:RecordVo;
		public function DataEditWindow()
		{
			init();
		}
		
		//
		public function showWithArgs(data:RecordVo):void{
			_data = data;
			show();
			reset();
			var obj:Object = (_data.dataInfo || {})
			if(obj.msg){
				$msgTF.text = obj.msg;
			}
			if(obj.honorLv){
				$honorTF.text = obj.honorLv;
			}
			if(obj.gold){
				$goldTF.text = obj.gold
			}
			if(obj.point){
				$pointTF.text = obj.point;
			}
			if(obj.skill){
				$skillTF.text = obj.skill;
			}
			if(obj.item){
				$itemTF.text = obj.item;
			}
			if(obj.other){
				$otherTF.text = obj.other;
			}
		}
		
		//
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $confirmBtn:
					var obj:Object = new Object();
					if($msgTF.text){
						obj.msg = $msgTF.text;
					}
					if($honorTF.text){
						obj.honorLv = $honorTF.text;
					}
					if($goldTF.text){
						obj.gold = $goldTF.text;
					}
					if($pointTF.text){
						obj.point = $pointTF.text;
					}
					if($skillTF.text){
						obj.skill = $skillTF.text;
					}
					if($itemTF.text){
						if($itemTF.text.indexOf(":") == -1){
							XTip.showTip("道具数据不符合规范");
							return;
						}
						obj.item = $itemTF.text
					}
					if($otherTF.text){
						if($otherTF.text.indexOf(":") == -1){
							XTip.showTip("其他数据不符合规范");
							return;
						}
						obj.other = $otherTF.text
					}
					if(!XUtil.isEmpty(obj)){
						_data.dataInfo = obj
					}else{
						_data.dataInfo = null;
					}
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"))
					this.close();
					break;
				case $resetBtn:
					reset();
					break;
			}
		}
		
		private function reset():void{
			$goldTF.text = $skillTF.text = $pointTF.text = $itemTF.text = $otherTF.text = $msgTF.text = $honorTF.text = "";
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
			$ui = new DataEditWindowUI();
			this.addChild($ui);
			$msgTF = $ui.msgTF;
			$honorTF = $ui.honorTF
			$goldTF = $ui.goldTF;
			$pointTF = $ui.pointTF;
			$skillTF = $ui.skillTF;
			$itemTF = $ui.itemTF;
			$otherTF = $ui.otherTF;
			$goldTF.restrict = $skillTF.restrict = $pointTF.restrict = "0-9";
			reset();
			
			$closeBtn = $ui.closeBtn;
			$confirmBtn = $ui.confirmBtn;
			$resetBtn = $ui.resetBtn;
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