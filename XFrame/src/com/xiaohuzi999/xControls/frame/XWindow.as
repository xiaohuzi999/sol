package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.core.BasicView;
	import com.xiaohuzi999.xControls.frame.interfaces.IXWindow;
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.util.CommandVo;
	import com.xiaohuzi999.xControls.util.XUtil;
	
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.events.*;

	/**
	 * 窗体类
	 * @author xiaohuzi999@163.com
	 * @version 2.0;
	 */
	public class XWindow extends BasicView implements IXWindow
	{
		/**XWindow的默认容器，静态*/
		private static var _defaultContainer:DisplayObjectContainer;
		/**活动窗体列表*/
		private static var _actionWindows:Array = new Array();
		//--------------------------------------------------------------------------------------
		/**是否可拖动-默认为不可拖动*/
		private var _movable:Boolean;
		
		/**有效拖动高度*/
		private var _moveHeight:Number = 30;
		
		/**自动对齐*/
		protected var _autoAlign:Boolean = false;
		
		public function XWindow()
		{
			this.movable = false;
		}
		
		/**加事件*/
		protected function initEvent():void{
			
		}
		
		/**移除事件*/
		protected function removeEvent():void{
			
		}
		
		/**
		 * 显示窗体
		 * @param autoAlignCenter 是否自动居中对齐
		 */
		public function show(autoAlignCenter:Boolean = false):void{
			_autoAlign = autoAlignCenter
			_isShow = true;
			container.addChild(this);
			initEvent();
			if(autoAlignCenter){
				XUtil.alignCenter(this);
			}
		}
		/**关闭*/
		public function close():void{
			_isShow = false;
			removeEvent();
			if(this.parent){
				this.parent.removeChild(this);
			}
		}
		
		//鼠标事件
		private function onME(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					//拖动
					if(_movable){
						if(this.mouseY < this._moveHeight){
							this.stage.addEventListener(MouseEvent.MOUSE_UP,onME);
							this.startDrag();
						}
						//交换层级
						if(this.parent){
							this.parent.addChild(this)
						}
					}
				break;
				case MouseEvent.MOUSE_UP:
					//放手
					this.stopDrag();
					this.stage.removeEventListener(MouseEvent.MOUSE_UP, onME);
				break;
			}
		}
		
		/**
		 * 设置是否可以拖动
		 */
		public function set movable(b:Boolean):void{
			this._movable = b;
			if(this._movable && this._moveHeight > 0){
				this.addEventListener(MouseEvent.MOUSE_DOWN,onME);
			}else{
				this.removeEventListener(MouseEvent.MOUSE_DOWN,onME);
			}
		}
		
		/**
		 * 获取是否可以拖动
		 */
		public function get movable():Boolean{
			return this._movable;
		}
		
		/**获取容器*/
		override public function get container():DisplayObjectContainer{
			if(!_container){
				_container = defaultContainer;
			}
			return _container
		}
		
		/**
		 * 设置拖动高度
		 */
		public function set moveHeight(n:Number):void{
			this._moveHeight = n;
		}
		
		/**是否处于显示状态*/
		public function set isShow(b:Boolean):void{
			this._isShow = b;
		}
		
		/**是否处于显示状态*/
		public function get isShow():Boolean{
			return this._isShow
		}
		//----------------------------------------------------------------------------------
		//设置默认的容器
		public static function set defaultContainer(c:DisplayObjectContainer):void{
			_defaultContainer = c;
		}
		//获取
		public static function get defaultContainer():DisplayObjectContainer{
			return _defaultContainer;
		}
		
		/**加入浮动窗口-可以*/
		public static function addPopWindow(w:XWindow):void{
			_actionWindows.push(w);
		}
		public static function removePopWindow(w:XWindow):void
		{
			var index:int = _actionWindows.indexOf(w);
			if(index != -1)
				_actionWindows.splice(index,1);
		}
		
		/**关闭所有活动的窗体*/
		public static function closeAllWindows(exceptList:Array):void{
			var w:XWindow;
			for(var i:String in _actionWindows){
				w = _actionWindows[i];
				if(w && w.stage && exceptList.indexOf(w) == -1){
					w.close();
				}
			}
		}
		
		public static function escCloseWindow():void
		{
			var totalIFrame:int = _actionWindows.length;
			if (totalIFrame == 0)
				return;
			var iframeView:XWindow = _actionWindows.pop() as XWindow;
			iframeView.escToClose && iframeView.close();
		}
		
		/**
		 * 是否支持按esc键关闭，默认为false 
		 * @return 
		 * 
		 */		
		public function get escToClose():Boolean
		{
			return false;
		}
		
	}
}