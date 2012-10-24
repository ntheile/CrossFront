/// <reference path="views/pages/One"/>
/// <reference path="views/pages/Two"/>

////Non-IE Router
//if (!$.browser.msie) {
//    App.Router = new $.mobile.Router(
//        {
//            // this route code runs anytime a new page is first created before it is marked-up
//            // and before everypage is shown
//            ".": {
//                handler: function (eventType) {
//                    console.log("------------ . fired----------" + eventType);

//                },
//                events: "bc"
//            },
//            "#index": {
//                handler: function (eventType) {
//                    console.log("-----------Index Page fired-------" + eventType);
//                    // see if we have hash tag params
//                    // if so we need to put this hack in the url to get the dynamic content to render 
//                    // /index.html#one?id=12&c=bookmark or /index.html#one?c=bookmark
//                    // * note that bookmarking may not work on IE, they may need to refresh after the first load

//                    if (eventType === 'pagebeforecreate') {
//                        if ('' !== window.location.hash && '#' !== window.location.hash) {
//                            //hash found
//                            var hash = window.location.hash;
//                            //is there a query string in there ?
//                            if ((hash.indexOf("?") !== -1)) {
//                                hash = hash + "?bookmark";
//                            }
//                            else {
//                                hash = hash + "?bookmark";
//                            }

//                            $.mobile.changePage(hash);
//                        }
//                    }

//                },
//                events: "bc,bs"
//            },
//            "#one(?:[?](.*))?": {
//                handler: function (eventType, type, match) {
//                    console.log("-----------one page fired------------" + eventType);

//                    //get the Page One View and Render it.
//                    require(['views/pages/One'], function (__PageView__) {
//                        var PageView = __PageView__;

//                        var PageOne = new PageView.PageOne($('#one :jqmData(role="content")')).render();

//                    });

//                    var params = App.Router.getParams(match[1]);

//                },
//                events: "bs"
//            },
//            "#two": {
//                handler: function (eventType) { console.log("--------------Page two fired-----------" + eventType); },
//                events: "bs"
//            }

//        }
//    );
//}
//else { //IE Router
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

            //TODO - use an index view here and get rid of test view code in app.ts 
            $('sidemenu').listview( "refresh" ).trigger('create');

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


//}






