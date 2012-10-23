/* Globals - jQuery, $, Backbone, _ */

/// <reference path="../libs/jquery.d.ts"/>
/// <reference path="../libs/backbone.d.ts"/>

declare var $: any;
declare var _: any;

import Model = module("../models/MenuItem");

// collection of the MenuItem model 
export class Menu extends Backbone.Collection {
    
    model: Model.MenuItem;
    
    url: string;
        


    initialize() {
        console.log("Menu init'd");

    }

    

    // You can pass anything in when this is new'd up 
    constructor(options?: any) {
        // This code runs when you create a new instance of Menu
        this.url = "api/Menu.html";    
        
        super(options);  
    };
};