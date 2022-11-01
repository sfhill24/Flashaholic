const router = require("express").Router();
const { User, Deck, Card } = require("../../models");
//const withAuth = require("../../utils/auth");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Deck,
      },
      {
        model: Card,
        include: {
          model: Deck,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
