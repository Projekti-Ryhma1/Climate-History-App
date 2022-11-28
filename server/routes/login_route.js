const express = require("express");
const router = express.Router();
const login = require('../models/login_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

router.post('/', async(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if(username.length>0 && password.length>0){
  try {
    console.log("Username: "+username+" Password: "+password);
    let result = await login.userLogin(username).then(function(resp){
      return resp;
  });
    bcrypt.compare(password, result[0].password, function(err, resp) {
      if (err){
        throw err;
      }
      else if (resp) {
        const maxAge = 86400; // 86400 = 1day

        const payload = {
          username: username,
          email: result[0].email,
          cookieMaxAge: maxAge, // How long react-cookie token is active
          httpOnly: false,
          secure: false
        }
        const options = {
          expiresIn: maxAge,
        }
        const newToken = jwt.sign(payload, process.env.JWT_TOKEN, options); // Generate token
        console.log("token: "+newToken);

        res.status(200).send({ code: 0, message: 'Password is correct', token: newToken });
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
  }} else{
    console.log("Username or password empty!");
  }

});

router.post('/user', async(req, res) => {
  res.send(req.user);

});

module.exports = router;
