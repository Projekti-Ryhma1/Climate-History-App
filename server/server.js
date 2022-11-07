require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./database");
const bodyParser = require('body-parser');
const port = 3001;

const dataRouter = require("./routes/climatedata")

const app = express();
app.use(cors());



app.get("/", (req, res) => {
  res.send(200);
  res.end();
});

app.get("/data", async (req, res) => {
  const query = "SELECT * FROM global_monthly";
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

app.set("port", process.env.PORT || 3001);
app.listen(port);
