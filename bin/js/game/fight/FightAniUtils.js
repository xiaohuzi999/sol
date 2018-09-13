/*
* name;
*/
var FightAniUtils = /** @class */ (function () {
    function FightAniUtils() {
    }
    FightAniUtils.attack = function (target, cb) {
        Laya.Tween.to(target, { scaleX: 1.2, scaleY: 1.2 }, 200, null, Laya.Handler.create(null, function () {
            target.scale(1, 1);
            Laya.timer.once(500, null, function () {
                cb.run();
            });
        }));
    };
    FightAniUtils.beAttacked = function (target) {
        var index = 0;
        Laya.timer.loop(32, null, onAttacked);
        function onAttacked() {
            if (target.alpha == 0.5) {
                target.alpha = 1;
            }
            else {
                target.alpha = 0.5;
            }
            index++;
            if (index > 5) {
                Laya.timer.clear(null, onAttacked);
            }
        }
    };
    FightAniUtils.die = function (target, item) {
        var index = 0;
        Laya.timer.loop(32, null, onAttacked);
        function onAttacked() {
            if (target.alpha == 0.5) {
                target.alpha = 1;
            }
            else {
                target.alpha = 0.5;
            }
            index++;
            if (index > 5) {
                Laya.timer.clear(null, onAttacked);
                Laya.Tween.to(item, { alpha: 0 }, 100, null, Laya.Handler.create(item, item.removeSelf));
            }
        }
    };
    return FightAniUtils;
}());
//# sourceMappingURL=FightAniUtils.js.map