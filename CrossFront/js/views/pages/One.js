var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    // simple Page view for Page One
    var PageOne = (function (_super) {
        __extends(PageOne, _super);
        function PageOne(el, collection, options) {
            // run this code when it's new'd up
                _super.call(this);
            this.el = el;
        }
        PageOne.prototype.initialize = function () {
            console.log("Page one view init'd");
        };
        PageOne.prototype.render = function () {
            // assign these varaibles to the declared variables up top to make them global to this module
            // Also so they can be used in the require() below
            ///
            /// get the page template widget ///
            ///
            $el = this.el;
            //grab the template and inject the json data into the DOM element, pass back to self variable so we can return it for chaining.
            var tmpl = require([
                "text!../../../templates/pages/One.html!strip"
            ], function (html) {
                var compiled_template = _.template(html);
                $el.html(compiled_template()).trigger('create');
                //return this;
                            });
            //return tmpl for chainable calls, like .render().el
            //return tmpl;
            ///
            /// get the menu widget ///
            ///
            console.log("completed page one render");
            //$(this.el).html("<h2>Welcome to Page One</h2>");
            // /return this;
                    };
        return PageOne;
    })(Backbone.View);
    exports.PageOne = PageOne;    
    ; ;
})

