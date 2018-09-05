package com.xiaohuzi999.xControls.util.load
{
	import com.xiaohuzi999.xControls.util.TimerCommand;
	
	import flash.display.Loader;
	import flash.display.LoaderInfo;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.ProgressEvent;
	import flash.net.URLRequest;
	import flash.system.LoaderContext;
	import flash.utils.Dictionary;

	/**
	 * 视图加载类
	 * @author xiaohuzi999@163.com
	 * 
	 */
	public class DisplayLoader
	{
		/**加载字典*/
		private static var _loadDic:Dictionary = new Dictionary;
		/**重试次数*/
		public static var tryTimes:int = 0;
		/**类型*/
		public static const TYPE:String = "DisplayLoader";
		/**
		 * 获取加载资源 静态类
		 * @param url 资源地址
		 * @param onComplete 加载完成处理函数，固定参数LoaderInfo
		 * @param completeArgs 加载完成处理函数参数 可为空;
		 * @param onProgress 加载进度变化处理函数，参数ProgressEvent event
		 * @param onIOError 加载失败处理函数  参数IOErrorEvent event
		 */
		public static function getLoaderInfo(url:String, onComplete:Function, completeArgs:Array=null, onProgress:Function=null, onIOError:Function=null, context:LoaderContext=null):void
		{
			if(url)
			{
				var loader:Loader = new Loader();
				_loadDic[loader.contentLoaderInfo] = new LoadVO(new URLRequest(url), onComplete, completeArgs, onProgress, onIOError, DisplayLoader.tryTimes, loader);
				loader.load(_loadDic[loader.contentLoaderInfo].url, context);
				loader.contentLoaderInfo.addEventListener(Event.COMPLETE,onLoadEvent);
				loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS,onLoadEvent);
				loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR,onLoadEvent);
			}
			else
			{
				if(onIOError !=null)
					onIOError(new IOErrorEvent(IOErrorEvent.IO_ERROR));
			}
		}
		
		/**加载事件*/
		private static function onLoadEvent(event:Event):void
		{
			var lo:LoadVO = _loadDic[event.currentTarget];
			switch(event.type)
			{
				case Event.COMPLETE:
					if(lo.completeArgs)
						lo.onComplete.apply(null,[event.currentTarget].concat(lo.completeArgs));
					else
						lo.onComplete(event.currentTarget)
					delLoadInfo(event.currentTarget as LoaderInfo);
				break;
				case ProgressEvent.PROGRESS:
					if(lo.onProgress != null)
						lo.onProgress(ProgressEvent(event));
				break;
				
				case IOErrorEvent.IO_ERROR:
					if(lo.tryTimes <= 0)
					{
						TimerCommand.removeTimeCommand(lo.loader.load);
						if(lo.onIOError != null)
							lo.onIOError(IOErrorEvent(event));
						delLoadInfo(event.currentTarget as LoaderInfo);
					}
					else
					{
						lo.tryTimes --;
						lo.url.url += "&t="+Math.random(); 
						TimerCommand.registerTimeCommand(lo.loader.load, [lo.url], 0.5, 1);
					}
				break;
			}
		}
		
		/**删除数据*/
		private static function delLoadInfo(info:LoaderInfo):void
		{
			info.removeEventListener(Event.COMPLETE,onLoadEvent);
			info.removeEventListener(ProgressEvent.PROGRESS,onLoadEvent);
			info.removeEventListener(IOErrorEvent.IO_ERROR,onLoadEvent);
			delete _loadDic[info];
		}
	}
}