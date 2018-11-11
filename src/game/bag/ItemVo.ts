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
    public quality:number = 0;
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
    /**类型-武器 */
    public static readonly WEAPON:number = 2;
    /**类型-衣服 */
    public static readonly CLOTH:number = 3;
    /**类型-鞋子 */
    public static readonly SHOES:number = 4;
    /**类型-饰品 */
    public static readonly JEWEL:number = 5;

    constructor(){
    }
}