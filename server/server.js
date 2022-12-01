require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const cookieParser = require("cookie-parser");
const dataRouter = require("./routes/climatedata");
const preferencesRouter = require("./routes/userpreferencesdata");
const loginRoute = require("./routes/login_route");
const signUp = require("./routes/signUp_route");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(200);
  res.end();
});

app.use(bodyParser.json());
app.use(cookieParser());

//Route for climatedata from database
app.use("/data", dataRouter);
app.use("/userpreferences", preferencesRouter);
app.use("/login", loginRoute);
app.use("/signup", signUp);

app.set("port", process.env.PORT || 3001);
app.listen(port);
