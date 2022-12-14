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
router.get("/co2_emissions_national", async (req, res) => {
  try {
    res.status(200).json(await database.getCO2EmissionByCountry());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/sector_emissions", async (req, res) => {
  try {
    res.status(200).json(await database.getCO2EmissionBySector());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/subsector_emissions", async (req, res) => {
  try {
    res.status(200).json(await database.getCO2EmissionBySubSector());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/mauna_loa_annual", async (req, res) => {
  try {
    res.status(200).json(await database.getMaunaLoaCO2Annual());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/mauna_loa_monthly", async (req, res) => {
  try {
    res.status(200).json(await database.getMaunaLoaCO2Monthly());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/antarctic_composite", async (req, res) => {
  try{
    res.status(200).json(await database.getAntarcticComposite());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/antarctic_ice_core", async (req, res) => {
  try {
    res.status(200).json(await database.getAntarcticIceCore());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/vostok_ice_data", async (req, res) => {
  try {
    res.status(200).json(await database.getVostok_Ice_Data());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
router.get("/human_evolution_activities", async (req, res) => {
  try {
    res.status(200).json(await database.getHumanEvolutionAndActivities());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/evo_of_global_temp_2m_years", async (req, res) => {
  try {
    res.status(200).json(await database.getEvoGlobalTemp2mYears());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
