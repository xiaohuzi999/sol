package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.MouseEvent;
	import flash.events.TextEvent;
	import flash.text.TextField;

	/**
	 * XNumberStepper 计数器
	 * author:xiaohuzi999@163.com
	 */
	public class XNumberStepper extends EventDispatcher
	{
		/**减少按钮*/
		private var $prevBtn:InteractiveObject;
		/**增加*/
		private var $nextBtn:InteractiveObject;
		/**文本*/
		private var $infoTxt:TextField;
		/**当前值*/
		private var _value:Number;
		/**最大值-默认为9*/
		private var _maxValue:Number = 9;
		/**最新值*/
		private const MIN_VALUE:int = 1;
		public function XNumberStepper(prevBtn:InteractiveObject, nextBtn:InteractiveObject, infoTxt:TextField)
		{
			this.$prevBtn = prevBtn;
			this.$nextBtn = nextBtn;
			this.$infoTxt = infoTxt;
			$infoTxt.restrict = "0-9";
			init();
			initEvent();
		}
		
		private function init():void{
			value = 1;
		}
		
		private function initEvent():void{
			$prevBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$nextBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
		}
		
		private function onBtnClick(event:MouseEvent):void{
			var tempV:Number = int($infoTxt.text);
			switch(event.currentTarget){
				case $prevBtn:
					if(tempV != value){
						value = tempV;
					}else{
						value --;
					}
					break
				case $nextBtn:
					if(tempV != value){
						value = tempV;
					}else{
						value ++;
					}
					break;
			}
		}
		
		/**设置当前值*/
		public function set value(v:Number):void{
			if(v > _maxValue){
				v = _maxValue;
			}else if(v <=MIN_VALUE){
				v = MIN_VALUE
			}
			if(_value != v){
				_value = v;
				this.dispatchEvent(new XEvent(XEvent.CHANGE, v));
			}
			$infoTxt.text = _value+"";
			if($prevBtn is XButton && $nextBtn is XButton){
				XButton($prevBtn).enabled = XButton($nextBtn).enabled = true;
				if(_value <= MIN_VALUE){
					_value = MIN_VALUE;
					XButton($prevBtn).enabled = false;
				}
				if(_value >= maxValue){
					_value = maxValue;
					XButton($nextBtn).enabled = false;
				}
			}
		}
		
		/**获取当前*/
		public function get value():Number{
			return this._value;
		}
		
		/**设置最大值*/
		public function set maxValue(v:Number):void{
			_maxValue = v;
			value = _value;
		}
		
		/**获取最大值*/
		public function get maxValue():Number{
			return _maxValue;
		}
	}
}
