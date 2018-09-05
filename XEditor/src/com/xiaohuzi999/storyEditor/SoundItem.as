package com.xiaohuzi999.storyEditor
{
	import com.xiaohuzi999.xControls.frame.manager.SoundManager;
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.net.URLRequest;
	import flash.text.TextField;
	
	/**
	 * SoundItem
	 * author:xiaohuzi999
	 * SoundItem.as 2015-5-28 上午11:08:37
	 * version 1.0
	 */
	internal class SoundItem extends Sprite
	{
		private var $ui:MovieClip;
		private var _file:File;
		private var _labelTF:TextField;
		private var _sound:Sound;
		private var _curSC:SoundChannel;
		private static var _sc:SoundChannel;
		public function SoundItem()
		{
			init();
		}
		
		//加载
		public function setData(data:File):void{
			_file = data;
			_labelTF.text = data.name;
			_sound = new Sound(new URLRequest(data.url));
		}
		
		//修改状态
		public function playSound():void{
			if($ui.currentFrame == 1){
				$ui.gotoAndStop(2);
				_curSC = _sound.play(0,1);
				_curSC.addEventListener(Event.SOUND_COMPLETE, onSoundComplete);
				if(_file.nativePath.indexOf("bgm") != -1){
					if(_sc){
						_sc.stop();
					}
					_sc = _curSC
				}
			}else{
				$ui.gotoAndStop(1);
				_curSC.stop();
				if(_file.nativePath.indexOf("bgm") != -1){
					if(_sc){
						_sc.stop();
						_sc = null;
					}
				}
			}
		}
		
		//
		private function onSoundComplete(event:Event):void{
			event.currentTarget.removeEventListener(Event.SOUND_COMPLETE, onSoundComplete);
			$ui.gotoAndStop(1);
		}
		
		private function init():void{
			$ui = new SoundItemUI();
			this.addChild($ui);
			$ui.gotoAndStop(1);
			this.buttonMode = true;
			this.mouseChildren = false;
			
			_labelTF = $ui.labelTxt;
		}
	}
}