const router = require("express").Router();
const { Card, Deck, Favorite, User } = require("../models");
const withAuth = require("../middleware/isAuthenticated");

//GET all decks and render  availableDecks page
router.get("/", withAuth, async (req, res) => {
  try {
    let allDecks = await Deck.findAll({
      attributes: ["id", "title", "is_public"],
    });
    res.render("availableDecks", { allDecks, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Render create deck page
router.get("/create", withAuth, async (req, res) => {
  try {
    res.render("createDeck", { loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET deck and render flashcard page
router.get("/flashcard", withAuth, async (req, res) => {
  try {
    let flashcard = await Deck.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: Card,
          attributes: ["id", "user_id", "deck_id", "front_text", "back_text"],
        },
      ],
    });
    res.render("flashcard", { flashcard, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET all user created and favorite decks and render my decks page
router.get("/myDecks", withAuth, async (req, res) => {
  try {
    let myDecks = await Deck.findAll({
      attributes: ["id", "title", "is_public"],
      include: [
        {
          model: Favorite,
          attributes: ["id", "user_id", "deck_id"],
        },
      ],
    });
    res.render("myDecks", { myDecks, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
