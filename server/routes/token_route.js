const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); //WIP
const jwt_token = process.env.JWT_TOKEN;

router.get("/token", async (req, res) => {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return res.sendStatus(403);
      }

      res.status(201).send({data:token});
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });

  module.exports = router;