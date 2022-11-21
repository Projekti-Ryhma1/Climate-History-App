const express = require("express");
const router = express.Router();
const login = require('../models/login_model');
const bcrypt = require('bcryptjs');

router.post('/', async(req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    let result = await login.userLogin(username).then(function(resp){
      return resp;
  });

    bcrypt.compare(password, result[0].password, function(err, resp) {
      if (err){
        throw err;
      }
      else if (resp) {
        res.status(200).json("Password is correct");;
        console.log("Password is correct");
      } else {
        res.status(403).json("Password was incorrect");
        console.log("Password is incorrect");
      }
    });

  } catch (error) {
    if(error instanceof(TypeError)) {
      console.log("Username was not found");
      res.status(404).json("Username was not found");
    }
    else {
      console.log("Server error");
      res.status(500);
    }
  }
  }
  );

module.exports = router;
