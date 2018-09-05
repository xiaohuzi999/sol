package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.core.BasicView;
	import com.xiaohuzi999.xControls.frame.interfaces.IIcon;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	/**
	 * Icon 图标类,设计核心为共用位图源
	 * @author xiaohuzi999@163.com
	 * @version 1.0
	 */
	public class XIcon extends BasicView implements IIcon
	{
		/**数据源*/
		protected var _data:*;
		
		/**Icon源，即从哪个Icon克隆过来的*/
		protected var _source:*
		
		/**图标*/
		protected var _icon:BitmapData
		
		/**容器*/
		protected var _bm:Bitmap
		
		/**是否临时图标-临时图标需要销毁*/
		public var isTemp:Boolean;
		
		/**位图偏移-误差设置*/
		private const OFFSET_X:Number = 0;
		private const OFFSET_Y:Number = 0;
		
		public function XIcon(isTemp:Boolean = false)
		{
			this.isTemp = isTemp
			_bm = new Bitmap();
			this.addChild(_bm);
		}
		
		/**克隆*/
		public function clone():IIcon{
			var icon:XIcon = new XIcon();
			icon.icon = this.icon;
			icon.data = this.data;
			icon.source = this;
			return icon;
		}
		
		/**
		 * 销毁
		 * @param forceToDistory是否强制销毁--注意必须确定不再需要位图源时才能销毁;
		 * */
		public function dispose(forceToDistory:Boolean = false):void{
			if(this.isTemp || forceToDistory){
				this._icon.dispose();
			}
		}
		
		/**图标*/
		public function set icon(iconData:*):void{
			if(iconData is BitmapData){
				this._icon = iconData;
			}else if(iconData is DisplayObject){
				var dis:DisplayObject = DisplayObject(iconData);
				var rect:Rectangle = dis.getRect(dis);
				if(this._icon){
					this._icon.dispose();
				}
				this._icon = new BitmapData(dis.width+OFFSET_X, dis.height+OFFSET_Y, true, 0xffffff);
				this._icon.draw(dis, new Matrix(1, 0, 0, 1, -rect.x+OFFSET_X/2, -rect.y+OFFSET_Y/2));
				var scale:Point = getScale(dis);
				_bm.scaleX = scale.x;
				_bm.scaleY = scale.y;
			}
			this._bm.bitmapData = _icon;
			_bm.smoothing = true;
		}
		
		/**针对缩放的对象*/
		private function getScale(dis:DisplayObject):Point{
			var scale:Point = new Point(dis.scaleX, dis.scaleY);
			while(!(dis.parent is Stage)){
				scale.x *= dis.parent.scaleX;
				scale.y *= dis.parent.scaleY;
				dis = dis.parent;
			}
			return scale;
		}
		
		/**图标*/
		public function get icon():BitmapData{
			return this._icon;
		}
		
		/**数据源*/
		public function set data(value:*):void{
			this._data = value;
		}
		
		/**数据源*/
		public function get data():*{
			return this._data;
		}
		
		/**Icon源，即从哪个Icon克隆过来的，作用类似指针*/
		public function set source(icon:*):void{
			this._source = icon;
		}
		
		/**Icon源，即从哪个Icon克隆过来的，作用类似指针*/
		public function get source():*{
			return _source;
		}
	}
}