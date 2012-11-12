/* Globals - jQuery, $, Backbone, _ */
/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../libs/backbone.d.ts"/>
/// reference path="../../libs/underscore-typed-1.4.d.ts" />


//declare var _: any;
declare var App: any;
declare var $: any;
declare var _: any;
declare var coll: any;
declare var $el: any;
declare var require: any;
declare var tmplHTML: any;
import Collection = module("../../collections/Menu");
import Utils = module('utils/Utils');

// simple partial view for the Menu widget
export class MenuView extends Backbone.View {

    collection: Collection.Menu;

    initialize() {
        console.log("Menu partial view init.");

        var that = this;

        //grab the template (we must do this in init and not in render to avoid issues)
        Utils.Utils.Load('partials/menu', function (tmpl) {
            that.template = _.template(tmpl);
            that.render();
        });

       //this.template = _.template('<ul class="navmenu" data-role="listview"><% _.each( results, function( item, i ){ %><li><a href="<%= item.get("url") %>" target="_blank"><%= item.get("text") %></a></li> <% }); %></ul>');
        
    }

    render() {
        console.log("menu partial view in render");
        // assign these varaibles to the declared variables up top to make them global to this module
        // Also so they can be used in the require() below

        $el = this.el;
        coll = this.collection;
 
        //use the template
        var html = this.template({
            results: coll.models 
        });

        $el.html(html).trigger('create');

        return this;  //return tmpl for chainable calls, like .render().el


    }
    

    // Require params to be passed in when an instance of this is created (aka new'd up)
    // Required: el, collection
    constructor (el: HTMLElement, collection: any, options?: any) {
        // run this code when it's new'd up
        super();
        this.el = el;
        this.collection = collection
    }

}


                