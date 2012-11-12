/// reference path="../libs/jquery.d.ts" />
declare var $: any;

//namespaces
export module Utils{
	
    export function Load (tmplName, callback) {   
	    var name = tmplName;
        console.log('Loading template: ' + name);
        $.get('templates/' + name + '.html', function(data) {
            callback(data);
        });
        return this;
	} 

}

