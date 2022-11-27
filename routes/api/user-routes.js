const router = require("express").Router();

const { UserController } = require("../../controllers");
const { User, Deck, Card } = require("../../models");
const withAuth = require("../../middleware/isAuthenticated");

// GET /api/users
router.get("/", UserController.getAllUsers);

//Signup route
router.post("/signUp", UserController.signUp);

//User login route
router.post("/login", UserController.login);

//Logout route
router.post("/logout", UserController.logout);

module.exports = router;
