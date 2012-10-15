/* Globals - jQuery, $, Backbone, _ */
/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../libs/backbone.d.ts"/>
declare var _: any;
declare var App: any;
declare var $: any;
declare var coll: any;
declare var $el: any;
declare var require: any;
declare var tmplHTML: any;
import Collection = module("../../collections/Menu");


// simple partial view for the Menu widget
export class MenuView extends Backbone.View {

    collection: Collection.Menu;

    initialize() {
        console.log("Menu partial view init.");
    }

    render() {

        // assign these varaibles to the declared variables up top to make them global to this module
        // Also so they can be used in the require() below
        $el = this.el;
        coll = this.collection;
 
        //grab the template and inject the json data into the DOM element, pass back to self variable so we can return it.
        var self = require(["text!../../../templates/partials/Menu.html!strip" ],
            function(html) {               
                var compiled_template = _.template(html);
                
                $el.html( 
                    compiled_template({ 
                        results: coll.models 
                    }) 
                ).trigger('create');

                return this; 
            }
        )

        //return self for chainable calls, like .render().el
        return self;
         
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


                