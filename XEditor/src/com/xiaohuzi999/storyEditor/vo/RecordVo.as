package com.xiaohuzi999.storyEditor.vo
{
	/**
	 * RecordVo 记录值对象,|第一分割符，":"第二分隔符,四叉树结构,
	 * author:xiaohuzi999
	 * RecordVo.as 2015-5-19 下午2:14:14
	 * version 1.0
	 */
	public class RecordVo
	{
		//id
		public var recordId:String;
		//
		//绘图层==============================================================================
		//地图
		public var bg:String;
		/**立绘,格式——图片id|x|y|XScale|alpha;*/
		public var leftPlayer:Object;
		/**立绘——图片id|x|y|XScale|alpha;*/
		public var rightPlayer:Object;
		/**表情--图片id|x|y*/
		public var leftMood:Object;
		/**表情--图片id|x|y*/
		public var rightMood:Object;
		//特效
		public var effect:String;
		
		
		//数据层================================================================================
		//名字
		public var name:String;
		//对白
		public var dialog:String;
		
		//四叉树功能层===============================================================================
		/**下一个记录ID-四叉树结构-默认链接键*/
		public var nextRecordId_0:String;
		/**选择标签*/
		public var label_0:String;
		/**显示条件*/
		public var condition_0:String;
		
		/**下一个记录ID-四叉树结构*/
		public var nextRecordId_1:String;
		/**选择标签*/
		public var label_1:String;
		/**显示条件*/
		public var condition_1:String;
		
		/**下一个记录ID-四叉树结构*/
		public var nextRecordId_2:String;
		/**选择标签*/
		public var label_2:String;
		/**显示条件*/
		public var condition_2:String;
		
		/**下一个记录ID-四叉树结构*/
		public var nextRecordId_3:String;
		/**选择标签*/
		public var label_3:String;
		/**显示条件*/
		public var condition_3:String;
		
		/**父类类ID,区别分歧剧情*/
		public var parentId:String = ""
		/**父类名-调试用*/
		public var parentName:String = "";
		
		//数据操作================================================
		public var dataInfo:Object;
		//事件====================================================
		public var eventInfo:Object;
		
		public function RecordVo(data:Object = null)
		{
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