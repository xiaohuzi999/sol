package com.xiaohuzi999.storyEditor
{
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.storyEditor.vo.StoryVo;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.ArrayUtils;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.system.System;

	/**
	 * MainView
	 * author:xiaohuzi999
	 * MainView.as 2015-5-18 下午4:28:19
	 * version 1.0
	 */
	public class MainView extends XWindow
	{
		private var $ui:MovieClip;
		//左边面板
		private var _leftPane:LeftCom;
		//
		private var _midPanel:MidCom;
		//
		private var _rightPanel:RightCom;
		//当前剧情信息
		private var _currentSotryInfo:Object;
		public function MainView()
		{
			init();
		}
		
		//Drag in Pic, mood
		private function onSelected(event:XEvent):void{
			var item:Object = event.data;
			if($ui.midleMC.hitTestPoint(stage.mouseX, stage.mouseY)){
				_midPanel.addItem(item);
			}
		}
		
		/***/
		private function onChangeStory(event:XEvent = null):void{
			_currentSotryInfo = event.data;
			_currentSotryInfo = DB.getStoryByName(_currentSotryInfo.storyName);
			_rightPanel.showRecord(DB.getDialogList(_currentSotryInfo.storyName));
		}
		
		//
		private function onChange(event:Event):void{
			//记录数据
			_rightPanel.save(_midPanel.info);
			DB.modifyDialog(_currentSotryInfo.storyName,_rightPanel.currentItem.data as RecordVo);
			//
		}
		
		private function onDBChange(event:Event):void{
			_leftPane.formatStory();
		}
		
		/**具象化中间*/
		private function formatView(event:Event):void{
			var info:Object = _rightPanel.currentItem.data;
			_midPanel.format(info as RecordVo);
		}
		
		//
		private function onAlign(event:XEvent):void{
			var isLeft:Boolean = Boolean(event.data)
			var curVo:RecordVo = _rightPanel.currentItem.data as RecordVo;
			var prevVo:RecordVo = (_rightPanel.prevItem?_rightPanel.prevItem.data as RecordVo : null);
			if(prevVo){
				if(isLeft){
					if(curVo.leftPlayer && prevVo.leftPlayer && (curVo.leftPlayer.name == prevVo.leftPlayer.name)){
						curVo.leftPlayer.x = prevVo.leftPlayer.x;
						curVo.leftPlayer.y = prevVo.leftPlayer.y
						formatView(null);
					}
				}else{
					if(curVo.rightPlayer && prevVo.rightPlayer && (curVo.rightPlayer.name == prevVo.rightPlayer.name)){
						curVo.rightPlayer.x = prevVo.rightPlayer.x;
						curVo.rightPlayer.y = prevVo.rightPlayer.y
						formatView(null);
					}
				}
			}
		}
		
		/**一键背景*/
		private function onSetBg(event:XEvent):void{
			var bg:String = event.data + "";
			DB.setBgOnce(_currentSotryInfo.storyName, bg);
		}
		
		/**继承立绘*/
		private function onSetPlayer(event:XEvent):void{
			DB.setPlayer(_currentSotryInfo.storyName, event.data);
			var info:Object = _rightPanel.currentItem.data;
			_midPanel.format(info as RecordVo);
		}
		
		/**新增对话*/
		public function onAddDialog(event:XEvent):void{
			var data:Object = event.data;
			var preId:String = data.preId;
			var vo:Object = data.vo;
			var type:String = data.type;
			DB.addDialog(_currentSotryInfo.storyName, preId, vo, type);
			_currentSotryInfo = DB.getStoryByName(_currentSotryInfo.storyName);
			_rightPanel.showRecord(DB.getDialogList(_currentSotryInfo.storyName), true);
		}
		
		/**删除对话*/
		public function onDelDialog(event:XEvent):void{
			var id:String = event.data +"";
			DB.delDialog(_currentSotryInfo.storyName, id);
			_currentSotryInfo = DB.getStoryByName(_currentSotryInfo.storyName);
			_rightPanel.showRecord(DB.getDialogList(_currentSotryInfo.storyName), true);
		}
		
		/**获取当前剧情*/
		public function get currentStory():StoryVo{
			trace(JSON.stringify(DB.getStoryByName(_currentSotryInfo.storyName)));
			return DB.getStoryByName(_currentSotryInfo.storyName) as StoryVo;
		}
		
		//==================================
		override public function show(autoAlignCenter:Boolean=false):void{
			super.show();
			try{
				_leftPane.formatStory();
			}catch(e:Error){
				
			}
		}
		
		private function init():void{
			$ui = new EditorUI();
			this.addChild($ui);
			
			_midPanel = new MidCom($ui.midleMC);
			_midPanel.x = 320;
			this.addChild(_midPanel);
			
			_leftPane = new LeftCom($ui.leftMC);
			this.addChild(_leftPane);
			_leftPane.x = 8;
			
			_rightPanel = new RightCom($ui.rightMC);
			this.addChild(_rightPanel);
			_rightPanel.x = 964;
		}
		
		override protected function initEvent():void{
			_leftPane.addEventListener(XEvent.SELECTED, onSelected);
			_leftPane.addEventListener(XEvent.CHANGE, onChangeStory);
			_midPanel.addEventListener(XEvent.CHANGE, onChange);
			_midPanel.addEventListener(MidCom.ALIGN, onAlign);
			_midPanel.addEventListener(MidCom.SETBG, onSetBg);
			_midPanel.addEventListener(MidCom.SETPLAYER, onSetPlayer);
			_rightPanel.addEventListener(XEvent.CHANGE, formatView);
			_rightPanel.addEventListener(RightCom.ADD_DIALOG, onAddDialog);
			_rightPanel.addEventListener(RightCom.DEL_DIALOG, onDelDialog);
			
			MainDispatcher.getInstance().addEventListener(XEvent.CHANGE, onDBChange);
		}
	}
}