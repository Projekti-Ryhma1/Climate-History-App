const database = require("../database");

getGlobalTempAnomaly = () => {
  const query = "SELECT * FROM global_temp_anomaly";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getNorthHemis2000YearTemp = () => {
  const query =
    "SELECT * FROM northern_hemisphere_2000_year_temperature_reconstruction";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getCO2EmissionByCountry = () => {
  const query = "SELECT * FROM national_carbon_emissions_2021";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getCO2EmissionBySector = () => {
  const query = "SELECT * FROM emissions_by_sector";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getCO2EmissionBySubSector = () => {
  const query = "SELECT * FROM emissions_by_subsector";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getMaunaLoaCO2Annual = () => {
  const query = "SELECT * FROM mauna_loa_annual_co2";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getMaunaLoaCO2Monthly = () => {
  const query = "SELECT * FROM mauna_loa_monthly_co2";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
getAntarcticComposite = () => {
  const query = "SELECT * FROM 800kicecoredata";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if(error) reject(eror);
      resolve(result);
    });
  });
};
getAntarcticIceCore = () => {
  const query = "SELECT * FROM ICECOREV4";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  getGlobalTempAnomaly,
  getNorthHemis2000YearTemp,
  getCO2EmissionByCountry,
  getCO2EmissionBySector,
  getCO2EmissionBySubSector,
  getMaunaLoaCO2Annual,
  getMaunaLoaCO2Monthly,
  getAntarcticComposite,
  getAntarcticIceCore
};
