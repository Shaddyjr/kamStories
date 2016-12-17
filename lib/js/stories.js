var myObj;
var items = [];
$.getJSON("assets/story.json", function(data){
	myObj = data;
	$.each( data[1], function( key, val ) {
		if(Array.isArray(val)){
		    items.push( "<p>" + key.toUpperCase() + ": " + val.join(", ") + "</p>" );
		}else{
		    items.push( "<p>" + key.toUpperCase() + ": " + val + "</p>" );
		}
	});
	$("div.mainHead").append(items.join(""));
})