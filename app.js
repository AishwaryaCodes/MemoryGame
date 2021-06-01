class AudioControl {
    //initialize values
    constructor(){
        this.flipSound = new Audio('assets/sounds/flip.wav');
        this.matchSound = new Audio('assets/sounds/match.wav');
    }

    //methods
flip(){
this.flipSound.play();
}
match(){
    this.matchSound.play();
}
}

class Game{
    constructor(totalTime, cards){
        this.cardsArr = cards;
        this.totalTime = totalTime;
        this.timer = document.querySelector("#timer");
        this.scores = document.querySelector("#score");
        this.matchScores = 0;
        this.audioObject = new AudioControl();
        this.overlayEnd = document.querySelector(".endgame-model");
        this.visibleCards = [];
    } 


startGame(){
        const timerId = setInterval(() => {
            this.totalTime = this.totalTime - 1
            this.timer.innerText = this.totalTime 
            if(this.totalTime === 0)
            {
                clearInterval(this.timerId);
                this.scoreGrade()
    
            }
            else if (this.totalTime >0 &&(this.matchScores === this.cardsArr.length/2)){
            clearInterval(timerId);
            this.gameWon();
            }
        }, 1000)
}


flipCard(item){
    this.audioObject.flip();
    item.classList.add('visible');
}

matchedOrUnmatched(item){
    this.visibleCards.push(item);

let len = this.visibleCards.length;
if (len === 2)
{
if(this.visibleCards[0].querySelector('.card-front-face img').src === this.visibleCards[1].querySelector(".card-front-face img").src){
    this.cardsMatched();
   // console.log("cards are matched")
}
else{
   this.cardsUnmatched();
   //console.log("cards are Unmatched")
}
}
}

cardsMatched(){
    this.visibleCards[0].classList.add('matched');
    this.visibleCards[1].classList.add('matched');
    this.visibleCards =[];
    setTimeout(() => {
        this.audioObject.match();
        this.countScore();
    },500);
}

cardsUnmatched(){
    setTimeout(()=>{
        this.visibleCards[0].classList.remove('visible');
        this.visibleCards[1].classList.remove('visible'); 
        this.visibleCards = []; 
    }, 500); 
}

shuffleArray(arr){
    for(let i = 0; i<arr.length; i++)
{
let randomIndex = Math.floor(Math.random()* arr.length);
[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
}
return arr;
}

countScore(){
    this.matchScores++;
    this.scores.innerText = this.matchScores;
}

gameLost(){
    this.overlayEnd.classList.add('visible'); 
}

gameWon(){
    this.overlayEnd.querySelector('p').innerText = 'You Won'
    this.overlayEnd.classList.add('visible');
}

scoreGrade(){
    overLayEnd.classList.add('visible');
    if (score >= 7)
    {
        this.overLayEnd.querySelector('p').innerText ='Congratulations you won with 5 start '
    }
    else if (score <= 5)
    {
    this.overLayEnd.querySelector('p').innerText ='Congratulations you won with 3 start '
    }
    else 
    {
    gameLost();
    } 
}
}

const ready =() =>
{
    const overLay = document.querySelector(".overlay");
    const replay = document.querySelector(".btn");
const cards = document.querySelectorAll(".cards");
const cardDeck =document.querySelector(".game-container");

let gameObj = new Game(60,cards);

overLay.classList.add('visible');

replay.addEventListener('click',()=> window.location.reload());

const shuffledCards = gameObj.shuffleArray(Array.from(cards));
shuffledCards.forEach(card => cardDeck.appendChild(card));

overLay.addEventListener('click',()=>{
    overLay.classList.remove('visible');
    gameObj.startGame();
})

cards.forEach(item=>{
item.addEventListener('click',()=>{
        gameObj.flipCard(item);
        gameObj.matchedOrUnmatched(item);
    })
})
}


if (document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded',ready);
}
else {
    ready();
}




























































































