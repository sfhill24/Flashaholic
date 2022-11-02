const { User } = require("../models");

const userData = [
  {
    username: "lernantino",
    password: "password1234",
  },
  {
    username: "pmacdonald",
    password: "password1234",
  },
  {
    username: "bootcamp_bot",
    password: "password1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
