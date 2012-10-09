CrossFront - Cross-Platform, Front-End Glue 
==========================================

CrossFront uses these frameworks:
	`TypeScript`
	`Backbone`
	`Underscore`
	`Require`
	`jQuery`
	`jQuery Mobile`
	`jQuery Mobile Router`
	`Cordova (PhoneGap)`
	`Modernizr`
	
CrossFront glues all these frameworks together in a boilerplate project to allow for Large Scale Javascript development. It allows you
to code once and run everywhere (Desktop Browsers, Mobile Browsers, Tablet Browsers, Phones, Android, iOS ... etc). CrossFront is a great front-end solution
for app development that provides good structure and organzation of code using AMD and MVC design patterns. It the ideal compliment to a RESTful backend.

Here are the steps to get this project working.

1. Download Visual Studio 2012 (I downloaded the premium release version, not sure if these instruction will work with express, RC , or Beta. Let me know if it does!)
2. Install the visual studio add-in for TypeScript here: http://www.microsoft.com/en-us/download/details.aspx?id=34790
3. If your using git then clone my project: git clone https://github.com/ntheile/CrossFront-Simple.git
4. *Note:  I had to turn off VS2012 from compiling my code because I needed to to compile as ADM. To do this, Right click the .ts file > goto properties > build action > change to "none"
5. Now compile each manually using the commands in compile-notes.txt. Example> tsc app.ts --module AMD
6. *Hint: Run the commands from the Package Manager Console in Visual Studio to avoid having to switch out to a DOS prompt


Here is my journey while creating this boilerplate.

Day 1
=====
The CrossFront-Simple boilerplate app is complete. Clone it and lets start working on the Full version.
First I am going to create a Dynamic view for each page using `Backbone.View`

`js/views/page/index.ts`

<pre>	
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
</pre>



