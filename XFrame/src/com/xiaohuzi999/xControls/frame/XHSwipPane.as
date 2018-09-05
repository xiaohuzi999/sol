package com.xiaohuzi999.xControls.frame
{
	import com.greensock.TweenLite;
	import com.greensock.easing.*;
	
	import flash.display.DisplayObject;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TouchEvent;
	import flash.events.TransformGestureEvent;
	import flash.ui.Multitouch;
	import flash.ui.MultitouchInputMode;
	import flash.utils.getTimer;
	
	/**模拟SWIP效果的容器-
	 * @example:
	 * var pane:XHSwipPane = new XHSwipPane();
	 * //显示对象，一般为某个容器，注意，这个容器会被添加到pane中，并重置位置（0,0）;
	 * pane.content = ....;
	 * //显示区域(根据需要自己设定);
	 * pane.setSize(200,100);
	 * //刷新显示效果（content发生变化是需要调用）
	 * pane.update();
	 * */
	public class XHSwipPane extends Sprite
	{
		/***/
		private var _content:DisplayObject;
		/**遮罩*/
		private var _mask:Shape;
		/***/
		private var _maxH:Number = 0;
		/**记录当前的位置*/
		private var _currentY:Number;
		/***/
		private var _speed:Number
		/***/
		private var _curentTime:Number;
		/**事件-到顶*/
		public static const TO_TOP:String = "to_top"
		/**事件-到底*/
		public static const TO_BOTTOM:String = "to_bottom";
		public function XHSwipPane()
		{
			init();
		}
		
		private function init():void{
			_mask = new Shape();
			_mask.graphics.beginFill(0xff0000);
			_mask.graphics.drawRect(0,0, 350, 400);
			_mask.graphics.endFill();
			this.addChild(_mask);
		}
		
		public function update():void{
			if(_content){
				_maxH = _content.height - _mask.height+10;
				if(_maxH > 0){
					active = true;
				}else{
					active = false;
				}
			}
		}
		/**设置显示区域*/
		public function setSize(w:Number, h:Number):void{
			_mask.graphics.clear();
			_mask.graphics.beginFill(0xff0000);
			_mask.graphics.drawRect(0, 0, w, h);
			_mask.graphics.endFill();
			
			this.graphics.clear()
			this.graphics.beginFill(0xff0000,0);
			this.graphics.drawRect(0, 0, w, h);
			this.graphics.endFill();
			//this.cacheAsBitmap = true;
			update();
		}
		
		/**测试方法*/
		public function test():void{
			this.mask = null;
		}
		
		/**设置显示对象*/
		public function set content(dis:DisplayObject):void{
			_content = dis;
			this.addChild(dis);
			dis.x = dis.y = 0;
			this.mask = _mask;
			update();
		}
		
		/**是否被激活*/
		public function set active(b:Boolean):void{
			if(b){
				this.addEventListener(MouseEvent.MOUSE_DOWN, onME);
			}else{
				this.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
				if(this.stage){
					this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, onME);
					this.stage.removeEventListener(MouseEvent.MOUSE_UP, onME);
				}
			}
		}
		
		private function onME(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					if(this.stage){
						_currentY = stage.mouseY
						this.stage.addEventListener(MouseEvent.MOUSE_UP, onME);
						this.stage.addEventListener(MouseEvent.MOUSE_MOVE, onME);
						_curentTime = getTimer();
					}
					break;
				case MouseEvent.MOUSE_MOVE:
					if(this.stage){
						_speed = (stage.mouseY - _currentY)/(getTimer()-_curentTime)
						_curentTime = getTimer();
						move(stage.mouseY - _currentY);
						event.updateAfterEvent();
						_currentY = stage.mouseY;
					}
					break
				case MouseEvent.MOUSE_UP:
					if(this.stage){
						this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, onME);
						this.stage.removeEventListener(MouseEvent.MOUSE_UP, onME);
						if(Math.abs(_speed) >= 0.2){
							move(_speed*5, 0.25);
							_speed = 0;
						}
					}
					break;
			}
		}
		
		/**移动*/
		private function move(distance:Number, time:Number=0):void{
			var targetY:Number = _content.y+distance;
			if(targetY >0 ){
				targetY = 0;
			}else if(targetY<-_maxH){
				targetY = -_maxH;
			}
			//XTip.showTip(_content.y +"||"+targetY+"distance:",distance);
			TweenLite.to(_content, time, {y:targetY, onComplete:onComplete, onCompleteParams:[targetY],ease:Sine.easeOut});
		}
		
		private function onComplete(targetY:Number):void{
			if(targetY == 0){
				this.dispatchEvent(new Event(XHSwipPane.TO_TOP));
			}else if(targetY == -_maxH){
				this.dispatchEvent(new Event(XHSwipPane.TO_BOTTOM));
			}
		}
	}
}