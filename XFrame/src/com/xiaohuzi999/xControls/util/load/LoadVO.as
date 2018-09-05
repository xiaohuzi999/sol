package com.xiaohuzi999.xControls.util.load
{
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	
	/**
	 * @author xiaohuzi999@163.com
	 */
	public class LoadVO{
		/**路径*/
		public var url:URLRequest;
		/**加载处理函数——成功*/
		public var onComplete:Function;
		/**加载成功参数*/
		public var completeArgs:Array
		/**加载处理函数——进度*/
		public var onProgress:Function;
		/**加载处理函数——失败*/
		public var onIOError:Function;
		/**重试次数*/
		public var tryTimes:int;
		/**Loader对象*/
		public var loader:Object;
		
		/**
		 * 加载VO
		 * @param url资源地址(已包装)
		 * @param onComplete 加载完成处理函数
		 * @param onProgress 进度变化处理函数
		 * @param onIOError 加载失败处理函数
		 * @param tryTimes 重试次数
		 */
		public function LoadVO(url:URLRequest, onComplete:Function, completeArgs:Array, onProgress:Function, onIOError:Function, tryTimes:int, loader:Object=null){
			this.url = url;
			this.onComplete = onComplete;
			this.completeArgs = completeArgs;
			this.onProgress = onProgress;
			this.onIOError = onIOError;
			this.tryTimes = tryTimes;
			this.loader = loader;
		}
	}
}