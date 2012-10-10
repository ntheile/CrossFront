/* Globals - jQuery, $, Backbone, _ */

/// <reference path="../libs/jquery.d.ts"/>
/// <reference path="../libs/backbone.d.ts"/>

declare var $: any;
declare var _: any;

import Model = module("../models/MenuItem");

// collection of the key model 
export class Menu extends Backbone.Collection {
    
    model: Model.MenuItem;
    
    url: string;
        
    initialize() {
        
        console.log("Menu init'd");
    }

    constructor(options?: any) {
        this.url = "/api/Menu.html";    
        super(options);        
    };
};