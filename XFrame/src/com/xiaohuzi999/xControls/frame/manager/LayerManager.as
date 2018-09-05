package com.xiaohuzi999.xControls.frame.manager
{
	import com.xiaohuzi999.xControls.frame.interfaces.IXWindow;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.Sprite;
	import flash.display.Stage;

	/**
	 * 层级管理器,用于管理各组件的层级
	 * @author xiaohuzi999@163.com
	 * @version 2.0
	 * */
	public class LayerManager
	{
		/**层容器*/
		private static var _layerSprite:Sprite
		
		/**固定层---如地图神马的*/
		private static var _fixedLayer:Sprite;
		
		/**窗体层---如背包神马的*/
		private static var _movableLayer:Sprite;
		
		/**框框层----如人物头像神马的，在窗体之上-------;*/
		private static var _frameLayer:Sprite;
		
		/**模式窗体层*/
		private static var _modeLayer:Sprite;
		
		/**顶层---如模式窗口*/
		private static var _topLayer:Sprite;
			
		/**层容器数据*/
		private static var _layersArr:Array;
		
		/**常数-层级-最底层*/
		public static const FIXED_LAYER:uint = 0;
		
		/**常数-层级-普通窗口*/
		public static const WINDOW_LAYER:uint = 1;
		
		/**常数-层级-框框*/
		public static const FRAME_LAYER:uint = 2;
		
		/**常数-层级-模式窗体层*/
		public static const MWINDOW_LAYER:uint = 3;
		
		/**常数-层级-顶层*/
		public static const TOP_LAYER:uint = 4;
		
		public static var delX:Number = 0;
		public static var delY:Number = 0;
		
		public function LayerManager()
		{
		}
		
		/**
		 * 设置组件容器——只能设置一次
		 * @param disc默认的组件容器；注意，disc必须已经加载到舞台；
		 */
		public static function setDefaultContainer(disc:DisplayObjectContainer):void{
			if(!_layerSprite){
				_layersArr = new Array();
				_layerSprite = new Sprite();
				disc.addChild(_layerSprite);
				_layerSprite.mouseEnabled = false;
				//固定层
				_fixedLayer = new Sprite();
				_layerSprite.addChild(_fixedLayer);
				_fixedLayer.name = "FIX"
				//普通窗体层;
				_movableLayer = new Sprite();
				_movableLayer.name = "MOV"
				_layerSprite.addChild(_movableLayer);
				//框框层
				_frameLayer = new Sprite();
				_frameLayer.name = "FRA"
				_layerSprite.addChild(_frameLayer);
				//模式窗体层
				_modeLayer = new Sprite();
				_modeLayer.name = "MOD";
				_layerSprite.addChild(_modeLayer);
				//顶层
				_topLayer = new Sprite();
				_topLayer.name = "Top";
				_layerSprite.addChild(_topLayer);
				_fixedLayer.mouseEnabled = _movableLayer.mouseEnabled = _frameLayer.mouseEnabled = 
					_topLayer.mouseEnabled = _modeLayer.mouseEnabled= false;
				_layersArr.push(_fixedLayer,_movableLayer,_frameLayer,_modeLayer,_topLayer);
			}
		}
		
		/**重新设定位置*/
		public static function resize(delX:Number, delY:Number):void{
			LayerManager.delX = delX;
			LayerManager.delY = delY;
		}
		
		/**
		 * 设置视图的层级
		 * @param view 视图组件
		 * @param layer 层级,常数定义在LayerManager中 
		 * */
		public static function setLayer(view:DisplayObject, layer:uint = WINDOW_LAYER):void{
			DisplayObjectContainer(_layersArr[layer]).addChild(view);
			if(view is IXWindow){
				IXWindow(view).container = DisplayObjectContainer(_layersArr[layer])
			}
		}
		
		/**
		 * 获取层容器
		 * @param layerId层ID，常量定义于LayerManager中
		 * @return Sprite;
		 * */
		public static function getLayer(layerId:int):Sprite{
			var layer:Sprite;
			switch(layerId){
				case FIXED_LAYER:
					layer = _fixedLayer;
					break;
				case WINDOW_LAYER:
					layer = _movableLayer;
					break;
				case FRAME_LAYER:
					layer = _frameLayer
					break;
				case TOP_LAYER:
					layer = _topLayer
					break;
				case MWINDOW_LAYER:
					layer = _modeLayer;
					break;
			}
			return layer
		}
		
		/**获取舞台对象*/
		public static function get stage():Stage{
			return _layerSprite.stage;
		}
	}
}