package com.xiaohuzi999.storyEditor.vo
{
	/**
	 * ItemVo
	 * author:xiaohuzi999
	 * ItemVo.as 2018-9-5 上午11:15:46
	 * version 1.0
	 *
	 */
	public class ItemVo
	{
		public var id:int;
		public var name:String;
		public var icon:String;
		public var price:int;
		
		//shuxing
		//加成；
		public function ItemVo(obj:Object=null)
		{
			for(var i:String in obj){
				if(this.hasOwnProperty(i)){
					this[i] = obj[i];
				}
			}
		}
	}
}