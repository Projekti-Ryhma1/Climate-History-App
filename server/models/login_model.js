const db = require('../database');

userLogin = (username) => {
  const query = "select * from users where username=?";
  return new Promise((resolve, reject) => {
    db.query(query,[username], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

userCheckPreferences = (username) => {
  const query = "select * from preferences where username=?";
  return new Promise((resolve, reject) => {
    db.query(query,[username], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = { userLogin, userCheckPreferences };