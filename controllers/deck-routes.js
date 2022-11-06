const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const { Card, Deck, Favorite, User } = require("../models");


//GET all decks and render  availableDecks page
router.get('/', isAuthenticated, async (req, res) => {
    try {
        let allDecks = await Deck.findAll({
            attributes: [
                "id",
                "title",
                "is_public",
            ]
        });
        res.render("availableDecks", { allDecks, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//Render create deck page
router.get('/create', isAuthenticated, async (req, res) => {
    try {
        res.render("createDeck", { loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//GET deck and render flashcard page
router.get('/flashcard', isAuthenticated, async (req, res) => {
    try {
        let flashcard = await Deck.findAll({
            attributes: [
                "id",
                "title",
            ],
            include: [
                {
                    model: Card,
                    attributes: ["id", "user_id", "deck_id", "front_text", "back_text"]
                }
            ]
        });
        res.render("flashcard", { flashcard, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//GET all user created and favorite decks and render my decks page
router.get('/myDecks', isAuthenticated, async (req, res) => {
    try {
        let myDecks = await Deck.findAll({
            attributes: [
                "id",
                "title",
                "is_public",
            ],
            include: [
                {
                    model: Favorite,
                    attributes: ["id", "user_id", "deck_id"]
                }
            ]
        });
        res.render("myDecks", { myDecks, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;