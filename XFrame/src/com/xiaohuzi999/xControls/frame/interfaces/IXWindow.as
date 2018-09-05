package com.xiaohuzi999.xControls.frame.interfaces
{
	import flash.display.DisplayObjectContainer;
	/**
	 * 界面窗口接口 
	 * @author daylyn
	 * 
	 */	
	public interface IXWindow
	{
		/** 是否支持escape关闭 */
		function get escToClose():Boolean;
		/**
		 * 显示
		 * @param autoAlignCenter 是否自动居中对齐
		 */
		function show(autoAlignCenter:Boolean = false):void;
		/** 关闭 */
		function close():void;
		/**
		 * 设置容器
		 * @param disc 容器
		 * */
		function set container(disc:DisplayObjectContainer):void;
		/**获取容器*/
		function get container():DisplayObjectContainer;
	}
}