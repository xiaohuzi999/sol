package com.xiaohuzi999.xControls.frame
{
	import com.xiaohuzi999.xControls.util.CoolEffect;
	import com.xiaohuzi999.xControls.util.xEvent.XEvent;
	
	import flash.display.InteractiveObject;
	import flash.events.*;
	import flash.text.TextField;
	import flash.ui.Mouse;

	/**
	 * 扩展翻页组件-分页查询数据
	 * @author xiaohuzi999
	 * example: 
	 * var pc:XPageCom = new XPageCom(...);
	 * var currentPage:int = pc.currentPage;
	 * //...
	 * pc.addEventListener(XPageCom.TURN_PAGE,onTP);
	 * function onTP(event:ControlEvent):void{
	 *    currentPage:int = int(event.data);
	 * 	  //...;
	 * }
	 */
	public class XXPageCom extends EventDispatcher
	{
		/**当前页*/
		private var _currentPage:int = 1;
		/**总页数*/
		private var _totalPage:int;
		/**上一页按钮*/
		private var $prevBtn:InteractiveObject;
		/**下一页按钮*/
		private var $nextBtn:InteractiveObject;
		/**信息文本*/
		private var $infoTxt:TextField;
		/**翻页事件*/
		public static const TURN_PAGE:String = "TURN_PAGE";
		
		/**
		 * 扩展翻页组件-分页查询数据
		 * @param prevBtn:上一页按钮
		 * @param nextBtn:下一页按钮
		 * @param infoTxt:分页信息文本，没有填null
		 * @param data:数据源，支持Array/Vector
		 * @param pageSize：每页显示数量
		 */
		public function XXPageCom(prevBtn:InteractiveObject, nextBtn:InteractiveObject,infoTxt:TextField=null, totalPage:int=0)
		{
			this.$prevBtn = prevBtn;
			this.$nextBtn = nextBtn;
			this.$infoTxt = infoTxt;
			this.totalPage = totalPage;
			initEvent();
		}

		private function initEvent():void{
			this.$prevBtn.addEventListener(MouseEvent.CLICK,onBtnClick);
			this.$nextBtn.addEventListener(MouseEvent.CLICK,onBtnClick);
		}
		
		/**按钮事件*/
		private function onBtnClick(event:MouseEvent):void{
			switch(event.currentTarget){
				case this.$prevBtn:
					this.currentPage --;
					break;
				case this.$nextBtn:
					this.currentPage ++;
					break;
			}
		}
		
		/**设置文本信息*/
		private function setPage(v:int):void{
			this._currentPage = v;
			if($prevBtn is XButton){
				XButton($prevBtn).enabled = XButton($nextBtn).enabled = true;
			}else{
				$prevBtn.mouseEnabled = $nextBtn.mouseEnabled = true
				$prevBtn.filters = $nextBtn.filters = null;
			}
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
			if($infoTxt){
				this.$infoTxt.text = (_currentPage) + " / " + _totalPage;
			}
		}
		
		/**还原*/
		public function reset():void{
			this._currentPage = 1;
			setPage(_currentPage);
		}
		
		/**设置当前页*/
		public function set currentPage(v:int):void{
			var t:int = _currentPage;
			setPage(v);
			if(t != v){
				this.dispatchEvent(new XEvent(XPageCom.TURN_PAGE, this._currentPage));
			}
		}
		
		
		/**获取当前页*/
		public function get currentPage():int{
			return this._currentPage;
		}
		
		/**设置总页*/
		public function set totalPage(v:int):void{
			this._totalPage = v;
			if(_totalPage == 0){
				_totalPage = 1;
			}
			setPage(_currentPage);
		}
		
		/**获取总页*/
		public function get totalPage():int{
			return this._totalPage;
		}
	}
}