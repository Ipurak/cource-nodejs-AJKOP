var mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "db_nodejs_it"
});

module.exports = db