package com.xiaohuzi999.xControls.frame.manager
{
	
	import com.xiaohuzi999.xControls.frame.XToolTip;
	import com.xiaohuzi999.xControls.frame.interfaces.IXToolTip;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.display.Stage;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.utils.Dictionary;
	import flash.utils.Timer;
	import flash.utils.getTimer;
	
	/**
	 * TIP统一管理类
	 * @author xiaohuzi999@163.com
	 * @modified by daylyn
	 * （1）添加延迟显示
	 * （2）tip偏移位置参数化
	 */
	public class TipManager
	{
		/** tip 等待时间 */
		public static const WAIT_TIME:int = 600;
		/** tip最快响应时间 */
		public static const FAST_OCCUR_TIME:int = 80;
		private static var _last_tip_dropped_time:int = 0;
		/**单例*/
		private static var _instance:TipManager;
		/**默认Tip类*/
		public static var defaultTipClass:Class = XToolTip;
		/**建立一个引用*/
		private var _tip:IXToolTip;
		/**所有的TIP关联信息*/
		private var _tipObjects:Dictionary = new Dictionary();
		/**所有的TIP对象*/
		private var _tipsObj:Object = {};
		/**所有TIP的默认容器*/
		private var _defaultContainer:DisplayObjectContainer;
		/**tip与鼠标的x距离*/
		private var _offsetX:Number = 10;
		/**tip与鼠标的Y距离*/
		private var _offsetY:Number = 10;
		private var _timer:Timer;
		
		public function TipManager()
		{
			if(_instance)
				throw new Error("TipManager is singleton!"); 
			else
			{
				_instance = this;
				
				_timer = new Timer(WAIT_TIME, 1);
				_timer.addEventListener(TimerEvent.TIMER_COMPLETE, __timeOnAction);
			}
		}
		
		private function __timeOnAction(e:TimerEvent):void
		{
			startTip();
		}
		
		/**
		 * 设置tip默认容器 
		 * @param disc
		 * 
		 */		
		public static function set defaultContainer(disc:DisplayObjectContainer):void
		{
			getInstance()._defaultContainer = disc;
			var tips:Object = getInstance()._tipsObj;
			for(var i:String in tips){
				IXToolTip(tips[i]).container = disc;
			}
		}
		/**
		 * 注册物体TIP，静态公开接口；
		 * @param obj 显示TIP的物体
		 * @param info TIP的数据,如文字介绍
		 * @param tipTyp 显示的TIP类型——默认为文本类型，新增的则为类名
		 * @param $wait 是否延迟显示
		 */
		public static function registerTip(obj:InteractiveObject,info:Object = "" , tipTyp:Class=null, $wait:Boolean = false):void{
			getInstance().registerTip(obj, info, tipTyp, $wait);
		}
		
		/**
		 * 反注册物体的TIP；
		 * @param obj 反注册TIP的物体,静态公开接口
		 */
		public static function removeTip(obj:InteractiveObject):void{
			getInstance().removeTip(obj);
		}
		
		/**
		 * 显示TIP，静态公开方法
		 * @param tipInfo : TIP数据
		 * @param typeName TIP名
		 */
		public static function showTip(tipInfo:Object, tipTyp:Class):void{
			getInstance().showTip(tipInfo,tipTyp);
		}
		
		/**隐藏当前TIP*/
		public  static  function hideTip():void{
			getInstance().hideTip();
		}
		
		/**
		 * 注册物体TIP；
		 * @param obj 显示TIP的物体
		 * @param info TIP的数据,如文字介绍
		 * @param tipTyp 显示的TIP类型——默认为文本类型，新增的则为类名
		 */
		private function registerTip(obj:InteractiveObject,info:Object="", tipTyp:Class=null, $wait:Boolean = true):void
		{
			if(_tipObjects[obj] == null){
				obj.addEventListener(MouseEvent.ROLL_OVER,tipShowEvent);
				obj.addEventListener(MouseEvent.ROLL_OUT,tipShowEvent);
			}
			obj.removeEventListener(MouseEvent.MOUSE_MOVE, tipShowEvent);
			_tipObjects[obj] = new TipVo(info, tipTyp, $wait);
			if (obj is Stage || obj == _targetedComponent)
			{
				_targetedComponent = obj;
				getToolTip(tipTyp).showTip(info);
			}
		}
		
		private var _targetedComponent:InteractiveObject;
		
		/**
		 * 反注册物体的TIP；
		 * @param obj 反注册TIP的物体
		 */
		private function removeTip(obj:InteractiveObject):void{
			obj.removeEventListener(MouseEvent.ROLL_OVER, tipShowEvent);
			obj.removeEventListener(MouseEvent.ROLL_OUT, tipShowEvent);
			obj.removeEventListener(MouseEvent.MOUSE_MOVE, tipShowEvent);
			delete _tipObjects[obj];
		}
		
		/**
		 * 显示TIP
		 * @param tipInfo : TIP数据
		 * @param typeName TIP名
		 */
		private function showTip(tipInfo:Object, tipTyp:Class = null):void{
			if(_tip){
				_tip.close();
			}
			_tip = getToolTip(tipTyp);
			//加入舞台
			_tip.showTip(tipInfo);
			_tip.show();
			setPos();
		}
		
		/**隐藏当前TIP*/
		private  function hideTip():void{
			if(_tip){
				_tip.close();
			}
			_tip = null
		}
		
		/**
		 * 更新tip位置 
		 * modified by daylyn
		 */		
		private function setPos():void
		{
			var stage:Stage = tip.stage;
			if(stage){
				tip.x = stage.mouseX+_offsetX<=(stage.stageWidth-tip.width) ? stage.mouseX+_offsetX : stage.mouseX-tip.width-_offsetX;
				tip.y = stage.mouseY+tip.height+_offsetY<=stage.stageHeight ? stage.mouseY+_offsetY : stage.stageHeight-tip.height-_offsetY;
			}
		}
		
		/**隐式类型转换*/
		private function get tip():DisplayObject{
			return _tip as DisplayObject
		}
		/**
		 * 获取ToolTip
		 * @param typeName Tip类型
		 */
		private function getToolTip(tipType:Class):IXToolTip{
			if(tipType == null) tipType = TipManager.defaultTipClass;
			if(!_tipsObj[tipType]){
				_tipsObj[tipType] = new tipType();
				IXToolTip(_tipsObj[tipType]).container = _defaultContainer;
			}
			return _tipsObj[tipType] 
		}
		
		private function startTip():void
		{
			if(_targetedComponent == null)
				return;
			var vo:TipVo = _tipObjects[_targetedComponent];
			if(vo == null)
				return;
			showTip(vo.info,vo.tipType);
			_targetedComponent.addEventListener(MouseEvent.MOUSE_MOVE, tipShowEvent);
		}
		
		/**TIP事件*/
		private function tipShowEvent(e:Event):void{
			var _obj:DisplayObject = InteractiveObject(e.currentTarget);
			if(e.type==MouseEvent.ROLL_OVER){
				var vo:TipVo = _tipObjects[_obj];
				_targetedComponent = _obj as InteractiveObject;
				if (!vo.wait)
					startTip();
				else
				{
					_timer.delay = getTimer() - _last_tip_dropped_time < FAST_OCCUR_TIME ? FAST_OCCUR_TIME : WAIT_TIME;
					if (!_timer.running)
						_timer.start();
				}
			}else if(e.type == MouseEvent.MOUSE_MOVE){
				if(tip && tip.stage){
					setPos();
				}else{
					_obj.removeEventListener(MouseEvent.MOUSE_MOVE, tipShowEvent);
				}
			}else{
				_obj.removeEventListener(MouseEvent.MOUSE_MOVE, tipShowEvent);
				hideTip();
				if(_tip)
					_last_tip_dropped_time = getTimer();
				if (_timer.running)
					_timer.stop();
				_targetedComponent = null;
			}
		}
		
		/**私有隐式单例*/
		private static function getInstance():TipManager{
			if(!_instance) _instance = new TipManager();
			return _instance;
		}
	}
}

class TipVo{
	public var info:Object;
	public var tipType:Class;
	public var wait:Boolean;
	public function TipVo(info:Object, tipType:Class, $wait:Boolean = true){
		this.info = info;
		this.tipType = tipType;
		this.wait = $wait;
	}
}