/* Globals - jQuery, $, Backbone, _ */

/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../libs/backbone.d.ts"/>

declare var $: any;
declare var _: any;
import Model = module("../../models/Todo");

// simple view in the grid list of a contact
export class IndexView extends Backbone.View {

    model: Model.Todo;

    $el: HTMLElement;   

    initialize() {
        var me = this;
        console.log("Index view init.");
    };
         
    render() {
        console.log("rendered the index view");

    }

};
