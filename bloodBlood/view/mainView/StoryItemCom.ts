/**
 * Created by 马达加加加 on 2015/5/28.
 */
class StoryItemCom extends egret.DisplayObjectContainer {
    
    private $nameTF:egret.TextField;
    private $chapterNameTF:egret.TextField;
    private $passConditionTF:egret.TextField;
    private $flag:egret.Bitmap;
    private $bg:egret.Bitmap;
    //新旧标志
    private $flagBM:egret.Bitmap;
    //扫荡
    private $onceBtn:egret.Bitmap;
    public  data:any;
    
    public constructor(){
        super();
        this.init();
    }

    /**格式化数据*/
    public setData(v:any, isNew:boolean = false):void{
        this.data = v;
        if(FightModel.FIGHT_MODE == "ex"){
            this.$nameTF.x = 86;
            this.$chapterNameTF.text = "";
            this.$nameTF.text = v.storyName+"（精英）";
            this.$bg.texture = RES.getRes("exBG");
            this.$flagBM.texture = null;
            this.$nameTF.textColor= 0xffffff;
            this.$passConditionTF.textColor = 0x9a9a99;
            this.$onceBtn.texture = RES.getRes("exFight");
        }else{
            this.$nameTF.x = 76;
            this.$chapterNameTF.text = "关卡" + (v.storyId + 1);
            this.$nameTF.text = v.storyName;
            this.$bg.texture = RES.getRes("duihuakuang3");
            this.$nameTF.textColor= 0x5A3311;
            this.$chapterNameTF.textColor = 0xC4091E;
            this.$passConditionTF.textColor = 0xFDECC0;
            if(isNew){
                this.$flagBM.texture = RES.getRes("xin");
            }else{
                this.$flagBM.texture = RES.getRes("yitongguan");
            }
            this.$onceBtn.texture = null;
        }
        if(v.type == 0){
            this.$flag.visible = false;
            this.$passConditionTF.text = "";
        }else{
            if(FightModel.FIGHT_MODE == "ex"){
                this.$flag.visible = false;
            }else{
                this.$flag.visible = true;
            }
            this.$passConditionTF.text = Strings.PASS_CONDITION+this.data.condition;
            if(!isNew){
                /*if(!this.$onceBtn){
                    this.$onceBtn = new egret.Bitmap();
                    this.addChild(this.$onceBtn);
                    this.$onceBtn.x = 400;
                    this.$onceBtn.y =20;
                    this.$onceBtn.texture = RES.getRes("saodang");
                }*/
            }
        }
    }

    private init():void{
        var bm:egret.Bitmap = new egret.Bitmap();
        this.addChild(bm);
        bm.texture = RES.getRes("duihuakuang3");
        bm.x = 40;
        bm.y = 18;
        this.$bg = bm;

        bm = new egret.Bitmap();
        bm.texture = RES.getRes("tiao2");
        this.addChild(bm);
        bm.x = 59;
        bm.y = 79;
        this.$flag = bm;

        this.$nameTF = new egret.TextField();
        this.addChild(this.$nameTF);
        this.$nameTF.text = "嫡子";
        this.$nameTF.size = 24;
        this.$nameTF.textColor= 0x5A3311;
        this.$nameTF.x = 76;
        this.$nameTF.y = 50;
        this.$nameTF.bold = true;

        this.$chapterNameTF = new egret.TextField();
        this.addChild(this.$chapterNameTF);
        this.$chapterNameTF.x = 76;
        this.$chapterNameTF.size = 18;
        this.$chapterNameTF.textColor = 0xC4091E;
        this.$chapterNameTF.y = 6+18;

        this.$passConditionTF = new egret.TextField();
        this.addChild(this.$passConditionTF);
        this.$passConditionTF.x = 76;
        this.$passConditionTF.y = 69+18;
        this.$passConditionTF.size = 18;
        this.$passConditionTF.textColor = 0xFDECC0;

        this.$nameTF.fontFamily = this.$chapterNameTF.fontFamily = this.$passConditionTF.fontFamily = Strings.DEFAULT_FONT_NAME;
        this.touchEnabled = true;

        this.$flagBM = new egret.Bitmap();
        this.addChild(this.$flagBM);

        this.$onceBtn = new egret.Bitmap();
        this.addChild(this.$onceBtn);
        this.$onceBtn.x = 426;
        this.$onceBtn.y = 54;
    }
}

/**
 * Render
 * */
class StoryItemRender extends egret.gui.ItemRenderer{
    public constructor(){
        super();
        this.skinName = StoryItemCom;
        this.touchChildren = true;
    }
    public dataChanged():void{
        <StoryItemCom>this.skin.setData(this.data.data, this.data.isNew);
    }
}