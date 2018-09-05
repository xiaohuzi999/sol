package com.xiaohuzi999.xControls.frame.interfaces
{
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;

	public interface IDragContainer
	{
		/**
		 * 拖入
		 * @param item 拖动元素
		 * @param fromContainer 从哪个容器拖入的ITEM;
		 **/
		function dragIn(item:InteractiveObject, fromContainer:IDragContainer=null):void;
		
		/**
		 * 拖出
		 * @param item 拖动元素
		 * @param toContainer 目标元素. 
		 */
		function dragOut(item:InteractiveObject, toContainer:IDragContainer=null):void;
		
		/**
		 * 判断是否可拖入
		 * @param item 拖动元素
		 * @param currentContainer 拖动元素当前容器
		 * @return Boolean 是否接受该元素true(接受)/false(否)
		 */
		function canDragIn(item:InteractiveObject, currentContainer:IDragContainer=null):Boolean;
	}
}