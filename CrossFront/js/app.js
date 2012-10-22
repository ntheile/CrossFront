define(["require", "exports", "models/MenuItem", "collections/Menu", "views/partials/Menu"], function(require, exports, __Model__, __Collection__, __PartialView__) {
    var Model = __Model__;

    var Collection = __Collection__;

    var PartialView = __PartialView__;

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
    menu = new Collection.Menu();
    menu.fetch({
        success: function () {
            console.log(menu.models);
            var menuview = new PartialView.MenuView($('.sidemenu'), menu).render();
        }
    });
    var onSuccess = function (position) {
        var strgps = 'Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: ' + position.coords.accuracy + '\n' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' + 'Heading: ' + position.coords.heading + '\n' + 'Speed: ' + position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp + '\n';
        $('.gps-data').html(strgps);
    };
    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
})

