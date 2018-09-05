package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.util.xEvent.*;
	
	import flash.events.EventDispatcher;
	
	/**
	 * XSelecteGroup 选择按钮组
	 * @author xiaohuzi999@163.com
	 * @event: XEvent.CHANGE   状态发生改变
	 * 		   XEvent.SELECTED 选中
	 * @version 1.0
	 */
	public class XSelecteGroup extends EventDispatcher
	{
		/**按钮组*/
		private var _btns:Array;
		
		/**选中的按钮*/
		private var _selectedButton:XSelectButton;
		
		/**
		 * @param btns 按钮数组
		 */
		public function XSelecteGroup(btns:Array = null)
		{
			this.btns = btns;
		}
		
		/**
		 * 设置按钮组
		 * @param arr 按钮数组
		 * */
		public function set buttons(arr:Array):void{
			this.btns = arr;
		}
		
		/**获取按钮组*/
		public function get buttons():Array{
			return this._btns;
		}
		
		/**选中按钮*/
		public function set selectedButton(xb:XSelectButton):void{
			if(xb){
				xb.dispatchEvent(new XEvent(XEvent.CLICK));
			}else{
				if(_selectedButton){
					_selectedButton.selected  = false;
				}
				_selectedButton = null;
			}
		}
		
		/**选中按钮*/
		public function get selectedButton():XSelectButton{
			return _selectedButton
		}
		
		/**按钮事件*/
		private function onBtnClick(event:XEvent):void{
			var btn:XSelectButton = event.currentTarget as XSelectButton;
			if(_selectedButton != btn){
				if(_selectedButton){
					_selectedButton.selected = false;
				} 
				_selectedButton = btn;
				_selectedButton.selected = true;
				this.dispatchEvent(new XEvent(XEvent.CHANGE, _selectedButton.data));
			}else{
				_selectedButton.selected = true;
			}
			this.dispatchEvent(new XEvent(XEvent.SELECTED, _selectedButton.data));
		}
		
		/**设置按钮组*/
		private function set btns(arr:Array):void{
			var btn:XSelectButton
			if(_btns){
				for(var i:uint=0; i<_btns.length; i++){
					btn = _btns[i];
					btn.removeEventListener(XEvent.CLICK, onBtnClick);
				}
			}
			this._btns = arr;			
			if(_btns){
				for(i=0; i<_btns.length; i++){
					btn = _btns[i];
					btn.addEventListener(XEvent.CLICK, onBtnClick);
				}
			}
		}
	}
}