var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    var PageOne = (function (_super) {
        __extends(PageOne, _super);
        function PageOne(el, collection, options) {
                _super.call(this);
            this.el = el;
        }
        PageOne.prototype.initialize = function () {
            console.log("Page one view init'd");
        };
        PageOne.prototype.render = function () {
            $el = this.el;
            var tmpl = require([
                "text!../../../templates/pages/One.html!strip"
            ], function (html) {
                var compiled_template = _.template(html);
                $el.html(compiled_template()).trigger('create');
                return this;
            });
            return tmpl;
            console.log("completed page one render");
        };
        return PageOne;
    })(Backbone.View);
    exports.PageOne = PageOne;    
    ; ;
})

