const router = require("express").Router();

const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const deckRoutes = require("./deck-routes");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/decks", deckRoutes);


module.exports = router;