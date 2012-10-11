/*globals Backbone, _, console*/

declare var $: any;
declare var _: any;

declare module Backbone {    
    
    export class Model {
        constructor (attr? , opts? );
        get(name: string): any;
        set(name: string, val: any): void;
        set(obj: any): void;
        save(attr? , opts? ): void;
        destroy(): void;
        bind(ev: string, f: Function, ctx?: any): void;
        toJSON(): any;
    }

    export class Events {
    }

    export class Collection {
        constructor (models? , opts? );
        bind(ev: string, f: Function, ctx?: any): void;
        collection: Model;
        length: number;
        create(attrs, opts? ): Collection;
        each(f: (elem: any) => void ): void;
        fetch(opts?: any): void;
        last(): any;
        last(n: number): any[];
        filter(f: (elem: any) => any): Collection;
        without(...values: any[]): Collection;
    }
    
    export class View {
        constructor (options? );
        $(selector: string): any;
        el: HTMLElement;
        $el: any;
        model: Model;
        remove(): void;
        delegateEvents: any;
        make(tagName: string, attrs? , opts? ): View;
        setElement(element: HTMLElement, delegate?: bool): void;
        tagName: string;
        events: any;

        static extend: any;
    }
}

interface HasEvents {
    on: (event: string, callback: (parms?: any, moreParms?: any) => any) => any;
    off: (event: string) => any;
}

interface ContactInterface {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;            
};

class Templates {
    static contact: (json: any) => string;
    static editContact: (json: any) => string;
    static contacts: (json: any) => string;
};

class AppEvents implements HasEvents 
{
    on: (event: string, callback: (model: Contact, error: any) => any) => any;
    off: (event: string) => any;  
    trigger: (event: string, data: any) => any;  
};

var appEvents = new AppEvents();
_.extend(appEvents, Backbone.Events); 

class Contact extends Backbone.Model implements HasEvents {
    
    on: (event: string, callback: (model: Contact, error: any) => any) => any;

    off: (event: string) => any;
    
    isValid: () => bool;
    
    initialize() {
        console.log("Contact init.");
    };

    defaults() : ContactInterface {
       return {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
            state: ''
        };
    };

    validate(attrs: ContactInterface) {
       
       if (_.isEmpty(attrs.firstName)) {
            return "First name is required.";
       }
       
       if (_.isEmpty(attrs.lastName)) {
            return "Last name is required.";
       }
       
       if (_.isEmpty(attrs.email)) {
            return "Email is required.";
       }
       
       if (attrs.email.indexOf("@") < 1 ||
        attrs.email.indexOf(".") < 1) {
            return "The email address appears to be invalid.";
       }
       
       return "";
    }
};

// collection of the key model 
class Contacts extends Backbone.Collection implements HasEvents {
    
    on: (event: string, callback: (parms?: any, moreParms?: any) => any) => any;
    
    off: (event: string) => any;

    url: string;
    
    model: Contact;
        
    initialize() {
        console.log("Contacts init.");
    }

    constructor(options?: any) {
        this.url = "/api/Contacts";    
        super(options);        
    };
};

// simple view in the grid list of a contact
class ContactView extends Backbone.View {

    model: Contact;

    elm: HTMLElement;   

    initialize() {
        var me = this;
        console.log("Contact view init.");
        _.bindAll(this, "render");
        this.model.on("change", this.render);
        this.model.on("reset", this.render);
        this.model.on("destroy", function () {
            $(me.el).remove();
        });
    };
         
    render() {
        var json: Object, html: string, element: any, me: ContactView;           
        me = this;
        json = this.model.toJSON();
        html = Templates.contact(json);
        element = $(this.el).html(html);
        $(element).find("a").click(function () {
            appEvents.trigger("selectContact", me.model);
        });
        this.elm = $("#contactDetail" + this.model.get("id"));
        return element;
    }

    constructor(options?: any) {
        this.tagName = "div";    
        super(options);
    }
};

// more complex view for editing a contact
class EditContactView extends Backbone.View implements HasEvents {
    
    on: (event: string, callback: (model: Contact) => any) => any;
    off: (event: string) => any;

    model: Contact;

    trigger: (event: string, payload: any) => any;    
    
    initialize() {
        console.log("Edit contact init.");
        _.bindAll(this, "render", "clearThis", "onError", "updateModel",
            "updateThis", "deleteThis", "addThis");
        appEvents.on("selectContact", this.updateModel);
        this.model.on("error", this.onError);
    };
    
    updateModel(model: Contact) {
        this.model = model;
        this.model.off("error");
        this.model.on("error", this.onError);
        this.render();
    };
    
    onError(model: Contact, error: any) {
        var alertPanel, alertHeader, alertBody, errorMessage, errorHeader;        
        errorMessage = error;
        if (_.has(error, "statusText")) {
            errorMessage = error.statusText;
            errorHeader = "Operation Error.";
        }
        else {
            errorHeader = "Validation Error.";
        }
        console.log("On error: " + error);
        alertPanel = $(this.el).find(".alert");
        alertHeader = $(this.el).find("#alertHeader");
        alertBody = $(this.el).find("#alertBody");
        alertPanel.hide();
        alertHeader.text(errorHeader);
        alertBody.text(errorMessage);
        alertPanel.show("fast");
    };

    updateButtons() {
    
        var toggleButton = function (button, enabled) {
            if (enabled) {
                button.removeAttr("disabled");
            } else {
                button.attr("disabled", true);
            }
        };

        toggleButton($("#btnAdd"), this.model.get("id") === null);
        toggleButton($("#btnUpdate"), this.model.get("id") !== null);
        toggleButton($("#btnDelete"), this.model.get("id") !== null);        
    };
    
    bindForm() {
        this.model.set({
            id: $(this.el).find("#contactId").val(),
            firstName: $(this.el).find("#firstName").val(),
            lastName: $(this.el).find("#lastName").val(),
            email: $(this.el).find("#email").val()
        });
    };
    
    render() {
        console.log("Edit contact render.");
        $(this.el).html(Templates.editContact(this.model.toJSON()));
        this.updateButtons();
        $(".alert").hide();
        $(".close").click(function () {
            $(".alert").hide("slow");
        });
        return this;
    };
    
    clearThis() {
        this.updateModel(new Contact());
        this.render();
    };
    
    addThis() {
        this.bindForm();
        if (this.model.isValid()) {
            var contact = this.model.toJSON();
            contact.id = null;
            this.clearThis();
            this.trigger("onAdd", contact);            
        }
    };
    
    updateThis() {
        this.bindForm();
        if (this.model.isValid()) {
            this.model.save();
            this.updateButtons();
        }
    };
        
    deleteThis() {
        this.model.destroy();
        this.clearThis();
    };
    
    constructor(options?: any) {
        this.events = {        
            "click #btnClear": "clearThis",
            "click #btnAdd": "addThis",
            "click #btnDelete": "deleteThis",
            "click #btnUpdate" : "updateThis"
        };
        
        this.tagName = "div";
    
        this.el = <HTMLElement>$("#contact");           
        
        super(options);
    }    
};

// list "grid" of contacts
class ContactList extends Backbone.View implements HasEvents {
    
    on: (event: string, callback: (parms?: any, moreParms?: any) => any) => any;
    
    off: (event: string) => any;
    
    collection: Contacts;        
    
    initialize() {
        var me;
        me = this;
        console.log("ContactList init.");
        _.bindAll(this, "render");
        this.collection.on("reset", this.render);
        
        Application.editContactView = new EditContactView({
            model: new Contact()
        });
        
        Application.editContactView.render();
        
        Application.editContactView.on("onAdd", function (model) {
            me.collection.create(model, {
                success: function () {
                    me.collection.fetch();
                }
            });
        });
    }
           
    addItem(model: Contact) {
        var view : any, childItem : ContactView;
        view = new ContactView({
            model: model
        });
        childItem = view.render();
        $(this.el).append(childItem);
    };

    render() {
        console.log("ContactList render.");
        var me = this;
        $(this.el).html(Templates.contacts({}));
        this.collection.each(function (model) {
            me.addItem(model);
        });                
        return this;    
    }

    constructor(options?: any) {
        this.tagName = "div"; 
        this.el = <HTMLElement>$("#results");    
        super(options);
    };    
};


class Application {
        
    public static editContactView: EditContactView;

    constructor() {
        Templates.contact = _.template($("#contactTemplate").html());
        Templates.editContact = _.template($("#editContactTemplate").html());
        Templates.contacts = _.template($("#contactsTemplate").html());
        var contacts = new Contacts();
        contacts.fetch();
        var contactsView = new ContactList({
            collection: contacts
        });        
        contactsView.render();
    };
};

// host container
var App = new Application();