var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", "collections/Menu", "views/partials/Menu"], function(require, exports, __Collection__, __PartialView__) {
    
    var Collection = __Collection__;

    var PartialView = __PartialView__;

    // simple view in the grid list of a contact
    var IndexView = (function (_super) {
        __extends(IndexView, _super);
        function IndexView() {
            _super.apply(this, arguments);

        }
        IndexView.prototype.initialize = function () {
            var me = this;
            console.log("Index view init.");
            ////
            //// Collection and Partial View Test /////////////////////////////////////////////////////////
            ////
            // Get a collection of menu items
            menu = new Collection.Menu();
            menu.fetch({
                success: function () {
                    console.log(menu.models)// => 2 (collection have been populated)
                    ;
                    // Fetches, Sets up and injects a side menu partial view into the DOM for the sidemenu class
                    //var menuview = new PartialView.MenuView(  $('.sidemenu'), menu  ).render();
                    var menuview = new PartialView.MenuView($('.sidemenu'), menu);
                }
            });
        };
        IndexView.prototype.render = function () {
            console.log("rendered the index view");
            return this;
        };
        return IndexView;
    })(Backbone.View);
    exports.IndexView = IndexView;    
    ; ;
})

//@ sourceMappingURL=index.js.map
