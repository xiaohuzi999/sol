package com.xiaohuzi999.storyEditor
{
	import com.xiaohuzi999.storyEditor.model.Consts;
	import com.xiaohuzi999.storyEditor.vo.RecordVo;
	import com.xiaohuzi999.xControls.frame.XSelectButton;
	import com.xiaohuzi999.xControls.util.XUtil;
	import com.xiaohuzi999.xControls.util.load.DisplayLoader;
	
	import flash.display.Bitmap;
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.geom.Rectangle;
	import flash.text.TextField;

	/**
	 * RightItem
	 * author:xiaohuzi999
	 * RightItem.as 2015-5-19 下午1:54:04
	 * version 1.0
	 */
	internal class RightItem extends XSelectButton
	{
		private var $nameTF:TextField;
		private var $diaTF:TextField;
		private var $rewardTF:TextField;
		private var $funTF:TextField;
		private var _icon:MovieClip;
		//
		public function RightItem(data:RecordVo = null)
		{
			data || (data = new RecordVo());
			super(new RecordItemUI(), "", data, false);
			$nameTF = $ui.nameTF;
			$diaTF = $ui.diaTF;
			$rewardTF = $ui.rewardTF;
			$funTF = $ui.funTF;
			$nameTF.text = $diaTF.text = $rewardTF.text = $ui.typeTF.text = $funTF.text = "";
			update();
		}
		
		/***/
		public function update():void{
			this.$ui.bg.gotoAndStop(1);
			if(vo.name){
				$nameTF.htmlText = vo.name +"";
			}else{
				$nameTF.text = "";
			}
			if(vo.dialog){
				$diaTF.htmlText = vo.dialog+"";
			}else{
				$diaTF.text = "";
			}
			$rewardTF.text = "";
			if(vo.dataInfo){
				var obj:Object = vo.dataInfo;
				for(var i:String in obj){
					$rewardTF.appendText(i+":"+obj[i]+" ");
				}
			}
			if(vo.label_1){
				$ui.typeTF.text = "多线剧情开始";
				this.$ui.bg.gotoAndStop(2);
			}else{
				if(vo.parentId){
					$ui.typeTF.text = "剧情_"+vo.parentName;
					this.$ui.bg.gotoAndStop(3);
				}else{
					$ui.typeTF.text = ""
				}
			}
			$funTF.text = "";
			if(vo.eventInfo){
				for(i in vo.eventInfo){
					$funTF.appendText(getKeyStr(i)+":"+vo.eventInfo[i]+" ");
				}
			}
		}
		
		/**生成缩略图，高消耗*/
		public function showIcon():void{
			if(!_icon){
				_icon = new MovieClip();
				_icon.scrollRect = new Rectangle(0,0,640, 960);
				$ui.addChild(_icon);
				_icon.scaleX = _icon.scaleY = 0.13;
				_icon.x = _icon.y = 2;
			}
			if(_icon.bg == data.bg && _icon.leftPlayer == data.leftPlayer && _icon.rightPlayer == data.rightPlayer){
				return;
			}
			_icon.bg = data.bg;
			_icon.leftPlayer = data.leftPlayer;
			_icon.rightPlayer = data.rightPlayer;
			while(_icon.numChildren){
				_icon.removeChildAt(0);
			}
			//背景
			if(data.bg){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, data.bg)+".jpg", onLoadBG);
			}
			//左立绘
			if(!XUtil.isEmpty(data.leftPlayer)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.leftPlayer.name)+".png", onLeft, [data.leftPlayer]);
			}
			
			//右立绘
			if(!XUtil.isEmpty(data.rightPlayer)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.rightPlayer.name)+".png", onLeft, [data.rightPlayer]);
				
			}
			
			function onLoadBG(info:LoaderInfo):void{
				Bitmap(info.content).smoothing = true;
				_icon.addChildAt(info.content, 0);
			}
			
			function onLeft(info:Object, data:Object):void{
				_icon.addChild(info.content)
				Bitmap(info.content).smoothing = true;
				info.content.x = data.x;
				info.content.y = data.y
				if(data.scaleX){
					info.content.scaleX = data.scaleX;
				}
				if(data.alpha != undefined){
					info.content.alpha = data.alpha
				}
			}
		}
		
		
		private function getKeyStr(key:String):String{
			switch(key){
				case "fight":
					return "战斗"
					break;
			}
			return key;
		}
		
		
		override public function set data(d:Object):void{
			super.data = d;
		}
		
		private function get vo():RecordVo{
			return _data as RecordVo;
		}
	}
}