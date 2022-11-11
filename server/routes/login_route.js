const express = require("express");
const router = express.Router();
const login = require('../models/login_model');

router.get('/:value?',
 function(req, res) {
  if (req.params.value) {
    login.getByUserName(req.params.value, function(err, result) {
      if (err) {
        res.json(err);
      }
      else if (result.length > 0) {
        res.json(result);
      }
      else {
        login.getByEmail(req.params.value, function(err, result) {
          if (err)
          res.json(err);
           else
           res.json(result);
        });
      }
    });
  }
});

module.exports = router;
