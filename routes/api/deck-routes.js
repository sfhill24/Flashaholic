const router = require("express").Router();

const { DeckController } = require("../../controllers");
const withAuth = require("../../middleware/isAuthenticated");

//POST decks to favorites and myDecks page when save button is clicked
router.post("/:id/favorites", withAuth, DeckController.addFavorite);

//POST deck once created
router.post("/", withAuth, DeckController.createDeck);

//DELETE created deck
router.delete("/:id", withAuth, DeckController.deleteDeck);

// GET flashcard deck info
router.get("/cards/:id", withAuth, DeckController.getDeck);

//DELETE favorite deck
router.delete("/:id/favorites", withAuth, DeckController.getFavorites);

module.exports = router;
