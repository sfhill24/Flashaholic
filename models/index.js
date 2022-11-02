const User = require("./User");
const Deck = require("./Deck");
const Card = require("./Card");
const Favorite = require("./Favorite");

// create associations

User.hasMany(Deck, {
  foreignKey: "user_id",
});

Deck.belongsTo(User, {
  foreignKey: "user_id",
});

Card.belongsTo(User, {
  foreignKey: "user_id",
});

Card.belongsTo(Deck, {
  foreignKey: "deck_id",
});

User.hasMany(Card, {
  foreignKey: "user_id",
});

Deck.hasMany(Card, {
  foreignKey: "deck_id",
});

User.hasMany(Favorite, {
  foreignKey: "user_id",
});

Deck.hasMany(Favorite, {
  foreignKey: "deck_id",
});

Favorite.belongsTo(User, {
  foreignKey: "user_id",
});

Favorite.belongsTo(Deck, {
  foreignKey: "deck_id",
});

module.exports = { User, Deck, Card, Favorite };
