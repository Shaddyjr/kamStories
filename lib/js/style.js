$( window ).resize(function() {
	$(".mainHead").css("margin-top",$(".mainNav").height());
});

$(document).ready(function(){
	// for setting height on text div
	$(".mainHead").css("margin-top",$(".mainNav").height());
});

//Function for parsing url parameters
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}