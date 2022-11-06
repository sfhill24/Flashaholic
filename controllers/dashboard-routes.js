const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Deck, Card, Favorite } = require("../models");
const withAuth = require("../middleware/isAuthenticated");

router.get("/", withAuth, (req, res) => {
  console.log(req.session);

  Deck.findAll({
    where: {
      user_id: req.session.currentUser.id,
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
      res.render("dashboard", {
        decks,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Deck.findByPk(req.params.id, {
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
      if (dbDeckData) {
        // serialize the data
        const deck = dbDeckData.get({ plain: true });

        // pass data to template
        res.render("edit-deck", {
          deck,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
