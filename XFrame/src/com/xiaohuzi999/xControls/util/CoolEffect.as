package com.xiaohuzi999.xControls.util
{
	import flash.filters.*;
	import flash.text.TextFormat;
	
	/**
	 * 滤镜特效类
	 * @author huhaiming
	 */
	public class CoolEffect
	{
		/**文字滤镜*/
		public static const TEXT_FILTER:GlowFilter=new GlowFilter(0x222222,1,2,2,4, 2);
		
		/**焦点滤镜*/
		public static const FOCUS_FILTER:GlowFilter = new GlowFilter(0xffff00,1,10,10,3,1);
		
		/**按钮滤镜*/
		private static var _blackFilter:Array;
		/***/
		private static var _unFocusFilter:Array;
		public function CoolEffect()
		{
		}
		/**黑白滤镜*/
		public static function get blackFilter():Array{
			if(!_blackFilter){
				_blackFilter=new Array();
				var matrix:Array = [0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0.3, 0.59, 0.11, 0, 0, 0, 0, 0, 1, 0]
				var filter:ColorMatrixFilter=new ColorMatrixFilter(matrix);
				_blackFilter.push(filter);
				
			}
			return _blackFilter
		}
		
		/**特殊滤镜组合，灰色+模糊*/
		public static function get unFocusFilter():Array{
			if(!_unFocusFilter){
				_unFocusFilter = new Array();
				var matrix:Array = [0.65,0.3,0.04,0,0,0.15,0.8,0.04,0,0,0.15,0.30,0.54,0,0,0,0,0,1,0];
				var filter:*=new ColorMatrixFilter(matrix);
				_unFocusFilter.push(filter);
				filter = new BlurFilter(5, 5);
				_unFocusFilter.push(filter);
			}
			return _unFocusFilter;
		}
	}
}