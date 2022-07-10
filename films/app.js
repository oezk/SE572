const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Film = require("./src/models/film_model");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "films" });
});

app.get("/api/v1/films", async (req, res) => {
  const films = await Film.find({});
  res.json(films);
});

app.post("/api/v1/films", async (req, res) => {
  const film = new Film({ name: req.body.name });
  const savedFilm = await film.save();
  res.json(savedFilm);
});

module.exports = app;