var express = require('express');
var router = express.Router();
var Request = require("request");
const COMPILER_ENDPOINT = 'http://172.16.18.185:8080/compile';

/* Execute the submitted code. */
router.post('/code', function (req, res, next) {
    if (req.body.stdin != "" && req.body.stdin != null) {
        const runRequestBody = {
            language: req.body.value,
            code: req.body.code,
            stdin: req.body.stdin
        };
        console.log('executing code');
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
            res.send(body);
        });
    } else {
        const runRequestBody = {
            language: req.body.value,
            code: req.body.code,
            stdin: null
        };
        console.log('executing code');
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
            res.send(body);
        });
    }

});

module.exports = router;