package  com.xiaohuzi999.xControls.util
{	
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.events.ProgressEvent;
	import flash.text.TextField;
	/**
	 * 数据loading显示 
	 * @author xiaohuzi999@163.com
	 * @version 2.0
	 * @modified 修改为实体类-继承XModeWindow
	 */
	public class DataLoading extends XModeWindow
	{
		/**默认皮肤*/
		private static var _defaultSkinClass:Class
		/**DataLoading的默认容器，静态*/
		private static var _defaultContainer:DisplayObjectContainer;
		/**单例控制*/
		private static var _instance:DataLoading;
		
		/**进度文本*/
		private var $processTxt:TextField;
		/**ui*/
		private var $ui:*;
		
		public function DataLoading(){
			if(_instance){
				throw new Error("DataLoading is Static!");
			}
			_instance = this;
			init();
		}
		
		/**初始化*/
		private function init():void{
			$ui = new (defaultSkinClass as Class)();
			this.addChild($ui);
			try{
				$processTxt = Object($ui).processTxt;
			}catch(e:Error){
				
			}
		}
		
		/**
		 * 显示进度 -- 根据需要改进
		 * @param proEvent，进度，ProgressEvent类型
		 * */
		private function showProcess(proEvent:ProgressEvent):void{
			if($processTxt){
				//$processTxt.text = int(proEvent.bytesLoaded * 100 / proEvent.bytesTotal) + "%";
				$processTxt.text = "";//暂时这么用
			}
			//other code;
		}
		
		/**获取容器*/
		override public function get container():DisplayObjectContainer{
			if(!_container){
				_container = defaultContainer;
			}
			return _container
		}
		
		/**
		 * 显示数据加载提示
		 */
		public static function show():void
		{
			getInstance().showProcess(new ProgressEvent(ProgressEvent.PROGRESS, false, false, 0, 1));
			getInstance().show();
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show();
			$ui.visible = false;
			TimerCommand.registerTimeCommand(setVisible, null, 1.5, 1);
		}
		
		override public function close():void{
			TimerCommand.removeTimeCommand(setVisible);
			super.close();
		}
		
		private function setVisible():void{
			$ui.visible = true;
		}
		
		/**
		 * 显示进度
		 * */
		public static function showProcess(proEvent:ProgressEvent):void{
			getInstance().showProcess(proEvent);
		}
		/**
		 * 隐藏加载的loading
		 * 
		 * @param	mc	显示加载动画的mc
		 */
		public static function hide():void
		{
			getInstance().close();
		}
		
		/**是否显示在舞台*/
		public static function get isShow():Boolean{
			return getInstance().isShow;
		}
		
		//设置默认皮肤类
		public static function set defaultSkinClass(c:Class):void{
			_defaultSkinClass = c;
		}
		
		//获取默认皮肤类
		public static function get defaultSkinClass():Class{
			if(!_defaultSkinClass) _defaultSkinClass = DefaultDataLoadingUI;
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
		
		/**私有单例*/
		private static function getInstance():DataLoading{
			if(!_instance){
				_instance = new DataLoading();
			}
			return _instance
		}
	}
}


import flash.display.Sprite;
import flash.text.TextField;

/**DataLoading默认UI类*/
class DefaultDataLoadingUI extends Sprite{
	public var processTxt:TextField;
	public function DefaultDataLoadingUI(){
		processTxt = new TextField();
		this.addChild(processTxt);
		processTxt.width = 100;
		processTxt.text = "0"
		processTxt.autoSize = "left";
		this.mouseChildren = false;
		var delX:Number = this.width/2;
		var delY:Number = this.height/2;
		
		this.graphics.beginFill(0x95DBF2);
		this.graphics.drawCircle(delX, delY, 36);
		this.graphics.beginFill(0x5FC7EC);
		this.graphics.drawCircle(delX, delY, 32);
		this.graphics.endFill();
	}
}