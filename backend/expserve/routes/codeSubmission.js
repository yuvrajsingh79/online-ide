var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var Request = require("request");
const COMPILER_ENDPOINT = 'http://172.16.18.185:8080/compile';

/* Execute the submitted code. */
router.post('/code', function (req, res, next) {
    var testCases = new Map();
    testCases = req.body.testCases;
    var testReesults = new Array(5);
    var testCase = testCases.entries();
    for(var test of testCase){
        const runRequestBody = {
            language: req.body.value,
            code: req.body.code,
            stdin: test
        };
        Request.post({
            "headers": {
                "content-type": "application/json"
            },
            url: COMPILER_ENDPOINT,
            json: runRequestBody
        }, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            console.log(req.body);
            testReesults.push(response.body.data)
        });
    }
    res.send(testReesults);

});

module.exports = router;