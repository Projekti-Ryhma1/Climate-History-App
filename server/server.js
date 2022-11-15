require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;

const dataRouter = require("./routes/climatedata");
<<<<<<< HEAD
const loginRoute = require("./routes/login_route");
=======
>>>>>>> development

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(200);
  res.end();
});

//Route for climatedata from database
app.use("/data", dataRouter);
<<<<<<< HEAD
app.use("/user", loginRoute);

app.set("port", process.env.PORT || port);
=======

app.set("port", process.env.PORT || 3001);
>>>>>>> development
app.listen(port);
