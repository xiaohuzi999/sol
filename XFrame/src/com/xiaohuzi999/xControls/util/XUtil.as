package com.xiaohuzi999.xControls.util
{
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.geom.Point;
	import flash.utils.Dictionary;
	
	public class XUtil
	{
		/**禁用列表*/
		private static var disableMap:Dictionary = new Dictionary();
		public function XUtil()
		{
		}
		
		/**
		 * 把一个物体用一个物体包装后放回原处
		 * @param dis 子容器;
		 * @param disc 父容器；
		 */
		public static function setOldPosition(dis:DisplayObject,disc:DisplayObjectContainer):void{
			disc.x = dis.x;
			disc.y = dis.y;
			if(dis.parent){
				dis.parent.addChildAt(disc,dis.parent.getChildIndex(dis));
			}
			disc.addChild(dis);
			dis.x = dis.y = 0;
		}
		
		/**
		 * 物体居中对齐
		 * @param dis 需要对齐的物体，注意，此时物体必须已经加入到舞台
		 */
		 public static function alignCenter(dis:DisplayObject):void{
		 	if(!dis.stage){
				return;
			} 
//		 	var rect:Rectangle = dis.getRect(dis);
			dis.x = (dis.stage.stageWidth - dis.width - LayerManager.delX) * 0.5;// - rect.x;
			dis.y = (dis.stage.stageHeight - dis.height - LayerManager.delY) * 0.5;// - rect.y;
		 }
		 
		 /**
		 * 获取物体全局坐标
		 * @param dis 需要获取全局坐标的物体
		 * */
		 public static function getGlobalPostion(dis:DisplayObject):Point{
			 var p:Point = new Point(dis.x, dis.y);
			 var parent:DisplayObjectContainer = dis.parent;
			 while(parent && !(parent is Stage)){
				 p.x += parent.x;
				 p.y += parent.y;
				 parent = parent.parent;
			 }
			 return p;
		 }
		 
		 /**删除数组重复元素--简单数据类型*/
		 public static function delRepeatItem(arr:Array):Array{
			 var item:Object;
			 for(var i:uint=0; i< arr.length; i++){
				 item = arr[i];
				 for(var j:uint = i+1; j<arr.length; j++){
					 if(arr[j] == item){
						 arr.splice(j,1);
						 j --;
					 }
				 }
			 }
			 return arr
		 }
		 
		 /**反转字符串*/
		 public static function reverseStr(str:String):String{
			 var newStr:String = "";
			 for(var i:int= str.length -1; i>=0 ;i--){
				 newStr += str.charAt(i);
			 }
			 return  newStr
		 }
		 
		 /**删除字符串头部的空格*/
		 public static function ltrim(str:String):String{
			 while(str && str.length > 1 && str.charAt(0) == " "){
				 str = str.substr(1, str.length-1);
			 }
			 return str;
		 }
		 
		 /**
		  * 判断一个是否object是否为空
		  * @param obj 需要检测的对象
		  * @return true(空)/false;
		  * */
		 public static function isEmpty(obj:Object):Boolean{
			 for(var i:String in obj){
				 return false;
			 }
			 return true;
		 }
		 
		 /**计算KEY数目*/
		 public static function count(obj:Object):int{
			 var num:int = 0;
			 for(var i:String in obj){
				 num ++;
			 }
			 return num;
		 }
		 
		 /**
		  * 禁用可视化对象 
		  * @param mc
		  * @param isDisable
		  * 
		  */		
		 public static function disableDisplayObject(mc:InteractiveObject, isDisable:Boolean = true):void
		 {
			 if(mc){
				 var param:Object;
				 if (isDisable)
				 {
					 if (!disableMap[mc]){
						 
						 param = {};
						 param['mouseEnabled'] = mc.mouseEnabled;
						 param['filter'] = mc.filters;
						 disableMap[mc] = param;
						 
						 mc.filters = CoolEffect.blackFilter;
						 mc.mouseEnabled = false;
						 if (mc.hasOwnProperty('mouseChildren')){
							 param['mouseChildren'] = mc['mouseChildren'];
							 mc['mouseChildren'] = false;
						 }
					 }
				 }else {
					 param = disableMap[mc];
					 if(param){
						 mc.filters = param['filter'];
						 mc.mouseEnabled = param['mouseEnabled'];
						 if (mc.hasOwnProperty('mouseChildren')){
							 mc['mouseChildren'] = param['mouseChildren']; 
						 }
						 delete disableMap[mc];
					 }
				 }
			 }
		 }
		 
		 /**
		 * 影片剪辑自动回收
		 * 
		 * */
		 public static function autoRecycle(mc:MovieClip):void{
			 if(mc.parent){
				 mc.addEventListener(Event.ENTER_FRAME, onEF);
			 }
			 
			 function onEF(event:Event):void{
				 var mc:MovieClip = event.currentTarget as MovieClip;
				 if(mc.currentFrame == mc.totalFrames){
					 mc.stop();
					 if(mc.parent){
						 mc.parent.removeChild(mc);
					 }
					 mc.removeEventListener(Event.ENTER_FRAME, onEF);
				 }
			 }
		 }
		 
		 /**清空子对象*/
		 public static function removeChildren(disc:DisplayObjectContainer):void{
			 while(disc.numChildren){
				 disc.removeChildAt(0);
			 }
		 }
		 
		 /**
		  * 包装数据-与接口兼容,默认为正确结果
		  * @param 返回数据
		  */
		 public static function pack(data:Object, res:Boolean=true,code:int = 0):Object{
			 return {Res:res, Data:data, Code:code};
		 }
		 
		 /**碰撞检测*/
		 public static function checkHit(sp:Sprite):Boolean{
			 return sp.visible && sp.mouseX>0 && sp.mouseY>0 && sp.mouseX < sp.width && sp.mouseY < sp.height;
		 }
		 
		 /**克隆对象*/
		 public static function clone(obj:Object):Object{
			 if(!obj){
				 return null;
			 }
			 return JSON.parse(JSON.stringify(obj));
		 }
	}
}