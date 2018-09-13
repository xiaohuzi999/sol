/*
* name;
*/
class FightAniUtils{

    public static attack(target:Laya.Sprite, cb:Handler):void{
        Laya.Tween.to(target, {scaleX:1.2, scaleY:1.2}, 200, null, Laya.Handler.create(null, ()=>{
            target.scale(1,1);
            Laya.timer.once(500, null, ()=>{
                cb.run();
            })
        }));
    }

    public static beAttacked(target:Laya.Sprite):void{
        let index:number = 0;
        Laya.timer.loop(32, null, onAttacked);

        function onAttacked():void{
            if(target.alpha == 0.5){
                target.alpha = 1;
            }else{
                target.alpha = 0.5;
            }
            index ++;
            if(index > 5){
                Laya.timer.clear(null, onAttacked);
            }
        }
    }

    public static die(target:Laya.Sprite, item:Laya.Sprite):void{
        let index:number = 0;
        Laya.timer.loop(32, null, onAttacked);

        function onAttacked():void{
            if(target.alpha == 0.5){
                target.alpha = 1;
            }else{
                target.alpha = 0.5;
            }
            index ++;
            if(index > 5){
                Laya.timer.clear(null, onAttacked);
                Laya.Tween.to(item, {alpha:0}, 100, null, Laya.Handler.create(item, item.removeSelf));
            }
        }
    }
}