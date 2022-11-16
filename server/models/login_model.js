const db = require('../database');

const login = {
  getByUserName: function(username, callback) {
    return db.query('select * from users where username=?', [username], callback);
  },
  getByEmail: function(email, callback) {
    return db.query('select * from users where email=?', [email], callback);
  },

  getAll: function() { 
    return db.query('select * from users', callback);
  },
};
module.exports = login;