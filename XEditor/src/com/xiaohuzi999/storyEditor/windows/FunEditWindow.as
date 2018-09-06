package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.model.EventConst;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	/**
	 * FunEditWindow
	 * author:xiaohuzi999
	 * FunEditWindow.as 2015-5-27 下午2:46:04
	 * version 1.0
	 */
	public class FunEditWindow extends XModeWindow
	{
		private var $ui:MovieClip;
		private var $fightTF:TextField;
		private var $otherTF:TextField;
		//入队
		private var $joinTeamTF:TextField;
		//离队
		private var $leftTeamTF:TextField;
		//游戏结束
		private var $gameOverTF:TextField;
		
		//关闭
		private var $closeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var $resetBtn:InteractiveObject;
		private var _data:RecordVo;
		
		public function FunEditWindow()
		{
			init();
		}
		
		//
		public function showWithArgs(data:RecordVo):void{
			_data = data;
			show();
			reset();
			var obj:Object = (_data.eventInfo || {})
			if(obj.fight){
				$fightTF.text = obj.fight+"";
			}
			if(obj.joinTeam){
				$joinTeamTF.text = obj.joinTeam+"";
			}
			if(obj.leftTeam){
				$leftTeamTF.text = obj.leftTeam+"";
			}
			if(obj.gameOver){
				$gameOverTF.text = "true"
			}
			if(obj.start){
				$ui.startTF.text = "true"
			}
			var str:String = "";
			for(var i:String in obj){
				if(i != "fight"){
					if(str){
						str += "|"+i+":"+obj[i];
					}else{
						str= i+":"+obj[i];
					}
				}
			}
			//$otherTF.text = str;
		}
		
		//
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $confirmBtn:
					var obj:Object = new Object();
					if($fightTF.text){
						obj[EventConst.FIGHT] = $fightTF.text;
					}
					if($joinTeamTF.text){
						obj[EventConst.JOIN_TEAM] = $joinTeamTF.text;
					}
					if($leftTeamTF.text){
						obj[EventConst.LEFT_TEAM]  = $leftTeamTF.text;
					}
					if($gameOverTF.text){
						obj[EventConst.GAME_OVER]  = true
					}
					if($ui.startTF.text){
						obj[EventConst.START]  = true
					}
					if($otherTF.text){
						if($otherTF.text.indexOf(":") == -1){
							XTip.showTip("自定义功能不符合规范");
							return;
						}
						var arr:Array = $otherTF.text.split("|");
						var temp:Array;
						for(var i:uint=0; i<arr.length; i++){
							temp = (arr[i]+"").split(":");
							if(temp.length == 2){
								obj[temp[0]] == obj[temp[1]]
							}
						}
					}
					_data.eventInfo = obj;
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"));
					close();
					break;
				case $resetBtn:
					reset();
					break;
			}
		}
		
		private function reset():void{
			$fightTF.text = $otherTF.text = $joinTeamTF.text = $leftTeamTF.text = $gameOverTF.text = $ui.startTF.text = "";
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
			$ui = new FunEditWindowUI();
			this.addChild($ui);
			$closeBtn = $ui.closeBtn;
			$confirmBtn = $ui.confirmBtn;
			$resetBtn = $ui.resetBtn;
			
			$fightTF = $ui.fightTF;
			$otherTF = $ui.otherTF;
			$joinTeamTF = $ui.joinTeamTF;
			$leftTeamTF = $ui.leftTeamTF
			$gameOverTF = $ui.gameOverTF;
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