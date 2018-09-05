package com.xiaohuzi999.storyEditor.vo
{

	/**
	 * NPCVo
	 * author:xiaohuzi999
	 * NPCVo.as 2015-6-6 下午3:32:43
	 * version 1.0
	 *
	 */
	public class NPCVo
	{
		//id
		public var npcId:String;
		//npc 名字
		public var npcName:String;
		//类型
		public var npcType:String;
		/**体质*/
		public var physique:Number = 0;
		/**敏捷*/
		public var agility:Number = 0;
		/**攻击*/
		public var attack:Number = 0;
		/**防御*/
		public var defend:Number = 0;
		/**图片*/
		public var pic:String = "";
		
		//掉落====================================
		//掉落阶段
		public var rewardLv:Number=0
		
		public function NPCVo()
		{
		}
	}
}
