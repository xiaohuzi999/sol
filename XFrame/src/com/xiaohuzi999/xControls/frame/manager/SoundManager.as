package com.xiaohuzi999.xControls.frame.manager
{
	import flash.events.Event;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	
	/**
	 * 声音控制类,问题较多，需要重新整理
	 * @author xiaohuzi999@163.com
	 */
	
	public class SoundManager extends Object
	{
		private static var channelObj:Object = new Object();
		/**声音池*/
		private static var soundObj:Object = new Object();
		private static var playingObj:Object = new Object();
		private static var lockObj:Object = new Object();
		
		/**是否静音*/
		public static var musicOn:Boolean = true;
		public function SoundManager()
		{
		}
		
		/**停止所有声音*/
		public static function stopAll():void
		{
			for (var i:String in channelObj)
			{
				channelObj[i].stop()
				playingObj[i] = false
			}
			
		}
		/**
		 * 播放
		 * public function play(id:String,v:Number=1,startTime:Number=0,loop:Number=0,lock:Boolean=true):void
		 *播放库中的一个ID (已注册过的) 
		 *@param id 已注册过的库中的声音类名
		 *@param v 音量
		 *@param startTime 起始时间
		 *@param loop 循环次数.0为不循环
		 *@param lock 锁定:为true时,该id声音直到上次播放结束才可以继续播放 
		 */
		public static function play(id:String, v:Number=1, startTime:Number=0, loop:Number=0, lock:Boolean=true):void
		{
			if(!musicOn){
				return;
			}
			if (!playingObj[id] || !lockObj[id])
			{
				playingObj[id] = true;
				lockObj[id]=lock
				channelObj[id] = soundObj[id].play(startTime, loop);
				channelObj[id].addEventListener(Event.SOUND_COMPLETE,onSoundComplete)
			}
			setVolume(id,v)
		}
		
		/***/
		private static function onSoundComplete(e:Event):void
		{
			var channel:SoundChannel=e.target as SoundChannel;
			channel.removeEventListener(Event.SOUND_COMPLETE,onSoundComplete)
			for (var i:String in channelObj)
			{
				if (channel == channelObj[i])
				{
					playingObj[i] = false;
					lockObj[i] = false;
					return
				}
			}
		}
		
		/**
		 * 暂停
		 * @param id
		 * @param isPause true/false 暂停/继续
		 * */
		public static function pause(id:String,isPause:Boolean):void
		{
			if(isPause){
				channelObj[id].stop()
				playingObj[id] = false
			}else{
				channelObj[id] = soundObj[id].play(channelObj[id].position),
				playingObj[id] = true
			}
		}
		
		/**
		 * 停止
		 * @param id
		 */
		public static function stop(id:String):void
		{
			channelObj[id].stop();
			playingObj[id]=false
		}
		
		/**
		 * 设置音量
		 * @param id 
		 * @param v 音量数值,0-1
		 */ 
		private static function setVolume(id:String, v:Number):void
		{
			v > 1 && (v = 1);
			v < 0 && (v = 0);
			var st:SoundTransform = channelObj[id].soundTransform;
			st.volume = v;
			channelObj[id].soundTransform = st;
		}
		
		/**注册
		 * @param id 用于操作的key
		 * @param soundClass 声音类或类名；
		 */ 
		public static function register(id:String, soundClass:*):void
		{
			if(soundClass is String){
				soundClass = LibManager.getInstance().getClass(soundClass);
			}
			if(soundClass){
				soundObj[id] = new soundClass();
			}else{
				throw new Error("没有找到声音类：", soundClass);
			}
		}
	}
	
}