const express = require("express");
const router = express.Router();
const login = require('../models/login_model');
const prefs = require("../models/preferencesdata_model");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async(req, res) => {
  const username = req.body.username; // Requested body values from the client side
  const password = req.body.password;
  console.log(username);
  if(username.length>0 && password.length>0) {
  try {
    const checkPreferences = await prefs.getUserPreferences(username, 1); //Checks if user has preferences in database. 1 is default preferences that cant be deleted

    let result = await login.userLogin(username).then(function(resp) { //Get user data from the database by using model
      return resp;
  });
    bcrypt.compare(password, result[0].password, function(err, resp) { // Compares the given user and database data
      if (err){
        throw err;
      }
      else if (resp) {
        // Checks if database has no preferences for the user (preferences are created at the same time as user in "signUp_route")
        if(checkPreferences.length===0) {
          console.log("No preferences found with username: "+username+". Created new user preferences to database");
          prefs.createUserPreferences(username);// Create new preferences for the user in the database
        } else {
          console.log("Preferences found for username: "+username);
        }

        // Creates jsonwebtoken for the cookies with payload that contains data which can be accessed by decrypting token value
        const maxAge = 86400; // 86400 = 1day
        const payload = {
          username: username,
          email: result[0].email,
          cookieMaxAge: maxAge, // How long react-cookie token is active
          httpOnly: false,
          secure: false
        }
        const options = {
          expiresIn: maxAge, // When token expires
        }
        const newToken = jwt.sign(payload, process.env.JWT_TOKEN, options); // Generates token with payload
        console.log("token: "+newToken);

        res.status(200).send({ code: 0, message: 'User logged in successfully', token: newToken });
        console.log("Password is correct");
      } else {
        res.status(400).send({ code: 1, message: 'Password is incorrect'});
        console.log("Password is incorrect");
      }
    });

  } catch (error) { // Error handling
    if(error instanceof(TypeError)) { // Error by type
      console.log("Username was not found");
      res.status(400).send({ code: 2, message: 'Username was not found'});
    }
    else {
      console.log("Server error"); // All the other possible errors -> Server errors
      res.status(500).send({ code: 3, message: '500 Server Error'});
    }

  }} else {
    console.log("Username or password empty");
    res.status(400).send({ code: 4, message: 'Username or password empty'});
  }

});

router.get("/selectedPreference/:username", async(req, res) => { // Route for getting user preferences by username
  try{
      res.status(200).json(await login.getUserSelectedPreference(req.params.username));
  } catch(error){
      console.error(error);
      res.sendStatus(500);
  }
});

router.post("/newSelectedPreference", async(req, res) => { // Route for creating a new preference by username and groupID
  console.log(req.body);
  const username = req.body.username;
  const groupID = req.body.groupID;
  try{
    res.status(200).json(await login.updateUserSelectedPreference(username, groupID));
  } catch(error){
      console.error(error);
      res.sendStatus(500);
  }
});

module.exports = router;