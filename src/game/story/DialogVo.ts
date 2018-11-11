/*
* name;
*/
class DialogVo{
        //id
		public id:string;
        //绘图层==============================================================================
		//地图
		public  bg:{n:string, x:number,y:number,sx:number, al:number,b:boolean,m:boolean};
		/**立绘,格式——图片id|x|y|XScale|alpha;*/
		public  p0:{n:string, x:number,y:number,sx:number, al:number,b:boolean,m:boolean};
		/**立绘——图片id|x|y|XScale|alpha;*/
		public  p1:{n:string, x:number,y:number,sx:number, al:number,b:boolean,m:boolean};
		/**立绘——图片id|x|y|XScale|alpha;*/
		public  p2:{n:string, x:number,y:number,sx:number, al:number,b:boolean,m:boolean};
		/**立绘——图片id|x|y|XScale|alpha;*/
		public  p3:{n:string, x:number,y:number,sx:number, al:number,b:boolean,m:boolean};
		
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
		//动画时间
		public time:number = 500;
		//方向
		public dir:number = 1;
		
		//四叉树功能层===============================================================================
		/**下一个记录ID-四叉树结构-默认链接键*/
		public  nId_0:string;
		/**选择标签*/
		public  lb_0:string;
		/**显示条件*/
		public  cond_0:string;
		
		/**下一个记录ID-四叉树结构*/
		public  nId_1:string;
		/**选择标签*/
		public  lb_1:string;
		/**显示条件*/
		public  cond_1:string;
		
		/**下一个记录ID-四叉树结构*/
		public  nId_2:string;
		/**选择标签*/
		public  lb_2:string;
		/**显示条件*/
		public  cond_2:string;
		
		/**下一个记录ID-四叉树结构*/
		public  nId_3:string;
		/**选择标签*/
		public  lb_3:string;
		/**显示条件*/
		public  cond_3:string;
		
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