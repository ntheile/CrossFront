var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu(options) {
            this.url = "/api/Menu.html";
                _super.call(this, options);
        }
        Menu.prototype.initialize = function () {
            console.log("Menu init'd");
        };
        return Menu;
    })(Backbone.Collection);
    exports.Menu = Menu;    
    ; ;
})

