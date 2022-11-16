const express = require("express");
const router = express.Router();
const login = require('../models/login_model');
const bcrypt = require('bcryptjs');

router.post('/',
  function(request, response) {
    if(request.body.username && request.body.password){
        login.getPasswordByName(request.body.username, function(error, result) {
          if(error){
            response.json(error);
          }
          else{
            if (result.length > 0) {
              const matches = bcrypt.compareSync(request.body.password,result[0].password);
              if(matches) {
                  console.log("Password is correct!");
                  response.send("Password is correct");
                }
                else {
                    console.log("Password in incorrect!");
                }			
              }          
            else{
              console.log("Username or email does not exists");
              response.send("Password is incorrect");
            }
          }
          }
        );
      }
    else{
      console.log("Wrong username or password");
      console.log(request.body);
      response.send(request.body);
    }
  }
);

module.exports = router;
