package com.xiaohuzi999.storyEditor.vo
{
	/**
	 * StoryVo
	 * author:xiaohuzi999
	 * StoryVo.as 2015-5-26 上午11:18:33
	 * version 1.0
	 */
	public class StoryVo
	{
		//{storyName:name, storyId:storyId, dialogList:{0:{recordId:0}}};//新剧本默认生成一个空白对话
		/**名字*/
		public var storyName:String;
		/**ID*/
		public var storyId:int;
		/**过关条件*/
		public var condition:String = ""
		/**类型*/
		public var type:String = "0"
		/**对话数据*/
		public var dialogList:Object = new Object();
		/**对话条目数量——用来生成ID,0是起始ID*/
		public var diaIndex:Number = 1;
		
		public function StoryVo(data:Object = null){
			setValue(data);
		}
		
		public function setValue(data:Object):void{
			if(data != null){
				for(var i:String in data){
					if(this.hasOwnProperty(i)){
						this[i] = data[i];
					}
				}
			}
		}
	}
}