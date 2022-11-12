const database = require("../database");

getGlobalTempAnomaly = () => {
  const query = "SELECT * FROM global_temp_anomaly";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};
getNorthHemis2000YearTemp = () => {
  const query =
    "SELECT * FROM northern_hemisphere_2000_year_temperature_reconstruction";
  return new Promise((resolve, reject) => {
    database.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

module.exports = {
  getGlobalTempAnomaly,
  getNorthHemis2000YearTemp,
};
