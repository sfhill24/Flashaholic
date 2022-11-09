const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Deck, Card, Favorite } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);

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
    .then((dbDeckData) => {
      const decks = dbDeckData.map((deck) => deck.get({ plain: true }));
      res.render("homepage", {
        decks,
        loggedIn: req.session.isAuthenticated,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.isAuthenticated) {
    res.redirect("/");
    return;
  }
  res.render("register");
});

module.exports = router;
