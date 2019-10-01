var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* Create new coding assesment . */
router.get('/', function (req, res, next) {
    console.log('GET: \'/allCodes\'');
    var con = mysql.createConnection({
        host: process.env.dbhost,
        user: process.env.dbuser,
        password: process.env.dbpswd,
        database: process.env.dbname,
        port: process.env.dbport
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "select * from code_assesment";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("db connected.");
            return res.status(200).send(result);
        });
    });
});

module.exports = router;