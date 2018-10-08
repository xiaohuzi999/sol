package com.xiaohuzi999.xControls.util
{
	import flash.net.SharedObject;

	/**
	 * XCookie 本地数据存储
	 * author:xiaohuzi999
	 * XData.as 2014-11-21 下午3:56:47
	 * version 1.0
	 */
	public class XCookie
	{
		public static var _name:String;
		public function XCookie()
		{
			
		}
		
		/**
		 * 初始化
		 * @param name 游戏名
		 * */
		public static function init(name:String):void{
			_name = name;
		}
		
		/**
		 * 存数据
		 */
		public static function set(key:String, value:Object):void{
			data[key] = value;
		}
		
		/**取数据*/
		public static function get(key:String):Object{
			//delete data[key];
			return data[key];
		}
		
		/***/
		private static function get data():Object{
			return SharedObject.getLocal(_name).data
		}
	}
}