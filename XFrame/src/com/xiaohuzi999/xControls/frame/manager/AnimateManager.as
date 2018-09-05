package com.xiaohuzi999.xControls.frame.manager
{
	import com.greensock.TweenLite;
	import com.greensock.easing.Back;
	import com.greensock.easing.Cubic;
	
	import flash.display.DisplayObject;
	
	/**
	 * 动画效果管理类
	 * 以“in”结尾的方法为显示
	 * 以“out”结尾的方法为隐藏
	 * @author xiaohuzi999@163.com
	 */
	public class AnimateManager
	{
		/** 默认动画缓动时间*/
		private static const MOVE_TIME:Number = 0.3;
		/**
		 * 淡入，向上飘
		 * @param window 显示特效的对象
		 * @param deltaY 向上位移；
		 * */
		public static function flowin(window:DisplayObject, $complete:Function = null, deltaY:Number = 30):void
		{
			window.y += deltaY;
			window.alpha = 0;
			TweenLite.to(window, MOVE_TIME, {y:window.y-deltaY, alpha:1, onComplete:onCompleteHandle});
			
			function onCompleteHandle():void
			{
				if($complete != null)
					$complete();
			}
		}
		
		/**
		 * 淡出-向上飘
		 * @param window 显示特效的对象
		 * @param deltaY 向上位移；
		 * @param onComplete 动画结束后执行的函数
		 * */
		public static function flowout(window:DisplayObject, onComplete:Function = null, deltaY:Number = 30):void{
			TweenLite.to(window, MOVE_TIME-0.1, {y:window.y-deltaY, alpha:0, onComplete:onComplete});
		}
		
		/**
		 * 弹出
		 * @param window 显示特效的对象
		 */
		public static function popIn(window:DisplayObject):void{
			var w:Number = window.width;
			var h:Number = window.height;
			window.scaleX = window.scaleY = 0.1;
			window.alpha = 0;
			var deltaX:Number = (w - w * 0.1)/2;
			var deltaY:Number = (h - h * 0.1)/2;
			window.x += deltaX;
			window.y += deltaY;
			TweenLite.to(window, MOVE_TIME, {x:window.x-deltaX, y:window.y-deltaY, alpha:1, scaleX:1, scaleY:1, ease:Back.easeOut});
		}
		
		/**
		 * 退出-弹出方式
		 * @param window 显示特效的对象
		 */
		public static function popOut(window:DisplayObject, onComplete:Function = null):void{
			var w:Number = window.width;
			var h:Number = window.height;
			var deltaX:Number = (w - w * 0.1)/2;
			var deltaY:Number = (h - h * 0.1)/2;
			TweenLite.to(window, MOVE_TIME, {x:window.x+deltaX, y:window.y+deltaY, alpha:0, scaleX:0.1, scaleY:0.1,  ease:Back.easeInOut, onComplete:onComplete});
		}
		
		/**
		 * 淡入-
		 * @param window 显示特效的对象
		 */
		public static function fadeIn(window:DisplayObject, time:Number = MOVE_TIME/2):void{
			window.alpha = 0;
			TweenLite.to(window, time, {alpha:1,ease:Cubic.easeIn});
		}
		
		/**
		 * 淡出
		 * @param window 显示特效的对象
		 */
		public static function fadeOut(window:DisplayObject, onComplete:Function = null):void{
			TweenLite.to(window, MOVE_TIME/2, {alpha:0, onComplete:onOut, onCompleteParams:[onComplete]});
			
			function onOut(onComplete:Function = null):void{
				window.alpha = 1;
				if(onComplete != null){
					onComplete();
				}
			}
		}
	}
}