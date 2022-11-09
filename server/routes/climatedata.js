const express = require("express");
const router = express.Router();
const connection = require("../database");

router.get("/global_monthly", async (req, res) => {
  const query = "SELECT * FROM global_monthly";
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
router.get("/northern_hemisphere_monthly", async (req, res) => {
  const query = "SELECT * FROM northern_hemisphere_monthly";
  connection.query(query, (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
module.exports = router;
