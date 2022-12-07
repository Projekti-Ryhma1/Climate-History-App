const database = require("../database");

deleteUser = (username) => {
    const query = "DELETE FROM users WHERE username = ?";
    return new Promise((resolve, reject) => {
        database.query(query, [username], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

module.exports = {
    deleteUser
}