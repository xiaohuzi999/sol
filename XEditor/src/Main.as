package{
	import com.xiaohuzi999.storyEditor.MainView;
	import com.xiaohuzi999.storyEditor.model.DB;
	import com.xiaohuzi999.storyEditor.model.DBItem;
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
	[SWF(width="1604",height="820")]
	public class Main extends Sprite
	{
		private var window:NativeWindow = stage.nativeWindow;
		
		private var rootMenu:NativeMenu = new NativeMenu; 
		private var fileMenu:NativeMenu = new NativeMenu;
		
		/***/
		private var txtFileFilter:FileFilter = new FileFilter("文本文件(*.txt)", "*.txt;*.txt"); 

		private static const MENU_NEW:String = "新建Ctrl+N";
		private static const MENU_OPEN:String = "打开Ctrl+O";
		private static const MENU_SAVE:String = "保存Ctrl+S";
		private static const MENU_CLOSE:String = "退出Ctrl+Q";
		
		/***/
		private static const MENU_IMPORT_ITEMS:String = "导入道具Json";
		
		private static const MENUS:Array = [MENU_NEW,MENU_OPEN, MENU_SAVE, MENU_CLOSE];
		public function Main()
		{
			// 支持 autoOrient
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			init();
			
			
			var buff:Object  = {};
			//num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，增减益 2眩晕类 3，混乱类 rnd 持续回合
			//type 类型 1，HP增减, 2,attack增减 3，defend增减 4，speed增减, 5，dodge增减， 6，crit增减 7眩晕类 8，混乱类， 9保留 
			buff[1001] = {id:101, name:"治愈1", num:1,target:1, type:1, rnd:3, value:{hp:"25%"}};
			buff[1002] = {id:102, name:"治愈2", num:2,target:1, type:1, rnd:3, value:{hp:"25%"}};
			buff[1003] = {id:103, name:"治愈3", num:5,target:1, type:1, rnd:3, value:{hp:"25%"}};
			buff[1101] = {id:104, name:"中毒1", num:1,target:2, type:1, rnd:3, value:{hp:"-10%"}};
			buff[1102] = {id:105, name:"中毒2", num:2,target:2, type:1, rnd:3, value:{hp:"-10%"}};
			buff[1102] = {id:106, name:"中毒3", num:5,target:2, type:1, rnd:3, value:{hp:"-10%"}};
			
			buff[2001] = {id:107, name:"强攻1", num:1,target:1, type:2, rnd:2, value:{attack:"25%"}};
			buff[2002] = {id:108, name:"强攻2", num:2,target:1, type:2, rnd:3, value:{attack:"25%"}};
			buff[2003] = {id:109, name:"强攻3", num:5,target:1, type:2, rnd:3, value:{attack:"25%"}};
			buff[2101] = {id:110, name:"弱攻1", num:1,target:2, type:2, rnd:3, value:{attack:"-10%"}};
			buff[2102] = {id:111, name:"弱攻2", num:2,target:2, type:2, rnd:3, value:{attack:"-10%"}};
			buff[2103] = {id:112, name:"弱攻3", num:5,target:2, type:2, rnd:3, value:{attack:"-10%"}};
			
			buff[3001] = {id:113, name:"减伤1", num:1,target:1, type:3, rnd:3, value:{defend:"25%"}};
			buff[3002] = {id:114, name:"减伤2", num:2,target:1, type:3, rnd:3, value:{defend:"25%"}};
			buff[3003] = {id:115, name:"减伤3", num:5,target:1, type:3, rnd:3, value:{defend:"25%"}};
			buff[3101] = {id:116, name:"加伤1", num:1,target:2, type:3, rnd:3, value:{defend:"-10%"}};
			buff[3102] = {id:117, name:"加伤2", num:2,target:2, type:3, rnd:3, value:{defend:"-10%"}};
			buff[3103] = {id:118, name:"加伤3", num:5,target:2, type:3, rnd:3, value:{defend:"-10%"}};
			
			//特殊
			buff[7001] = {id:201, name:"眩晕1", num:1,target:2, type:7, rnd:2, value:{}};
			buff[7002] = {id:202, name:"眩晕2", num:2,target:2, type:7, rnd:2, value:{}};
			buff[7003] = {id:203, name:"眩晕3", num:5,target:2, type:7, rnd:2, value:{}};
			buff[8001] = {id:301, name:"混乱1", num:1,target:2, type:8, rnd:2, value:{}};
			buff[8002] = {id:302, name:"混乱2", num:2,target:2, type:8, rnd:2, value:{}};
			buff[8003] = {id:303, name:"混乱3", num:5,target:2, type:8, rnd:2, value:{}};
			
			var skill:Object = {};
			//num 作用目标数， target 作用对象，1-己方，2-对方，0-不限 ，type 类型 1，伤害。 2眩晕类 3，混乱类, rate 损血比例
			skill[1101]= {id:1101, name:"S01", num:1,target:2, type:1, rate:-1, power:0, addPower:25};
			skill[1102]= {id:1102, name:"S02", num:1,target:2, type:1, rate:-1.5, buff:7001, buffRate:1, power:50, addPower:0};
			
			skill[1103]= {id:1103, name:"S03", num:1,target:2, type:1, rate:-1, power:0, addPower:25};
			skill[1104]= {id:1104, name:"ZY04", num:5,target:1, type:1, rate:1.2, buff:1001, buffRate:1, power:50, addPower:0};
			
			skill[2101]= {id:2101, name:"撕咬", num:1,target:2, type:1, rate:-1, power:0, addPower:50};
			skill[2102]= {id:2102, name:"野蛮冲撞", num:1,target:2, type:1, rate:-4, buff:2001, buffRate:0.5, power:100, addPower:0};
			
			for(var i:String in buff){
				buff[i].id = parseInt(i);
			}
			
			
			var fliePath:String = "D:/skill.txt";
			var file:File = File.applicationDirectory.resolvePath(fliePath);
			var fs:FileStream=new FileStream();
			var bt:ByteArray=new ByteArray();
			bt.writeUTFBytes(JSON.stringify(skill));
			fs.open(file,FileMode.UPDATE);
			fs.writeBytes(bt);
			fs.close();
			
		}
		
		private function onSelectItem(event:Event):void{
			doMenuAct(event.currentTarget.label);
		}
		
		private function doMenuAct(menu:String):void{
			switch(menu){
				case MENU_CLOSE:
					NativeApplication.nativeApplication.exit();
					break;
				case MENU_OPEN:
					file = new File;
					file.addEventListener(Event.SELECT, selectOpenFile);
					file.browseForOpen("打开文本文件", [txtFileFilter]); 
					break;
				case MENU_SAVE:
					var file:File = new File("/未命名.txt");
					file.addEventListener(Event.SELECT, selectSaveFile);
					file.browseForSave("保存"); 
					break;
				case MENU_NEW:
					DB.importData("{}");
					break;
				case MENU_IMPORT_ITEMS:
					DBItem.input();
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
				switch(event.keyCode){
					case Keyboard.O:
						doMenuAct(MENU_OPEN)
						break;
					case Keyboard.N:
						doMenuAct(MENU_NEW)
						break;
					case Keyboard.Q:
						doMenuAct(MENU_CLOSE)
						break;
					case Keyboard.S:
						doMenuAct(MENU_SAVE)
						break;
					case Keyboard.ENTER:
						(ModelManager.getInstance(TestView) as TestView).showStory((ModelManager.getInstance(MainView) as MainView).currentStory);
						//(MODELMANAGER.GETINSTANCE(TESTVIEW) AS TESTVIEW).SHOWSTORY((MODELMANAGER.GETINSTANCE(MAINVIEW) AS MAINVIEW).CURRENTSTORY);
						break;
				}
			}else if(event.keyCode == Keyboard.ESCAPE){
				XWindow.closeAllWindows([]);
			}
		}

		
		private function init():void{
			for(var i:int=0; i<MENUS.length; i++){
				var item:NativeMenuItem = new NativeMenuItem(MENUS[i]);
				fileMenu.addItem(item);
				item.addEventListener(Event.SELECT, onSelectItem);
			}
			rootMenu.addSubmenu(fileMenu, "文件");
			
			var editList:Array = [MENU_IMPORT_ITEMS];
			fileMenu = new  NativeMenu();
			for(i=0; i<editList.length; i++){
				item = new NativeMenuItem(editList[i]);
				fileMenu.addItem(item);
				item.addEventListener(Event.SELECT, onSelectItem);
			}
			rootMenu.addSubmenu(fileMenu, "编辑");
			
			window.menu = rootMenu;
			
			XFacade.getInstance().init(this,  App,  "剧情编辑器");
			
			this.stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		}
	}
}