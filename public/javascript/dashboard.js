async function deleteDeck(event) {
  const id = event.target.getAttribute("data-deck-id");

  const currentUserId = document.querySelector("[data-current-user-id]").dataset.currentUserId;
  const deckUserId = event.target.getAttribute("data-deck-user-id");

  if (currentUserId == deckUserId) {

    const response = await fetch(`/api/decks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  } else {
    const response = await fetch(`/api/decks/${id}/favorites`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelectorAll(".delete-btn").forEach((item) => {
  item.addEventListener("click", deleteDeck);
});
