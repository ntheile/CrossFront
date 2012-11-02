var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    
    // simple partial view for the Menu widget
    var MenuView = (function (_super) {
        __extends(MenuView, _super);
        function MenuView(el, collection, options) {
            // run this code when it's new'd up
                _super.call(this);
            this.el = el;
            this.collection = collection;
        }
        MenuView.prototype.initialize = function () {
            console.log("Menu partial view init.");
        };
        MenuView.prototype.render = function () {
            // assign these varaibles to the declared variables up top to make them global to this module
            // Also so they can be used in the require() below
            $el = this.el;
            coll = this.collection;
            //grab the template and inject the json data into the DOM element, pass back to self variable so we can return it.
            var tmpl = require([
                "text!../../../templates/partials/Menu.html!strip"
            ], function (html) {
                var compiled_template = _.template(html);
                $el.html(compiled_template({
                    results: coll.models
                })).trigger('create');
                return this;
            });
            //return tmpl for chainable calls, like .render().el
            return tmpl;
        }// Require params to be passed in when an instance of this is created (aka new'd up)
        // Required: el, collection
        ;
        return MenuView;
    })(Backbone.View);
    exports.MenuView = MenuView;    
})

