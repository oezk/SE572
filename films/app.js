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
  try {
    validate_v1(req);
    const film = new Film({ name: req.body.name, rating: 10 });
    const savedFilm = await film.save();
    res.json(savedFilm);
  } catch (errorMessage) {
    res.status(400).json(errorMessage);
  }
});

app.get("/api/v2/films", async (req, res) => {
  const films = await Film.find({});
  res.json(films);
});

app.post("/api/v2/films", async (req, res) => {

  try {
    validate_v2(req);
    const film = new Film({ name: req.body.name, rating: req.body.rating });
    const savedFilm = await film.save();
    res.json(savedFilm);
  } catch (errorMessage) {
    res.status(400).json(errorMessage);
  }
});

function validate_v1(req) {
  validateName(req);
}

function validate_v2(req) {
  validateName(req);
  validateRating(req);
}

function validateName(req) {
  if (req.body.name == undefined || req.body.name.trim().length == 0) {
    throw "{'400 Bad Request': 'Film title must be at least 1 character'}";
  }
}

function validateRating(req) {
  if (req.body.rating == null) {
    throw "{'400 Bad Request': 'Please enter a rating'}";
  }

  if (!Number.isFinite(parseInt(req.body.rating)) || req.body.rating < 0 || req.body.rating > 10) {
    throw "{'400 Bad Request': 'Please enter a rating between 0 and 10!'}";
  }
}

module.exports = app;