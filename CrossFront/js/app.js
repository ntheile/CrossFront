define(["require", "exports", "models/MenuItem"], function(require, exports, __Model__) {
    var Model = __Model__;

    var menuitem = new Model.MenuItem({
        text: 'bing',
        url: 'http://www.bing.com'
    });
    console.log(menuitem.get('text'));
    console.log(menuitem.get('url'));
    menuitem.set({
        text: "yahoo",
        url: "http://www.yahoo.com"
    });
    console.log(menuitem.get('text'));
    console.log(menuitem.get('url'));
    $(document).ready(function () {
        console.log("dom loaded");
    });
})

