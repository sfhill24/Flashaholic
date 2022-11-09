var cardArray = [];
var index = 0;
var maxIndex = 0;
const isAuthenticated = document.querySelector("#authBool").textContent;
const deckID = document.querySelector("#deckID").textContent;

async function loadCards() {
    console.log(">>ONLOAD FUNCTION>>");

    if(isAuthenticated){
        response = await fetch('/api/decks/cards/'+deckID, {
            method: "GET",
            headers: { "Content-Type": "application/json" },})
        .then(response => response.json())
        .then(data => {cardArray = data.cards});

        maxIndex = cardArray.length - 1;
        document.querySelector("#cardFront").textContent = cardArray[index].front_text;
        document.querySelector("#cardBack").textContent = cardArray[index].back_text;
    }
}

function nextCard() {
    if(index < maxIndex){
        index++;
        document.querySelector("#cardFront").textContent = cardArray[index].front_text;
        document.querySelector("#cardBack").textContent = cardArray[index].back_text;
    } else {
        index = 0;
        document.querySelector("#cardFront").textContent = cardArray[index].front_text;
        document.querySelector("#cardBack").textContent = cardArray[index].back_text;
    }
}

function prevCard() {
    if(index > 0){;
        index--;
        document.querySelector("#cardFront").textContent = cardArray[index].front_text;
        document.querySelector("#cardBack").textContent = cardArray[index].back_text;
    } else if(index <= 0){
        index = maxIndex;
        document.querySelector("#cardFront").textContent = cardArray[index].front_text;
        document.querySelector("#cardBack").textContent = cardArray[index].back_text;
    }
}

window.onload = function() {
    loadCards();
}

document.querySelector("#prevBtn").addEventListener("click", prevCard);
document.querySelector("#nextBtn").addEventListener("click", nextCard);
