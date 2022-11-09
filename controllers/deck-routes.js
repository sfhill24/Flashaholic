const router = require("express").Router();
const { Card, Deck, Favorite, User } = require("../models");
const withAuth = require("../middleware/isAuthenticated");

//GET all decks and render  availableDecks page
router.get("/", withAuth, async (req, res) => {
  try {
    let dbAllDecks = await Deck.findAll({
      where: { is_public: true },
      attributes: ["id", "title", "is_public", "user_id"],
      include: [
        {
          model: Favorite,
          attributes: ["id", "user_id", "deck_id"],
        },
        {
          model: Card,
          attributes: ["id", "user_id", "deck_id", "front_text", "back_text"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const allDecks = dbAllDecks.map((x) => x.get({ plain: true }));
    for (let i = 0; i < allDecks.length; i++) {
      if (allDecks[i].user_id == req.session.currentUser.id) {
        allDecks[i].isOwner = true;
      } else {
        allDecks[i].isOwner = false;
      }

      if (
        allDecks[i].favorites.find(
          (fav) => fav.user_id == req.session.currentUser.id
        ) != undefined
      ) {
        allDecks[i].isFavorited = true;
      } else {
        allDecks[i].isFavorited = false;
      }

      if (
        allDecks[i].favorites.find(
          (fav) => fav.user_id == req.session.currentUser.id
        ) != undefined
      ) {
        allDecks[i].isFavorited = true;
      } else {
        allDecks[i].isFavorited = false;
      }
    }

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

router.get("/:id", withAuth, async (req, res) => {
  try {
    let dbFlashcard = await Deck.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title"],
      include: [
        {
          model: Card,
          attributes: ["id", "user_id", "deck_id", "front_text", "back_text"],
        },
      ],
    });
    const flashcards = dbFlashcard.dataValues.cards.map((x) =>
      x.get({ plain: true })
    );
    const deckTitle = dbFlashcard.dataValues.title;
    const id = dbFlashcard.id;
    res.render("flashcard", { flashcards, deckTitle, id, loggedIn: true });
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
