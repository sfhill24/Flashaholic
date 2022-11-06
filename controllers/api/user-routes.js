const router = require("express").Router();
const { User, Deck, Card } = require("../../models");
//const withAuth = require("../../utils/auth");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Deck,
      },
      {
        model: Card,
        include: {
          model: Deck,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).render(500);
    });
});

//Signup route
router.post("/signUp", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.create({
      username,
      password,
    });

    delete user.password;

    req.session.save(() => {
      req.session.isAuthenticated = true;
      req.session.currentUser = user;
      res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    res.status(500).render(500);
  }
})

//User login route
router.post("/login", async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;

  console.log(username);
  console.log(password);

  try {
    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['created_at, update_at'] },
    });
    if (!user) {
      res.status(400).json({ message: "Incorrect email or password. Please try again!" })
    }

    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    delete user.password;

    req.session.save(() => {
      req.session.isAuthenticated = true;
      req.session.currentUser = user;
      res.status(200).json({ user, message: 'You are now logged in!' });
    });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//Logout route
router.post("/logout", (req, res) => {
  if (req.session.isAuthenticated) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})



module.exports = router;
