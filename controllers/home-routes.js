const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Deck, Card, Favorite } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);

  Deck.findAll({
    where: {
      is_public: true,
    },
    attributes: [
      "id",
      "title",
      "created_at",
      "user_id",
      "is_public",
      //   [
      //     sequelize.literal(
      //       `(SELECT COUNT(*) FROM favorite WHERE deck.id = favorite.deck_id)`
      //     ),
      //     "favorite_count",
      //   ],
    ],
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
    .then((dbDeckData) => {
      const decks = dbDeckData.map((deck) => deck.get({ plain: true }));
      res.render("homepage", {
        decks,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/deck/:id", (req, res) => {
  Deck.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "created_at",
      "user_id",
      "is_public",
      //   [
      //     sequelize.literal(
      //       `(SELECT COUNT(*) FROM favorite WHERE deck.id = favorite.deck_id)`
      //     ),
      //     "favorite_count",
      //   ],
    ],
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
    .then((dbDeckData) => {
      if (!dbDeckData) {
        res.status(404).json({ message: "No deck found with this id" });
        return;
      }

      // serialize the data
      const deck = dbDeckData.get({ plain: true });

      // pass data to template
      res.render("single-deck", {
        deck,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
