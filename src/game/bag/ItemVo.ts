/*
* name;
*/
class ItemVo{
    //item id
    public id:number;
    //unique id;
    public uid:string;
    //item num;
    public num:number
    // item name;
    public name: string;
    // item price
    public price:number;
    //ex property for strength or sth;
    public value: any;
    //max number of the item;
    public max:number;
    //item property, usally for equipment;
    public property:{hp?:number, attak?:number, dodge?:number, crit?:number, physique?:number, agility?:number, strength?:number};
    //item type
    public type:number;
    // item icon file name;
    public icon:number;
    //item desc;
    public desc:string

    /**类型-道具 */
    public static readonly ITEM:number = 1;
    /**类型 */
    public static readonly EQUIP:number = 2;

    constructor(){
    }
}