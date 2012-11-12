require.config({
    urlArgs: "bust=v45",
    paths: {
        backbone: 'libs/backbone-0.5.3',
        text: 'libs/text',
        underscore: 'libs/underscore-1.3.0',
        jquery: 'http://code.jquery.com/jquery-1.8.2.min',
        jqm: 'http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min',
        jqmr: 'libs/jquery.mobile.router',
        app: 'app',
        cordova: 'libs/cordova-2.0.0',
        modernizr: 'libs/modernizr',
        router: 'router'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['jquery', 'underscore' ],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'app': {
            deps: ['jquery', 'backbone', 'jqm', 'jqmr'],
            exports: 'AppLoaded'
        },
        'jqm': {
            deps: ['jquery', 'jqmr'],
            exports: '$$'
        }
    }
});

//load core libs
require(['jquery', 'underscore', 'backbone', 'modernizr'],
    function ($, _, Backbone, modernizr) {

        // Exposing globals just in case that we are switching to AMD version of the lib later
        var global = this;
        global._ = global._ || _;
        global.Backbone = global.Backbone || Backbone;
        console.log('core libs loaded');
        $.support.cors = true;


        //wait for Mobile jquery mobile init'd and loaded Callback
        $(document).bind("mobileinit", function () {

            //config transitions
            if (navigator.userAgent.indexOf("Android") != -1) {
                $.mobile.defaultPageTransition = 'fade';
            }
            else {
               $.mobile.defaultPageTransition = 'none';
            }

        });

        //load jquery mobile
        require(['jqm', 'router', 'jqmr', 'text'],
            function ($$, Router, jqmr, text) {
                console.log("start your engines");

                // in order to prevent viewing unstyled content before all out libraries are loaded
                $('#loaded').show();
                $('#preLoad').hide();

                ///
                /// Start Router 
                /// With an IE Hack for jquery mobile router bookmark deep linking to work, for example /index.html#one?q=1
                ///
                

                if ($.browser.msie) {
                    //start your apps router

                    Router.init();

                    ////jquery mobile router bookmark deep linking hack for bookmarking
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
                    //since the router doesnt work good in IE call the first route manually
                    App.IndexPage();
                    console.log('app started');
                    
                }
                else { //start app normally for other browsers
                    
                    Router.init();

                   
                    require(['app']);
                    console.log('app started');

                }


        });

    });
