// Memory Card Game

// 1. Decide how many cards the user sees (8,12,16,24)
// I used 8 cards

// 3. Cache cards using querySelectorAll()
const cards = document.querySelectorAll(".front");
console.log(cards);

// 4. Variables for user's first choice, second choice, and time
let firstChoice = null;
let secondChoice = null;
let time = 15;
let matchs = 0;
let timer;
let lockBoard = true;

// 6. Cache start button
const startButton = document.querySelector("#start-btn");
const restartButton = document.querySelector("#restart-btn");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");

console.log(startButton);


// 7. Timer goes down by 1 second using setInterval
function handleStart() {
    lockBoard = false;
    console.log("Game Started");
    message.textContent = "";
    timer = setInterval(function () {
        time--;
        timeDisplay.textContent = time;
        console.log("Time:", time);
        if (time === 0) {
            clearInterval(timer);
            timeDisplay.textContent = 0;
            message.textContent = "❌ Game Over! Try Again";
            console.log("Lose!");
        }
    }, 1000);
    shuffleCards()
}

startButton.addEventListener("click",handleStart);


// 8. Array of card strings (same size as cards)
let revealCards = [
    "barca.png",
    "M.City.png",
    "PSG.png",
    "Madrid.png",
    "barca.png",
    "M.City.png",
    "PSG.png",
    "Madrid.png"
];


// Shuffle cards randomly
function shuffleCards(){

    revealCards.sort(function(){

        return Math.random() - 0.5;

    });

}


// Add index to cards
cards.forEach(function(card,index){

    card.dataset.index = index;

});


// 9 + 11 + 12. Handle card clicks
function handleClick(event){

    if(lockBoard === true) return;


    console.log("Card clicked");


    let clickedCard = event.target;

    let index = clickedCard.dataset.index;


    if(clickedCard === firstChoice) return;



    if(firstChoice === null){

        firstChoice = clickedCard;

        clickedCard.src = revealCards[index];

        console.log("First card selected");


    }else if(secondChoice === null){

        secondChoice = clickedCard;

        clickedCard.src = revealCards[index];

        console.log("Second card selected");


        checkMatch();

    }

}


// 10. Attach handleClick to all cards
cards.forEach(function(card){

    card.addEventListener("click",handleClick);

});


// 13. Check match
function checkMatch(){

    if(firstChoice.src === secondChoice.src){

        matchs++;

        scoreDisplay.textContent = matchs;


        console.log("Match!");


        // Win condition

        if(matchs === 4){

            clearInterval(timer);

            lockBoard = true;

            message.textContent = "🏆 You Won the Champions League!";

            console.log("Winner!");

        }


        firstChoice = null;

        secondChoice = null;


    }else{


        console.log("Not Match");


        lockBoard = true;


        setTimeout(function(){


            firstChoice.src = "./Card.png";

            secondChoice.src = "./Card.png";


            firstChoice = null;

            secondChoice = null;


            lockBoard = false;


        },1000);

    }

}


// Restart button

function restartGame(){

    clearInterval(timer);


    time = 15;

    matchs = 0;

    lockBoard = false;


    scoreDisplay.textContent = matchs;

    timeDisplay.textContent = time;

    message.textContent = "";



    shuffleCards();



    cards.forEach(function(card){

        card.src = "./Card.png";

    });



    firstChoice = null;

    secondChoice = null;


    console.log("Game Restarted");

}


restartButton.addEventListener("click",restartGame);