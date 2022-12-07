const database = require("../database");

getUserPreferences = (username) => {
    const query = "SELECT * FROM preferences WHERE username = ?";
    return new Promise((resolve, reject) => {
        database.query(query, [username], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

updateUserPreference = (preferenceValue, username, preferenceID) => {
    const query = "UPDATE preferences SET preferenceValue = ? \
    WHERE username = ? AND preferenceID = ?";
    return new Promise((resolve,reject) => {
        database.query(query, [preferenceValue, username, preferenceID], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

// Login- and signUp routes ->
createUserPreferences = (username) => {
    const query = "INSERT INTO preferences (username, preferenceID, preferenceValue) "+
    "VALUES (?,1,1),(?,2,1),(?,3,1),(?,4,1),(?,5,1),(?,6,1);";
    return new Promise((resolve, reject) => {
      database.query(query,[username,username,username,username,username,username], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  };

module.exports = {
    getUserPreferences,
    updateUserPreference,
    createUserPreferences
}