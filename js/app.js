/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

//variables	
var cardArrayRef = ['fa-diamond','fa-paper-plane-o',
	'fa-anchor','fa-bolt','fa-cube',
	'fa-leaf','fa-bicycle','fa-bomb'];

var cards = [];
var first = '';
var second = '';

var Deck = function()
{		
	 //create card deck
	 for (var j = 0; j<2; j++) {
		for (let i = 0; i <cardArrayRef.length; i++) {
			cards.push(cardArrayRef[i]);
		} 	
	 }
}

Deck.prototype.shuffleCards = function(){
    //shuffle the the locations
	let shuffled = shuffle(cards);
    return shuffled; 
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


var Game = function()
{
	var deck = new Deck();
	var shuffled = deck.shuffleCards();	

	//UI Deck
	var html_deck = $('.deck');
    
    //clear cards
	html_deck.empty();


	for (var i = 0; i < cards.length; i++) {
		html_deck.append("<li class='card' data-card-number ='"+i+"'>"+
							"<i class=' fa "+shuffled[i]+"'></i>"+
						 "</li>");
	}

	$('.card').click(cardHandler);
}

var cardHandler = function(){

	var icon = $(this);
	icon.attr({class:'card open show'});
	
	if(first == '')
	{
		first = icon;
	}
	else 
	{
        //compare card numbers so that a showing card is not click twice.
		if (first.data('card-number') !== icon.data('card-number')) {
			second = icon;	
		}
		

		if(first.html()==second.html())
		{
			$(first).attr({class:'card match'});
			$(second).attr({class:'card match'});
		}
		else
		{
			$(first).attr({class:'card'});
			$(second).attr({class:'card'});				
		}

		first = '';
		second = '';
	}
};

$(document).ready(function(){
	var game = new Game();	
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
