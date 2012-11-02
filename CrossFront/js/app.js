define(["require", "exports", "models/MenuItem", "collections/Menu", "views/partials/Menu"], function(require, exports, __Model__, __Collection__, __PartialView__) {
    //import your classes
    var Model = __Model__;

    var Collection = __Collection__;

    var PartialView = __PartialView__;

    ////
    //// jQuery Test //////////////////////////////////////////////////////////////
    ////
    //This simply shows that jQuery works.
    //In Visual Studio you get intellisense since we referenced jquery.d.ts!!
    $(document).ready(function () {
        console.log("dom loaded");
        console.log("waka");
    });
    ////
    //// Model Test ///////////////////////////////////////////////////////////////
    ////
    var menuitem = new Model.MenuItem({
        text: 'bing',
        url: 'http://www.bing.com'
    });
    //Get the value for content
    console.log(menuitem.get('text'));
    console.log(menuitem.get('url'));
    //Set them to a new value
    menuitem.set({
        text: "yahoo",
        url: "http://www.yahoo.com"
    });
    console.log(menuitem.get('text'));
    console.log(menuitem.get('url'));
    menu = new Collection.Menu();
    menu.fetch({
        success: function () {
            console.log(menu.models)// => 2 (collection have been populated)
            ;
            // Fetches, Sets up and injects a side menu partial view into the DOM for the sidemenu class
            var menuview = new PartialView.MenuView($('.sidemenu'), menu).render();
            $('sidemenu').trigger('create');
        }
    });
    ////
    //// PhoneGap GPS Test ////////////////////////////////////////////////////////////////////////
    ////
    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    var onSuccess = function (position) {
        var strGPS = '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + position.coords.latitude + ' ' + position.coords.longitude + '&amp;zoom=14&amp;size=288x200&amp;markers=color:blue%7Clabel:X%7C' + position.coords.latitude + ' ' + position.coords.longitude + '&amp;sensor=false" height="200" width="288">';
        var strgps = 'Latitude: ' + position.coords.latitude + '<br/>' + 'Longitude: ' + position.coords.longitude + '<br/>' + 'Altitude: ' + position.coords.altitude + '<br/>' + 'Accuracy: ' + position.coords.accuracy + '<br/>' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br/>' + 'Heading: ' + position.coords.heading + '<br/>' + 'Speed: ' + position.coords.speed + '<br/>' + 'Timestamp: ' + position.timestamp + '<br/>';
        $('.gps-data').html(strGPS + "<br/>" + strgps);
    };
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
})

