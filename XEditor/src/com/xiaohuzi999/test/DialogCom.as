package com.xiaohuzi999.test
{
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	
	
	/**
	 * DialogCom
	 * author:xiaohuzi999
	 * DialogCom.as 2015-5-27 下午12:12:33
	 * version 1.0
	 */
	internal class DialogCom extends Sprite
	{
		private var $nameTF:TextField;
		private var $dialogTF:TextField;
		public function DialogCom()
		{
			init();
		}
		
		private function init():void{
			$nameTF = new TextField();
			this.addChild($nameTF);
			$nameTF.width = 620;
			$dialogTF = new TextField();
			this.addChild($dialogTF);
			$dialogTF.y = $nameTF.height;
			$dialogTF.width = 620;
			$dialogTF.multiline = true;
			$dialogTF.autoSize = TextFieldAutoSize.LEFT;
		}
		
		public function showDilog(name:String, dialog:String, isLeft:Boolean):void{
			if(isLeft){
				$nameTF.autoSize = TextFieldAutoSize.LEFT;
			}else{
				$nameTF.autoSize = TextFieldAutoSize.RIGHT;
			}
			
			if($nameTF){
				$nameTF.htmlText = name;
			}
			$dialogTF.htmlText = dialog;
			if($nameTF.text){
				$dialogTF.y = $nameTF.height;
			}else{
				$dialogTF.y = 0;
			}
			
			this.graphics.beginFill(0xff6600,0.2);
			this.graphics.drawRoundRect(0,0,width, height, 10, 10);
			this.graphics.endFill();
		}
	}
}