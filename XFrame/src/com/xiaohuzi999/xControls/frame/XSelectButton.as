package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	
	/**
	 * 开关按钮-包装类,可单独使用，也可作为XSelecteGroup成员使用
	 * @author xiaohuzi999;
	 * @event: XEvent.CHANGE 选中状态发生改变
	 XEvent.CLICK  鼠标点击
	 **/
	public class XSelectButton extends AbstractButton
	{
		/**是否选中*/
		protected var _selected:Boolean = false;
		/**是否有鼠标经过状态*/
		protected var _rollOverState:Boolean;
		
		public function XSelectButton(ui:DisplayObject = null, label:String="", data:Object=null, rollOverState:Boolean=true)
		{
			_rollOverState = rollOverState;
			super(ui, label, data);
		}
		
		override protected function init():void{
			selected = false;
			this.buttonMode = true;
			this.mouseChildren = false;
			if($ui.hasOwnProperty("labelTxt")){
				$labelTxt = Object($ui).labelTxt;
			}
			XUtil.setOldPosition($ui, this);
			if(_label){
				label  = _label
			}
		}
		
		/**覆盖初始化事件*/
		override protected function initEvent():void{
			this.addEventListener(MouseEvent.MOUSE_DOWN, onMouseEvent);
			if(_rollOverState){
				this.addEventListener(MouseEvent.ROLL_OVER, onMouseEvent);
			}
			this.addEventListener(MouseEvent.ROLL_OUT, onMouseEvent);
		}
		
		/**事件*/
		private function onMouseEvent(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.MOUSE_DOWN:
					selected = !selected;
					this.dispatchEvent(new XEvent(XEvent.CLICK));
					break;
				case MouseEvent.ROLL_OVER:
					if($ui is MovieClip){
						if(!_selected)
							MovieClip($ui).gotoAndStop(2);
					}
					break;
				case MouseEvent.ROLL_OUT:
					if(!_selected && $ui is MovieClip){
						MovieClip($ui).gotoAndStop(1);
					}
					break;
			}
		}
		
		/**销毁-清除事件*/
		override public function dispose():void{
			this.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseEvent);
			this.removeEventListener(MouseEvent.ROLL_OVER, onMouseEvent);
			this.removeEventListener(MouseEvent.ROLL_OUT, onMouseEvent);
		}
		
		/**
		 * 重写设置标签
		 */
		override public function set label(v:String):void{
			if(v){
				super.label = v;
				if(!this.$labelTxt){
					$labelTxt = textFiled
				}
				$labelTxt.text = label;
				if($labelTxt.parent != this.$ui){
					if($ui.width < $labelTxt.width) $ui.width = $labelTxt.width +10;
					if($ui.height < $labelTxt.height) $ui.height = $labelTxt.height;
					$labelTxt.x = ($ui.width - $labelTxt.width)/2;
					$labelTxt.y = ($ui.height - $labelTxt.height)/2;
				}	
			}
		}
		
		/**是否为选中状态*/
		public function set selected(b:Boolean):void
		{
			if(!_enabled)
				return;
			
			if(_selected != b){
				_selected = b;
				this.dispatchEvent(new XEvent(XEvent.CHANGE));
			}
			if(_selected){
				if($ui is MovieClip){
					MovieClip($ui).gotoAndStop(3);
				}
			}else{
				if($ui is MovieClip){
					MovieClip($ui).gotoAndStop(1);
				} 
			}
		}
		
		
		/**是否为选中状态*/
		public function get selected():Boolean{
			return this._selected;
		}
	}
}