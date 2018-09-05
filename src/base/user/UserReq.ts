/*
* name;
*/
class UserReq{
    constructor(){

    }

    public static getUserInfo(cb?:Handler):void{
        let userInfo:any = XDB.getData(XDB.USER);
        if(userInfo){
            userInfo = JSON.parse(userInfo);
        }else{
            //create user
            userInfo = this.createUser();
            //create role
            //create bag
        }
        User.getInstance().update(userInfo);
        cb && cb.run();
    }


    private static createUser():any{
        return {
            name:"xiaohuzi999", 
            pic:"",
            money:0, 
            diamond:6,
            power:10
        };
    }

    private static createRole():any{
        return new Role();
    }
}