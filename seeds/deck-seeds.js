const { Deck } = require("../models");

const deckData = [
  {
    title: "HTML",
    user_id: 1,
  },
  {
    title: "CSS",
    user_id: 1,
  },
  {
    title: "JavaScript",
    user_id: 2,
  },
  {
    title: "Bootstrap",
    user_id: 3,
  },
];

const seedDecks = () => Deck.bulkCreate(deckData);

module.exports = seedDecks;
