package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.frame.manager.AnimateManager;
	import com.xiaohuzi999.xControls.frame.manager.SoundManager;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.events.*;
	import flash.text.TextField;
	
	/**
	 * 警告类，默认不可移动,居中对齐,私有单例，静态调用
	 * @author xiaohuzi999@163.com
	 */
	public class XAlert extends XModeWindow
	{
		/**默认皮肤*/
		private static var _defaultSkinClass:Class
		/**单例*/
		private static var _instange:XAlert
		/**XAlert的默认容器，静态*/
		private static var _defaultContainer:DisplayObjectContainer;
		
		private var $ui:*;
		/**标题文本*/
		private var $titleTxt:TextField;
		/**消息文本*/
		private var $messageTxt:TextField;
		/**确定按钮*/
		private var $yesBtn:InteractiveObject;
		/**取消按钮*/
		private var $noBtn:InteractiveObject
		/**确定回调*/
		private var _yesFun:Function;
		/**确定参数*/
		private var _yesArgs:Array;
		/**取消回调*/
		private var _noFun:Function;
		/**取消参数*/
		private var _noArgs:Array;
		/**原始确定按钮x坐标*/
		private var _oldYesBtnPosition:Number;
		/**原始取消按钮x坐标*/
		private var _oldNoBtnPosition:Number;
		
		/**确定按钮默认label-静态常量*/
		public static const DEFAULT_YES_LABEL:String = "确定";
		/**取消按钮默认label-静态常量*/
		public static const DEFAULT_NO_LABEL:String = "取消";
		/**取消按钮默认label-静态常量*/
		public static const DEFAULT_TITLE:String = "提示";
		
		public function XAlert()
		{
			super();
			init();
		}
		private function init():void{
			this.$ui = new (defaultSkinClass as Class)();
			addChild($ui);
			this.$titleTxt = Object($ui).titleTxt;
			this.$messageTxt = Object($ui).messageTxt;
			$messageTxt.mouseEnabled = false;
			this.$yesBtn = Object($ui).yesBtn;
			this.$noBtn = Object($ui).noBtn;
			_oldYesBtnPosition = $yesBtn.x;
			_oldNoBtnPosition = $noBtn.x;
		}
		
		/**加事件*/
		override protected function initEvent():void{
			$yesBtn.addEventListener(MouseEvent.MOUSE_DOWN,onME);
			$noBtn.addEventListener(MouseEvent.MOUSE_DOWN,onME);
		}
		
		/**删除事件*/
		override protected function removeEvent():void{
			$yesBtn.removeEventListener(MouseEvent.MOUSE_DOWN,onME);
			$noBtn.removeEventListener(MouseEvent.MOUSE_DOWN,onME);
		}
		
		private function onME(event:MouseEvent):void{
			switch(event.currentTarget){
				case this.$yesBtn:
					if(this._yesFun != null){
						this._yesFun.apply(null,this._yesArgs);
					}
					this.close();
					break;
				case this.$noBtn:
					if(this._noFun != null){
						this._noFun.apply(null,this._noArgs);
					}
					this.close();
					break;
			}
		}
		
		public function showArert(message:String, title:String=DEFAULT_TITLE, yesFun:Function=null, yesArgs:Array=null, yesBtnLabel:String=DEFAULT_YES_LABEL, noBtnLabel:String=DEFAULT_NO_LABEL, showYesBtn:Boolean=true, showNoBtn:Boolean=true, noFun:Function=null, noArgs:Array=null):void{
			if(title == "" || title == " "){
				title = DEFAULT_TITLE;
			}
			if($titleTxt){
				this.$titleTxt.text = title;
			}
			this.$messageTxt.htmlText = message;
			this._yesFun = yesFun;
			this._yesArgs = yesArgs;
			this._noFun = noFun;
			this._noArgs = noArgs;
			var btnNum:int = 0;
			if(showYesBtn){
				btnNum++;
				$yesBtn.visible = true;
				if($yesBtn is XButton) {
					XButton($yesBtn).label = yesBtnLabel;
				}
			}else{
				$yesBtn.visible = false;
			}
			if(showNoBtn){
				if($noBtn is XButton){
					XButton($noBtn).label = noBtnLabel;
				}
				$noBtn.visible = true;
				btnNum++;
			}else{
				$noBtn.visible = false;
			}
			var dis:DisplayObject;
			if(btnNum == 1){
				$yesBtn.visible ? dis=$yesBtn : dis=$noBtn;
				dis.x = (this.$ui.width - dis.width)/2;
			}else if(btnNum ==2){
				$yesBtn.x = _oldYesBtnPosition;
				$noBtn.x = _oldNoBtnPosition;
			}
			this.show();
		}
		
		/**覆盖show*/
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show(autoAlignCenter);
			AnimateManager.popIn(this.$ui);
		}
		
		/**覆盖关闭*/
		override public function close():void{
			super.close();
		}
		
		/**获取容器*/
		override public function get container():DisplayObjectContainer{
			if(!_container){
				_container = defaultContainer;
			}
			return _container
		}
		
		/**
		 * 显示警告
		 * @param message 消息
		 * @param title 标题
		 * @param yesFun “确定”按钮回调
		 * @param yesArgs “确定”按钮回调参数
		 * @param yesBtnLabel “确定”按钮标签
		 * @param noBtnLabel “取消”按钮标签
		 * @param showYesBtn 是否显示确定按钮
		 * @param showNoBtn 是否显示取消按钮
		 * @param noFun 取消按钮回调
		 * @param noArgs 取消按钮参数
		 */
		public static function showArert(message:String,  title:String=DEFAULT_TITLE, yesFun:Function=null, yesArgs:Array=null, yesBtnLabel:String=DEFAULT_YES_LABEL, noBtnLabel:String=DEFAULT_NO_LABEL, showYesBtn:Boolean=true, showNoBtn:Boolean=true, noFun:Function=null, noArgs:Array=null):void{
			getInstance().showArert(message,title,yesFun,yesArgs,yesBtnLabel,noBtnLabel,showYesBtn,showNoBtn,noFun,noArgs);
		}
		
		/***/
		public static function get isShow():Boolean{
			return getInstance().isShow;
		}
		
		//设置默认皮肤类
		public static function set defaultSkinClass(c:Class):void{
			_defaultSkinClass = c;
		}
		
		//获取默认皮肤类
		public static function get defaultSkinClass():Class{
			if(!_defaultSkinClass) _defaultSkinClass = DefalutAlertSkin;
			return _defaultSkinClass
		}
		
		//设置默认的容器
		public static function set defaultContainer(c:DisplayObjectContainer):void{
			_defaultContainer = c;
		}
		//获取
		public static function get defaultContainer():DisplayObjectContainer{
			return _defaultContainer;
		}
		
		//私有单例
		private static function getInstance():XAlert{
			if(!_instange) _instange = new XAlert();
			return _instange
		}
	}
}


import com.xiaohuzi999.xControls.frame.XButton;
import com.xiaohuzi999.xControls.util.CoolEffect;

import flash.display.GradientType;
import flash.display.Sprite;
import flash.geom.Matrix;
import flash.text.TextField;

class DefalutAlertSkin extends Sprite{
	public var yesBtn:XButton;
	public var noBtn:XButton;
	public var titleTxt:TextField;
	public var messageTxt:TextField;
	private var _titileHeight:Number = 25
	private var _offset:int = 5
	public function DefalutAlertSkin(){
		titleTxt = new TextField();
		titleTxt.selectable = false;
		titleTxt.autoSize = "left";
		addChild(titleTxt)
		
		messageTxt = new TextField();
		addChild(messageTxt);
		messageTxt.textColor = 0xffffff
		messageTxt.y = _titileHeight+_offset;
		titleTxt.text = "You need an XAlert UI";
		titleTxt.x = messageTxt.x = _offset
		titleTxt.y = (_titileHeight - titleTxt.height)/2;
		messageTxt.width = 250;
		messageTxt.multiline = true;
		messageTxt.wordWrap = true;
		messageTxt.filters = [CoolEffect.TEXT_FILTER]
		messageTxt.mouseEnabled = false;
		
		yesBtn = new XButton(null, "yes");
		noBtn = new XButton(null, "no");
		addChild(yesBtn);
		addChild(noBtn);
		this.yesBtn.y = this.noBtn.y = this.messageTxt.y + messageTxt.height+5;
		var delX:Number  = (this.width - yesBtn.width - noBtn.width)/3;
		yesBtn.x = delX;
		noBtn.x = yesBtn.width + 2* delX;
		
		//画标题
		this.graphics.beginFill(0x5FC7EC, 1);
		this.graphics.drawRoundRect(0, 0, this.width + _offset*2, _titileHeight+8, 8, 8);
		
		//画面板
		var fillType:String = GradientType.LINEAR;
		var colors:Array = [0xE4F7FC, 0x9ADDF3];
		var alphas:Array = [1, 1];
		var ratios:Array = [0x00, 0xff];
		var matr:Matrix = new Matrix();
		matr.createGradientBox(this.width, this.height-_titileHeight+_offset, Math.PI/2, 0, 0);
		this.graphics.beginGradientFill(fillType, colors, alphas, ratios, matr);  
		this.graphics.drawRect(0, _titileHeight, this.width, this.height-_titileHeight+_offset);
		this.graphics.endFill();
	}
}