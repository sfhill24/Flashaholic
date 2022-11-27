const router = require("express").Router();

const { PageController } = require("../../controllers");

router.get("/", PageController.homepage);
router.get("/login", PageController.login);
router.get("/signup", PageController.register);

module.exports = router;
