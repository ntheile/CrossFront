define(["require", "exports", "models/MenuItem", "collections/Menu"], function(require, exports, __Model__, __Collection__) {
    var Model = __Model__;

    var Collection = __Collection__;

    $(document).ready(function () {
        console.log("dom loaded");
    });
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
    var menu = new Collection.Menu();
    menu.fetch();
})

