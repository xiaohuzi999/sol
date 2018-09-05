/**
 * Created by 马达加加加 on 2015/6/5.
 */
class EquipItem extends egret.DisplayObjectContainer{
    //名字标志
    private $nameFlag:egret.Bitmap;
    //图标
    private $icon:egret.Bitmap;
    //名字
    private $nameTF:egret.TextField;
    //属性
    private $proTF:egret.TextField;
    //附加属性
    private $exProTF:egret.TextField;
    //强化按钮
    private $strBtn:egret.Bitmap;
    //装备/xue下按钮
    private $equiBtn:egret.Bitmap;
    public constructor(){
        super();
        this.init();
    }

    public format(vo:ItemVo):void{
        var htmlStr:string = "<font color='#ff9900' size='24'>"+vo.itemName + "</font>";
        if(vo.itemStrLv){
            htmlStr+= "<font size='20'> +"+vo.itemStrLv+"</font>"
        }
        if(vo.masterId){
            var tempRole:RoleVo = UserModel.getRole(vo.masterId);
            if(tempRole){
                htmlStr +="<font color='#009900' size='20'>("+tempRole.roleName+")</font>"

            }
        }
        this.$nameTF.textFlow = (new egret.HtmlTextParser()).parser(htmlStr)
        this.$icon.texture = RES.getRes(vo.imageId);
        this.$proTF.text = ItemVo.parse(XUtils.addObject(vo.itemProperty, vo.itemXProperty));
        this.$exProTF.text = ItemVo.parse(XUtils.diffObject(vo.itemXProperty, vo.itemProperty));
        var target:RoleVo = EquipView.target;
        if(!target){
            target = User.getInstance().role;
        }
        if(vo.masterId){
            this.$nameFlag.texture = RES.getRes("yizhuangbei");
            if(vo.masterId == target.roleId){
                this.$equiBtn.texture = RES.getRes("xuexia");
            }else{
                this.$equiBtn.texture = RES.getRes("zhuangbeianniu");
            }
        }else{
            this.$equiBtn.texture = RES.getRes("zhuangbeianniu");
            this.$nameFlag.texture = null;
        }
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("tiao");
        bm.height = 120;
        bm.x = 28;
        bm.y = 12;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("renwukuang");
        this.addChild(bm);
        bm.x = 37;
        bm.y = 31;

        this.$icon = new egret.Bitmap();
        this.addChild(this.$icon);
        this.$icon.x = 35;
        this.$icon.y = 26;
        this.$icon.texture = RES.getRes("zhuangbei");

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.x = 92+28;
        this.$nameTF.y = 12+12;
        this.$nameTF.size = 22;
        this.$nameTF.textColor = 0xff9900

        this.$proTF = new egret.TextField();
        this.addChild(this.$proTF);
        this.$proTF.x = 92+28;
        this.$proTF.y = 39+12;
        this.$proTF.width = 210
        this.$proTF.size = 18;

        this.$exProTF = new egret.TextField();
        this.addChild(this.$exProTF);
        this.$exProTF.x = 92+28;
        this.$exProTF.y = 82+12;
        this.$exProTF.size = 18;
        this.$exProTF.textColor = 0x00aa00;
        this.$nameTF.fontFamily = this.$proTF.fontFamily = this.$exProTF.fontFamily = Strings.DEFAULT_FONT_NAME;

        this.$strBtn = new egret.Bitmap();
        this.addChild(this.$strBtn);
        this.$strBtn.texture = RES.getRes("qianghuaanniu")
        this.$strBtn.x = 312+28;
        this.$strBtn.name = "strBtn"


        this.$equiBtn = new egret.Bitmap();
        this.addChild(this.$equiBtn);
        this.$equiBtn.x = 444+28;
        this.$equiBtn.name = "equipBtn"
        this.$equiBtn.texture = RES.getRes("zhuangbeianniu")
        this.$strBtn.y =this.$equiBtn.y = 16+12;
        this.$strBtn.touchEnabled = this.$equiBtn.touchEnabled = true

        this.$nameFlag = new egret.Bitmap();
        this.addChild(this.$nameFlag);
    }
}

class EquipItemRenderer extends egret.gui.ItemRenderer {
    public constructor(){
        super();
        this.skinName = EquipItem;
        this.touchChildren = true;
    }
    public dataChanged():void{
        <EquipItem>this.skin.format(this.data.data);
    }
}