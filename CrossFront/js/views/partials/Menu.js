var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    
    var MenuView = (function (_super) {
        __extends(MenuView, _super);
        function MenuView(el, collection, options) {
                _super.call(this);
            this.el = el;
            this.collection = collection;
        }
        MenuView.prototype.initialize = function () {
            console.log("Menu partial view init.");
        };
        MenuView.prototype.render = function () {
            $el = this.el;
            coll = this.collection;
            var tmpl = require([
                "text!../../../templates/partials/Menu.html!strip"
            ], function (html) {
                var compiled_template = _.template(html);
                $el.html(compiled_template({
                    results: coll.models
                })).trigger('create');
                return this;
            });
            return tmpl;
        };
        return MenuView;
    })(Backbone.View);
    exports.MenuView = MenuView;    
})

