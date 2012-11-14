var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    // Our basic MenuItem model has text, url, and acitve params
    var MenuItem = (function (_super) {
        __extends(MenuItem, _super);
        function MenuItem() {
            _super.apply(this, arguments);

        }
        MenuItem.prototype.defaults = // Defaults
        function () {
            return {
                text: 'google',
                url: 'www.google.com',
                active: false,
                id: 1
            };
        }// Initialize
        ;
        MenuItem.prototype.initialize = function () {
            console.log("MenuItem Model init'ed.");
        }// Validate
        ;
        MenuItem.prototype.validate = function (attrs) {
            if(_.isEmpty(attrs.text)) {
                return "text is required.";
            }
            if(_.isEmpty(attrs.url)) {
                return "url is required.";
            }
            return "";
        }// Methods
        // Toggle the `active` state of this MenuItem.
        ;
        MenuItem.prototype.toggleActive = function () {
            var active = this.get('active');
            if(active == true) {
            } else {
            }
        };
        return MenuItem;
    })(Backbone.Model);
    exports.MenuItem = MenuItem;    
    ; ;
    ; ;
})

