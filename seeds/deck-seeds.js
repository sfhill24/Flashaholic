const { Deck } = require("../models");

const deckData = [
  {
    title: "HTML",
    user_id: 1,
    is_public: true,
  },
  {
    title: "CSS",
    user_id: 1,
    is_public: false,
  },
  {
    title: "JavaScript",
    user_id: 2,
    is_public: true,
  },
  {
    title: "Bootstrap",
    user_id: 3,
    is_public: true,
  },
];

const seedDecks = () => Deck.bulkCreate(deckData);

module.exports = seedDecks;
