# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Memory Game 
 The Memory is a simple game. its objective is the uncover all the hidden cards and find the match for the appropriate cards selected. The game tracks the amount of moves made and how quicky the user completes the game. There is a star system that rates how well the game is played, the more moves the player makes the lower the rating is for the game.

## Dependencies

Icons are provided by font-awsome. The css library provides the 
* stars
* icons for the cards
* reset button icon 
https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css

JQuery library used to provided functionalty and animate the cards.
https://code.jquery.com/jquery-3.0.0.min.js

The game use sessionStorage to store:
*the amount of moves made by user to complete the game.
*the amount of time take to complete the game.
*the amount of star they achieve.
the session storage is only supported by browser that supports html5.
