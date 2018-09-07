/*
* name;
*/
class DialogVo{
        //id
		public recordId:string;
        //绘图层==============================================================================
		//地图
		public  bg:string;
		/**立绘,格式——图片id|x|y|XScale|alpha;*/
		public  leftPlayer:{name:string, x:number,y:number,scaleX:number, alpha:number};
		/**立绘——图片id|x|y|XScale|alpha;*/
		public  rightPlayer:{name:string, x:number,y:number,scaleX:number, alpha:number};
		/**表情--图片id|x|y*/
		public  leftMood:string;
		/**表情--图片id|x|y*/
		public  rightMood:string;
		//特效
		public  effect:string;
		
		
		//数据层================================================================================
		//名字
		public  name:string;
		//对白
		public  dialog:string;
		
		//四叉树功能层===============================================================================
		/**下一个记录ID-四叉树结构-默认链接键*/
		public  nextRecordId_0:string;
		/**选择标签*/
		public  label_0:string;
		/**显示条件*/
		public  condition_0:string;
		
		/**下一个记录ID-四叉树结构*/
		public  nextRecordId_1:string;
		/**选择标签*/
		public  label_1:string;
		/**显示条件*/
		public  condition_1:string;
		
		/**下一个记录ID-四叉树结构*/
		public  nextRecordId_2:string;
		/**选择标签*/
		public  label_2:string;
		/**显示条件*/
		public  condition_2:string;
		
		/**下一个记录ID-四叉树结构*/
		public  nextRecordId_3:string;
		/**选择标签*/
		public  label_3:string;
		/**显示条件*/
		public  condition_3:string;
		
		/**父类类ID,区别分歧剧情*/
		public  parentId:string = ""
		/**父类名-调试用*/
		public  parentName:string = "";
		
		//数据操作================================================
		public  dataInfo:any;
		//事件====================================================
		public  eventInfo:{fight?:string, joinTeam?:string, leftTeam?:string, gameOver?:string};

    constructor(){
    }
}