package com.xiaohuzi999.xControls.util
{
	import flash.utils.Dictionary;

	/**
	 * XPool简单池-----用来缓存实例，注意，只存同一类型的实例，否则后果可能很严重。
	 * @author:xiaohuzi999@163.com
	 * XPool.as 2013-3-22 下午3:38:23
	 * version 1.0
	 *
	 */
	public class XPool
	{
		/**数据池，弱引用，会自动回收*/
		private var _poolMap:Dictionary = new Dictionary(false);
		public function XPool()
		{
			
		}
		
		/**
		 * 存池
		 * @param item 某个实例
		 * */
		public function push(item:*):void{
			_poolMap[item] = 1;
		}
		
		/**
		 * 取出
		 * @return 实例
		 */
		public function get():*{
			var item:*;
			for(var i:* in _poolMap){
				item =i;
				delete _poolMap[i];
				break;
			}
			return item;
		}
		
		/**清池 --一般不需要使用*/
		public function clear():void{
			_poolMap = new Dictionary(false);
		}
	}
}