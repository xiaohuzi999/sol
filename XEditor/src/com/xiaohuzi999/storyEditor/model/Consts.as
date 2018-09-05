package com.xiaohuzi999.storyEditor.model
{
	import flash.filesystem.File;

	/**
	 * Consts
	 * author:xiaohuzi999
	 * Consts.as 2015-5-20 下午2:14:17
	 * version 1.0
	 */
	public class Consts
	{
		/**静态数据*/
		public static const ST_URL:String = "assets\\";
		/**数据定义-类型-0：图片，1：音乐*/
		public static const DATA_LIST:Array = [
			{type:"0", url:"graphics\\background"},
			{type:"1", url:"graphics\\player"},
			{type:"2", url:"audio\\bgm"},
			{type:"3", url:"audio\\bgs"},
			{type:"4", url:"graphics\\mood"}
		]
		public static const BG_URL:String = "graphics\\background";
		public static const PLAYER_URL:String = "graphics\\player";
		public static const BGM_URL:String = "audio\\bgm";
		public static const BGS_URL:String = "audio\\bgs";
		public static const MOOD_URL:String = "graphics\\mood";
			
		public function Consts()
		{
		}
		
		/**获取路径*/
		public static function getURL(tempURL:String, NAME:String):String{
			var url:String = ST_URL+ tempURL + "\\" + NAME
			//var file:File = File.applicationDirectory.resolvePath(url);
			return /*file.url*/url;
		}
	}
}