package com.xiaohuzi999.xControls.util.load
{
	import com.xiaohuzi999.xControls.util.TimerCommand;
	
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.net.URLRequestMethod;
	import flash.net.URLVariables;
	import flash.utils.Dictionary;

	/**
	 * 数据加载类
	 * @author xiaohuzi999@163.com
	 * 
	 */
	public class DataLoader
	{
		/**加载字典*/
		private static var _loadDic:Dictionary = new Dictionary;
		/**重试次数*/
		public static var tryTimes:int = 3;
		/**类型*/
		public static const TYPE:String = "data";
		
		public function DataLoader()
		{
			
		}
		
		/**
		 * 获取数据
		 * @param url 资源地址
		 * @param onComplete 加载完成处理函数，参数-加载的数据
		 * @param vars 数据
		 * @param onProgress 加载进度变化处理函数
		 * @param onIOError 加载失败处理函数, 参数str，事件类型,即onIOError(event.type);
		 * @param method 数据发送方法，默认为get方式
		 * @param dataFormat 加载数据格式，默认为“TEXT”;
		 */
		public static function getData(url:String, onComplete:Function, completeArgs:Array=null, vars:URLVariables = null, onProgress:Function=null, onIOError:Function=null, method:String=URLRequestMethod.GET, dataFormat:String=URLLoaderDataFormat.TEXT):void{
			var loader:URLLoader = new URLLoader();
			loader.dataFormat = dataFormat;
			var request:URLRequest = new URLRequest(url)
			if(method == URLRequestMethod.POST && vars != null)
				request.data = vars;
			
			trace("request url = " + request.url);
			
			_loadDic[loader] = new LoadVO(request, onComplete, completeArgs, onProgress, onIOError, DataLoader.tryTimes);
			loader.load(_loadDic[loader].url);
			loader.addEventListener(Event.COMPLETE,onLoadEvent);
			loader.addEventListener(ProgressEvent.PROGRESS, onLoadEvent);
			loader.addEventListener(IOErrorEvent.IO_ERROR, onLoadEvent);
			loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onLoadEvent);
		}
		
		/**加载事件*/
		private static function onLoadEvent(event:Event):void{
			var lo:LoadVO = _loadDic[event.currentTarget]
			switch(event.type){
				case Event.COMPLETE:
					if(lo.completeArgs){
						lo.onComplete.apply(null,[event.currentTarget.data].concat(lo.completeArgs));
					}else{
						lo.onComplete(event.currentTarget.data)
					}
					delLoader(event.currentTarget as URLLoader);
				break;
				
				case ProgressEvent.PROGRESS:
					if(lo.onProgress != null){
						lo.onProgress(ProgressEvent(event));
					}
				break;
				
				case IOErrorEvent.IO_ERROR:
				case SecurityErrorEvent.SECURITY_ERROR:
					if(lo.tryTimes <= 0){
						if(lo.onIOError != null){
							lo.onIOError(event);
						}
						delLoader(event.currentTarget as URLLoader);
					}else{
						lo.url.url += "&t="+Math.random(); 
						TimerCommand.registerTimeCommand(URLLoader(event.currentTarget).load, [lo.url], 0.5, 1);
						//URLLoader(event.currentTarget).load(lo.url);
					}
					lo.tryTimes --;
				break;
			}
		}
		
		/**删除数据*/
		private static function delLoader(loader:URLLoader):void{
			loader.removeEventListener(Event.COMPLETE,onLoadEvent);
			loader.removeEventListener(ProgressEvent.PROGRESS,onLoadEvent);
			loader.removeEventListener(IOErrorEvent.IO_ERROR,onLoadEvent);
			loader.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, onLoadEvent);
			delete _loadDic[loader]
		}
	}
}