/// <reference path="views/pages/One"/>
/// <reference path="views/pages/Two"/>
/// <reference path="views/pages/index"/>

    define([
      'jquery',
      'underscore',
      'backbone'
    ], function ($, _, Backbone) {

        App.IndexPage = function (type, match, ui) {
           

            //var indexPage = new indexView();
            console.log("-----------Index Page fired-------");
			//TODO - use an index view here and get rid of test view code in app.ts 
            $('.navmenu').listview("refresh").trigger('create');

            //get index page and Render it.
            require(['views/pages/index'], function (__PageView__) {
                var PageView = __PageView__;

                var IndexPage = new PageView.IndexView();
                IndexPage.render();

            });


        };

        App.PageOne = function (type, match, ui) {

            //var onePage = new pageOneView();
            console.log("-----------one page fired------------");

            //get the Page One View and Render it.
            require(['views/pages/One'], function (__PageView__) {
                var PageView = __PageView__;

                var PageOne = new PageView.PageOne($('#one :jqmData(role="content")'));
                
                PageOne.render();

            });

        };

        App.PageTwo = function (type, match, ui, page) {

            //var pageTwo = new pageTwoView();

            console.log("--------------page 2 called----------------");

        };

        App.PageInit = function (type, match, ui, page) {


            console.log("This page (" + $(page).jqmData("url") + ") has been initialized");

            ////jquery mobile router bookmark deep linking hack for non-IE browsers (/index.html#one?q=1)
            if ('' !== window.location.hash && '#' !== window.location.hash && $.browser.msie != true) {
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


        App.DefaultHandler = function () {
            alert('no routes found');
        };

        var init = function () {
            App.Router = new $.mobile.Router(
                {
                    "#index(?:[?](.*))?": {
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







