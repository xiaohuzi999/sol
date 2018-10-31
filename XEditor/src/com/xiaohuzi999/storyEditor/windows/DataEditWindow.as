package com.xiaohuzi999.storyEditor.windows
{
	import com.xiaohuzi999.storyEditor.model.DBItem;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XModeWindow;
	import com.xiaohuzi999.xControls.frame.XTip;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.xEvent.MainDispatcher;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	
	import fl.controls.ComboBox;
	import fl.data.DataProvider;
	
	/**
	 * DataEditWindow
	 * author:xiaohuzi999
	 * DataEditWindow.as 2015-5-27 上午10:11:28
	 * version 1.0
	 */
	public class DataEditWindow extends XModeWindow
	{
		private var $ui:DataEditWindowUI;
		private var $goldTF:TextField;
		private var $diamondTF:TextField;
		private var $itemTF:TextField;
		private var $proTF:TextField;
		
		private var $itemCB:ComboBox;
		private var $proCB:ComboBox;
		private var _items:Array
		private var _pros:Array;
		//关闭
		private var $closeBtn:InteractiveObject;
		private var $confirmBtn:InteractiveObject;
		private var $resetBtn:InteractiveObject;
		
		private var _data:RecordVo;
		public function DataEditWindow()
		{
			init();
		}
		
		//
		public function showWithArgs(data:RecordVo):void{
			_data = data;
			show();
			reset();
			var obj:Object = (_data.data || {});
			var info:Object;
			if(obj.gold){
				$goldTF.text = obj.gold
			}
			if(obj.diamond){
				$diamondTF.text = obj.diamond;
			}
			if(obj.item){
				info = obj.item;
				for(var i:String in info){
					//判定
					for(var j:int=0; j<_items.length; j++){
						var id:int = _items[j].data;
						if(id == int(i)){
							$itemCB.selectedIndex = j;
							break;
						}
					}
					$itemTF.text= info[i];
				}
			}
			
			if(obj.pro){
				info = obj.pro;
				for(i in info){
					//判定
					for(j=0; j<_pros.length; j++){
						var key:String = _pros[j].data;
						if(key == i){
							$proCB.selectedIndex = j;
							break;
						}
					}
					$proTF.text= info[i];
				}
			}
		}
		
		//
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case $closeBtn:
					this.close();
					break;
				case $confirmBtn:
					var obj:Object = new Object();
					if($goldTF.text){
						obj.gold = $goldTF.text;
					}
					
					if($diamondTF.text){
						obj.diamond = $diamondTF.text;
					}
					
					//道具
					var num:int = int($itemTF.text);
					if($itemCB.selectedItem.data && num){
						obj.item = {}
						obj.item[$itemCB.selectedItem.data] = num;
					}
					
					//属性
					num = int($proTF.text);
					if($proCB.selectedItem.data && num){
						obj.pro = {}
						obj.pro[$proCB.selectedItem.data] = num;
					}
					
					if(!XUtil.isEmpty(obj)){
						_data.data = obj
					}else{
						_data.data = null;
					}
					MainDispatcher.getInstance().dispatchEvent(new XEvent("save"))
					this.close();
					break;
				case $resetBtn:
					reset();
					break;
			}
		}
		
		private function reset():void{
			$goldTF.text = $diamondTF.text = $itemTF.text = $proTF.text = "";
			$itemCB.selectedIndex = -1;
			$proCB.selectedIndex = -1;
		}
		
		override public function show(autoAlignCenter:Boolean=true):void{
			super.show(autoAlignCenter);
			XWindow.addPopWindow(this);
			
			var arr:Array  = [{label:"无"}];
			for(var i:String in DBItem.items){
				arr.push({label:DBItem.items[i].name, data:DBItem.items[i].id})
			}
			_items = arr;
			$itemCB.dataProvider = new DataProvider(arr);
		}
		
		override public function close():void{
			super.close();
			XWindow.removePopWindow(this);
		}
		
		private function init():void{
			$ui = new DataEditWindowUI();
			this.addChild($ui);
			$goldTF = $ui.goldTF;
			$diamondTF = $ui.diamondTF;
			$itemTF = $ui.itemTF;
			$proTF = $ui.proTF;
			$proCB = $ui.proCB;
			$itemCB = $ui.itemCB;
			$goldTF.restrict = $diamondTF.restrict = "0-9";
			reset();
			
			var arr:Array  = [
				{label:"无", data:null},
				{label:"physique", data:"physique"},
				{label:"agility", data:"agility"},
				{label:"strength", data:"strength"},
				{label:"speed", data:"speed"}
			]
			_pros = arr;
				
			$proCB.dataProvider = new DataProvider(arr);
			
			$closeBtn = $ui.closeBtn;
			$confirmBtn = $ui.confirmBtn;
			$resetBtn = $ui.resetBtn;
			$ui.bgMC.scale9Grid  = new Rectangle(100,100,100,100);
		}
		
		override protected function initEvent():void{
			$closeBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.addEventListener(MouseEvent.CLICK, onBtnClick);
		}
		
		override protected function removeEvent():void{
			$closeBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$confirmBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
			$resetBtn.removeEventListener(MouseEvent.CLICK, onBtnClick);
		}
	}
}