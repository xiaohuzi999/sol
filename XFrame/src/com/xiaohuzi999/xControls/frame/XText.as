package com.xiaohuzi999.xControls.frame
{
	import com.greensock.TweenLite;
	import com.xiaohuzi999.xControls.util.XUtil;
	
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.text.TextField;
	import flash.utils.Dictionary;
	import com.xiaohuzi999.xControls.util.TimerCommand;
	
	/**
	 * XText  向上滚动的文本效果
	 * author:xiaohuzi999@163.com
	 * XText.as 2011-11-8 上午09:31:50
	 * version 1.0
	 *
	 */
	public class XText extends Sprite
	{
		/**文本源*/
		private var _txt:TextField;
		/**遮罩*/
		private var _mask:Sprite;
		/**宽*/
		private var _w:Number = 0;
		/**高*/
		private var _h:Number = 0;
		/**移动高度*/
		private var _endY:Number
		/**原始文本Y*/
		private var _oldY:Number;
		/**时间*/
		private var _nowCount:int;
		private var _endCount:int;
		/**总时间*/
		private var _totalTime:Number;
		/**移动步长*/
		private var _moveStep:int;
		/**每一行的等待时间*/
		private const WAIT_TIME:Number = 2;
		/**有效移动高度*/
		private const MOVE_HEIGHT:int = 3;
		
		public function XText(txt:TextField, h:Number=0)
		{
			_txt = txt;
			_h = h;
			init();
			initEvent();
		}
		
		private function init():void{
			_txt.autoSize = "left";
			_txt.multiline = true;
			_w = _txt.width;
			if(!_h){
				_h = _txt.height;
			}
			_oldY = _txt.y;
			_endY = _h-_txt.height+_oldY
			
			_mask = new Sprite();
			_mask.graphics.beginFill(0xff0000);
			_mask.graphics.drawRect(0, 0, _w, _h);
			_mask.graphics.endFill();
			
			_mask.x = _txt.x;
			_mask.y = _txt.y;
			_txt.mask = _mask;
			_txt.parent.addChild(_mask);
			
			_moveStep = _txt.textHeight/_txt.numLines + (_txt.height-_txt.textHeight)/_txt.numLines
			_nowCount = _endCount = 0;
			_totalTime = _txt.maxScrollV * WAIT_TIME/2;
			onAdd();
		}
		
		private function initEvent():void{
			_txt.addEventListener(Event.ADDED_TO_STAGE, onAdd);
			_txt.addEventListener(Event.REMOVED_FROM_STAGE, onRemove);
		}
		
		/**销毁*/
		public function dispose():void{
			TimerCommand.removeTimeCommand(move);
			_txt.removeEventListener(Event.ADDED_TO_STAGE, onAdd);
			_txt.removeEventListener(Event.REMOVED_FROM_STAGE, onRemove);
			_txt.y = _oldY;
			_txt.height = _h;
			_mask.parent.removeChild(_mask);
			_txt.mask = null;
		}
		
		/***/
		private function move():void{
			if(_nowCount < _totalTime){//开始停
				_nowCount ++;
				_endCount = 0;
			}else{
				if(_txt.y > _endY){
					var targetY:Number = _txt.y-_moveStep;
					var nextMoveH:Number = targetY - _endY;
					if(nextMoveH > 0 && nextMoveH < _moveStep){
						targetY = _endY
					}
					TweenLite.to(_txt, 0.5, {y:targetY});
				}else{
					if(_endCount < _totalTime){
						_endCount++
					}else{
						_nowCount = 0;
						TweenLite.to(_txt, 0.5, {y:_oldY});
					}
				}
			}
		}
		
		private function onAdd(event:Event=null):void{
			_txt.removeEventListener(Event.ADDED_TO_STAGE, onAdd);
			if(_txt.height - MOVE_HEIGHT > _mask.height){
				TimerCommand.registerTimeCommand(move, null, 2, 0);
			}
		}
		
		private function onRemove(event:Event):void{
			TimerCommand.removeTimeCommand(move);
			_txt.y = _oldY;
			_txt.addEventListener(Event.ADDED_TO_STAGE, onAdd);
		}
	}
}
