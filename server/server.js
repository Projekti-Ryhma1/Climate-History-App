require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dataRouter = require("./routes/climatedata");
const preferencesRouter = require("./routes/userpreferencesdata");
const loginRoute = require("./routes/login_route");
const deleteUserRouter = require("./routes/deleteuser");
const signUp = require("./routes/signUp_route");

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({message:"hello from app engine"});
  res.end();
});

app.use(bodyParser.json());
app.use(cookieParser());

//Route for climatedata from database
app.use("/data", dataRouter);
app.use("/userpreferences", preferencesRouter);
app.use("/login", loginRoute);
app.use("/deleteuser", deleteUserRouter);
app.use("/signup", signUp);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
