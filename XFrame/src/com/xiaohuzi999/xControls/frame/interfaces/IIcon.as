package  com.xiaohuzi999.xControls.frame.interfaces
{
	import flash.display.BitmapData;

	public interface IIcon
	{
		/**ICON*/
		function set icon(iconBmd:*):void
			
		/**ICON*/
		function get icon():BitmapData;
		
		/**数据源*/
		function set data(data:*):void
		
		/**数据源*/
		function get data():*;
		
		/**Icon源，即从哪个Icon克隆过来的*/
		function set source(icon:*):void
		
		/**Icon源，即从哪个Icon克隆过来的*/
		function get source():*
		
		/**克隆-复制一个相同的ICON*/
		function clone():IIcon;
		
		/**
		 * 销毁
		 * @param forceToDistory是否强制销毁--注意必须确定不再需要位图源时才能销毁;
		 */
		function dispose(forceToDistory:Boolean = false):void
	}
}