var myObj;
// Good Modal Example
// https://jsfiddle.net/KyleMit/0fscmf3L/
$( window ).resize(function() {
	$(".mainHead").css("margin-top",$(".mainNav").height());
});

$(document).ready(function(){
	// for setting height on text div
	$(".mainHead").css("margin-top",$(".mainNav").height());

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
	var content;
	var ref;
	var name;
	var items = [];
	$.each( obj, function( key, val ) {
		if (key=="name"){
			name = val;
		}else if(key=="themes"){
			for (var i in val){
				items.push(val[i]);
			}
		}else if(key =="content"){
			content = val.split(". ");
		}else if(key == "reference"){
			ref = val;
		}else{
			info.push(capFirst(key) + " : " +val);
		}
	});

	$("div.mainHead").append("<h1 class = 'name'>" + name + "</h1>");
	$("div.mainHead").append("<p class = 'themes'> Themes: " + items.join(", ") + "</p>");
	$("div.mainHead").append("<p class = 'info'>" + info.join(" | ") + "</p>");
	for (var i in content){
		$("div.mainHead").append("<p class='content'>" + content[i] + ".</p>");
	}
	if (ref){
		$("div.mainHead").append("<a href=" + ref + " target = '_blank'> Reference </a>");
	}
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
		$("div.mainHead").append("1 story found with the theme: " + theme);
	}else{
		$("div.mainHead").append(found.length + " stories found with the theme: " + theme);
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
		"name": "The Secret to Mastering an Art",
		"age": "6 to 12",
		"origin" : "China",
		"themes" : ["Perseverance", "Hard work", "Patience"],
		"length" : "short",
		"content": "Wang Xianzhi was the youngest of seven siblings, son of Wang Xizhi, a well-renowned calligrapher in China. At the age of seven or eight years old, Xianzhi began to learn how to write Chinese calligraphy. One day, Xianzhi asked his dad, 'What is the secret to mastering the art of calligraphy?' The father brings his son out to the front yard and pointed to 18 barrels of water. 'The secret lies there. Grind your ink stone, and use the water from these 18 barrels. When you have finished using the water from all 18 barrels, you will have unraveled the mysteries to the art.'Xianzhi heard this and was shocked upon the revelation. His father was telling him that hard work and perseverance was the secret to become a great calligraphist. Xianzhi then understood that his father's success was also the result of years of patience, hard work and diligence. From then on, Xianzhi used the water from the barrels to write with every day. Several years later, he finished using the water from the 18 barrels, and his skill in Chinese calligraphy improved.When Xianzhi grew up, he became known as 'Little Saint'. The people called him and his father 'The Two Masters'. From the success of Xianzhi and Xianxi, one can see - If one does not put in the time and effort to master a skill, you cannot solely depend upon luck and talent to become successful.",
		"reference":"http://www.pswu.com/wongtaisin/6m.htm"
	},
	"1":{
		"name":"The Lion and the Mouse",
		"age": "6 to 12",
		"origin": "Greece",
		"themes" : ["Kindness", "Forgiveness", "Karma"],
		"length" : "short",
		"content" : "A long time ago, a mighty lion lived in the forest. One day, as the lion was sleeping in the midst of the forest, a little mouse suddenly ran across his face and woke the lion up. The lion was angry and swiftly grabbed and lifted up the mouse to his face, ready to devour the mouse. The mouse cried out in fear and exclaimed, 'Brother Lion, please don't eat me and let me go. If you release me, one day I will repay you for your kindness.' The lion roared in laughter. 'Haha! What can a small, little mouse like you do to repay me? But since you are so bold to make such a statement, I will set you free this time.' A long time passed. One day, as the lion was crossing the forest, he fell into a hunter's trap and got entangled by the trap's ropes. The lion roared and roared for help. The little mouse that the lion had freed heard the lion's cries and scurried to where the lion was trapped. Using his sharp teeth, the mouse gnawed at the rope bit by bit until the lion was freed from the trap. The lion picked up the mouse, and said with great relief and gratitude, 'Previously when I had set you free, I didn't believe you were really able to repay me. But today, you have saved my life. Thank you, little mouse.'" ,
		"reference" : "none"
	},
	"2":{
		"name": "The Three Seasons - Variation 1",
		"age": "All ages" ,
		"origin": "China",
		"themes" : ["Truth", "Disagreement", "Mediation"],
		"length" : "short",
		"content" : "One day, Confucius's student was outside sweeping when a visitor came to ask him, 'Who are you?' The student proudly exclaimed, 'I am a student of Confucius!' The visitor then said, 'That's great. Can I ask you a question then?' The student happily said, 'Yes!' In his heart, he wondered, what kind of strange question would I be asked? The visitor asked, 'How many seasons are there in a year?' The student thought to himself, what kind of question is that? He then responded, 'Spring, summer, autumn and winter - four seasons.' The visitor shook his head and said, 'Incorrect. A year only has three seasons.' 'Hmf, you are mistaken - four seasons!' 'Three seasons!' In the end, the two could no longer continue the argument, and decided to put down a bet: if there were four seasons, the visitor would bow to the student three times. If there were three seasons, the student would bow to the visitor three times. Confucius's student thought for sure he would win this bet, so he brought the visitor to see his teacher Confucius. At that precise moment, Confucius was coming out of the house. The student approached the teacher and said, 'Teacher, how many seasons are there in a year?' Confucius took one look at the visitor and said, 'A year has three seasons.' The student was shocked beyond words, but he did not dare to immediately question his teacher. The visitor immediately said, 'Quick, bow to me!' The student had no choice but to bow three times to the visitor. After the visitor left,  the student couldn't wait to ask Confucius. 'Teacher, it is obvious that there are four seasons, why did you say there are three seasons?' Confucius said, 'Did you not see that the person's body before was entirely green? He is a locust. Locusts are born in the spring an die in the autumn. He has never seen winter. If you tell him there are three seasons, then he will be satisfied. If you tell him there are four seasons, you can argue until night falls and hear no end to it. You suffer a small loss by bowing three times. It's no big deal.' From this story, the listener can reflect that sometimes it is not necessary to argue if a matter is true or false, right or wrong. To the person who believes in three seasons to be the truth of the matter, it is because they have never seen the evidence of what is in fact truth. Hence, if you get angry and argue with such a person, you are only causing your own suffering.  The next time you want to get angry at someone for not seeing things that way you see them, just remember that this is a 'Three Seasons' person, and your anger may dissipate.",
		"reference" : "none"
	},
	"3":{
		"name": "The Three Seasons - Variation 2",
		"age": "All ages" ,
		"origin": "China",
		"themes" : ["Truth", "Disagreement", "Mediation"],
		"length" : "short",
		"content" : "One day, a butcher came to seek out Confucius on a particular question. Confucius was not present, so Confucius's student said, 'My teacher is currently not at home. Perhaps I can help with your inquiry.' The butcher said to the student, 'People say that there are four seasons in a year, but I believe there are three seasons in a year. How many seasons are there in a year?' The student promptly responded, 'There are four seasons.' The butcher shook his head and did not accept that answer. 'A year only has three seasons.' 'No, there are four seasons!' The argument carried on back and forth until the two decided to put down a bet: if there were four seasons, the butcher would cut off his head to present to the student. If there were three seasons, the student would take off his scholar's cap and present it to the butcher. (The scholar's cap is an item of high prestige to the scholar.' With that bet made, they waited until Confucius returned. When Confucius returned, he listened to the student tell him about the argument and the bet. Without hesitation, Confucius responded, 'A year has three seasons.' The student was shocked beyond words, but he did not dare to immediately question his teacher. The student had no choice but to remove his scholar's cap and bow in apology to the butcher. After the butcher left,  the student couldn't wait to ask Confucius. 'Teacher, it is obvious that there are four seasons, why did you say there are three seasons?' Confucius said, 'If I told the butcher, there are four seasons to a year, he would've cut off his own head in his ignorance. Since I told the butcher there are only three seasons to a year, you only had to remove your scholar's cap. You suffered a small loss of embarrassment in comparison to what the butcher's loss for his life would have been. It's no big deal.' From this story, the listener can reflect that sometimes it is not necessary to argue if a matter is true or false, right or wrong - especially if there are dire consequences attached to one's point of view. To the person who believes in three seasons to be the truth of the matter, it is of their own ignorance and stubbornness that you may not be able to persuade them. Hence, if you get angry and argue with such a person, you are only causing your own suffering.",
		"reference" : "none"
	}
}

for (var i in myObj){
	parseText(myObj[i]);
}
