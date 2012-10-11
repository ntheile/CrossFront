var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}

; ;
var Templates = (function () {
    function Templates() { }
    Templates.contact = null;
    Templates.editContact = null;
    Templates.contacts = null;
    return Templates;
})();
; ;
var AppEvents = (function () {
    function AppEvents() { }
    return AppEvents;
})();
; ;
var appEvents = new AppEvents();
_.extend(appEvents, Backbone.Events);
var Contact = (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        _super.apply(this, arguments);

    }
    Contact.prototype.initialize = function () {
        console.log("Contact init.");
    };
    Contact.prototype.defaults = function () {
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
    Contact.prototype.validate = function (attrs) {
        if(_.isEmpty(attrs.firstName)) {
            return "First name is required.";
        }
        if(_.isEmpty(attrs.lastName)) {
            return "Last name is required.";
        }
        if(_.isEmpty(attrs.email)) {
            return "Email is required.";
        }
        if(attrs.email.indexOf("@") < 1 || attrs.email.indexOf(".") < 1) {
            return "The email address appears to be invalid.";
        }
        return "";
    };
    return Contact;
})(Backbone.Model);
; ;
var Contacts = (function (_super) {
    __extends(Contacts, _super);
    function Contacts(options) {
        this.url = "/api/Contacts";
        _super.call(this, options);
    }
    Contacts.prototype.initialize = function () {
        console.log("Contacts init.");
    };
    return Contacts;
})(Backbone.Collection);
; ;
var ContactView = (function (_super) {
    __extends(ContactView, _super);
    function ContactView(options) {
        this.tagName = "div";
        _super.call(this, options);
    }
    ContactView.prototype.initialize = function () {
        var me = this;
        console.log("Contact view init.");
        _.bindAll(this, "render");
        this.model.on("change", this.render);
        this.model.on("reset", this.render);
        this.model.on("destroy", function () {
            $(me.el).remove();
        });
    };
    ContactView.prototype.render = function () {
        var json;
        var html;
        var element;
        var me;

        me = this;
        json = this.model.toJSON();
        html = Templates.contact(json);
        element = $(this.el).html(html);
        $(element).find("a").click(function () {
            appEvents.trigger("selectContact", me.model);
        });
        this.elm = $("#contactDetail" + this.model.get("id"));
        return element;
    };
    return ContactView;
})(Backbone.View);
; ;
var EditContactView = (function (_super) {
    __extends(EditContactView, _super);
    function EditContactView(options) {
        this.events = {
            "click #btnClear": "clearThis",
            "click #btnAdd": "addThis",
            "click #btnDelete": "deleteThis",
            "click #btnUpdate": "updateThis"
        };
        this.tagName = "div";
        this.el = $("#contact");
        _super.call(this, options);
    }
    EditContactView.prototype.initialize = function () {
        console.log("Edit contact init.");
        _.bindAll(this, "render", "clearThis", "onError", "updateModel", "updateThis", "deleteThis", "addThis");
        appEvents.on("selectContact", this.updateModel);
        this.model.on("error", this.onError);
    };
    EditContactView.prototype.updateModel = function (model) {
        this.model = model;
        this.model.off("error");
        this.model.on("error", this.onError);
        this.render();
    };
    EditContactView.prototype.onError = function (model, error) {
        var alertPanel;
        var alertHeader;
        var alertBody;
        var errorMessage;
        var errorHeader;

        errorMessage = error;
        if(_.has(error, "statusText")) {
            errorMessage = error.statusText;
            errorHeader = "Operation Error.";
        } else {
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
    EditContactView.prototype.updateButtons = function () {
        var toggleButton = function (button, enabled) {
            if(enabled) {
                button.removeAttr("disabled");
            } else {
                button.attr("disabled", true);
            }
        };
        toggleButton($("#btnAdd"), this.model.get("id") === null);
        toggleButton($("#btnUpdate"), this.model.get("id") !== null);
        toggleButton($("#btnDelete"), this.model.get("id") !== null);
    };
    EditContactView.prototype.bindForm = function () {
        this.model.set({
            id: $(this.el).find("#contactId").val(),
            firstName: $(this.el).find("#firstName").val(),
            lastName: $(this.el).find("#lastName").val(),
            email: $(this.el).find("#email").val()
        });
    };
    EditContactView.prototype.render = function () {
        console.log("Edit contact render.");
        $(this.el).html(Templates.editContact(this.model.toJSON()));
        this.updateButtons();
        $(".alert").hide();
        $(".close").click(function () {
            $(".alert").hide("slow");
        });
        return this;
    };
    EditContactView.prototype.clearThis = function () {
        this.updateModel(new Contact());
        this.render();
    };
    EditContactView.prototype.addThis = function () {
        this.bindForm();
        if(this.model.isValid()) {
            var contact = this.model.toJSON();
            contact.id = null;
            this.clearThis();
            this.trigger("onAdd", contact);
        }
    };
    EditContactView.prototype.updateThis = function () {
        this.bindForm();
        if(this.model.isValid()) {
            this.model.save();
            this.updateButtons();
        }
    };
    EditContactView.prototype.deleteThis = function () {
        this.model.destroy();
        this.clearThis();
    };
    return EditContactView;
})(Backbone.View);
; ;
var ContactList = (function (_super) {
    __extends(ContactList, _super);
    function ContactList(options) {
        this.tagName = "div";
        this.el = $("#results");
        _super.call(this, options);
    }
    ContactList.prototype.initialize = function () {
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
    };
    ContactList.prototype.addItem = function (model) {
        var view;
        var childItem;

        view = new ContactView({
            model: model
        });
        childItem = view.render();
        $(this.el).append(childItem);
    };
    ContactList.prototype.render = function () {
        console.log("ContactList render.");
        var me = this;
        $(this.el).html(Templates.contacts({
        }));
        this.collection.each(function (model) {
            me.addItem(model);
        });
        return this;
    };
    return ContactList;
})(Backbone.View);
; ;
var Application = (function () {
    function Application() {
        Templates.contact = _.template($("#contactTemplate").html());
        Templates.editContact = _.template($("#editContactTemplate").html());
        Templates.contacts = _.template($("#contactsTemplate").html());
        var contacts = new Contacts();
        contacts.fetch();
        var contactsView = new ContactList({
            collection: contacts
        });
        contactsView.render();
    }
    Application.editContactView = null;
    return Application;
})();
; ;
var App = new Application();
