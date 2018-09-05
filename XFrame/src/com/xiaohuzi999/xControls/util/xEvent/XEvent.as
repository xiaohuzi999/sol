package com.xiaohuzi999.xControls.util.xEvent
{
	import flash.events.Event;
	
	public class XEvent extends Event
	{
		//事件常量
		/**
		 * 点击
		 */
		public static const CLICK:String = "CLICK";
		/**
		 * 选择
		 */
		public static const SELECTED:String = "SELECTED";
		/**改变*/
		public static const CHANGE:String = "CHANGE";
		/**关闭窗体*/
		public static const CLOSE:String = "CLOSE_W";
		/**打开窗体*/
		public static const OPEN:String = "OPEN_W";
		public var data:*;
		public function XEvent(type:String, data:*=null, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			this.data = data;
			super(type, bubbles, cancelable);
		}
		override public function clone():Event{
			return new XEvent(type,data,bubbles,cancelable);
		}
	}
}