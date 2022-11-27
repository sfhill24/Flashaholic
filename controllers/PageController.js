const { User, Deck, Card, Favorite } = require("../models");

module.exports = {
  homepage: (req, res) => {
    Deck.findAll({
      where: {
        is_public: true,
      },
      attributes: ["id", "title", "created_at", "user_id", "is_public"],
      include: [
        {
          model: Card,
          attributes: ["id", "user_id", "deck_id", "front_text", "back_text"],
        },
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Favorite,
          attributes: ["user_id", "deck_id"],
        },
      ],
    })
      .then(dbDeckData => {
        const decks = dbDeckData.map(deck => deck.get({ plain: true }));
        res.render("homepage", {
          decks,
          loggedIn: req.session.isAuthenticated,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  login: (req, res) => {
    if (req.session.isAuthenticated) {
      res.redirect("/");
      return;
    }
    res.render("login");
  },

  register: (req, res) => {
    if (req.session.isAuthenticated) {
      res.redirect("/");
      return;
    }
    res.render("register");
  },

  allAvailableDecks: async (req, res) => {
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

      const allDecks = dbAllDecks.map(x => x.get({ plain: true }));
      for (let i = 0; i < allDecks.length; i++) {
        if (allDecks[i].user_id == req.session.currentUser.id) {
          allDecks[i].isOwner = true;
        } else {
          allDecks[i].isOwner = false;
        }

        if (
          allDecks[i].favorites.find(
            fav => fav.user_id == req.session.currentUser.id
          ) != undefined
        ) {
          allDecks[i].isFavorited = true;
        } else {
          allDecks[i].isFavorited = false;
        }

        if (
          allDecks[i].favorites.find(
            fav => fav.user_id == req.session.currentUser.id
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
  },

  create: async (req, res) => {
    try {
      res.render("createDeck", { loggedIn: true });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  flashcard: async (req, res) => {
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
      const flashcards = dbFlashcard.dataValues.cards.map(x =>
        x.get({ plain: true })
      );
      const deckTitle = dbFlashcard.dataValues.title;
      const id = dbFlashcard.id;
      res.render("flashcard", { flashcards, deckTitle, id, loggedIn: true });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  myDecks: async (req, res) => {
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
  }
};