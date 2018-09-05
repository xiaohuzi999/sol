package com.xiaohuzi999.xControls.core
{
	import com.xiaohuzi999.xControls.frame.XFacade;
	import com.xiaohuzi999.xControls.frame.interfaces.IXFacade;
	import com.xiaohuzi999.xControls.util.CommandVo;
	
	import flash.events.EventDispatcher;

	/**
	 * 基础数据类，本身作用如同模板，直接继承该类创建实际的数据类,主要用来实现MVC方式，暴力开发方式可以忽略。
	 * 该类只能发消息（事件）,不能处理
	 * @author:huhaiming
	 * version 2.0
	 *
	 * 要点：
	 * 注册一个数据（其他模块可以获取）：
	 * facade.registerData(this)
	 * 获取一个数据(根据情况自行进行类型转换)
	 * facade.getData();
	 */
	public class BasicData extends EventDispatcher
	{
		/**数据集*/
		private static var _dataMap:Object = new Object();	
		/**数据名*/
		private var _label:String
		public function BasicData(label:String = "")
		{
			this.label = label;
		}
		
		/**
		 * 派发事件
		 * @param action 消息名
		 * @param args 消息参数，任意类型
		 * */
		public function sendEvent(action:String, args:*=null):void{
			facade.sendEvent(action, args);
		}
		
		/**数据名*/
		public function set label(v:String):void{
			if(_label){
				facade.removeData(facade.getData(_label))
			}
			_label = v;
			if(_label){
				facade.registerData(this);
			}
		}
		
		/**数据名*/
		public function get label():String{
			return _label;
		}
		
		/**获取XFacade引用*/
		protected function get facade():XFacade{
			return XFacade.getInstance();
		}
		
		//静态方法================================================================
		/**
		 * 注册一个数据,以label作为key存储
		 * @param data 基础数据 
		 */
		public static function registerData(data:BasicData):void{
			if(data){
				_dataMap[data.label] = data;
			}
		}
		
		/**
		 * 移除一个数据
		 * @param data 数据
		 */
		public static function removeData(data:BasicData):void{
			if(data){
				delete _dataMap[data.label];
			}
		}
		
		/**获取一个数据
		 * @param label 数据的label
		 */
		public static function getData(label:String):BasicData{
			return _dataMap[label];
		}
	}
}
