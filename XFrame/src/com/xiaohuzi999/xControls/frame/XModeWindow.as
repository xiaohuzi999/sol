package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.frame.manager.TipManager;
	import com.xiaohuzi999.xControls.util.DataLoading;
	import com.xiaohuzi999.xControls.util.XUtil;
	
	import flash.display.DisplayObjectContainer;
	import flash.events.Event;
	
	/**
	 * 模式窗口类，默认不可移动,居中对齐
	 * @author xiaohuzi999@163.com
	 * 特殊方法：convert模式切换
	 */
	public class XModeWindow extends XWindow
	{
		/**XModeWindow的默认容器，静态*/
		private static var _defaultContainer:DisplayObjectContainer;
		
		/**背景透明度*/
		private var _bgAlpha:Number = 0;
		/**背景颜色*/
		private var _bgColor:Number = 0x000000;
		/**常量-模式窗口*/
		public static const WINDOW_TYPE_MODE:int = 2;
		/**常量-普通窗口*/
		public static const WINDOW_TYPE_NORMAL:int = 1;
		private var _currentMode:int = 2; //当前模式
		
		public function XModeWindow()
		{
			this.movable = false;
		}
		
		/**
		 * 打开
		 * @param autoAlignCenter 是否自动居中对齐
		 * */
		override public function show(autoAlignCenter:Boolean = true):void{
			this.graphics.clear();
			super.show(autoAlignCenter);
			if(autoAlignCenter)
			this.stage.addEventListener(Event.RESIZE,paintBg);
			paintBg();
		}
		
		/**关闭*/
		override public function close():void{
			if(this.stage){
				this.stage.removeEventListener(Event.RESIZE,paintBg);
				this.stage.removeEventListener(Event.RESIZE,update);
				this.stage.focus = null;
			} 
			super.close();
			this.graphics.clear();
			TipManager.hideTip();
		}
		
		/**重置窗口*/
		protected function update(event:Event = null):void{
			this.graphics.clear();
			if(_autoAlign){
				XUtil.alignCenter(this);
			}
			paintBg();
		}
		
		/**
		 * 模式窗口与正常窗口转换
		 * @param type窗体模式,模式常量定义于XModeWindow类中
		 */
		public function convert(type:int = XModeWindow.WINDOW_TYPE_NORMAL):void
		{
			_currentMode = type;
			if(type == XModeWindow.WINDOW_TYPE_NORMAL){
				this.graphics.clear();
			}else{
				this.paintBg();
			}
		}
		
		/**
		 * 绘制背景层
		 */
		protected function paintBg(event:Event = null):void{
			if(this.stage && _currentMode == XModeWindow.WINDOW_TYPE_MODE){
				this.graphics.clear();
				this.graphics.beginFill(_bgColor,bgAlpha);
				this.graphics.drawRect(-this.x-LayerManager.delX/2,-this.y-LayerManager.delY/2,this.stage.stageWidth,this.stage.stageHeight);
				this.graphics.endFill();
			}
		}
		
		/**背景透明度*/
		public function set bgAlpha(value:Number):void{
			this._bgAlpha = value;
			paintBg();
		}
		
		/**背景透明度*/
		public function get bgAlpha():Number{
			return this._bgAlpha;
		}
		
		/**背景颜色*/
		public function set bgColor(value:Number):void{
			this._bgColor = value;
			paintBg();
		}
		
		/**背景颜色*/
		public function get bgColor():Number{
			return this._bgColor;
		}
		
		/**获取容器*/
		override public function get container():DisplayObjectContainer{
			if(!_container){
				_container = defaultContainer;
			}
			return _container
		}
		
		//----------------------------------------------------------------------------------
		
		/**设置默认的容器-静态*/
		public static function set defaultContainer(c:DisplayObjectContainer):void{
			_defaultContainer = c;
		}
		
		/**获取默认的容器-静态*/
		public static function get defaultContainer():DisplayObjectContainer{
			return _defaultContainer;
		}
	}
}