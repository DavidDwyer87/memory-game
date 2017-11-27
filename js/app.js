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
var move = {};

var queue = [];


//deck constructure class
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

//game constructure class
var Game = function()
{
	var deck = new Deck();
	this.deck = deck;
	this.shuffled = deck.shuffleCards();
	this.showCount = 0;

	move = new Moves();
};

//create a new gme
Game.prototype.newGame = function()
{
	this.shuffled = this.deck.shuffleCards();
}

//add cards to deck
Game.prototype.addToDeck = function()
{

	var deck = clearDeck();	

	move.ReturnToZero();

	for (var i = 0; i < this.shuffled.length; i++) {
		deck.append("<li class='card' data-card-number ='"+i+"'>"+
							"<i class=' fa "+this.shuffled[i]+"'></i>"+
						 "</li>");
	}

	$('.card').click(this.cardHandler);
};

//event handler for cards
Game.prototype.cardHandler = function(){

	var icon = $(this);
	icon.attr({class:'card open show'});
	
	queue.push(icon);
	determine();
	/*if(first == '')
	{
		first = icon;
	}
	else 
	{
        //compare card numbers so that a showing card is not click twice.
		if (first.data('card-number') !== icon.data('card-number')) {
			second = icon;	
		}
		else
		{
			return;
		}
		
		if(first.html()==second.html())
		{			
		}
		else
		{
		}

		//update moves
		
	}*/

	move.increment();				
};

//move constructure class
var Moves = function()
{
	//initialize move count variable
	this.moveCounter = 0; //move tracker
	this.countDown = 5; //stars tracker

	// add count to UI
	$('.moves').html(this.moveCounter);
    
    //add 5 starts
    for(var i=1; i<6; i++){    	
		$('.stars').append("<li>"+
								"<i class='fa fa-star'></i>"+
						 	"</li>");	
    }
    
    window.sessionStorage.setItem('stars',5);
    window.sessionStorage.setItem('moves',0);    
};

Moves.prototype.getMoves = function(){
	return this.moveCounter;
};

Moves.prototype.getStars = function(){
	return this.countDown;
};

//increment for every move
Moves.prototype.increment = function(){
	this.moveCounter++;

	//remove star when the moveCounter 13, 26, 39, 52, 65
	if(this.moveCounter == 13 || this.moveCounter == 26 || this.moveCounter == 39 || this.moveCounter == 52 || this.moveCounter == 65){
		var star = '';
		//remove a star
		$('.fa-star').each(function(){
			star = $(this);
		});

		//remove star
		star.attr({class:'fa fa-star-o'});

		//knock off a star
		this.countDown--;
		window.sessionStorage.stars = this.countDown;
	}
    
    //update count on UI
	$('.moves').html(this.moveCounter);
	window.sessionStorage.moves = this.moveCounter;
};

//return to zero 
Moves.prototype.ReturnToZero = function(){
	this.moveCounter = 0;
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

var determine = function(){
	if(queue.length>=2){
		var card1 = queue.pop();
		var card2 = queue.pop();

		if (card1==card2) {
			correctCards(card1);
			correctCards(card2);
		}
		else
		{
			incorrectCards(card1);
			incorrectCards(card2);
		}

		//console.log(queue.pop());	
	}	
};

var correctCards = function(card){

	card.animate({
			width:'118px',
			height:'118px',
			left: '7px'
		},"fast",function(){
			card.animate({
					width:'125px',
					height:'125px',
					left: '0px'
				},
				{
					duration:'fast',
					specialeasing:{
					width:'easeOutBounce',
					height: 'easeOutBounce'
				},
				function()
				{
					window.setTimeout(function(){
						card.attr({class:'card match'});
						
						//remove event handle
						card.off('click');
					},800);
				}
			});
	});

};

var incorrectCards = function(card){
	card.attr({class:'card incorrect'});

	card.animate({
				marginLeft:'-8px',
			},"fast",
			function(){				
				card.animate({marginLeft:'0px'},'fast',function(){
					window.setTimeout(function(){
						card.attr({class:'card'});					 			
					},300);					
				});				
			});	
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
