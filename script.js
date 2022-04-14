console.log("working")
const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(e){
    let clickedCard = e.target;    //adding click event to all cards
    if(clickedCard !== cardOne && !disableDeck){
        clickedCard.classList.add("flip");
        if(!cardOne){
            cardOne = clickedCard;
        }
        else{
            cardTwo = clickedCard;
            disableDeck = true;
            let cardOneImg = cardOne.querySelector("img").src;
            let cardTwoImg = cardTwo.querySelector("img").src;
            matchCards(cardOneImg, cardTwoImg);
        }
       
    }
}

function matchCards(img1, img2){
    if(img1 === img2){ //cards match, remove click event listener so user can't click these cards again
        matchedCard++;
        if(matchedCard == 8){   //flip all the cards and shuffle
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //setting both cards value to blank
        disableDeck = false; //return otherwise below codes will give error
    }
    else{
        setTimeout(() => {
            cardOne.classList.add("shake"); //If not matched then show shake animation
            cardTwo.classList.add("shake");
        }, 400);
        
        setTimeout(() => { //Remove shake & flip class so they turn back to normal
            cardOne.classList.remove("shake", "flip"); 
            cardTwo.classList.remove("shake", "flip");
            cardOne = cardTwo = ""; //setting both cards value to blank
            disableDeck = false;
        }, 1200);
    }
    

}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";
    let arr = [1, 2,  3, 4, 5, 6, 7, 8, 1, 2,  3, 4, 5, 6, 7, 8];
    arr.sort(()=> Math.random() > 0.5 ? 1 : -1);    //sort randomly
    
    cards.forEach((card, index )=> { //adding click event to all cards
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`
        card.addEventListener("click", flipCard);
    })
}

shuffleCard(); //for the refresh
cards.forEach(card => { //adding click event to all cards
    card.addEventListener("click", flipCard);
})