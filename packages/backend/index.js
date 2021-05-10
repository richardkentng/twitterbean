require('dotenv').config()
const express = require("express");
const { json } = require("body-parser");
const authRoutes = require("../backend/auth/routes");
const postRoutes = require("../backend/posts/routes");
const mongoose = require("mongoose");
const path = require("path");
const requireAll = require("require-all");
const cors = require("cors");
const session = require("express-session");
const { mongoConnectionString } = require("./constants");

const app = express();
app.use(express.static("public"));

const port = process.env.PORT || 3000

// connect to the DB
mongoose.connect(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

requireAll({
  dirname: path.join(__dirname, "schemas"),
  filter: ".*(js|ts)",
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.set("trust proxy", true);

// enable app to use JSON bodies in POST requests.
app.use(json());
app.use(
  session({
    secret: "secret phrase",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.get('/', (req, res) => {
  res.send('homepage of twitterbean api!')
})
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const server = app.listen(port, () => {
  console.log("Now listening on port:", server.address().port);
});

module.exports = app;
