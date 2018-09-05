package com.xiaohuzi999.xControls.util
{
	/**消息vo类
	 * author xiaohuzi999@163.com
	 * modified by daylyn
	 * */
	public class CommandVo
	{
		/** 模块 */
		public var module:String;
		/** action */
		public var action:String;
		/**参数*/
		public var args:Object;
		
		public function CommandVo($module:String = "", $action:String = "", $args:Object = null)
		{
			module = $module;
			action = $action;
			args = $args;
		}
	}
}