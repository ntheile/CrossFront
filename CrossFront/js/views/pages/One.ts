/* Globals - jQuery, $, Backbone, _ */

/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../libs/backbone.d.ts"/>

declare var $: any;
declare var _: any;
declare var $el: any;
declare var require: any;
declare var alert: any;

// simple Page view for Page One
export class PageOne extends Backbone.View {



    initialize() {
        console.log("Page one view init'd");
    };
         
    render() {
        // assign these varaibles to the declared variables up top to make them global to this module
        // Also so they can be used in the require() below

        ///
        /// get the page template widget ///
        ///
        $el = this.el;
        
        //grab the template and inject the json data into the DOM element, pass back to self variable so we can return it for chaining.
        var tmpl = require(["text!../../../templates/pages/One.html!strip" ],
            function(html) {               
                                
                var compiled_template = _.template(html);

                $el.html( 
                    compiled_template()
                ).trigger('create');


                return this; 

            }
        )

        //return tmpl for chainable calls, like .render().el
        return tmpl;

        ///
        /// get the menu widget ///
        ///
        
        console.log("completed page one render");

        //$(this.el).html("<h2>Welcome to Page One</h2>");

        //return this;

    }

    constructor (el: HTMLElement, collection?: any, options?: any) {
        // run this code when it's new'd up
        super();
        this.el = el;
    }



};
