package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.frame.manager.LibManager;
	import com.xiaohuzi999.xControls.util.CoolEffect;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	
	/**
	 * @author huhaiming
	 * @version 1.0
	 * @modified by daylyn （滚动条组件块有有阴影像素，需要剔除再计算）
	 */
	public class XScrollBar extends Sprite
	{
		/** 滚动条皮肤 */
		private var _viewMc:Sprite;
		/**上箭头*/
		private var $upArrow:InteractiveObject;
		/**下箭头*/
		private var $downArrow:InteractiveObject;
		/**滑动条*/
		private var $slide:InteractiveObject;
		/**滑动条背景*/
		private var $slideBG:DisplayObject;
		/**组件显示的内容*/
		private var _content:DisplayObject;
		/**显示宽*/
		private var _w:Number;
		/**显示高*/
		private var _h:Number;
		/**显示的百分比*/
		private var _percent:Number;
		/**显示上边界*/
		private var _up:Number;
		/**显示下边界*/
		private var _down:Number;
		/**组件-滑动条上边界*/
		private var _basicY:Number;
		/**组件-滑动高度*/
		private var _slideHeight:Number;
		/**是否拖动中*/
		private var _isDraging:Boolean;
		/**遮罩*/
		private var _mask:Sprite;
		/**滑块与全局的坐标差*/
		private var _slideDis:Number = -999;
		/**拖动对象的坐标*/
		private var _contentPos:Point;
		/**slide鼠标位置*/
		private var _slideMouseY:Number;
		/**是否能用鼠标拖动*/
		private var _canDrag:Boolean = false;
		/**当前位置*/
		private var _currentY:Number;
		/** 是否自动隐藏滚动条 */
		private var _autoHideThis:Boolean = false;
		/**步长-单位像素*/
		public var step:Number = 10;
		/** 滚动条风格 */
		private var _style:int = 0;
		
		/**事件-刷新*/
		public static const UPDATE:String = "UPDATE";
		
		override public function set height(value:Number):void
		{
			$slideBG.y = $upArrow.y + $upArrow.height - 2;
			$slideBG.height = value - $upArrow.height - $downArrow.height + 6;
			$downArrow.y = $slideBG.y + $slideBG.height + ($upArrow.height - 5);
			_basicY = $slideBG.y - 4;
			_slideHeight = $slideBG.height - $slide.height + 6;
		}
		
		public function get isAutoHide():Boolean
		{
			return _autoHideThis;
		}
		
		/**
		 * @param upArrow 上按钮
		 * @param downArrow 下按钮
		 * @param slide 滑块
		 * @param content 滑动的对象
		 * @param canDrag 是否可以直接拖内容
		 * 注意：滚动条滑块y坐标靠齐背景，程序不自动设置
		 * */
		public function XScrollBar($viewMc:Sprite, content:DisplayObject = null,$autoHideThis:Boolean = true,
			$style:int = 0, canDrag:Boolean = false)
		{
			_viewMc = $viewMc;
			$upArrow = _viewMc["upArrow"];
			$downArrow = _viewMc["downArrow"];
			$slide = _viewMc["slide"];
			$slideBG = _viewMc["slideBG"];
			_canDrag = canDrag;
			_autoHideThis = $autoHideThis;
			_style = $style;
			
			init();
			initEvent();
			this.content = content;
		}
		
		private function init():void
		{
			_mask = new Sprite();
			_mask.mouseEnabled = false;
			_percent = 0;
			
			if(!$upArrow){
				$upArrow = new Sprite();
				$upArrow.y = 0;
			}
			if(!$downArrow){
				$downArrow = new Sprite();
				$downArrow.y = _viewMc.height;
			}
			if(!$slide)
				$slide = new Sprite();
			if($slide is Sprite)
				Sprite($slide).buttonMode = true;
			
			_isDraging = false;
			if(_style == 0)
			{
				_basicY = $upArrow.y + ($upArrow.height - 6);
				_slideHeight = this.$downArrow.y - this.$upArrow.y - $upArrow.height - $slide.height - 3;
			}
			else
			{
				_basicY = $slide.y;
				_slideHeight = $slideBG.height - $slide.height;
			}
			setSize(100, 100);
		}
		
		private function initEvent():void
		{
			$upArrow.mouseEnabled = $downArrow.mouseEnabled = $slide.mouseEnabled = true;
			$upArrow.addEventListener(MouseEvent.CLICK, onClick);
			$downArrow.addEventListener(MouseEvent.CLICK, onClick);			
			$slide.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			$slide.visible = true;
			$upArrow.filters = $downArrow.filters = null;
			if(_content)
				_content.addEventListener(MouseEvent.MOUSE_WHEEL, onMouseWheel);
		}
		
		private function onMouseWheel($e:MouseEvent):void
		{
			if ($e.delta == 0)
				return;
			move(step * ($e.delta > 0 ? 1 : -1));
		}
		
		/***/
		private function removeEvent():void
		{
			$upArrow.mouseEnabled = $downArrow.mouseEnabled = $slide.mouseEnabled = false;
			$upArrow.removeEventListener(MouseEvent.CLICK, onClick);
			$downArrow.removeEventListener(MouseEvent.CLICK, onClick);			
			$slide.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			$slide.visible = false;
			$upArrow.filters = $downArrow.filters = CoolEffect.blackFilter;
			if(_content)
				_content.removeEventListener(MouseEvent.MOUSE_WHEEL, onMouseWheel);
		}
		
		private function onClick(event:MouseEvent):void
		{
			switch(event.currentTarget)
			{
				case this.$upArrow:
					move(step);
					break;
				case this.$downArrow:
					move(-step);
					break;
			}
		}
		
		/**按下事件*/
		private function onMouseDown(event:MouseEvent):void
		{
			switch(event.currentTarget)
			{
				case this.$slide:
					_isDraging = true;
					_slideMouseY = $slide.mouseY;
					$slide.stage.addEventListener(MouseEvent.MOUSE_MOVE, onSlide);
					$slide.stage.addEventListener(MouseEvent.MOUSE_UP, onSlide);
					break;
			}
		}
		
		/**滑动*/
		private function onSlide(event:MouseEvent):void
		{
			switch(event.type)
			{
				case MouseEvent.MOUSE_MOVE:
					_slideDis = 0;
					var par:DisplayObjectContainer = $slide.parent;
					while(par && !(par is Stage)){
						_slideDis += par.y;;
						par = par.parent;
					}
					var tempY:Number = $slide.stage.mouseY - _slideMouseY - _slideDis;
					if(tempY < _basicY){
						tempY = _basicY;
					}else if(tempY > _basicY + _slideHeight){
						tempY = _basicY + _slideHeight;
					}
					percent = (tempY - _basicY) * 100 / _slideHeight;
					break;
				case MouseEvent.MOUSE_UP:
					event.currentTarget.removeEventListener(MouseEvent.MOUSE_MOVE, onSlide);
					event.currentTarget.removeEventListener(MouseEvent.MOUSE_UP, onSlide);
					this.dispatchEvent(new Event(XScrollBar.UPDATE));
					break;
			}
		}
		
		/**滚动--Content->组件*/
		private function move(distance:Number):void
		{
			var tempY:Number = content.y + distance;
			tempY = distance < 0?Math.max(_down, tempY):Math.min(_up, tempY);
			percent = (_up - tempY) * 100 / (_up - _down);
			this.dispatchEvent(new Event(XScrollBar.UPDATE));
		}
		
		/**
		 * 设置滑动条位置Content->组件
		 * @param per 显示百分比
		 * */
		public function set percent(per:Number):void
		{
			_percent = per;
			_percent = Math.max(0, _percent);
			_percent = Math.min(100, _percent);
			
			$slide.y = (_slideHeight * _percent / 100) + _basicY;
			if(_content)
				_content.y = _up - Math.max(0, _content.height - _h) * _percent / 100;
		}
		
		/**获取滑动条位置*/
		public function get percent():Number
		{
			return _percent;
		}
		
		/**刷新显示*/
		public function update(force:Boolean = false):void
		{
			if(!_content)
				return;
			
			_up = _contentPos.y;
			_down = _contentPos.y - (_content.height - _h);
			force ? percent = 0 : percent = _percent;
			if(_content.height < _h)
			{
				if(_autoHideThis)
					_viewMc.visible = false;
				removeEvent();
			}
			else
			{
				if(_autoHideThis)
					_viewMc.visible = true;
				initEvent();
			}
		}
		
		/**重置-释放content，并将content位置还原*/
		public function reset():void
		{
			if(_content){
				percent = 0;
				this._content = null;
			}
		}
		
		/**
		 * 设置显示区域
		 * @param w 显示区域宽度
		 * @param h 显示区域高度
		 */
		public function setSize(w:Number, h:Number):void
		{
			this._w = w;
			this._h = h;
			_mask.graphics.clear();
			_mask.graphics.beginFill(0xff0000,1);
			_mask.graphics.drawRect(0, 0, w, h);
			_mask.graphics.endFill();
			if(_content)
			{
				if(_content.height < _h)
					removeEvent();
				else
					initEvent();
			}
		}
		
		private function onME(event:MouseEvent):void
		{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					if(_content && _content.stage){
						_currentY = _content.stage.mouseY;
						_content.stage.addEventListener(MouseEvent.MOUSE_UP, onME);
						_content.stage.addEventListener(MouseEvent.MOUSE_MOVE, onME);
					}
					break;
				case MouseEvent.MOUSE_MOVE:
					if(_content && _content.stage){
						move(_content.stage.mouseY - _currentY);
						_currentY = _content.stage.mouseY;
					}
					break;
				case MouseEvent.MOUSE_UP:
					event.currentTarget.removeEventListener(MouseEvent.MOUSE_UP, onME);
					event.currentTarget.removeEventListener(MouseEvent.MOUSE_MOVE, onME);
					break;
			}
		}
		
		/**
		 * 设置显示对象
		 * @param  dis 显示对象
		 */
		public function set content(dis:DisplayObject):void
		{
			if(!this._content && dis)
			{
				_contentPos = new Point(dis.x, dis.y);
				dis.parent.addChild(_mask);
				dis.mask = _mask;
				_mask.x =  dis.x;
				_mask.y = dis.y;
			}
			if(dis)
				dis.mask = _mask;
			
			if(_canDrag)
			{
				if(_content)
					_content.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
			}
			
			this._content = dis;
			if(_content){
				if(_canDrag){
					_content.addEventListener(MouseEvent.MOUSE_DOWN, onME);
				}
				_up = _contentPos.y;
				_down = _contentPos.y - (_content.height - _h);
				_content.x = _contentPos.x;
				_content.y = _contentPos.y;
				if(_content.height < _h){
					removeEvent();
				}else{
					initEvent();
				}
			}
			percent = _percent;
		}
		
		/**显示对象*/
		public function get content():*
		{
			return this._content;
		}
		
		/**获取显示区域*/
		public function get showMC():Sprite
		{
			return _mask;
		}
	}
}