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


var first = '';
var second = '';

var Deck = function()
{	
    var cards = [];

	//create card deck
	for (var j = 0; j<2; j++) {
		for (let i = 0; i <cardArrayRef.length; i++) {
			cards.push(cardArrayRef[i]);
		} 	
	}

	this.c = cards;
};

Deck.prototype.shuffleCards = function(){
    //shuffle the the locations
	return shuffle(this.c); 
};

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
	this.deck = deck;
	this.shuffled = deck.shuffleCards();	
};

Game.prototype.newGame = function()
{
	this.shuffled = this.deck.shuffleCards();
}


Game.prototype.addToDeck = function()
{
	var deck = clearDeck();	


	for (var i = 0; i < this.shuffled.length; i++) {
		deck.append("<li class='card' data-card-number ='"+i+"'>"+
							"<i class=' fa "+this.shuffled[i]+"'></i>"+
						 "</li>");
	}

	$('.card').click(cardHandler);
};


var clearDeck = function()
{
	//UI Deck
	var html_deck = $('.deck');
    
    //clear cards
	html_deck.empty();

	//remove event 
	$('.card').off('click');

	//reset variables
	first = '';
	second = '';

	return html_deck;	
};

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
	//init game with a shuffle
	var game = new Game();	
	game.addToDeck();

	//start click event for restart button.
	$('.restart').click(function(){
		
		//reset game
		game.newGame();
		game.addToDeck();
	});
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
