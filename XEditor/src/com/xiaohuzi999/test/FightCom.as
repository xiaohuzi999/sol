package com.xiaohuzi999.test
{
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.util.TimerCommand;
	
	import flash.display.Shape;
	import flash.text.TextField;
	
	/**
	 * FightCom
	 * author:xiaohuzi999
	 * FightCom.as 2015-5-27 下午3:17:05
	 * version 1.0
	 */
	internal class FightCom extends XModeWindow
	{
		private var _callback:Function;
		private var _args:Array;
		public function FightCom()
		{
			init();
		}
		
		private function init():void{
			var shp:Shape = new Shape();
			shp.graphics.beginFill(0xffffff, 1);
			shp.graphics.drawRoundRect(0,0, 400, 200, 10,10);
			shp.graphics.endFill();
			this.addChild(shp);
			
			var tf:TextField = new TextField();
			tf.width = 380;
			tf.multiline = true;
			tf.autoSize = "left"
			tf.text = "战斗中~~~啊打。啊打。。阿打啊啊啊。。。。。。";
			tf.x = (width - tf.width)/2;
			tf.y = (height-tf.height)/2;
			this.addChild(tf);
		}
		
		/***/
		public function showFight(fightId:String, callback:Function, args:Array):void{
			TimerCommand.registerTimeCommand(close, null, 2, 1); 
			_callback = callback;
			_args = args;
			this.show(true);
		}
		
		override public function close():void{
			super.close();
			if(_callback != null){
				_callback.apply(null, _args);
			}
		}
	}
}