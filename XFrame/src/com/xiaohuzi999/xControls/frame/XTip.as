package  com.xiaohuzi999.xControls.frame
{
	import com.greensock.TweenLite;
	import com.greensock.easing.Cubic;
	
	import flash.display.DisplayObjectContainer;
	import flash.filters.GlowFilter;
	import flash.text.TextField;
	import flash.text.TextFormat;
	
	/**
	 * XTip 提示信息类
	 * author:xiaohuzi999@163.com
	 */
	public class XTip extends XWindow
	{
		/**容器*/
		private static var _defaultContainer:DisplayObjectContainer;
		/**文字滤镜*/
		private static const TEXT_FILTER:GlowFilter=new GlowFilter(0xff6600,1,5,5,3,1);
		/**tip实例*/
		private static var _tip:XTip;
		/**文本样式*/
		private static var _tf:TextFormat;
		/***/
		private var _txt:TextField
		//
		private const OFFSE_Y:int = 100;
		public function XTip()
		{
			super();
			init();
		}
		
		private function init():void{
			_txt = new TextField();
			this.addChild(_txt);
			_txt.textColor = 0xffffff;
			_txt.autoSize = "left";
			_txt.defaultTextFormat = tf;
			_txt.width = 400;
			_txt.multiline = true;
			_txt.wordWrap = true;
			_txt.filters = [TEXT_FILTER];
			this.mouseChildren = this.mouseEnabled = false;
			this._container = XTip._defaultContainer;
		}
		
		private function format(str:String):void{
			_txt.text = str+"";
		}
		
		override public function show(autoAlignCenter:Boolean=false):void{
			super.show(true);
		}
		
		override public function close():void{
			super.close();
			XTip._tip = null;
		}
		
		/**设置容器层级*/
		public static function set defaultContainer(disc:DisplayObjectContainer):void{
			_defaultContainer = disc;
		}
		
		/**
		 * 显示提示信息
		 * @param msg 需要显示的消息
		 * @param offsetX X偏移
		 * @param offsetY Y偏移
		 */
		public static function showTip(msg:String, offsetX:Number=0, offsetY:Number=0):void{
			if(_tip && _tip._txt.text == msg){
				return;
			}
			_tip = new XTip();
			_tip.format(msg);
			_tip.show();
			_tip.x += offsetX;
			_tip.y += offsetY;
			TweenLite.to(_tip, 1.8, {y:_tip.y-_tip.OFFSE_Y, onComplete:_tip.close, ease:Cubic.easeOut});
		}
		
		private static function get tf():TextFormat{
			if(!_tf){
				_tf = new TextFormat();
				_tf.size = 24;
				_tf.align = "center";
				_tf.bold = true;
			}
			return _tf;
		}
	}
}
