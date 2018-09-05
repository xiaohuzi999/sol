package com.xiaohuzi999.xControls.frame.interfaces
{
	import flash.display.DisplayObjectContainer;
	/**
	 * ToolTip类必须实现的接口
	 * @author xiaohuzi999@163.com
	 */
	public interface IXToolTip
	{
		/**
		 * 显示数据
		 * @param info 显示TIP的数据
		 **/
		function showTip(info:Object):void;
		/**
		 * 显示
		 * @param autoAlignCenter 是否自动居中对齐
		 */
		function show(autoAlignCenter:Boolean = false):void;
		/**关闭*/
		function close():void;
		
		/**设置容器*/
		function set container(disc:DisplayObjectContainer):void;
		
		/**获取容器*/
		function get container():DisplayObjectContainer;
	}
}