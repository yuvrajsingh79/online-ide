var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* Create new coding assesment . */
router.get('/', function(req, res, next) {
    console.log('GET: \'/test\'');
    var con = mysql.createConnection({
        host: process.env.dbhost,
        user: process.env.dbuser,
        password: process.env.dbpswd,
        database: process.env.dbname,
        port: process.env.dbport
      });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      //   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
      var sql = "select * from course";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("db connected.");
        return res.status(200).send(result);
        });
      });
});

module.exports = router;



