package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.util.CoolEffect;
	import com.xiaohuzi999.xControls.util.XUtil;
	
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.text.TextField;
	
	/**
	 * 抽象按钮类-主要用于包装按钮，只能用子类（XButton,XSelectButton等）
	 * @author xiaohuzi999@163.com
	 */
	public class AbstractButton extends BasicComponent
	{
		/**标签*/
		protected var _label:String;
		/**数据*/
		protected var _data:Object;
		/**是否可用*/
		protected var _enabled:Boolean;
		/**标签文本*/
		protected var $labelTxt:TextField;
		public function AbstractButton(ui:DisplayObject = null, label:String = "", data:Object = null)
		{
			this._label = label;
			this.$ui = ui;
			this._data = data;
			enabled = true;
			init();
			initEvent();
		}
		protected function init():void{
			
		}
		
		public function dispose():void
		{
			
		}
		
		protected function initEvent():void{
			
		}
		/**
		 * 设置数据
		 */
		public function set data(d:Object):void{
			this._data = d;
		}
		/**
		 * 获取数据
		 */
		public function get data():Object{
			return this._data;
		}
		/**
		 * 设置标签
		 */
		public function set label(v:String):void{
			this._label = v;
		}
		/**
		 * 获取标签
		 */
		public function get label():String{
			return this._label;
		}
		
		/**
		 * 获取文本引用-慎用
		 */
		public function get textFiled():TextField{
			if(!this.$labelTxt){
				this.$labelTxt = new TextField();
				$labelTxt.autoSize = "center";
				$labelTxt.textColor = 0xffffff;
				$labelTxt.mouseEnabled = false;
				$labelTxt.filters = [CoolEffect.TEXT_FILTER]
				addChild($labelTxt);
			}
			return $labelTxt
		}
		
		/**
		 * 设置是否可用
		 */
		public function set enabled(b:Boolean):void{
			this._enabled = b;
			if(b)
			{
				XUtil.disableDisplayObject($ui, false);
				initEvent();
			}
			else
			{
				XUtil.disableDisplayObject($ui);
				dispose();
			}
		}
		
		/**
		 * 获取是否可用
		 */
		public function get enabled():Boolean{
			return this._enabled;
		}
	}
}