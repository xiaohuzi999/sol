package com.xiaohuzi999.xControls.frame
{
	import flash.display.DisplayObject;
	import flash.display.Sprite;

	/**
	 * 组件基类-基于包装类设计
	 * @author xiaohuzi999@163.com
	 * @version v1.0;
	 * */
	public class BasicComponent extends Sprite
	{
		/**图形界面*/
		protected var $ui:*;
		public function BasicComponent()
		{
			
		}
		
		/**设置UI界面*/
		public function set ui(ui:DisplayObject):void{
			this.$ui = ui;
		}
		
		/**获取UI界面*/
		public function get ui():DisplayObject{
			return this.$ui;
		}
	}
}