require('dotenv').config()
require("./config/database");
const express = require("express");
const userRoutes = require("./routers/user");
const taskRoutes = require("./routers/task");
const path = require("path");
const passport = require("passport");

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(userRoutes);
app.use(taskRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening on http://localhost:${port}`);
});
