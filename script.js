const overLay = document.querySelector(".overlay");
const timer = document.querySelector("#timer");
const overLayEnd = document.querySelector(".endgame-model");
const replay = document.querySelector(".btn");
const cards = document.querySelectorAll(".cards");
const cardDeck =document.querySelector(".game-container");
const scored = document.querySelector("#score");

let visibleCards = [];
let score = 0;

//this fun is called after loading of the page
const ready = () =>{
    overLay.classList.add('visible');
    const shuffled = shuffleArray(Array.from(cards))
    shuffled.forEach(card =>cardDeck.appendChild(card))
}

//for starting the game
const startGame = (totalTime ) => {
    const timerId = setInterval(() => {
        totalTime = totalTime - 1
        timer.innerText = totalTime 
        if(totalTime === 0)
        {
            clearInterval(timerId);
            scoreGrade()
           
        }
        else if (totalTime >0 &&(score === cards.length/2)){
        clearInterval(timerId);
        gameWon();
        }
    }, 1000)
}

//Play the sound for flip card
const sound = ()=> {
const audio = new Audio('assets/sounds/flip.wav');
audio.play()
}

//play sound for match card 
const playMatchSound = ()=> {
    const audio = new Audio('assets/sounds/match.wav');
    audio.play()
    }

//to flip the cards
const flipCard = (item) => {
item.classList.add('visible');
}

//to check matched or unmached
const matchedOrUnmatched = (item)=>{
visibleCards.push(item);

let len = visibleCards.length;
if (len === 2)
{
if(visibleCards[0].querySelector('.card-front-face img').src === visibleCards[1].querySelector(".card-front-face img").src){
    cardsMatched();
   // console.log("cards are matched")
}
else{
   cardsUnmatched();
   //console.log("cards are Unmatched")
}
}
}

//when the 2 cards are matched
const cardsMatched = ()=>{
    visibleCards[0].classList.add('matched');
    visibleCards[1].classList.add('matched');
    visibleCards =[];
    setTimeout(() => {
        playMatchSound();
        countScore();
    },500);
}

//when the 2 cards are not matched
const cardsUnmatched = () =>{
    setTimeout(()=>{
        visibleCards[0].classList.remove('visible');
        visibleCards[1].classList.remove('visible'); 
        visibleCards = []; 
    }, 500); 
} 
  
//to shuffle the cards - fisher-yates shuffle
const shuffleArray = (arr) =>{
for(let i = 0; i<arr.length; i++)
{
let randomIndex = Math.floor(Math.random()* arr.length);
[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
}
return arr;
}


//to count the score 
const countScore = ()=>{
    score++;
    scored.innerText = score;
    }

//to count the score grade 
const scoreGrade = ()=>{
    overLayEnd.classList.add('visible');

     //score can be = 6,7, 8 
    if (score >= 6)
    {
        overLayEnd.querySelector('p').innerText ='Congratulations You Won. Grade: 5 start! '
    }
    //score can be 3,4,5
    else if (score >= 3) 
    {
    overLayEnd.querySelector('p').innerText ='Congratulations You Won. Grade: 3 start ! '
    }
    //score 0,1,2
    else 
    {
    gameLost();
    } 
}

//when game is lost
const gameLost = ()=>{
    overLayEnd.classList.add('visible');
}

//when game is won
const gameWon = ()=>{
    overLayEnd.querySelector('p').innerText = 'You Won'
    overLayEnd.classList.add('visible');
}



//*********************Event Listner*********************** */
    overLay.addEventListener('click',()=>{
    overLay.classList.remove('visible');
    startGame(60)
})

    replay.addEventListener('click',()=>{
        window.location.reload()
    })

    cards.forEach(item=>{
    item.addEventListener('click',()=>{
            sound();
            flipCard(item);
            matchedOrUnmatched(item);
        })
    })

//first male sure if the content on dom is loaded
if (document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded',ready);
}
else {
    ready();
}
