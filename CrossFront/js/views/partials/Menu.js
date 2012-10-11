var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    
    var MenuView = (function (_super) {
        __extends(MenuView, _super);
        function MenuView($el, collection, options) {
                _super.call(this);
            this.$el = $el;
            this.collection = collection;
        }
        MenuView.prototype.initialize = function () {
            console.log("Menu partial view init.");
        };
        MenuView.prototype.render = function () {
            $(this.$el).html('<b>hello from the view</b>');
            coll = this.collection;
            var strContent;
            $.each(coll.models, function (i, model) {
                console.log(model.get('text') + " : " + model.get('url'));
            });
            $(this.$el).html(strContent);
            return this;
        };
        return MenuView;
    })(Backbone.View);
    exports.MenuView = MenuView;    
    ; ;
})

