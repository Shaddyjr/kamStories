var myObj;
var items = [];

var parseText = function(obj){
	$.each( obj, function( key, val ) {
		if(Array.isArray(val)){
		    items.push( "<p>" + key.toUpperCase() + ": " + val.join(", ") + "</p>" );
		}else{
		    items.push( "<p>" + key.toUpperCase() + ": " + val + "</p>" );
		}
		});
	$("div.mainHead").append(items.join(""));
}

$.getJSON("assets/story.json", function(data){
	myObj = data;
	for (var i in myObj){
		parseText(myObj[i]);
	}
})

