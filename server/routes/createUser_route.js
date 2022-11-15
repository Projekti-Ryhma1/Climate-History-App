const express = require("express");
const router = express.Router();
const user = require('../models/createUser_model');

router.post('/',
function(request, response) {
  user.add(request.body, function(err, result) {
    if (err) {
      response.json(err);
    } else {
      response.json(request.body);
    }
  });
});
/*
router.post('/', async (req, res) => {
  try {
   user.add(req.body);
   res.json(req.body);
  } catch (err) {
   res.json({ error: err.message || err.toString() });
  }
 });
*/
  module.exports = router;