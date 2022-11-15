const database = require("../database");

getUserPreferences = (username) => {
    const query = "SELECT * FROM preferences WHERE username = '"+ username + "'";
    return new Promise((resolve, reject) => {
        database.query(query, (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

module.exports = {
    getUserPreferences
}