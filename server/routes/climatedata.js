const express = require("express");
const router = express.Router();
const database = require("../models/climatedata_model");

router.get("/global_monthly", async (req, res) => {
  try {
    res.status(200).json(await database.getGlobalTempAnomaly());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/northern_hemisphere_2000_year", async (req, res) => {
  try {
    res.status(200).json(await database.getNorthHemis2000YearTemp());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
