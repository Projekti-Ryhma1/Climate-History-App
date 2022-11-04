const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.BB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    socketPath: process.env.INSTANCE_UNIX_SOCKET
});

connection.connect((err)=>{
    if(err){
        console.error("Error connecting: "+ err.stack);
        return
    }
    console.log('Connected as thread id: ' + connection.threadId);
});

module.exports = connection;