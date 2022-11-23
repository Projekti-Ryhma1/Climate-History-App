const express = require("express");
const router = express.Router();
const login = require('../models/login_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.post('/', async(req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log("Username: "+username+" Password: "+password);
    let result = await login.userLogin(username).then(function(resp){
      return resp;
  });
    bcrypt.compare(password, result[0].password, function(err, resp) {
      if (err){
        throw err;
      }
      else if (resp) {
        const token = jwt.sign({username: username}, process.env.JWT_TOKEN, { expiresIn: '3456000s' }); //Generate token
        console.log("token: "+token);
        res.cookie('token',token, { httpOnly: true, secure: false, maxAge: 3600000 }); // INFO: If using Postman -> set "secure" to "true" (otherwise set "true")

        res.status(200).send({ code: 0, message: 'Password is correct'});
        console.log("Password is correct");
      } else {
        res.status(403).send({ code: 1, message: 'Password is incorrect'});
        console.log("Password is incorrect");
      }
    });

  } catch (error) {
    if(error instanceof(TypeError)) {
      console.log("Username was not found");
      res.status(403).send({ code: 2, message: 'Username was not found'});
    }
    else {
      console.log("Server error");
      res.status(500);
    }
  }
  }
  );

module.exports = router;
