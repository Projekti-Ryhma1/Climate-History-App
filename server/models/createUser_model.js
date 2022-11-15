const db = require('../database');

const user = {
  add: function(user, callback) {
    return db.query(
      'insert into users value (?,?,?)',
      [user.username, user.password, user.email],
    callback
    );
  }
};

module.exports = user;