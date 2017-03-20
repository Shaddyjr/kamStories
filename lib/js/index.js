var newStory = {
		"name": "A Love Too Strong",
		"age": "12 and up",
		"origin": "China",
		"themes" : ["Love", "Over-protection", "Adaptation"],
		"length" : "short",
		"content" : " One year, during the autumn time,  a flock of swans arrived on a small island by Swan Lake. They flew from the north from faraway lands, getting ready to venture south for the winter. On this island lived a fisherman and his wife. When they saw their in-flown guests, they were extremely happy, bringing them fodder and fish they had caught, feeding them with great compassion and care. Winter came, but this flock of swans still did not continue flying to the south. The surface of the lake froze. The swans had no way of acquiring food. The old couple opened up their grass hut to let the swans stay warm and continue to get their food, until the second spring came when the ice from the lake melted away. Day after day, year after year, every year during the winter time, this old couple provided food and shelter to the swans with great love. Finally, one year, they became quite elderly and had to leave the small island; the swans since then disappeared as well. However, it wasn’t because the swans flew south, but rather on the second year that the lake froze, they died of starvation. In the story, the fisherman couple treated the swans as if they were their beloved children very lovingly and carefully, monitoring food and shelter, day in and day out, year in and year out. With such giving and loving hearts, people could not help but to cry out, “What a loving couple; what lucky swans!” However, the tragic ending of the swans tell us that it is because of the fisherman couple’s overexertion of love that caused the swans to become weak and unable to adapt to their environment, causing them to perish under the changed conditions of life. In real day-to-day life, how many parents do the same - spending their whole life wholly providing for their children’s food, shelter and comfort in order to give them a loving home! This is the classic story of “The Fisherman Couple” style of parenting and the parents’ grand results of selflessness. In actuality, this type of love - this type of meticulous and continuous giving is actually a life trap. Once “the lake freezes over”, their endings will not be any better than the swans. People do need to love, but when love becomes elevated to a state of providing a life of total comfort, a type of over-protection, it is no longer just love, but a gentle looking, deadly blade. After reading this story, how do you feel?",
		"asset":"assets/swans.png",
		"reference" : "none" 
	}

$(document).ready(function(){
	// for setting height on text div
	$(".mainHead").css("margin-top",$(".mainNav").height());
	$("#latest").text(newStory.name);
});
