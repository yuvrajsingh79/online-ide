var express = require('express');
var router = express.Router();
var Request = require("request");
const JDOODLE_ENDPOINT = 'https://api.jdoodle.com/execute';

/* Execute the submitted code. */
router.post('/code', function(req, res, next) {
    const runRequestBody = {
        script : req.body.script,
        language: req.body.language,
        versionIndex: req.body.versionIndex,
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET
    };
      console.log('executing code');
        Request.post({
            "headers": { "content-type": "application/json" },
            url: JDOODLE_ENDPOINT,
            json: runRequestBody
        }, (error, response, body) => {
            if(error) {
                return console.dir(error);
            }
            res.send(body);
        });
    });

module.exports = router;
