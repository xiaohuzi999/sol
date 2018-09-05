/**
 * Created by 马达加加加 on 2015/5/29.
 */
class PlayerDetailCom extends egret.DisplayObjectContainer{
    //人物头像框
    private $icon:egret.Bitmap;
    //出战标签
    private $label:egret.Bitmap;
    //名字
    private $nameTF:egret.TextField;
    //荣誉等级
    private $honorTF:egret.TextField;
    //技能
    private $skillTF: egret.TextField;
    //品级图片
    private $gradeBP:egret.Bitmap;
    /**装备按钮*/
    private $equipBtn:egret.Bitmap;
    /**进阶按钮*/
    private $growUpBtn:egret.Bitmap;
    //出战/休息
    private $fightBtn:egret.Bitmap;

    public data:RoleVo;
    public constructor(){
        super();
        this.touchEnabled = true;
        this.init();
    }

    /**格式化*/
    public format(data:RoleVo):void{
        this.data = data;
        if(data){
            this.$icon.texture = RES.getRes(data.pic+"_s");
            this.visible = true;
            //this.$nameTF.text = data.roleName+"";
            this.$nameTF.textFlow = Utils.htmlParser.parser("<font color='#"+TeamModel.getColor(data.honorLv)+"'>"+data.roleName+"</font>");
            this.$label.visible = true;
            this.$honorTF.text = "";
            this.$skillTF.text = "";
            if(data.roleId == User.getInstance().role.roleId) {
               this.$fightBtn.visible = false;
                if(data.skills && data.skills.length) 
                {
                    var len: number = data.skills.length;
                    for(var index in data.skills) {
                        var skillInfo: any = SkillData.getSkillInfo(data.skills[index]);
                        if(skillInfo == null)
                            continue;
                        if(index < len - 1)
                            this.$skillTF.text +=(skillInfo.skillName+",");
                        else
                            this.$skillTF.text += (skillInfo.skillName);
                    }
                } else {
                    this.$skillTF.text = "";
                }
                this.$label.texture = RES.getRes("chuzhan");
                this.$gradeBP.texture = RES.getRes( "" );
                this.$honorTF.textFlow = Utils.htmlParser.parser("<font color='#"+TeamModel.getColor(data.honorLv)+"'>"+ "(" +Strings.ROLE_HONOR_TITLE[data.honorLv-1]+ ")" +"</font>");
                this.$honorTF.x = 120 + this.$nameTF.width;
            }else {
                this.$fightBtn.visible = true;
                if(data.state == 1){
                    this.$label.texture = RES.getRes("chuzhan");
                    this.$fightBtn.texture = RES.getRes("rest");
                }else{
                    this.$fightBtn.texture = RES.getRes("fight");
                    this.$label.texture = null
                }
                this.$honorTF.textFlow = Utils.htmlParser.parser("<font color='#"+TeamModel.getColor(data.honorLv)+"'>"+ "(" +Strings.ROLE_HONOR_TITLE[data.honorLv-1]+ ")" +"</font>");
                this.$honorTF.x = 120 + this.$nameTF.width;
                this.$gradeBP.texture = RES.getRes( data.quality + "_png")
            }

            var role:RoleVo = data.createFighter();
            var str:string = "生命值："+role.maxHp;
            str += "\n攻击：" +Math.round(role.attack);
            str += "\n防御："+ Math.round(role.defend);
            str += "\n敏捷："+Math.round(role.agility);
            TipsManager.registerTips( this, str);
        }else{
            this.visible = false;
        }
    }

    public get height():number{
        return 102;
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("tiao");
        bm.x = 21;
        bm.y = 24;
        bm.touchEnabled = true;
        bm.name = "itemPlayer";

       /* bm = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("renwukuang");
        bm.x = 32;
        bm.y = 34;*/

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = 32;
        this.$icon.y = 34;

        this.$label = new egret.Bitmap();
        this.addChild(this.$label);
        this.$label.texture = RES.getRes("chuzhan");

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.x = 120;
        this.$nameTF.y = 41;
        this.$nameTF.size = 24;
        this.$nameTF.strokeColor = 0x222222;
        this.$nameTF.stroke = 2;

        this.$honorTF = new egret.TextField();
        this.addChild(this.$honorTF);
        this.$honorTF.y = 41;
        this.$honorTF.textColor = 0xff3300;
        this.$honorTF.size = 24;

        this.$gradeBP = new egret.Bitmap();
        this.addChild(this.$gradeBP);
        this.$gradeBP.x = 94;
        this.$gradeBP.y = 91.5;
        this.$gradeBP.scaleX = 0.5;
        this.$gradeBP.scaleY = 0.5;

        this.$skillTF = new egret.TextField();
        this.addChild(this.$skillTF);
        this.$skillTF.x = 120;
        this.$skillTF.y = 77;
        this.$skillTF.size = 24;
        this.$nameTF.fontFamily = this.$honorTF.fontFamily = this.$skillTF.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$equipBtn = new egret.Bitmap();
        this.addChild(this.$equipBtn);
        this.$equipBtn.width = 105;
        this.$equipBtn.height = 70;
        this.$equipBtn.x = 397;
        this.$equipBtn.y = 34;
        this.$equipBtn.touchEnabled = true;
        this.$equipBtn.texture = RES.getRes("zhuangbeianniu");
        this.$equipBtn.name = "equipBtn";

        this.$growUpBtn = new egret.Bitmap();
        this.addChild(this.$growUpBtn);
        this.$growUpBtn.width = 105;
        this.$growUpBtn.height = 65;
        this.$growUpBtn.x = 498;
        this.$growUpBtn.y = 41;
        this.$growUpBtn.texture = RES.getRes("jinjiekuang");
        this.$growUpBtn.touchEnabled = true;
        this.$growUpBtn.name = "growUpBtn";

        this.$fightBtn = new egret.Bitmap();
        this.addChild(this.$fightBtn);
        this.$fightBtn.x = 296;
        this.$fightBtn.y = 34;
        this.$fightBtn.width = 105;
        this.$fightBtn.height = 70;
        this.$fightBtn.texture = RES.getRes("rest");
        this.$fightBtn.touchEnabled = true;
        this.$fightBtn.name = "fightBtn";
    }

}

class TeamItemRenderer extends egret.gui.ItemRenderer {
    public constructor(){
        super();
        this.skinName = PlayerDetailCom;
        this.touchChildren = true;
    }

    public dataChanged():void{
        <BagItem>this.skin.format(this.data.data);
    }

}
