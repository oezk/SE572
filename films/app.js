const cors = require('cors');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var filmArray = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "films" });
});

app.get("/api/v1/films", async (req, res) => {
  res.json(filmArray);
});

app.post("/api/v1/films", async (req, res) => {
  filmArray.push({name: req.body.name});
  res.json(req.body.name);
});

module.exports = app;