package com.xiaohuzi999.storyEditor
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.net.URLRequest;
	
	/**
	 * PicItem
	 * author:xiaohuzi999
	 * PicItem.as 2015-5-18 下午5:41:56
	 * version 1.0
	 */
	internal class PicItem extends Sprite
	{
		private var $ui:MovieClip;
		private var _loader:Loader;
		private var _file:File;
		public function PicItem()
		{
			init();
		}
		
		private function init():void{
			$ui = new PIcItemUI();
			this.addChild($ui);
			
			_loader = new Loader();
			//this.addChild(_loader);
		}
		
		//加载
		public function setData(data:File):void{
			_file = data;
			_loader.load(new URLRequest(data.url));
			_loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onLoaded);
			$ui.nameTF.text = data.name;
		}
		
		//
		private function onLoaded(event:Event):void{
			event.currentTarget.removeEventListener(Event.COMPLETE, onLoaded);
			if(_loader.height * (90/_loader.width) > 60){//高度超过,以高度为基准
				_loader.scaleX = _loader.scaleY = 60/_loader.height;
			}else{
				_loader.scaleX = _loader.scaleY = 90/_loader.width;//格子是90*60的
			}
			_loader.x = ($ui.iconMC.width - _loader.width)/2
			_loader.y = $ui.iconMC.height - _loader.height;
			$ui.iconMC.addChild(_loader);
		}
		
		/***/
		public function get pic():BitmapData{
			if(!_loader.content){
				return null;
			}
			return Bitmap(_loader.content).bitmapData;
		}
		
		/***/
		public function get icon():DisplayObject{
			return $ui.iconMC;
		}
		
		/**数据*/
		public function get data():File{
			return _file;
		}
	}
}