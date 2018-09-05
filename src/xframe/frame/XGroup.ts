/**
* name 
*/
module xframe{
	export class XGroup extends Laya.EventDispatcher{
		//所有按钮
		private _btns:Laya.Button[];
		//当前选中按钮
		private _selectedBtn:Laya.Button;

		constructor(btns:Laya.Button[]=null){
			super();
			this.buttons = btns;
		}
		
		/**销毁*/
		public destroy():void{
			var btn:Laya.Button;
			for(var i=0; i<this._btns.length; i++){
				btn = this._btns[i]
				btn.off(Laya.Event.CLICK, this, this.onSelect);
			}
			this._btns = null;
		}
		
		private onSelect(e:Event):void{
			this.selectedBtn = <any>e.currentTarget
		}
		
		/**选中按钮*/
		public set selectedBtn(btn:Laya.Button){
			if(this._selectedBtn != btn){
				if(this._selectedBtn){
					this._selectedBtn.selected = false;
					this._selectedBtn.mouseEnabled = true;
				}
				this._selectedBtn = btn;
				if(this._selectedBtn){
					this._selectedBtn.selected = true;
					this._selectedBtn.mouseEnabled = false;
				}
				this.event(Laya.Event.CHANGE);
			}
			this.event(Laya.Event.SELECT);
		}
		
		/**选中按钮*/
		public get selectedBtn():Laya.Button{
			return this._selectedBtn;
		}
		
		/***/
		public set selectedIndex(v:number){
			this.selectedBtn = this.buttons[v];
		}
		
		/**获取选择序列*/
		public get selectedIndex():number{
			return this.buttons.indexOf(this._selectedBtn);
		}
		
		/**设置按钮组*/
		public set buttons(btns:Laya.Button[]){
			this._btns = btns;
			var btn:Laya.Button;
			for(var i=0; i<this._btns.length; i++){
				btn = this._btns[i]
				btn.toggle = true;
				btn.on(Laya.Event.CLICK, this, this.onSelect);
			}
		}
		
		/**获取按钮组*/
		public get buttons():Laya.Button[]{
			return this._btns
		}
	}
}