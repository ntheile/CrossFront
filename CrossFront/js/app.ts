/// <reference path="libs/jquery.mobile.d.ts" />
/// <reference path="libs/jquery.d.ts"/>
/// <reference path="libs/backbone.d.ts"/>
/// <reference path="views/pages/index.ts" />

/* 
    Globals - jQuery, $, Backbone, _ 
    
    Note - This module is automatically loaded when all the libraries
    and scripts are loaded from the appstart folder
*/


    declare var require: any;

    // most of the code goes in a view and that code is triggered by the router


    ////
    //// PhoneGap GPS Test ////////////////////////////////////////////////////////////////////////
    ////

    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    var onSuccess = function(position) {

    var strGPS = '<img src="https://maps.googleapis.com/maps/api/staticmap?center=' + position.coords.latitude + ' ' + position.coords.longitude +'&amp;zoom=14&amp;size=288x200&amp;markers=color:blue%7Clabel:X%7C' + position.coords.latitude + ' ' + position.coords.longitude +'&amp;sensor=false" height="200" width="288">';

    var strgps = 'Latitude: '    + position.coords.latitude   + '<br/>' +
        'Longitude: '         + position.coords.longitude         + '<br/>' +
        'Altitude: '          + position.coords.altitude          + '<br/>' +
        'Accuracy: '          + position.coords.accuracy          + '<br/>' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
        'Heading: '           + position.coords.heading           + '<br/>' +
        'Speed: '             + position.coords.speed             + '<br/>' +
        'Timestamp: '         + position.timestamp                + '<br/>';

    $('.gps-data').html(strGPS + "<br/>" + strgps);
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
    console.log('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);