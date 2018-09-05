package com.xiaohuzi999.xControls.frame.manager
{
	import com.xiaohuzi999.xControls.util.TimerCommand;
	import com.xiaohuzi999.xControls.frame.XText;
	
	import flash.events.TimerEvent;
	import flash.text.TextField;
	import flash.utils.Dictionary;
	import flash.utils.Timer;
	
	public class TextManager
	{
		private static var _txtHMap:Dictionary = new Dictionary(true);
		private static var _txtVMap:Dictionary = new Dictionary();
		private static var _timer:Timer;
		public function TextManager()
		{
		}
		
		/**
		 * 注册一个txt文本左右移动，文字必须已经设置好
		 * @param txt。需要注册的TextField
		 */
		public static function register(txt:TextField):void{
			removeTxt(txt);
			if(!_txtHMap[txt]){
				if(txt.scrollH < txt.maxScrollH){
					_txtHMap[txt] = new HTxtVo(txt);
					if(!timer.running){
						timer.start();
					}
				}
			}
		}
		
		/**
		 * 移除文字移动文本
		 * @param txt 移除移动的TextField
		 */
		public static function removeTxt(txt:TextField):void{
			txt.scrollH = 0;
			delete _txtHMap[txt];
		}
		
		/**注册文本向上滚动*/
		public static function registerUpMoveTxt(txt:TextField, height:Number=0):void{
			removeUpMoveTxt(txt)
			if(!_txtVMap[txt]){
				_txtVMap[txt] = new XText(txt, height)
				//_txtVMap[txt] = new VTxtVo(txt);
				//TimerCommand.registerTimeCommand((_txtVMap[txt] as VTxtVo).execute,null,2,0);
			}
		}
		
		/**
		 * 移除向上移动文本，暂时不能移除
		 * */
		public static function removeUpMoveTxt(txt:TextField):void{
			if(_txtVMap[txt]){
				XText(_txtVMap[txt]).dispose();
				delete  _txtVMap[txt];
			}
		}
		
		private static function onTimer(event:TimerEvent):void{
			var tv:HTxtVo;
			for(var i:Object in _txtHMap){
				tv = _txtHMap[i];
				tv.execute();
			}
		}
		
		private static function get timer():Timer{
			if(!_timer){
				_timer = new Timer(100);
				_timer.addEventListener(TimerEvent.TIMER, onTimer);
			}
			return _timer;
		}
	}
}

//横向移动
import com.greensock.TweenLite;

import flash.text.TextField;

class HTxtVo{
	private var txt:TextField;
	private var dir:int = -1;
	private var delay:Number = 0;
	private var waitTimer:int = 15
	public function HTxtVo(txt:TextField){
		this.txt = txt;
	}
	//
	public function execute():void{
		if(txt.scrollH >= txt.maxScrollH){
			if(delay>0){
				delay --;
			}else{
				if(dir > 0){
					dir*= -1;
					delay = waitTimer;
				} 
				txt.scrollH += dir;
			}
		}else if(txt.scrollH <= 0){
			if(delay>0){
				delay --;
			}else{
				if(dir < 0){
					dir*= -1;
					delay = waitTimer;
				} 
				txt.scrollH += dir;
			}
		}else{
			txt.scrollH += dir;
		}
	}
}


//纵向移动
class VTxtVo{
	private var _txt:TextField;
	private const waitTime:int = 2
	private var nowCount:int;
	private var endCount:int;
	
	public function VTxtVo(txt:TextField){
		_txt = txt;
		nowCount = endCount = 0;
	}
	public function execute():void{
		if(nowCount<waitTime){//开始停
			nowCount ++;
			endCount = 0;
		}else{
			if(_txt.scrollV < _txt.maxScrollV){
				_txt.scrollV ++;
			}else{
				if(endCount < waitTime){
					endCount++
				}else{
					nowCount = 0;
					_txt.scrollV = 1;
				}
			}
		}
	}
}
