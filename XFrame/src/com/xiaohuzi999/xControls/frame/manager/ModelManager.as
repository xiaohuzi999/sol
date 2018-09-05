package com.xiaohuzi999.xControls.frame.manager
{
	import com.xiaohuzi999.xControls.frame.interfaces.IXWindow;
	
	import flash.utils.Dictionary;

	/**
	 * ModelManager 单例实例管理类，主要针对单例方式的改进，单例会长时间占用系统内存，将导致游戏性能下降.
	 * author:xiaohuzi999
	 * InsManager.as 2015-3-19 上午10:45:10
	 * version 1.0
	 */
	public class ModelManager
	{
		private static var _insMap:Dictionary = new Dictionary(true);
		public function ModelManager()
		{
		}
		
		/**
		 * 获取实例
		 * @param type 对象类型，适用于构造函数不带参数的类；如果带参数，则需要
		 * @return IXWindow 对象，根据需要进行类型转换
		 */
		public static function getInstance(type:Class):IXWindow{
			if(!_insMap[type]){
				_insMap[type] = new type();
			}
			return _insMap[type];
		}
		
		/**
		 * 存入实例，适用于构造函数带参数的类,一般不需要用 
		 * @param type,类型
		 * @param instance 类型为type的实例对象
		 */
		public static function setInstance(type:Class, instance:IXWindow):void{
			_insMap[type] = instance;
		}
		
		/**主动销毁某个实例*/
		public static function dispose(type:Class):void{
			delete _insMap[type];
		}
	}
}