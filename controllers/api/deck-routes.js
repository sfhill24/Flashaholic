const router = require("express").Router();
const { Card, Deck, Favorite, User } = require("../../models");
const withAuth = require("../../middleware/isAuthenticated");

//POST decks to favorites when save button is clicked
router.post("/:id/favorites", withAuth, async (req, res) => {
  try {
    let favoriteDeck = await Favorite.create({
      deck_id: req.params.id,
      user_id: req.session.currentUser.id,
    });

    res.json(favoriteDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST deck once created
router.post("/", withAuth, async (req, res) => {
  try {
    let createDeck = await Deck.create({
      title: req.body.title,
      is_public: req.body.is_public,
      user_id: req.session.currentUser.id,
    });

    for (let i = 0; i < req.body.cards.length; i++) {
      req.body.cards[i].deck_id = createDeck.id;
    }

    let cards = await Card.bulkCreate(req.body.cards);

    createDeck.cards = cards;

    res.json(createDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE created deck
router.delete("/:id", withAuth, async (req, res) => {
  console.log("hit ------------------");
  try {
    let deleteCreatedDeck = await Deck.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCreatedDeck) {
      res.status(404).json({ message: "ID not found" });
      return;
    }
    res.json(deleteCreatedDeck);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE favorite deck
// router.delete("/favorite/:id", withAuth, async (req, res) => {
//   try {
//     let deleteFavoriteDeck = await Favorite.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!deleteFavoriteDeck) {
//       res.status(404).json({ message: "ID not found" });
//       return;
//     }
//     res.json(deleteFavoriteDeck);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
