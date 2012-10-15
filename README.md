CrossFront - Cross-Platform, Front-End Glue 
==========================================
**_Write Once ()=> run on iPhone && Android && Tablets && Desktop Browsers && Mobile Browsers_**

![logo](http://www.applicoinc.com/wp-content/uploads/2012/02/cross-platform-mobile-development1.png)

_CrossFront is a work in progress...stay tuned for updates. Follow this readme as a blog, as it's updated often. You can view different version 
of the source to see the progress made. To view what I did on day 1, view the source for the Day 1 commit._

What is CrossFront?
===================
CrossFront uses these frameworks: `TypeScript` `Backbone` `Underscore` `Require`
`jQuery` `jQuery Mobile` `jQuery Mobile Router` 
`Cordova (PhoneGap)` `Modernizr`
	
**CrossFront glues all these frameworks together in a boilerplate project to allow for Large Scale, Cross Platform Javascript development.** It allows you
to code once and run everywhere (Desktop Browsers, Mobile Browsers, Tablet Browsers, Phones, Android, iOS ... etc). CrossFront is a great front-end solution
for app development that provides good structure and organzation of code using AMD and MVC design patterns. It is the ideal compliment to a RESTful backend 
and is very efficiant passing lightweight ajax json requests. This is good for a mobile application when every bit of bandwidth counts!

Here are the steps to get this project working.

1. Download Visual Studio 2012 (I downloaded the premium release version, not sure if these instruction will work with express, RC , or Beta. Let me know if it does!)
2. Install the visual studio add-in for TypeScript here: http://www.microsoft.com/en-us/download/details.aspx?id=34790
3. If your using git then clone my project: git clone https://github.com/ntheile/CrossFront-Simple.git
4. *Note:  I had to turn off VS2012 from compiling my code because I needed to to compile as AMD (the TypeScipt compiler adds the require function with this switch turned on). To do this, Right click the .ts file > goto properties > build action > change to "none"
5. Now compile each manually using the commands in compile-notes.txt. Example> tsc app.ts --module AMD
6. *Hint: Run the commands from the Package Manager Console in Visual Studio to avoid having to switch out to a DOS prompt


Here is my journey while creating this boilerplate.

Day 1 - The Model
==================
The CrossFront-Simple boilerplate app is complete. Clone it and lets start working on the Full version.

First I am going to create a simple `MenuItem` model representing one item in a listview using a `Backbone.Model`. 
The model will be constructed of three attributes you can set `text` `url` `active` 
and one method `toggleActive`.

`js/models/MenuItem.ts`

```javascript
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
```


Here are some of my resources:
 * http://csharperimage.jeremylikness.com/2012/10/building-backbone-applications-with.html
 * http://typescript.codeplex.com/SourceControl/changeset/view/fe3bc0bfce1f#samples%2ftodomvc%2fjs%2ftodos.ts
 * http://backbonetutorials.com/what-is-a-model/

Day 2 - The Build Script
=====================================
I found it a pain to maually compile each ts file to use AMD so I wrote this batch script that you can configure to run at build time.
 
`/TscCompile.bat`
 
<pre>
"TypeScript is compiling as AMD using TscCompile.bat"
cd D:\Websites\CrossFront\CrossFront\js
tsc.exe app.ts --module AMD
cd models
tsc.exe MenuItem.ts --module AMD
cd ..
cd collections
tsc.exe Menu.ts --module AMD
</pre>
 
To configure this to run at build time:
**right click project > properties > build events > pre-build event command line >  D:\Websites\CrossFront\CrossFront\TscCompile.bat**
 
_Make sure to keep the TscCompile.bat file up to date when you add new .ts files._
 
Day 2.5 - The Collection
====================================
I am going to create a collection of MenuItems called Menu using `Backbone.Collection`. This collection pulls it's data from a
RESTful Api using the `MenuItem` as its Model. Since the server api is out of scope at this time, I created an `api` folder that 
represents a server call and returns a json object.
  
`/api/Menu.html`
<pre>
[
	{"text" : "github" , "url" : "http://github.com"},
	{"text" : "jquery" , "url" : "http://jquery.com"}
]
</pre>
 
 `js/collections/Menu.ts`
 ```javascript
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
        this.url = "/api/Menu.html";    
        super(options);  
    };
};
 ```
 
Day 3 - The View
===================
I am going to create a partial view using `Backbone.View`. The goal of the Menu view is to display a simple menu of links.
This view is detachable and widget-like and can be used on serveral different pages in my application, therefore I am going to put it in the `partials` folder.

`js/views/page/partials/Menu.ts`

```javascript
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
```

Day 4 - The Template (and revised view)
=====================
The Menu view we created does not look very good, in fact it only outputs a console message. To avoid having to write HTML in javascript we will use an
underscore.js `template` for this Widget.

The HTML template is loaded using underscore and contains a loop that iterates through each model and writes a new `<li>` element for each one. See this post for 
more details on how this works:
* https://github.com/addyosmani/backbone-fundamentals/blob/master/practicals/modular-mobile-app/app/views/photoList.js
* https://github.com/addyosmani/backbone-fundamentals/blob/master/practicals/modular-mobile-app/app/templates/photoview.html

`/templates/partials/Menu.html`

```html
<ul class="navmenu" data-role="listview">
    <% _.each( results, function( item, i ){ %>

        <li><a href="<%= item.get('url') %>" target="_blank"><%= item.get('text') %></a></li>

    <% }); %>
</ul>
```


Next we need to re-write the view to use this template.

`/js/view/partials/menu.ts`

```javascript
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
```

Now we have to call this in the app. First we get the collection from the server, then on success we create the menu widget.

`js/app/ts`

```javascript

...

////
//// Collection Test ////
////

// Get a collection of menu items
declare var menu: any;
menu = new Collection.Menu();

menu.fetch({success: function(){
    console.log(menu.models); // => 2 (collection have been populated)

    ////
    //// Partial View Test ////
    ////

    // Fetches, Sets up and injects a side menu partial view into the DOM for the sidemenu class
   var menuview = new PartialView.MenuView( $('.sidemenu'), menu ).render();
}})
```

Now we have an easy way to fetch a menu widget, we can place this widget easily on any page in the site. It's also very easy to modify the HTML style of this widget since it's stored in 
its own separate html file


Upcoming Topics and Code
===============
* CSS3 Media Queries (MobileView, TabletView, DesktopView), maybe look into a device detector/loader, such as Lumbar http://walmartlabs.github.com/lumbar/ 
* Integrate with PhoneGap
* Build and deploy to an Android Phone
* Use native capabilties (GPS)
