var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports"], function(require, exports) {
    var Todo = (function (_super) {
        __extends(Todo, _super);
        function Todo() {
            _super.apply(this, arguments);

        }
        Todo.prototype.defaults = function () {
            return {
                content: 'Default Thing to do'
            };
        };
        Todo.prototype.initialize = function () {
            console.log("Todo Model init'ed.");
        };
        Todo.prototype.validate = function (attrs) {
            if(_.isEmpty(attrs.content)) {
                return "Content is required.";
            }
            return "";
        };
        return Todo;
    })(Backbone.Model);
    exports.Todo = Todo;    
    ; ;
    ; ;
})

//@ sourceMappingURL=Todo.js.map
