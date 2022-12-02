const express = require("express");
const router = express.Router();
const signUp = require('../models/signUp_model');

router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const noEmptyValues = username.length > 0 && password.length > 0;
  if (noEmptyValues && username.length < 10) {
    try {
      console.log(req.body);
      res.status(200).json(await signUp.createUser(username, password, email));
    } catch (error) {
      const errorMessage = error.sqlMessage;

      if (errorMessage.includes('users.PRIMARY')) {
        console.log("Username is already taken");
        res.status(400).send({ code: 0, message: "Username is already taken" });
      }
      else if (errorMessage.includes('users.email')) {
        console.log("Email is already taken");
        res.status(400).send({ code: 1, message: "Email is already taken" });
      }
      else {
        res.status(500).send({ code: 2, message: "Server error - try again later" });
      }

    }
  } else if (!noEmptyValues) {
    console.log("Username, password or email is empty");
    res.status(400).send({ code: 0, message: "Username, password or email is empty" });
  } else {
    console.log("Username is too long");
    res.status(400).send({ code: 0, message: "Username is too long" });
  }
});

module.exports = router;