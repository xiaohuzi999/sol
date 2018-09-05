package com.xiaohuzi999.xControls.frame
{
	
	import com.xiaohuzi999.xControls.frame.interfaces.IXToolTip;
	import com.xiaohuzi999.xControls.frame.manager.AnimateManager;
	import com.xiaohuzi999.xControls.util.CoolEffect;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	
	/**
	 * 文本数据类
	 * @author xiaohuzi999@163.com
	 */
	public class XToolTip extends Sprite implements IXToolTip{
		/**默认皮肤*/
		public static var defaultSkin:Class;
		//----------------------------
		private var $msgTxt:TextField;
		private var $ui:DisplayObject;
		private var _maxWidth:Number = 180;
		private var _msg:String = "";
		private var _container:DisplayObjectContainer;
		
		public function XToolTip(ui:DisplayObject = null){
			this.mouseChildren = false;
			this.mouseEnabled = false;
			this.$ui = ui
			init();
		}
		private function init():void{
			if(!$ui){
				if(defaultSkin){
					$ui = new defaultSkin;
				}else{
					var s:Shape = new Shape();
					s.graphics.lineStyle(2,0x666666);
					s.graphics.beginFill(0x333333, 0.9);
					s.graphics.drawRoundRect(0, 0, 300, 120, 10 ,10);
					s.graphics.endFill();
					s.scale9Grid = new Rectangle(10, 10, s.width-20, s.height - 20);
					$ui = s;
				}
			} 
			addChild($ui);
			if(!Object($ui).hasOwnProperty("msgTxt")){
				$msgTxt = new TextField();
				$msgTxt.selectable = false;
				$msgTxt.textColor = 0xffffff;
				$msgTxt.multiline = $msgTxt.wordWrap = true;
				$msgTxt.autoSize = TextFieldAutoSize.LEFT;
			}else{
				$msgTxt = Object($ui).msgTxt as TextField;
			}
			$msgTxt.filters = [CoolEffect.TEXT_FILTER]
			this.addChild($ui);
			this.addChild($msgTxt);
			this.mouseEnabled = this.mouseChildren = false;
		}
		/**
		 * 显示TIP
		 * @param info Tip的数据
		 * */
		public function showTip(info:Object):void{
			this.text = info.toString();
		}
		
		/**显示
		 *@param  autoAlignCenter是否自动居中
		 */
		public function show(autoAlignCenter:Boolean = false):void{
			container.addChild(this);
			AnimateManager.fadeIn(this);
		}
		
		/**关闭*/
		public function close():void{
			AnimateManager.fadeOut(this, onClose);
		}
		
		/***/
		private function onClose():void{
			if(this.parent){
				container.removeChild(this);
			}
		}
		
		/**设置容器*/
		public function set container(disc:DisplayObjectContainer):void{
			_container = disc;
		};
		
		/**获取容器*/
		public function get container():DisplayObjectContainer{
			return _container;
		};
		
		/**获取TIP文本*/
		private function get text():String{
			return _msg;
		}
		
		/**设置TIP文本*/
		private function set text(value:String):void{
			_msg = value;
			$msgTxt.width = _maxWidth;
			$msgTxt.wordWrap = false;
			$msgTxt.autoSize = TextFieldAutoSize.LEFT;
			$msgTxt.htmlText ="<font color='#FFFFFF'>"+_msg+"</font>";
			updateSize();
		}
		
		/**重绘界面*/
		private function updateSize():void
		{
			if($msgTxt.width>_maxWidth)
			{
				$msgTxt.text="";
				$msgTxt.autoSize = TextFieldAutoSize.NONE;
				$msgTxt.wordWrap=true;
				$msgTxt.width=_maxWidth;
				$msgTxt.height=5000;
				$msgTxt.htmlText=this.text;
				$msgTxt.width=_maxWidth;
				$msgTxt.height=$msgTxt.textHeight+5;
			}
			$ui.width=$msgTxt.width+20;
			$ui.height=$msgTxt.height+20;
			$msgTxt.x=($ui.width-$msgTxt.width)/2;
			$msgTxt.y=($ui.height-$msgTxt.height)/2;
		}
	}
}