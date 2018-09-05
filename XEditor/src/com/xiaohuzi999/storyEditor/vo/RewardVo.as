package com.xiaohuzi999.storyEditor.vo
{
	/**
	 * RewardVo
	 * author:xiaohuzi999
	 * RewardVo.as 2015-6-11 下午3:57:16
	 * version 1.0
	 */
	public class RewardVo
	{
		public var rewardId:Number;
		
		//精血
		public var bloodMin:Number;
		public var bloodMax:Number;
		//金币
		public var moneyMin:Number;
		public var moneyMax:Number;
		
		//随机掉落组
		public var items:Vector.<RewardItemRateVo> = new Vector.<RewardItemRateVo>();
		public function RewardVo()
		{
		}
	}
}