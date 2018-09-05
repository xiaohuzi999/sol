package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.frame.AbstractButton;
	import com.xiaohuzi999.xControls.util.CoolEffect;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	/**
	 * 扩展按钮，能直接实例化
	 * @author xiaohuzi999@163.com
	 * 
	 * 如果要为动态按钮，ui必须为3帧，1：普通状态，2鼠标滑动，3，禁用状态；
	 * 修改皮肤：初始化时修改XButton.defaultSkinClass
	 */
	public class XButton extends AbstractButton
	{
		//默认的皮肤类
		private static var _defaultSkinClass:Class = ButtonSkin;
		public function XButton( ui:DisplayObject = null, label:String = "", data:Object = null)
		{
			super(ui, label, data);
		}
		
		override protected function init():void{
			if(!$ui){
				$ui = new (defaultSkinClass as Class)();
			}
			if($ui is MovieClip){
				MovieClip(ui).gotoAndStop(1);
				if(Object(ui).labelTxt) $labelTxt = Object(ui).labelTxt
			} 
			XUtil.setOldPosition($ui,this);
			this.label = _label;
			this.mouseChildren = false;
		}
		
		override protected function initEvent():void{
			this.addEventListener(MouseEvent.CLICK,onME);
			this.addEventListener(MouseEvent.ROLL_OVER,onME);
			this.addEventListener(MouseEvent.ROLL_OUT,onME);
		}
		
		//按钮事件
		protected function onME(event:MouseEvent):void{
			if(!this.enabled) return;
			switch(event.type){
				case MouseEvent.CLICK:
					this.dispatchEvent(new XEvent(XEvent.CLICK));
					break
				case MouseEvent.ROLL_OVER:
					if($ui is MovieClip){
						MovieClip(ui).gotoAndStop(2);
					}
					break;
				case MouseEvent.ROLL_OUT:
					if($ui is MovieClip){
						MovieClip(ui).gotoAndStop(1);
					}
					break;
			}
		}
		
		/**
		 * 重写设置是否可用
		 */
		override public function set enabled(b:Boolean):void{
			super.enabled = b;
			if(_enabled){
				this.buttonMode = true;
				if($ui is MovieClip){
					MovieClip(ui).gotoAndStop(1);
				}
				this.mouseEnabled = true;
			}else{
				this.buttonMode = false;
				this.mouseEnabled = false
				if($ui is MovieClip){
					MovieClip(ui).gotoAndStop(MovieClip(ui).totalFrames);
				}
			}
		}
		
		/**
		 * 重写设置标签
		 */
		override public function set label(v:String):void{
			super.label = v;
			if(_label){
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
		
		/**
		 * 设置UI-UI布局及赋值
		 */
		override public function set ui(ui:DisplayObject):void{
			if($labelTxt && $labelTxt.parent){
				$labelTxt.parent.removeChild($labelTxt);
			}
			if(this.$ui && this.$ui.parent) {
				this.$ui.parent.removeChild($ui);
			}
			this.$ui = ui;
			if(this.$ui){
				this.addChild($ui);
			}
			if($ui is MovieClip){
				MovieClip(ui).gotoAndStop(1);
				if(Object(ui).labelTxt) $labelTxt = Object(ui).labelTxt
			} 
			this.label = _label;
			XUtil.setOldPosition($ui,this);
		}
		
		//----------------------------------------------------------------------------------------------------
		//设置默认的皮肤
		public static function set defaultSkinClass(c:Class):void{
			_defaultSkinClass = c;
		}
		
		//获取默认皮肤
		public static function get defaultSkinClass():Class{
			if(!_defaultSkinClass) _defaultSkinClass = ButtonSkin;
			return _defaultSkinClass;
		}
	}
}


/**
 * 默认的皮肤类
 */
import flash.display.GradientType;
import flash.display.Sprite;
import flash.filters.GlowFilter;
import flash.geom.Matrix;

class ButtonSkin extends Sprite{
	public function ButtonSkin(){
		var fillType:String = GradientType.LINEAR;
		var colors:Array = [0xE4F7FC, 0x5FC7EC];
		var alphas:Array = [1, 1];
		var ratios:Array = [0x00, 0xaa];
		var matr:Matrix = new Matrix();
		matr.createGradientBox(80, 25, Math.PI/2, 0, 0);
		this.graphics.beginGradientFill(fillType, colors, alphas, ratios, matr);  
		this.graphics.lineStyle(1, 0x1BACDC);
		this.graphics.drawRoundRect(0,0,80,25,7,7);
		
		/*this.graphics.beginFill(0x006699,1);
		this.graphics.drawRoundRect(0,0,80,25,4,4);
		this.graphics.endFill();*/
	}
}