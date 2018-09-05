package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.core.BasicData;
	import com.xiaohuzi999.xControls.core.BasicView;
	import com.xiaohuzi999.xControls.frame.interfaces.IApp;
	import com.xiaohuzi999.xControls.frame.interfaces.IDragContainer;
	import com.xiaohuzi999.xControls.frame.interfaces.IXFacade;
	import com.xiaohuzi999.xControls.frame.manager.DragManager;
	import com.xiaohuzi999.xControls.frame.manager.IconManager;
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.frame.manager.LibManager;
	import com.xiaohuzi999.xControls.frame.manager.TipManager;
	import com.xiaohuzi999.xControls.util.CommandVo;
	import com.xiaohuzi999.xControls.util.DataLoading;
	import com.xiaohuzi999.xControls.util.TimerCommand;
	import com.xiaohuzi999.xControls.util.XCookie;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.display.Sprite;

	/**
	 * 框架Facade,单例，需要greensock的lib,包含功能：
	 * 1，LibManager功能 
	 * 2，LayerManager功能
	 * 3，IconManager功能
	 * 4，TipManager功能
	 * 6，Command功能
	 * 需要单独调用的功能模块：
	 * 1，AnimationManager
	 * 2，TimerCommand
	 * 3，Loader相关
	 * 4，DragManager
	 * 
	 * @author xiaohuzi999@163.com
	 * @example：
	 * 			XFacade.getInstance().init(this);//必须先初始化
	 * 
	 * @version 2.1 20130401
	 * 主要修改：简单化，取消底层mvc模式支持。
	 */
	public class XFacade implements IXFacade
	{
		/**单例*/
		private static var _instance:XFacade;
		/**文档类*/
		private var _app:IApp;
		/**错误信息*/
		private static const ERR_MSG:String = "XFacade is singleton.";
		
		public function XFacade()
		{
			if(_instance){
				throw new Error(ERR_MSG);
			}
			_instance = this;
		}
		
		/**
		 * 初始化组件-必须游戏初始化之前，所有的可视容器都必须由LayerManager管理；
		 * @param container 默认容器
		 * */
		public function init(container:DisplayObjectContainer, MainClass:Class,gameName:String=""):void{
			LayerManager.setDefaultContainer(container);
			BasicView.defaultContainer = LayerManager.getLayer(LayerManager.FIXED_LAYER);
			XWindow.defaultContainer =  LayerManager.getLayer(LayerManager.WINDOW_LAYER);
			XModeWindow.defaultContainer = LayerManager.getLayer(LayerManager.MWINDOW_LAYER);
			TipManager.defaultContainer = XAlert.defaultContainer = DataLoading.defaultContainer
			= XTip.defaultContainer = LayerManager.getLayer(LayerManager.TOP_LAYER);
			XCookie.init(gameName);
			
			this._app = new MainClass();
			if(this._app is IApp){
				this._app.start();
			}else{
				throw new Error("Class ["+MainClass+"] no implement IApp");
			}
		}
		
		/**
		 * 加载Lib资源,即swf文件
		 * @param url 资源地址
		 * @param onComplete 加载完成回调,固定参数LoaderInfo,后可加任意个参数
		 * @param onCompleteArgs 加载完成回调参数
		 * @param onProgress 加载进度回调函数,形如onProgress(event:ProgressEvent);
		 * @param onError 加载失败回调
		 */
		public function addLib(url:String, onComplete:Function=null, onCompleteArgs:Array=null, onProgress:Function=null, onError:Function=null):void{
			LibManager.getInstance().addLib(url, onComplete, onCompleteArgs, onProgress, onError);
		}
		
		/**
		 *获取某个ui 
		 * @param label，类/类名 字符串或者类(Class)
		 * @return 实例（DisplayObject）
		 */
		public function getUI(label:*):*{
			return LibManager.getInstance().getUI(label);
		}
		
		/**
		 * 设置视图的层级
		 * @param view 视图组件
		 * @param layer 层级,默认加到普通窗体层，常数定义在LayerManager中 
		 * */
		public function setLayer(view:DisplayObject, layer:uint = 1):void{
			LayerManager.setLayer(view, layer);
		}
		
		/**
		 * 注册物体TIP；
		 * @param tipObj 显示TIP的物体
		 * @param info TIP的数据,如文字介绍
		 * @param tipTyp 显示的TIP类型——默认为文本类型，新增的则为类,注意，该类必须实现IXToolTip
		 */
		public function registerTip(tipObj:InteractiveObject, info:Object = "" , tipTyp:Class=null):void{
			TipManager.registerTip(tipObj, info, tipTyp);
		}
		
		/**
		 * 移除物体的TIP；
		 * @param tipObj 移除TIP的物体,静态公开接口
		 */
		public function removeTip(tipObj:InteractiveObject):void{
			TipManager.removeTip(tipObj);
		}
		
		/**
		 * 发出一个消息,自动执行关联的函数
		 *  @param action 消息名
		 * @param args 消息参数，任意类型
		 **/
		public function sendEvent(action:String, args:*=null):void{
			MainDispatcher.getInstance().dispatchEvent(new XEvent(action, args));
		}
	
		/**
		 * 注册一个数据,以label作为key存储
		 * @param data 基础数据 
		 */
		public function registerData(data:BasicData):void{
			BasicData.registerData(data);
		}
			
		/**
		 * 移除一个数据
		 * @param data 数据
		 */
		public function removeData(data:BasicData):void{
			BasicData.removeData(data);
		}
				
		/**获取一个数据
		 * @param label 数据的label
		 */
		public function getData(label:String):BasicData{
			return BasicData.getData(label);
		}
		
		
		/**获取单例*/
		public static function getInstance():XFacade{
			if(!_instance) _instance = new XFacade();
			return _instance;
		}
	}
}