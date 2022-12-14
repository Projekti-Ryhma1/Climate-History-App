const express = require("express");
const router = express.Router();
const signUp = require('../models/signUp_model');
const prefs = require("../models/preferencesdata_model");

router.post('/', async (req, res) => {
  const username = req.body.username; // Requested body values from the client side
  const password = req.body.password;
  const email = req.body.email;
  const selectedPreference = req.body.selectedPreference;
  const noEmptyValues = username.length > 0 && password.length > 0 && email.length > 0; // Boolean for checking empty values
  if (noEmptyValues && username.length < 10) {
    try {
      const userData = await signUp.createUser(username, password, email, selectedPreference); // Creates new user to the database
      await prefs.createUserPreferences(username); // Creates preferences for the new user
      res.status(200).json(userData);

    } catch (error) {
      const errorMessage = error.sqlMessage;

       // Reads string value of the error message and makes a custom error message
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
  } else if (!noEmptyValues) { // Some of the requested values are empty
    console.log("Username, password or email is empty");
    res.status(400).send({ code: 0, message: "Username, password or email is empty" });
  } else { // Final possible outcome: username is too long
    console.log("Username is too long");
    res.status(400).send({ code: 0, message: "Username is too long" });
  }
});

module.exports = router;