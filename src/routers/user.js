const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middlewares/auth")
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, username, password, cpassword } = req.body;
  try {
    if (password !== cpassword) {
      throw Error("Password Not Matching");
    }
    const user = new User({ name, username, password });
    await user.save();
    res.redirect('/login')
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
    session: false,
  })
);

router.get('/protected-route', auth, (req, res) => {
    res.send('You made it to the route.');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res) => {
    res.send('Wrong details.');
});

module.exports = router;

