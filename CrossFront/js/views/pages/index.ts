/* Globals - jQuery, $, Backbone, _ */

/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../libs/backbone.d.ts"/>

declare var $: any;
declare var _: any;
declare var App: any;
 declare var menu: any;
//import Model = module("../../models/Todo");
import Model = module("models/MenuItem");
import Collection = module("collections/Menu");
import PartialView = module("views/partials/Menu");

// simple view in the grid list of a contact
export class IndexView extends Backbone.View {

    model: Model.MenuItem;

    $el: HTMLElement;   

    initialize() {
        var me = this;
        console.log("Index view init.");

        ////
        //// Collection and Partial View Test /////////////////////////////////////////////////////////
        ////

        // Get a collection of menu items
       
        menu = new Collection.Menu();

        menu.fetch({success: function(){
            console.log(menu.models); // => 2 (collection have been populated)

            // Fetches, Sets up and injects a side menu partial view into the DOM for the sidemenu class
           //var menuview = new PartialView.MenuView(  $('.sidemenu'), menu  ).render();
          var menuview = new PartialView.MenuView($('.sidemenu'),menu);

        }})

        
      


    };
         
    render() {
        console.log("rendered the index view");

        return this;
    }

};
