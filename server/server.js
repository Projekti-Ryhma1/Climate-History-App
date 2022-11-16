require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;

const dataRouter = require("./routes/climatedata");
const preferencesRouter = require("./routes/userpreferencesdata");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(200);
  res.end();
});

//Route for climatedata from database
app.use("/data", dataRouter);
app.use("/userpreferences", preferencesRouter);

app.set("port", process.env.PORT || 3001);
app.listen(port);
