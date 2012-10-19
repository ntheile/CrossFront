CrossFront - Cross-Platform, Front-End Glue 
==========================================
**_Write Once ()=> run on iPhone && Android && Tablets && Desktop Browsers && Mobile Browsers_**

![logo](https://raw.github.com/ntheile/CrossFront/master/CrossFront/images/CrossFrontLogo.png)

_CrossFront is a work in progress...stay tuned for updates. Follow this readme as a blog, as it's updated often. You can view different version 
of the source to see the progress made. To view what I did on day 1, view the source for the Day 1 commit._

View a demo CrossFront app here http://crossfront.apphb.com/

What is CrossFront?
===================
CrossFront uses these frameworks: `TypeScript` `Backbone` `Underscore` `Require`
`jQuery` `jQuery Mobile` `jQuery Mobile Router` 
`Cordova (PhoneGap)` `Modernizr`
	
**CrossFront glues all these frameworks together in a boilerplate project to allow for Large Scale, Cross Platform Javascript development.** It allows you
to code once and run everywhere (Desktop Browsers, Mobile Browsers, Tablet Browsers, Phones, Android, iOS ... etc) using native device features (GPS, Accelerometer, Camera etc...). CrossFront is a great front-end solution
for app development that provides good structure and organzation of code using AMD and MVC design patterns. It is the ideal compliment to a RESTful backend 
and is very efficiant passing lightweight ajax json requests. This is good for a mobile application when every bit of bandwidth counts!

Here are the steps to get this project working.

1. Download Visual Studio 2012 (I downloaded the premium release version, not sure if these instruction will work with express, RC , or Beta. Let me know if it does!)
2. Install the visual studio add-in for TypeScript here: http://www.microsoft.com/en-us/download/details.aspx?id=34790
3. If your using git then clone my project: git clone https://github.com/ntheile/CrossFront-Simple.git
4. *Note:  I had to turn off VS2012 from compiling my code because I needed to to compile as AMD (the TypeScipt compiler adds the require function with this switch turned on). To do this, Right click the .ts file > goto properties > build action > change to "none"
5. Now compile each manually using the commands in compile-notes.txt. Example> tsc app.ts --module AMD
6. *Hint: Run the commands from the Package Manager Console in Visual Studio to avoid having to switch out to a DOS prompt


Here is the journey while creating this boilerplate. You can read this as a blog/tutorial.


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

Resources:
http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app/ 

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

Day 5 - Native Device Features (GPS Demo)
==========================================

Now that we have the main skeleton structure of your app almost complete, let's test using GPS features.

`js/app/ts`

```javascript

...

////
//// PhoneGap GPS Test ////////////////////////////////////////////////////////////////////////
////

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
```

Day 6 - New Logo
===================

I created a new logo for the project(see the top of the readme). It's a "C" with a sideways crown pointing to all the different platforms CrossFront can suppport. 

Day 7 - The Router
===================

Most front end interactive apps are single page applications. You need a way to keep state and history, such as clicking a link and moving to step 2. 
To achieve this I chose to use `jQuery Mobile Router` since I am using jQuery Mobile for much of the UI, plugins and event handling. 
It is also stated that this will be the supported router for the platform. Most of the work will be done on the `/index.html#index` 
page (aka /index.html or aka the web root / )  with partial widgets being loaded into the DOM dynamically (/index.html#index?widget=foo), occationally
we will need to load separate pages /index.html#one. If this is the case, then the skeleton of the page must be already coded in HTML on 
the main index.html page for the `jQuery Mobile Router` to listen for and trigger an event. 

**Skeleton Example:**

`/index.html`

```html
<div id="one" data-role="page" data-add-back-btn="true" >

    <div id="head" data-role="header" data-tap-toggle="false" data-position="fixed">
        <h1>Page One</h1>
    </div>

    <div id="content" data-role="content">
        <h2 style="color:red">error on page , this is static content that should be replaced when the view is rendered</h2>
    </div>

    <div id="footer" data-role="footer" data-tap-toggle="false" data-position="fixed">
        <h4>Page One Footer</h4>
    </div>
      
</div>
```

This may sound confusing, and it is! Experiment a bit with it and you see SPA's are still very new and takes alot of playing around to get it just right.

We want our router to work with the following types of page requests:

* /index.hmtl#one
* /index.hmtl#one?q=1
* /index.hmtl#two

This allows for deep-linking and bookmarking to work. To make this work with `jquery mobile router` I had to implement calling the router in two different ways, one for
IE and one for the other browsers. I am not quite sure why the browsers handle these routing events differently but this code is a workaround.

`/js/router.js`
```javascript
define([
      'jquery',
      'underscore',
      'backbone'
    ], function ($, _, Backbone) {

        App.IndexPage = function (type, match, ui) {

            //var indexPage = new indexView();
            console.log("-----------Index Page fired-------");

        };

        App.PageOne = function (type, match, ui) {

            //var onePage = new pageOneView();


            console.log("-----------one page fired------------");

            //get the Page One View and Render it.
            require(['views/pages/One'], function (__PageView__) {
                var PageView = __PageView__;

                var PageOne = new PageView.PageOne($('#one :jqmData(role="content")')).render();

            });

        };

        App.PageTwo = function (type, match, ui, page) {

            //var pageTwo = new pageTwoView();

            console.log("--------------page 2 called----------------");

        };

        App.PageInit = function (type, match, ui, page) {
            console.log("This page (" + $(page).jqmData("url") + ") has been initialized");

            //jquery mobile router bookmark deep linking hack for non-IE browsers (/index.html#one?q=1)
            if ('' !== window.location.hash && '#' !== window.location.hash && !$.browser.msie) {
                //hash found
                var hash = window.location.hash;
                //is there a query string in there ?
                if ((hash.indexOf("?") !== -1)) {
                    hash = hash + "?bookmark";
                }
                else {
                    hash = hash + "?bookmark";
                }

                $.mobile.changePage(hash);
            }

        };

        var init = function () {
            App.Router = new $.mobile.Router(
                {
                    "#index": {
                        handler: App.IndexPage, events: "bs"
                    },
                    "#one(?:[?](.*))?": {
                        handler: App.PageOne, events: "bs"
                    },
                    "#two": {
                        handler: App.PageTwo, events: "bs"
                    },
                    ".": { //this code runs when any new page is initialized into jquery mobile
                        handler: App.PageInit, events: "i"
                    }
                }
            );


        };

        return {
            init: init
        };
    });

```

This is code I use to start the router.

`/js/main.js`
```javascript

...

///
/// Start Router ///
///

	// IE Hack for jquery mobile router bookmark deep linking to work, for example /index.html#one?q=1
	if ($.browser.msie) {
		//start your apps router
		require(['router'], function (Router) {

			Router.init();

			if ('' !== window.location.hash && '#' !== window.location.hash) {
				//hash found
				var hash = window.location.hash;
				//is there a query string in there ?
				if ((hash.indexOf("?") !== -1)) {
					hash = hash + "?bookmark";
				}
				else {
					hash = hash + "?bookmark";
				}

				$.mobile.changePage(hash);
			}



			//now that all your prerequisites are loaded...start your app
			require(['app']);
			console.log('app started');
		});
	}
	else { //start app normally for other browsers
		require(['router'],function (Router) {
			Router.init();
		});
		require(['app']);
		console.log('app started');

	}
          
});
```




A feature that our main page will include is paging `/index.html?paging=30`, this will demonstrate that we can use query string and hashes with JQM and when the link is bookmarked and revisted the jqmr will trigger the 
right events to get the page to it's desired state.



Day 9 - Deploy to AppHarbor
============================

Appharbor is a great free hosting service. To get my app to deploy to appharbor I had jump through a few hoops.

1. Change all .ts file to not use the automatic TypeScript compiler, change to not compile by right clicking the file and going to properties.
2. Comment a line of code in the CrossFront.csproj 
```
<Target Name="BeforeBuild">
   <!--<Exec Command="&quot;$(PROGRAMFILES)\Microsoft SDKs\TypeScript\0.8.0.0\tsc&quot; @(TypeScriptCompile ->'&quot;%(fullpath)&quot;', ' ')" />-->
</Target>
```
3. After that I simply logged onto AppHarbor, created a new project and hooked it into this github repo.

You can view this repo here `http://crossfront.apphb.com/`


Upcoming Topics and Code
===============
* CSS3 Media Queries (MobileView, TabletView, DesktopView), maybe look into a device detector/loader, such as Lumbar http://walmartlabs.github.com/lumbar/ ...proly use http://blog.squirro.com/post/26967754862/writing-a-responsive-application-with-backbone-js
* Integrate with PhoneGap
* Build and deploy to an Android Phone
* Use native capabilties (GPS)
* Set up routers like in this project https://github.com/jcreamer898/RequireJS-Backbone-Starter/blob/master/js/routers/home.js 
* Look into r.js to minify modular code into a gzipped minified single file
