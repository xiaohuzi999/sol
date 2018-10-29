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
		public var id:String;
		//
		//绘图层==============================================================================
		//地图
		public var bg:Object;
		//back/blur非聚焦状态，默认false
		/**立绘,格式——图片{name:string,x:number,y:number,scaleX:number,alpha:number, back/blur:boolean}*/
		/**缩减{n:string,x:number,y:number,sx:number,al:number,b:boolean}*/
		public var p0:Object;
		/**立绘——图片id|x|y|XScale|alpha;*/
		public var p1:Object;
		//
		public var p2:Object;
		public var p3:Object;
		/**表情--图片id|x|y*/
		public var lm:Object;
		/**表情--图片id|x|y*/
		public var rm:Object;
		//装饰
		public var eff:Object;
		//特效 {flashRed, flashWhite, shake，shake1，shake2，shake3}
		public var act:Object;
		
		//数据层================================================================================
		//名字
		public var name:String;
		//对白
		public var dialog:String;
		//动画时间
		public var time:int = 500;
		
		//四叉树功能层===============================================================================
		/**下一个记录ID-四叉树结构-默认链接键*/
		public var nId_0:String;
		/**选择标签*/
		public var lb_0:String;
		/**显示条件*/
		public var cond_0:String;
		
		/**下一个记录ID-四叉树结构*/
		public var nId_1:String;
		/**选择标签*/
		public var lb_1:String;
		/**显示条件*/
		public var cond_1:String;
		
		/**下一个记录ID-四叉树结构*/
		public var nId_2:String;
		/**选择标签*/
		public var lb_2:String;
		/**显示条件*/
		public var cond_2:String;
		
		/**下一个记录ID-四叉树结构*/
		public var nId_3:String;
		/**选择标签*/
		public var lb_3:String;
		/**显示条件*/
		public var cond_3:String;
		
		/**父类类ID,区别分歧剧情*/
		public var pId:String = ""
		/**父类名parentName-调试用*/
		public var pn:String = "";
		
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