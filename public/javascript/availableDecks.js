async function favoriteDeck(event) {
    event.preventDefault();

    const id = event.currentTarget.dataset.deckId;
    
    const response = await fetch(`/api/decks/${id}/favorites`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        }
    });

  if (response.ok) {
    const solidFavBtn = document.querySelector(`[data-deck-id="${id}"]`);
    solidFavBtn.classList.add("fa-solid");
    solidFavBtn.classList.add("favBtnOn");
    solidFavBtn.classList.remove("fa-regular");
  
  } else {
    alert(response.statusText);
  }
}

//add event listener to each card
let favBtns = document.querySelectorAll('.favBtn');
for (let i = 0; i < favBtns.length; i++) {
    favBtns[i].addEventListener('click', favoriteDeck);
}


