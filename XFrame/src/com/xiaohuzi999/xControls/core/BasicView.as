package com.xiaohuzi999.xControls.core
{
	import com.xiaohuzi999.xControls.frame.BasicComponent;
	import com.xiaohuzi999.xControls.frame.XFacade;
	import com.xiaohuzi999.xControls.frame.interfaces.IXFacade;
	import com.xiaohuzi999.xControls.util.CommandVo;
	
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	
	/**
	 * @基础视图类
	 * @author xiaohuzi999@163.com 
	 * @version 1.0
	 */
	public class BasicView extends Sprite
	{
		/**默认容器*/
		public static var defaultContainer:DisplayObjectContainer;
		
		/**容器*/
		protected var _container:DisplayObjectContainer
		
		/**是否显示*/
		protected var _isShow:Boolean;
		
		public function BasicView(){
			
		}
		
		/**设置容器*/
		public function set container(disc:DisplayObjectContainer):void{
			this._container = disc;
			if(this.stage){
				_container.addChild(this);
			}
		}
		
		/**获取容器*/
		public function get container():DisplayObjectContainer{
			if(!_container){
				_container = defaultContainer;
			}
			return _container
		}
		
		/**
		 * 获取UI
		 * @param className 类或者类名
		 * @return UI实例,泛型
		 * */
		public function getDisplayObjct(className:*):*{
			return facade.getUI(className);
		}
		
		/**
		 * 派发全局事件事件
		 *  @param action 消息名
		 * @param args 消息参数，任意类型
		 * */
		public function sendEvent(action:String, args:*=null):void{
			facade.sendEvent(action, args);
		}
		
		/**获取XFacade引用*/
		protected function get facade():XFacade{
			return XFacade.getInstance();
		}
	}
}