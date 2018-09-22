/*
 * Create a list that holds all of your cards
 */
const pics = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", 
"fa fa-paper-plane-o","fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt",
"fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle",
"fa fa-bicycle","fa fa-bomb", "fa fa-bomb"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 // Shuffle function
function shuffle(pics) {
    var currentIndex = pics.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = pics[currentIndex];
        pics[currentIndex] = pics[randomIndex];
        pics[randomIndex] = temporaryValue;
    }

    return pics;
}

shuffle(pics);

 const cardContainer = document.querySelector('.deck');

 let showCards = [];
 let matchedCards = [];

 // Initialize / create cards
function init() {
 for(let i = 0; i < pics.length; i++) {
 	const card = document.createElement("li");
 	card.classList.add("card");
 	card.innerHTML = `<i class="${pics[i]}"></i>`;
 	cardContainer.appendChild(card);

 	// adding click Event to every card
 	click(card);
 }

}

	//event Listener
function click(card) {
	card.addEventListener("click", function() {

		const openedCard = this;
		const previousCard = showCards[0];

		// compare cards

		if(showCards.length === 1) {

			card.classList.add("open", "show", "disable");
			showCards.push(this);

			if(openedCard.innerHTML === previousCard.innerHTML) {
				
				openedCard.classList.add("match");
				previousCard.classList.add("match");

				matchedCards.push(showCards, previousCard);

				showCards = [];

				// checks if game is over

				gameOver();

			// set time to display card before flip

			}else {
				setTimeout(function() {
					openedCard.classList.remove("open", "show");
					previousCard.classList.remove("open", "show");

					showCards = [];

				}, 200);
				
				
			}

			//calling move function
			addMove();
		}else {
			card.classList.add("open", "show", "disable");
			showCards.push(this);
		}
	
	});

	}
//Timer
function setTimer() {
	time = 0;
	timer = setInterval(function() {
		time++;
		console.log(time);
	}, 1000);

}
// clear Timer
function clearTimer() {
	clearInterval(timer);
}
// Finishing game
function gameOver() {
	if(matchedCards.length === pics.length) {
		alert("Game Over!!! it took you: "+ time + "seconds and :"+ rating(moves)+ "...Do you want to play again" );
	}

}


// moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
	moves++;
	movesContainer.innerHTML = moves;

	//calling rating funct
	rating();
}

// Rating star
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
function rating() {
	if(moves < 9) {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
		return("One Star");
	}else if(moves <= 13) {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li>`;
		return("Two Stars");
	}else {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
		return("Three Stars");
	}
}


// reset the game

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {

	//delete all cards
	cardContainer.innerHTML = "";
	// Display cards
	init();

	// reset related variables
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;

	// clear timer
	clearTimer();
	

});


// starting game and timer

init();
setTimer();



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
