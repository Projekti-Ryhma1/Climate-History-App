require('dotenv').config()
const express = require("express");
const cors = require("cors");
const connection = require("./database");
const port = 3001;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send(200);
  res.end();
});
app.get("/data", (req, res) => {
  connection.query("SELECT * FROM global_monthly", (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.set('port', process.env.PORT || 3000);
app.listen(port);
