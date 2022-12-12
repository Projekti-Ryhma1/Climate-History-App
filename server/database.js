const mysql = require("mysql");

const config = {
  user: process.env.DB_USER, // e.g. 'my-db-user'
  password: process.env.DB_PASS, // e.g. 'my-db-password'
  database: process.env.DB_DATABASE, // e.g. 'my-database'
};
if (process.env.NODE_ENV == "production") {
  console.log("Running from cloud. Connecting to DB through GCP socket.");
  config.socketPath = process.env.GAE_DB_SOCKET
}else {
  console.log("Running from localhost. Connecting to DB directly.");
  config.host = process.env.DB_HOST;
}

let connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as thread id: " + connection.threadId);
});

module.exports = connection;
