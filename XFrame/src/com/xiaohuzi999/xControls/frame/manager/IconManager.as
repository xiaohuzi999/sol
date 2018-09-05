package com.xiaohuzi999.xControls.frame.manager
{
	
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.utils.Dictionary;
		
	public class IconManager
	{
		/**位图map--可能考虑是否需要弱引用*/
		private static var _bmdMap:Dictionary = new Dictionary();
		/**URL前缀*/
		private static var _preURL:String

		/**常量—图片类型-道具*/
		public static const ITEM_ICON:int = 0;
		public function IconManager()
		{
			throw new Error("IconManager is tatic only!");
		}
		
		/**
		 * 获取图片资源
		 * @param url 图片地址
		 * @param type 图片类型： 
		 * @param callback 回调函数，参数为bitmatdata
		 * @return bitmatdata;
		 */
		public static function getIcon(url:String, type:int = ITEM_ICON, callback:Function=null):BitmapData{
			var bmd:BitmapData;
			var bmdWith:Number;
			var bmdHeight:Number;
			switch(type){
				case ITEM_ICON:
					bmdWith = bmdHeight = 60;
					break;
			}
			//trace(_preURL+url);
			if(_bmdMap[_preURL+url]){
				bmd = _bmdMap[_preURL+url];
				if(callback != null){
					callback(bmd);
				}
			}else{
				bmd = new BitmapData(bmdWith, bmdHeight, true, 0xffffff);
				DisplayLoader.getLoaderInfo(_preURL+url, onComplete, [_preURL+url, bmd, type, callback],null,function():void{//可读性极差，不建议用
					var shap:Shape = new Shape();
					shap.graphics.lineStyle(2,0xff0000);
					shap.graphics.lineTo(bmdWith,bmdHeight);
					shap.graphics.moveTo(0,bmdHeight);
					shap.graphics.lineTo(bmdWith,0);
					bmd.draw(shap);
				});
			}
			return bmd;
		}
		
		/**
		 * 图片加载成功
		 * */
		private static function onComplete(info:LoaderInfo, url:String, bmd:BitmapData, type:int, callback:Function=null):void{
			_bmdMap[url] = bmd;
			bmd.draw(info.content);
			if(callback != null){
				callback(bmd);
			}
		}
	}
}