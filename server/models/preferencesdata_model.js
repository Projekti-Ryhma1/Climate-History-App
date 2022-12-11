const database = require("../database");

getUserPreferences = (username, groupID) => {
    const query = "SELECT * FROM preferences WHERE username = ? AND groupID = ?";
    return new Promise((resolve, reject) => {
        database.query(query, [username, groupID], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

getUserGroupId = (username) => {
    const query = "SELECT DISTINCT groupID FROM preferences WHERE username = ?";
    return new Promise((resolve, reject) => {
        database.query(query, [username], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

getUserPreferenceInformation = async (username, groupID) => {
    const preferences = await getUserPreferences(username, groupID);
    const preferenceGroups = await getUserGroupId(username);

    const preferenceArray = [preferences, preferenceGroups];

    return preferenceArray;
}

updateUserPreference = (preferenceValue, username, preferenceID, groupID) => {
    const query = "UPDATE preferences SET preferenceValue = ? \
    WHERE username = ? AND preferenceID = ? AND groupID = ?";
    return new Promise((resolve,reject) => {
        database.query(query, [preferenceValue, username, preferenceID, groupID], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

// Login- and signUp routes ->
createUserPreferences = (username) => {
    const query = "INSERT INTO preferences (username, preferenceID, preferenceValue, groupID) "+
    "VALUES (?,1,1,1),(?,2,1,1),(?,3,1,1),(?,4,1,1),(?,5,1,1),(?,6,1,1),(?,7,1,1),(?,8,1,1);";
    return new Promise((resolve, reject) => {
      database.query(query,[username,username,username,username,username,username,username,username], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  };

createNewUserPreferences = (username, groupID) => {
    const query = "INSERT INTO preferences (username, preferenceID, preferenceValue, groupID) "+
    "VALUES (?,1,1,?),(?,2,1,?),(?,3,1,?),(?,4,1,?),(?,5,1,?),(?,6,1,?),(?,7,1,?),(?,8,1,?);";
    return new Promise((resolve, reject) => {
      database.query(query,[username,groupID,username,groupID,username,groupID,username,groupID,username,groupID,username,groupID,username,groupID,username,groupID], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  };

deleteUserPreferences = (username, groupID) => {
  const query = "DELETE FROM preferences WHERE username = ? AND groupID = ?"
  return new Promise((resolve, reject) => {
    database.query(query, [username, groupID], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = {
    getUserPreferences,
    updateUserPreference,
    createUserPreferences,
    getUserPreferenceInformation,
    createNewUserPreferences,
    deleteUserPreferences
}