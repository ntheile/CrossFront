/* 
    Globals - jQuery, $, Backbone, _ 
    
    Note - This module is automatically loaded when all the libraries
    and scripts are loaded from the appstart folder
*/
/// <reference path="libs/jquery.d.ts"/>
/// <reference path="libs/backbone.d.ts"/>

//declare a variable representing underscore so this typescript file will compile without errors
declare var _: any;
declare var App: any;
declare var $: any;

//import your classes
import Model = module("models/MenuItem");
import Collection = module("collections/Menu");
import PartialView = module("views/partials/Menu");

////
//// jQuery Test //////////////////////////////////////////////////////////////
////

//This simply shows that jQuery works. 
//In Visual Studio you get intellisense since we referenced jquery.d.ts!!
$(document).ready(function () {
    console.log("dom loaded");
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
    text : "yahoo",
    url : "http://www.yahoo.com"
})
console.log(menuitem.get('text'));
console.log(menuitem.get('url'));



////
//// Collection and Partial View Test /////////////////////////////////////////////////////////
////

// Get a collection of menu items
declare var menu: any;
menu = new Collection.Menu();

menu.fetch({success: function(){
    console.log(menu.models); // => 2 (collection have been populated)

    // Fetches, Sets up and injects a side menu partial view into the DOM for the sidemenu class
   var menuview = new PartialView.MenuView( $('.sidemenu'), menu ).render();
}})


////
//// PhoneGap GPS Test ////////////////////////////////////////////////////////////////////////
////

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);







