var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* Create new coding assesment . */
router.post('/', function (req, res, next) {
    console.log('POST: \'/addCode\'');
    var con = mysql.createConnection({
        host: process.env.dbhost,
        user: process.env.dbuser,
        password: process.env.dbpswd,
        database: process.env.dbname,
        port: process.env.dbport
    });
    if (req.body != "") {
        const reqBody = {
            courseId: req.body.courseId,
            question: req.body.question,
            isStdIn: req.body.isStdIn,
            totalTestCases: req.body.totalTestCases,
            sampleStdIn: req.body.sampleStdIn,
            sampleStdOut: req.body.sampleStdOut,
            testCaseStdIn: req.body.testCaseStdIn,
            testCaseStdOut: req.body.testCaseStdOut,
            createdBy: req.body.createdBy,
            createdOn: req.body.createdOn,
            totalSubmissions: req.body.totalSubmissions,
            correctSubmissions: req.body.correctSubmissions,
            allowedAttempts: req.body.allowedAttempts,
            langsAllowed: req.body.langsAllowed,
            score: req.body.score,
            isReviewd: req.body.isReviewd,
            reviewedBy: req.body.reviewedBy,
            reviewedOn: req.body.reviewedOn,
            duration: req.body.duration,
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime,
            totalRegCoders: req.body.totalRegCoders,
            registeredCoders: req.body.registeredCoders
        };
        console.log('creating a new code assesment');
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO code_assesment (courseId, question, isStdIn, totalTestCases, sampleStdIn, sampleStdOut, testCaseStdIn, testCaseStdOut, createdBy, createdOn, totalSubmissions, correctSubmissions, allowedAttempts, langsAllowed, score, isReviewd, reviewedBy, reviewedOn, duration, startDateTime, endDateTime, totalRegCoders, registeredCoders) VALUES (" + reqBody.courseId + ", '" + reqBody.question + "', " + reqBody.isStdIn + ", " + reqBody.totalTestCases + ", '" + reqBody.sampleStdIn + "', '" + reqBody.sampleStdOut + "', '" + reqBody.testCaseStdIn + "', '" + reqBody.testCaseStdOut + "', '" + reqBody.createdBy + "', '" + reqBody.createdOn + "', " + reqBody.totalSubmissions + ", " + reqBody.correctSubmissions + ", " + reqBody.allowedAttempts + ", '" + reqBody.langsAllowed + "', " + reqBody.score + ", " + reqBody.isReviewd + ", '" + reqBody.reviewedBy + "', '" + reqBody.reviewedOn + "', " + reqBody.duration + ", '" + reqBody.startDateTime + "', '" + reqBody.endDateTime + "', " + reqBody.totalRegCoders + ", '" + reqBody.registeredCoders + "')";
            console.log(sql);
            //   var sql = "select * from course";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("db connected.");
                return res.status(200).send(result);
            });
        });
    }

});

module.exports = router;