
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

// var fs = require('fs'),
// xml2js = require('xml2js');

// fs.readFile('f_vmpp2_3070917.xml', 'utf8', (err, data) => {
//     if (err) throw err;
//     var parser = new xml2js.Parser();
//     var sql = "INSERT INTO `drug`(`name`) VALUES (?)";
//     parser.parseString(data, (err, result) => {
//         if (err) throw err;
//         var medicines = result.VIRTUAL_MED_PRODUCT_PACK.VMPPS[0].VMPP;
//         medicines.map( (drug) => {
//             pool.getConnection((err, connection) => {
//                 connection.query(sql, [drug.NM[0]], (err, result) => {
//                     connection.destroy();
//                     if (err) throw err;
//                 });
//             });
//         })
//     });
// });
exports = module.exports = pool;