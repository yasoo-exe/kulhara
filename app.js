const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Where's Waldo!");
});

module.exports = app;
