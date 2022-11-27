const router = require("express").Router();
const { Card, Deck, Favorite, User } = require("../../models");

const { PageController } = require("../../controllers");
const withAuth = require("../../middleware/isAuthenticated");

//GET all decks and render  availableDecks page
router.get("/", withAuth, PageController.allAvailableDecks);

//Render create deck page
router.get("/create", withAuth, PageController.create);

router.get("/:id", withAuth, PageController.flashcard);

//GET all user created and favorite decks and render my decks page
router.get("/myDecks", withAuth, PageController.myDecks);

module.exports = router;
