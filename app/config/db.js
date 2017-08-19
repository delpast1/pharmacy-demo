
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "root@localhost",
    user: "root",
    password: "pharmacydemo",
    database: "pharmacy"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, email VARCHAR(255), password VARCHAR(255), address VARCHAR(255), fullname VARCHAR(255), phonenumber VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    // });
    // var sql = "INSERT INTO customers (email, password, address, fullname, phonenumber) VALUES ('admin@pharmacy.com', 'admin', '', '', '')";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });
});

exports = module.exports = con;