
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "pharmacy"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// exports = module.exports = con;

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : 'pharmacydemo',
    database        : 'pharmacy'
});

exports = module.exports = pool;