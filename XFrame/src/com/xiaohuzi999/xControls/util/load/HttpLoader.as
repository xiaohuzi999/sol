package com.xiaohuzi999.xControls.util.load
{
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequestMethod;
	import flash.net.URLVariables;
	
	/**
	 * 数据获取类-静态
	 * 支持http协议的数据获取
	 */
	public class HttpLoader
	{
		private static var jsonErrorMessage:String = 'json 解析错误：';
		private static var ioErrorMessage:String = '网络io错误，请检查网络连接!';
		private static var securityErrorMessage:String = '安全问题，请检查crossdomain.xml';
		
		/** IO错误码 */
		public static const IO_ERR_CODE:int = -1000;
		/** 安全错误嘛 */
		public static const SECURITY_ERR_CODE:int = -1001;
		/** 解析JSON错误码 */
		public static const JSON_ERR_CODE:int = -1;
		
		/**发送数据加密方法*/
		private static var _sendFilter:Function;
		/**接收数据加密方法*/
		private static var _getFilter:Function;
		
		/**
		 * 构造方法-不能实例化
		 */
		public function HttpLoader()
		{
			throw new Error("HttpLoader is static!");
		}
		
		/**
		 * 加密解密
		 * @param sendFilter function，发送数据加密函数 参数URLVariables
		 * @param getFilter function,接收数据解密函数，参数为Object
		 */		
		public static function addFilters(sendFilter:Function, getFilter:Function):void
		{			
			_sendFilter = sendFilter;
			_getFilter = getFilter;
		}
		
		/**
		 * 获取接口数据,注意，经过此接口的数据可能需要加密解密，如不需要，使用DataLoader类
		 * @param	url	请求地址
		 * @param	callback	请求成功的回调方法，参数为：result
		 * @param	vars	附加的请求变量
		 * @param	progress	进度处理函数 参数为：ProgressEvent
		 * @param	method	请求的方法
		 * @param 	callbackArgs callback参数
		 * @return void
		 */
		public static function getJson(url:String, callback:Function = null, callbackArgs:Array=null, vars:URLVariables = null, progress:Function=null, method:String=URLRequestMethod.GET, dataFormat:String=URLLoaderDataFormat.TEXT):void
		{
			//加密
			if (_sendFilter != null)
				_sendFilter(vars);
			
			DataLoader.getData(url, myCallback, null, vars, progress, onIOError, method, dataFormat);
			
			/**数据加载成功*/
			function myCallback(result:Object):void
			{
				var obj:Object = { };
				if (result is String)
				{
					var stre:String = result as String;
					trace("服务端返回数据 = " + stre);
					try
					{
						obj = JSON.parse(stre);
					}
					catch (e:Error) 
					{
						obj['Code'] = HttpLoader.JSON_ERR_CODE;
					}
					
				}
				else
					obj = result;
				
				if(obj == null)
				{
					obj = {};
					obj['Code'] = HttpLoader.JSON_ERR_CODE;
				}
				
				//解密数据
				if(_getFilter != null)
					_getFilter(obj);
				
				if (callback != null)
				{
					if(callbackArgs)
						callback .apply(null,[obj].concat(callbackArgs));
					else
						callback (obj);
				}
			}
			
			/** 加载失败 */
			function onIOError(type:String):void
			{
				var obj:Object = {};
				obj.res = false;
				
				switch(type)
				{
					case IOErrorEvent.IO_ERROR:
						obj.code = IO_ERR_CODE;
						obj.msg = ioErrorMessage;
						break;
					case SecurityErrorEvent.SECURITY_ERROR:
						obj.code = SECURITY_ERR_CODE;
						obj.msg = securityErrorMessage;
						break;
				}
				
				if (callback != null)
				{
					if(callbackArgs)
						callback .apply(null,[obj].concat(callbackArgs));
					else
						callback (obj);
				}
			}
		}
	}

}