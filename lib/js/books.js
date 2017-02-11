var myObj;
// Good Modal Example
// https://jsfiddle.net/KyleMit/0fscmf3L/

$.urlParam()

$(document).ready(function(){
	// for including all themes in search
	var themes = getThemes();
	for (var i in themes){
		$("ul.dropdown-menu").append("<li><p class='themeSubmit' onclick='themeSubmit(this)'>"+themes[i]+"</p></li>");
	}
 	// for pressing enter on search
  	$('#searchBar').keydown(function(event) {
  		if (event.keyCode == 13) {
  			startSearch($("#searchBar").val());
  			$("#searchBar").val("");
        }
    })
});

var themeSubmit = function(element){
	searchTheme(element.innerText);

}

var getThemes = function(){
	var output = [];
	var themes;
	for (var i in myObj){
		themes = myObj[i].themes;
		for (var k in themes){
			if(!output.includes(themes[k])){
				output.push(themes[k]);
			}
		}
	}
	return output;
}

var capFirst = function(string, flag = false, split = " "){
	//with 1 string argument, returns a string with first letter capitalized
	//with flag = true, will return string of all first letters after string splitting using split
	if (flag){
		var temp = string.split(split);
		var output = [];
		for(var i in temp){
			output.push(capFirst(temp[i]));
		}
		return output.join(split);
	}else{
		return string[0].toUpperCase() + string.slice(1);
	}
}

var parseText = function(obj){
	var info = []; //used for storing smaller info
	var review,summ,name,asset,author;
	var items = [];
	$.each( obj, function( key, val ) {
		if (key=="name"){
			name = val;
		}else if(key=="themes"){
			for (var i in val){
				items.push(val[i]);
			}
		}else if(key =="review"){
			review = val
		}else if(key == "summary"){
			summ = val;
		}else if(key == "author"){
			author = val;
		}else if(key == "asset"){
			asset = val;
		}
		else{
			info.push(capFirst(key) + " : " +val);
		}
	});

	$("div.mainHead").append("<h1 class = 'name'>" + name + "</h1>");
	if(asset){
		$("div.mainHead").append("<div class = 'divImg' style='background-image:url(\""+ asset +"\"); width: 15%;'><img class= 'assetIMG' src=" + asset + "></div>");
	}
	$("div.mainHead").append("<h3> Author: " + author + "</h3>");
	$("div.mainHead").append("<p class = 'themes'> Themes: " + items.join(", ") + "</p>");
	$("div.mainHead").append("<p class = 'info'>" + info.join(" | ") + "</p>");

	$("div.mainHead").append("<p> Summary: " + summ + "</p>");
	$("div.mainHead").append("<p> Review: " + review + "</p>");

	// adding horizontal line separator
	$("div.mainHead").append("<hr>");
}

// $.getJSON("assets/story.json", function(data){
// 	myObj = data;
// })

var searchTheme = function(theme){
	var found = [];
	for( var i in myObj){
		if(myObj[i].themes.includes(theme)){
			found.push(myObj[i]);
		}
	}
	//clear content
	$(".mainHead").empty();

	if (found.length == 1){
		$("div.mainHead").append("1 book review found with the theme: " + theme);
	}else{
		$("div.mainHead").append(found.length + " book reviews found with the theme: " + theme);
	}
	$("div.mainHead").append("<hr>");
	for (var k in found){
		parseText(found[k]);
	}
}

var startSearch = function(word){
	//clear content
	$(".mainHead").empty();
	var content;
	// conduct search
	var results = searchKeyword(word);
	// If search found, display results, else display nothing found
	if(results.length>0){
		if (results.length == 1){
			$("div.mainHead").append("1 story found!");
		}else{
			$("div.mainHead").append(results.length + " stories found!");
		}
		$("div.mainHead").append("<hr>");
		for( var i in results){
			parseText(results[i]);
		}
	}else{
		content = "NO RESULTS FOUND";
	}
	$("div.mainHead").append(content);
	highlightWord(word);
}

var searchKeyword=function(word){
	var output = [];
	for (var i in myObj){
		if (findKeyword(myObj[i], word)){
			output.push(myObj[i]);
		}
	}
	return output;
}

var findKeyword = function(obj, word){
	// returns true if word is found in object
	var re = new RegExp(word.toLowerCase());
	for (var i in obj){
		if (Array.isArray(obj[i])){
			for ( var k in obj[i] ){
				if (obj[i][k].toLowerCase().search(re)>-1){
					return true;
				}				
			}
		}else if(obj[i].toLowerCase().search(re)>-1){
			return true;
		}
	}
	return false;
}
var highlightWord = function(word){
	var content = $(".mainHead").children();
	var re = new RegExp(word,"gi"); //g sets as global = all occurances, i makes it case insensitive
	for (var i =0; i <content.length; i++){
		content[i].innerHTML = content[i].innerHTML.replace(re, "<span class = 'highlight'>"+ "$&" + "</span>"); //"$&" is the matched substring
	}
}

myObj = {
	"0": {
		"name": "As Brave As You",
		"author": "Jason Reynolds",
		"age": "12 and up",
		"origin" : "USA",
		"stars":"9 out of 10",
		"themes" : [ "Family", "Honesty", "Responsibility", "Love", "Kinship"],
		"summary": "Two young city boys, Ernie and Eugene (aka Genie), go away for one month during their summer break to live in the countryside of Virginia with their grandparents having new chores and expectations to fulfill, meeting new friends and a romantic prospect, and getting to know grandma and grandpa more as well as the past of their deceased Uncle Wood. Meanwhile the parents of Ernie and Genie take a much needed, first-time couples vacation since the birth of their children - to reconcile their strained relationship and decide whether divorce is eminent. Adventure and untold family stories ultimately unfold as the boys discover the fears and insecurities of one another, buried pains of the family’s past, the hurdles of family tribulations and ultimately, the growth of each individual’s love and understanding for one another and the strengthening of the family as a whole.",
		"review": "I deeply liked the story and themes of the story. Though it is fiction, the plot and characters were highly believable and pulled me right into the flow of the story. Touching to the heart and soul, full of examples of human errs and efforts each individual makes towards reconciliation.",
		"asset":"assets/asBrave.jpg",
	}
}

if($.urlParam("search")){
	startSearch($.urlParam("search"));
}else{
	for (var i in myObj){
		parseText(myObj[i]);
	}
}
