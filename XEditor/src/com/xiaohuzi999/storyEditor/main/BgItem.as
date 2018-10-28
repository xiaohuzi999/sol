package com.xiaohuzi999.storyEditor.main
{
	import com.xiaohuzi999.storyEditor.model.Consts;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.Bitmap;
	import flash.display.LoaderInfo;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.events.Event;
	import flash.geom.Rectangle;

	/**
	 * BgItem
	 * author:xiaohuzi999
	 * BgItem.as 2018-10-28 下午7:40:36
	 * version 1.0
	 *
	 */
	public class BgItem extends PlayerItem
	{
		private var _players:Array;
		//事件-对齐
		public static const ALIGN:String = "align"
		//事件-一键背景
		public static const SETBG:String = "setBg"
		//事件-立绘
		public static const SETPLAYER:String = "setPlayer"
		public function BgItem()
		{
			super();
			this.scrollRect = new Rectangle(0,0,750, 800);
		}
		
		override public function format(info:Object):void{
			if(!XUtil.isEmpty(info)){
				this.x = info.x;
				this.y = info.y;
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, info.n)+".jpg", onLoadPic);
			}
			
			function onLoadPic(info:LoaderInfo):void{
				_bm.bitmapData = Bitmap(info.content).bitmapData
				_bm.smoothing = true;
			}
			
			data = info;
		}
		
		/**关联例会对象*/
		public function atachPlayer(...args):void{
			_players = args;
		}
		
		override protected function drawFrame():void{
			this.graphics.beginFill(0xffffff, 0.01);
			this.graphics.drawRect(0, 0, 750, 430);
			this.graphics.endFill();
		}
		
		private function onSelect(event:Event):void{
			var label:String = event.currentTarget.label;
			switch(label){
				case "继承立绘":
					MainDispatcher.getInstance().dispatchEvent(new XEvent(SETPLAYER));
					break;
				case "解锁立绘":
					for(var i:int=0; i<_players.length; i++){
						this._players[i].canMove = true;
					}
					modifyMenu("解锁立绘", "锁定立绘");
					break;
				case "锁定立绘":
					for(i=0; i<_players.length; i++){
						this._players[i].canMove = false;
					}
					modifyMenu("锁定立绘", "解锁立绘");
					break;
				case "锁定背景":
					this.canMove = false;
					modifyMenu("锁定背景", "解锁背景");
					break;
				case "解锁背景":
					this.canMove = true;
					modifyMenu("解锁背景", "锁定背景");
					break;
				case "显示立绘3&4":
					this._players[2].visible = this._players[3].visible = true;
					modifyMenu("显示立绘3&4", "隐藏立绘3&4");
					break;
				case "隐藏立绘3&4":
					this._players[2].visible = this._players[3].visible = false;
					modifyMenu("隐藏立绘3&4", "显示立绘3&4");
					break;
				case "一键背景":
					if(data){
						MainDispatcher.getInstance().dispatchEvent(new XEvent(SETBG,data));
					}else{
						XTip.showTip("当前对话没有背景~");
					}
					break;
			}
		}
		
		override protected function createMenu():void{
			var menu:NativeMenu = new NativeMenu();
			var lbs:Array = ["继承立绘", "锁定立绘","锁定背景", "显示立绘3&4", "一键背景"]
			for(var i:int=0; i<lbs.length; i++){
				var item:NativeMenuItem = new NativeMenuItem(lbs[i])
				menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
			}
			this.contextMenu = menu;
		}
	}
}