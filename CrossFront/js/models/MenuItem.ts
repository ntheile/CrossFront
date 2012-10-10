/* Globals - jQuery, $, Backbone, _ */

/// <reference path="../libs/jquery.d.ts"/>
/// <reference path="../libs/backbone.d.ts"/>

declare var $: any;
declare var _: any;

// Our basic MenuItem model has text, url, and acitve params
export class MenuItem extends Backbone.Model {

    // Defaults
    defaults() : MenuItemInterface {
        return {
            text: 'google',
            url: 'www.google.com',
            active: false
        };
    }
    
    // Initialize
    initialize() {
        console.log("MenuItem Model init'ed.");
        
    }
    
    // Validate
    validate(attrs: MenuItemInterface) {
       
       if (_.isEmpty(attrs.text)) {
            return "text is required.";
       }
       if (_.isEmpty(attrs.url)) {
            return "url is required.";
       }
       
       return "";
    }

    // Methods
    // Toggle the `active` state of this MenuItem.
   toggleActive() {
       var active = this.get('active');

       if (active == true) {
           //change ui to highlighted
       }
       else {
           //change ui to no not highlighted
       }
   }   

};

//put all the default values here, it will make intellisense work nicely and stuff will be stored nicely too
interface MenuItemInterface {
    text: string; 
    url: string;    
    active?: bool;
};