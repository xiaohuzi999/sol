/**
 * Created by ���ӼӼ� on 2015/10/14.
 * ����˷���code����
 */
class DBMessage{
    //
    private static msgData:any;

    /** ������������Codeֵ */
    public static NORMAL:number = 0;
    /** ��Ҳ��� */
    public static NO_COIN:number = 2;
    /** ��ȯ���� */
    public static NO_POINT:number = 3;
    /** û�е�¼ */
    public static NO_LOGIN:number = 22;
    /** û��ע�� */
    public static NO_REGISTER:number = 21;
    /**�����ط���½*/
    public static COOKIE_OUT:number = 24;

    /**
     * ��ȡ��ʾ
     * @param code ����˷���code;
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
