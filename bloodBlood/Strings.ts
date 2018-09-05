/**
 * 文本配置
 * @author 
 *
 */
class Strings {
    
    public static DEFAULT_FONT_NAME: string = "微软雅黑";
    public static MONEY: string = "金币";
    public static POINT: string = "功绩包";
    public static COMMING:string = "即将开放,敬请期待";
    public static ROLE_HONOR_TITLE: Array<any> = ["稚子", "星战士", "月战士", "夜战士", "男爵", "子爵",
         "伯爵", "侯爵", "公爵", "千年公爵", "亲王", "血帝", "血神"];
    public static ROLE_HONOR_RANK: Array<any> = ["zhizi_s", "xingzhanshi_s", "yuezhanshi_s", "yuezhanshi_s", "nanjue_s", "zijue_s",
        "bojue_s", "houjue_s", "gongjue_s", "qiangniangongjue_s", "qinwang_s", "xuedi_s", "xueshen_s"];
    public static ENEMY_INFO:Array<any> = [{name:"大地初始",honorLv:1,kpi:49},{name:"右眼的心跳",honorLv:2,kpi:50},{name:"立法技术",honorLv:7,kpi:89},{name:"房间爱上",honorLv:5,kpi:49},
        {name:"李倩茹",honorLv:4,kpi:500},{name:"可兼职",honorLv:8,kpi:49},{name:"旅客身份",honorLv:3,kpi:600},{name:"人道修为",honorLv:1,kpi:120},{name:"对战王",honorLv:6,kpi:1000},
        {name:"千仞",honorLv:11,kpi:2000}];
    public static PRIZE_SHOW:string = "\n◆ 冠军奖励:200功绩点\n◆ 亚军奖励:150功绩点\n◆ 季军奖励:100功绩点\n◆ 4-10名:50功绩点\n◆ 11-20名:40功绩点\n◆ 21-50名:30功绩点\n◆ 51-100名:20功绩点\n◆ 其余名次:10功绩点\n";
    public static BLOOD_NOT_ENOUGH: string = "精血数量不足，是否前往商城购买？";
    public static MONEY_NOT_ENOUGH: string = "金币不足";
    public static POINT_NOT_ENOUGH: string = "功绩不足";
    public static MAX_HONOR_LV: string = "已达到满阶";
    public static FULL_XIUWEI: string = "修为已满";
    public static PASS_CONDITION: string = "通关条件：";
    public static GAIN_STR:string = "成熟：";
    public static GAIN_NUM:string = "产量：";
    public static NEED_NUM:string = "消耗：";
    public static PER_MIN:string = "/分钟";
    public static PERSON_PER_MN:string="分钟/10人";
    public static UPDATE_CD:string = "升级CD：\n";
    public static BUILDING_LV_MAX:string = "已经达到最高等级！";
    public static BUILDING_LV_ERR:string = "不能超过外务殿等级！"
    public static BUILDING_UP_STR:string = "升级$需要消耗金币$,木头$。";
    public static BUILDING_UPING_STR:string = "该建筑正在升级中。";
    public static WOOD_NOT_ENOUGH:string = "木头不足";
    public static BUILDINGS_HALL:string = "外务殿";
    public static BUILDINGS_MINE:string = "矿场";
    public static BUILDINGS_FIELD:string = "农田";
    public static BUILDINGS_HOUSE:string = "民居";
    public static BUILDINGS_WOOD:string = "伐木场";
    public static LV_UP_SUC:string = "恭喜，升级成功！";
    public static BLOOD:string = "血液精华";
    public static WOOD:string = "木头";
    public static FOOD:string = "麦子";
    public static GAIN_NOT_TIME:string = "当前没有可以收取的";
    public static GAIN_TIME_TIP:string = "距离下次收取";
    public static TIME_MIN:string = "分钟";
    public static TIME_S:string = "秒";
    public static GAIN_TIPS:string = "当前可收取";
    public static EXPAND_TIP:string = "扩建$需要消耗$功绩";
    public static FIELD_TIP:string = "血奴需要足够的小麦来维持生计";
    public static HOUSE_TIP:string = "民居等级越高产出血奴速度越快";
    public static FARM_HELP:string = "城邦帮助|" +
        "1.	城邦中的建筑等级均不可超过外务殿等级。" +
        "\n2.	外务殿可产出血液精华，用于伙伴的升阶。城邦中的血奴越多，产出血液精华的速度越快。" +
        "\n3.	建造或升级民居可加快生养血奴的速度。" +
        "\n4.	养活血奴需消耗小麦，小麦不足时，血奴将会在10分钟后死亡。升级或扩建麦田可增加小麦的产量。每个血奴每分钟需消耗5个小麦。" +
        "\n5.	矿场和伐木场产出的金币和木材需定时收集。拥有足够的木材和金币才能对建筑进行升级。\n6.	如果累计24小时没有收取资源，资源将暂停生产，收取后恢复生产。"

	public constructor() {
	}
}
