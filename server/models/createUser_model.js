const db = require('../database');

createUser = (username, password, email) => {
  const query = "insert into users value (?,?,?)";
  return new Promise((resolve, reject) => {
    db.query(query,[username, password, email], (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = {createUser}
