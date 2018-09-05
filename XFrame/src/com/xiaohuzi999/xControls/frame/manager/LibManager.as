package com.xiaohuzi999.xControls.frame.manager
{
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	
	import flash.display.LoaderInfo;
	
	/**
	 * 资源管理类,用于类型加载
	 * @author xiaohuzi999@163.com
	 * */
	public class LibManager
	{
		/**单例*/
		private static var _instance:LibManager;
		/**错误信息*/
		private static const ERR_MSG:String = "LibManager is singleton!";
		/**保存Lib的 Loadinfo*/
		private var _libInfo:Object
		public function LibManager()
		{
			if(_instance){
				throw new Error(ERR_MSG);
			}
			_instance = this;
			_libInfo = new Object();
		}
		
		/**
		 * 加载Lib资源,即swf文件
		 * @param url 资源地址
		 * @param onComplete 加载完成回调
		 * @param onCompleteArgs 加载完成回调参数
		 * @param onProgress 加载进度回调函数,形如onProgress(event:ProgressEvent);
		 * @param onError 加载失败回调，无参数
		 */
		public function addLib(url:String, onComplete:Function=null, onCompleteArgs:Array=null, onProgress:Function=null, onError:Function=null):void
		{
			if(onError == null){
				onError = defaultError;
			}
				
			if(checkLib(url)){
				onComplete.apply(null, onCompleteArgs);
			}else{
				DisplayLoader.getLoaderInfo(url, loadCompete, [url, onComplete, onCompleteArgs], onProgress, onError, null);
			}
			
			function defaultError():void{
				XTip.showTip("文件：" + url + "加载失败!");
			}
		}
		
		/**检查Lib资源，防止重复加载*/
		public function checkLib(url:String):Boolean{
			return _libInfo[url] != null;
		}
		
		/**删除不需要lib资源*/
		public function delLib(url:String):void{
			delete _libInfo[url];
		}
		
		/**
		 * 加载完成
		 * */
		private function loadCompete(info:LoaderInfo, url:String, onComplete:Function=null, onCompleteArgs:Array=null):void{
			_libInfo[url] = info;
			if(onComplete != null){
				onComplete.apply(null, onCompleteArgs);
			}
		}
		
		/***/
		
		/**
		 * 获取类型
		 * @param className 类名
		 * */
		public function getClass(className:String):Class{
			var info:LoaderInfo;
			for(var i:String in _libInfo){
				info = _libInfo[i];
				if(info.applicationDomain.hasDefinition(className)){
					return (info.applicationDomain.getDefinition(className) as Class);
				}
			}
			//throw new Error("The Class \"" + className + "\" is null!");//抛出一个异常。
			trace("[UI资源错误]The Class \""+className+"\" is null!");
			return null
		}
		
		/**
		 *获取某个ui资源 
		 * @param label，类/类名字符串或者类(Class)
		 * @return 实例（DisplayObject）
		 */
		public function getUI(label:*):*{
			var ui:*;
			if(label is String){
				if(getClass(label)){
					ui = new (getClass(label) as Class)();
				}
			}else if(label is Class){
				ui = new (label as Class)();
			}
			return ui;
		}
				
		/**获取单例*/
		public static function getInstance():LibManager{
			if(!_instance) _instance = new LibManager;
			return _instance;
		}
	}
}