package com.xiaohuzi999.xControls.frame.manager
{	
	import com.xiaohuzi999.xControls.frame.XIcon;
	import com.xiaohuzi999.xControls.frame.interfaces.IDragContainer;
	import com.xiaohuzi999.xControls.frame.interfaces.IIcon;
	import com.xiaohuzi999.xControls.util.CoolEffect;
	import com.xiaohuzi999.xControls.util.XUtil;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import flash.utils.Dictionary;

	/**
	 *拖动管理类 
	 *@author xiaohuzi999@163.com
	 */
	public class DragManager
	{
		/**容器数据*/
		private static var _containerMap:Dictionary = new Dictionary();
		
		/**元素数据*/
		private static var _itemMap:Dictionary = new Dictionary();
		
		/**正在拖动的元素*/
		private static var _item:XIcon;
		
		/**目标源鼠标位置*/
		private static var _sourceMouse:Point;
		public function DragManager()
		{
		}
		
		/**
		 * 注册一个容器
		 * @param container 容器对象，必须实现IDragContainer接口
		 * */
		public static function registerContainer(container:IDragContainer):void{
			_containerMap[container] = container;
		}
		
		/**
		 * 移除一个容器
		 * @param container 需要移除的容器对象
		 */
		public static function removeContainer(container:IDragContainer):void{
			delete _containerMap[container];
		}
		
		/**
		 * 注册一个拖动元素
		 * @param item 注册元素；
		 * @param currentContainer 当前所在容器；
		 * */
		public static function registerDragItem(item:InteractiveObject, currentContainer:IDragContainer=null):void{
			_itemMap[item] = currentContainer;
			item.addEventListener(MouseEvent.MOUSE_DOWN,onMouseEvent);
		}
		
		/**
		 *移除拖动元素 
		 * @param item 注册的拖动元素
		 */
		public static function removeDragItem(item:InteractiveObject):void{
			if(String(_itemMap[item]) != "undefined"){
				item.removeEventListener(MouseEvent.MOUSE_DOWN,onMouseEvent);
				delete _itemMap[item]
			}
		}
		
		/**鼠标事件处理*/
		private static function onMouseEvent(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					if(_item){
						removeIcon();
					}
					if(event.currentTarget is IIcon){
						_item = IIcon(event.currentTarget).clone() as XIcon;
						//_item.source.filters = CoolEffect.blackFilter;
					}else{
						_item = new XIcon(true);
						_item.icon = event.currentTarget as DisplayObject;
						//_item.source.alpha = 0.5;
					}
					_item.source = event.currentTarget;
					_item.mouseChildren = _item.mouseEnabled = false;
					_sourceMouse = new Point(_item.source.mouseX, _item.source.mouseY);
					DisplayObject(event.currentTarget).stage.addEventListener(MouseEvent.MOUSE_MOVE,onMouseEvent);
					DisplayObject(event.currentTarget).stage.addEventListener(MouseEvent.MOUSE_UP,onMouseEvent);
				break;
				case MouseEvent.MOUSE_UP:
					event.currentTarget.removeEventListener(MouseEvent.MOUSE_UP,onMouseEvent);
					event.currentTarget.removeEventListener(MouseEvent.MOUSE_MOVE,onMouseEvent);
					removeIcon()
				break;
				case MouseEvent.MOUSE_MOVE:
					if(!_item.stage){
						if(_item.source is IIcon){
							_item.source.filters = CoolEffect.blackFilter;
							_item.source.alpha = 0.3;
						}else{
							_item.source.alpha = 0.5;
						}
						_item.source.stage.addChild(_item);
					}
					_item.x = _item.stage.mouseX - _sourceMouse.x;
					_item.y = _item.stage.mouseY - _sourceMouse.y;
					break;
			}
		}
		
		/**移除已存在的ICON*/
		private static function removeIcon():void{
			//_item.removeEventListener(Event.ENTER_FRAME, onEF);
			if(_item.source is IIcon){
				_item.source.filters = null;
				_item.source.alpha = 1;
			}else{
				_item.source.alpha = 1;
			}
			if(_item.stage){
				_item.parent.removeChild(_item);
				checkDragObject(_item.source);
			}
			_item.dispose();
			_item = null;
		}
		
		/**拖动事件*/
		private static function onEF(event:Event):void{
			if(!_item.stage){
				if(_item.source is IIcon){
					_item.source.filters = CoolEffect.blackFilter;
				}else{
					_item.source.alpha = 0.5;
				}
				_item.source.stage.addChild(_item);
			}
			_item.x = _item.stage.mouseX - _sourceMouse.x;
			_item.y = _item.stage.mouseY - _sourceMouse.y;
		}
		
		/**
		 * 判断容器对象
		 * @param dragObject 当前拖动元素
		 */
		private static function checkDragObject(dragObject:InteractiveObject):void{
			var point:Point = new Point(dragObject.stage.mouseX,dragObject.stage.mouseY);
			var objList:Array = dragObject.stage.getObjectsUnderPoint(point);
			var container:IDragContainer = getContainer(objList[objList.length-1]);
			if(container){
				var fromContainer:IDragContainer = _itemMap[dragObject]
				if(_containerMap[container] && container.canDragIn(dragObject, fromContainer)){//判断是否接受该元素
					if(fromContainer){
						fromContainer.dragOut(dragObject, container);//拖出
					}
					container.dragIn(dragObject, fromContainer);
					return;
				}
			}else{
				if(_itemMap[dragObject]){
					_itemMap[dragObject].dragOut(dragObject, container);//拖出
				}
			}
		}
		
		/**
		 * 获取容器
		 * dis舞台上的元素，注意，拖动元素必须位于最顶层；
		 */
		private static function getContainer(dis:DisplayObject):IDragContainer{
			var container:IDragContainer
			while(dis && !(dis is Stage)){
				if(dis is IDragContainer){
					container = dis as IDragContainer;
					break;
				}else{
					dis = dis.parent;
				}
			}
			return container;
		}
	}
}