package{
	import com.xiaohuzi999.storyEditor.MainView;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.test.TestView;
	import com.xiaohuzi999.xControls.frame.XFacade;
	import com.xiaohuzi999.xControls.frame.XWindow;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	
	import flash.desktop.NativeApplication;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.NativeWindow;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.net.FileFilter;
	import flash.ui.Keyboard;
	import flash.utils.ByteArray;
	
	/**
	 * Main
	 * author:xiaohuzi999
	 * Main.as 2015-5-18 下午2:56:11
	 * version 1.0
	 */
	[SWF(width="1400",height="720")]
	public class Main extends Sprite
	{
		private var window:NativeWindow = stage.nativeWindow;
		
		private var rootMenu:NativeMenu = new NativeMenu; 
		private var fileMenu:NativeMenu = new NativeMenu;
		
		/***/
		private var txtFileFilter:FileFilter = new FileFilter("文本文件(*.txt)", "*.txt;*.txt"); 

		public function Main()
		{
			// 支持 autoOrient
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			init();
		}
		
		private function onSelectItem(event:Event):void{
			switch(event.currentTarget.label){
				case "退出":
					NativeApplication.nativeApplication.exit();
					break;
				case "打开":
					file = new File;
					file.addEventListener(Event.SELECT, selectOpenFile);
					file.browseForOpen("打开文本文件", [txtFileFilter]); 
					break;
				case "保存":
					var file:File = new File("/未命名.txt");
					file.addEventListener(Event.SELECT, selectSaveFile);
					file.browseForSave("保存"); 
					break;
				case "新建":
					DB.importData("{}");
					break;
			}
		}
		//
		private function selectOpenFile(event:Event):void {
			var file:File = event.target as File;
			file.removeEventListener(Event.SELECT, selectOpenFile);
			var stream:FileStream = new FileStream;
			stream.open(file, FileMode.READ);  
			//var str:String = stream.readMultiByte(stream.bytesAvailable,"gb2312");
			var b:ByteArray = new ByteArray();
			stream.readBytes(b);
			try{
				b.uncompress();
			}catch(e:Error){
				trace(e);
			}
			//var str:String = b.readMultiByte(b.bytesAvailable,"utf8");
			var str:String = b.readUTFBytes(b.bytesAvailable);
			DB.importData(str);
			stream.close(); 
		} 
		
		//
		private function selectSaveFile(event:Event):void { 
			var file:File = event.target as File; 
			file.removeEventListener(Event.SELECT, selectSaveFile);
			var stream:FileStream = new FileStream;
			stream.open(file, FileMode.WRITE);
			stream.writeMultiByte(DB.export(), "utf8");
			/*var b:ByteArray = new ByteArray();
			b.writeMultiByte(_mainView.export(), "gb2312");
			b.compress();
			stream.writeBytes(b);*/
			stream.close();
		} 
		
		/**快捷键*/
		public function onKeyDown(event:KeyboardEvent):void{
			if(event.ctrlKey){
				if(event.keyCode == Keyboard.ENTER){
					//测试代码
					(ModelManager.getInstance(TestView) as TestView).showStory((ModelManager.getInstance(MainView) as MainView).currentStory);
				}
			}else if(event.keyCode == Keyboard.ESCAPE){
				XWindow.closeAllWindows([]);
			}
		}

		
		private function init():void{
			item = new NativeMenuItem("新建");
			fileMenu.addItem(item);
			item.addEventListener(Event.SELECT, onSelectItem);
			
			var item:NativeMenuItem = new NativeMenuItem("打开");
			fileMenu.addItem(item);
			item.addEventListener(Event.SELECT, onSelectItem);

			item = new NativeMenuItem("保存");
			fileMenu.addItem(item);
			item.addEventListener(Event.SELECT, onSelectItem);
			
			item = new NativeMenuItem("退出");
			fileMenu.addItem(item);
			item.addEventListener(Event.SELECT, onSelectItem);
			
			rootMenu.addSubmenu(fileMenu, "文件");
			window.menu = rootMenu;
			
			XFacade.getInstance().init(this,  App,  "剧情编辑器");
			
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		}
	}
}