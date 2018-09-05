package com.xiaohuzi999.xControls.util
{	
	
	import flash.events.TimerEvent;
	import flash.utils.Dictionary;
	import flash.utils.Timer;
	
	
	/**
	 * 定时类
	 * @author xiaohuzi999@163.com
	 * 
	 * @version 2.1
	 * 1，计时器分开，避免同一时刻执行过多代码
	 * 2，将计时的线程分开
	 * 
	 * 不足：回收问题，最坏结果：存在几个时间线程，而每个线程只有一个定时函数。可以通过先注册永久函数,后注册有限次数的函数。
	 */
	public class TimerCommand
	{
		/**计时器延时--秒*/
		private static var _delay:Number = 500;
		/**函数字典*/
		private static var _funMap:Dictionary = new Dictionary();
		/**timer字典*/
		private static var _timerMap:Dictionary = new Dictionary();
		/**常量-每个timer的最大函数承受量*/
		private static const MAX_THREAD:int = 3;
		public function TimerCommand()
		{
		}
		
		/**
		 * 注册一个按时执行函数，注意：时间间隔是“秒”。
		 * @param timerFun 注册的定时函数，一个函数只能注册一次。
		 * @param timerArgs 函数的回调参数;
		 * @param delay 函数的执行间隔,单位秒
		 * @param repeatTimes 函数重复执行次数，0为无限；
		 */
		public static function registerTimeCommand(timerFun:Function, timerArgs:Array, delay:uint=0, repeatTimes:int=0):void{
			if(!_funMap[timerFun]){
				var vo:FunVo = new FunVo(timerFun,timerArgs,int(delay*1000/_delay),repeatTimes)
				_funMap[timerFun] = vo;
				var timer:Timer = getTimer();
				_timerMap[timer].push(vo);
				if(!timer.running){
					timer.start();
				}
			}
		}
		
		/**
		 * 移除一个定时函数
		 * @param timerFun 移除的定时函数
		 */
		public static function removeTimeCommand(timerFun:Function):void{
			delete _funMap[timerFun];
			var funMap:Array
			for(var i:Object in _timerMap){
				funMap = _timerMap[i];
				if(funMap){
					for(var j:String in funMap){
						if(funMap[j].fun == timerFun){
							funMap.splice(int(j),1);
							//空线程回收
							if(XUtil.isEmpty(funMap)){
								Timer(i).stop();
								Timer(i).removeEventListener(TimerEvent.TIMER, onTimer);
								delete _timerMap[i];
							}
							break;
						}
					}
				}
			}
			
		}
		
		/**
		 * timer事件
		 * 执行完所有命令以后自动停止计时
		 * */
		private static function onTimer(event:TimerEvent):void{
			var fv:FunVo;
			var funMap:Array = _timerMap[event.currentTarget];
			for(var i:Object in funMap){
				fv = funMap[i];
				if(fv.execute()){
					removeTimeCommand(fv.fun);
				}
			}
		}
		
		/**隐式获取timer*/
		private static function getTimer():Timer{
			var timer:Timer
			for(var i:* in _timerMap){
				if(_timerMap[i] && _timerMap[i].length< MAX_THREAD){
					timer = i;
					break;
				}
			}
			if(!timer){
				timer = new Timer(_delay);
				_timerMap[timer] = new Array(); 
				timer.addEventListener(TimerEvent.TIMER, onTimer);
			}
			return timer;
		}
		
		/**
		 * 判断是否注册过（临时时间函数不能判断）
		 * */
		public static function hasCommand(timerFun:Function):Boolean{
			return _funMap[timerFun];
		}
		
		/**获取延时-只读*/
		public static function get delay():Number{
			return _delay;
		}
	}
}


internal class FunVo{
	public var fun:Function;
	public var args:Array;
	public var delay:Number;
	public var repeatTimes:Number
	private var _currentCount:Number;
	public function FunVo(fun:Function, args:Array, delay:Number, repeatTimes:Number){
		this.fun = fun;
		this.args = args;
		this.delay = delay;
		this._currentCount = delay;
		this.repeatTimes = repeatTimes;
	}
	
	/**
	 * 执行函数
	 * @return true（运行完毕）
	 * */
	public function execute():Boolean{
		_currentCount --;
		if(_currentCount <= 0){
			fun.apply(null,args);
			repeatTimes --;
			if(repeatTimes == 0){
				return true;
			}
			_currentCount = delay;
		}
		return false;
	}
}