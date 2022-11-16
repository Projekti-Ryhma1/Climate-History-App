const db = require('../database');

const login = {
  getPasswordByName: function(username, callback) {
    return db.query('select password from users where username=?', [username], callback);
  },
  getPasswordByEmail: function(email, callback) {
    return db.query('select password from users where email=?', [email], callback);
  },

  getUserInfoByName: function(username, callback) {
    return db.query('select * from users where username=?', [username], callback);
  },
  getUserInfoByEmail: function(email, callback) {
    return db.query('select * from users where email=?', [email], callback);
  },
};
module.exports = login;