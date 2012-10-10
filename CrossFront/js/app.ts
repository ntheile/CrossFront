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

////
//// jQuery Test /////
////

//This simply shows that jQuery works. 
//In Visual Studio you get intellisense since we referenced jquery.d.ts!!
$(document).ready(function () {
    console.log("dom loaded");
});


////
//// Model Test ////
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
//// Collection Test ////
////
var menu = new Collection.Menu();
menu.fetch();




