const seedUsers = require("./user-seeds");
const seedDecks = require("./deck-seeds");
const seedCards = require("./card-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedDecks();
  console.log("\n----- DECKS SEEDED -----\n");

  await seedCards();
  console.log("\n----- CARDS SEEDED -----\n");

  process.exit(0);
};

seedAll();
