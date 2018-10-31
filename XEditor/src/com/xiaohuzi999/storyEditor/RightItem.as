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
	import flash.display.NativeMenu;
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
		private var $funTF:TextField;
		private var $tfAct:TextField;
		private var $tfTime:TextField;
		private var $mcIcon:MovieClip;
		private var _icon:MovieClip;
		private var _menu:NativeMenu;
		//
		public function RightItem(data:RecordVo = null)
		{
			data || (data = new RecordVo());
			super(new RecordItemUI(), "", data, false);
			$nameTF = $ui.nameTF;
			$diaTF = $ui.diaTF;
			$funTF = $ui.funTF;
			$tfAct = $ui.actTF;
			$tfTime = $ui.timeTF
			$mcIcon = $ui.mcIcon;
			$nameTF.text = $diaTF.text = $ui.typeTF.text = $funTF.text = $tfAct.text=$tfTime.text = "";
			update();
		}
		
		/***/
		public function update():void{
			$tfAct.text  = "";
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
			$tfTime.text = vo.time+"";
			this.$ui.mcNKF.visible = vo.nkf;
			
			$mcIcon.visible = false;
			if(vo.data){
				$mcIcon.visible = true;
				var obj:Object = vo.data;
				for(var i:String in obj){
					$mcIcon.gotoAndStop(i);
				}
			}
			
			if(vo.lb_1){
				$ui.typeTF.text = "多线剧情开始";
				this.$ui.bg.gotoAndStop(2);
			}else{
				if(vo.pId){
					$ui.typeTF.text = "剧情_"+vo.pn;
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
			
			if(vo.act){
				if(vo.act.shake){
					$tfAct.appendText("剧烈抖动");
				}else if(vo.act.shake1){
					$tfAct.appendText("轻微抖动");
				}else if(vo.act.shake2){
					$tfAct.appendText("横向剧烈");
				}else if(vo.act.shake3){
					$tfAct.appendText("纵向剧烈");
				}else if(vo.act.shake4){
					$tfAct.appendText("横向轻微");
				}else if(vo.act.shake5){
					$tfAct.appendText("纵向轻微");
				}else if(vo.act.shake6){
					$tfAct.appendText("抖一次");
				}
				
				if(vo.act.flashRed){
					$tfAct.appendText("闪红");
				}else if(vo.act.flashWhite){
					$tfAct.appendText("闪白");
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
			if(_icon.bg == data.bg && _icon.p0 == data.p0 && _icon.p1 == data.p1){
				return;
			}
			_icon.bg = data.bg;
			_icon.p0 = data.p0;
			_icon.p1 = data.p1;
			while(_icon.numChildren){
				_icon.removeChildAt(0);
			}
			//背景
			if(data.bg){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.BG_URL, data.bg.n)+".jpg", onLeft, [data.bg, 0]);
			}
			//左立绘
			if(!XUtil.isEmpty(data.p0)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p0.n)+".png", onLeft, [data.p0]);
			}
			
			//右立绘
			if(!XUtil.isEmpty(data.p1)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p1.n)+".png", onLeft, [data.p1]);
				
			}
			
			if(!XUtil.isEmpty(data.p2)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p2.n)+".png", onLeft, [data.p2]);
				
			}
			
			if(!XUtil.isEmpty(data.p3)){
				DisplayLoader.getLoaderInfo(Consts.getURL(Consts.PLAYER_URL, data.p3.n)+".png", onLeft, [data.p3]);
				
			}
			
			function onLeft(info:Object, data:Object, index:int=-1):void{
				if(index > -1){
					_icon.addChildAt(info.content, index)
				}else{
					_icon.addChild(info.content)
				}
				Bitmap(info.content).smoothing = true;
				info.content.x = data.x;
				info.content.y = data.y
				if(data.sx){
					info.content.scaleX = data.sx;
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