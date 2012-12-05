define(["require", "exports"], function(require, exports) {
    //namespaces
    (function (Utils) {
        function Load(tmplName, callback) {
            var name = tmplName;
            console.log('Loading template: ' + name);
            $.get('templates/' + name + '.html', function (data) {
                callback(data);
            });
            return this;
        }
        Utils.Load = Load;
    })(exports.Utils || (exports.Utils = {}));

})

//@ sourceMappingURL=Utils.js.map
