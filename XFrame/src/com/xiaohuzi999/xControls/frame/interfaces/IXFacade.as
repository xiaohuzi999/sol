package  com.xiaohuzi999.xControls.frame.interfaces
{
	import com.xiaohuzi999.xControls.core.BasicData;
	import com.xiaohuzi999.xControls.core.BasicView;
	import com.xiaohuzi999.xControls.frame.XIcon;
	import com.xiaohuzi999.xControls.frame.manager.IconManager;
	import com.xiaohuzi999.xControls.util.CommandVo;
	
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.InteractiveObject;
	import flash.events.KeyboardEvent;
	
	public interface IXFacade
	{
		/**
		 * 初始化组件，所有的可视容器都必须由LayerManager管理
		 * @param container 默认容器
		 * */
		function init(container:DisplayObjectContainer, MainClass:Class,gameName:String = ""):void
		
		/**
		 * 加载Lib资源,即swf文件
		 * @param url 资源地址
		 * @param onComplete 加载完成回调
		 * @param onCompleteArgs 加载完成回调参数
		 * @param onProgress 加载进度回调函数,形如onProgress(event:ProgressEvent);
		 * @param onError 加载失败回调
		 */
		function addLib(url:String, onComplete:Function=null, onCompleteArgs:Array=null, onProgress:Function=null, onError:Function=null):void
		
		/**
		 *获取某个ui 
		 * @param label，类/类名字符串或者类(Class)
		 * @return 实例（DisplayObject）
		 */
		 function getUI(label:*):*;
				
		/**
		 * 设置视图的层级
		 * @param view 视图组件
		 * @param layer 层级,默认加到普通窗体层，常数定义在LayerManager中 
		 * */
		function setLayer(view:DisplayObject, layer:uint = 1):void;
		
		/**
		 * 注册物体TIP；
		 * @param tipObj 显示TIP的物体
		 * @param info TIP的数据,如文字介绍
		 * @param tipTyp 显示的TIP类型——默认为文本类型，新增的则为类,注意，该类必须实现IXToolTip
		 */
		function registerTip(tipObj:InteractiveObject, info:Object = "" , tipTyp:Class=null):void;
		
		/**
		 * 移除物体的TIP；
		 * @param tipObj 移除TIP的物体,静态公开接口
		 */
		function removeTip(tipObj:InteractiveObject):void
		
		/**
		 * 注册一个数据,以label作为key存储
		 * @param data 基础数据 
		 */
		function registerData(data:BasicData):void
		
		/**
		 * 移除一个数据
		 * @param data 数据
		 */
		function removeData(data:BasicData):void
		
		/**获取一个数据
		 * @param label 数据的label
		 */
		function getData(label:String):BasicData
	}
}