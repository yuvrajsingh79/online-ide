var express = require('express');
var router = express.Router();
const langTable = require('../utils/languages')

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('GET: \'/langs\'');
    return res.status(200).send({langs: langTable});
});

module.exports = router;
