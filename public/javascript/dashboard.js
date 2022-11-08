async function deleteDeck(event) {
  const id = event.target.getAttribute("data-deck-id");

  const response = await fetch(`/api/decks/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document.querySelectorAll(".delete-btn").forEach((item) => {
  item.addEventListener("click", deleteDeck);
});
