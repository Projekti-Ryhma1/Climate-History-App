const db = require('../database');

createUser = (username, password, email, selectedPreference) => { // Model for creating all the user specific data
  const query = "insert into users value (?,?,?,?)";
  return new Promise((resolve, reject) => {
    db.query(query,[username, password, email, selectedPreference], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = { createUser }
