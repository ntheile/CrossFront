var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    
    // collection of the MenuItem model
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu(options) {
            // This code runs when you create a new instance of Menu
            //this.url = "api/Menu.html";
            this.url = "http://crossfront-backend.apphb.com/api/Menu";
                _super.call(this, options);
        }
        Menu.prototype.initialize = function () {
            console.log("Menu init'd");
        };
        Menu.prototype.sync = function (method, model, options) {
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: this.url,
                processData: false
            }, options);
            return $.ajax(params);
        }//parse(response){
        //   return response.Todos
        //}
        // You can pass anything in when this is new'd up
        ;
        return Menu;
    })(Backbone.Collection);
    exports.Menu = Menu;    
    ; ;
})

