package
{
	import com.xiaohuzi999.storyEditor.MainView;
	import com.xiaohuzi999.xControls.frame.interfaces.IApp;
	import com.xiaohuzi999.xControls.frame.manager.ModelManager;
	
	/**
	 * App
	 * author:xiaohuzi999
	 * App.as 2018-9-4 下午4:41:58
	 * version 1.0
	 *
	 */
	public class App implements IApp
	{
		private var _mainView:MainView
		public function App()
		{
		}
		
		public function start():void
		{
			_mainView = ModelManager.getInstance(MainView) as MainView;
			_mainView.show();
		}
	}
}