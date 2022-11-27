const router = require("express").Router();
const { User, Deck, Card, Favorite } = require("../../models");
const withAuth = require("../../middleware/isAuthenticated");

//Get decks user created and favored
router.get("/", withAuth, async (req, res) => {
  try {
    let dbDeckData = await Deck.findAll({
      where: {
        user_id: req.session.currentUser.id,
      },
      attributes: ["id", "title", "created_at", "user_id", "is_public"],
      include: [
        {
          model: Card,
          attributes: ["id", "user_id", "deck_id", "front_text", "back_text"],
        },
        {
          model: User,
          attributes: ["username", "id"],
        },
        {
          model: Favorite,
          attributes: ["user_id", "deck_id"],
        },
      ],
    });

    let dbFavs = await Favorite.findAll({
      where: {
        user_id: req.session.currentUser.id,
      },
      attributes: ["id", "user_id", "deck_id"],
      include: [
        {
          model: Deck,
          attributes: ["id", "title", "created_at", "user_id", "is_public"],
          include: [
            {
              model: Card,
              attributes: [
                "id",
                "user_id",
                "deck_id",
                "front_text",
                "back_text",
              ],
            },
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const userDecks = dbDeckData.map(deck => deck.get({ plain: true }));
    const favs = dbFavs.map(fav => fav.get({ plain: true }));

    const favDecks = favs.map(fav => fav.deck);
    const decks = userDecks.concat(favDecks);

    res.render("dashboard", {
      decks,
      currentUserId: req.session.currentUser.id,
      loggedIn: true,
      currentUserId: req.session.currentUser.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, (req, res) => {
  Deck.findByPk(req.params.id, {
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
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
