package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.util.CoolEffect;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.events.*;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.ui.Keyboard;

	/**
	 * 翻页组件-用于已获得所有数据
	 * @author xiaohuzi999
	 * @Event PageCom.TURN_PAGE
	 * example: 
	 * var pc:PageCom = new PageCom(...);
	 * var currentData:Array = pc.currentData;
	 * //...
	 * pc.addEventListener(PageCom.TURN_PAGE, onTP);
	 * function onTP(event:ControlEvent):void{
	 *    var data:Array = event.data as Array;
	 * 	  //...;
	 * }
	 * 
	 * modified by daylyn
	 * 添加输入指定页码跳转功能
	 */
	public class XPageCom extends EventDispatcher
	{
		private var $prevBtn:InteractiveObject;
		private var $nextBtn:InteractiveObject;
		private var $infoTxt:TextField;
		
		private var _currentPage:int = 1;
		private var _totalPage:int;
		/**数据源，必须是Array/Vector*/
		private var _data:*;
		private var _pageSize:int;
		private var _isLoop:Boolean;
		private var _allowInput:Boolean = false;
		private var _splitChar:String = "/";
		public static const TURN_PAGE:String = "TURN_PAGE";
		
		/**
		 * 翻页组件-用于已获得所有数据
		 * @param prevBtn:上一页按钮
		 * @param nextBtn:下一页按钮
		 * @param infoTxt:分页信息文本，没有填null
		 * @param data:数据源，支持Array/Vector
		 * @param pageSize：每页显示数量
		 * @param isLoop 是否循环显示
		 * @param splitChar 分隔符,默认为"/"
		 */
		public function XPageCom(prevBtn:InteractiveObject, nextBtn:InteractiveObject, infoTxt:TextField = null, 
				data:* = null, pageSize:int = 5, isLoop:Boolean = false, splitChar:String = "/", $allowInput:Boolean = false)
		{
			this.$prevBtn = prevBtn;
			this.$nextBtn = nextBtn;
			this.$infoTxt = infoTxt;
			this.data = data;
			this._pageSize = pageSize;
			this._isLoop = isLoop;
			this._splitChar = splitChar;
			this._allowInput = $allowInput;
			
			initEvent();
		}

		private function initEvent():void
		{
			this.$prevBtn.addEventListener(MouseEvent.CLICK,onBtnClick);
			this.$nextBtn.addEventListener(MouseEvent.CLICK,onBtnClick);
			
			if(_allowInput)
			{
				$infoTxt.restrict = "0-9";
				$infoTxt.addEventListener(FocusEvent.FOCUS_IN, onFocusInHandle);
				$infoTxt.addEventListener(FocusEvent.FOCUS_OUT, onFocusOutHandle);
				$infoTxt.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDownHandle);
			}
		}
		
		private function onKeyDownHandle($e:KeyboardEvent):void
		{
			if($e.keyCode == Keyboard.ENTER)
			{
				var curPage:int = int($infoTxt.text);
				curPage = Math.max(1, curPage);
				if(_currentPage == curPage)
					return;
				setPage(curPage);
				this.dispatchEvent(new XEvent(XPageCom.TURN_PAGE,this.currentData));
			}
		}
		
		private function onFocusInHandle($e:FocusEvent):void
		{
			$infoTxt.htmlText = "";
			$infoTxt.setSelection($infoTxt.length, $infoTxt.length);
		}
		
		private function onFocusOutHandle($e:FocusEvent):void
		{
			setPage(_currentPage);
		}
		
		/**按钮事件*/
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case this.$prevBtn:
					this.currentPage --;
					this.dispatchEvent(new XEvent(XPageCom.TURN_PAGE,this.currentData));
					break;
				case this.$nextBtn:
					this.currentPage ++;
					this.dispatchEvent(new XEvent(XPageCom.TURN_PAGE,this.currentData));
					break;
			}
		}
		
		/**设置文本信息*/
		private function setPage(v:int):void{
			v = Math.min(Math.max(1, v), this.totalPage)
			this._currentPage = v;
			if($prevBtn is XButton){
				XButton($prevBtn).enabled = XButton($nextBtn).enabled = true;
			}else{
				$prevBtn.mouseEnabled = $nextBtn.mouseEnabled = true
				$prevBtn.filters = $nextBtn.filters = null;
			}
			if(_totalPage == 0){
				if($prevBtn is XButton){
					XButton($prevBtn).enabled = false;
				}else{
					this.$prevBtn.mouseEnabled = false;
					$prevBtn.filters = CoolEffect.blackFilter;
				}
				if($prevBtn is XButton){
					XButton($nextBtn).enabled = false;
				}else{
					this.$nextBtn.mouseEnabled = false;
					$nextBtn.filters = CoolEffect.blackFilter;
				}
				_currentPage = _totalPage;
				pageInfo = "1"+_splitChar+"1";
			}else{
				if(this._isLoop){
					if(_currentPage < 1){
						_currentPage = _totalPage
					}else if(_currentPage > _totalPage){
						_currentPage = 1;
					}
				}else{
					if(_currentPage <= 1){
						_currentPage = 1;
						if($prevBtn is XButton){
							XButton($prevBtn).enabled = false;
						}else{
							this.$prevBtn.mouseEnabled = false;
							$prevBtn.filters = CoolEffect.blackFilter;
						}
					}
					if(_currentPage >= _totalPage){
						_currentPage = _totalPage;
						if($nextBtn is XButton){
							XButton($nextBtn).enabled = false;
						}else{
							this.$nextBtn.mouseEnabled = false;
							$nextBtn.filters = CoolEffect.blackFilter;
						}
					}
				}
				pageInfo = (_currentPage) + _splitChar + _totalPage;
			}
		}
		
		/**设置当前页*/
		public function set currentPage(v:int):void
		{
			setPage(v);
		}
		
		/**获取当前页*/
		public function get currentPage():int
		{
			return this._currentPage > 0 ? this._currentPage : 1;
		}
		
		/**设置总页*/
		public function set totalPage(v:int):void
		{
			this._totalPage = v;
			setPage(currentPage);
		}
		
		/**获取总页*/
		public function get totalPage():int
		{
			return Math.max(1, this._totalPage);
		}
		
		/**设置数据源--必须是Array或则Vector*/
		public function set data(arr:Object):void
		{
			this._data = arr;
			if(!_data)
				_data = [];
			
			this.totalPage = Math.ceil(_data.length/_pageSize);
			this.setPage(_currentPage);
			this.dispatchEvent(new XEvent(XPageCom.TURN_PAGE,this.currentData));
		}
		
		/**获取数据源*/
		public function get data():Object
		{
			return this._data;
		}
		
		/**获取当前页数据*/
		public function get currentData():Object
		{
			if(!_data)
				return [];
			
			var startIndex:int = (_currentPage-1) * _pageSize;
			var endIndex:int = startIndex + _pageSize;
			if(endIndex > _data.length) endIndex = _data.length;
			return _data.slice(startIndex,endIndex);
		}
		
		/**获取页面规格,只读*/
		public function get pageSize():int
		{
			return _pageSize;
		}
		
		/**设置页面信息*/
		private function set pageInfo(infoStr:String):void
		{
			if(infoStr && $infoTxt)
				$infoTxt.text = infoStr;
		}
	}
}