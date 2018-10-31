/*
* name;
*/
class DBChapter{
    private static _cfg:any;
    constructor(){

    }

    public static getChapInfo(id:any):{name:string, id:number, cfg:string}{
        return this.cfg[id];
    }

    /** */
    public static getChapList():any[]{
        let list:any[] = [];
        for(let i in this.cfg){
            list.push(this.cfg[i]);
        }
        return list.sort(onSort);;

        function onSort(v1:any, v2:any):number{
            if(v1.id < v2.id){
                return -1;
            }else if(v1.id > v2.id){
                return 1;
            }
            return 0;
        }
    }
    
    private static get cfg():any{
        if(!this._cfg){
            this._cfg  = {
                1:{name:"xx1", id:1, cfg:"chap_0"},
                2:{name:"xx2", id:2, cfg:"chap_1"},
                3:{name:"xx3", id:3, cfg:"chap_2"}
            };
        }
        return this._cfg;
    }
}