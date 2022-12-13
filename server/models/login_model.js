const database = require('../database');

userLogin = (username) => { // Model for getting user data by username
  const query = "select * from users where username=?";
  return new Promise((resolve, reject) => {
    database.query(query,[username], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

getUserSelectedPreference = (username) => { // Model for getting user preference by username
  const query = "select selectedPreference from users where username = ?";
  return new Promise((resolve, reject) => {
    database.query(query, [username], (error, result) => {
        if(error) reject(error);
        resolve(result);
    });
  });
};

updateUserSelectedPreference = (username, groupID) => { // Model for updating specific preference of the given user's group id
  console.log(username + " " + groupID + " params from model")
  const query = "UPDATE users SET selectedPreference = ? WHERE username = ?";
  return new Promise((resolve, reject) => {
    database.query(query,[groupID, username], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = { 
  userLogin,
  getUserSelectedPreference,
  updateUserSelectedPreference
 };