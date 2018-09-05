/*
* name;
*/
class UserReq{
    constructor(){

    }

    public static getUserInfo(cb:Handler):void{
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
        cb.run();
    }


    private static createUser():any{
        return {
            name:"xiaohuzi999", 
            pic:"",
            money:0, 
            diamond:0
        };
    }

    private static createRole():any{
        return new Role();
    }
}