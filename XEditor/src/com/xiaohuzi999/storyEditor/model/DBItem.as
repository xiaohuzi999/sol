package com.xiaohuzi999.storyEditor.model
{
	import com.xiaohuzi999.storyEditor.vo.ItemVo;
	import com.xiaohuzi999.xControls.util.XCookie;
	
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.net.FileFilter;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	
	/**
	 * DBItem
	 * author:xiaohuzi999
	 * DBItem.as 2018-10-31 上午9:44:19
	 * version 1.0
	 *
	 */
	public class DBItem
	{
		public static var items:Object = {};
		//
		private static const NAME:String = "DBItem";
		public function DBItem()
		{
		}
		
		/***/
		public static function init():void{
			var str:* = XCookie.get(NAME);
			if(str){
				items = JSON.parse(str);
				for(var i:String in items){
					items[i] = new ItemVo(items[i])
				}
			}
		}
		
		/**保存数据*/
		public static function save():void{
			XCookie.set(NAME,JSON.stringify(items));
		}
		
		/**输入*/
		public static function input():void{
			var file:File = File.applicationDirectory.resolvePath("");
			file.browse([new FileFilter(".json","*.json")]);
			file.addEventListener(Event.SELECT, onOpen);
			
			function onOpen(event:Event):void{
				var file:File = event.target as File;
				var loader:URLLoader = new URLLoader();
				loader.load(new URLRequest(file.url));
				loader.addEventListener(Event.COMPLETE, onC);
				
				function onC(e:Event):void{
					loader.removeEventListener(Event.COMPLETE, onC);
					var str:String = loader.data;
					if(str){
						items = JSON.parse(str);
						for(var i:String in items){
							items[i] = new ItemVo(items[i])
						}
						save();
					}
				}
			}
		}
	}
}