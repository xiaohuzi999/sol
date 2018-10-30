package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	
	/**
	 * CreateSceneWindow
	 * author:xiaohuzi999
	 * CreateSceneWindow.as 2015-5-19 下午3:52:22
	 * version 1.0
	 */
	public class CreateSceneWindow extends XModeWindow
	{
		private var $ui:MovieClip;
		private var $closeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var _oldName:String;
		/**事件--创建剧情*/
		public static const CREATE_SCENE:String = "createScene";
		public function CreateSceneWindow()
		{
			init();
		}
		
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $confirmBtn:
					if(!$ui.nameTF.text){
						XTip.showTip("剧情名不能空");
					}else{
						this.dispatchEvent(new XEvent(CREATE_SCENE, {storyName:$ui.nameTF.text, condition:$ui.conditionTF.text, type:$ui.typeTF.text}));
						this.close();
					}
					break;
			}
		}
		
		public function showWithArg(obj:Object):void{
			show();
			_oldName = obj.storyName;
			$ui.nameTF.text = oldName
			$ui.conditionTF.text = obj.condition+"";
			$ui.typeTF.text = obj.type
			$ui.nameTF.setSelection($ui.nameTF.length, $ui.nameTF.length);  
		}
		
		private function init():void{
			$ui = new CreateSceneUI();
			this.addChild($ui);
			$closeBtn = $ui.closeBtn;
			$confirmBtn = $ui.confirmBtn;
			$ui.bgMC.scale9Grid = new Rectangle(100,100,100,100);
		}
		
		public function get oldName():String{
			return _oldName;
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show();
			$ui.nameTF.text = "新剧情"
			_oldName = "";
			stage.focus = $ui.nameTF;
			$ui.nameTF.setSelection($ui.nameTF.length, $ui.nameTF.length);  
			XWindow.addPopWindow(this);
		}
		
		override public function close():void{
			super.close();
			XWindow.removePopWindow(this);
		}
		
		override protected function initEvent():void{
			$closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
		}
		
		override protected function removeEvent():void{
			$closeBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
		}
	}
}