package com.xiaohuzi999.xControls.frame
{
	import com.greensock.TweenLite;
	import com.xiaohuzi999.xControls.frame.XAlert;
	import com.xiaohuzi999.xControls.frame.XButton;
	import com.xiaohuzi999.xControls.frame.XPageCom;
	import com.xiaohuzi999.xControls.frame.manager.SoundManager;
	import com.xiaohuzi999.xControls.util.CoolEffect;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.utils.Dictionary;

	public class XVSwipPane extends Sprite
	{
		private var _pageCom:XPageCom;
		//记录鼠标当前坐标
		private var _curX:Number;
		//记录鼠标按钮坐标
		private var _downX:Number;
		//x间隔
		private var _spaceX:Number;
		//选择的单元
		private var _selectItem:InteractiveObject;
		//步长
		private var _step:int;
		//items引用
		private var _items:Array;
		//遮罩
		private var _mask:Shape;
		//容器
		private var _container:DisplayObjectContainer;
		//鼠标是否移动过
		private var _isMoved:Boolean = false;
		private var _swipRect:Rectangle;
		/**事件-选取改变*/
		public static const CHANGE:String = XEvent.CHANGE;
		/**事件-选中单元*/
		public static const SELECTED:String = XEvent.SELECTED;
		public function XVSwipPane()
		{
			this.mouseEnabled = false;
		}
		
		/**生成
		 * @param items 需要生成的ITEM
		 * @param spaceX X间距
		 * @param step 移动步长
		 * @param swipRect 滑动有效区域，默认指整个屏幕
		 * */
		public function create(items:Array, spaceX:Number, step:int=1, swipRect:Rectangle=null, prevBtn:*=null, nextBtn:*=null):void{
			var item:InteractiveObject;
			if(_items){
				for(var i:uint=0; i<_items.length; i++){
					item = _items[i];
					if(item){
						item.removeEventListener(MouseEvent.CLICK, onItemClick);
					}
				}
				_selectItem = null;
				if(_container && _container.parent){
					_container.parent.removeChild(_container);
				}
			}
			_items = items;
			_spaceX = spaceX;
			_step = step;
			_swipRect = swipRect;
			_container = new Sprite();;
			_container.mouseEnabled = false;
			this.addChild(_container);
			for(i=0; i<items.length; i++){
				item = items[i];
				item.filters = CoolEffect.unFocusFilter;
				_container.addChild(item);
				item.x =( i+step)*spaceX;
				item.addEventListener(MouseEvent.CLICK, onItemClick);
			}
			//this.cacheAsBitmap = true;
			var curPage:int = 1
			if(!_pageCom){
				_pageCom = new XPageCom(new XButton(prevBtn), new XButton(nextBtn), new TextField, null, 1);
			}else{
				_pageCom.removeEventListener(XPageCom.TURN_PAGE, onTurnPage);
				curPage = _pageCom.currentPage;
			}
			_pageCom.data = items;
			selectItem = (_items[curPage-1]?_items[curPage-1]:_items[0]);
			if(curPage){
				_pageCom.currentPage = curPage;
				_container.x = (1-_pageCom.currentPage)*_spaceX;
			}
			_pageCom.addEventListener(XPageCom.TURN_PAGE, onTurnPage);
			this.addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
			if(this.stage){
				onAddtoStage();
			}else{
				this.addEventListener(Event.ADDED_TO_STAGE, onAddtoStage);
			}
		}
		
		/**设置显示区域*/
		public function setSize(w:Number, h:Number):void{
			if(!_mask){
				_mask = new Shape();
			}
			_mask.graphics.clear();
			_mask.graphics.beginFill(0xff0000);
			_mask.graphics.drawRect(0, 0, w, h);
			_mask.graphics.endFill();
			_mask.x = _step * _spaceX - w/2;
			_mask.y = -h/2;
			this.addChild(_mask);
			_container.mask = _mask;
		}
		
		/**
		 * 修改激活状态
		 * @param isActive 是否激活 true接受事件/false不接受事件
		 * */
		public function setActive(isActive:Boolean):void{
			if(isActive && this.stage){
				onAddtoStage();
			}else{
				onRemove();
			}
		}
		
		/**获取页码信息*/
		public function getPageInfo(connectChar:String = "/"):String{
			return _pageCom.currentPage + connectChar + _pageCom.totalPage;
		}
		
		public function test():void{
			_container.mask = null;
		}
		
		private function onAddtoStage(event:Event=null):void{
			this.stage.addEventListener(MouseEvent.MOUSE_DOWN, onME);
		}
		
		private function onME(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					if(!_swipRect || _swipRect.contains(this.stage.mouseX, this.stage.mouseY)){
						if(!XAlert.isShow){
							_isMoved = false;
							_curX = this.stage.mouseX;
							_downX = this.stage.mouseX;
							//this.stage.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
							this.stage.addEventListener(MouseEvent.MOUSE_MOVE, onME);
							this.stage.addEventListener(MouseEvent.MOUSE_UP, onME);
						}
					}
					break;
				case MouseEvent.MOUSE_MOVE:
					_container.x += (this.stage.mouseX-_curX);
					_curX = this.stage.mouseX;
					break;
				case MouseEvent.MOUSE_UP:
					this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, onME);
					this.stage.removeEventListener(MouseEvent.MOUSE_UP, onME);
					var deltaX:Number = this.stage.mouseX-_downX;
					if(Math.abs(deltaX) > 30){
						_isMoved = true;
						_pageCom.currentPage -= (Math.abs(deltaX)/deltaX)*_step;
					}else{
						_container.x = (1-_pageCom.currentPage)*_spaceX;
					}
					break;
			}
		}
		
		private function onRemove(event:Event=null):void{
			this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, onME);
			this.stage.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
			this.stage.removeEventListener(MouseEvent.MOUSE_UP, onME);
		}
		
		/**翻页*/
		private function onTurnPage(event:XEvent):void{
			var targetX:Number = (1-_pageCom.currentPage)*_spaceX;
			selectItem = (_pageCom.currentData ?  _pageCom.currentData[0] : null);
			TweenLite.to(_container, 0.2, {x:targetX})
		}
		
		
		private function onItemClick(event:MouseEvent):void{
			if(_isMoved){//一旦鼠标移动，则无视点击方法；
				return;
			}
			if(_selectItem != event.currentTarget){
				var index:int = _items.indexOf(event.currentTarget);
				_pageCom.currentPage = (index+1);
			}else{
				this.dispatchEvent(new Event(SELECTED));
			}
		}
		
		public function set selectItem(item:InteractiveObject):void{
			if(_selectItem){
				_selectItem.filters = CoolEffect.unFocusFilter;
				//_selectItem.scaleX = _selectItem.scaleY = 1;
			}
			_selectItem = item;
			if(_selectItem){
				_selectItem.filters  = null;
				//_selectItem.filters = [CoolEffect.FOCUS_FILTER];
				//_selectItem.scaleX = _selectItem.scaleY = 1.2;
				this.dispatchEvent(new Event(CHANGE));
			}
		}
		
		public function get selectItem():InteractiveObject{
			return _selectItem;
		}
		
	}
}