const express = require("express");
const router = express.Router();
const signUp = require('../models/signUp_model');

router.post('/', async(req, res) => {
try {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  res.status(200).json(await signUp.createUser(username, password, email));
} catch (error) {
  console.log(error.sqlMessage);
  res.status(500).json(error.sqlMessage);
}
}

);

  module.exports = router;