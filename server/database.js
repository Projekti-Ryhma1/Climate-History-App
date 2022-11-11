const mysql = require("mysql");

const config = {
    port: process.env.DB_PORT,
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_DATABASE, // e.g. 'my-database'

    //socketPath no currently needed...
    //socketPath: process.env.INSTANCE_UNIX_SOCKET, // e.g. '/cloudsql/project:region:instance'
  }
  if(process.env.NODE_ENV === 'production') {
    console.log('Running from cloud. Connecting to DB through GCP socket.');
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }
  
  // When running from localhost, get the config from .env
  else {
    console.log('Running from localhost. Connecting to DB directly.');
    config.host = process.env.DB_HOST;
  }
  
  let connection = mysql.createConnection(config);

/*  let connection = mysql.createConnection({ // TESTING -> Set values manually when using other test server
    host: "localhost",
    port: 3306,
    database: "climatehistorytest",
    user: "root",
    password: "root"
  });*/
  
  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
  });
  
  module.exports = connection;