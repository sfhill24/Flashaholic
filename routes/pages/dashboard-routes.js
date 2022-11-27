const router = require("express").Router();

const { PageController } = require("../../controllers");
const withAuth = require("../../middleware/isAuthenticated");

//Get decks user created and favored
router.get("/", withAuth, PageController.dashboard);
router.get("/edit/:id", withAuth, PageController.editDeck);

module.exports = router;
