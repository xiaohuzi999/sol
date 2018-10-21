package com.xiaohuzi999.storyEditor
{
	import com.greensock.TweenLite;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.frame.XSelecteGroup;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import fl.containers.ScrollPane;
	
	import flash.display.MovieClip;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	/**
	 * RightCom
	 * author:xiaohuzi999
	 * RightCom.as 2015-5-19 下午1:47:31
	 * version 1.0
	 */
	public class RightCom extends Sprite
	{
		private var $ui:MovieClip;
		private var _container:Sprite;
		private var _group:XSelecteGroup;
		private var _menu:NativeMenu;
		//
		private var _menuItems:Array = new Array();
		private var _btns:Array;
		private var _sp:ScrollPane;
		//
		private var _menuItem:RightItem;
		/**事件新增对话*/
		public static const ADD_DIALOG:String = "add_dialog";
		/**时间-删除对话*/
		public static const DEL_DIALOG:String = "del_dialog";
		public function RightCom(ui:MovieClip)
		{
			$ui = ui;
			init();
		}
		
		/**初始化记录*/
		public function showRecord(recordList:Array, showOldPos:Boolean=false):void{
			clear()
			recordList || (recordList = new Array);
			var item:RightItem;
			var btnIndex:int = 0;
			var oldRecordId:int = -1;
			if(showOldPos && _group.selectedButton){
				oldRecordId = _group.selectedButton.data.id;
			}
			
			for(var i:uint=0; i<recordList.length; i++){
				item = new RightItem(recordList[i]);
				_container.addChild(item);
				item.y = i*item.height;
				item.addEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
				_btns.push(item);
				item.contextMenu = _menu;
				if(recordList[i].id == oldRecordId){
					btnIndex = i;
				}
				//item.showIcon();
				TweenLite.to(item, i*0.1, {onComplete:item.showIcon});
			}
			_group.buttons = _btns;		
			_group.selectedButton = _group.buttons[btnIndex];
			_sp.update();
		}
		
		/**菜单操作*/
		private function onMenuSelect(event:Event):void{
			var label:String = event.currentTarget.label;
			var vo:Object;
			switch(label){
				case "新建":
					if(_menuItem.data.parentId){//分歧剧情
						vo = {parentId:_menuItem.data.parentId,parentName:_menuItem.data.parentName}
					}
					this.dispatchEvent(new XEvent(ADD_DIALOG, {preId:_menuItem.data.id,vo:vo, type:"0"}));
					break
				case "复制":
					if(_menuItem.data.label_1){
						XTip.showTip("分支剧情不能复制");
					}else{
						this.dispatchEvent(new XEvent(ADD_DIALOG, {preId:_menuItem.data.id, vo:_menuItem.data, type:"0"}));
					}
					break;
				case "删除":
					if(_group.buttons.length > 1){
						this.dispatchEvent(new XEvent(DEL_DIALOG, _menuItem.data.id));
					}
					break;
				default://创建分支剧情
					var arr:Array = String(event.currentTarget.data).split("|");
					this.dispatchEvent(new XEvent(ADD_DIALOG, {preId:_menuItem.data.id, vo:{parentId:_menuItem.data.id,parentName:arr[0]},type:arr[1]}));
					break;
			}
		}
		
		/***/
		private function onSelectItem(event:Event):void{
			//
			_menu.removeAllItems();
			var labels:Array = ["新建", "复制", "删除"];
			var datas:Array = [null,null,null]
			_menuItem = event.currentTarget as RightItem;
			var vo:RecordVo = _menuItem.data as RecordVo;
			
			//分歧剧情=============
			if(vo.label_1){
				labels = ["删除"];
				datas = [null]
			}		
			if(vo.label_1){
				labels.push("创建"+vo.label_0+"对话");
				datas.push(vo.label_0+"|0");
			}
			if(vo.label_1){
				labels.push("创建"+vo.label_1+"对话");
				datas.push(vo.label_1+"|1");
			}
			if(vo.label_2){
				labels.push("创建"+vo.label_2+"对话");
				datas.push(vo.label_2+"|2");
			}
			if(vo.label_3){
				labels.push("创建"+vo.label_3+"对话");
				datas.push(vo.label_3+"|3");
			}
			for(var i:uint=0; i<labels.length; i++){
				_menu.addItem(_menuItems[i]);
				_menuItems[i].label = labels[i];
				_menuItems[i].data = datas[i]
			}
		}
		
		/**保存信息*/
		public function save(info:Object):void{
			if(_group.selectedButton){
				_group.selectedButton.data.setValue(info);
				RightItem(_group.selectedButton).update();
				RightItem(_group.selectedButton).showIcon();
			}
		}
		
		private function onChange(event:Event):void{
			//===========================================
			this.dispatchEvent(event);
		}
		
		private function clear():void{
			if(_btns){
				for(var i:uint=0; i<_btns.length; i++){
					if(_btns[i]){
						_btns[i].removeEventListener(MouseEvent.RIGHT_MOUSE_DOWN, onSelectItem);
						if(_btns[i].parent){
							_btns[i].parent.removeChild(_btns[i]);
						}
						_btns[i].contextMenu = null;
					}
				}
			}
			_btns = new Array();
		}
		
		private function init():void{
			this.addChild($ui);
			$ui.x = 0;
			_container = new Sprite();
			this.addChild(_container);
			_container.graphics.beginFill(0xff0000);
			_container.graphics.drawRect(0,0,20,20);
			_container.graphics.endFill();
			
			_group = new XSelecteGroup();
			_group.addEventListener(XEvent.CHANGE, onChange);
			
			_menu = new NativeMenu();
			for(var i:uint=0; i<10; i++){
				var item:NativeMenuItem = new NativeMenuItem("新建");
				item.addEventListener(Event.SELECT, onMenuSelect);
				_menuItems.push(item);
			}
			
			_sp = $ui.sp;
			_sp.setSize(432,720);
			_sp.source = _container;
		}
		
		/**获取当前选中的按钮*/
		public function get currentItem():XSelectButton{
			return _group.selectedButton;
		}
		
		/**获取选中前一个单元*/
		public function get prevItem():XSelectButton{
			var index:int = _group.buttons.indexOf(_group.selectedButton);
			return _group.buttons[index-1];
		}
	}
}