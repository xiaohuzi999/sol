/**
 * Created by Administrator on 15-5-30.
 */
class UserModel{
    /**名字*/
    public static NAME:string = "user_v0820";
    /**配置*/
    public static HEROS:RoleVo[] =[];
    //不可对话的伴侣列表
    private static fixedHeros:string[] = ["殷血歌", "乌木"];
    //体力回复时间
    private static RECOVER_TIME:number = 180000;//
    //购买体力需要的功绩
    private static BUY_POINTS:number[] = [20,20,50,50,50,100,100,100,200,200];
    //是否体力恢复中
    private static _recovering:boolean = false;
    private static _recoverId:number;
    private static FIRST:string[] = ["左丘","祖","邹","宗","訾","子车","卓","庄","颛孙","祝","周","仲孙","钟离","钟","终","郑","赵","仉督","长孙","章","湛","臧","宰","云","岳帅","袁","元","宇文","俞","鱼","于","有琴","游","雍","应","印","易","伊","叶","姚","养","仰","杨","羊","晏","阎","严","闫法","荀","薛","宣","轩辕","许","徐","胥","须","宿","熊","幸","邢","辛","谢","项","咸","鲜于","夏侯","夏","席","奚","郗","武","伍","吴","毋","邬","沃","翁","闻人","文","温","魏","王","汪","万","拓拔","屠","涂钦","通","田","滕","陶","汤","谭","孙","宋","松","俟","司寇","司空","水","双","束","舒","殳","寿","史","石","施","慎","沈","申屠","申","佘佴","韶","沙","融","容","荣","任","壤驷","冉","全","瞿","屈","裘","秋","邱","谯笪","亓官","漆雕","戚","濮阳","蒲","平","皮","蓬","彭","裴","庞","欧阳","牛","宁","聂","乜","年爱","南门","南宫","那","穆","慕","牧","缪","明","宓","糜","梅","马","吕","骆","罗","路","逯","陆","隆","龙","柳","刘","凌","蔺","林","廖","粱","梁丘","利","李","冷","雷","乐正","乐","劳","赖","夔","况後","匡","蒯","空"]
    private static NAMES:string[] = ["子真","子石","子明","子晋","子昂","子安","智志","志用","志业","志国","正真","正业","正青","正浩","正德","哲圣","哲茂","展鹏","泽宇","元洲","元勋","元纬","玉韵","玉宇","语堂","雨星","雨伯","宇寰","宇达","永逸","永言","永春","永昌","英喆","英耀","英朗","英光","英才","英博","意远","逸明","宜修","烨烁","烨霖","烨华","阳羽","阳煦","阳嘉","阳波","阳冰","阳飇","雅逸","雅珺","雪峰","学义","学名","修永","修雅","修平","修明","兴学","兴怀","兴发","兴安","星宇","星文","星纬","鑫磊","新觉","欣悦","欣然","心思","向明","向晨","文轩","文滨","文彬","温纶","伟志","伟晔","伟宸","泰然","绍祺","睿博","荣轩","擎苍","祺祥","祺福","奇致","奇志","奇逸","奇文","奇迈","鹏云","鹏鲸","彭湃","明哲","明轩","良吉","力行","乐湛","乐音","乐贤","乐康","乐成","康胜","凯乐","开济","俊雄","俊健","俊风","景明","景澄","经艺","经纬","建章","建德","嘉珍","嘉纳","季同","华皓","鸿福","宏胜","宏深","宏恺","弘义","浩气","浩阔","翰藻","光亮","光辉","高爽","高寒","飞英","飞文","德元","承弼","成化","曾琪","才良","才捷","博文","博实","宾实","安澜","倧","州","中","长","泽","枣","原","友","永","宜","沂","依","阳","巡","兴","邢","瑎","象","响","夏","溪","锡","武","吴","托","思","水","树","熟","实","石","山","芮","任","泉","启","旗","浦","盘","瓯","宁","尼","淖","南","密","门","陆","龙"];
    /**创建存档*/
    public static create():string{
        var data:any =
        { "userName":"殷血歌",
            "pic":"",
            "userId" : GUID.create(),
            "lv":1,
            "exp":0,
            "money":8000,
            "point":0,
            "giftPoint":0,
            "stamina":100,
            "kpi":0
        };
        /**需要一个公式支持*/
        var info:any = UserModel.getHeroData("殷血歌");
        data.role = new RoleVo({
            "roleId":GUID.create()
            }
        );
        data.role.setValue(info);
        data.team = new Array();
        return JSON.stringify(data);
    }

    /**随机名字*/
    public static RDName():string{
        var rnd:number = Math.floor(Math.random()*UserModel.FIRST.length);
        var str:string = UserModel.FIRST[rnd];
        rnd = Math.floor(Math.random()*UserModel.NAMES.length);
        str += UserModel.NAMES[rnd];
        return str;
    }

    /**获取英雄数据*/
    public static getHeroData(heroName:string):any{
        for(var i in UserModel.HEROS){
            if(UserModel.HEROS[i].roleName == heroName){
                return UserModel.HEROS[i];
            }
        }
        return null;
    }

    /**获取角色*/
    public static getRole(roleId):RoleVo{
        if(User.getInstance().role.roleId == roleId){
            return User.getInstance().role
        }
        for(var i:number=0; i<User.getInstance().team.length; i++){
            if(User.getInstance().team[i].roleId == roleId){
                return User.getInstance().team[i]
            }
        }
        return null;
    }

    /**根据角色名获取角色ID*/
    public static getRoleByName(roleName:string):RoleVo{
        if(User.getInstance().role.roleName == roleName){
            return User.getInstance().role
        }
        for(var i:number=0; i<User.getInstance().team.length; i++){
            if(User.getInstance().team[i].roleName == roleName){
                return User.getInstance().team[i]
            }
        }
        return null;
    }

    /**加入队伍*/
    public static joinTeam(name:string):void{
        var user:User = User.getInstance();
        var hero:RoleVo;
        var num:number = 0;
        for(var i:number=0; i<user.team.length; i++){
            if(user.team[i].state == 1){
                num ++;
            }
            if(user.team[i].roleName == name){
                hero =user.team[i];
            }
        }
        if(!hero){
            hero = new RoleVo();
            hero.setValue(UserModel.getHeroData(name));
            hero.roleId = GUID.create();
            if(num < 3){
                hero.state = 1;
            }else{
                hero.state = 0;
            }

            user.team.push(hero);
        }

        //植入新手引导====================================================
        if(!Guide.hasFinishedGuid(Guide.LADDER_GUIDE) && Guide.curGuide instanceof LadderGuide){
            egret.setTimeout(function(){
                Guide.curGuide.over()
            }, this,20);
            User.getInstance().guideList.push(Guide.LADDER_GUIDE);
        }

        UserModel.save();
        UserModel.updateKpi();
    }

    /**离开队伍*/
    public static leftTeam(name:string):void{
        var user:User = User.getInstance();
        var hero:RoleVo;
        for(var i:number=0; i<user.team.length; i++){
            if(user.team[i].roleName == name){
                hero =user.team[i];
                break;
            }
        }
        if(hero){
            hero.state = 0;
            BagModel.unEquip(hero);
        }
        UserModel.save();
        UserModel.updateKpi();
    }

    /**更新KPI*/
    public static updateKpi():void{
        var kpi:number = Utils.caculateRolKpi(User.getInstance().role);
        for(var i:number=0; i<User.getInstance().team.length; i++){
            if(User.getInstance().team[i].state == 1){
                kpi += Utils.caculateRolKpi(User.getInstance().team[i]);
            }
        }
        User.getInstance().kpi = Math.round(kpi);
    }

    /**切换焦点后更新体力*/
    public static updateStaminaForAct():void{
        if(UserModel._recovering){
            egret.clearTimeout(UserModel._recoverId);
            UserModel._recovering = false;
            UserModel.updateStamina(0);
        }
    }

    /**
     * 更新体力----
     * @param v体力
     */
    public static updateStamina(v:number, needSave:boolean=true):void{
        User.getInstance().stamina += v;
        //计算回复时间---
        var time:number = new Date().getTime();
        if(User.getInstance().resumeStaminaTime < 0){
            //console.log("first---");
            if(!UserModel._recovering && User.getInstance().stamina < User.getInstance().staminaMax){
                User.getInstance().resumeStaminaTime = time;
                UserModel._recovering = true;
                UserModel._recoverId = egret.setTimeout(UserModel.recoverStamina, UserModel, UserModel.RECOVER_TIME);
            }
        }else{
            if(!UserModel._recovering) {
                //console.log("comeOn---");
                var delTime:number = time - User.getInstance().resumeStaminaTime;
                User.getInstance().stamina += Math.floor(delTime/UserModel.RECOVER_TIME);
                if(User.getInstance().stamina >= User.getInstance().staminaMax){//体力已满
                    User.getInstance().stamina = User.getInstance().staminaMax;
                    User.getInstance().resumeStaminaTime = -1
                }else{
                    UserModel._recovering = true;
                    User.getInstance().resumeStaminaTime = time - delTime%UserModel.RECOVER_TIME;
                    UserModel._recoverId = egret.setTimeout(UserModel.recoverStamina, UserModel, UserModel.RECOVER_TIME - delTime%UserModel.RECOVER_TIME);
                }
            }
        }
        if(needSave){
            UserModel.save();
        }
    }

    private static recoverStamina():void{
        UserModel._recovering = false;
        User.getInstance().stamina ++;
        if(User.getInstance().stamina >= User.getInstance().staminaMax){//体力已满
            User.getInstance().stamina = User.getInstance().staminaMax;
            User.getInstance().resumeStaminaTime = -1;
        }else{
            UserModel._recovering = true;
            UserModel._recoverId = egret.setTimeout(UserModel.recoverStamina, UserModel, UserModel.RECOVER_TIME);
        }
        UserModel.save();
    }

    //购买体力
    public static buyStamina():void{
        var d1:Date = new Date(User.getInstance().staminaBuyTime);
        var d2:Date = new Date();
        if(d1.getFullYear() != d2.getFullYear() || d1.getMonth() != d2.getMonth() || d1.getDate() != d2.getDate()){//重置购买次数
            User.getInstance().staminaBuyTimes = 0;
        }else if(User.getInstance().staminaBuyTimes >= 9){
            XTip.showTip("抱歉~您今日的购买次数已满，明天再来哦~");
            return;
        }
        var point:number = UserModel.BUY_POINTS[User.getInstance().staminaBuyTimes];
        XAlert.show("购买100体力需要"+point+"功绩", UserModel.confirmBuy, null, UserModel)
    }

    private static confirmBuy():void{
        var point:number = UserModel.BUY_POINTS[User.getInstance().staminaBuyTimes];
        if(User.getInstance().point < point){
            XTip.showTip(Strings.POINT_NOT_ENOUGH);
            return;
        }
        if(User.getInstance().stamina >= User.getInstance().staminaMax){
            XTip.showTip("您现在体力充沛，不需要补充~");
            return;
        }
        User.getInstance().point -= parseInt(point+"");
        var type:string = "Buy Stamina";
        UserRequest.cosumePoint(parseInt(point+""),type,null, null);
        User.getInstance().stamina += 100;
        User.getInstance().staminaBuyTimes ++;
        User.getInstance().staminaBuyTime = new Date().getTime();
        UserModel.save();
    }

    /**初始化伴侣*/
    public static initHero(str:string):void{
        var data:any = JSON.parse(str);
        var vo:RoleVo;
        for(var i in data){
            vo = new RoleVo();
            vo.setValue(data[i]);
            UserModel.HEROS.push(vo);
        }
    }

    /**获取对话的伴侣列表--特殊化*/
    public static getExchangeHeroList():RoleVo[]{
        var list:RoleVo[] = new Array();
        for(var i:number=0; i<UserModel.HEROS.length; i++){
            if(UserModel.fixedHeros.indexOf(UserModel.HEROS[i].roleName) == -1){
                list.push(UserModel.HEROS[i]);
            }
        }
        return list;
    }

    /**获取packId奖励列表*/
    public static getPrizeData(){
        var prizeData = RES.getRes("prizeData");
        var list = JSON.parse( prizeData );
        return list;
    }

    /**获取数据/存档*/
    public static getData():string{
        var data = egret.localStorage.getItem(UserModel.NAME);
        data = JSON.parse(data);
        return data[User.getInstance().userId];
    }

    /**存档*/
    public static save(saveAtOnce:boolean= false):void{
        var info:any = User.getInstance().getJsonValue();
        var key:string = User.getInstance().userId;
        var temp:any = {};
        temp[key] = info;
        //console.log("存档",info);
        egret.localStorage.setItem(UserModel.NAME, JSON.stringify(temp));
        if(saveAtOnce){
            UserRequest.save(null, null);
        }else{
            UserRequest.callToSave();
        }
    }
}
