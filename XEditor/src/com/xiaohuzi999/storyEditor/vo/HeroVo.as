package com.xiaohuzi999.storyEditor.vo
{
	/**
	 * HeroVo
	 * author:xiaohuzi999
	 * HeroVo.as 2015-7-17 上午10:39:12
	 * version 1.0
	 */
	public class HeroVo
	{
		//"roleName":"乌木",attack:10,defend:10,physique:10,agility:10, pic:"wumu", lv:1
		public var roleId:String;
		public var roleName:String;
		public var attack:Number;
		public var defend:Number;
		public var physique:Number;
		public var agility:Number;
		public var pic:String;
		//战斗形象
		public var fightPic:String;
		//体质成长	攻击成长	防御成长	敏捷成长
		public var attackGrow:Number;
		public var defendGrow:Number;
		public var physiqueGrow:Number;
		public var agilityGrow:Number;
		//兑换荣誉
		public var exHonor:Number;
		//技能名
		public var skillName:String;
		//品质
		public var quality:String
		
		public function HeroVo()
		{
		}
	}
}