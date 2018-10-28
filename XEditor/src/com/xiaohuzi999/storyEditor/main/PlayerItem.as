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
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filters.ColorMatrixFilter;

	/**
	 * PlayerItem
	 * author:xiaohuzi999
	 * PlayerItem.as 2018-10-28 上午9:19:06
	 * version 1.0
	 *
	 */
	public class PlayerItem extends Sprite
	{
		protected var _bm:Bitmap;
		private var _lockY:int= -9999;
		public var data:Object;
		/**是否可以移动标志*/
		public var canMove:Boolean = true;
		/**UPDATE*/
		public static const UPDATE:String = "UPDATE";
		private var _blackFilter:ColorMatrixFilter = new ColorMatrixFilter([1, 0, 0, 0, -100,
			0, 1, 0, 0, -100, 
			0, 0, 1, 0, -100, 
			0, 0, 0, 1, 0]);
		public function PlayerItem()
		{
			init();
		}
		
		public function update(item:Object):void{
			_bm.bitmapData = item.pic;
			if(!data){
				data = {};
			}
			data.n = (item.data.name+"").split(".")[0];
			data.x = this.x;
			data.y = this.y
		}
		
		public function format(info:Object):void{
			if(!XUtil.isEmpty(info)){
				this.scaleX = info.sx || 1;
				this.x = info.x;
				this.y = info.y;
				if(info.b){
					this.filters = [_blackFilter];
					modifyMenu("幕后", "幕前");
				}else{
					modifyMenu("幕前", "幕后");
				}
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, info.n)+".png", onLoadPic);
			}
			
			function onLoadPic(info:LoaderInfo):void{
				_bm.bitmapData = Bitmap(info.content).bitmapData
				_bm.smoothing = true;
			}
			
			data = info;
		}
		
		public function reset():void{
			_bm.bitmapData = null;
			this.filters = null;
			this.data = null;
		}
		
		//修改操作菜单
		public function modifyMenu(curMenu:String, targetMenu:String):void{
			for(var i:int=0;i<this.contextMenu.items.length; i++){
				if(this.contextMenu.items[i].label == curMenu){
					this.contextMenu.items[i].label = targetMenu;
					break;
				}
			}
		}
		
		private function onSelect(event:Event):void{
			var label:String = event.currentTarget.label;
			switch(label){
				case "翻转":
					this.scaleX*=-1;
					break;
				case "幕前":
					if(data){
						delete data.b;
						this.filters = null;
						modifyMenu("幕前", "幕后");
						MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
					}
					break;
				case "幕后":
					if(data){
						data.b = true;
						this.filters = [_blackFilter];
						modifyMenu("幕后", "幕前");
						MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
					}
					break;
				case "自动对齐":
					break;
				case "删除":
					reset();
					MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
					break;
			}
		}
		
		private function onMM(e:MouseEvent):void{
			if(canMove){
				if(e.ctrlKey){
					_lockY = this.y;
				}
				this.startDrag();
				this.addEventListener(MouseEvent.MOUSE_UP, this.onMU);
			}
		}
		
		private function onMU(e:MouseEvent):void{
			this.stopDrag();
			this.removeEventListener(MouseEvent.MOUSE_UP, this.onMU);
			if(_lockY != -9999){
				this.y = _lockY;
				_lockY = -9999;
			}
			if(data){
				this.data.x = this.x;
				this.data.y = this.y;
				MainDispatcher.getInstance().dispatchEvent(new XEvent(UPDATE));
			}
		}
		
		protected function createMenu():void{
			var menu:NativeMenu = new NativeMenu();
			var lbs:Array = ["翻转", "幕后","自动对齐", "删除"]
			for(var i:int=0; i<lbs.length; i++){
				var item:NativeMenuItem = new NativeMenuItem(lbs[i])
				menu.addItem(item);
				item.addEventListener(Event.SELECT, onSelect);
			}
			this.contextMenu = menu;
		}
		
		protected function drawFrame():void{
			this.graphics.lineStyle(2, 0xff0000, 0.5);
			this.graphics.drawRect(0, 0, 320, 400);
		}
		
		private function init():void{
			_bm = new Bitmap();
			this.addChild(_bm);
			this.createMenu();
			this.drawFrame();
			this.addEventListener(MouseEvent.MOUSE_DOWN, this.onMM);
		}
		
		
		override public function set scaleX(value:Number):void{
			if(this.data){
				this.data.sx = value;
			}
			super.scaleX = value;
		}
	}
}