var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    
    var IndexView = (function (_super) {
        __extends(IndexView, _super);
        function IndexView() {
            _super.apply(this, arguments);

        }
        IndexView.prototype.initialize = function () {
            var me = this;
            console.log("Index view init.");
        };
        IndexView.prototype.render = function () {
            console.log("rendered the index view");
        };
        return IndexView;
    })(Backbone.View);
    exports.IndexView = IndexView;    
    ; ;
})

