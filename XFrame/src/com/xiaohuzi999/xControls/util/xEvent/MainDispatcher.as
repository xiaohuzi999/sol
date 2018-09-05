package com.xiaohuzi999.xControls.util.xEvent
{
	import flash.events.EventDispatcher;

	public class MainDispatcher extends EventDispatcher
	{
		private static var _instance:MainDispatcher
		public function MainDispatcher()
		{
		}
		
		/**获取单例*/
		public static function getInstance():MainDispatcher{
			if(!_instance) _instance = new MainDispatcher();
			return _instance;
		}
	}
}