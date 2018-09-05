package com.xiaohuzi999.xControls.util
{
	/**
	 * 
	 *原始版权属adobe,ArrayUtil
	 *
	 * 
	 */
	public class ArrayUtils
	{
		/**
		 *删除数据元素
		 * @param arr 原始数组
		 * @param value 值
		 * @return 
		 */	
		public static function removeValueFromArray(arr:Array, value:Object):int
		{
			if (value == null)
				return -1;
			var index:int = arr.indexOf(value);
			if (index != -1)
				arr.splice(index, 1);
			return index;
		}

		/**
		 * 生成单一元素数组副本
		 */
		public static function createUniqueCopy(a:Array):Array
		{
			var newArray:Array = new Array();
			
			var len:Number = a.length;
			var item:Object;
			
			for (var i:uint = 0; i < len; ++i)
			{
				item = a[i];
				
				if(ArrayUtils.arrayContainsValue(newArray, item))
				{
					continue;
				}
				
				newArray.push(item);
			}
			
			return newArray;
		}

		/**
		 * 拷贝数值，浅拷贝；
		 * */
		public static function copyArray(arr:Array):Array
		{
			return arr.slice();
		}

		/**判定2数组是否相等*/
		public static function arraysAreEqual(arr1:Array, arr2:Array):Boolean
		{
			if(arr1.length != arr2.length)
			{
				return false;
			}
			
			var len:Number = arr1.length;
			
			for(var i:Number = 0; i < len; i++)
			{
				if(arr1[i] !== arr2[i])
				{
					return false;
				}
			}
			
			return true;
		}
		
		/***/
		public static function arrayContainsValue(arr:Array, value:Object):Boolean
		{
			return (arr.indexOf(value) != -1);
		}
	}
}

