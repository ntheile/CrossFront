var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", 'utils/Utils'], function(require, exports, __Utils__) {
    
    var Utils = __Utils__;

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
            var that = this;
            //grab the template (we must do this in init and not in render to avoid issues)
            Utils.Utils.Load('partials/menu', function (tmpl) {
                that.template = _.template(tmpl);
                that.render();
            });
            //this.template = _.template('poo<ul class="navmenu" data-role="listview"><% _.each( results, function( item, i ){ %><li><a href="<%= item.get("url") %>" target="_blank"><%= item.get("text") %></a></li> <% }); %></ul>');
                    };
        MenuView.prototype.render = function () {
            console.log("menu partial view in render");
            // assign these varaibles to the declared variables up top to make them global to this module
            // Also so they can be used in the require() below
            $el = this.el;
            coll = this.collection;
            //use the template
            var html = this.template({
                results: coll.models
            });
            $el.html(html).trigger('create');
            $el.html(html).trigger('create');
            return this;//return tmpl for chainable calls, like .render().el
            
        }// Require params to be passed in when an instance of this is created (aka new'd up)
        // Required: el, collection
        ;
        return MenuView;
    })(Backbone.View);
    exports.MenuView = MenuView;    
})

//@ sourceMappingURL=Menu.js.map
