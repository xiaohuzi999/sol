/**
 * Created by 马达加加加 on 2015/10/14.
 * 服务端返回code解析
 */
class DBMessage{
    //
    private static msgData:any;

    /** 正常返回数据Code值 */
    public static NORMAL:number = 0;
    /** 金币不足 */
    public static NO_COIN:number = 2;
    /** 点券不足 */
    public static NO_POINT:number = 3;
    /** 没有登录 */
    public static NO_LOGIN:number = 22;
    /** 没有注册 */
    public static NO_REGISTER:number = 21;
    /**其他地方登陆*/
    public static COOKIE_OUT:number = 24;

    /**
     * 获取提示
     * @param code 服务端返回code;
     * */
    public static getMsg(code:any):string{
        if(!DBMessage.msgData){
            DBMessage.msgData = RES.getRes("message").MessageCode;
        }
        for(var i in DBMessage.msgData){
            if(DBMessage.msgData[i].K == code){
                return DBMessage.msgData[i].V;
            }
        }
        return '';
    }

    //

}
