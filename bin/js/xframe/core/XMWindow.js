var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var xframe;
(function (xframe) {
    /**模式窗口，默认不可穿透 */
    var XMWindow = /** @class */ (function (_super) {
        __extends(XMWindow, _super);
        function XMWindow() {
            var _this = _super.call(this) || this;
            //蒙板颜色
            _this._bgColor = "#000000";
            //蒙板透明都
            _this._bgAlpha = 0.01;
            //是否模式窗口状态,默认模式窗口，不可穿透
            _this._isModel = true;
            //是否可以点空白区域关闭，只有在模式窗窗口下有效,如果覆盖addEventListener,需要调用super.addEventListener();
            _this._closeOnBlank = false;
            _this._layer = xframe.LayerManager.LAYER_POP;
            _this._align = xframe.LayerManager.ALIGN_CENTER;
            _this.bg.alpha = _this._bgAlpha;
            return _this;
        }
        XMWindow.prototype.onStageResize = function () {
            this.bg.size(Laya.stage.width, Laya.stage.height);
            xframe.LayerManager.setPosition(this, this._align);
        };
        /**
         * 显示
         */
        XMWindow.prototype.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.show.call(this);
            if (!this.bg.displayedInStage) {
                this.parent.addChildAt(this.bg, this.parent.getChildIndex(this));
                this.bg.size(Laya.stage.width, Laya.stage.height);
                this.bg.graphics.clear();
                this.bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this._bgColor);
            }
        };
        /**关闭*/
        XMWindow.prototype.close = function () {
            this.bg.removeSelf();
            _super.prototype.close.call(this);
        };
        Object.defineProperty(XMWindow.prototype, "isModel", {
            /**是否模式窗口状态*/
            get: function () {
                return this._isModel;
            },
            /**是否模式窗口状态*/
            set: function (v) {
                this._isModel = v;
                this.bg.visible = this._isModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XMWindow.prototype, "closeOnBlank", {
            get: function () {
                return this._closeOnBlank;
            },
            set: function (v) {
                this._closeOnBlank = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(XMWindow.prototype, "bg", {
            /**取得蒙板对象*/
            get: function () {
                if (!this._bg) {
                    this._bg = new Laya.Component();
                    this._bg.mouseEnabled = true;
                }
                return this._bg;
            },
            enumerable: true,
            configurable: true
        });
        XMWindow.prototype._onClick = function () {
            if (this._closeOnBlank) {
                this.close();
            }
        };
        XMWindow.prototype.createUI = function () {
        };
        XMWindow.prototype.addEventListener = function () {
            this.bg.on(Laya.Event.CLICK, this, this._onClick);
        };
        XMWindow.prototype.removeEventListener = function () {
            this.bg.off(Laya.Event.CLICK, this, this._onClick);
        };
        return XMWindow;
    }(xframe.XWindow));
    xframe.XMWindow = XMWindow;
})(xframe || (xframe = {}));
//# sourceMappingURL=XMWindow.js.map