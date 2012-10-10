CrossFront - Cross-Platform, Front-End Glue 
==========================================
**_Write Once ()=> run on iPhone && Android && Tablets && Desktop Browsers && Mobile Browsers_**

CrossFront is a work in progress...stay tuned for updates. Follow this readme as a blog, as it's updated often.

CrossFront uses these frameworks: `TypeScript` `Backbone` `Underscore` `Require`
`jQuery` `jQuery Mobile` `jQuery Mobile Router` 
`Cordova (PhoneGap)` `Modernizr`
	
CrossFront glues all these frameworks together in a boilerplate project to allow for Large Scale Javascript development. It allows you
to code once and run everywhere (Desktop Browsers, Mobile Browsers, Tablet Browsers, Phones, Android, iOS ... etc). CrossFront is a great front-end solution
for app development that provides good structure and organzation of code using AMD and MVC design patterns. It is the ideal compliment to a RESTful backend.

Here are the steps to get this project working.

1. Download Visual Studio 2012 (I downloaded the premium release version, not sure if these instruction will work with express, RC , or Beta. Let me know if it does!)
2. Install the visual studio add-in for TypeScript here: http://www.microsoft.com/en-us/download/details.aspx?id=34790
3. If your using git then clone my project: git clone https://github.com/ntheile/CrossFront-Simple.git
4. *Note:  I had to turn off VS2012 from compiling my code because I needed to to compile as ADM. To do this, Right click the .ts file > goto properties > build action > change to "none"
5. Now compile each manually using the commands in compile-notes.txt. Example> tsc app.ts --module AMD
6. *Hint: Run the commands from the Package Manager Console in Visual Studio to avoid having to switch out to a DOS prompt


Here is my journey while creating this boilerplate.

Day 1 - The Model
==================
The CrossFront-Simple boilerplate app is complete. Clone it and lets start working on the Full version.

First I am going to create a simple `MenuItem` model representing one item in a listview using a `Backbone.Model`. 
The model will be constructed of three attributes you can set `text` `url` `active` 
and one method `toggleActive`.

`js/models/Todo.ts`

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

Day Two - Create tsc-compile-amd.bat
=====================================
I found it a pain to maually compile each ts file to use AMD so I wrote this batch script that you can configure to run at build time.
 
 `/tsc-compile-amd.bat`
 
<pre>
"TypeScript is compiling TscCopile.bat as AMD"
cd D:\Websites\CrossFront\CrossFront\js
tsc.exe app.ts --module AMD
cd models
tsc.exe MenuItem.ts --module AMD
cd ..
cd collections
tsc.exe Menu.ts --module AMD
</pre>
 
 To configure this to run at build time **right click project > properties > build events > pre-build event command line >  D:\Websites\CrossFront\CrossFront\TscCompile.bat
 
 Make sure to keep the TscCompile.bat file up to date when you add new .ts files. 
 
Day Two and a half - The Collection
========================
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
 ```
 
Day Three - The View
===================
I am going to create a Dynamic view for each page using `Backbone.View`. TODO - finish

`js/views/page/index.ts`

```javascript
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
```




