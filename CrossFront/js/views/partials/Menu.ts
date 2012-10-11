/* Globals - jQuery, $, Backbone, _ */
/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../libs/backbone.d.ts"/>
declare var _: any;
declare var App: any;
declare var $: any;
declare var coll: any;
import Collection = module("../../collections/Menu");

// simple partial view for the Menu widget
export class MenuView extends Backbone.View {

    collection: Collection.Menu;

    initialize() {
        console.log("Menu partial view init.");
    };
         
    render() {
       

        $(this.$el).html('<b>hello from the view</b>');
        
        coll = this.collection;
        var strContent;
        $.each(coll.models, function (i, model) {
            
            console.log(model.get('text') + " : " + model.get('url'));

        });

        $(this.$el).html(strContent);
        
        return this;
    }

    // Require params to be passed in when an instance of this is created (aka new'd up)
    // Required: $el, collection
    constructor ($el: string, collection: any, options?: any) {
        // run this code when it's new'd up
        super();
        this.$el = $el;
        this.collection = collection
    }

};