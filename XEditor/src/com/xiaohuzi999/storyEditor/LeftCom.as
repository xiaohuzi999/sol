package com.xiaohuzi999.storyEditor
{
	import com.greensock.easing.Strong;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.windows.CreateSceneWindow;
	import com.xiaohuzi999.xControls.frame.XIcon;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.frame.XSelecteGroup;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.manager.LayerManager;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import fl.containers.ScrollPane;
	
	import flash.display.Bitmap;
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	import flash.text.TextField;
	
	/**
	 * LeftCom
	 * author:xiaohuzi999
	 * LeftCom.as 2015-5-18 下午4:32:02
	 * version 1.0
	 */
	public class LeftCom extends Sprite
	{
		private var $ui:MovieClip;
		private var $itemSp:ScrollPane;
		//剧情
		private var $sceneSp:ScrollPane;
		//
		private var $createSceneBtn:InteractiveObject;
		//
		private var $chapNameTF:TextField;
		//
		private var $picTF:TextField;
		//
		private var _sceneContainer:Sprite;
		private var _group:XSelecteGroup;
		private var _container:Sprite;
		/**预览*/
		private var _preViewSp:Sprite;
		/***/
		private var _preBitm:Bitmap;
		/**选中的单元*/
		private var _selecteItem:XIcon;
		//创建剧情窗体
		private var _createSceneWindow:CreateSceneWindow;
		//剧情列表
		private var _storyGroup:XSelecteGroup;
		//
		private var _storyBtns:Array;
		
		
		/**标签*/
		private static const LABS:Array = ["背景","立绘","音乐","音效","表情"];
		/**文件夹*/
		/**数据定义-类型-0：图片，1：音乐*/
		private static const DATA_LIST:Array = [
			{type:"0", url:"graphics\\background"},
			{type:"1", url:"graphics\\player"},
			{type:"2", url:"audio\\bgm"},
			{type:"3", url:"audio\\bgs"},
			{type:"4", url:"graphics\\mood"}
		]
		private static const TYPE_NUM:int = 5;
		private static const ST_URL:String = "assets\\";
		
		public function LeftCom(ui:MovieClip)
		{
			$ui = ui;
			this.addChild($ui);
			init();
			initEvent();
			onChange();
		}
		
		private function onChange(event:Event = null):void{
			//删除上次的数据
			clear();
			var url:String = ST_URL+_group.selectedButton.data.url;
			var file:File = File.applicationDirectory.resolvePath(url);
			var arr:Array = file.getDirectoryListing();
			
			if(_group.selectedButton.data.type == 2 || _group.selectedButton.data.type == 3){
				var sItem:SoundItem
				for(i=0;i<arr.length; i++){
					sItem = new SoundItem();
					sItem.setData(arr[i]);
					sItem.doubleClickEnabled = true;
					sItem.addEventListener(MouseEvent.DOUBLE_CLICK, onSndClick);
					_container.addChild(sItem);
					sItem.x = 2
					sItem.y = i*30;
				}
			}else{
				var item:PicItem;
				for(var i:uint=0;i<arr.length; i++){
					if(arr[i].name == "Thumbs.db"){
						continue;
					}
					item = new PicItem();
					item.setData(arr[i]);
					_container.addChild(item);
					item.x = i%3 * 98;
					item.y = int(i/3) * 80;
					item.addEventListener(MouseEvent.ROLL_OVER, onME);
					item.addEventListener(MouseEvent.ROLL_OUT, onME);
					item.addEventListener(MouseEvent.MOUSE_DOWN, onME);
				}
			}
			$itemSp.update();
		}
		
		public function formatStory():void{
			clearBtns();
			var storyList:Array = DB.storyList;
			if(storyList.length == 0){
				onCreateStory(new XEvent(CreateSceneWindow.CREATE_SCENE, {storyName:"新剧情",condition:"",type:"0"}));
			}else{
				var btn:XSelectButton;
				for(var i:uint=0;i<storyList.length; i++){
					btn =  new XSelectButton(new SceneItemUI(), storyList[i].storyName+"\t\t"+storyList[i].type, storyList[i], false);
					_sceneContainer.addChild(btn);
					btn.y = _storyBtns.length*btn.height;
					btn.doubleClickEnabled = true;
					btn.addEventListener(MouseEvent.DOUBLE_CLICK, onBtnClick);
					_storyBtns.push(btn);
					createStoryMenu(btn);
				}
				_storyGroup.buttons = _storyBtns;
				_storyGroup.selectedButton = _storyBtns[0];
				$sceneSp.update();
			}
			$chapNameTF.text = DB.chapName+"";
			$picTF.text = DB.pic+""
		}
		
		private function onME(event:MouseEvent):void{
			switch(event.type){
				case MouseEvent.ROLL_OVER:
					if(event.currentTarget.pic){
						_preViewSp.visible = true;
						_preBitm.bitmapData = event.currentTarget.pic;
						_preBitm.smoothing = true;
						var scale:Number = 600/_preBitm.width
						if(scale * _preBitm.height > 400){
							scale  = 400/_preBitm.height;
						}
						scale = Math.min(scale, 1);
						_preViewSp.scaleX = _preViewSp.scaleY = scale;
					}
					break;
				case MouseEvent.ROLL_OUT:
					_preViewSp.visible = false;
					break;
				case MouseEvent.MOUSE_DOWN:
					if(_selecteItem){
						if(_selecteItem.parent){
							_selecteItem.parent.removeChild(_selecteItem);
						}
					}
					_selecteItem = new XIcon(true);
					_selecteItem.data = event.currentTarget;
					_selecteItem.icon = event.currentTarget.icon;
					_selecteItem.startDrag(true);
					this.stage.addChild(_selecteItem);
					break;
			}
		}
		
		private function onSndClick(event:MouseEvent):void{
			var item:SoundItem = event.currentTarget as SoundItem;
			item.playSound();
		}
		
		/***/
		private function onMU(event:MouseEvent):void{
			if(_selecteItem){
				//todo==========================生成背景数据什么鸟的
				if(_selecteItem.parent){
					_selecteItem.parent.removeChild(_selecteItem);
					dispatchEvent(new XEvent(XEvent.SELECTED, _selecteItem.data));
					_selecteItem = null;
				}
			}
		}
		
		/***/
		private function onBtnClick(event:MouseEvent=null):void{
			if(!_createSceneWindow){
				_createSceneWindow = new CreateSceneWindow();
				_createSceneWindow.addEventListener(CreateSceneWindow.CREATE_SCENE, onCreateStory);
			}
			switch(event.currentTarget){
				case $createSceneBtn:
					_createSceneWindow.show();
					break;
				default:
					if(_storyGroup.selectedButton){
						_createSceneWindow.showWithArg(_storyGroup.selectedButton.data);
					}
					break;
			}
		}
		
		/***/
		private function onFO(event:FocusEvent):void{
			DB.chapName = $chapNameTF.text;
			DB.pic = $picTF.text;
		}
		
		/**选中剧本*/
		private function onSelectStory(event:Event=null):void{
			this.dispatchEvent(new XEvent(XEvent.CHANGE, _storyGroup.selectedButton.data));
		}
		
		/**新建剧情*/
		private function onCreateStory(event:XEvent):void{
			var info:Object = event.data;
			var storyName:String = info.storyName;
			var storyInfo:Object
			if(_createSceneWindow && _createSceneWindow.oldName){//修改
				storyInfo = DB.getStoryByName(_createSceneWindow.oldName);
				if(storyInfo){
					storyInfo.storyName = storyName
					storyInfo.condition = info.condition;
					storyInfo.type = info.type;
					_storyGroup.selectedButton.data = storyInfo;
					_storyGroup.selectedButton.label = storyName+"\t\t"+storyInfo.type;
				}
			}else{
				storyInfo = DB.createStory(storyName, info.condition, info.type);
				var btns:Array = _storyGroup.buttons;
				if(btns == null){
					btns = new Array;
				}
				if(storyInfo){
					var btn:XSelectButton = new XSelectButton(new SceneItemUI(), storyName + "\t\t"+storyInfo.type, storyInfo, false);
					_sceneContainer.addChild(btn);
					btn.y = btns.length * btn.height;
					btns.push(btn);
					_storyGroup.buttons = btns;
					if(!_storyGroup.selectedButton){
						_storyGroup.selectedButton = _storyGroup.buttons[0];
					}
					$sceneSp.update();
					createStoryMenu(btn);
					btn.doubleClickEnabled = true;
					btn.addEventListener(MouseEvent.DOUBLE_CLICK, onBtnClick);
					_storyBtns.push(btn);
				}else{
					XTip.showTip("已经存在名为\""+storyName+"\"的剧情。");
				}
			}
			DB.save();
		}
		
		/***/
		private function onMenuSelect(event:Event):void{
			var label:String = event.currentTarget.label;
			if(label == "修改名字"){
				if(!_createSceneWindow){
					_createSceneWindow = new CreateSceneWindow();
					_createSceneWindow.addEventListener(CreateSceneWindow.CREATE_SCENE, onCreateStory);
				}
				_createSceneWindow.showWithArg(event.currentTarget.data.label);
			}else{
				DB.delStory(event.currentTarget.data.data.storyName);
				formatStory();
			}
		}
		
		//生成右键菜单
		private function createStoryMenu(sp:Object):void{
			if(!sp.contextMenu){
				var rootMenu:NativeMenu = new NativeMenu();
				var item:NativeMenuItem = new NativeMenuItem("修改名字");
				rootMenu.addItem(item);
				item.data = sp
				item.addEventListener(Event.SELECT, onMenuSelect)
					
				item = new NativeMenuItem("删除剧情(不可恢复)");
				rootMenu.addItem(item);
				item.data = sp
					
				sp.contextMenu = rootMenu;
				item.addEventListener(Event.SELECT, onMenuSelect);
			}
		}
		
		private function clear():void{
			while(_container.numChildren){
				var item:InteractiveObject = _container.removeChildAt(0) as InteractiveObject;
				item.removeEventListener(MouseEvent.ROLL_OVER, onME);
				item.removeEventListener(MouseEvent.ROLL_OUT, onME);
				item.removeEventListener(MouseEvent.MOUSE_DOWN, onME);
				item.removeEventListener(MouseEvent.DOUBLE_CLICK, onSndClick);
			}
		}
		
		private function clearBtns():void{
			if(_storyBtns){
				for(var i:uint=0;i<_storyBtns.length; i++){
					if(_storyBtns[i] && _storyBtns[i].parent){
						_storyBtns[i].parent.removeChild(_storyBtns[i]);
						_storyBtns[i].removeEventListener(MouseEvent.DOUBLE_CLICK, onBtnClick);
					}
				}
			}
			_storyBtns = new Array();
			_storyGroup.buttons = null;
			_storyGroup.selectedButton = null;
		}
		
		private function init():void{
			_group = new XSelecteGroup();
			var btns:Array = new Array();
			for(var i:uint=0; i<TYPE_NUM; i++){
				btns.push(new XSelectButton($ui["btn_"+i],LABS[i],DATA_LIST[i]));
			}
			_group.buttons = btns;
			_group.selectedButton = btns[0];
			
			_container = new Sprite();
			this.addChild(_container);
			_container.mouseEnabled = false;
			_container.x = 3;
			_container.y = 28;
			
			_preViewSp = new Sprite();
			this.addChild(_preViewSp);
			_preViewSp.x = 308;
			_preViewSp.y = 50;
			_preViewSp.mouseEnabled = _preViewSp.mouseChildren = false;
			_preBitm = new Bitmap();
			_preViewSp.addChild(_preBitm);
			
			$chapNameTF = $ui.chapNameTF;
			$chapNameTF.text = DB.chapName;
			$picTF = $ui.picTF;
			$picTF.text = DB.pic+""
			
			$itemSp = $ui.itemSp;
			$itemSp.setSize(304, 450);
			$itemSp.source = _container;
			
			$sceneSp = $ui.sceneSp;
			$sceneSp.setSize(298,164);
			_sceneContainer = new Sprite();
			this.addChild(_sceneContainer);
			_sceneContainer.x = $sceneSp.x;
			_sceneContainer.y = $sceneSp.y;
			$sceneSp.source = _sceneContainer;
			
			$createSceneBtn = $ui.createSceneBtn;
			
			_storyGroup = new XSelecteGroup();
		}
		
		private function initEvent():void{
			_group.addEventListener(XEvent.CHANGE, onChange);
			LayerManager.stage.addEventListener(MouseEvent.MOUSE_UP, onMU);
			$createSceneBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$chapNameTF.addEventListener(FocusEvent.FOCUS_OUT, onFO);
			$picTF.addEventListener(FocusEvent.FOCUS_OUT, onFO);
			
			_storyGroup.addEventListener(XEvent.CHANGE, onSelectStory);
		}
	}
}